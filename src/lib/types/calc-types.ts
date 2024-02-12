type AccountConfig = {
  invite_price:number;
  premium_purchase_price:number;
  max_premium_prefix:number;
  max_owners:number;
  max_boosters:number;
  suffix_whitelist:string[];
  remove_sponsor_price:number;
  sponsor_max_invite_codes:number;
  invite_code_expire_rounds:number;
};

type PowerConfig = {
  sponsor_tax_mult:number;
  powered_stake_mult:number;
  claim_maximum_elapsed_rounds:number;
  soft_max_pwr_add:number;
  history_slots_length:number;
};

type MintConfig = {
  round_powered_stake_mult:number;
  round_power_mult:number;
};

type TeamConfig = {
  change_min_rounds:number;
  edit_team_min_rounds:number;
  team_edit_max_pct_change:number;
  buy_team_cost:number;
  owner_stake_required:number;
  owner_future_stake_lock_rounds_required:number;
};

type StakeConfig = {
  unstake_rounds:number;
  extra_stake_min_locked_rounds:number;
};

type TimeConfig = {
  rounds_start_sec_since_epoch:number;
  round_length_sec:number;
};

type AuthConfig = {
  key_actions_whitelist:string[];
  key_account_max_stake:number;
  key_account_max_balance:number;
  account_max_keys:number;
  worker_max_bill_per_action:number;
};

type NFTConfig = {
  boid_id_maximum_nfts:number;
  whitelist_collections:string[];
};
export interface Config {
  paused:boolean;
  account:AccountConfig;
  power:PowerConfig;
  mint:MintConfig;
  team:TeamConfig;
  stake:StakeConfig;
  time:TimeConfig;
  auth:AuthConfig;
  nft:NFTConfig;
  allow_deposits:boolean;
  allow_withdrawals:boolean;
  recoveryAccount:string;
}

export type UserConfig = {
  power?:Partial<Pick<PowerConfig, "sponsor_tax_mult" | "powered_stake_mult">>,
  mint?:Partial<Pick<MintConfig, "round_powered_stake_mult" | "round_power_mult">>
};

export interface TableView {
  getTableRows:() =>any;
  getTableRow:(key:string) =>any;
}

interface BaseTables {
  accounts:() =>TableView;
  stakes:() =>TableView;
  sponsors:() =>TableView;
  teams:() =>TableView;
  boosters:() =>TableView;
  offers:() =>TableView;
  global:() =>TableView;
  config:() =>TableView;
  stats:() =>TableView;
  auth:() =>TableView;
}

export interface ContractTables extends BaseTables {
  nfts:(scope:string) =>TableView;
  invites:(scope:string) =>TableView;
  assets:(scope:string) =>TableView;
}
