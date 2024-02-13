/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Authority, Name, PermissionLevel, PermissionLevelWeight, TimePoint, UInt16, UInt32, UInt64 } from "@wharfkit/antelope"
import { Account, AccountPermission, Blockchain } from "@proton/vert"
import { Types } from "lib/types/boid-contract-structure"
import { Config, ContractTables, TableView } from "lib/types/calc-types"

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

async function wait(ms:number) {
  return new Promise(resolve => {
    setTimeout(resolve, ms)
  })
}

async function createBoidSystemAccounts(chain:Blockchain) {
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

export class ChainCalculator {
  chain:Blockchain
  contract:Account
  roundStartTime:TimePoint
  token:Account
  aa:Account
  tkn:typeof this.token.actions
  owners = ["boid"]
  boid_id = "testaccount"
  acc = "testacct"
  configStart = defaultConfig
  constructor(config:Config) {
    this.chain = new Blockchain()
    this.contract = this.chain.createContract("boid", "../src/lib/calculator/contract/boid-core/boid.contract")
    this.token = this.chain.createContract("token.boid", "../src/lib/calculator/contract/token/token.contract")
    this.aa = this.chain.createContract("atomicassets", "../src/lib/calculator/contract/atomicassets/atomicassets")
    this.tkn = this.token.actions
    this.configStart = config
    this.roundStartTime = TimePoint.fromMilliseconds(config.time.rounds_start_sec_since_epoch * 1000)
  }

  async init(config:Config) {
    await wait(3) // this is just here because the proton library has a race condition 0_0
    await createBoidSystemAccounts(this.chain)
    // @ts-ignore
    this.chain.setTime(this.roundStartTime)
    this.chain.createAccount("sponsoracct")
    this.chain.createAccount("sponsorbrok")
    this.chain.createAccount("sponsorrich")
    this.chain.createAccount("noauth")

    await this.act("auth.init")
    await this.act("config.set", { config })
    await this.act("global.set", { globalData: { chain_name: Name.from("test"), total_power: UInt64.from(0), last_inflation_adjust_round: UInt16.from(0) } })
    await this.act("account.add", { boid_id: Name.from("sponsoracct"), owners: ["sponsoracct"], sponsors: [], keys: [] })
    await this.act("account.add", { boid_id: Name.from("sponsorbrok"), owners: ["sponsorbrok"], sponsors: [], keys: [] })
    await this.act("account.add", { boid_id: Name.from("sponsorrich"), owners: ["sponsorrich"], sponsors: [], keys: [] })
    await this.act("account.add", { boid_id: Name.from("teamownr"), owners: ["recover.boid"], sponsors: [], keys: [] })
    await this.act("team.create", { owner: Name.from("teamownr"), min_pwr_tax_mult: 10, owner_cut_mult: 4, url_safe_name: "teamteam", info_json_ipfs: "" })
    await this.depositTokens()
    await this.act("global.chain", { chain_name: "localtestnet" })
    this.chain.createAccount(this.acc)
  }

  async depositTokens() {
    const issuer = Name.from("token.boid")
    const maximum_supply = "25000000000.0000 BOID"
    await this.tkn.create!({ issuer, maximum_supply }).send()
    await this.tkn.issue!({ to: issuer, quantity: maximum_supply, memo: "" }).send()
    await this.setupAccountOwner()
    await this.tkn.transfer!({ from: issuer, to: Name.from("tknmint.boid"), quantity: "100000000.0000 BOID", memo: "" }).send("token.boid@active")
  }



  teamContribution(account:{ team:{ team_tax_mult:number } }, team:{ min_pwr_tax_mult:number }, totalPayout:number):number {
    return Math.floor(totalPayout * (Math.max(account.team.team_tax_mult, team.min_pwr_tax_mult) / 200))
  }

  teamOwnerCut(team:Types.Team, teamContribution:number) {
    let ownerCut = teamContribution * (team.owner_cut_mult.toNumber() / 200)
    return Math.floor(ownerCut)
  }

  addRounds(numRounds = 0, roundLength:number) {
    const timePoint = TimePoint.fromMilliseconds(roundLength * 1000 * numRounds)
    this.chain.addTime(timePoint as any)
  }

  currentRound() {
    return Math.floor((this.chain.timestamp.toMilliseconds() - this.roundStartTime.toMilliseconds()) / (this.configStart.time.round_length_sec * 1000))
  }

  async act(name:string, params = {}, permission = "boid@active") {
    const action = this.contract.actions[name]
    // Check if the action is a function before attempting to call it
    if (typeof action !== "function") {
      throw new Error(`Action '${name}' is not available on the contract.`)
    }
    return action(params).send(permission)
  }

  async setupAccountOwner() {
    this.chain.createAccount("newowner")
    await this.act("account.add", { boid_id: "boid", owners: ["boid"], sponsors: [], keys: [] })
    await this.act("account.add", { boid_id: this.boid_id, owners: ["recover.boid"], sponsors: ["sponsoracct"], keys: [] })
    await this.act("owner.add", { boid_id: this.boid_id, owner: Name.from("newowner") }, "recover.boid@active")
  }

  accounts() {
    if (!this.contract.tables || typeof this.contract.tables.accounts !== "function") {
      throw new Error("Contract tables or accounts table function is not available.")
    }
    return this.contract.tables.accounts().getTableRows()
  }

  account(acctName:string):Types.Account {
    const accountsTable = getTable(this.contract, "accounts")
    return Types.Account.from(accountsTable.getTableRow(Name.from(acctName).value.toString()))
  }

  stakes():Types.Stake[] {
    return getTable(this.contract, "stakes").getTableRows().map((row:any) => Types.Stake.from(row))
  }

  sponsors() {
    return getTable(this.contract, "sponsors").getTableRows().map((row:any) => Types.Sponsor.from(row))
  }

  sponsor(acctName:string) {
    return getTable(this.contract, "sponsors").getTableRow(Name.from(acctName).value.toString()).map((row:any) => Types.Sponsor.from(row))
  }

  teams() {
    return getTable(this.contract, "teams").getTableRows()
  }

  boosters() {
    return getTable(this.contract, "boosters").getTableRows()
  }

  offers() {
    return getTable(this.contract, "offers").getTableRows().map((row:any) => Types.Offer.from(row))
  }

  global() {
    return getTable(this.contract, "global").getTableRows().map((row:any) => Types.Global.from(row))
  }

  config() {
    return getTable(this.contract, "config").getTableRows()[0]
  }

  stats() {
    return getTable(this.contract, "stats").getTableRows()
  }

  nfts(scope:string) {
    return getTable(this.contract, "nfts", scope).getTableRows()
  }

  assets(scope:string) {
    const assetsTable = getTable(this.aa, "assets", scope)
    return assetsTable.getTableRows()
  }

  auth() {
    return getTable(this.contract, "auth").getTableRows()?.[0]
  }

  invites(scope:string) {
    return getTable(this.contract, "invites", scope).getTableRows()
  }

  invite(scope:string, invite_id:string) {
    const invitesTable = getTable(this.contract, "invites", scope)
    return invitesTable.getTableRow(invite_id)
  }
}
