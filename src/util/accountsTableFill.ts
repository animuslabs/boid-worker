import env from "./../lib/env"
import { getFullTable } from "../lib/eosio"
import { Account } from "./../lib/types/boid.system"
import db from "lib/db"

const allAccounts = await getFullTable({ tableName: "accounts", contract: env.contracts.system }, Account)
const selectedAccounts = allAccounts.map(account => ({
  boid_id: account.boid_id.toString(),
  staked: account.stake.self_staked.toNumber() + account.stake.received_delegated_stake.toNumber(),
  power: account.power.rating.toNumber(),
  balance: account.balance.toNumber()
}))

type SelectedAccountsType = {
    boid_id:string
    staked:number
    power:number
    balance:number
}

async function insertAccounts(selectedAccounts:SelectedAccountsType[]) {
  for (const account of selectedAccounts) {
    await db.accountsTable.create({
      data: {
        timeStamp: new Date(),
        boid_id: account.boid_id,
        staked: account.staked,
        power: account.power,
        balance: account.balance
      }
    })
  }
}

console.log("Inserting AccountsTable data into the db...")
try {
  const result = await insertAccounts(selectedAccounts)
  console.log("Inserting records into the database was succesfull.", result)
} catch (error) {
  console.error("Error inserting AccountsTable data:", error)
}


