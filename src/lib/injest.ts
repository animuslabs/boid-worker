import { Action, GetDeltas } from "@proton/hyperion"
import db from "lib/db"
import { parseISOString } from "./utils"
import config from "lib/env"
import { getActions, hypClients } from "lib/hyp"
import ms from "ms"
import Logger from "lib/logger"
const log = Logger.getLogger("injest")
const sysContract = config.contracts.system.toString()



type DBKeys = keyof Partial<typeof db>
export type ActionMapType = Partial<Record<DBKeys, string>>

export function getTableFromAction(actionName:string):string {
  const val = Object.entries(actionMap).find(([key, value]) => value == actionName)
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
  pwrModAdd: "pwrmod.add",
  pwrModRm: "pwrmod.rm",
  stake: "stake",
  stakeDeleg: "stake.deleg",
  teamChange: "team.change",
  unstakeInit: "unstake.init",
  unstakeStop: "unstake.stop",
  unstakeEnd: "unstake.end",
  withdraw: "withdraw",
  unstakeDeleg: "unstke.deleg"
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
  async pwrModAdd(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      // log.info("injestData:", data)
      if (data.params) return

      const params = {
        boid_id: data.boid_id,
        mod_id: data.mod_id
      }
      await addRow("pwrModAdd", action, params)
    } catch (error) {
      log.error(error)
    }
  },
  async pwrModRm(action:Action<any>) {
    try {
      const data = action.act.data.data || action.act.data
      // log.info(data)
      const params = {
        boid_id: data.boid_id,
        pwrmod_index: JSON.stringify(data.pwrmod_index)
      }
      await addRow("pwrModRm", action, params)
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


let skip:any = {

}
export async function getRecentActions(action:string, table:string) {
  //@ts-ignore
  const existing = await db[table as any].findFirst({ orderBy: { timeStamp: "desc" } })
    .catch(async err => {
      log.error(err)
      log.error("critical Error, stopping")
      await db.$disconnect()
      process.kill(process.pid, "SIGHUP")
    })
  // const existing = await db.logPwrAdd.findFirst({ orderBy: { timeStamp: "desc" } })
  let after = new Date(Date.now() - ms("24h")).toISOString()
  if (existing) {
    after = existing.timeStamp.toISOString()
    if (after == skip[table]) {
      const milli = existing.timeStamp.getUTCMilliseconds()
      existing.timeStamp.setUTCMilliseconds(milli + 1)
      after = existing.timeStamp.toISOString()
    }
  }
  // const afterSeq = existing?.timeStamp.toISOString()
  const params:any = {
    "act.name": action,
    "act.account": sysContract,
    limit: config.history?.injestChunkSize || 500,
    sort: "asc"
  }
  if (after) params.after = after
  // if (afterSeq) params.filter = "global_sequence=" + existing.sequence
  // log.info(params)
  const result = await getActions(params)
  if (!result) return
  log.info("results", result.actions.length)
  log.info("query results total:", result.total.value)
  log.info("actions returned:", result.actions.length)
  if (result.actions.length > 0) {
    log.info("first seq", result.actions[0].global_sequence, result.actions[0]["@timestamp"])
    log.info("last seq", result.actions[result.actions.length - 1].global_sequence, result.actions[result.actions.length - 1]["@timestamp"])
  }

  for (const act of result.actions) {
    await sys[table](act)
  }
  if (result.actions.length > 0 && result.actions.length < (config.history?.injestChunkSize || 500)) skip[table] = after
}

export default { sys }
