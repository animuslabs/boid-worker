
import { doAction, pickRpc } from "lib/eosio"
import logger from "lib/logger"
import { getStatRow } from "lib/queries"
import { currentRound } from "lib/utils"
const log = logger.getLogger("newRound")
// roundstats
async function init() {
  log.info("starting newRound Check")
  const round = await currentRound()
  log.info("current round:", round)
  const row = await getStatRow(round)
  if (row) {
    log.info("Stats row exists for current round, no action needed.")
    log.debug(JSON.stringify(row))
  } else {
    await doAction("roundstats")
  }
}
await init().catch(log.error)
process.exit(0)

