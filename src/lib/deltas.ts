import db from "lib/db"
import Logger from "lib/logger"
import ms from "ms"
import config from "lib/env"
import { getDeltas } from "lib/hyp"
import { parseISOString } from "lib/utils"
const log = Logger.getLogger("deltas")
const sysContract = config.contracts.system.toString()

interface Delta<T> {
    timestamp:string;
    code:string;
    scope:string;
    table:string;
    primary_key:number | string;
    payer:string;
    data:T;
    block_num:number;
    [other:string]:any;
}
interface Total {
    value:number;
    relation:string;
}

function deltaID(delta:Delta<any>) {
  return delta.block_num.toString() + "-" + delta.code + "-" + delta.table + "-" + delta.scope + "-" + delta.primary_key.toString()
}
export const deltas = {
  async accounts(delta:Delta<any>) {
    try {
      const id = deltaID(delta)
      let data = delta.data
      // console.log(data)

      const create = {
        id,
        balance: data.balance,
        boid_id: data.boid_id,
        nftBalance: data.nft_balance,
        timeStamp: parseISOString(delta.timestamp),
        nonce: data.auth.nonce,
        power: data.power.rating,
        receivedDelegatedStake: data.stake.received_delegated_stake,
        selfStaked: data.stake.self_staked,
        teamCumulativeContribution: data.team.team_cumulative_contribution
      }
      const result = await db.accountsDelta.upsert({
        where: { id },
        create,
        update: create
      })
      log.info("wrote delta:", result)
    } catch (error) {
      log.error(error)
    }
  }
}


let skip:any = {

}
export async function loadDeltas(direction:"forwards"|"backwards", tableName:keyof typeof deltas, code = sysContract, scope = sysContract) {
  const dbTable = tableName + "Delta"
  const existing = await db[dbTable as any].findFirst({ orderBy: { timeStamp: direction == "forwards" ? "desc" : "asc" } })
  let after:Date
  if (direction == "forwards") after = new Date(Date.now() - ms("48h"))
  else after = new Date(Date.now() - ms(config.history?.keepHistoryDataDays + "d" || "30d"))

  if (existing && direction == "forwards") {
    after = existing.timeStamp
    if (after.toISOString() == skip[dbTable]) {
      log.info("found skip match")
      const milli = existing.timeStamp.getUTCMilliseconds()
      existing.timeStamp.setUTCMilliseconds(milli + 1)
      after = existing.timeStamp
    }
  }

  let before:Date = new Date(Date.now() + ms("1h"))
  if (existing && direction == "backwards") {
    before = existing.timeStamp
  }
  if (before.getTime() < after.getTime()) {
    log.info("history is filled already")
    return
  }

  const params:any = {
    code,
    scope,
    table: tableName,
    limit: config.history?.injestChunkSize || 500,
    sort: direction == "forwards" ? "asc" : "desc",
    after: after.toISOString(),
    before: before.toISOString()
  }
  log.info(params)
  const result = await getDeltas(params)
  if (!result) return
  log.info("results", result.deltas.length)
  log.info("actions returned:", result.deltas.length)
  for (const delta of result.deltas) {
    await deltas[tableName](delta as Delta<any>)
  }
  if (direction == "forwards" && result.deltas.length > 0 && result.deltas.length < (config.history?.injestChunkSize || 500)) skip[dbTable] = after.toISOString()
}
