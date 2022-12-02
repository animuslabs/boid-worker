import { Account, Config } from "../../lib/types/boid.system"
import { getFullTable } from "../../lib/eosio"
import db from "lib/db"
import log from "lib/logger"
import env from "lib/env"
import { currentRound } from "lib/utils"
import { getSysConf } from "lib/queries"
import { ActionPusher } from "lib/actionPusher"
import { sysActions } from "lib/actions"

// remove expired pwrmods
function handleExpired(account:Account, pusher:ActionPusher, round:number):number {
  let pwrModsCleared = 0
  const mods = account.power.mods
  if (mods.length > 0) {
    let expiredIndexes:number[] = []
    mods.forEach((el, i) => {
      const expired = el.aggregate_pwr_remaining.toNumber() == 0 || el.expires_round.toNumber() <= round
      if (!expired) return
      expiredIndexes.push(i)
      pwrModsCleared++
    })
    if (expiredIndexes.length > 0) pusher.add(sysActions.pwrModRm({ boid_id: account.boid_id, pwrmod_index: expiredIndexes.reverse() }))
  }
  return pwrModsCleared
}

// claim if account needs to be claimed
function claimAccount(account:Account, config:Config, pusher:ActionPusher, round:number):number {
  let claimed = 0
  if (account.boid_id.toString() == "boid") return 0
  const elapsed = round - account.power.last_claimed_round.toNumber()
  if (elapsed < config.power.claim_maximum_elapsed_rounds.toNumber() / 2) return 0
  const hasModPwr = account.power.mods.find(el => el.pwr_add_per_round.toNumber() > 0 && el.aggregate_pwr_remaining.toNumber() > 0 && el.expires_round.toNumber() > round)
  if (account.power.rating.toNumber() == 0 && !hasModPwr) return 0
  claimed++
  pusher.add(sysActions.claim({ boid_id: account.boid_id }))
  return claimed
}

async function init() {
  try {
    const allAccounts = await getFullTable({ tableName: "accounts", contract: env.contracts.system }, Account)
    log.info("Got all Boid accounts:", allAccounts.length)
    let claimed = 0
    let pwrModsCleared = 0
    const round = await currentRound()
    const config = await getSysConf()
    const pusher = new ActionPusher()
    for (const account of allAccounts) {
      pwrModsCleared += handleExpired(account, pusher, round)
      claimed += claimAccount(account, config, pusher, round)
    }
    pusher.stop()
    log.info("claimed", claimed, "accounts")
    log.info("expired pwrmods removed:", pwrModsCleared)
  } catch (error:any) {
    console.error(error.toString())
  }
}
init().catch(console.error)
