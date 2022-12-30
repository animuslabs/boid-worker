
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum
} = require('./runtime/index-browser')


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

Prisma.PrismaClientKnownRequestError = () => {
  throw new Error(`PrismaClientKnownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  throw new Error(`PrismaClientUnknownRequestError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientRustPanicError = () => {
  throw new Error(`PrismaClientRustPanicError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientInitializationError = () => {
  throw new Error(`PrismaClientInitializationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.PrismaClientValidationError = () => {
  throw new Error(`PrismaClientValidationError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.NotFoundError = () => {
  throw new Error(`NotFoundError is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  throw new Error(`sqltag is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.empty = () => {
  throw new Error(`empty is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.join = () => {
  throw new Error(`join is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
Prisma.raw = () => {
  throw new Error(`raw is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
)}
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

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  Serializable: 'Serializable'
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
  PwrModRm: 'PwrModRm'
});

/**
 * Create the Client
 */
class PrismaClient {
  constructor() {
    throw new Error(
      `PrismaClient is unable to be run in the browser.
In case this error is unexpected for you, please report it in https://github.com/prisma/prisma/issues`,
    )
  }
}
exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
