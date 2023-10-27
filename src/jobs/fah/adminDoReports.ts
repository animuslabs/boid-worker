import { Name } from "@greymass/eosio"
import { ActionPusher } from "lib/actionPusher"
import { pwrActions, sysActions } from "lib/actions"
import db from "lib/db"
import env from "lib/env"
import { doAction, sendAction } from "lib/eosio"
import log from "lib/logger"
import { dbQuery, getPwrReport } from "lib/queries"
import { Timer } from "lib/timer"
import { Finishreport, PwrReport, PwrReportAction } from "lib/types/power.boid.types"
import { currentRound, getReportId, getRoundData, shouldFinishReport } from "lib/utils"

async function init() {
  try {
    const round = await currentRound()
    const reportingRound = await getRoundData(round - 1)
    const previousRound = await getRoundData(round - 2)
    log.info("generating reports for round: ", reportingRound)
    const allBoidUsers = await dbQuery.getAllBoidUsers()
    const boidIds = allBoidUsers.map(el => el.boidId.toString())
    log.info("found boid ids:", boidIds.length)
    let queryTimer

    for (const boidId of boidIds) {
      log.debug("checking for fah data for", boidId)
      const reported = await db.adminReport.findFirst({ where: { boid_id: boidId, protocol: 0, round: reportingRound.round } })
      if (reported) {
        log.info(boidId, "already reported for round", reportingRound.round)
        continue
      }
      queryTimer = new Timer().start()
      const lastRecord = await dbQuery.getLastFahRecordofRound(boidId, reportingRound)
      if (!lastRecord) continue
      const previousRecord = await dbQuery.getLastFahRecordofRound(boidId, previousRound)
      if (!previousRecord) continue
      log.debug("found fah data for ", boidId)
      const units = lastRecord.score - previousRecord.score
      if (units < 1) continue

      log.debug("queries finished in ms", queryTimer.stop().elapsed)
      log.debug("found valid reports for", boidId)
      log.debug("reporting round last report:", lastRecord)
      log.debug("previous round last report:", previousRecord)
      log.info(boidId, "earned", units, "FaH credits during round ", reportingRound.round)


      const power = parseInt(units.toString()) * 0.01
      const addPower = sysActions.pwrAdd({ boid_id: boidId, power })
      const result = await sendAction(addPower)
      if (!result || result.receipts.length === 0) {
        log.warn("failed adding power for", boidId)
        log.warn("result:", result)
        continue
      } else {
        log.debug("added power for", boidId, power)
        const trxId = result.receipts[0].receipt.id
        await db.adminReport.create({ data: { boid_id: boidId, protocol: 0, round: reportingRound.round, trxId, power } })
      }
    }
  } catch (error:any) {
    log.error(error.toString())
    log.debug(error)
  }
}
init()
