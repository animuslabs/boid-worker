
import env from "lib/env"
import { doAction, getFullTable } from "lib/eosio"
import { Account, PowerAdd } from "lib/types/boid.system"
import { Asset, Name, PermissionLevel, Struct } from "@wharfkit/antelope"

@Struct.type("transfer")
export class Transfer extends Struct {
  @Struct.field(Name) from!:Name
  @Struct.field(Name) to!:Name
  @Struct.field(Asset) quantity!:Asset
  @Struct.field("string") memo!:string
}

async function init() {
  const allAccounts = await getFullTable({ tableName: "accounts", contract: env.contracts.system }, Account)
  for (const acct of allAccounts) {
    await doAction("power.add", PowerAdd.from({ boid_id: acct.boid_id, power: "15" }), env.contracts.system, [PermissionLevel.from("boid@active")])
    const transfer = Transfer.from({
      from: "token.boid",
      to: env.contracts.system,
      quantity: "10.0000 BOID",
      memo: `deposit boid_id=${acct.boid_id.toString()}`
    })
    const result = await doAction("transfer", transfer,
      "token.boid",
      [PermissionLevel.from("token.boid@active")]
    )
    console.log(result)
  }
}
init().catch(console.error)
  .then(() => {
    console.log("Waiting...")
    setTimeout(() => {
      console.log("restarting")
      process.kill(process.pid)
    }, 3600000)
  })
