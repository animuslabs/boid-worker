import { Name } from "@greymass/eosio"
import { ActionPusher } from "lib/actionPusher"
import { pwrActions } from "lib/actions"
import db from "lib/db"
import logger from "lib/logger"
import { getReportScopes, tables } from "lib/queries"
import { PwrReportRow, Slashabsent } from "lib/types/power.boid.types"
import { currentRound, finalizedRound } from "lib/utils"
const log = logger.getLogger("slashAbsent")

async function init() {
  log.info("starting slashAbsent: searching for absent oracles to slash")
  const oracles = await tables.pwr.oracles()
  const round = await currentRound()
  log.debug("current round:", round)
  const stats = await tables.pwr.stats()
  const finalRound = await finalizedRound()
  const activeOracles = oracles.filter(el => !el.standby)
  log.debug("active oracles:", activeOracles.length)
  const finalizedStats = stats.filter(el => el.round.toNumber() - 1 <= finalRound)
  const pusher = new ActionPusher(5000)
  log.info("checking stats:", finalizedStats.length)
  for (const stat of finalizedStats) {
    const global = stat.starting_global
    const absent:string[] = []
    global.expected_active_oracles.forEach(el => {
      const active = global.active_oracles.includes(el)
      if (!active) absent.push(el.toString())
    })
    for (const oracle of absent) {
      // if (!activeOracles.includes(oracle)) break
      const matchedOracle = activeOracles.find(el => el.account.toString() == oracle)
      if (!matchedOracle) break
      const expectedActive = matchedOracle.expected_active_after_round.toNumber()
      log.debug("matched oracle:", matchedOracle.account.toString(), matchedOracle.expected_active_after_round.toNumber())
      const targetRound = stat.round.toNumber() - 1
      log.debug("checking", targetRound)
      if (expectedActive <= targetRound) break
      const slashData = Slashabsent.from({ oracle, round: stat.round.toNumber() - 1 })
      const slashAction = pwrActions.slashAbsent(slashData)
      log.info("created slashabsent action:", JSON.parse(JSON.stringify(slashData.toJSON())))
      pusher.add(slashAction)
    }
  }
  pusher.stop()
}
init().catch()
