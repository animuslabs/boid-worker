import config from "lib/env"
import Logger from "lib/logger"
import ms from "ms"
import injest, { actionMap } from "lib/injest"
import db from "lib/db"
import { parseISOString, shuffle, sleep } from "lib/utils"
import { getActions } from "lib/hyp"
const sysContract = config.contracts.system.toString()
const log = Logger.getLogger("loadSysActions")

let skip:any = {

}


async function getRecentActions(action:string, table:string) {
  const existing = await db[table as any].findFirst({ orderBy: { timeStamp: "desc" } })
  // const existing = await db.logPwrAdd.findFirst({ orderBy: { timeStamp: "desc" } })
  let after
  if (existing) {
    // log.info("skip:", skip)
    after = existing.timeStamp.toISOString()
    if (after == skip[table]) {
      const milli = existing.timeStamp.getUTCMilliseconds()
      existing.timeStamp.setUTCMilliseconds(milli + 1)
      after = existing.timeStamp.toISOString()
    }
  }
  // const afterSeq = existing?.timeStamp.toISOString()
  const params:any = {
    "act.name": action,
    "act.account": sysContract,
    limit: config.history?.injestChunkSize || 500,
    sort: "asc"
  }
  if (after) params.after = after
  // if (afterSeq) params.filter = "global_sequence=" + existing.sequence
  log.info(params)
  const result = await getActions(params)
  if (!result) return
  log.info("results", result.actions.length)
  log.info("query results total:", result.total.value)
  log.info("actions returned:", result.actions.length)
  if (result.actions.length > 0) {
    log.info("first seq", result.actions[0].global_sequence, result.actions[0]["@timestamp"])
    log.info("last seq", result.actions[result.actions.length - 1].global_sequence, result.actions[result.actions.length - 1]["@timestamp"])
  }

  for (const act of result.actions) {
    await injest.sys[table](act)
  }
  if (result.actions.length > 0 && result.actions.length < (config.history?.injestChunkSize || 500)) skip[table] = after
}

async function init() {
  for (const action of shuffle(Object.entries(actionMap))) {
    log.info("starting injest of:", action[1])
    await getRecentActions(action[1], action[0])
    log.info("finished injest of:", action[1])
  }
  log.info("waiting for next cycle...")
  await sleep(ms(config.history?.injestCycleDelaySec + "s" || "10s"))
  return init()
}
init().catch(log.error)

