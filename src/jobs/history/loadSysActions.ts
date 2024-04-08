import getConfig from "lib/config"
import Logger from "lib/logger"
import ms from "ms"
import { actionMap, getRecentActions, actionMapPower } from "lib/injest"
import { shuffle, sleep } from "lib/utils"
const config = getConfig()
const sysContract = config.contracts.system.toString()
const powerContract = config.contracts.power.toString()
const log = Logger.getLogger("loadSysActions")

async function init() {
  // For sysContract
  for (const action of shuffle(Object.entries(actionMap))) {
    log.info("starting injest of:", action[1], "for sysContract")
    await getRecentActions(action[1], action[0], sysContract)
    log.info("finished injest of:", action[1], "for sysContract")
  }
  
  // For powerContract
  for (const action of shuffle(Object.entries(actionMapPower))) {
    log.info("starting injest of:", action[1], "for powerContract")
    await getRecentActions(action[1], action[0], powerContract)
    log.info("finished injest of:", action[1], "for powerContract")
  }

  log.info("waiting for next cycle...")
  await sleep(ms(config.history?.injestLoopDelaySec + "s" || "10s"))
  return init()
}

await init().catch(log.error)
process.exit(0)
