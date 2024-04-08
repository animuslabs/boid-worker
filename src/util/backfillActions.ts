import getConfig from "lib/config"
import Logger from "lib/logger"
import ms from "ms"
import injest, { actionMap, actionMapPower } from "lib/injest"
import db from "lib/db"
import { parseISOString } from "lib/utils"
import { getActions } from "lib/hyp"
const config = getConfig()
const sysContract = config.contracts.system.toString()
const powerContract = config.contracts.power.toString()
const log = Logger.getLogger("backfillSysActions")

async function getPastActions(action:string, table:string, contract:string) {
  //@ts-ignore
  const existing = await db[table as any].findFirst({ orderBy: { timeStamp: "asc" } })
  const before:Date = existing?.timeStamp || new Date()
  log.info("before:", before)
  const cutoff = Date.now() - ms(config.history?.keepHistoryDataDays + "d" || "30d")
  const after = new Date(cutoff).toISOString()
  log.info("checking...", before.getTime(), cutoff, before.getTime() < cutoff)
  if (before.getTime() < cutoff) {
    log.info("won't get past actions because history is filled already")
    return
  }
  log.info("after", after)
  const params = {
    "act.name": action,
    "act.account": contract,
    limit: config.history?.injestChunkSize || 500,
    before: before.toISOString(),
    after
  }
  log.info(params)
  const result = await getActions(params, sysContract)
  if (!result) return
  log.info("results:", result.actions.length)
  // log.info(result)
  for (const act of result.actions) {
    await injest.sys[table](act)
  }
  if (result.actions.length == 0 || result.actions.every(el => parseISOString(el["@timestamp"]).toISOString() == before.toISOString())) return
  else return getPastActions(action, table, contract)
}

async function init() {
  const allActions = { ...actionMap, ...actionMapPower }

  for (const [contract, action] of Object.entries(allActions)) {
    const currentContract = contract === "sys" ? sysContract : powerContract
    log.info("starting backfill of:", action)
    await getPastActions(action, contract, currentContract)
    log.info("finished backfill of:", action)
  }
}
init().catch(log.error)

