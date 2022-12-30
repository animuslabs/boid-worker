import config from "lib/env"
import Logger from "lib/logger"
import ms from "ms"
import { GetActions, JsonRpc } from "@proton/hyperion"
import injest, { actionMap } from "lib/injest"
import db from "lib/db"
import { parseISOString, pickRand, shuffle } from "lib/utils"

const log = Logger.getLogger("loadActions")

const endpoint = "https://hyperion.telos-testnet.animus.is"
// const endpoint = "https://testnet.telos.net"
const hyp = new JsonRpc(endpoint)
if (!config.hyperion || config.hyperion?.length == 0) throw (new Error("must configure at least one hyperion endpoint in .env.json"))
const hypClients = config.hyperion.map(el => new JsonRpc(el))
const sysContract = config.contracts.system.toString()

async function getActions(params:any, retry = 0):Promise<null|GetActions<any>> {
  if (retry > 5) {
    log.error("too many hyperion errors: " + JSON.stringify(params, params))
    return null
  } 
  const hyp = pickRand(hypClients)
  try {
    log.info("trying get_action using endpoint:", hyp.endpoint)
    const result = await hyp.get_actions(sysContract, params)
    return result
  } catch (error) {
    log.error(hyp.endpoint, error)
    return getActions(params, retry++)
  }
}

async function getPastActions(action:string, table:string) {
  const existing = await db[table as any].findFirst({ orderBy: { timeStamp: "asc" } })
  const before:Date = existing?.timeStamp || new Date()
  log.info("before:", before)
  const cutoff = Date.now() - ms("30d")
  const params = {
    "act.name": action,
    "act.account": sysContract,
    limit: 500,
    before: before.toISOString(),
    after: new Date(cutoff).toISOString()
  }
  log.info(params)
  const result = await getActions(params)
  if (!result) return
  log.info("results", result.actions.length)
  log.info(result)
  for (const act of result.actions) {
    await injest.sys[table](act)
  }
}
async function getRecentActions(action:string, table:string) {
  const existing = await db[table as any].findFirst({ orderBy: { timeStamp: "desc" } })
  const after = existing?.timeStamp.toISOString()
  const params:any = {
    "act.name": action,
    "act.account": sysContract,
    limit: 500
  }
  if (after) params.after = after
  log.info(params)
  const result = await getActions(params)
  if (!result) return
  log.info("results", result.actions.length)
  log.info(result)
  for (const act of result.actions) {
    await injest.sys[table](act)
  }
}

async function init() {
  for (const action of shuffle(Object.entries(actionMap))) {
    log.info("starting injest of:", action[1])
    await getRecentActions(action[1], action[0])
    await getPastActions(action[1], action[0])
    log.info("finished injest of:", action[1])
  }
  // return init()
}
init().catch(log.error)

