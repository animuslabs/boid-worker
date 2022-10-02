import { getAllScopes, getFullTable, pickRpc, safeDo } from "./eosio.js";
import * as sys from "./types/boid.system.js";
import * as pwr from "./types/power.boid.types.js";
import env from "./env.js";
import cacheManager from "cache-manager";
import prisma from "./db.js";
import { UInt64 } from "@greymass/eosio";
let cache = cacheManager.caching({ store: "memory", max: 100, ttl: 300 /*seconds*/ });
function getUser(id, cb) {
}
// export tableCache
export async function getSysConf() {
    const config = await getFullTable({ tableName: "config", contract: env.contracts.system }, sys.Config);
    if (!config[0])
        throw (new Error("system contract not initialized "));
    return config[0];
}
export async function getSysConf2() {
    const config = await getFullTable({ tableName: "config", contract: env.contracts.system });
    if (!config[0])
        throw (new Error("system contract not initialized "));
    return config[0];
}
export async function getPwrConf() {
    const config = await getFullTable({ tableName: "config", contract: env.contracts.power }, pwr.Config);
    if (!config[0])
        throw (new Error("power contract not initialized "));
    return config[0];
}
export async function getPwrGlobal() {
    const global = await getFullTable({ tableName: "global", contract: env.contracts.power }, pwr.Global);
    if (!global[0])
        throw (new Error("power contract not initialized "));
    return global[0];
}
export async function getPwrStats() {
    const stats = await getFullTable({ tableName: "stats", contract: env.contracts.power }, pwr.Stat);
    return stats;
}
export async function getPwrOracles() {
    const oracles = await getFullTable({ tableName: "oracles", contract: env.contracts.power }, pwr.Oracle);
    return oracles;
}
export async function getPwrReports(scope) {
    const pwrReports = await getFullTable({ tableName: "pwrreports", contract: env.contracts.power, scope }, pwr.PwrReportRow);
    return pwrReports;
}
export async function getOracleStats(scope) {
    const oStats = await getFullTable({ tableName: "oraclestats", contract: env.contracts.power, scope }, pwr.OracleStat);
    return oStats;
}
export async function getOracleStat(scope, round) {
    // pickRpc().rpc.get_table_rows({lower_bound:})
    const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "oraclestats", scope, limit: 1, type: pwr.OracleStat, lower_bound: UInt64.from(round) });
    if (result.rows.length == 0 || result.rows[0].round.toNumber() != round)
        return null;
    return result.rows[0];
}
export async function getOldestReport(scope) {
    const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "pwrreports", scope, limit: 1, type: pwr.PwrReportRow, index_position: "secondary", reverse: false });
    if (!result || result.rows.length == 0)
        return null;
    else
        return result.rows[0];
}
export async function getOldestOracleStat(scope) {
    const result = await safeDo("get_table_rows", { code: env.contracts.power, table: "oraclestats", scope, limit: 1, reverse: false, type: pwr.OracleStat });
    if (!result || result.rows.length == 0)
        return null;
    else
        return result.rows[0];
}
export function getReportScopes() {
    return getAllScopes({ code: env.contracts.power, table: "pwrreports" });
}
export function getOracleStatsScopes() {
    return getAllScopes({ code: env.contracts.power, table: "oraclestats" });
}
export async function getAllReports() {
    // get all pwrreports from all available scopes (boidId)
    const reportScopes = await getReportScopes();
    let allPwrReports = {};
    for (const boidId of reportScopes) {
        const reports = await tables.pwr.pwrReports(boidId);
        allPwrReports[boidId.toString()] = reports;
        // reports.forEach(el => allPwrReports.push(el))
    }
    return allPwrReports;
}
export async function getPwrReport(boidId, reportId) {
    const report_id = UInt64.from(reportId);
    const existing = await safeDo("get_table_rows", { code: env.contracts.power, table: "pwrreports", limit: 1, lower_bound: report_id, scope: boidId, type: pwr.PwrReportRow });
    if (!existing.rows[0])
        return null;
    else if (!existing.rows[0].report_id.equals(report_id))
        return null;
    else
        return existing.rows[0];
}
export async function getStatRow(round) {
    const round_id = UInt64.from(round);
    const existing = await pickRpc().rpc.get_table_rows({ code: env.contracts.power, table: "stats", limit: 1, lower_bound: round_id, type: pwr.Stat });
    if (!existing.rows[0])
        return null;
    else if (!existing.rows[0].round.equals(round_id))
        return null;
    else
        return existing.rows[0];
}
export const tables = {
    sys: {
        config: () => cache.wrap("sysconf", getSysConf)
    },
    pwr: {
        config: () => cache.wrap("pwrconfig", getPwrConf),
        global: () => cache.wrap("pwrglobal", getPwrGlobal),
        oracles: () => cache.wrap("pwroracles", getPwrOracles),
        pwrReports: (scope) => cache.wrap("pwrReports:" + scope, () => getPwrReports(scope)),
        stats: () => cache.wrap("pwrstats", getPwrStats)
    }
};
export const db = {
    getAllBoidUsers() {
        return prisma.boidAccount.findMany();
    },
    getLastFahRecordofRound(boidId, roundData) {
        return prisma.fahData.findFirst({
            orderBy: { time: "desc" },
            where: { time: { lt: roundData.end, gt: roundData.start }, name: boidId }
        });
    }
};
//# sourceMappingURL=queries.js.map