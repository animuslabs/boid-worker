import { Account, Config } from "../../lib/types/boid.system"
import { doAction, getFullTable } from "../../lib/eosio"
import db from "lib/db"
import log from "lib/logger"
import env from "lib/env"
import { currentRound } from "lib/utils"
import { getSysConf } from "lib/queries"
import { ActionPusher } from "lib/actionPusher"
import { sysActions } from "lib/actions"

// // remove expired pwrmods
// async function handleExpired(account:Account, round:number) {
//   let pwrModsCleared = 0
//   const mods = account.power.boosters
//   if (mods.length > 0) {
//     let expiredIndexes:number[] = []
//     mods.forEach((el, i) => {
//       const expired = el.aggregate_pwr_remaining.toNumber() == 0 || el.expires_round.toNumber() <= round
//       if (!expired) return
//       expiredIndexes.push(i)
//       pwrModsCleared++
//     })
//     if (expiredIndexes.length > 0) pusher.add(sysActions.pwrModRm({ boid_id: account.boid_id, pwrmod_index: expiredIndexes.reverse() }))
//   }
//   return pwrModsCleared
// }

// claim if account needs to be claimed
async function claimAccount(account:Account, config:Config, round:number) {
  if (account.boid_id.toString() == "boid") return
  const elapsed = round - account.power.last_claimed_round.toNumber()
  if (elapsed < 1) return
  const hasModPwr = account.power.boosters.find(el => el.pwr_add_per_round.toNumber() > 0 && el.aggregate_pwr_remaining.toNumber() > 0 && el.expires_round.toNumber() > round)
  if (account.power.rating.toNumber() == 0 && !hasModPwr) return
  log.info("elapsed:", elapsed)
  log.info("Claiming:", account.boid_id.toString(), account.power.last_claimed_round.toNumber())
  await doAction("power.claim", { boid_id: account.boid_id }, env.contracts.system)
}

async function init() {
  try {
    const allAccounts = await getFullTable({ tableName: "accounts", contract: env.contracts.system }, Account)
    log.info("Got all Boid accounts:", allAccounts.length)
    const round = await currentRound()
    log.info("Current round:", round.toFixed())
    const config = await getSysConf()
    for (const account of allAccounts) {
      await claimAccount(account, config, round)
      // await handleExpired(account, new ActionPusher(), round)
    }
    log.info("Job finished successfuly")
    // let claimed = 0
    // let pwrModsCleared = 0
    // const pusher = new ActionPusher()
    // for (const account of allAccounts) {
    //   pwrModsCleared += handleExpired(account, pusher, round)
    //   claimed += claimAccount(account, config, pusher, round)
    // }
    // pusher.stop()
    // log.info("claimed", claimed, "accounts")
    // log.info("expired pwrmods removed:", pwrModsCleared)
  } catch (error:any) {
    console.error(error.toString())
  }
}
await init().catch(console.error)
process.exit(0)

