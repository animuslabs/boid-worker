import { doAction } from "./lib/eosio.js"
// import db from "./lib/db.js"
import { getCurrentScores } from "./fah-reporter.js"
import { Name } from "@greymass/eosio"

async function init() {
  try {
    const activeAccounts = await getCurrentScores()
    console.log(activeAccounts.length)
    for (const acct of activeAccounts) {
      try {
        console.log(acct.name)
        const name = Name.from(acct.name)
        console.log(name.toString())
        const result = await doAction("account.add", { boid_id: acct.name.toLowerCase().trim(), owners: ["boid"], sponsors: [], keys: [] }, "boid")
        console.log(result)
      } catch (error) {
        console.log("Error:", acct)
        console.log(error.toString())
      }
    }
  } catch (error) {
    console.log(error.toString())
  }
}
init().catch(console.error)
