import config from "lib/env"
import Logger from "lib/logger"
import { Action, GetActions, GetDeltas, JsonRpc, V2_GET_DELTAS } from "@proton/hyperion"
import { parseISOString, pickRand, sleep } from "lib/utils"
import ms from "ms"
import ax from "axios"
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

export async function getDeltas(params:any, account = sysContract, retry = 0):Promise<null | GetDeltas<any>> {
  if (retry > 5) {
    log.error("too many hyperion errors: " + JSON.stringify(params, params))
    return null
  }
  const hyp = pickRand(hypClients)
  try {
    log.info("trying get_deltas using endpoint:", hyp.endpoint)
    const url = hyp.endpoint + V2_GET_DELTAS
    log.info(url)
    const options = {
      method: "GET",
      url,
      params
    }
    log.info(options)
    const result = await ax.request<GetDeltas<any>>(options)
    return result.data
  } catch (error:any) {
    log.error(hyp.endpoint, "retry:", retry, error.toString())
    return getDeltas(params, account, retry++)
  }
}


export async function getActionsRange(before:Date, after:Date, action:string, account:string = sysContract) {
  log.info("getting actions in range from:", after.toISOString(), "to:", before.toISOString())
  await sleep(ms("3s"))
  const limit = config.history?.injestChunkSize || 500
  let params:any = {
    "act.name": action,
    "act.account": account,
    limit,
    before: before.toISOString(),
    after: after.toISOString(),
    sort: "asc"
  }
  let actions:Record<string, Action<any>> = {}
  // const expected = await getActions(p)
  let previousLast
  async function loopGetActions() {
    console.log("saved actions:", Object.keys(actions).length)
    log.info(params)
    const result = await getActions(params)
    if (!result) throw (new Error("hyperion query error"))
    if (result.actions.length == 0) return
    result.actions.forEach(el => actions[el.global_sequence.toString()] = el)
    const last = result.actions[result.actions.length - 1]
    console.log("first:", result.actions[0].global_sequence)
    console.log("last:", result.actions[result.actions.length - 1].global_sequence)
    console.log("results", result.actions.length)
    if (previousLast == last.global_sequence) return
    previousLast = last.global_sequence
    params.after = new Date(parseISOString(last["@timestamp"])).toISOString()
    return loopGetActions()
  }
  await loopGetActions()
  console.log("finished!")
  console.log("final saved actions:", Object.keys(actions).length)
  return Object.values(actions)
}
