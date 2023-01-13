import config from "lib/env"
import Logger from "lib/logger"
import ms from "ms"
import { actionMap, getRecentActions } from "lib/injest"
import { shuffle, sleep } from "lib/utils"
import { deltas, loadDeltas } from "lib/deltas"

const log = Logger.getLogger("loadStateDeltas")

async function init() {
  for (const table of Object.keys(deltas)) {
    await loadDeltas("forwards", table as any)
  }
  log.info("waiting for next cycle...")
  await sleep(ms(config.history?.injestLoopDelaySec + "s" || "10s"))
  return init()
}
init().catch(log.error)
