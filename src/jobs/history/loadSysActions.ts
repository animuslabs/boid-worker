import config from "lib/env"
import Logger from "lib/logger"
import ms from "ms"
import { actionMap, getRecentActions } from "lib/injest"
import { shuffle, sleep } from "lib/utils"

const log = Logger.getLogger("loadSysActions")

async function init() {
  for (const action of shuffle(Object.entries(actionMap))) {
    log.info("starting injest of:", action[1])
    await getRecentActions(action[1], action[0])
    log.info("finished injest of:", action[1])
  }
  log.info("waiting for next cycle...")
  await sleep(ms(config.history?.injestLoopDelaySec + "s" || "10s"))
  return init()
}
await init().catch(log.error)
process.exit(0)


