import { Action } from "@greymass/eosio";
import env from "./env.js";
export function createReportAction(data) {
    return Action.from({
        account: env.contracts.power,
        name: "pwrreport",
        authorization: [{ actor: env.worker.account, permission: env.worker.permission }],
        data
    });
}
export function createFinishAction(data) {
    return Action.from({
        account: env.contracts.power,
        name: "finishreport",
        authorization: [{ actor: env.worker.account, permission: env.worker.permission }],
        data
    });
}
export function createSlashAbsentAction(data) {
    return Action.from({
        account: env.contracts.power,
        name: "slashabsent",
        authorization: [{ actor: env.worker.account, permission: env.worker.permission }],
        data
    });
}
//# sourceMappingURL=actions.js.map