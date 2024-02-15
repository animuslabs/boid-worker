import { Action, AnyAction, Authority, Name, UInt64 } from "@wharfkit/antelope"
import { ActionPusher } from "lib/actionPusher"
import edgedb from "lib/db"
import log from "lib/logger"
import { tables, dbQuery, getPwrReport } from "lib/queries"
import { Timer } from "lib/timer"
import { currentRound, getReportId, getRoundData, shouldFinishReport, toObject } from "lib/utils"
import env from "lib/env"
import * as pwr from "lib/types/power.boid.types"
import { pickRpc, safeDo } from "lib/eosio"
import { info } from "console"
import { pwrActions } from "lib/actions"

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
    const round = await currentRound()

    for (const boidId of boidIds) {
      log.debug("checking for fah data for", boidId)
      queryTimer = new Timer().start()
      const lastRecord = await dbQuery.getLastFahRecordofRound(boidId, reportingRound)
      if (!lastRecord) continue
      const previousRecord = await dbQuery.getLastFahRecordofRound(boidId, previousRound)
      if (!previousRecord) continue
      log.debug("found fah data for ", boidId)
      const units = lastRecord.score - previousRecord.score
      if (units < 1) continue

      // log.debug("queries finished in ms", queryTimer.stop().elapsed)
      // log.debug("found valid reports for", boidId)
      // log.debug("reporting round last report:", lastRecord)
      // log.debug("previous round last report:", previousRecord)
      log.info(boidId, "earned", units, "FaH credits during round ", reportingRound.round)
      const report = pwr.Types.PwrReport.from({ protocol_id: 0, round: reportingRound.round, units })
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

