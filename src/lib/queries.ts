import { getAllScopes, getFullTable, pickRpc, safeDo } from "./eosio"
import * as sys from "lib/types/boid-contract-structure"
import * as pwr from "./types/power.boid.types"
import env from "./env"
import cacheManager from "cache-manager"
import ax from "axios"
import prisma from "lib/db"
import { finalRound, getReportId, roundData } from "lib/utils"
import log from "lib/logger"
import { API, NameType, UInt64 } from "@wharfkit/antelope"
let cache = await cacheManager.caching("memory", { max: 100, ttl: 300/*seconds*/ })

function getUser(id:string, cb:() =>{}) {

}

export async function getSysConf():Promise<sys.Types.Config> {
  const config = await getFullTable({ tableName: "config", contract: env.contracts.system }, sys.Types.Config)
  if (!config[0]) throw (new Error("system contract not initialized "))
  return config[0]
}

export async function getPwrConf():Promise<pwr.Types.PwrConfig> {
  const config = await getFullTable({ tableName: "config", contract: env.contracts.power }, pwr.Types.PwrConfig)
  if (!config[0]) throw (new Error("power contract not initialized "))
  return config[0]
}
export async function getPwrGlobal():Promise<pwr.Types.PwrGlobal> {
  const global = await getFullTable({ tableName: "global", contract: env.contracts.power }, pwr.Types.PwrGlobal)
  if (!global[0]) throw (new Error("power contract not initialized "))
  return global[0]
}
export async function getPwrStats():Promise<pwr.Types.PwrStat[]> {
  const stats = await getFullTable({ tableName: "stats", contract: env.contracts.power }, pwr.Types.PwrStat)
  return stats
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
export async function getOracleStat(scope:NameType, round:number) {
  // pickRpc().rpc.get_table_rows({lower_bound:})
  const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "oraclestats", scope, limit: 1, type: pwr.Types.OracleStat, lower_bound: UInt64.from(round) }) as API.v1.GetTableRowsResponse
  if (result.rows.length == 0 || result.rows[0].round.toNumber() != round) return null
  return result.rows[0] as pwr.Types.OracleStat
}
export async function getOldestReport(scope:NameType):Promise<null|pwr.Types.PwrReportRow> {
  const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "pwrreports", scope, limit: 1, type: pwr.Types.PwrReportRow, index_position: "secondary", reverse: false }) as API.v1.GetTableRowsResponse
  if (!result || result.rows.length == 0) return null
  else return result.rows[0]
}
export async function getOldestOracleStat(scope:NameType):Promise<null|pwr.Types.OracleStat> {
  const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "oraclestats", scope, limit: 1, reverse: false, type: pwr.Types.OracleStat }) as API.v1.GetTableRowsResponse
  if (!result || result.rows.length == 0) return null
  else return result.rows[0]
}
export async function getOldestRoundCommit(scope:NameType):Promise<null|pwr.Types.RoundCommit> {
  const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "roundcommit", scope, limit: 1, reverse: false, type: pwr.Types.RoundCommit }) as API.v1.GetTableRowsResponse
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

export async function getPwrReport(boidId:string, reportId:UInt64):Promise<pwr.Types.PwrReportRow | null> {
  const existing = await safeDo("get_table_rows", { code: env.contracts.power, table: "pwrreports", limit: 1, lower_bound: reportId, scope: boidId, type: pwr.Types.PwrReportRow })
  if (!existing.rows[0]) return null
  else if (!getReportId(existing.rows[0].report).equals(reportId)) return null
  else return existing.rows[0]
}

export async function getStatRow(round:number):Promise<pwr.Types.PwrStat | null> {
  const round_id = UInt64.from(round)
  const existing = await pickRpc().rpc.get_table_rows({ code: env.contracts.power, table: "stats", limit: 1, lower_bound: round_id, type: pwr.Types.PwrStat })
  if (!existing.rows[0]) return null
  else if (!existing.rows[0].round.equals(round_id)) return null
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
    pwrReports: (scope:NameType) => cache.wrap("pwrReports:" + scope, () => getPwrReports(scope)),
    stats: () => cache.wrap("pwrstats", getPwrStats)
  }
}

export const dbQuery = {
  getAllBoidUsers() {
    return prisma.boidAccount.findMany()
  },
  async getLastFahRecordofRound(boidId:string, roundData:roundData) {
    log.debug(boidId, "getLastFahRecordofRound", roundData)
    const result = await prisma.fahData.findFirst({
      orderBy: { time: "desc" },
      where: { time: { lt: roundData.end, gt: roundData.start }, name: boidId }
    })
    log.debug(result)
    return result
  }
}
