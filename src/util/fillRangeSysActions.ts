import config from "lib/env"
import Logger from "lib/logger"
import ms from "ms"
import injest, { actionMap, ActionMapType, getTableFromAction } from "lib/injest"
import db from "lib/db"
import { parseISOString, shuffle, sleep, toDate, validateDate } from "lib/utils"
import { getActions, getActionsRange } from "lib/hyp"
import { Action } from "@proton/hyperion"
const sysContract = config.contracts.system.toString()
const log = Logger.getLogger("fillRangeSysActions")

async function init(actionName:string, start:Date, end:Date) {
  let actions:Action<any>[] = []
  if (actionName == "all") {
    for (const tableName of Object.keys(actionMap)) {
      const actionName = actionMap[tableName]
      log.info("starting:", actionName)
      const results = await getActionsRange(end, start, actionName)
      results.forEach(el => actions.push(el))
    }
  } else {
    // const tableName = getTableFromAction(actionName)
    // console.log("tableName:", tableName)

    actions = await getActionsRange(end, start, actionName)
  }
  if (actions.length > 0) {
    log.info("first:", actions[0]["@timestamp"])
    log.info("last:", actions[actions.length - 1]["@timestamp"])
  }
  let added = 0
  let exists = 0
  // let new = 0
  for (const action of actions) {
    const tbl = getTableFromAction(action.act.name)
    const existing = await db[tbl].findUnique({ where: { sequence: BigInt(action.global_sequence) } })
    if (existing) exists++
    else added++
    await injest.sys[getTableFromAction(action.act.name) as keyof typeof injest.sys](action)
  }
  log.info(exists, "actions already existed in the DB and were updated")
  log.info(added, "new actions were added")
}
// init().catch(log.error)
async function start() {
  const params = process.argv.slice(2)
  if (params.length == 0) return log.error("expecting positional parameters: tableName|or 'all' for all scripts , start time ISO string, end time ISO string")
  let actionName = params[0]
  if (!actionName) return log.error("missing action name specify name of action or 'all' to injest for all actions")
  let start = params[1]
  if (!start) return log.error("mising start time, should be date string like 2023-12-30")
  let end = params[2]
  if (!end) return log.error("mising end time, should be date string like 2023-12-30")
  await init(actionName, validateDate(start), validateDate(end))
  // await init(actionName, new Date(Date.now() - ms("4h")), new Date())
}
start().catch(log.error)

