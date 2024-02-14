import { Action, AnyAction, Int32Type, Name, NameType, Signature, UInt16Type, UInt32, UInt64 } from "@wharfkit/antelope"
import env from "lib/env"
import { Types } from "lib/types/boid-contract-structure"
import * as pwr from "lib/types/power.boid.types"
const authorization = [{ actor: env.worker.account, permission: env.worker.permission }]
const pwrAcct = env.contracts.power

function createAct(name:string, data:Record<string, any> = {}, account = pwrAcct) {
  return Action.from({ account, name, authorization, data })
}

export const pwrActions = {
  pwrReport: (data:pwr.Types.pwrreport) => createAct("pwrreport", data),
  roundStats: () => createAct("roundstats"),
  finishReport: (data:{boid_id_scope:NameType, pwrreport_id:UInt64}) => createAct("finishreport", pwr.Types.finishreport.from(data)),
  mergeReports: (data:{boid_id_scope:NameType, pwrreport_ids:UInt64[]}) => createAct("finishreport", pwr.Types.mergereports.from(data)),
  reportsClean: (data:{scope:NameType}) => createAct("reportsclean", pwr.Types.reportsclean.from(data)),
  oracleStatsClean: (data:{ scope:NameType }) => createAct("ostatsclean", pwr.Types.ostatsclean.from(data)),
  roundCommitClean: (data:{ scope:NameType }) => createAct("commitsclean", pwr.Types.commitsclean.from(data)),
  payoutround: (data:{ oracle:NameType, round:number }) => createAct("payoutround", pwr.Types.payoutround.from(data))
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
