import { Action } from "@wharfkit/antelope"
import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import { doAction, sendAction } from "lib/eosio"
import logger from "lib/logger"
import { getOldestOracleStat, getOldestReport, getOldestRoundCommit, getOracleStatsScopes, getReportScopes, getRoundCommitScopes, tables } from "lib/queries"
import * as pwr from "lib/types/power.boid.types"
import { currentRound } from "lib/utils"
const log = logger.getLogger("pwr-cleanTables")

async function cleanReports(config:pwr.Types.PwrConfig, round:number) {
  log.info("checking for any reports rows to be cleared")
  const scopes = await getReportScopes()
  const cleanupOlder = Math.max(round - 1 - config.keep_finalized_stats_rows.toNumber(), 0)
  log.info("will cleanup reports older than round:", cleanupOlder)
  for (const scope of scopes) {
    const oldest = await getOldestReport(scope).catch(log.error)
    if (!oldest) continue
    const oldestRound = oldest.report.round.toNumber()
    log.debug(scope.toString(), "oldest report round:", oldestRound)
    if (!(oldestRound < cleanupOlder)) {
      log.debug("oldest report is more recent than limit, skipping")
      continue
    }
    log.info("cleaning reports for", scope.toString())
    await sendAction(pwrActions.reportsClean({ scope }))
  }
}
async function cleanOracleStats(config:pwr.Types.PwrConfig, round:number) {
  log.info("checking for any reports rows to be cleared")
  const scopes = await getOracleStatsScopes()
  const cleanupOlder = Math.max(round - 1 - config.keep_finalized_stats_rows.toNumber(), 0)
  log.info("will cleanup oracle stats older than round:", cleanupOlder)
  for (const scope of scopes) {
    const oldest = await getOldestOracleStat(scope).catch(log.error)
    if (!oldest) continue
    const oldestRound = oldest.round.toNumber()
    log.debug(scope.toString(), "oldest oracle stat round:", oldestRound)
    if (!(oldestRound < cleanupOlder)) {
      log.debug("oldest oracle stat is more recent than limit, skipping")
      continue
    }
    log.info("cleaning oracle stats for", scope.toString())
    await sendAction(pwrActions.oracleStatsClean({ scope }))
  }
}
async function cleanRoundCommit(config:pwr.Types.PwrConfig, round:number) {
  log.info("checking for round commit rows to be cleared")
  const scopes = await getRoundCommitScopes()
  const cleanupOlder = Math.max((round - 1) - config.keep_finalized_stats_rows.toNumber(), 0)
  log.info("will cleanup round commits older than round:", cleanupOlder)
  for (const scope of scopes) {
    const oldest = await getOldestRoundCommit(scope).catch(log.error)
    if (!oldest) continue
    const oldestRound = oldest.round.toNumber()
    log.debug(scope.toString(), "oldest round commit round:", oldestRound)
    if (!(oldestRound < cleanupOlder)) {
      log.debug("oldest round commit is less than limit, skipping")
      continue
    }
    log.info("cleaning oracle stats for", scope.toString())
    await sendAction(pwrActions.roundCommitClean({ scope, round: oldestRound }))
  }
}

const config = await tables.pwr.config()
const round = Math.floor(await currentRound())
log.info("starting cleanTables, current round:", round)
await cleanReports(config, round).catch(log.error)
await cleanOracleStats(config, round).catch(log.error)
await cleanRoundCommit(config, round).catch(log.error)

process.exit(0)


