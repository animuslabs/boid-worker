import { Account } from "../../lib/types/boid.system"
import { getFullTable } from "../../lib/eosio"
import db from "lib/db"
import log from "lib/logger"
import env from "lib/env"
import { currentRound } from "lib/utils"
import { getSysConf } from "lib/queries"
import { ActionPusher } from "lib/actionPusher"
import { sysActions } from "lib/actions"

async function init() {
  try {
    const allAccounts = await getFullTable<Account>({ tableName: "accounts", contract: env.contracts.system }, Account)
    log.info("Got all Boid accounts:", allAccounts.length)
    let claimed = 0
    const round = await currentRound()
    const config = await getSysConf()
    const pusher = new ActionPusher()
    for (const account of allAccounts) {
      if (account.boid_id.toString() == "boid") continue
      const elapsed = round - account.power.last_claimed_round.toNumber()
      if (elapsed < config.power.claim_maximum_elapsed_rounds.toNumber() / 2) continue
      const hasModPwr = account.power.mods.find(el => el.pwr_add_per_round.toNumber() > 0 && el.aggregate_pwr_remaining.toNumber() > 0 && el.expires_round.toNumber() > round)
      if (account.power.rating.toNumber() == 0 && !hasModPwr) continue
      claimed++
      pusher.add(sysActions.claim({ boid_id: account.boid_id }))
    }
    pusher.stop()
    log.info("claimed", claimed, "accounts")
  } catch (error:any) {
    console.error(error.toString())
  }
}
init().catch(console.error)
