import config from "lib/env"
import Logger from "lib/logger"
import { GetActions, JsonRpc } from "@proton/hyperion"
import { pickRand } from "lib/utils"
const log = Logger.getLogger("hyp")
if (!config.history?.hyperion || config.history.hyperion.length == 0) throw (new Error("must configure at least one hyperion endpoint in .env.json"))
export const hypClients = config.history.hyperion.map(el => new JsonRpc(el))
const sysContract = config.contracts.system.toString()

export async function getActions(params:any, account = sysContract, retry = 0):Promise<null | GetActions<any>> {
  if (retry > 5) {
    log.error("too many hyperion errors: " + JSON.stringify(params, params))
    return null
  }
  const hyp = pickRand(hypClients)
  try {
    log.info("trying get_action using endpoint:", hyp.endpoint)
    const result = await hyp.get_actions(account, params)
    return result
  } catch (error:any) {
    log.error(hyp.endpoint, "retry:", retry, error.toString())
    return getActions(params, account, retry++)
  }
}

async function loopGetActions(before:Date, after:Date, action:string, account:string = sysContract) {
  let actions:any[] = []
}

export async function getActionsRange(before:Date, after:Date, action:string, account:string = sysContract) {
  log.info("get actions range before:", after.toISOString(), "after:", before.toISOString())
  const params:any = {
    "act.name": action,
    "act.account": account,
    limit: config.history?.injestChunkSize || 500,
    before: before.toISOString(),
    after: after.toISOString()
  }
  const result = await getActions(params)
  log.info(result)
  // const actions = await loopGetActions()
  // let exists:any = false
  // let oldest:any
  // if (!result) return log.error("error in getActionsRange")
  // if (result.actions.length == (config.history?.injestChunkSize || 500)) {
  //   oldest = result.actions[result.actions.length - 1]
  //   exists = await db.logPwrAdd.findUnique({ where: { sequence: BigInt(oldest.global_sequence) } })
  // }
  // for (const act of result.actions) {
  //   await injest.sys[table](act)
  // }
  // if (!exists) return getActionsRange(parseISOString(oldest["@timestamp"]), after, action, table)
}
