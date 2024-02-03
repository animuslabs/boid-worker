// generated by @greymass/abi2core

import {
  Asset,
  Bytes,
  Float32,
  Float64,
  Int16,
  Int32,
  Int64,
  Int8,
  Name,
  PublicKey,
  Signature,
  Struct,
  UInt16,
  UInt32,
  UInt64,
  UInt8,
  Variant
} from "@wharfkit/antelope"

@Struct.type("AccountAuth")
export class AccountAuth extends Struct {
    @Struct.field(PublicKey, { array: true }) keys!:PublicKey[]
    @Struct.field(UInt8) nonce!:UInt8
}

@Struct.type("TokenUnstake")
export class TokenUnstake extends Struct {
    @Struct.field(UInt16) redeemable_after_round!:UInt16
    @Struct.field(UInt32) quantity!:UInt32
}

@Struct.type("AccountStake")
export class AccountStake extends Struct {
    @Struct.field(TokenUnstake, { array: true }) unstaking!:TokenUnstake[]
    @Struct.field(UInt32) self_staked!:UInt32
    @Struct.field(UInt16) received_delegated_stake!:UInt16
}

@Struct.type("AccountBooster")
export class AccountBooster extends Struct {
    @Struct.field(UInt8) pwr_multiplier!:UInt8
    @Struct.field(UInt16) pwr_add_per_round!:UInt16
    @Struct.field(UInt16) expires_round!:UInt16
    @Struct.field(UInt32) aggregate_pwr_remaining!:UInt32
}

@Struct.type("AccountPower")
export class AccountPower extends Struct {
    @Struct.field(UInt16) last_claimed_round!:UInt16
    @Struct.field(UInt16) last_added_round!:UInt16
    @Struct.field(UInt16) rating!:UInt16
    @Struct.field(UInt16, { array: true }) history!:UInt16[]
    @Struct.field(AccountBooster, { array: true }) boosters!:AccountBooster[]
}

@Struct.type("AccountTeam")
export class AccountTeam extends Struct {
    @Struct.field(UInt8) team_id!:UInt8
    @Struct.field(UInt16) last_edit_round!:UInt16
    @Struct.field(UInt8) team_tax_mult!:UInt8
    @Struct.field(UInt32) team_cumulative_contribution!:UInt32
}

@Struct.type("Account")
export class Account extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Name, { array: true }) owners!:Name[]
    @Struct.field(AccountAuth) auth!:AccountAuth
    @Struct.field(Name, { array: true }) sponsors!:Name[]
    @Struct.field(AccountStake) stake!:AccountStake
    @Struct.field(AccountPower) power!:AccountPower
    @Struct.field(AccountTeam) team!:AccountTeam
    @Struct.field(UInt32) balance!:UInt32
    @Struct.field(UInt16) nft_balance!:UInt16
    @Struct.field("bool") recoverable!:boolean
}

@Struct.type("AccountCreate")
export class AccountCreate extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(PublicKey, { array: true }) keys!:PublicKey[]
    @Struct.field(Name, { array: true }) owners!:Name[]
}

@Struct.type("AcctMeta")
export class AcctMeta extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Bytes) meta!:Bytes
}

@Struct.type("PermissionLevel")
export class PermissionLevel extends Struct {
    @Struct.field(Name) actor!:Name
    @Struct.field(Name) permission!:Name
}

@Struct.type("Action")
export class Action extends Struct {
    @Struct.field(Name) account!:Name
    @Struct.field(Name) name!:Name
    @Struct.field(PermissionLevel, { array: true }) authorization!:PermissionLevel[]
    @Struct.field(Bytes) data!:Bytes
}

@Variant.type("AtomicValue", [Int8, Int16, Int32, Int64, UInt8, UInt16, UInt32, UInt64, Float32, Float64])
class AtomicValue extends Variant {}

@Struct.type("AtomicAttribute")
export class AtomicAttribute extends Struct {
    @Struct.field("string") key!:string
    @Struct.field(AtomicValue) value!:AtomicValue
}

@Struct.type("AtomicFormat")
export class AtomicFormat extends Struct {
    @Struct.field("string") name!:string
    @Struct.field("string") type!:string
}

@Struct.type("AuthRow")
export class AuthRow extends Struct {
    @Struct.field(Name) boid_id_auth!:Name
}

@Struct.type("Booster")
export class Booster extends Struct {
    @Struct.field(UInt8) booster_id!:UInt8
    @Struct.field(UInt8) pwr_multiplier!:UInt8
    @Struct.field(UInt16) pwr_add_per_round!:UInt16
    @Struct.field(UInt16) expire_after_elapsed_rounds!:UInt16
    @Struct.field(UInt32) aggregate_pwr_capacity!:UInt32
}

@Struct.type("ConfigAccount")
export class ConfigAccount extends Struct {
    @Struct.field(UInt32) invite_price!:UInt32
    @Struct.field(UInt32) premium_purchase_price!:UInt32
    @Struct.field(UInt8) max_premium_prefix!:UInt8
    @Struct.field(UInt8) max_owners!:UInt8
    @Struct.field(UInt8) max_boosters!:UInt8
    @Struct.field(Name, { array: true }) suffix_whitelist!:Name[]
    @Struct.field(UInt32) remove_sponsor_price!:UInt32
    @Struct.field(UInt8) sponsor_max_invite_codes!:UInt8
    @Struct.field(UInt16) invite_code_expire_rounds!:UInt16
}

@Struct.type("ConfigPower")
export class ConfigPower extends Struct {
    @Struct.field(Float32) sponsor_tax_mult!:Float32
    @Struct.field(Float32) powered_stake_mult!:Float32
    @Struct.field(UInt16) claim_maximum_elapsed_rounds!:UInt16
    @Struct.field(UInt16) soft_max_pwr_add!:UInt16
    @Struct.field(UInt8) history_slots_length!:UInt8
}

@Struct.type("ConfigMint")
export class ConfigMint extends Struct {
    @Struct.field(Float32) round_powered_stake_mult!:Float32
    @Struct.field(Float32) round_power_mult!:Float32
}

@Struct.type("ConfigTeam")
export class ConfigTeam extends Struct {
    @Struct.field(UInt16) change_min_rounds!:UInt16
    @Struct.field(UInt16) edit_team_min_rounds!:UInt16
    @Struct.field(UInt16) team_edit_max_pct_change!:UInt16
    @Struct.field(UInt32) buy_team_cost!:UInt32
    @Struct.field(UInt32) owner_stake_required!:UInt32
    @Struct.field(UInt16) owner_future_stake_lock_rounds_required!:UInt16
}

@Struct.type("ConfigStake")
export class ConfigStake extends Struct {
    @Struct.field(UInt8) unstake_rounds!:UInt8
    @Struct.field(UInt8) extra_stake_min_locked_rounds!:UInt8
}

@Struct.type("ConfigTime")
export class ConfigTime extends Struct {
    @Struct.field(UInt32) rounds_start_sec_since_epoch!:UInt32
    @Struct.field(UInt32) round_length_sec!:UInt32
}

@Struct.type("ConfigAuth")
export class ConfigAuth extends Struct {
    @Struct.field(Name, { array: true }) key_actions_whitelist!:Name[]
    @Struct.field(UInt32) key_account_max_stake!:UInt32
    @Struct.field(UInt32) key_account_max_balance!:UInt32
    @Struct.field(UInt8) account_max_keys!:UInt8
    @Struct.field(UInt32) worker_max_bill_per_action!:UInt32
}

@Struct.type("ConfigNft")
export class ConfigNft extends Struct {
    @Struct.field(UInt16) boid_id_maximum_nfts!:UInt16
    @Struct.field(Name, { array: true }) whitelist_collections!:Name[]
}

@Struct.type("Config")
export class Config extends Struct {
    @Struct.field(ConfigAccount) account!:ConfigAccount
    @Struct.field(ConfigPower) power!:ConfigPower
    @Struct.field(ConfigMint) mint!:ConfigMint
    @Struct.field(ConfigTeam) team!:ConfigTeam
    @Struct.field(ConfigStake) stake!:ConfigStake
    @Struct.field(ConfigTime) time!:ConfigTime
    @Struct.field(ConfigAuth) auth!:ConfigAuth
    @Struct.field(ConfigNft) nft!:ConfigNft
    @Struct.field("bool") paused!:boolean
    @Struct.field("bool") allow_deposits!:boolean
    @Struct.field("bool") allow_withdrawals!:boolean
    @Struct.field(Name) recoveryAccount!:Name
}

@Struct.type("ExtendedSymbol")
export class ExtendedSymbol extends Struct {
    @Struct.field(Asset.Symbol) sym!:Asset.Symbol
    @Struct.field(Name) contract!:Name
}

@Struct.type("Global")
export class Global extends Struct {
    @Struct.field(Name) chain_name!:Name
    @Struct.field(UInt64) total_power!:UInt64
    @Struct.field(UInt16) last_inflation_adjust_round!:UInt16
}

@Struct.type("Invite")
export class Invite extends Struct {
    @Struct.field(UInt64) invite_code!:UInt64
    @Struct.field(PublicKey) key!:PublicKey
    @Struct.field(UInt16) created_round!:UInt16
}

@Struct.type("MintLog")
export class MintLog extends Struct {
    @Struct.field(UInt32) power_mint!:UInt32
    @Struct.field(UInt32) powered_stake_mint!:UInt32
    @Struct.field(UInt32) account_earned!:UInt32
    @Struct.field(UInt32) team_cut!:UInt32
    @Struct.field(UInt32) team_owner_earned!:UInt32
    @Struct.field(UInt32) overstake_mint!:UInt32
    @Struct.field(UInt32) total!:UInt32
}

@Struct.type("NFT")
export class NFT extends Struct {
    @Struct.field(UInt64) asset_id!:UInt64
    @Struct.field(UInt16) locked_until_round!:UInt16
}

@Struct.type("NFTMint")
export class NFTMint extends Struct {
    @Struct.field(Name) mint_receiver_boid_id!:Name
    @Struct.field(UInt16) mint_quantity_remaining!:UInt16
}

@Struct.type("NftAction")
export class NftAction extends Struct {
    @Struct.field(Name) collection_name!:Name
    @Struct.field(Name) schema_name!:Name
    @Struct.field(Int32) template_id!:Int32
    @Struct.field(AtomicAttribute, { array: true }) match_immutable_attributes!:AtomicAttribute[]
    @Struct.field(AtomicAttribute, { array: true }) match_mutable_attributes!:AtomicAttribute[]
    @Struct.field("bool") burn!:boolean
    @Struct.field(UInt16) lock_rounds!:UInt16
}

@Struct.type("NftMint")
export class NftMint extends Struct {
    @Struct.field(Int32) mint_template_id!:Int32
    @Struct.field(Name) mint_schema_name!:Name
    @Struct.field(Name) mint_collection_name!:Name
    @Struct.field(AtomicAttribute, { array: true }) immutable_data!:AtomicAttribute[]
    @Struct.field(AtomicAttribute, { array: true }) mutable_data!:AtomicAttribute[]
    @Struct.field(UInt8) quantity!:UInt8
}

@Struct.type("OfferRequirements")
export class OfferRequirements extends Struct {
    @Struct.field(Bytes) team_id!:Bytes
    @Struct.field(UInt16) min_power!:UInt16
    @Struct.field(UInt32) min_balance!:UInt32
    @Struct.field(UInt32) min_stake!:UInt32
    @Struct.field(UInt32) min_cumulative_team_contribution!:UInt32
}

@Struct.type("OfferAction")
export class OfferAction extends Struct {
    @Struct.field(UInt16) delegated_stake!:UInt16
    @Struct.field(UInt16) stake_locked_additional_rounds!:UInt16
    @Struct.field(NftAction, { array: true }) nft_actions!:NftAction[]
    @Struct.field(UInt32) balance_payment!:UInt32
}

@Struct.type("OfferRewards")
export class OfferRewards extends Struct {
    @Struct.field(NftMint, { array: true }) nft_mints!:NftMint[]
    @Struct.field(UInt32) balance_deposit!:UInt32
    @Struct.field(UInt16) delegated_stake!:UInt16
    @Struct.field(UInt16) stake_locked_additional_rounds!:UInt16
    @Struct.field(Bytes) activate_booster_ids!:Bytes
}

@Struct.type("OfferLimits")
export class OfferLimits extends Struct {
    @Struct.field(UInt32) offer_quantity_remaining!:UInt32
    @Struct.field(UInt16) available_until_round!:UInt16
}

@Struct.type("Offer")
export class Offer extends Struct {
    @Struct.field(UInt64) offer_id!:UInt64
    @Struct.field(OfferRequirements) requirements!:OfferRequirements
    @Struct.field(OfferAction) actions!:OfferAction
    @Struct.field(OfferRewards) rewards!:OfferRewards
    @Struct.field(OfferLimits) limits!:OfferLimits
    @Struct.field(UInt32) total_claimed!:UInt32
}

@Struct.type("PowerClaimLog")
export class PowerClaimLog extends Struct {
    @Struct.field(UInt32) before!:UInt32
    @Struct.field(UInt32) after!:UInt32
    @Struct.field(UInt32) from_boosters!:UInt32
    @Struct.field(UInt16) elapsed_rounds!:UInt16
}

@Struct.type("Sponsor")
export class Sponsor extends Struct {
    @Struct.field(Name) sponsor_boid_id!:Name
    @Struct.field(UInt16) invites_balance!:UInt16
    @Struct.field(UInt16) invite_codes_unclaimed!:UInt16
    @Struct.field(UInt32) invite_codes_claimed!:UInt32
    @Struct.field(UInt32) sponsored_upgrades!:UInt32
    @Struct.field(UInt32) upgrades_total_earned!:UInt32
}

@Struct.type("DelegStake")
export class DelegStake extends Struct {
    @Struct.field(UInt64) stake_id!:UInt64
    @Struct.field(Name) from_boid_id!:Name
    @Struct.field(Name) to_boid_id!:Name
    @Struct.field(UInt16) stake_quantity!:UInt16
    @Struct.field(UInt16) locked_until_round!:UInt16
}

@Struct.type("Team")
export class Team extends Struct {
    @Struct.field(UInt16) team_id!:UInt16
    @Struct.field(UInt32) balance!:UInt32
    @Struct.field(AccountStake) stake!:AccountStake
    @Struct.field(Name) owner!:Name
    @Struct.field(Name, { array: true }) managers!:Name[]
    @Struct.field(UInt8) min_pwr_tax_mult!:UInt8
    @Struct.field(UInt8) owner_cut_mult!:UInt8
    @Struct.field("string") url_safe_name!:string
    @Struct.field(UInt64) power!:UInt64
    @Struct.field(UInt32) members!:UInt32
    @Struct.field(UInt16) last_edit_round!:UInt16
    @Struct.field(Bytes) meta!:Bytes
}

@Struct.type("account.add")
export class AccountAdd extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Name, { array: true }) owners!:Name[]
    @Struct.field(Name, { array: true }) sponsors!:Name[]
    @Struct.field(PublicKey, { array: true }) keys!:PublicKey[]
}

@Struct.type("account.buy")
export class AccountBuy extends Struct {
    @Struct.field(Name) payer_boid_id!:Name
    @Struct.field(AccountCreate) new_account!:AccountCreate
}

@Struct.type("account.edit")
export class AccountEdit extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Bytes) meta!:Bytes
}

@Struct.type("account.free")
export class AccountFree extends Struct {
    @Struct.field(Name) boid_id!:Name
}

@Struct.type("account.mod")
export class AccountMod extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt16) received_delegated_stake!:UInt16
}

@Struct.type("account.rm")
export class AccountRm extends Struct {
    @Struct.field(Name) boid_id!:Name
}

@Struct.type("accounts.clr")
export class AccountsClr extends Struct {
}

@Struct.type("auth")
export class Auth extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Action, { array: true }) actions!:Action[]
    @Struct.field(Signature) sig!:Signature
    @Struct.field(Int32) keyIndex!:Int32
    @Struct.field(UInt32) expires_utc_sec!:UInt32
}

@Struct.type("auth.addkey")
export class AuthAddkey extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(PublicKey) key!:PublicKey
}

@Struct.type("auth.clear")
export class AuthClear extends Struct {
}

@Struct.type("auth.init")
export class AuthInit extends Struct {
}

@Struct.type("auth.rmkey")
export class AuthRmkey extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Int32) keyIndex!:Int32
}

@Struct.type("booster.add")
export class BoosterAdd extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt8) booster_id!:UInt8
}

@Struct.type("booster.new")
export class BoosterNew extends Struct {
    @Struct.field(Booster) booster!:Booster
}

@Struct.type("booster.rm")
export class BoosterRm extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Int32, { array: true }) booster_index!:Int32[]
}

@Struct.type("config.clear")
export class ConfigClear extends Struct {
}

@Struct.type("config.set")
export class ConfigSet extends Struct {
    @Struct.field(Config) config!:Config
}

@Struct.type("global.chain")
export class GlobalChain extends Struct {
    @Struct.field(Name) chain_name!:Name
}

@Struct.type("global.clear")
export class GlobalClear extends Struct {
}

@Struct.type("global.set")
export class GlobalSet extends Struct {
    @Struct.field(Global) globalData!:Global
}

@Struct.type("internalxfer")
export class Internalxfer extends Struct {
    @Struct.field(Name) from_boid_id!:Name
    @Struct.field(Name) to_boid_id!:Name
    @Struct.field(UInt32) quantity!:UInt32
    @Struct.field("string") memo!:string
}

@Struct.type("invite.add")
export class InviteAdd extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt64) invite_code!:UInt64
    @Struct.field(PublicKey) key!:PublicKey
}

@Struct.type("invite.buy")
export class InviteBuy extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt16) quantity!:UInt16
}

@Struct.type("invite.claim")
export class InviteClaim extends Struct {
    @Struct.field(Name) sponsor_boid_id!:Name
    @Struct.field(UInt64) invite_code!:UInt64
    @Struct.field(Signature) sig!:Signature
    @Struct.field(AccountCreate) new_account!:AccountCreate
}

@Struct.type("invite.rm")
export class InviteRm extends Struct {
    @Struct.field(Name) sponsor_boid_id!:Name
    @Struct.field(UInt64) invite_code!:UInt64
}

@Struct.type("logpwradd")
export class Logpwradd extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt16) received!:UInt16
    @Struct.field(UInt16) from_mult_boosters!:UInt16
    @Struct.field(UInt16) diverted_to_sponsor!:UInt16
    @Struct.field(UInt16) power_increased!:UInt16
    @Struct.field(Name) orign!:Name
}

@Struct.type("logpwrclaim")
export class Logpwrclaim extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(PowerClaimLog) power!:PowerClaimLog
    @Struct.field(MintLog) mint!:MintLog
}

@Struct.type("meta.clean")
export class MetaClean extends Struct {
}

@Struct.type("mint")
export class Mint extends Struct {
    @Struct.field(Name) to!:Name
    @Struct.field(UInt32) whole_quantity!:UInt32
}

@Struct.type("nft.lock")
export class NftLock extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt64) asset_id!:UInt64
    @Struct.field(UInt16) locked_until_round!:UInt16
}

@Struct.type("nft.receiver")
export class NftReceiver extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt16) mint_quantity!:UInt16
}

@Struct.type("nft.withdraw")
export class NftWithdraw extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt64, { array: true }) asset_ids!:UInt64[]
    @Struct.field(Name) to!:Name
}

@Struct.type("nft.xfer")
export class NftXfer extends Struct {
    @Struct.field(Name) from_boid_id!:Name
    @Struct.field(Name) to_boid_id!:Name
    @Struct.field(UInt64, { array: true }) asset_ids!:UInt64[]
}

@Struct.type("offer.add")
export class OfferAdd extends Struct {
    @Struct.field(OfferRequirements) requirements!:OfferRequirements
    @Struct.field(OfferAction) actions!:OfferAction
    @Struct.field(OfferRewards) rewards!:OfferRewards
    @Struct.field(OfferLimits) limits!:OfferLimits
}

@Struct.type("offer.claim")
export class OfferClaim extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt64) offer_id!:UInt64
    @Struct.field(UInt64, { array: true }) required_nft_action_ids!:UInt64[]
}

@Struct.type("offer.clean")
export class OfferClean extends Struct {
}

@Struct.type("offer.rm")
export class OfferRm extends Struct {
    @Struct.field(UInt64) offer_id!:UInt64
}

@Struct.type("owner.add")
export class OwnerAdd extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Name) owner!:Name
}

@Struct.type("owner.rm")
export class OwnerRm extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(Name) owner!:Name
}

@Struct.type("power.add")
export class PowerAdd extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt16) power!:UInt16
}

@Struct.type("power.claim")
export class PowerClaim extends Struct {
    @Struct.field(Name) boid_id!:Name
}

@Struct.type("rmdelegstake")
export class Rmdelegstake extends Struct {
    @Struct.field(UInt64) stake_id!:UInt64
}

@Struct.type("sponsor.rm")
export class SponsorRm extends Struct {
    @Struct.field(Name) sponsor_boid_id!:Name
}

@Struct.type("sponsor.set")
export class SponsorSet extends Struct {
    @Struct.field(Sponsor) row!:Sponsor
}

@Struct.type("stake")
export class Stake extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt32) quantity!:UInt32
}

@Struct.type("stake.deleg")
export class StakeDeleg extends Struct {
    @Struct.field(Name) from_boid_id!:Name
    @Struct.field(Name) to_boid_id!:Name
    @Struct.field(UInt16) stake_quantity!:UInt16
    @Struct.field(UInt16) lock_until_round!:UInt16
}

@Struct.type("team.change")
export class TeamChange extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt8) new_team_id!:UInt8
    @Struct.field(UInt8) new_pwr_tax_mult!:UInt8
}

@Struct.type("team.create")
export class TeamCreate extends Struct {
    @Struct.field(Name) owner!:Name
    @Struct.field(UInt8) min_pwr_tax_mult!:UInt8
    @Struct.field(UInt8) owner_cut_mult!:UInt8
    @Struct.field("string") url_safe_name!:string
}

@Struct.type("team.edit")
export class TeamEdit extends Struct {
    @Struct.field(UInt8) team_id!:UInt8
    @Struct.field(Name) owner!:Name
    @Struct.field(Name, { array: true }) managers!:Name[]
    @Struct.field(UInt8) min_pwr_tax_mult!:UInt8
    @Struct.field(UInt8) owner_cut_mult!:UInt8
    @Struct.field("string") url_safe_name!:string
}

@Struct.type("team.setmeta")
export class TeamSetmeta extends Struct {
    @Struct.field(UInt8) team_id!:UInt8
    @Struct.field(Bytes) meta!:Bytes
}

@Struct.type("team.rm")
export class TeamRm extends Struct {
    @Struct.field(UInt8) team_id!:UInt8
}

@Struct.type("team.setmem")
export class TeamSetmem extends Struct {
    @Struct.field(UInt8) team_id!:UInt8
    @Struct.field(UInt32) new_members!:UInt32
}

@Struct.type("team.setpwr")
export class TeamSetpwr extends Struct {
    @Struct.field(UInt8) team_id!:UInt8
    @Struct.field(UInt32) new_power!:UInt32
}

@Struct.type("team.taxrate")
export class TeamTaxrate extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt8) new_pwr_tax_mult!:UInt8
}

@Struct.type("thisround")
export class Thisround extends Struct {
}

@Struct.type("unstake.end")
export class UnstakeEnd extends Struct {
    @Struct.field(Name) boid_id!:Name
}

@Struct.type("unstake.init")
export class UnstakeInit extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt32) quantity!:UInt32
}

@Struct.type("unstake.stop")
export class UnstakeStop extends Struct {
    @Struct.field(Name) boid_id!:Name
}

@Struct.type("unstke.deleg")
export class UnstkeDeleg extends Struct {
    @Struct.field(UInt64) stake_id!:UInt64
}

@Struct.type("withdraw")
export class Withdraw extends Struct {
    @Struct.field(Name) boid_id!:Name
    @Struct.field(UInt32) quantity!:UInt32
    @Struct.field(Name) to!:Name
}
