import { Action, AnyAction, Name, NameType, Signature, UInt32, UInt64 } from "@greymass/eosio"
import env from "lib/env"
import { AccountBuy, Auth, PowerClaim, StatsClean } from "lib/types/boid.system"
import { Finishreport, Handleostat, Mergereports, OracleStat, Ostatsclean, PwrReportAction, Reportsclean, Slashabsent, Statsclean } from "lib/types/power.boid.types"
const authorization = [{ actor: env.worker.account, permission: env.worker.permission }]
const pwrAcct = env.contracts.power

function createAct(name:string, data:Record<string, any> = {}, account = pwrAcct) {
  return Action.from({ account, name, authorization, data })
}

export const pwrActions = {
  pwrReport: (data:PwrReportAction) => createAct("pwrreport", data),
  roundStats: () => createAct("roundstats"),
  slashAbsent: (data:Slashabsent) => createAct("slashabsent", data),
  finishReport: (data:{boid_id_scope:NameType, pwrreport_id:UInt64}) => createAct("finishreport", Finishreport.from(data)),
  mergeReports: (data:Mergereports) => createAct("mergereports", data),
  statsClean: () => createAct("statsclean"),
  reportsClean: (data:{scope:NameType}) => createAct("reportsclean", Reportsclean.from(data)),
  oracleStatsClean: (data:{ scope:NameType }) => createAct("ostatsclean", Ostatsclean.from(data)),
  handleostat: (data:{ oracle:NameType, round:number }) => createAct("handleostat", Handleostat.from(data))
}

export const sysActions = {
  auth: (data:{ boid_id:NameType, actions:Action[], sig:Signature, keyIndex:number | UInt32 }) => createAct("auth", Auth.from(data), "boid"),
  buyAccount: (data:{ sponsor:NameType, boid_id:NameType, key:string }) => createAct("account.buy", AccountBuy.from(Object.assign(data, { owners: [] })), "boid"),
  claim: (data:{boid_id:NameType}) => createAct("power.claim", PowerClaim.from(data), "boid")
}
