import { Name } from "@wharfkit/antelope"
import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import env from "lib/env"
import { doAction, sendAction } from "lib/eosio"
import log from "lib/logger"
import { dbQuery, getBoincProtocols, getPwrReport } from "lib/queries"
import { Timer } from "lib/timer"
import * as pwr from "lib/types/power.boid.types"
import { currentRound, getReportId, getRoundData, toObject } from "lib/utils"

const boincMetas = await getBoincProtocols()
for (const boincMeta of boincMetas) {
  await handleProtocol(boincMeta)
}

async function handleProtocol(boincMeta:pwr.Types.BoincMeta) {
  try {
    const reportingRound = await getRoundData((await currentRound()) - 1)
    const previousRound = await getRoundData((await currentRound()) - 2)
    const protocol_id = boincMeta.protocol_id.toNumber()
    log.info("generating reports for round: ", reportingRound, "and protocol:", protocol_id)
    const allBoidUsers = await dbQuery.getAllBoidUsers()
    const boidIds = allBoidUsers.map(el => el.boidId.toString())
    for (const boidId of boidIds) {
      log.debug("checking for boinc protocol:", protocol_id, "data for", boidId)
      const protocolCpids = await dbQuery.getBoidAccountProtocolCpid(boidId, { start: previousRound.start, end: reportingRound.end }, protocol_id)
      let units = BigInt(0)
      for (const { cpid } of protocolCpids) {
        log.debug("found cpid", cpid, "for boidid:", boidId)
        const lastRecord = await dbQuery.getLastBoincRecordofRound(boidId, reportingRound, protocol_id, cpid)
        if (!lastRecord) continue
        const previousRecord = await dbQuery.getLastBoincRecordofRound(boidId, previousRound, protocol_id, cpid)
        if (!previousRecord) continue
        log.debug("found boinc data for ", boidId, "and cpid:", cpid)
        const unitsEarned = lastRecord.credits - previousRecord.credits
        if (unitsEarned < 1) {
          log.debug("units earned too low:", unitsEarned)
          continue
        }
        units += unitsEarned
      }
      log.info(boidId, "earned", units, "Boinc credits during round ", reportingRound.round)
      if (units < BigInt(1)) {
        console.debug("skipping report, no units")
        continue
      }
      const report = pwr.Types.PwrReport.from({ protocol_id, round: reportingRound.round, units })
      const reportId = getReportId(report)
      const existing = await getPwrReport(boidId, reportId)
      log.debug("existing report:", toObject(existing))
      if (existing) {
        const approved = existing.approvals.find(el => el.equals(env.worker.account))
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
      log.info("report not yet reported. Adding new Report:", reportId.toString())
      await sendAction(action)
    }
  } catch (error:any) {
    log.error(error.toString())
    log.debug(error)
  }
}

process.exit(0)

