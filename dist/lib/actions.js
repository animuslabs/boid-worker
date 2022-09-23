import { Action } from "@greymass/eosio";
import env from "./env.js";
const authorization = [{ actor: env.worker.account, permission: env.worker.permission }];
const pwrAcct = env.contracts.power;
function createAct(name, data = {}, account = pwrAcct) {
    return Action.from({ account, name, authorization, data });
}
export const pwrActions = {
    pwrReport: (data) => createAct("pwrreport", data),
    roundStats: () => createAct("roundstats"),
    slashAbsent: (data) => createAct("slashabsent", data),
    finishReport: (data) => createAct("finishreport", data),
    mergeReports: (data) => createAct("mergereports", data)
};
//# sourceMappingURL=actions.js.map