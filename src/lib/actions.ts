import { Action, AnyAction } from "@greymass/eosio"
import env from "lib/env"
import { Finishreport, Mergereports, PwrReportAction, Slashabsent } from "lib/types/power.boid.types"
const authorization = [{ actor: env.worker.account, permission: env.worker.permission }]
const pwrAcct = env.contracts.power

function createAct(name:string, data:Record<string, any> = {}, account = pwrAcct) {
  return Action.from({ account, name, authorization, data })
}

export const pwrActions = {
  pwrReport: (data:PwrReportAction) => createAct("pwrreport", data),
  roundStats: () => createAct("roundstats"),
  slashAbsent: (data:Slashabsent) => createAct("slashabsent", data),
  finishReport: (data:Finishreport) => createAct("finishreport", data),
  mergeReports: (data:Mergereports) => createAct("mergereports", data)
}
