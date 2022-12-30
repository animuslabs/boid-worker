import config from "lib/env"
import Logger from "lib/logger"
import ms from "ms"
import { JsonRpc } from "@proton/hyperion"
import injest, { actionMap } from "lib/injest"
import db from "lib/db"
import { parseISOString } from "lib/utils"

const log = Logger.getLogger("loadActions")

// const endpoint = "https://hyperion.telos-testnet.animus.is"
const endpoint = "https://testnet.telos.net"
const hyp = new JsonRpc(endpoint)

const queryRate = ms("1s")
const sysContract = config.contracts.system.toString()

async function injestLoop(action:string, table:string) {
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
  const result = await hyp.get_actions(sysContract, params)
  log.info("results", result.actions.length)
  log.info(result)
  for (const act of result.actions) {
    await injest.sys[table](act)
  }
  if (result.actions.length == 0) return
  else if (result.actions.every(el => parseISOString(el["@timestamp"]).toISOString() == before.toISOString())) return
  else return injestLoop(action, table)
}

async function init() {
  for (const action of Object.entries(actionMap)) {
    log.info("starting injest of:", action[1])
    await injestLoop(action[1], action[0])
    log.info("finished injest of:", action[1])
  }
}
init().catch(log.error)

