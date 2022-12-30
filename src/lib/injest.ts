import { Action } from "@proton/hyperion"
import { AccountAdd, UnstakeInit } from "./types/boid.system"
import db from "lib/db"
import { parseISOString } from "./utils"
import Logger from "lib/logger"
const log = Logger.getLogger("injest")

const add = new AccountAdd({})
const json = add.toJSON()

type DBKeys = keyof Partial<typeof db>
export type ActionMapType = Partial<Record<DBKeys, string>>

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

const sys:Partial<Record<keyof ActionMapType, any>> = {
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
      console.log("Data:", data)
      
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
      console.log("Data:", action.act)
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
    try {
      const data = action.act.data.data || action.act.data
      log.info(data)
      const params = { 
        boid_id: data.boid_id,
        ipfs_meta: data.social_ipfs_json || data.ipfs_meta.toString() 
      }
      await addRow("accountEdit", action, params)
    } catch (error) {
      log.error(error)
    }
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
      log.info(data)
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
      log.info(data)
      const params = {
        boid_id: data.boid_id || "null",

        power_before: data.power.before,
        power_after: data.power.after,
        power_from_mods: data.power.from_mods,
        power_decayed: data.power.decayed,
        power_rounds: data.power.rounds,

        mint_account: data.mint.account,
        mint_team: data.mint.team,
        mint_team_owner: data.mint.team_owner,
        mint_overstake: data.mint.overstake,
        mint_fundstake: data.mint.fundstake,
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
      log.info(data)
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
      log.info(data)
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
      log.info(data)
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
      log.info("injestData:", data)
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
      log.info(data)
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
    log.info(data)
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

async function addRow(table:keyof ActionMapType, action:Action<any>, params:any) {
  const create = Object.assign(upsertData(action), params)
  const result = await db[table as any].upsert(
    {
      where: { sequence: action.global_sequence },
      create,
      update: create
    })
  log.info(result)
}

export default { sys }
