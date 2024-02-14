import { Action } from "@wharfkit/antelope"
import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import { doAction, sendAction } from "lib/eosio"
import logger from "lib/logger"
import { getOldestOracleStat, getOldestReport, getOldestRoundCommit, getOracleStatsScopes, getReportScopes, getRoundCommitScopes, getStatRow, tables } from "lib/queries"
import * as pwr from "lib/types/power.boid.types"
import { currentRound } from "lib/utils"
const log = logger.getLogger("pwr-cleanTables")

const pusher = new ActionPusher()

async function cleanStatsRows(config:pwr.Types.PwrConfig, round:number) {
  log.info("checking for any stats rows to be cleared")
  const clearOlder = Math.max(round - config.keep_finalized_stats_rows.toNumber(), 0) - 1
  if (clearOlder == 0) return
  log.debug("clearOlder:", clearOlder)

  // check if a stat row exists that needs to be cleared
  const exists = await getStatRow(clearOlder)
  log.debug("stats exists", exists)
  if (!exists) return

  log.info("sending statsclean action")
  const result = await doAction("statsclean")
  log.debug(result)
  log.info("clearStatsRows finished")
}

// async function cleanOracleStats(config:Config, round:number) {
//   log.info("checking for any reports rows to be cleared")
//   const scopes = await getOracleStatsScopes()
// }
async function cleanReports(config:pwr.Types.PwrConfig, round:number) {
  log.info("checking for any reports rows to be cleared")
  const scopes = await getReportScopes()
  const minRetain = config.standby_toggle_interval_rounds.toNumber()
  const cleanupOlder = Math.max(round - minRetain - config.keep_finalized_stats_rows.toNumber(), 0)
  log.info("will cleanup reports older than round:", cleanupOlder)
  for (const scope of scopes) {
    const oldest = await getOldestReport(scope).catch(log.error)
    if (!oldest) continue
    const oldestRound = oldest.report.round.toNumber()
    log.debug(scope.toString(), "oldest report round:", oldestRound)
    if (!(oldestRound < cleanupOlder)) continue
    log.info("cleaning reports for", scope.toString())
    pusher.add(pwrActions.reportsClean({ scope }))
  }
}
async function cleanOracleStats(config:pwr.Types.PwrConfig, round:number) {
  log.info("checking for any reports rows to be cleared")
  const scopes = await getOracleStatsScopes()
  const minRetain = config.standby_toggle_interval_rounds.toNumber()
  const cleanupOlder = Math.max(round - minRetain - config.keep_finalized_stats_rows.toNumber(), 0)
  log.info("will cleanup oracle stats older than round:", cleanupOlder)
  for (const scope of scopes) {
    const oldest = await getOldestOracleStat(scope).catch(log.error)
    if (!oldest) continue
    const oldestRound = oldest.round.toNumber()
    log.debug(scope.toString(), "oldest oracle stat round:", oldestRound)
    if (!(oldestRound < cleanupOlder)) continue
    log.info("cleaning oracle stats for", scope.toString())
    pusher.add(pwrActions.oracleStatsClean({ scope }))
  }
}
async function cleanRoundCommit(config:pwr.Types.PwrConfig, round:number) {
  log.info("checking for round commit rows to be cleared")
  const scopes = await getRoundCommitScopes()
  const minRetain = config.standby_toggle_interval_rounds.toNumber()
  const cleanupOlder = Math.max(round - minRetain - config.keep_finalized_stats_rows.toNumber(), 0)
  log.info("will cleanup round commits older than round:", cleanupOlder)
  for (const scope of scopes) {
    const oldest = await getOldestRoundCommit(scope).catch(log.error)
    if (!oldest) continue
    const oldestRound = oldest.round.toNumber()
    log.debug(scope.toString(), "oldest round commit round:", oldestRound)
    if (!(oldestRound < cleanupOlder)) continue
    log.info("cleaning oracle stats for", scope.toString())
    pusher.add(pwrActions.roundCommitClean({ scope }))
  }
}

async function init() {
  const config = await tables.pwr.config()
  const round = Math.floor(await currentRound())
  log.info("starting cleanTables, current round:", round)
  await cleanStatsRows(config, round).catch(log.error)
  await cleanReports(config, round).catch(log.error)
  await cleanOracleStats(config, round).catch(log.error)
  await cleanRoundCommit(config, round).catch(log.error)
  await pusher.stop()
}
init().catch(log.error)
