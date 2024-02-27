import { Types } from "lib/types/boid-contract-structure"
import { getFullTable } from "../../lib/eosio"
import db from "lib/db"
import log from "lib/logger"
import getConfig from "lib/config"
const config = getConfig()

const allAccounts = await getFullTable({ tableName: "accounts", contract: config.contracts.system }, Types.Account)
log.info("Got all Boid accounts:", allAccounts.length)
const accountNames = allAccounts.map(el => el.boid_id.toString())
let inserted = 0
for (const boidId of accountNames) {
  const exists = await db.boidAccount.findFirst({ where: { boidId } })
  if (!exists) {
    await db.boidAccount.create({ data: { boidId } })
    inserted++
  }
}
log.info("inserted", inserted, "new users")
process.exit(0)

