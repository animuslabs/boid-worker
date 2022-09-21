import { Action } from "@greymass/eosio"
import env from "lib/env"

export function createReportAction(data:Record<string, any>) {
  return Action.from({
    account: env.contracts.power,
    name: "pwrreport",
    authorization: [{ actor: env.worker.account, permission: env.worker.permission }],
    data
  })
}

export function createFinishAction(data:Record<string, any>) {
  return Action.from({
    account: env.contracts.power,
    name: "finishreport",
    authorization: [{ actor: env.worker.account, permission: env.worker.permission }],
    data
  })
}

export function createSlashAbsentAction(data:Record<string, any>) {
  return Action.from({
    account: env.contracts.power,
    name: "slashabsent",
    authorization: [{ actor: env.worker.account, permission: env.worker.permission }],
    data
  })
}
