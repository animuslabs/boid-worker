import { Action, AnyAction, Int32Type, Name, NameType, Signature, UInt16Type, UInt32, UInt64 } from "@wharfkit/antelope"
import env from "lib/env"
import { Types } from "lib/types/boid-contract-structure"
import { Commitsclean, Finishreport, Handleostat, OracleStat, Ostatsclean, PwrReportAction, Reportsclean, RoundCommit, Slashabsent, Statsclean } from "lib/types/power.boid.types"
const authorization = [{ actor: env.worker.account, permission: env.worker.permission }]
const pwrAcct = env.contracts.power

function createAct(name:string, data:Record<string, any> = {}, account = pwrAcct) {
  return Action.from({ account, name, authorization, data })
}

export const pwrActions = {
  pwrReport: (data:PwrReportAction) => createAct("pwrreport", data),
  roundStats: () => createAct("roundstats"),
  slashAbsent: (data:Slashabsent) => createAct("slashabsent", data),
  finishReport: (data:{boid_id_scope:NameType, pwrreport_ids:UInt64[]}) => createAct("finishreport", Finishreport.from(data)),
  reportsClean: (data:{scope:NameType}) => createAct("reportsclean", Reportsclean.from(data)),
  oracleStatsClean: (data:{ scope:NameType }) => createAct("ostatsclean", Ostatsclean.from(data)),
  roundCommitClean: (data:{ scope:NameType }) => createAct("commitsclean", Commitsclean.from(data)),
  handleostat: (data:{ oracle:NameType, round:number }) => createAct("handleostat", Handleostat.from(data))
}

export const sysActions = {
  auth: (data:{ boid_id:NameType, actions:Action[], sig:Signature, keyIndex:number | UInt32 }) => createAct("auth", Types.Auth.from(data), env.contracts.system),
  buyAccount: (data:{ sponsor:NameType, boid_id:NameType, key:string }) => createAct("account.buy", Types.accountbuy.from(Object.assign(data, { owners: [] })), env.contracts.system),
  claim: (data:{ boid_id:NameType }) => createAct("power.claim", Types.powerclaim.from(data), env.contracts.system),
  inviteRm: (data:{ sponsor_boid_id:NameType, invite_code:number | string | UInt64 }) => createAct("invite.rm", Types.inviterm.from(data), env.contracts.system),
  pwrModRm: (data:{boid_id:NameType, pwrmod_index:Int32Type[]}) => createAct("booster.rm", Types.boosterrm.from(data), env.contracts.system),
  pwrAdd: (data:{ boid_id:NameType, power:UInt16Type }) => createAct("power.add", Types.poweradd.from(data), env.contracts.system)
}

export const actions = {
  sys: sysActions,
  pwr: pwrActions
}
