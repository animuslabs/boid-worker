import { pwrActions } from "lib/actions"
import { sendAction } from "lib/eosio"
import logger from "lib/logger"
import { getOracleStats, getOracleStatsScopes } from "lib/queries"
import { finalRound } from "lib/utils"
const log = logger.getLogger("handleOracleStats")

const final = await finalRound()
const scopes = await getOracleStatsScopes()
for (const oracle of scopes) {
  const allStats = await getOracleStats(oracle)
  const finalStats = allStats.filter(el => el.round.toNumber() <= final && !el.processed)
  log.debug("unprocessed finalized stats for:", oracle.toString(), finalStats.length)
  for (const el of finalStats) await sendAction(pwrActions.payoutround({ oracle, round: el.round.toNumber() }))
}

process.exit(0)

