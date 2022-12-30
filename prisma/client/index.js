
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  NotFoundError,
  decompressFromBase64,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions
} = require('./runtime/index')


const Prisma = {}

exports.Prisma = Prisma

/**
 * Prisma Client JS version: 4.8.0
 * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
 */
Prisma.prismaVersion = {
  client: "4.8.0",
  engine: "d6e67a83f971b175a593ccc12e15c4a757f93ffe"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.NotFoundError = NotFoundError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = () => (val) => val


/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}


  const path = require('path')

const { findSync } = require('./runtime')
const fs = require('fs')

// some frameworks or bundlers replace or totally remove __dirname
const hasDirname = typeof __dirname !== 'undefined' && __dirname !== '/'

// will work in most cases, ie. if the client has not been bundled
const regularDirname = hasDirname && fs.existsSync(path.join(__dirname, 'schema.prisma')) && __dirname

// if the client has been bundled, we need to look for the folders
const foundDirname = !regularDirname && findSync(process.cwd(), [
    "prisma\\client",
    "client",
], ['d'], ['d'], 1)[0]

const dirname = regularDirname || foundDirname || __dirname

/**
 * Enums
 */
// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275
function makeEnum(x) { return x; }

exports.Prisma.AccountAddScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  sponsor: 'sponsor',
  owner: 'owner',
  key: 'key'
});

exports.Prisma.AccountBuyScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  payer_boid_id: 'payer_boid_id',
  boid_id: 'boid_id',
  key: 'key',
  owner: 'owner'
});

exports.Prisma.AccountEditScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  ipfs_meta: 'ipfs_meta'
});

exports.Prisma.AccountFreeScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id'
});

exports.Prisma.AuthAddKeyScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  key: 'key'
});

exports.Prisma.AuthRmKeyScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  keyIndex: 'keyIndex'
});

exports.Prisma.BoidAccountScalarFieldEnum = makeEnum({
  boidId: 'boidId'
});

exports.Prisma.FahDataScalarFieldEnum = makeEnum({
  id: 'id',
  time: 'time',
  fahid: 'fahid',
  name: 'name',
  score: 'score',
  wus: 'wus'
});

exports.Prisma.InternalXferScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  from_boid_id: 'from_boid_id',
  to_boid_id: 'to_boid_id',
  quantity: 'quantity',
  memo: 'memo'
});

exports.Prisma.InviteAddScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  invite_code: 'invite_code',
  key: 'key'
});

exports.Prisma.InviteClaimScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  sponsor_boid_id: 'sponsor_boid_id',
  invite_code: 'invite_code',
  sig: 'sig',
  create_boid_id: 'create_boid_id',
  create_key: 'create_key',
  create_owner: 'create_owner'
});

exports.Prisma.InviteRmScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  sponsor_boid_id: 'sponsor_boid_id',
  invite_code: 'invite_code'
});

exports.Prisma.LogPwrAddScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  received: 'received',
  from_mult_mods: 'from_mult_mods',
  diverted_to_sponsor: 'diverted_to_sponsor',
  power_increased: 'power_increased',
  orign: 'orign'
});

exports.Prisma.LogPwrClaimScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  power_before: 'power_before',
  power_after: 'power_after',
  power_from_mods: 'power_from_mods',
  power_decayed: 'power_decayed',
  power_rounds: 'power_rounds',
  mint_account: 'mint_account',
  mint_team: 'mint_team',
  mint_team_owner: 'mint_team_owner',
  mint_overstake: 'mint_overstake',
  mint_fundstake: 'mint_fundstake',
  mint_total: 'mint_total'
});

exports.Prisma.NftLockScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  asset_id: 'asset_id',
  locked_until_round: 'locked_until_round'
});

exports.Prisma.NftWithdrawScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  asset_ids: 'asset_ids',
  to: 'to'
});

exports.Prisma.NftXferScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  from_boid_id: 'from_boid_id',
  to_boid_id: 'to_boid_id',
  asset_ids: 'asset_ids'
});

exports.Prisma.OfferClaimScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  offer_id: 'offer_id',
  required_nft_action_ids: 'required_nft_action_ids'
});

exports.Prisma.OwnerAddScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  owner: 'owner'
});

exports.Prisma.OwnerRmScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  owner: 'owner'
});

exports.Prisma.PwrModAddScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  mod_id: 'mod_id'
});

exports.Prisma.PwrModRmScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  pwrmod_index: 'pwrmod_index'
});

exports.Prisma.SortOrder = makeEnum({
  asc: 'asc',
  desc: 'desc'
});

exports.Prisma.StakeDelegScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  from_boid_id: 'from_boid_id',
  to_boid_id: 'to_boid_id',
  stake_quantity: 'stake_quantity',
  lock_until_round: 'lock_until_round'
});

exports.Prisma.StakeScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  quantity: 'quantity'
});

exports.Prisma.TeamChangeScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  new_team_id: 'new_team_id',
  new_pwr_tax_mult: 'new_pwr_tax_mult'
});

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
});

exports.Prisma.UnstakeDelegScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  stake_id: 'stake_id'
});

exports.Prisma.UnstakeEndScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id'
});

exports.Prisma.UnstakeInitScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  quantity: 'quantity'
});

exports.Prisma.UnstakeStopScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id'
});

exports.Prisma.WithdrawScalarFieldEnum = makeEnum({
  sequence: 'sequence',
  trxId: 'trxId',
  timeStamp: 'timeStamp',
  boid_id: 'boid_id',
  quantity: 'quantity',
  to: 'to'
});


exports.Prisma.ModelName = makeEnum({
  FahData: 'FahData',
  BoidAccount: 'BoidAccount',
  AccountAdd: 'AccountAdd',
  AccountBuy: 'AccountBuy',
  AccountEdit: 'AccountEdit',
  AccountFree: 'AccountFree',
  AuthAddKey: 'AuthAddKey',
  AuthRmKey: 'AuthRmKey',
  InternalXfer: 'InternalXfer',
  InviteAdd: 'InviteAdd',
  InviteClaim: 'InviteClaim',
  InviteRm: 'InviteRm',
  LogPwrAdd: 'LogPwrAdd',
  LogPwrClaim: 'LogPwrClaim',
  NftLock: 'NftLock',
  NftWithdraw: 'NftWithdraw',
  NftXfer: 'NftXfer',
  OfferClaim: 'OfferClaim',
  OwnerAdd: 'OwnerAdd',
  OwnerRm: 'OwnerRm',
  PwrModAdd: 'PwrModAdd',
  PwrModRm: 'PwrModRm',
  Stake: 'Stake',
  StakeDeleg: 'StakeDeleg',
  TeamChange: 'TeamChange',
  UnstakeEnd: 'UnstakeEnd',
  UnstakeStop: 'UnstakeStop',
  UnstakeInit: 'UnstakeInit',
  UnstakeDeleg: 'UnstakeDeleg',
  Withdraw: 'Withdraw'
});

const dmmfString = "{\"datamodel\":{\"enums\":[],\"models\":[{\"name\":\"FahData\",\"dbName\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"String\",\"default\":{\"name\":\"uuid\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"time\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fahid\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"name\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"score\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"wus\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"BoidAccount\",\"dbName\":null,\"fields\":[{\"name\":\"boidId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AccountAdd\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sponsor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"owner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AccountBuy\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"payer_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"owner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AccountEdit\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"ipfs_meta\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AccountFree\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AuthAddKey\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"AuthRmKey\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"keyIndex\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"InternalXfer\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"from_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"to_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"memo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"InviteAdd\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invite_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"InviteClaim\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sponsor_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invite_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sig\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_key\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"create_owner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"InviteRm\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"sponsor_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"invite_code\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"LogPwrAdd\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"received\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"from_mult_mods\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"diverted_to_sponsor\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"power_increased\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"orign\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"LogPwrClaim\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"power_before\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"power_after\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"power_from_mods\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"power_decayed\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"power_rounds\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mint_account\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mint_team\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mint_team_owner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mint_overstake\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mint_fundstake\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mint_total\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"NftLock\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"locked_until_round\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"NftWithdraw\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset_ids\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"to\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"NftXfer\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"from_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"to_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"asset_ids\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"OfferClaim\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"offer_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"required_nft_action_ids\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"OwnerAdd\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"owner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"OwnerRm\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"owner\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"PwrModAdd\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mod_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"PwrModRm\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pwrmod_index\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Stake\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"StakeDeleg\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"from_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"to_boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stake_quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"lock_until_round\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"TeamChange\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_team_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"new_pwr_tax_mult\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"UnstakeEnd\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"UnstakeStop\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"UnstakeInit\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"UnstakeDeleg\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"stake_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},{\"name\":\"Withdraw\",\"dbName\":null,\"fields\":[{\"name\":\"sequence\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":true,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"BigInt\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"trxId\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"timeStamp\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"boid_id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"quantity\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"to\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}],\"types\":[]},\"mappings\":{\"modelOperations\":[{\"model\":\"FahData\",\"plural\":\"fahData\",\"findUnique\":\"findUniqueFahData\",\"findUniqueOrThrow\":\"findUniqueFahDataOrThrow\",\"findFirst\":\"findFirstFahData\",\"findFirstOrThrow\":\"findFirstFahDataOrThrow\",\"findMany\":\"findManyFahData\",\"create\":\"createOneFahData\",\"delete\":\"deleteOneFahData\",\"update\":\"updateOneFahData\",\"deleteMany\":\"deleteManyFahData\",\"updateMany\":\"updateManyFahData\",\"upsert\":\"upsertOneFahData\",\"aggregate\":\"aggregateFahData\",\"groupBy\":\"groupByFahData\"},{\"model\":\"BoidAccount\",\"plural\":\"boidAccounts\",\"findUnique\":\"findUniqueBoidAccount\",\"findUniqueOrThrow\":\"findUniqueBoidAccountOrThrow\",\"findFirst\":\"findFirstBoidAccount\",\"findFirstOrThrow\":\"findFirstBoidAccountOrThrow\",\"findMany\":\"findManyBoidAccount\",\"create\":\"createOneBoidAccount\",\"delete\":\"deleteOneBoidAccount\",\"update\":\"updateOneBoidAccount\",\"deleteMany\":\"deleteManyBoidAccount\",\"updateMany\":\"updateManyBoidAccount\",\"upsert\":\"upsertOneBoidAccount\",\"aggregate\":\"aggregateBoidAccount\",\"groupBy\":\"groupByBoidAccount\"},{\"model\":\"AccountAdd\",\"plural\":\"accountAdds\",\"findUnique\":\"findUniqueAccountAdd\",\"findUniqueOrThrow\":\"findUniqueAccountAddOrThrow\",\"findFirst\":\"findFirstAccountAdd\",\"findFirstOrThrow\":\"findFirstAccountAddOrThrow\",\"findMany\":\"findManyAccountAdd\",\"create\":\"createOneAccountAdd\",\"delete\":\"deleteOneAccountAdd\",\"update\":\"updateOneAccountAdd\",\"deleteMany\":\"deleteManyAccountAdd\",\"updateMany\":\"updateManyAccountAdd\",\"upsert\":\"upsertOneAccountAdd\",\"aggregate\":\"aggregateAccountAdd\",\"groupBy\":\"groupByAccountAdd\"},{\"model\":\"AccountBuy\",\"plural\":\"accountBuys\",\"findUnique\":\"findUniqueAccountBuy\",\"findUniqueOrThrow\":\"findUniqueAccountBuyOrThrow\",\"findFirst\":\"findFirstAccountBuy\",\"findFirstOrThrow\":\"findFirstAccountBuyOrThrow\",\"findMany\":\"findManyAccountBuy\",\"create\":\"createOneAccountBuy\",\"delete\":\"deleteOneAccountBuy\",\"update\":\"updateOneAccountBuy\",\"deleteMany\":\"deleteManyAccountBuy\",\"updateMany\":\"updateManyAccountBuy\",\"upsert\":\"upsertOneAccountBuy\",\"aggregate\":\"aggregateAccountBuy\",\"groupBy\":\"groupByAccountBuy\"},{\"model\":\"AccountEdit\",\"plural\":\"accountEdits\",\"findUnique\":\"findUniqueAccountEdit\",\"findUniqueOrThrow\":\"findUniqueAccountEditOrThrow\",\"findFirst\":\"findFirstAccountEdit\",\"findFirstOrThrow\":\"findFirstAccountEditOrThrow\",\"findMany\":\"findManyAccountEdit\",\"create\":\"createOneAccountEdit\",\"delete\":\"deleteOneAccountEdit\",\"update\":\"updateOneAccountEdit\",\"deleteMany\":\"deleteManyAccountEdit\",\"updateMany\":\"updateManyAccountEdit\",\"upsert\":\"upsertOneAccountEdit\",\"aggregate\":\"aggregateAccountEdit\",\"groupBy\":\"groupByAccountEdit\"},{\"model\":\"AccountFree\",\"plural\":\"accountFrees\",\"findUnique\":\"findUniqueAccountFree\",\"findUniqueOrThrow\":\"findUniqueAccountFreeOrThrow\",\"findFirst\":\"findFirstAccountFree\",\"findFirstOrThrow\":\"findFirstAccountFreeOrThrow\",\"findMany\":\"findManyAccountFree\",\"create\":\"createOneAccountFree\",\"delete\":\"deleteOneAccountFree\",\"update\":\"updateOneAccountFree\",\"deleteMany\":\"deleteManyAccountFree\",\"updateMany\":\"updateManyAccountFree\",\"upsert\":\"upsertOneAccountFree\",\"aggregate\":\"aggregateAccountFree\",\"groupBy\":\"groupByAccountFree\"},{\"model\":\"AuthAddKey\",\"plural\":\"authAddKeys\",\"findUnique\":\"findUniqueAuthAddKey\",\"findUniqueOrThrow\":\"findUniqueAuthAddKeyOrThrow\",\"findFirst\":\"findFirstAuthAddKey\",\"findFirstOrThrow\":\"findFirstAuthAddKeyOrThrow\",\"findMany\":\"findManyAuthAddKey\",\"create\":\"createOneAuthAddKey\",\"delete\":\"deleteOneAuthAddKey\",\"update\":\"updateOneAuthAddKey\",\"deleteMany\":\"deleteManyAuthAddKey\",\"updateMany\":\"updateManyAuthAddKey\",\"upsert\":\"upsertOneAuthAddKey\",\"aggregate\":\"aggregateAuthAddKey\",\"groupBy\":\"groupByAuthAddKey\"},{\"model\":\"AuthRmKey\",\"plural\":\"authRmKeys\",\"findUnique\":\"findUniqueAuthRmKey\",\"findUniqueOrThrow\":\"findUniqueAuthRmKeyOrThrow\",\"findFirst\":\"findFirstAuthRmKey\",\"findFirstOrThrow\":\"findFirstAuthRmKeyOrThrow\",\"findMany\":\"findManyAuthRmKey\",\"create\":\"createOneAuthRmKey\",\"delete\":\"deleteOneAuthRmKey\",\"update\":\"updateOneAuthRmKey\",\"deleteMany\":\"deleteManyAuthRmKey\",\"updateMany\":\"updateManyAuthRmKey\",\"upsert\":\"upsertOneAuthRmKey\",\"aggregate\":\"aggregateAuthRmKey\",\"groupBy\":\"groupByAuthRmKey\"},{\"model\":\"InternalXfer\",\"plural\":\"internalXfers\",\"findUnique\":\"findUniqueInternalXfer\",\"findUniqueOrThrow\":\"findUniqueInternalXferOrThrow\",\"findFirst\":\"findFirstInternalXfer\",\"findFirstOrThrow\":\"findFirstInternalXferOrThrow\",\"findMany\":\"findManyInternalXfer\",\"create\":\"createOneInternalXfer\",\"delete\":\"deleteOneInternalXfer\",\"update\":\"updateOneInternalXfer\",\"deleteMany\":\"deleteManyInternalXfer\",\"updateMany\":\"updateManyInternalXfer\",\"upsert\":\"upsertOneInternalXfer\",\"aggregate\":\"aggregateInternalXfer\",\"groupBy\":\"groupByInternalXfer\"},{\"model\":\"InviteAdd\",\"plural\":\"inviteAdds\",\"findUnique\":\"findUniqueInviteAdd\",\"findUniqueOrThrow\":\"findUniqueInviteAddOrThrow\",\"findFirst\":\"findFirstInviteAdd\",\"findFirstOrThrow\":\"findFirstInviteAddOrThrow\",\"findMany\":\"findManyInviteAdd\",\"create\":\"createOneInviteAdd\",\"delete\":\"deleteOneInviteAdd\",\"update\":\"updateOneInviteAdd\",\"deleteMany\":\"deleteManyInviteAdd\",\"updateMany\":\"updateManyInviteAdd\",\"upsert\":\"upsertOneInviteAdd\",\"aggregate\":\"aggregateInviteAdd\",\"groupBy\":\"groupByInviteAdd\"},{\"model\":\"InviteClaim\",\"plural\":\"inviteClaims\",\"findUnique\":\"findUniqueInviteClaim\",\"findUniqueOrThrow\":\"findUniqueInviteClaimOrThrow\",\"findFirst\":\"findFirstInviteClaim\",\"findFirstOrThrow\":\"findFirstInviteClaimOrThrow\",\"findMany\":\"findManyInviteClaim\",\"create\":\"createOneInviteClaim\",\"delete\":\"deleteOneInviteClaim\",\"update\":\"updateOneInviteClaim\",\"deleteMany\":\"deleteManyInviteClaim\",\"updateMany\":\"updateManyInviteClaim\",\"upsert\":\"upsertOneInviteClaim\",\"aggregate\":\"aggregateInviteClaim\",\"groupBy\":\"groupByInviteClaim\"},{\"model\":\"InviteRm\",\"plural\":\"inviteRms\",\"findUnique\":\"findUniqueInviteRm\",\"findUniqueOrThrow\":\"findUniqueInviteRmOrThrow\",\"findFirst\":\"findFirstInviteRm\",\"findFirstOrThrow\":\"findFirstInviteRmOrThrow\",\"findMany\":\"findManyInviteRm\",\"create\":\"createOneInviteRm\",\"delete\":\"deleteOneInviteRm\",\"update\":\"updateOneInviteRm\",\"deleteMany\":\"deleteManyInviteRm\",\"updateMany\":\"updateManyInviteRm\",\"upsert\":\"upsertOneInviteRm\",\"aggregate\":\"aggregateInviteRm\",\"groupBy\":\"groupByInviteRm\"},{\"model\":\"LogPwrAdd\",\"plural\":\"logPwrAdds\",\"findUnique\":\"findUniqueLogPwrAdd\",\"findUniqueOrThrow\":\"findUniqueLogPwrAddOrThrow\",\"findFirst\":\"findFirstLogPwrAdd\",\"findFirstOrThrow\":\"findFirstLogPwrAddOrThrow\",\"findMany\":\"findManyLogPwrAdd\",\"create\":\"createOneLogPwrAdd\",\"delete\":\"deleteOneLogPwrAdd\",\"update\":\"updateOneLogPwrAdd\",\"deleteMany\":\"deleteManyLogPwrAdd\",\"updateMany\":\"updateManyLogPwrAdd\",\"upsert\":\"upsertOneLogPwrAdd\",\"aggregate\":\"aggregateLogPwrAdd\",\"groupBy\":\"groupByLogPwrAdd\"},{\"model\":\"LogPwrClaim\",\"plural\":\"logPwrClaims\",\"findUnique\":\"findUniqueLogPwrClaim\",\"findUniqueOrThrow\":\"findUniqueLogPwrClaimOrThrow\",\"findFirst\":\"findFirstLogPwrClaim\",\"findFirstOrThrow\":\"findFirstLogPwrClaimOrThrow\",\"findMany\":\"findManyLogPwrClaim\",\"create\":\"createOneLogPwrClaim\",\"delete\":\"deleteOneLogPwrClaim\",\"update\":\"updateOneLogPwrClaim\",\"deleteMany\":\"deleteManyLogPwrClaim\",\"updateMany\":\"updateManyLogPwrClaim\",\"upsert\":\"upsertOneLogPwrClaim\",\"aggregate\":\"aggregateLogPwrClaim\",\"groupBy\":\"groupByLogPwrClaim\"},{\"model\":\"NftLock\",\"plural\":\"nftLocks\",\"findUnique\":\"findUniqueNftLock\",\"findUniqueOrThrow\":\"findUniqueNftLockOrThrow\",\"findFirst\":\"findFirstNftLock\",\"findFirstOrThrow\":\"findFirstNftLockOrThrow\",\"findMany\":\"findManyNftLock\",\"create\":\"createOneNftLock\",\"delete\":\"deleteOneNftLock\",\"update\":\"updateOneNftLock\",\"deleteMany\":\"deleteManyNftLock\",\"updateMany\":\"updateManyNftLock\",\"upsert\":\"upsertOneNftLock\",\"aggregate\":\"aggregateNftLock\",\"groupBy\":\"groupByNftLock\"},{\"model\":\"NftWithdraw\",\"plural\":\"nftWithdraws\",\"findUnique\":\"findUniqueNftWithdraw\",\"findUniqueOrThrow\":\"findUniqueNftWithdrawOrThrow\",\"findFirst\":\"findFirstNftWithdraw\",\"findFirstOrThrow\":\"findFirstNftWithdrawOrThrow\",\"findMany\":\"findManyNftWithdraw\",\"create\":\"createOneNftWithdraw\",\"delete\":\"deleteOneNftWithdraw\",\"update\":\"updateOneNftWithdraw\",\"deleteMany\":\"deleteManyNftWithdraw\",\"updateMany\":\"updateManyNftWithdraw\",\"upsert\":\"upsertOneNftWithdraw\",\"aggregate\":\"aggregateNftWithdraw\",\"groupBy\":\"groupByNftWithdraw\"},{\"model\":\"NftXfer\",\"plural\":\"nftXfers\",\"findUnique\":\"findUniqueNftXfer\",\"findUniqueOrThrow\":\"findUniqueNftXferOrThrow\",\"findFirst\":\"findFirstNftXfer\",\"findFirstOrThrow\":\"findFirstNftXferOrThrow\",\"findMany\":\"findManyNftXfer\",\"create\":\"createOneNftXfer\",\"delete\":\"deleteOneNftXfer\",\"update\":\"updateOneNftXfer\",\"deleteMany\":\"deleteManyNftXfer\",\"updateMany\":\"updateManyNftXfer\",\"upsert\":\"upsertOneNftXfer\",\"aggregate\":\"aggregateNftXfer\",\"groupBy\":\"groupByNftXfer\"},{\"model\":\"OfferClaim\",\"plural\":\"offerClaims\",\"findUnique\":\"findUniqueOfferClaim\",\"findUniqueOrThrow\":\"findUniqueOfferClaimOrThrow\",\"findFirst\":\"findFirstOfferClaim\",\"findFirstOrThrow\":\"findFirstOfferClaimOrThrow\",\"findMany\":\"findManyOfferClaim\",\"create\":\"createOneOfferClaim\",\"delete\":\"deleteOneOfferClaim\",\"update\":\"updateOneOfferClaim\",\"deleteMany\":\"deleteManyOfferClaim\",\"updateMany\":\"updateManyOfferClaim\",\"upsert\":\"upsertOneOfferClaim\",\"aggregate\":\"aggregateOfferClaim\",\"groupBy\":\"groupByOfferClaim\"},{\"model\":\"OwnerAdd\",\"plural\":\"ownerAdds\",\"findUnique\":\"findUniqueOwnerAdd\",\"findUniqueOrThrow\":\"findUniqueOwnerAddOrThrow\",\"findFirst\":\"findFirstOwnerAdd\",\"findFirstOrThrow\":\"findFirstOwnerAddOrThrow\",\"findMany\":\"findManyOwnerAdd\",\"create\":\"createOneOwnerAdd\",\"delete\":\"deleteOneOwnerAdd\",\"update\":\"updateOneOwnerAdd\",\"deleteMany\":\"deleteManyOwnerAdd\",\"updateMany\":\"updateManyOwnerAdd\",\"upsert\":\"upsertOneOwnerAdd\",\"aggregate\":\"aggregateOwnerAdd\",\"groupBy\":\"groupByOwnerAdd\"},{\"model\":\"OwnerRm\",\"plural\":\"ownerRms\",\"findUnique\":\"findUniqueOwnerRm\",\"findUniqueOrThrow\":\"findUniqueOwnerRmOrThrow\",\"findFirst\":\"findFirstOwnerRm\",\"findFirstOrThrow\":\"findFirstOwnerRmOrThrow\",\"findMany\":\"findManyOwnerRm\",\"create\":\"createOneOwnerRm\",\"delete\":\"deleteOneOwnerRm\",\"update\":\"updateOneOwnerRm\",\"deleteMany\":\"deleteManyOwnerRm\",\"updateMany\":\"updateManyOwnerRm\",\"upsert\":\"upsertOneOwnerRm\",\"aggregate\":\"aggregateOwnerRm\",\"groupBy\":\"groupByOwnerRm\"},{\"model\":\"PwrModAdd\",\"plural\":\"pwrModAdds\",\"findUnique\":\"findUniquePwrModAdd\",\"findUniqueOrThrow\":\"findUniquePwrModAddOrThrow\",\"findFirst\":\"findFirstPwrModAdd\",\"findFirstOrThrow\":\"findFirstPwrModAddOrThrow\",\"findMany\":\"findManyPwrModAdd\",\"create\":\"createOnePwrModAdd\",\"delete\":\"deleteOnePwrModAdd\",\"update\":\"updateOnePwrModAdd\",\"deleteMany\":\"deleteManyPwrModAdd\",\"updateMany\":\"updateManyPwrModAdd\",\"upsert\":\"upsertOnePwrModAdd\",\"aggregate\":\"aggregatePwrModAdd\",\"groupBy\":\"groupByPwrModAdd\"},{\"model\":\"PwrModRm\",\"plural\":\"pwrModRms\",\"findUnique\":\"findUniquePwrModRm\",\"findUniqueOrThrow\":\"findUniquePwrModRmOrThrow\",\"findFirst\":\"findFirstPwrModRm\",\"findFirstOrThrow\":\"findFirstPwrModRmOrThrow\",\"findMany\":\"findManyPwrModRm\",\"create\":\"createOnePwrModRm\",\"delete\":\"deleteOnePwrModRm\",\"update\":\"updateOnePwrModRm\",\"deleteMany\":\"deleteManyPwrModRm\",\"updateMany\":\"updateManyPwrModRm\",\"upsert\":\"upsertOnePwrModRm\",\"aggregate\":\"aggregatePwrModRm\",\"groupBy\":\"groupByPwrModRm\"},{\"model\":\"Stake\",\"plural\":\"stakes\",\"findUnique\":\"findUniqueStake\",\"findUniqueOrThrow\":\"findUniqueStakeOrThrow\",\"findFirst\":\"findFirstStake\",\"findFirstOrThrow\":\"findFirstStakeOrThrow\",\"findMany\":\"findManyStake\",\"create\":\"createOneStake\",\"delete\":\"deleteOneStake\",\"update\":\"updateOneStake\",\"deleteMany\":\"deleteManyStake\",\"updateMany\":\"updateManyStake\",\"upsert\":\"upsertOneStake\",\"aggregate\":\"aggregateStake\",\"groupBy\":\"groupByStake\"},{\"model\":\"StakeDeleg\",\"plural\":\"stakeDelegs\",\"findUnique\":\"findUniqueStakeDeleg\",\"findUniqueOrThrow\":\"findUniqueStakeDelegOrThrow\",\"findFirst\":\"findFirstStakeDeleg\",\"findFirstOrThrow\":\"findFirstStakeDelegOrThrow\",\"findMany\":\"findManyStakeDeleg\",\"create\":\"createOneStakeDeleg\",\"delete\":\"deleteOneStakeDeleg\",\"update\":\"updateOneStakeDeleg\",\"deleteMany\":\"deleteManyStakeDeleg\",\"updateMany\":\"updateManyStakeDeleg\",\"upsert\":\"upsertOneStakeDeleg\",\"aggregate\":\"aggregateStakeDeleg\",\"groupBy\":\"groupByStakeDeleg\"},{\"model\":\"TeamChange\",\"plural\":\"teamChanges\",\"findUnique\":\"findUniqueTeamChange\",\"findUniqueOrThrow\":\"findUniqueTeamChangeOrThrow\",\"findFirst\":\"findFirstTeamChange\",\"findFirstOrThrow\":\"findFirstTeamChangeOrThrow\",\"findMany\":\"findManyTeamChange\",\"create\":\"createOneTeamChange\",\"delete\":\"deleteOneTeamChange\",\"update\":\"updateOneTeamChange\",\"deleteMany\":\"deleteManyTeamChange\",\"updateMany\":\"updateManyTeamChange\",\"upsert\":\"upsertOneTeamChange\",\"aggregate\":\"aggregateTeamChange\",\"groupBy\":\"groupByTeamChange\"},{\"model\":\"UnstakeEnd\",\"plural\":\"unstakeEnds\",\"findUnique\":\"findUniqueUnstakeEnd\",\"findUniqueOrThrow\":\"findUniqueUnstakeEndOrThrow\",\"findFirst\":\"findFirstUnstakeEnd\",\"findFirstOrThrow\":\"findFirstUnstakeEndOrThrow\",\"findMany\":\"findManyUnstakeEnd\",\"create\":\"createOneUnstakeEnd\",\"delete\":\"deleteOneUnstakeEnd\",\"update\":\"updateOneUnstakeEnd\",\"deleteMany\":\"deleteManyUnstakeEnd\",\"updateMany\":\"updateManyUnstakeEnd\",\"upsert\":\"upsertOneUnstakeEnd\",\"aggregate\":\"aggregateUnstakeEnd\",\"groupBy\":\"groupByUnstakeEnd\"},{\"model\":\"UnstakeStop\",\"plural\":\"unstakeStops\",\"findUnique\":\"findUniqueUnstakeStop\",\"findUniqueOrThrow\":\"findUniqueUnstakeStopOrThrow\",\"findFirst\":\"findFirstUnstakeStop\",\"findFirstOrThrow\":\"findFirstUnstakeStopOrThrow\",\"findMany\":\"findManyUnstakeStop\",\"create\":\"createOneUnstakeStop\",\"delete\":\"deleteOneUnstakeStop\",\"update\":\"updateOneUnstakeStop\",\"deleteMany\":\"deleteManyUnstakeStop\",\"updateMany\":\"updateManyUnstakeStop\",\"upsert\":\"upsertOneUnstakeStop\",\"aggregate\":\"aggregateUnstakeStop\",\"groupBy\":\"groupByUnstakeStop\"},{\"model\":\"UnstakeInit\",\"plural\":\"unstakeInits\",\"findUnique\":\"findUniqueUnstakeInit\",\"findUniqueOrThrow\":\"findUniqueUnstakeInitOrThrow\",\"findFirst\":\"findFirstUnstakeInit\",\"findFirstOrThrow\":\"findFirstUnstakeInitOrThrow\",\"findMany\":\"findManyUnstakeInit\",\"create\":\"createOneUnstakeInit\",\"delete\":\"deleteOneUnstakeInit\",\"update\":\"updateOneUnstakeInit\",\"deleteMany\":\"deleteManyUnstakeInit\",\"updateMany\":\"updateManyUnstakeInit\",\"upsert\":\"upsertOneUnstakeInit\",\"aggregate\":\"aggregateUnstakeInit\",\"groupBy\":\"groupByUnstakeInit\"},{\"model\":\"UnstakeDeleg\",\"plural\":\"unstakeDelegs\",\"findUnique\":\"findUniqueUnstakeDeleg\",\"findUniqueOrThrow\":\"findUniqueUnstakeDelegOrThrow\",\"findFirst\":\"findFirstUnstakeDeleg\",\"findFirstOrThrow\":\"findFirstUnstakeDelegOrThrow\",\"findMany\":\"findManyUnstakeDeleg\",\"create\":\"createOneUnstakeDeleg\",\"delete\":\"deleteOneUnstakeDeleg\",\"update\":\"updateOneUnstakeDeleg\",\"deleteMany\":\"deleteManyUnstakeDeleg\",\"updateMany\":\"updateManyUnstakeDeleg\",\"upsert\":\"upsertOneUnstakeDeleg\",\"aggregate\":\"aggregateUnstakeDeleg\",\"groupBy\":\"groupByUnstakeDeleg\"},{\"model\":\"Withdraw\",\"plural\":\"withdraws\",\"findUnique\":\"findUniqueWithdraw\",\"findUniqueOrThrow\":\"findUniqueWithdrawOrThrow\",\"findFirst\":\"findFirstWithdraw\",\"findFirstOrThrow\":\"findFirstWithdrawOrThrow\",\"findMany\":\"findManyWithdraw\",\"create\":\"createOneWithdraw\",\"delete\":\"deleteOneWithdraw\",\"update\":\"updateOneWithdraw\",\"deleteMany\":\"deleteManyWithdraw\",\"updateMany\":\"updateManyWithdraw\",\"upsert\":\"upsertOneWithdraw\",\"aggregate\":\"aggregateWithdraw\",\"groupBy\":\"groupByWithdraw\"}],\"otherOperations\":{\"read\":[],\"write\":[\"executeRaw\",\"queryRaw\"]}}}"
const dmmf = JSON.parse(dmmfString)
exports.Prisma.dmmf = JSON.parse(dmmfString)

/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "C:\\Users\\johnd\\Dev\\boid-worker\\prisma\\client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [],
    "previewFeatures": [],
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": "..\\..\\.env",
    "schemaEnvPath": "..\\..\\.env"
  },
  "relativePath": "..",
  "clientVersion": "4.8.0",
  "engineVersion": "d6e67a83f971b175a593ccc12e15c4a757f93ffe",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "sqlite",
  "dataProxy": false
}
config.document = dmmf
config.dirname = dirname




const { warnEnvConflicts } = require('./runtime/index')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

path.join(__dirname, "query_engine-windows.dll.node");
path.join(process.cwd(), "prisma\\client\\query_engine-windows.dll.node")
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "prisma\\client\\schema.prisma")
