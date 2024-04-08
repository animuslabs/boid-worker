import getConfig from "lib/config"
import Logger from "lib/logger"
import ms from "ms"
import { sleep } from "lib/utils"
import { deltas, loadDeltas } from "lib/deltas"
const config = getConfig()
const sysContract = config.contracts.system.toString()
const powerContract = config.contracts.power.toString()
const log = Logger.getLogger("loadStateDeltas")

async function init() {
  for (const table of Object.keys(deltas)) {
    await loadDeltas("forwards", table as any, sysContract, sysContract, sysContract)
  }
  log.info("waiting for next cycle...")
  await sleep(ms(config.history?.injestLoopDelaySec + "s" || "10s"))
  return init()
}
await init().catch(log.error)
process.exit(0)

