import { Name } from "@wharfkit/antelope"
import { ActionPusher } from "lib/actionPusher"
import { pwrActions, sysActions } from "lib/actions"
import db from "lib/db"
import env from "lib/env"
import { doAction, sendAction } from "lib/eosio"
import log from "lib/logger"
import { dbQuery, getPwrReport } from "lib/queries"
import { Timer } from "lib/timer"
import { currentRound, getReportId, getRoundData, shouldFinishReport, toInt, toObject } from "lib/utils"

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
      // if (boidId != "seth.voice") continue
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
      log.info("lastRecord:", lastRecord)
      log.info("previousRecord:", previousRecord)
      log.debug("queries finished in ms", queryTimer.stop().elapsed)
      log.debug("found valid reports for", boidId)
      log.info(boidId, "earned", units, "FaH credits during round ", reportingRound.round)
      const power = parseInt((toInt(units) * 0.001).toFixed(0))
      log.info("reporting power of ", power.toString())
      const addPower = sysActions.pwrAdd({ boid_id: boidId, power })
      const result = await sendAction(addPower)
      if (!result || result.receipts.length === 0) {
        log.warn("failed adding power for", boidId)
        log.warn("result:", result)
        continue
      } else {
        const trxId = result.receipts[0].receipt.id
        await db.adminReport.create({ data: { boid_id: boidId, protocol: 0, round: reportingRound.round, trxId, power } })
        log.info("added power for, saved report to db", boidId, power)
      }
    }
  } catch (error:any) {
    log.error(error.toString())
    log.debug(error)
  }
}
await init()
process.exit(0)
