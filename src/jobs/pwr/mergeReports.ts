import { UInt16 } from "@greymass/eosio"
import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import logger from "lib/logger"
import { getReportScopes, tables } from "lib/queries"
import { Finishreport, PwrReportRow } from "lib/types/power.boid.types"
import { finalizedRound, getReportId, shouldMergeReports } from "lib/utils"
const log = logger.getLogger("mergeReports")

async function init() {
  log.info("starting mergeReports")
  const reportScopes = await getReportScopes()
  log.info("found report scopes:", reportScopes.length)
  const finalRound = await finalizedRound()
  log.debug("final round:", finalRound)
  const config = await tables.pwr.config()
  const pusher = new ActionPusher()
  for (const scope of reportScopes) {
    let reports = await tables.pwr.pwrReports(scope)
    reports = reports.filter(el => (el.report.round.toNumber() >= finalRound && !el.reported && !el.merged))
    if (reports.length < 2) {
      log.debug("no mergable reports found for", scope.toString())
      continue
    }
    log.debug("searching", reports.length, "reports for", scope.toString(), "for potential merges")

    const protocols:Record<string, number> = {}
    const rounds:Record<number, Record<number, PwrReportRow[]>> = {}
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
    // log.debug("sorted reports", rounds)
    // continue

    // if there is multiple reports for a protocol in a single round, try to merge them
    for (const [round, protocols] of Object.entries(rounds)) {
      const roundNum = parseInt(round)
      for (const [proto, reports] of Object.entries(protocols)) {
        // const protoNum = parseInt(proto)
        // if (reports.length < 2) continue
        log.debug("considering merging reports for", scope.toString(), "and round", round.toString())

        if (!(await shouldMergeReports(roundNum, reports))) {
          log.info("not mergable")
          log.debug(JSON.parse(JSON.stringify(reports)))
          continue
        }
        const mergeAction = Finishreport.from({ boid_id_scope: scope, pwrreport_ids: reports.map(el => getReportId(el.report)) })
        pusher.add(pwrActions.finishReport(mergeAction))
      }
    }
  }
  pusher.stop()
}

init().catch(log.error)
