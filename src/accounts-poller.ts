import { Account } from "./lib/types/boid.system"
import { getFullTable } from "./lib/eosio"
import db from "lib/db"
import log from "lib/logger"
import env from "lib/env"
import e from "lib/edgeql"

async function init() {
  try {
    const allAccounts = await getFullTable<Account>({ tableName: "accounts", contract: env.contracts.system }, Account)
    log.info("Got all Boid accounts:", allAccounts.length)
    const accountNames = allAccounts.map(el => el.boid_id.toString())
    let inserted = 0
    for (const boid_id of accountNames) {
      const cmd = e.insert(e.boidAccount, { boid_id }).unlessConflict()
      const result = await cmd.run(db)
      log.debug(result)
      if (result) inserted++
    }
    log.info("inserted", inserted, "new users")
  } catch (error) {
    console.error(error.toString())
  }
}
init().catch(console.error)
