
import env from "lib/env"
import { doAction } from "lib/eosio"
import { tables } from "lib/queries"
import { currentRound, sleep } from "lib/utils"
import ax from "axios"
// import { getCurrentScores } from "./fah-reporter"
import { PwrReport } from "lib/types/power.boid.types"
import log from "lib/logger"
import { fah } from "lib/fah"
import { AccountAdd } from "lib/types/boid.system"
import { PermissionLevel } from "@greymass/eosio"
const teamid = "238663"
const apiRoot = "https://api2.foldingathome.org/uid/612188543"
// "https://api2.foldingathome.org/uid/612188543"
async function init() {
  const members = await fah.getTeamMembers()
  console.log(JSON.stringify(members, null, 2))
  for (const member of members) {
    const result = await doAction("account.add", AccountAdd.from({ boid_id: member.name, owners: ["boid"], sponsors: ["sponsor"], keys: [] }), "boid", [PermissionLevel.from("boid@active")])
    console.log(result)
  }

  // const id = reportIdFromReport(PwrReport.from({ "protocol_id": 0, "round": 48, "units": 20492 }))
  // log.debug("reportId:", id)
  // should be 10480128000
}
init().catch(console.error)
