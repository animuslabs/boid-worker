/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Authority, Name, PermissionLevel, PermissionLevelWeight, TimePoint, UInt16, UInt32 } from "@wharfkit/antelope"
import { AccountPermission, Blockchain } from "@proton/vert"
import { Types } from "lib/types/boid-contract-structure"
import { Config, ContractTables, TableView } from "lib/types/calc-types"

export const chain = new Blockchain()

export const contract = chain.createContract("boid", "../src/lib/calculator/contract/boid-core/boid.contract")
export const token = chain.createContract("token.boid", "../src/lib/calculator/contract/token/token.contract")
export const aa = chain.createContract("atomicassets", "../src/lib/calculator/contract/atomicassets/atomicassets")


export const owners = ["boid"]
export const boid_id = "testaccount"
export const acc = "testacct"

export function accounts() {
  if (!contract.tables || typeof contract.tables.accounts !== "function") {
    throw new Error("Contract tables or accounts table function is not available.")
  }
  return contract.tables.accounts().getTableRows()
}

function getTable<T extends keyof ContractTables>(
  contractInstance:{ tables:{ [key:string]:any } }, // Add contractInstance parameter
  tableName:T,
  scope?:string
):TableView {
  const tableAccessor = contractInstance.tables[tableName]
  if (!tableAccessor) {
    throw new Error(`Table accessor for '${tableName}' does not exist.`)
  }

  // If a scope is provided, and the method supports taking a scope, invoke it with scope.
  if (scope !== undefined && (tableName === "nfts" || tableName === "invites")) {
    const scopedTableMethod = tableAccessor as unknown as (scope:string) =>TableView
    return scopedTableMethod(scope)
  } else {
    // Otherwise, just invoke the table accessor method directly.
    return (tableAccessor as () =>TableView)()
  }
}


export function account(acctName:string):Types.Account {
  const accountsTable = getTable(contract, "accounts")
  return Types.Account.from(accountsTable.getTableRow(Name.from(acctName).value.toString()))
}
export function stakes():Types.Stake[] {
  return getTable(contract, "stakes").getTableRows().map((row:any) => Types.Stake.from(row))
}
export function sponsors() {
  return getTable(contract, "sponsors").getTableRows().map((row:any) => Types.Sponsor.from(row))
}

export function sponsor(acctName:string) {
  return getTable(contract, "sponsors").getTableRow(Name.from(acctName).value.toString()).map((row:any) => Types.Sponsor.from(row))
}

export function teams() {
  return getTable(contract, "teams").getTableRows()
}

export function boosters() {
  return getTable(contract, "boosters").getTableRows()
}

export function offers() {
  return getTable(contract, "offers").getTableRows().map((row:any) => Types.Offer.from(row))
}

export function global() {
  return getTable(contract, "global").getTableRows().map((row:any) => Types.Global.from(row))
}

export function config() {
  return getTable(contract, "config").getTableRows()[0]
}

export function stats() {
  return getTable(contract, "stats").getTableRows()
}
export function nfts(scope:string) {
  return getTable(contract, "nfts", scope).getTableRows()
}
export function assets(scope:string) {
  const scopeString = Name.from(scope).value.toString()
  const assetsTable = getTable(aa, "assets", scopeString)
  return assetsTable.getTableRows()
}
export function auth() {
  return getTable(contract, "auth").getTableRows()?.[0]
}
export function invites(scope:string) {
  return getTable(contract, "invites", scope).getTableRows()
}
export function invite(scope:string, invite_id:string) {
  const scopeString = Name.from(scope).value.toString()
  // Using getTable for consistent access and error handling
  const invitesTable = getTable(contract, "invites", scopeString)
  return invitesTable.getTableRow(invite_id)
}
export const defaultConfig:Config = {
  paused: false,
  account: {
    invite_price: 1000,
    premium_purchase_price: 500000,
    max_premium_prefix: 3,
    max_owners: 4,
    max_boosters: 4,
    suffix_whitelist: ["oid", "boider", "we", "cool", "yes", "voice"],
    remove_sponsor_price: 200000,
    sponsor_max_invite_codes: 5,
    invite_code_expire_rounds: 48
  },
  power: {
    sponsor_tax_mult: 0.1,
    powered_stake_mult: 10000,
    claim_maximum_elapsed_rounds: 10,
    soft_max_pwr_add: 1000,
    history_slots_length: 10
  },
  mint: {
    round_powered_stake_mult: 0.0001,
    round_power_mult: 1
  },
  team: {
    change_min_rounds: 9,
    edit_team_min_rounds: 48,
    team_edit_max_pct_change: 1,
    buy_team_cost: 5e6,
    owner_stake_required: 2e7,
    owner_future_stake_lock_rounds_required: 80
  },
  stake: {
    unstake_rounds: 24,
    extra_stake_min_locked_rounds: 0
  },
  time: {
    rounds_start_sec_since_epoch: 0,
    round_length_sec: 46800
  },
  auth: {
    key_actions_whitelist: ["unstake.init", "unstake.end", "power.claim", "team.change", "stake", "account.edit", "invite.buy", "invite.add", "invite.rm", "stake.deleg", "unstke.deleg", "unstake.stop", "offer.claim", "account.buy", "owner.add", "account.free"],
    key_account_max_stake: 500000,
    key_account_max_balance: 500000,
    account_max_keys: 6,
    worker_max_bill_per_action: 100
  },
  nft: {
    boid_id_maximum_nfts: 6,
    whitelist_collections: ["nft.boid"]
  },
  allow_deposits: true,
  allow_withdrawals: true,
  recoveryAccount: "recover.boid"
}
export const roundStartTime = TimePoint.fromMilliseconds(defaultConfig.time.rounds_start_sec_since_epoch * 1000)

export function teamContribution(account:{ team:{ team_tax_mult:number } }, team:{ min_pwr_tax_mult:number }, totalPayout:number):number {
  return Math.floor(totalPayout * (Math.max(account.team.team_tax_mult, team.min_pwr_tax_mult) / 200))
}

export function teamOwnerCut(team:Types.Team, teamContribution:number) {
  let ownerCut = teamContribution * (team.owner_cut_mult.toNumber() / 200)
  return Math.floor(ownerCut)
}

export function addRounds(numRounds = 0, roundLength:number) {
  const timePoint = TimePoint.fromMilliseconds(roundLength * 1000 * numRounds)
  chain.addTime(timePoint as any)
}

export function currentRound() {
  return Math.floor((chain.timestamp.toMilliseconds() - roundStartTime.toMilliseconds()) / (defaultConfig.time.round_length_sec * 1000))
}

export const tkn = token.actions
const acti = contract.actions

export async function setupAccountOwner() {
  chain.createAccount("newowner")
  await acti["account.add"]!({ boid_id: "boid", owners: ["boid"], sponsors: [], keys: [] }).send()
  await acti["account.add"]!({ boid_id, owners: ["recover.boid"], sponsors: ["sponsoracct"], keys: [] }).send()
  await acti["owner.add"]!({ boid_id, owner: Name.from("newowner") }).send("recover.boid@active")
}

async function depositTokens() {
  const issuer = Name.from("token.boid")
  const maximum_supply = "25000000000.0000 BOID"
  await tkn.create!({ issuer, maximum_supply }).send()
  await tkn.issue!({ to: issuer, quantity: maximum_supply, memo: "" }).send()
  await setupAccountOwner()
  await tkn.transfer!({ from: issuer, to: Name.from("tknmint.boid"), quantity: "100000000.0000 BOID", memo: "" }).send("token.boid@active")
}

async function wait(ms:number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function createBoidSystemAccounts() {
  chain.createAccount("recover.boid")
  chain.createAccount("burn.boid")
  chain.createAccount({
    name: "stake.boid",
    enableInline: true,
    permissions: [
      AccountPermission.from({
        perm_name: Name.from("owner"),
        parent: Name.from(""),
        required_auth: Authority.from({
          threshold: UInt32.from(1),
          keys: [],
          accounts: [PermissionLevelWeight.from({
            permission: PermissionLevel.from("boid@eosio.code"),
            weight: UInt16.from(1)
          })],
          waits: []
        })
      }),
      AccountPermission.from({
        perm_name: Name.from("active"),
        parent: Name.from("owner"),
        required_auth: Authority.from({
          threshold: UInt32.from(1),
          keys: [],
          accounts: [PermissionLevelWeight.from({
            permission: PermissionLevel.from("boid@eosio.code"),
            weight: UInt16.from(1)
          })],
          waits: []
        })
      })
    ]
  })
  
  chain.createAccount({
    name: "tknmint.boid",
    enableInline: true,
    permissions: [
      AccountPermission.from({
        perm_name: Name.from("owner"),
        parent: Name.from(""),
        required_auth: Authority.from({
          threshold: UInt32.from(1),
          keys: [],
          accounts: [PermissionLevelWeight.from({
            permission: PermissionLevel.from("boid@eosio.code"),
            weight: UInt16.from(1)
          })],
          waits: []
        })
      }),
      AccountPermission.from({
        perm_name: Name.from("active"),
        parent: Name.from("owner"),
        required_auth: Authority.from({
          threshold: UInt32.from(1),
          keys: [],
          accounts: [PermissionLevelWeight.from({
            permission: PermissionLevel.from("boid@eosio.code"),
            weight: UInt16.from(1)
          })],
          waits: []
        })
      })
    ]
  })
}

export async function init(config:Config) {
  await wait(1) // this is just here because the proton library has a race condition 0_0
  await createBoidSystemAccounts()
  // @ts-ignore
  chain.setTime(roundStartTime)
  chain.createAccount("sponsoracct")
  chain.createAccount("sponsorbrok")
  chain.createAccount("sponsorrich")
  chain.createAccount("noauth")

  await act("auth.init", { })
  await act("config.set", { config })
  await act("global.set", { globalData: { chain_name: "test", total_power: 0, last_inflation_adjust_round: 0 } })
  await act("account.add", { boid_id: Name.from("sponsoracct"), owners: ["sponsoracct"], sponsors: [], keys: [] })
  await act("account.add", { boid_id: Name.from("sponsorbrok"), owners: ["sponsorbrok"], sponsors: [], keys: [] })
  await act("account.add", { boid_id: Name.from("sponsorrich"), owners: ["sponsorrich"], sponsors: [], keys: [] })
  await act("account.add", { boid_id: Name.from("teamownr"), owners: ["recover.boid"], sponsors: [], keys: [] })
  await act("team.create", { owner: Name.from("teamownr"), min_pwr_tax_mult: 10, owner_cut_mult: 4, url_safe_name: "teamteam", info_json_ipfs: "" })
  // return
  await depositTokens()
  await act("global.chain", { chain_name: "localtestnet" })
  chain.createAccount(acc)
}

export async function act(name:string, params = {}, permission = "boid@active") {
  const action = contract.actions[name]
  // Check if the action is a function before attempting to call it
  if (typeof action !== "function") {
    throw new Error(`Action '${name}' is not available on the contract.`)
  }
  return action(params).send(permission)
}

