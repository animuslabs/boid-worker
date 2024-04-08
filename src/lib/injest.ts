import { Action } from "@proton/hyperion"
import db, { Prisma } from "lib/db"
import { parseISOString } from "./utils"
import getConfig from "lib/config"
import { getActions } from "lib/hyp"
import ms from "ms"
import Logger from "lib/logger"
const config = getConfig()
const log = Logger.getLogger("injest")


type DBKeys = keyof Partial<typeof db>
export type ActionMapType = Partial<Record<DBKeys, string>>

export function getTableFromAction(actionName:string, actionsMap:{ [key:string]:string}):string {
  const val = Object.entries(actionsMap).find(([key, value]) => value == actionName)
  if (!val) throw (new Error("invalid action name"))
  else return val[0]
}

export const actionMap:ActionMapType = {
  accountAdd: "account.add",
  accountBuy: "account.buy",
  accountEdit: "account.edit",
  accountFree: "account.free",
  authAddKey: "auth.addkey",
  authRmKey: "auth.rmkey",
  internalXfer: "internalxfer",
  inviteAdd: "invite.add",
  inviteClaim: "invite.claim",
  inviteRm: "invite.rm",
  logPwrAdd: "logpwradd",
  logPwrClaim: "logpwrclaim",
  nftLock: "nft.lock",
  nftWithdraw: "nft.withdraw",
  nftXfer: "nft.xfer",
  offerClaim: "offer.claim",
  ownerAdd: "owner.add",
  ownerRm: "owner.rm",
  boosterAdd: "booster.add",
  boosterRm: "booster.rm",
  stake: "stake",
  stakeDeleg: "stake.deleg",
  teamChange: "team.change",
  unstakeInit: "unstake.init",
  unstakeStop: "unstake.stop",
  unstakeEnd: "unstake.end",
  withdraw: "withdraw",
  unstakeDeleg: "unstke.deleg"
}

export const actionMapPower:ActionMapType = {
  reportSent: "reportsent",
  finishReport: "finishreport",
  mergeReports: "mergereports",
  pwrReport: "pwrreport",
  payOracle: "payoracle"
}

const sys = {
  async withdraw(action:Action<any>) {
    return basicInjest("withdraw", action)
  },
  async unstakeDeleg(action:Action<any>) {
    return basicInjest("unstakeDeleg", action)
  },
  async unstakeInit(action:Action<any>) {
    return basicInjest("unstakeInit", action)
  },
  async unstakeEnd(action:Action<any>) {
    return basicInjest("unstakeEnd", action)
  },
  async unstakeStop(action:Action<any>) {
    return basicInjest("unstakeStop", action)
  },
  async teamChange(action:Action<any>) {
    return basicInjest("teamChange", action)
  },
  async stake(action:Action<any>) {
    return basicInjest("stake", action)
  },
  async stakeDeleg(action:Action<any>) {
    return basicInjest("stakeDeleg", action)
  },
  async accountAdd(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      const params = {
        boid_id: data.boid_id,
        key: data.keys ? data.keys[0] : null,
        sponsor: data.sponsors[0],
        owner: data.owners[0]
      }
      await addRow("accountAdd", action, params)
    } catch (error) {
      console.error(error)
    }
  },
  async accountBuy(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      const params = {
        payer_boid_id: data.payer_boid_id,
        boid_id: data.new_account.boid_id,
        key: data.new_account.keys[0],
        owner: data.new_account.owners[0]
      }
      await addRow("accountBuy", action, params)
    } catch (error) {
      console.error(error)
    }
  },
  async accountEdit(action:Action<any>) {
    return basicInjest("accountEdit", action)
  },
  async accountFree(action:Action<any>) {
    return basicInjest("accountFree", action)
  },
  async authAddKey(action:Action<any>) {
    return basicInjest("authAddKey", action)
  },
  async authRmKey(action:Action<any>) {
    return basicInjest("authRmKey", action)
  },
  async internalXfer(action:Action<any>) {
    return basicInjest("internalXfer", action)
  },
  async inviteAdd(action:Action<any>) {
    return basicInjest("inviteAdd", action)
  },
  async inviteClaim(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      const params = {
        sponsor_boid_id: data.sponsor_boid_id,
        invite_code: data.invite_code,
        sig: data.sig,
        create_boid_id: data.new_account.boid_id,
        create_key: data.new_account.keys[0],
        create_owner: data.new_account.owners[0]
      }
      await addRow("inviteClaim", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async inviteRm(action:Action<any>) {
    return basicInjest("inviteRm", action)
  },
  async logPwrAdd(action:Action<any>) {
    return basicInjest("logPwrAdd", action)
  },
  async logPwrClaim(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      const params = {
        boid_id: data.boid_id || "null",

        power_before: data.power.before,
        power_after: data.power.after,
        power_from_boosters: data.power.from_boosters,
        power_elapsed_rounds: data.power.elapsed_rounds,

        mint_power_mint: data.mint.power_mint,
        mint_powered_stake_mint: data.mint.powered_stake_mint,
        mint_account_earned: data.mint.account_earned,
        mint_team_cut: data.mint.team_cut,
        mint_team_owner_earned: data.mint.team_owner_earned,
        mint_overstake_mint: data.mint.overstake_mint,
        mint_total: data.mint.total
      }
      await addRow("logPwrClaim", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async nftLock(action:Action<any>) {
    return basicInjest("nftLock", action)
  },
  async nftWithdraw(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      const params = {
        boid_id: data.boid_id,
        asset_ids: JSON.stringify(data.asset_ids),
        to: data.to
      }
      await addRow("nftWithdraw", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async nftXfer(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      const params = {
        from_boid_id: data.from_boid_id,
        to_boid_id: data.to_boid_id,
        asset_ids: JSON.stringify(data.asset_ids)
      }
      await addRow("nftXfer", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async offerClaim(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      const params = {
        boid_id: data.boid_id,
        offer_id: data.offer_id,
        required_nft_action_ids: JSON.stringify(data.required_nft_action_ids)
      }
      await addRow("offerClaim", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async ownerAdd(action:Action<any>) {
    return basicInjest("ownerAdd", action)
  },
  async ownerRm(action:Action<any>) {
    return basicInjest("ownerRm", action)
  },
  async boosterAdd(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      // log.info("injestData:", data)
      if (data.params) return

      const params = {
        boid_id: data.boid_id,
        booster_id: data.booster_id
      }
      await addRow("boosterAdd", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async boosterRm(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      log.info("boosterRm data: ", data)
      const params = {
        boid_id: data.boid_id,
        booster_index: data.pwrmod_index
      }
      await addRow("boosterRm", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async reportSent(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      log.info("reportsent data: ", data)
      const params = {
        report_approval_weight: data.report.approval_weight,
        report_approvals: data.report.approvals,
        report_proposer: data.report.proposer,
        report_protocol_id: data.report.report.protocol_id,
        report_round: data.report.report.round,
        report_units: data.report.report.units,
        adding_power: data.adding_power,
        target_boid_id: data.target_boid_id
      }
      await addRow("reportSent", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async finishReport(action:Action<any>) {
    return basicInjest("finishReport", action)
  },
  async mergeReports(action:Action<any>) {
    return basicInjest("mergeReports", action)
  },
  async pwrReport(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      log.info("pwrReport data: ", data)
      const params = {
        boid_id_scope: data.boid_id_scope,
        oracle: data.oracle,
        report_protocol_id: data.report.protocol_id,
        report_round: data.report.round,
        report_units: data.report.units
      }
      await addRow("pwrReport", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async payOracle(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      log.info("payOracle data: ", data)
      const params = {
        oracle: data.oracle,
        basePay: data.basePay,
        bonusPay: data.bonusPay,
        round: data.round,
        reports_proposed: data.reports.proposed,
        reports_reported_or_merged: data.reports.reported_or_merged,
        reports_unreported_unmerged: data.reports.unreported_unmerged
      }
      await addRow("payOracle", action, params)
    } catch (error) {
      log.error(error)
    }
  }
}

async function basicInjest(name:keyof ActionMapType, action:Action<any>) {
  try {
    const data = action.act.data.data || action.act.data
    // log.info(data)
    const params = data
    await addRow(name, action, params)
  } catch (error) {
    log.error(error)
  }
}

function upsertData(action:Action<any>) {
  return {
    sequence: action.global_sequence,
    timeStamp: parseISOString(action["@timestamp"]),
    trxId: action.trx_id
  }
}

export async function addRow(table:keyof ActionMapType, action:Action<any>, params:any) {
  const create = Object.assign(upsertData(action), params)
  //@ts-ignore
  const result = await db[table as any].upsert(
    {
      where: { sequence: action.global_sequence },
      create,
      update: create
    })
  // log.info(result)
}


let skip:any = {}

export async function getRecentActions(action:string, table:string, contract:string) {
  try {
    if (!sys[table]) {
      throw new Error(`Function for table '${table}' not found in sys.`)
    }

    const existing = await db[table as Prisma.ModelName].findFirst({ orderBy: { timeStamp: "desc" } })
    let after = new Date(Date.now() - ms("24h")).toISOString()

    if (existing) {
      after = existing.timeStamp.toISOString()
      if (after === skip[table]) {
        const milli = existing.timeStamp.getUTCMilliseconds()
        existing.timeStamp.setUTCMilliseconds(milli + 1)
        after = existing.timeStamp.toISOString()
      }
    }

    const params:any = {
      "act.name": action,
      "act.account": contract,
      limit: config.history?.injestChunkSize || 500,
      sort: "asc"
    }

    if (after) params.after = after

    const result = await getActions(params, contract)

    if (!result || !result.actions) return

    log.info("Results:", result.actions.length)
    log.info("Query results total:", result.total.value)
    log.info("Actions returned:", result.actions.length)

    if (result.actions.length > 0) {
      log.info("First seq:", result.actions[0].global_sequence, result.actions[0]["@timestamp"])
      log.info("Last seq:", result.actions[result.actions.length - 1].global_sequence, result.actions[result.actions.length - 1]["@timestamp"])
    }

    for (const act of result.actions) {
      await sys[table](act)
    }

    if (result.actions.length > 0 && result.actions.length < (config.history?.injestChunkSize || 500)) {
      skip[table] = after
    }
  } catch (error) {
    log.error("Error in getRecentActions:", error)
  }
}


export default { sys }
