import { getAllScopes, getFullTable, pickRpc } from "./eosio"
import * as sys from "./types/boid.system"
import * as pwr from "./types/power.boid.types"
import env from "./env"
import cacheManager from "cache-manager"
import ax from "axios"
import prisma from "lib/db"
import { roundData } from "lib/utils"
import log from "lib/logger"
import { NameType, UInt64 } from "@greymass/eosio"

let cache = cacheManager.caching({ store: "memory", max: 100, ttl: 300/*seconds*/ })

function getUser(id:string, cb:() =>{}) {

}

// export tableCache

export async function getSysConf():Promise<sys.Config> {
  const config = await getFullTable<sys.Config>({ tableName: "config", contract: env.contracts.system }, sys.Config)
  if (!config[0]) throw (new Error("system contract not initialized "))
  return config[0]
}
export async function getSysConf2():Promise<any> {
  const config = await getFullTable<any>({ tableName: "config", contract: env.contracts.system })
  if (!config[0]) throw (new Error("system contract not initialized "))
  return config[0]
}

export async function getPwrConf():Promise<pwr.Config> {
  const config = await getFullTable<pwr.Config>({ tableName: "config", contract: env.contracts.power }, pwr.Config)
  if (!config[0]) throw (new Error("power contract not initialized "))
  return config[0]
}
export async function getPwrGlobal():Promise<pwr.Global> {
  const global = await getFullTable<pwr.Global>({ tableName: "global", contract: env.contracts.power }, pwr.Global)
  if (!global[0]) throw (new Error("power contract not initialized "))
  return global[0]
}
export async function getPwrStats():Promise<pwr.Stat[]> {
  const stats = await getFullTable<pwr.Stat>({ tableName: "stats", contract: env.contracts.power }, pwr.Stat)
  return stats
}

export async function getPwrOracles() {
  const oracles = await getFullTable<pwr.Oracle>({ tableName: "oracles", contract: env.contracts.power }, pwr.Oracle)
  return oracles
}
export async function getPwrReports(scope:NameType) {
  const pwrReports = await getFullTable<pwr.PwrReportRow>({ tableName: "pwrreports", contract: env.contracts.power, scope }, pwr.PwrReportRow)
  return pwrReports
}
export function getReportScopes() {
  return getAllScopes({ code: env.contracts.power, table: "pwrreports" })
}
export async function getAllReports() {
  // get all pwrreports from all available scopes (boidId)
  const reportScopes = await getReportScopes()
  let allPwrReports:pwr.PwrReportRow[] = []
  for (const boidId of reportScopes) {
    const reports = await tables.pwr.pwrReports(boidId)
    reports.forEach(el => allPwrReports.push(el))
  }
  return allPwrReports
}

export async function getPwrReport(boidId:string, reportId:number):Promise<pwr.PwrReportRow | null> {
  const report_id = UInt64.from(reportId)
  const existing = await pickRpc().rpc.get_table_rows({ code: env.contracts.power, table: "pwrreports", limit: 1, lower_bound: report_id, scope: boidId, type: pwr.PwrReportRow })
  if (!existing.rows[0]) return null
  else if (!existing.rows[0].report_id.equals(report_id)) return null
  else return existing.rows[0]
}
export async function getStatRow(round:number):Promise<pwr.Stat | null> {
  const round_id = UInt64.from(round)
  const existing = await pickRpc().rpc.get_table_rows({ code: env.contracts.power, table: "stats", limit: 1, lower_bound: round_id, type: pwr.Stat })
  if (!existing.rows[0]) return null
  else if (!existing.rows[0].round.equals(round_id)) return null
  else return existing.rows[0]
}

export const tables = {
  sys: {
    config: () => cache.wrap("sysconf", getSysConf)
  },
  pwr: {
    config: () => cache.wrap("pwrconfig", getPwrConf),
    global: () => cache.wrap("pwrglobal", getPwrGlobal),
    oracles: () => cache.wrap("pwroracles", getPwrOracles),
    pwrReports: (scope:NameType) => cache.wrap("pwrReports:" + scope, () => getPwrReports(scope)),
    stats: () => cache.wrap("pwrstats", getPwrStats)
  }
}

export const db = {
  getAllBoidUsers() {
    return prisma.boidAccount.findMany()
  },
  getLastFahRecordofRound(boidId:string, roundData:roundData) {
    return prisma.fahData.findFirst({
      orderBy: { time: "desc" },
      where: { time: { lt: roundData.end, gt: roundData.start }, name: boidId }
    })
  }
}
