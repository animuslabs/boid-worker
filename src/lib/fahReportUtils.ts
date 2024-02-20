import { pwrActions } from "lib/actions"
import env from "lib/env"
import { sendAction } from "lib/eosio"
import log from "lib/logger"
import { dbQuery, getPwrReport } from "lib/queries"
import * as pwr from "lib/types/power.boid.types"
import { RoundData, currentRound, getReportId, getRoundData, toObject } from "lib/utils"

export async function handleProtocol(protocol_id:number) {
  const reportingRound = await getRoundData((await currentRound()) - 1)
  const previousRound = await getRoundData((await currentRound()) - 2)
  log.info("generating reports for round: ", reportingRound, "and protocol:", protocol_id)
  const allBoidUsers = await dbQuery.getAllBoidUsers()
  const boidIds = allBoidUsers.map(el => el.boidId.toString())
  for (const boidId of boidIds) {
    await handleBoidId(protocol_id, boidId, reportingRound, previousRound)
  }
}

export async function findUnitsEarned(protocol_id:number, boidId:string, reportingRound:RoundData, previousRound:RoundData) {
  log.debug("checking for fah protocol:", protocol_id, "data for", boidId)
  const protocolCpids = await dbQuery.getFahAccountProtocolid(boidId, { start: previousRound.start, end: reportingRound.end })
  let units = BigInt(0)
  for (const { fahid } of protocolCpids) {
    log.debug("found fahid", fahid, "for boidid:", boidId)
    const lastRecord = await dbQuery.getLastFahRecordofRound(boidId, reportingRound, fahid)
    if (!lastRecord) continue
    const previousRecord = await dbQuery.getLastFahRecordofRound(boidId, previousRound, fahid)
    if (!previousRecord) continue
    log.debug("found fah data for ", boidId, "and cpid:", fahid)
    const unitsEarned = lastRecord.score - previousRecord.score
    if (unitsEarned < 1) {
      log.debug("units earned too low:", unitsEarned)
      continue
    }
    units += unitsEarned
  }
  log.debug("final units for boidId:", boidId, "and protocol:", protocol_id, "is:", units)
  return units
}

export async function handleBoidId(protocol_id:number, boidId:string, reportingRound:RoundData, previousRound:RoundData) {
  const units = await findUnitsEarned(protocol_id, boidId, reportingRound, previousRound)
  log.info(boidId, "earned", units, "fah credits during round ", reportingRound.round)
  if (units < BigInt(1)) {
    console.debug("skipping report, no units")
    return
  }
  const report = pwr.Types.PwrReport.from({ protocol_id, round: reportingRound.round, units })
  const reportId = getReportId(report)
  const existing = await getPwrReport(boidId, reportId)
  log.debug("existing report:", toObject(existing))
  if (existing) {
    const approved = existing.approvals.find(el => el.equals(env.worker.account))
    if (approved) {
      log.debug("this oracle already on the list of approvals, skipping")
      return
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
