import { Boinc } from "lib/boinc"
import db from "lib/db"
import config from "lib/env"
import { getFullTable } from "lib/eosio"
import { getBoincProtocols } from "lib/queries"
import { Types } from "lib/types/power.boid.types"


const boincRows = await getBoincProtocols()
for (let row of boincRows) {
  const boinc = await new Boinc(row).init()
  await boinc.saveMembers(await boinc.getMembers())
}

process.exit(0)
