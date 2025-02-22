import { Action, Int32Type, NameType, Signature, UInt16Type, UInt32, UInt64, UInt8Type } from "@wharfkit/antelope"
import getConfig from "lib/config"
import { Types } from "lib/types/boid-contract-structure"
import { Types as EVMboidTypes } from "lib/types/evm.boid"
import * as pwr from "lib/types/power.boid.types"
const env = getConfig()
const authorization = [{ actor: env.worker.account, permission: env.worker.permission }]
const pwrAcct = env.contracts.power

function createAct(name:string, data:Record<string, any> = {}, account = pwrAcct) {
  return Action.from({ account, name, authorization, data })
}

export const pwrActions = {
  pwrReport: (data:pwr.Types.pwrreport) => createAct("pwrreport", data),
  roundStats: () => createAct("roundstats"),
  finishReport: (data:{boid_id_scope:NameType, pwrreport_id:UInt64}) => createAct("finishreport", pwr.Types.finishreport.from(data)),
  mergeReports: (data:{boid_id_scope:NameType, pwrreport_ids:UInt64[]}) => createAct("mergereports", pwr.Types.mergereports.from(data)),
  reportsClean: (data:{scope:NameType}) => createAct("reportsclean", pwr.Types.reportsclean.from(data)),
  reportedClean: (data:{scope:NameType}) => createAct("reprtedclean", pwr.Types.reprtedclean.from(data)),
  oracleStatsClean: (data:{ scope:NameType }) => createAct("ostatsclean", pwr.Types.ostatsclean.from(data)),
  roundCommitClean: (data:{ scope:NameType, round:UInt16Type }) => createAct("commitsclean", pwr.Types.commitsclean.from(data)),
  payoutround: (data:{ oracle:NameType, round:number }) => createAct("payoutround", pwr.Types.payoutround.from(data)),
  roundCommit: (data:{oracle:NameType, boid_id:NameType, round:UInt16Type, protocol_id:UInt8Type}) => createAct("roundcommit", pwr.Types.roundcommit.from(data))
}

export const sysActions = {
  auth: (data:{ boid_id:NameType, actions:Action[], sig:Signature, keyIndex:number | UInt32 }) => createAct("auth", Types.Auth.from(data), env.contracts.system),
  buyAccount: (data:{ sponsor:NameType, boid_id:NameType, key:string }) => createAct("account.buy", Types.accountbuy.from(Object.assign(data, { owners: [] })), env.contracts.system),
  claim: (data:{ boid_id:NameType }) => createAct("power.claim", Types.powerclaim.from(data), env.contracts.system),
  inviteRm: (data:{ sponsor_boid_id:NameType, invite_code:number | string | UInt64 }) => createAct("invite.rm", Types.inviterm.from(data), env.contracts.system),
  boosterRm: (data:{boid_id:NameType, booster_index:Int32Type[]}) => createAct("booster.rm", Types.boosterrm.from(data), env.contracts.system),
  pwrAdd: (data:{ boid_id:NameType, power:UInt16Type }) => createAct("power.add", Types.poweradd.from(data), env.contracts.system)
}

export const evmActions = {
  reqnotify: (data:{ req_id:UInt64 }) => createAct("reqnotify", EVMboidTypes.reqnotify.from(data), env.contracts.evmBridge),
  verifytrx: (data:{ req_id:UInt64 }) => createAct("verifytrx", EVMboidTypes.verifytrx.from(data), env.contracts.evmBridge)
}

export const actions = {
  sys: sysActions,
  pwr: pwrActions,
  evm: evmActions
}
