import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import logger from "lib/logger"
import { getAllReports } from "lib/queries"
import { getReportId, shouldFinishReport } from "lib/utils"
const log = logger.getLogger("finishReports")

async function init() {
  log.info("starting finishReports")
  const pusher = new ActionPusher()
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
      pusher.add(pwrActions.finishReport({ boid_id_scope: boidId, pwrreport_ids: [id] }))
    }
  }
  pusher.stop()
}
init().catch(log.error)
