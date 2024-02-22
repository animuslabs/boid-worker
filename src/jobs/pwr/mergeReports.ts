import { UInt16 } from "@wharfkit/antelope"
import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import { sendAction } from "lib/eosio"
import logger from "lib/logger"
import { getReportScopes, tables } from "lib/queries"
// import { Finishreport, PwrReportRow } from "lib/types/power.boid.types"
import * as pwr from "lib/types/power.boid.types"
import { finalizedRound, getReportId, shouldMergeReports, toObject } from "lib/utils"
const log = logger.getLogger("mergeReports")


log.info("starting mergeReports")
const reportScopes = await getReportScopes()
log.info("found report scopes:", reportScopes.length)
const finalRound = await finalizedRound()
log.debug("final round:", finalRound)

for (const scope of reportScopes) {
  let reports = await tables.pwr.pwrReports(scope)
  reports = reports.filter(el => (el.report.round.toNumber() >= finalRound))
  if (reports.length < 2) {
    log.debug("no mergable reports found for", scope.toString())
    continue
  }
  log.debug("searching", reports.length, "reports for", scope.toString(), "for potential merges")

  const rounds:Record<number, Record<number, pwr.Types.PwrReportRow[]>> = {}
  // sort the protocols by rounds and protocols
  reports.forEach(el => {
    const proto = el.report.protocol_id.toNumber()
    const round = el.report.round.toNumber()
    if (!rounds[round]) {
      rounds[round] = {}
      rounds[round][proto] = [el]
    } else {
      if (!rounds[round][proto]) {
        rounds[round][proto] = [el]
      } else {
        rounds[round][proto].push(el)
      }
    }
  })

  // if there is multiple reports for a protocol in a single round, try to merge them
  for (const [round, protocols] of Object.entries(rounds)) {
    const roundNum = parseInt(round)
    for (const [proto, reports] of Object.entries(protocols)) {
      log.debug("considering merging reports for", scope.toString(), "and round", round.toString())
      if (!(await shouldMergeReports(roundNum, reports))) {
        log.info("not mergable")
        log.debug(JSON.parse(JSON.stringify(reports)))
        continue
      }
      const params = { boid_id_scope: scope, pwrreport_ids: reports.map(el => getReportId(el.report)) }
      log.debug("merging reports:", toObject(params))
      const mergeAction = pwr.Types.mergereports.from(params)
      await sendAction(pwrActions.mergeReports(mergeAction))
    }
  }
}

process.exit(0)

