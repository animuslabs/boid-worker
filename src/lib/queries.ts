import { getFullTable, pickRpc } from "./eosio"
import * as sys from "./types/boid.system"
import * as pwr from "./types/power.boid.types"
import env from "./env"
import cacheManager from "cache-manager"
import ax from "axios"
import prisma from "lib/db"
import { roundData } from "lib/utils"
import log from "lib/logger"
import { UInt64 } from "@greymass/eosio"

let cache = cacheManager.caching({ store: "memory", max: 100, ttl: 300/*seconds*/ })

function getUser(id:string, cb:() =>{}) {

}

// export tableCache

export async function getSysConf():Promise<sys.Config> {
  const config = await getFullTable<sys.Config>({ tableName: "config", contract: env.contracts.system }, sys.Config)
  if (config.length == 0) throw (new Error("system contract not initialized "))
  return config[0]
}
export async function getSysConf2():Promise<any> {
  const config = await getFullTable<any>({ tableName: "config", contract: env.contracts.system })
  if (config.length == 0) throw (new Error("system contract not initialized "))
  return config[0]
}

export async function getPwrConf():Promise<pwr.Config> {
  const config = await getFullTable<pwr.Config>({ tableName: "config", contract: env.contracts.power }, pwr.Config)
  if (config.length == 0) throw (new Error("power contract not initialized "))
  return config[0]
}
export async function getPwrGlobal():Promise<pwr.Global> {
  const global = await getFullTable<pwr.Global>({ tableName: "config", contract: env.contracts.power }, pwr.Global)
  if (global.length == 0) throw (new Error("power contract not initialized "))
  return global[0]
}

export async function getPwrReport(boidId:string, reportId:number):Promise<pwr.PwrReportRow | null> {
  const report_id = UInt64.from(reportId)
  const existing = await pickRpc().rpc.get_table_rows({ code: env.contracts.power, table: "pwrreports", limit: 1, lower_bound: report_id, scope: boidId, type: pwr.PwrReportRow })
  if (existing.rows.length == 0) return null
  else if (!existing.rows[0].report_id.equals(report_id)) return null
  else return existing.rows[0]
}

export const tables = {
  sys: {
    config: () => cache.wrap("sysconf", getSysConf)
  },
  pwr: {
    config: () => cache.wrap("pwrconfig", getPwrConf),
    global: () => cache.wrap("pwrglobal", getPwrGlobal)
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
