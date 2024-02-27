import { computeAction, getAllScopes, getFullTable, pickRpc, safeDo } from "./eosio"
import * as sys from "lib/types/boid-contract-structure"
import * as pwr from "./types/power.boid.types"
import env, { ChainsType } from "./env"
import cacheManager from "cache-manager"
import ax from "axios"
import prisma from "lib/db"
import { finalRound, getByRoundProtocolBoidId, getReportId, RoundData } from "lib/utils"
import Logger from "lib/logger"
import { API, Name, NameType, UInt128, UInt16, UInt16Type, UInt64, UInt64Type, UInt8, UInt8Type } from "@wharfkit/antelope"
import ms from "ms"
import { pwrActions } from "lib/actions"
const log = Logger.getLogger("queries")
// import { API, NameType, UInt64 } from "@greymass/eosio"
let cache = await cacheManager.caching("memory", { max: 100, ttl: 300/*seconds*/ })

export async function getSysConf():Promise<sys.Types.Config> {
  const config = await getFullTable({ tableName: "config", contract: env.contracts.system }, sys.Types.Config)
  if (!config[0]) throw (new Error("system contract not initialized "))
  return config[0]
}

export async function getPwrConf():Promise<pwr.Types.PwrConfig> {
  const config = await getFullTable({ tableName: "pwrconfig", contract: env.contracts.power }, pwr.Types.PwrConfig)
  if (!config[0]) throw (new Error("power contract not initialized "))
  return config[0]
}
export async function getPwrGlobal():Promise<pwr.Types.PwrGlobal> {
  const global = await getFullTable({ tableName: "global", contract: env.contracts.power }, pwr.Types.PwrGlobal)
  if (!global[0]) throw (new Error("power contract not initialized "))
  return global[0]
}

export async function getPwrOracles() {
  const oracles = await getFullTable({ tableName: "oracles", contract: env.contracts.power }, pwr.Types.Oracle)
  return oracles
}
export async function getPwrReports(scope:NameType) {
  const pwrReports = await getFullTable({ tableName: "pwrreports", contract: env.contracts.power, scope }, pwr.Types.PwrReportRow)
  return pwrReports
}
export async function getOracleStats(scope:NameType) {
  const oStats = await getFullTable({ tableName: "oraclestats", contract: env.contracts.power, scope }, pwr.Types.OracleStat)
  return oStats
}
export async function commitExists(oracle:NameType, boid_id:NameType, round:UInt16Type, protocol_id:UInt8Type):Promise<boolean> {
  const data = { oracle, boid_id, round, protocol_id }
  const action = pwrActions.roundCommit(data)
  const result = await computeAction(action.name, action.data, action.account).catch(console.error)
  if (!result || result?.receipts.length == 0) return false
  else return true
}
export async function getOracleStat(scope:NameType, round:number) {
  // pickRpc().rpc.get_table_rows({lower_bound:})
  const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "oraclestats", scope, limit: 1, type: pwr.Types.OracleStat, lower_bound: UInt64.from(round) }) as API.v1.GetTableRowsResponse
  if (result.rows.length == 0 || result.rows[0].round.toNumber() != round) return null
  return result.rows[0] as pwr.Types.OracleStat
}
export async function getOldestReport(scope:NameType):Promise<null|pwr.Types.PwrReportRow> {
  const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "pwrreports", scope, limit: 1, type: pwr.Types.PwrReportRow, reverse: false }) as API.v1.GetTableRowsResponse
  if (!result || result.rows.length == 0) return null
  else return result.rows[0]
}
export async function getOldestOracleStat(scope:NameType):Promise<null|pwr.Types.OracleStat> {
  const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "oraclestats", scope, limit: 1, reverse: false, type: pwr.Types.OracleStat }) as API.v1.GetTableRowsResponse
  if (!result || result.rows.length == 0) return null
  else return result.rows[0]
}
export async function getOldestRoundCommit(scope:NameType):Promise<null|pwr.Types.RoundCommit> {
  const params:API.v1.GetTableRowsParamsTyped = { scope, code: env.contracts.power, table: "roundcommit", index_position: "secondary", type: pwr.Types.RoundCommit, limit: 1 }
  const result = await safeDo("get_table_rows", params) as API.v1.GetTableRowsResponse
  if (!result || result.rows.length == 0) return null
  else return result.rows[0]
}
export async function getRoundCommit(scope:NameType, boidId:Name, protocolId:number, round:number):Promise<null|pwr.Types.RoundCommit> {
  const id = getByRoundProtocolBoidId(boidId, protocolId, round)
  log.info(id.toString())
  const params:API.v1.GetTableRowsParams = { scope, code: env.contracts.power, table: "roundcommit", limit: 1, json: true }
  const result = await safeDo("get_table_rows", params) as API.v1.GetTableRowsResponse

  if (!result || result.rows.length == 0) return null
  else return result.rows[0]
}
export async function getRoundCommitFromID(scope:Name, id:string):Promise<null|pwr.Types.RoundCommit> {
  const lower_bound = UInt128.from(id)
  const params:API.v1.GetTableRowsParams = { scope, code: env.contracts.power, table: "roundcommit", limit: 1, json: true, index_position: "tertiary", lower_bound }
  const result = await safeDo("get_table_rows", params) as API.v1.GetTableRowsResponse
  if (!result || result.rows.length == 0) return null
  else return result.rows[0]
}

export function getReportScopes() {
  return getAllScopes({ code: env.contracts.power, table: "pwrreports" })
}
export function getOracleStatsScopes() {
  return getAllScopes({ code: env.contracts.power, table: "oraclestats" })
}
export function getRoundCommitScopes() {
  return getAllScopes({ code: env.contracts.power, table: "roundcommit" })
}
export async function getAllReports():Promise<Record<string, pwr.Types.PwrReportRow[]>> {
  // get all pwrreports from all available scopes (boidId)
  const reportScopes = await getReportScopes()
  let allPwrReports:Record<string, pwr.Types.PwrReportRow[]> = {}
  for (const boidId of reportScopes) {
    const reports = await tables.pwr.pwrReports(boidId)
    allPwrReports[boidId.toString()] = reports
    // reports.forEach(el => allPwrReports.push(el))
  }
  return allPwrReports
}

export async function getBoincProtocols() {
  const boincRows = getFullTable({ tableName: "boincmeta", contract: env.contracts.power }, pwr.Types.BoincMeta)
  return boincRows
}

export async function getProtocols() {
  const boincRows = getFullTable({ tableName: "protocols", contract: env.contracts.power }, pwr.Types.Protocol)
  return boincRows
}

export async function getPwrReport(boidId:string, reportId:UInt64):Promise<pwr.Types.PwrReportRow | null> {
  const existing = await safeDo("get_table_rows", { code: env.contracts.power, table: "pwrreports", limit: 1, lower_bound: reportId, scope: boidId, type: pwr.Types.PwrReportRow })
  if (!existing.rows[0]) return null
  else if (!getReportId(existing.rows[0].report).equals(reportId)) return null
  else return existing.rows[0]
}

export async function getProtocolRow(id:UInt64Type):Promise<pwr.Types.Protocol | null> {
  const existing = await safeDo("get_table_rows", { code: env.contracts.power, table: "protocols", limit: 1, lower_bound: id, upper_bound: id, scope: env.contracts.power, type: pwr.Types.Protocol })
  if (!existing.rows[0]) return null
  else return existing.rows[0]
}

export async function getInvites(scope:NameType):Promise<sys.Types.Invite[]> {
  const existing = await pickRpc().rpc.get_table_rows({ code: env.contracts.system, table: "invites", limit: 100, scope, type: sys.Types.Invite })
  return existing.rows
}
export async function getInviteScopes() {
  return getAllScopes({ code: env.contracts.system, table: "invites" })
}

export const tables = {
  sys: {
    config: () => cache.wrap("sysconf", getSysConf),
    invites: (scope:NameType) => cache.wrap("invites:" + scope, () => getInvites(scope))
  },
  pwr: {
    config: () => cache.wrap("pwrconfig", getPwrConf),
    global: () => cache.wrap("pwrglobal", getPwrGlobal),
    oracles: () => cache.wrap("pwroracles", getPwrOracles),
    pwrReports: (scope:NameType) => cache.wrap("pwrReports:" + scope, () => getPwrReports(scope))
  }
}

export const dbQuery = {
  getAllBoidUsers() {
    return prisma.boidAccount.findMany()
  },
  async getRecentBoincData(boincProtocolId:number) {
    const result = await prisma.boincData.findMany({
      where: { time: { gt: new Date(Date.now() - ms("6h")) }, boincProtocolId }
    })
    return result
  },
  async getBoincAccountProtocolCpid(boidId:string, roundData:Omit<RoundData, "round"> & Partial<Pick<RoundData, "round">>, boincProtocolId:number) {
    const result = await prisma.boincData.findMany({
      distinct: ["cpid"],
      select: { cpid: true },
      where: { time: { lt: roundData.end, gt: roundData.start }, name: boidId + "@boid.com", boincProtocolId }
    })
    return result
  },
  async getFahAccountProtocolid(boidId:string, roundData:Omit<RoundData, "round"> & Partial<Pick<RoundData, "round">>) {
    const result = await prisma.fahData.findMany({
      distinct: ["fahid"],
      select: { fahid: true },
      where: { time: { lt: roundData.end, gt: roundData.start }, name: boidId }
    })
    return result
  },
  async getLastBoincRecordofRound(boidId:string, roundData:RoundData, boincProtocolId:number, cpid:string) {
    log.debug(boidId, "getLastBoincRecordofRound", roundData)
    const result = await prisma.boincData.findFirst({
      orderBy: { time: "desc" },
      where: { time: { lt: roundData.end, gt: roundData.start }, name: boidId + "@boid.com", boincProtocolId, cpid }
    })
    log.debug("getLastBoincRecordofRound result:", result)
    return result
  },
  async getLastFahRecordofRound(boidId:string, roundData:RoundData, fahid:bigint) {
    log.debug(boidId, "getLastFahRecordofRound", roundData)
    const result = await prisma.fahData.findFirst({
      orderBy: { time: "desc" },
      where: { time: { lt: roundData.end, gt: roundData.start }, name: boidId, fahid }
    })
    log.debug("getLastFahRecordofRound result:", result)
    return result
  }
}
