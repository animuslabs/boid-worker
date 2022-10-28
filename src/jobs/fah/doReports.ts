import { Action, AnyAction, Authority, Name, UInt64 } from "@greymass/eosio"
import { ActionPusher } from "lib/actionPusher"
import edgedb from "lib/db"
import log from "lib/logger"
import { tables, db, getPwrReport } from "lib/queries"
import { Timer } from "lib/timer"
import { currentRound, getReportId, getRoundData, shouldFinishReport } from "lib/utils"
import env from "lib/env"
import { Finishreport, PwrReport, PwrReportAction, PwrReportRow } from "lib/types/power.boid.types"
import { pickRpc, safeDo } from "lib/eosio"
import { info } from "console"
import { pwrActions } from "lib/actions"

async function init() {
  try {
    const reportingRound = await getRoundData((await currentRound()) - 1)
    const previousRound = await getRoundData((await currentRound()) - 2)
    log.info("generating reports for round: ", reportingRound)
    const allBoidUsers = await db.getAllBoidUsers()
    const boidIds = allBoidUsers.map(el => el.boidId.toString())
    log.info(boidIds)
    let queryTimer
    const pusher = new ActionPusher(5000)
    const round = await currentRound()

    for (const boidId of boidIds) {
      log.debug("checking for fah data for", boidId)
      queryTimer = new Timer().start()
      const lastRecord = await db.getLastFahRecordofRound(boidId, reportingRound)
      if (!lastRecord) continue
      const previousRecord = await db.getLastFahRecordofRound(boidId, previousRound)
      if (!previousRecord) continue
      log.debug("found fah data for ", boidId)
      const units = lastRecord.score - previousRecord.score
      if (units < 1) continue

      log.debug("queries finished in ms", queryTimer.stop().elapsed)
      log.debug("found valid reports for", boidId)
      log.debug("reporting round last report:", lastRecord)
      log.debug("previous round last report:", previousRecord)
      log.info(boidId, "earned", units, "FaH credits during round ", reportingRound.round)

      const report = PwrReport.from({ protocol_id: 0, round: reportingRound.round, units })
      const reportId = getReportId(report)
      const existing = await getPwrReport(boidId, reportId)
      let shouldFinish = false
      log.debug("existing report:", existing)

      if (existing) {
        shouldFinish = await shouldFinishReport(existing)

        // make sure we already reported and check if weight threshold has been reached
        const approved = existing.approvals.includes(Name.from(env.worker.account))
        if (approved && shouldFinish) {
          log.info("sending finish action for report:", reportId)
          const finishAct = pwrActions.finishReport(Finishreport.from({ boid_id_scope: boidId, pwrreport_id: reportId }))
          pusher.add(finishAct)
          // continue to next itteration of loop
        }
        continue
      }
      // report doesn't already exist so push the report
      const action = pwrActions.pwrReport(PwrReportAction.from(
        {
          oracle: env.worker.account,
          boid_id_scope: boidId,
          report
        }
      ))
      pusher.add(action)
    }
    // pusher.stop()
  } catch (error:any) {
    log.error(error.toString())
    log.debug(error)
  }
}
init()
