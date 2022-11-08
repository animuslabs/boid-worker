
import env from "lib/env"
import { doAction, getAbi, getFullTable } from "lib/eosio"
import { tables } from "lib/queries"
import { currentRound, sleep } from "lib/utils"
import ax from "axios"
// import { getCurrentScores } from "./fah-reporter"
import { PwrReport } from "lib/types/power.boid.types"
import log from "lib/logger"
import { fah } from "lib/fah"
import { Account, AccountAdd, AccountCreate, PowerClaim, TeamChange, Thisround } from "lib/types/boid.system"
import { PermissionLevel, PrivateKey, Serializer, UInt64 } from "@greymass/eosio"
const teamid = "238663"
const apiRoot = "https://api2.foldingathome.org/uid/612188543"
// "https://api2.foldingathome.org/uid/612188543"

export async function signInviteCode(privKey:PrivateKey, inviteCode:number, accountCreate:AccountCreate) {
  const createEncoder = Serializer.encode({ object: accountCreate, abi: await getAbi(env.contracts.system), type: AccountCreate })
  const inviteEncoder = Serializer.encode({ type: "uint64", object: UInt64.from(inviteCode) })
  inviteEncoder.append(createEncoder)
  const sig = privKey.signMessage(inviteEncoder.array)
  return sig
}

async function init() {

  // // const members = await fah.getTeamMembers()
  // const allAccounts = await getFullTable<Account>({ tableName: "accounts", contract: env.contracts.system }, Account)
  // // console.log(JSON.stringify(members, null, 2))
  // const round = await currentRound()
  // for (const acct of allAccounts) {
  //   if (acct.team.team_id.toNumber() == 1) continue
  //   if (acct.power.last_claimed_round.toNumber() < round) await doAction("power.claim", PowerClaim.from({ boid_id: acct.boid_id }), "boid", [PermissionLevel.from("boid@active")]).catch(console.error)
  //   const result = await doAction("team.change", TeamChange.from({ boid_id: acct.boid_id, new_team_id: 1, new_pwr_tax_mult: 10 }), "boid", [PermissionLevel.from("boid@active")])
  //   console.log(result)
  // }

  // const id = reportIdFromReport(PwrReport.from({ "protocol_id": 0, "round": 48, "units": 20492 }))
  // log.debug("reportId:", id)
  // should be 10480128000
}
init().catch(console.error)
