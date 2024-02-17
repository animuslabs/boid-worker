import { pwrActions } from "lib/actions"
import { doAction, sendAction } from "lib/eosio"
import logger from "lib/logger"
import { getAllReports, getStatRow } from "lib/queries"
import { currentRound, getReportId, shouldFinishReport } from "lib/utils"
const log = logger.getLogger("finishReports")


log.info("starting finishReports")
const reports = await getAllReports()
for (const boidId of Object.keys(reports)) {
  log.info("checking reports for", boidId.toString())
  for (const report of reports[boidId]) {
    const id = getReportId(report.report)
    log.info("checking report", id.toString())
    const ready = await shouldFinishReport(report)
    // log.debug("should finish report", JSON.stringify(report.report, null, 2))
    if (!ready) continue
    log.info("Finishing report", id.toString())
    await sendAction(pwrActions.finishReport({ boid_id_scope: boidId, pwrreport_id: id }))
  }
}

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

process.exit(0)

