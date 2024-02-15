import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import env from "lib/env"
import log from "lib/logger"
import { dbQuery, getPwrReport } from "lib/queries"
import { Timer } from "lib/timer"
import * as pwr from "lib/types/power.boid.types"
import { currentRound, getReportId, getRoundData, toObject } from "lib/utils"
const protocol_id = 2

async function init() {
  try {
    const reportingRound = await getRoundData((await currentRound()) - 1)
    const previousRound = await getRoundData((await currentRound()) - 2)
    log.info("generating reports for round: ", reportingRound)
    const allBoidUsers = await dbQuery.getAllBoidUsers()
    const boidIds = allBoidUsers.map(el => el.boidId.toString())
    log.info(boidIds)
    let queryTimer
    const pusher = new ActionPusher(5000)

    for (const boidId of boidIds) {
      log.debug("checking for fah data for", boidId)
      queryTimer = new Timer().start()
      const lastRecord = await dbQuery.getLastDenisRecordofRound(boidId, reportingRound)
      if (!lastRecord) continue
      const previousRecord = await dbQuery.getLastDenisRecordofRound(boidId, previousRound)
      if (!previousRecord) continue
      log.debug("found fah data for ", boidId)
      const units = lastRecord.credits - previousRecord.credits
      if (units < 1) continue
      log.info(boidId, "earned", units, "Denis credits during round ", reportingRound.round)
      const report = pwr.Types.PwrReport.from({ protocol_id, round: reportingRound.round, units })
      const reportId = getReportId(report)
      const existing = await getPwrReport(boidId, reportId)
      log.debug("existing report:", toObject(existing))
      if (existing) {
        const approved = existing.approvals.map(el => el.toString()).includes(env.worker.account.toString())
        if (approved) {
          log.debug("this oracle already on the list of approvals, skiping")
          continue
        }
      }
      const action = pwrActions.pwrReport(pwr.Types.pwrreport.from(
        {
          oracle: env.worker.account,
          boid_id_scope: boidId,
          report
        }
      ))
      log.info("report not yet reported. Adding new Report:", reportId)
      pusher.add(action)
    }
    void pusher.stop()
  } catch (error:any) {
    log.error(error.toString())
    log.debug(error)
  }
}
await init()
process.exit(0)

