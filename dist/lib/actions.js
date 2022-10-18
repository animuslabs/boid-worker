import { Action } from "@greymass/eosio";
import env from "./env.js";
import { AccountBuy, AuthAction, PowerClaim } from "./types/boid.system.js";
import { Finishreport, Handleostat, Ostatsclean, Reportsclean } from "./types/power.boid.types.js";
const authorization = [{ actor: env.worker.account, permission: env.worker.permission }];
const pwrAcct = env.contracts.power;
function createAct(name, data = {}, account = pwrAcct) {
    return Action.from({ account, name, authorization, data });
}
export const pwrActions = {
    pwrReport: (data) => createAct("pwrreport", data),
    roundStats: () => createAct("roundstats"),
    slashAbsent: (data) => createAct("slashabsent", data),
    finishReport: (data) => createAct("finishreport", Finishreport.from(data)),
    mergeReports: (data) => createAct("mergereports", data),
    statsClean: () => createAct("statsclean"),
    reportsClean: (data) => createAct("reportsclean", Reportsclean.from(data)),
    oracleStatsClean: (data) => createAct("ostatsclean", Ostatsclean.from(data)),
    handleostat: (data) => createAct("handleostat", Handleostat.from(data))
};
export const sysActions = {
    auth: (data) => createAct("auth", AuthAction.from(data), "boid"),
    buyAccount: (data) => createAct("account.buy", AccountBuy.from(Object.assign(data, { owners: [] })), "boid"),
    claim: (data) => createAct("power.claim", PowerClaim.from(data), "boid")
};
//# sourceMappingURL=actions.js.map