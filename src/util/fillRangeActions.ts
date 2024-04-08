import config from "lib/config"
import Logger from "lib/logger"
import ms from "ms"
import injest, { actionMap, actionMapPower, getTableFromAction } from "lib/injest"
import db from "lib/db"
import { parseISOString, shuffle, sleep, toDate, validateDate } from "lib/utils"
import { getActions, getActionsRange } from "lib/hyp"
import { Action } from "@proton/hyperion"
const log = Logger.getLogger("fillRangeSysActions")

async function init(actionName:string, start:Date, end:Date) {
  const sysContract = config().contracts.system.toString()
  const powerContract = config().contracts.power.toString()
  const contractsToProcess = [
    { contract: sysContract, actionMap },
    { contract: powerContract, actionMap: actionMapPower }
  ]
  
  let actions:Action<any>[] = []
  let added = 0
  let exists = 0
  
  for (const { contract, actionMap } of contractsToProcess) {
    let actionMapToUse = actionMap

    if (actionName !== "all" && !actionMap[actionName]) {
      continue // Skip this contract if the specific action is not in its actionMap
    }

    const actionNames = actionName === "all" ? Object.values(actionMapToUse) : [actionName]
    
    for (const actionName of actionNames) {
      log.info("Processing:", actionName, "for contract", contract)
      const results = await getActionsRange(end, start, actionName, contract)
      results.forEach(el => actions.push(el))

      // Process each action (similar to the original loop in your question)
      for (const action of actions) {
        const tbl = getTableFromAction(action.act.name, actionMapToUse)
        const existing = await db[tbl].findUnique({ where: { sequence: BigInt(action.global_sequence) } })
        if (existing) {
          exists++
        } else {
          added++
          await injest.sys[getTableFromAction(action.act.name, actionMapToUse) as keyof typeof injest.sys](action)
        }
      }

      actions = [] // Reset actions for next iteration
    }
  }

  log.info("Total actions already existed and were updated:", exists)
  log.info("Total new actions added:", added)
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
}
start().catch(log.error)

