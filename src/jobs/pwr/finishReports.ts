import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import logger from "lib/logger"
import { getAllReports } from "lib/queries"
import { shouldFinishReport } from "lib/utils"
const log = logger.getLogger("finishReports")

async function init() {
  log.info("starting finishReports")
  const pusher = new ActionPusher()
  const reports = await getAllReports()
  for (const boidId of Object.keys(reports)) {
    log.info("checking reports for", boidId.toString())
    for (const report of reports[boidId]) {
      log.info("checking report", report.report_id.toNumber())
      const ready = await shouldFinishReport(report)
      if (!ready) continue
      log.info("Finishing report", report.report_id.toNumber())
      pusher.add(pwrActions.finishReport({ boid_id_scope: boidId, pwrreport_id: report.report_id }))
    }
  }
  pusher.stop()
}
init().catch(log.error)
