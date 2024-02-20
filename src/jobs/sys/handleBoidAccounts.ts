import { Types } from "lib/types/boid-contract-structure"
import { doAction, getFullTable, sendAction } from "../../lib/eosio"
import log from "lib/logger"
import env from "lib/env"
import { currentRound } from "lib/utils"
import { getSysConf } from "lib/queries"
import { ActionPusher } from "lib/actionPusher"
import { sysActions } from "lib/actions"

// remove expired pwrmods
async function handleExpired(account:Types.Account, round:number) {
  let pwrModsCleared = 0
  const boosters = account.power.boosters
  if (boosters.length > 0) {
    let expiredIndexes:number[] = []
    boosters.forEach((el, i) => {
      const expired = el.aggregate_pwr_remaining.toNumber() == 0 || el.expires_round.toNumber() <= round
      if (!expired) return
      expiredIndexes.push(i)
      pwrModsCleared++
    })
    if (expiredIndexes.length > 0) await sendAction(sysActions.boosterRm({ boid_id: account.boid_id, booster_index: expiredIndexes.reverse() }))
  }
  return pwrModsCleared
}

// claim if account needs to be claimed
async function claimAccount(account:Types.Account, config:Types.Config, round:number) {
  if (account.boid_id.toString() == "boid") return
  const elapsed = round - account.power.last_claimed_round.toNumber()
  if (elapsed < 1) return
  const hasModPwr = account.power.boosters.find(el => el.pwr_add_per_round.toNumber() > 0 && el.aggregate_pwr_remaining.toNumber() > 0 && el.expires_round.toNumber() > round)
  if (account.power.rating.toNumber() == 0 && !hasModPwr) return
  log.info("elapsed:", elapsed)
  log.info("Claiming:", account.boid_id.toString(), account.power.last_claimed_round.toNumber())
  await doAction("power.claim", { boid_id: account.boid_id }, env.contracts.system)
}

const allAccounts = await getFullTable({ tableName: "accounts", contract: env.contracts.system }, Types.Account)
log.info("Got all Boid accounts:", allAccounts.length)
const round = await currentRound()
log.info("Current round:", round.toFixed())
const config = await getSysConf()
for (const account of allAccounts) {
  await claimAccount(account, config, round).catch(log.error)
  await handleExpired(account, round).catch(log.error)
}
log.info("Job finished successfuly")

process.exit(0)

