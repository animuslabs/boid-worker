
/**
 * Client
**/

import * as runtime from './runtime/index';
declare const prisma: unique symbol
export type PrismaPromise<A> = Promise<A> & {[prisma]: true}
type UnwrapPromise<P extends any> = P extends Promise<infer R> ? R : P
type UnwrapTuple<Tuple extends readonly unknown[]> = {
  [K in keyof Tuple]: K extends `${number}` ? Tuple[K] extends PrismaPromise<infer X> ? X : UnwrapPromise<Tuple[K]> : UnwrapPromise<Tuple[K]>
};


/**
 * Model FahData
 * 
 */
export type FahData = {
  id: string
  time: Date
  fahid: bigint
  name: string
  score: bigint
  wus: bigint
}

/**
 * Model BoidAccount
 * 
 */
export type BoidAccount = {
  boidId: string
}

/**
 * Model AccountAdd
 * 
 */
export type AccountAdd = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  sponsor: string | null
  owner: string | null
  key: string | null
}

/**
 * Model AccountBuy
 * 
 */
export type AccountBuy = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  payer_boid_id: string
  boid_id: string
  key: string | null
  owner: string | null
}

/**
 * Model AccountEdit
 * 
 */
export type AccountEdit = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  ipfs_meta: string
}

/**
 * Model AccountFree
 * 
 */
export type AccountFree = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
}

/**
 * Model AuthAddKey
 * 
 */
export type AuthAddKey = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  key: string
}

/**
 * Model AuthRmKey
 * 
 */
export type AuthRmKey = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  keyIndex: number
}

/**
 * Model InternalXfer
 * 
 */
export type InternalXfer = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  from_boid_id: string
  to_boid_id: string
  quantity: number
  memo: string | null
}

/**
 * Model InviteAdd
 * 
 */
export type InviteAdd = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  invite_code: string
  key: string
}

/**
 * Model InviteClaim
 * 
 */
export type InviteClaim = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  sponsor_boid_id: string
  invite_code: string
  sig: string
  create_boid_id: string
  create_key: string | null
  create_owner: string | null
}

/**
 * Model InviteRm
 * 
 */
export type InviteRm = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  sponsor_boid_id: string
  invite_code: string
}

/**
 * Model LogPwrAdd
 * 
 */
export type LogPwrAdd = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  received: number
  from_mult_mods: number
  diverted_to_sponsor: number
  power_increased: number
  orign: string
}

/**
 * Model LogPwrClaim
 * 
 */
export type LogPwrClaim = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  power_before: number
  power_after: number
  power_from_mods: number
  power_decayed: number
  power_rounds: number
  mint_account: number
  mint_team: number
  mint_team_owner: number
  mint_overstake: number
  mint_fundstake: number
  mint_total: number
}

/**
 * Model NftLock
 * 
 */
export type NftLock = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  asset_id: string
  locked_until_round: number
}

/**
 * Model NftWithdraw
 * 
 */
export type NftWithdraw = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  asset_ids: string
  to: string
}

/**
 * Model NftXfer
 * 
 */
export type NftXfer = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  from_boid_id: string
  to_boid_id: string
  asset_ids: string
}

/**
 * Model OfferClaim
 * 
 */
export type OfferClaim = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  offer_id: string
  required_nft_action_ids: string
}

/**
 * Model OwnerAdd
 * 
 */
export type OwnerAdd = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  owner: string
}

/**
 * Model OwnerRm
 * 
 */
export type OwnerRm = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  owner: string
}

/**
 * Model PwrModAdd
 * 
 */
export type PwrModAdd = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  mod_id: number
}

/**
 * Model PwrModRm
 * 
 */
export type PwrModRm = {
  sequence: bigint
  trxId: string
  timeStamp: Date
  boid_id: string
  pwrmod_index: number
}


/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more FahData
 * const fahData = await prisma.fahData.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<T['log']> : never : never,
  GlobalReject extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined = 'rejectOnNotFound' extends keyof T
    ? T['rejectOnNotFound']
    : false
      > {
    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more FahData
   * const fahData = await prisma.fahData.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<T, Prisma.PrismaClientOptions>);
  $on<V extends (U | 'beforeExit')>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : V extends 'beforeExit' ? () => Promise<void> : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<void>;

  /**
   * Add a middleware
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): PrismaPromise<T>;

  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): Promise<UnwrapTuple<P>>;

  $transaction<R>(fn: (prisma: Prisma.TransactionClient) => Promise<R>, options?: {maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel}): Promise<R>;

      /**
   * `prisma.fahData`: Exposes CRUD operations for the **FahData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FahData
    * const fahData = await prisma.fahData.findMany()
    * ```
    */
  get fahData(): Prisma.FahDataDelegate<GlobalReject>;

  /**
   * `prisma.boidAccount`: Exposes CRUD operations for the **BoidAccount** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BoidAccounts
    * const boidAccounts = await prisma.boidAccount.findMany()
    * ```
    */
  get boidAccount(): Prisma.BoidAccountDelegate<GlobalReject>;

  /**
   * `prisma.accountAdd`: Exposes CRUD operations for the **AccountAdd** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountAdds
    * const accountAdds = await prisma.accountAdd.findMany()
    * ```
    */
  get accountAdd(): Prisma.AccountAddDelegate<GlobalReject>;

  /**
   * `prisma.accountBuy`: Exposes CRUD operations for the **AccountBuy** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountBuys
    * const accountBuys = await prisma.accountBuy.findMany()
    * ```
    */
  get accountBuy(): Prisma.AccountBuyDelegate<GlobalReject>;

  /**
   * `prisma.accountEdit`: Exposes CRUD operations for the **AccountEdit** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountEdits
    * const accountEdits = await prisma.accountEdit.findMany()
    * ```
    */
  get accountEdit(): Prisma.AccountEditDelegate<GlobalReject>;

  /**
   * `prisma.accountFree`: Exposes CRUD operations for the **AccountFree** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AccountFrees
    * const accountFrees = await prisma.accountFree.findMany()
    * ```
    */
  get accountFree(): Prisma.AccountFreeDelegate<GlobalReject>;

  /**
   * `prisma.authAddKey`: Exposes CRUD operations for the **AuthAddKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthAddKeys
    * const authAddKeys = await prisma.authAddKey.findMany()
    * ```
    */
  get authAddKey(): Prisma.AuthAddKeyDelegate<GlobalReject>;

  /**
   * `prisma.authRmKey`: Exposes CRUD operations for the **AuthRmKey** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AuthRmKeys
    * const authRmKeys = await prisma.authRmKey.findMany()
    * ```
    */
  get authRmKey(): Prisma.AuthRmKeyDelegate<GlobalReject>;

  /**
   * `prisma.internalXfer`: Exposes CRUD operations for the **InternalXfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InternalXfers
    * const internalXfers = await prisma.internalXfer.findMany()
    * ```
    */
  get internalXfer(): Prisma.InternalXferDelegate<GlobalReject>;

  /**
   * `prisma.inviteAdd`: Exposes CRUD operations for the **InviteAdd** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InviteAdds
    * const inviteAdds = await prisma.inviteAdd.findMany()
    * ```
    */
  get inviteAdd(): Prisma.InviteAddDelegate<GlobalReject>;

  /**
   * `prisma.inviteClaim`: Exposes CRUD operations for the **InviteClaim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InviteClaims
    * const inviteClaims = await prisma.inviteClaim.findMany()
    * ```
    */
  get inviteClaim(): Prisma.InviteClaimDelegate<GlobalReject>;

  /**
   * `prisma.inviteRm`: Exposes CRUD operations for the **InviteRm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InviteRms
    * const inviteRms = await prisma.inviteRm.findMany()
    * ```
    */
  get inviteRm(): Prisma.InviteRmDelegate<GlobalReject>;

  /**
   * `prisma.logPwrAdd`: Exposes CRUD operations for the **LogPwrAdd** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LogPwrAdds
    * const logPwrAdds = await prisma.logPwrAdd.findMany()
    * ```
    */
  get logPwrAdd(): Prisma.LogPwrAddDelegate<GlobalReject>;

  /**
   * `prisma.logPwrClaim`: Exposes CRUD operations for the **LogPwrClaim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more LogPwrClaims
    * const logPwrClaims = await prisma.logPwrClaim.findMany()
    * ```
    */
  get logPwrClaim(): Prisma.LogPwrClaimDelegate<GlobalReject>;

  /**
   * `prisma.nftLock`: Exposes CRUD operations for the **NftLock** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NftLocks
    * const nftLocks = await prisma.nftLock.findMany()
    * ```
    */
  get nftLock(): Prisma.NftLockDelegate<GlobalReject>;

  /**
   * `prisma.nftWithdraw`: Exposes CRUD operations for the **NftWithdraw** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NftWithdraws
    * const nftWithdraws = await prisma.nftWithdraw.findMany()
    * ```
    */
  get nftWithdraw(): Prisma.NftWithdrawDelegate<GlobalReject>;

  /**
   * `prisma.nftXfer`: Exposes CRUD operations for the **NftXfer** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NftXfers
    * const nftXfers = await prisma.nftXfer.findMany()
    * ```
    */
  get nftXfer(): Prisma.NftXferDelegate<GlobalReject>;

  /**
   * `prisma.offerClaim`: Exposes CRUD operations for the **OfferClaim** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OfferClaims
    * const offerClaims = await prisma.offerClaim.findMany()
    * ```
    */
  get offerClaim(): Prisma.OfferClaimDelegate<GlobalReject>;

  /**
   * `prisma.ownerAdd`: Exposes CRUD operations for the **OwnerAdd** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OwnerAdds
    * const ownerAdds = await prisma.ownerAdd.findMany()
    * ```
    */
  get ownerAdd(): Prisma.OwnerAddDelegate<GlobalReject>;

  /**
   * `prisma.ownerRm`: Exposes CRUD operations for the **OwnerRm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more OwnerRms
    * const ownerRms = await prisma.ownerRm.findMany()
    * ```
    */
  get ownerRm(): Prisma.OwnerRmDelegate<GlobalReject>;

  /**
   * `prisma.pwrModAdd`: Exposes CRUD operations for the **PwrModAdd** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PwrModAdds
    * const pwrModAdds = await prisma.pwrModAdd.findMany()
    * ```
    */
  get pwrModAdd(): Prisma.PwrModAddDelegate<GlobalReject>;

  /**
   * `prisma.pwrModRm`: Exposes CRUD operations for the **PwrModRm** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PwrModRms
    * const pwrModRms = await prisma.pwrModRm.findMany()
    * ```
    */
  get pwrModRm(): Prisma.PwrModRmDelegate<GlobalReject>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql

  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket


  /**
   * Prisma Client JS version: 4.8.0
   * Query Engine version: d6e67a83f971b175a593ccc12e15c4a757f93ffe
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON object.
   * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
   */
  export type JsonObject = {[Key in string]?: JsonValue}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches a JSON array.
   */
  export interface JsonArray extends Array<JsonValue> {}

  /**
   * From https://github.com/sindresorhus/type-fest/
   * Matches any valid JSON value.
   */
  export type JsonValue = string | number | boolean | JsonObject | JsonArray | null

  /**
   * Matches a JSON object.
   * Unlike `JsonObject`, this type allows undefined and read-only properties.
   */
  export type InputJsonObject = {readonly [Key in string]?: InputJsonValue | null}

  /**
   * Matches a JSON array.
   * Unlike `JsonArray`, readonly arrays are assignable to this type.
   */
  export interface InputJsonArray extends ReadonlyArray<InputJsonValue | null> {}

  /**
   * Matches any valid value that can be used as an input for operations like
   * create and update as the value of a JSON field. Unlike `JsonValue`, this
   * type allows read-only arrays and read-only object properties and disallows
   * `null` at the top level.
   *
   * `null` cannot be used as the value of a JSON field because its meaning
   * would be ambiguous. Use `Prisma.JsonNull` to store the JSON null value or
   * `Prisma.DbNull` to clear the JSON value and set the field to the database
   * NULL value instead.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-by-null-values
   */
  export type InputJsonValue = string | number | boolean | InputJsonObject | InputJsonArray

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }
  type HasSelect = {
    select: any
  }
  type HasInclude = {
    include: any
  }
  type CheckSelect<T, S, U> = T extends SelectAndInclude
    ? 'Please either choose `select` or `include`'
    : T extends HasSelect
    ? U
    : T extends HasInclude
    ? U
    : S

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Exact<A, W = unknown> = 
  W extends unknown ? A extends Narrowable ? Cast<A, W> : Cast<
  {[K in keyof A]: K extends keyof W ? Exact<A[K], W[K]> : never},
  {[K in keyof W]: K extends keyof A ? Exact<A[K], W[K]> : W[K]}>
  : never;

  type Narrowable = string | number | boolean | bigint;

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;

  export function validator<V>(): <S>(select: Exact<S, V>) => S;

  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but with an array
   */
  type PickArray<T, K extends Array<keyof T>> = Prisma__Pick<T, TupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>

  class PrismaClientFetcher {
    private readonly prisma;
    private readonly debug;
    private readonly hooks?;
    constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
    request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
    sanitizeMessage(message: string): string;
    protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
  }

  export const ModelName: {
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
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  export type DefaultPrismaClient = PrismaClient
  export type RejectOnNotFound = boolean | ((error: Error) => Error)
  export type RejectPerModel = { [P in ModelName]?: RejectOnNotFound }
  export type RejectPerOperation =  { [P in "findUnique" | "findFirst"]?: RejectPerModel | RejectOnNotFound } 
  type IsReject<T> = T extends true ? True : T extends (err: Error) => Error ? True : False
  export type HasReject<
    GlobalRejectSettings extends Prisma.PrismaClientOptions['rejectOnNotFound'],
    LocalRejectSettings,
    Action extends PrismaAction,
    Model extends ModelName
  > = LocalRejectSettings extends RejectOnNotFound
    ? IsReject<LocalRejectSettings>
    : GlobalRejectSettings extends RejectPerOperation
    ? Action extends keyof GlobalRejectSettings
      ? GlobalRejectSettings[Action] extends RejectOnNotFound
        ? IsReject<GlobalRejectSettings[Action]>
        : GlobalRejectSettings[Action] extends RejectPerModel
        ? Model extends keyof GlobalRejectSettings[Action]
          ? IsReject<GlobalRejectSettings[Action][Model]>
          : False
        : False
      : False
    : IsReject<GlobalRejectSettings>
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

  export interface PrismaClientOptions {
    /**
     * Configure findUnique/findFirst to throw an error if the query returns null. 
     * @deprecated since 4.0.0. Use `findUniqueOrThrow`/`findFirstOrThrow` methods instead.
     * @example
     * ```
     * // Reject on both findUnique/findFirst
     * rejectOnNotFound: true
     * // Reject only on findFirst with a custom error
     * rejectOnNotFound: { findFirst: (err) => new Error("Custom Error")}
     * // Reject on user.findUnique with a custom error
     * rejectOnNotFound: { findUnique: {User: (err) => new Error("User not found")}}
     * ```
     */
    rejectOnNotFound?: RejectOnNotFound | RejectPerOperation
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources

    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat

    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: Array<LogLevel | LogDefinition>
  }

  export type Hooks = {
    beforeRequest?: (options: { query: string, path: string[], rootField?: string, typeName?: string, document: any }) => any
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findMany'
    | 'findFirst'
    | 'create'
    | 'createMany'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => Promise<T>,
  ) => Promise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use'>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model FahData
   */


  export type AggregateFahData = {
    _count: FahDataCountAggregateOutputType | null
    _avg: FahDataAvgAggregateOutputType | null
    _sum: FahDataSumAggregateOutputType | null
    _min: FahDataMinAggregateOutputType | null
    _max: FahDataMaxAggregateOutputType | null
  }

  export type FahDataAvgAggregateOutputType = {
    fahid: number | null
    score: number | null
    wus: number | null
  }

  export type FahDataSumAggregateOutputType = {
    fahid: bigint | null
    score: bigint | null
    wus: bigint | null
  }

  export type FahDataMinAggregateOutputType = {
    id: string | null
    time: Date | null
    fahid: bigint | null
    name: string | null
    score: bigint | null
    wus: bigint | null
  }

  export type FahDataMaxAggregateOutputType = {
    id: string | null
    time: Date | null
    fahid: bigint | null
    name: string | null
    score: bigint | null
    wus: bigint | null
  }

  export type FahDataCountAggregateOutputType = {
    id: number
    time: number
    fahid: number
    name: number
    score: number
    wus: number
    _all: number
  }


  export type FahDataAvgAggregateInputType = {
    fahid?: true
    score?: true
    wus?: true
  }

  export type FahDataSumAggregateInputType = {
    fahid?: true
    score?: true
    wus?: true
  }

  export type FahDataMinAggregateInputType = {
    id?: true
    time?: true
    fahid?: true
    name?: true
    score?: true
    wus?: true
  }

  export type FahDataMaxAggregateInputType = {
    id?: true
    time?: true
    fahid?: true
    name?: true
    score?: true
    wus?: true
  }

  export type FahDataCountAggregateInputType = {
    id?: true
    time?: true
    fahid?: true
    name?: true
    score?: true
    wus?: true
    _all?: true
  }

  export type FahDataAggregateArgs = {
    /**
     * Filter which FahData to aggregate.
     * 
    **/
    where?: FahDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FahData to fetch.
     * 
    **/
    orderBy?: Enumerable<FahDataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: FahDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FahData from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FahData.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FahData
    **/
    _count?: true | FahDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: FahDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: FahDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FahDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FahDataMaxAggregateInputType
  }

  export type GetFahDataAggregateType<T extends FahDataAggregateArgs> = {
        [P in keyof T & keyof AggregateFahData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFahData[P]>
      : GetScalarType<T[P], AggregateFahData[P]>
  }




  export type FahDataGroupByArgs = {
    where?: FahDataWhereInput
    orderBy?: Enumerable<FahDataOrderByWithAggregationInput>
    by: Array<FahDataScalarFieldEnum>
    having?: FahDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FahDataCountAggregateInputType | true
    _avg?: FahDataAvgAggregateInputType
    _sum?: FahDataSumAggregateInputType
    _min?: FahDataMinAggregateInputType
    _max?: FahDataMaxAggregateInputType
  }


  export type FahDataGroupByOutputType = {
    id: string
    time: Date
    fahid: bigint
    name: string
    score: bigint
    wus: bigint
    _count: FahDataCountAggregateOutputType | null
    _avg: FahDataAvgAggregateOutputType | null
    _sum: FahDataSumAggregateOutputType | null
    _min: FahDataMinAggregateOutputType | null
    _max: FahDataMaxAggregateOutputType | null
  }

  type GetFahDataGroupByPayload<T extends FahDataGroupByArgs> = PrismaPromise<
    Array<
      PickArray<FahDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FahDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FahDataGroupByOutputType[P]>
            : GetScalarType<T[P], FahDataGroupByOutputType[P]>
        }
      >
    >


  export type FahDataSelect = {
    id?: boolean
    time?: boolean
    fahid?: boolean
    name?: boolean
    score?: boolean
    wus?: boolean
  }


  export type FahDataGetPayload<S extends boolean | null | undefined | FahDataArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? FahData :
    S extends undefined ? never :
    S extends { include: any } & (FahDataArgs | FahDataFindManyArgs)
    ? FahData 
    : S extends { select: any } & (FahDataArgs | FahDataFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof FahData ? FahData[P] : never
  } 
      : FahData


  type FahDataCountArgs = Merge<
    Omit<FahDataFindManyArgs, 'select' | 'include'> & {
      select?: FahDataCountAggregateInputType | true
    }
  >

  export interface FahDataDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one FahData that matches the filter.
     * @param {FahDataFindUniqueArgs} args - Arguments to find a FahData
     * @example
     * // Get one FahData
     * const fahData = await prisma.fahData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends FahDataFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, FahDataFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'FahData'> extends True ? Prisma__FahDataClient<FahDataGetPayload<T>> : Prisma__FahDataClient<FahDataGetPayload<T> | null, null>

    /**
     * Find one FahData that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {FahDataFindUniqueOrThrowArgs} args - Arguments to find a FahData
     * @example
     * // Get one FahData
     * const fahData = await prisma.fahData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends FahDataFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, FahDataFindUniqueOrThrowArgs>
    ): Prisma__FahDataClient<FahDataGetPayload<T>>

    /**
     * Find the first FahData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FahDataFindFirstArgs} args - Arguments to find a FahData
     * @example
     * // Get one FahData
     * const fahData = await prisma.fahData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends FahDataFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, FahDataFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'FahData'> extends True ? Prisma__FahDataClient<FahDataGetPayload<T>> : Prisma__FahDataClient<FahDataGetPayload<T> | null, null>

    /**
     * Find the first FahData that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FahDataFindFirstOrThrowArgs} args - Arguments to find a FahData
     * @example
     * // Get one FahData
     * const fahData = await prisma.fahData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends FahDataFindFirstOrThrowArgs>(
      args?: SelectSubset<T, FahDataFindFirstOrThrowArgs>
    ): Prisma__FahDataClient<FahDataGetPayload<T>>

    /**
     * Find zero or more FahData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FahDataFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FahData
     * const fahData = await prisma.fahData.findMany()
     * 
     * // Get first 10 FahData
     * const fahData = await prisma.fahData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const fahDataWithIdOnly = await prisma.fahData.findMany({ select: { id: true } })
     * 
    **/
    findMany<T extends FahDataFindManyArgs>(
      args?: SelectSubset<T, FahDataFindManyArgs>
    ): PrismaPromise<Array<FahDataGetPayload<T>>>

    /**
     * Create a FahData.
     * @param {FahDataCreateArgs} args - Arguments to create a FahData.
     * @example
     * // Create one FahData
     * const FahData = await prisma.fahData.create({
     *   data: {
     *     // ... data to create a FahData
     *   }
     * })
     * 
    **/
    create<T extends FahDataCreateArgs>(
      args: SelectSubset<T, FahDataCreateArgs>
    ): Prisma__FahDataClient<FahDataGetPayload<T>>

    /**
     * Delete a FahData.
     * @param {FahDataDeleteArgs} args - Arguments to delete one FahData.
     * @example
     * // Delete one FahData
     * const FahData = await prisma.fahData.delete({
     *   where: {
     *     // ... filter to delete one FahData
     *   }
     * })
     * 
    **/
    delete<T extends FahDataDeleteArgs>(
      args: SelectSubset<T, FahDataDeleteArgs>
    ): Prisma__FahDataClient<FahDataGetPayload<T>>

    /**
     * Update one FahData.
     * @param {FahDataUpdateArgs} args - Arguments to update one FahData.
     * @example
     * // Update one FahData
     * const fahData = await prisma.fahData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends FahDataUpdateArgs>(
      args: SelectSubset<T, FahDataUpdateArgs>
    ): Prisma__FahDataClient<FahDataGetPayload<T>>

    /**
     * Delete zero or more FahData.
     * @param {FahDataDeleteManyArgs} args - Arguments to filter FahData to delete.
     * @example
     * // Delete a few FahData
     * const { count } = await prisma.fahData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends FahDataDeleteManyArgs>(
      args?: SelectSubset<T, FahDataDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more FahData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FahDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FahData
     * const fahData = await prisma.fahData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends FahDataUpdateManyArgs>(
      args: SelectSubset<T, FahDataUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one FahData.
     * @param {FahDataUpsertArgs} args - Arguments to update or create a FahData.
     * @example
     * // Update or create a FahData
     * const fahData = await prisma.fahData.upsert({
     *   create: {
     *     // ... data to create a FahData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FahData we want to update
     *   }
     * })
    **/
    upsert<T extends FahDataUpsertArgs>(
      args: SelectSubset<T, FahDataUpsertArgs>
    ): Prisma__FahDataClient<FahDataGetPayload<T>>

    /**
     * Count the number of FahData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FahDataCountArgs} args - Arguments to filter FahData to count.
     * @example
     * // Count the number of FahData
     * const count = await prisma.fahData.count({
     *   where: {
     *     // ... the filter for the FahData we want to count
     *   }
     * })
    **/
    count<T extends FahDataCountArgs>(
      args?: Subset<T, FahDataCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FahDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FahData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FahDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FahDataAggregateArgs>(args: Subset<T, FahDataAggregateArgs>): PrismaPromise<GetFahDataAggregateType<T>>

    /**
     * Group by FahData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FahDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FahDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FahDataGroupByArgs['orderBy'] }
        : { orderBy?: FahDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FahDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFahDataGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for FahData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__FahDataClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * FahData base type for findUnique actions
   */
  export type FahDataFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * Filter, which FahData to fetch.
     * 
    **/
    where: FahDataWhereUniqueInput
  }

  /**
   * FahData findUnique
   */
  export interface FahDataFindUniqueArgs extends FahDataFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FahData findUniqueOrThrow
   */
  export type FahDataFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * Filter, which FahData to fetch.
     * 
    **/
    where: FahDataWhereUniqueInput
  }


  /**
   * FahData base type for findFirst actions
   */
  export type FahDataFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * Filter, which FahData to fetch.
     * 
    **/
    where?: FahDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FahData to fetch.
     * 
    **/
    orderBy?: Enumerable<FahDataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FahData.
     * 
    **/
    cursor?: FahDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FahData from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FahData.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FahData.
     * 
    **/
    distinct?: Enumerable<FahDataScalarFieldEnum>
  }

  /**
   * FahData findFirst
   */
  export interface FahDataFindFirstArgs extends FahDataFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * FahData findFirstOrThrow
   */
  export type FahDataFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * Filter, which FahData to fetch.
     * 
    **/
    where?: FahDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FahData to fetch.
     * 
    **/
    orderBy?: Enumerable<FahDataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FahData.
     * 
    **/
    cursor?: FahDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FahData from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FahData.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FahData.
     * 
    **/
    distinct?: Enumerable<FahDataScalarFieldEnum>
  }


  /**
   * FahData findMany
   */
  export type FahDataFindManyArgs = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * Filter, which FahData to fetch.
     * 
    **/
    where?: FahDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FahData to fetch.
     * 
    **/
    orderBy?: Enumerable<FahDataOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FahData.
     * 
    **/
    cursor?: FahDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FahData from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FahData.
     * 
    **/
    skip?: number
    distinct?: Enumerable<FahDataScalarFieldEnum>
  }


  /**
   * FahData create
   */
  export type FahDataCreateArgs = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * The data needed to create a FahData.
     * 
    **/
    data: XOR<FahDataCreateInput, FahDataUncheckedCreateInput>
  }


  /**
   * FahData update
   */
  export type FahDataUpdateArgs = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * The data needed to update a FahData.
     * 
    **/
    data: XOR<FahDataUpdateInput, FahDataUncheckedUpdateInput>
    /**
     * Choose, which FahData to update.
     * 
    **/
    where: FahDataWhereUniqueInput
  }


  /**
   * FahData updateMany
   */
  export type FahDataUpdateManyArgs = {
    /**
     * The data used to update FahData.
     * 
    **/
    data: XOR<FahDataUpdateManyMutationInput, FahDataUncheckedUpdateManyInput>
    /**
     * Filter which FahData to update
     * 
    **/
    where?: FahDataWhereInput
  }


  /**
   * FahData upsert
   */
  export type FahDataUpsertArgs = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * The filter to search for the FahData to update in case it exists.
     * 
    **/
    where: FahDataWhereUniqueInput
    /**
     * In case the FahData found by the `where` argument doesn't exist, create a new FahData with this data.
     * 
    **/
    create: XOR<FahDataCreateInput, FahDataUncheckedCreateInput>
    /**
     * In case the FahData was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<FahDataUpdateInput, FahDataUncheckedUpdateInput>
  }


  /**
   * FahData delete
   */
  export type FahDataDeleteArgs = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
    /**
     * Filter which FahData to delete.
     * 
    **/
    where: FahDataWhereUniqueInput
  }


  /**
   * FahData deleteMany
   */
  export type FahDataDeleteManyArgs = {
    /**
     * Filter which FahData to delete
     * 
    **/
    where?: FahDataWhereInput
  }


  /**
   * FahData without action
   */
  export type FahDataArgs = {
    /**
     * Select specific fields to fetch from the FahData
     * 
    **/
    select?: FahDataSelect | null
  }



  /**
   * Model BoidAccount
   */


  export type AggregateBoidAccount = {
    _count: BoidAccountCountAggregateOutputType | null
    _min: BoidAccountMinAggregateOutputType | null
    _max: BoidAccountMaxAggregateOutputType | null
  }

  export type BoidAccountMinAggregateOutputType = {
    boidId: string | null
  }

  export type BoidAccountMaxAggregateOutputType = {
    boidId: string | null
  }

  export type BoidAccountCountAggregateOutputType = {
    boidId: number
    _all: number
  }


  export type BoidAccountMinAggregateInputType = {
    boidId?: true
  }

  export type BoidAccountMaxAggregateInputType = {
    boidId?: true
  }

  export type BoidAccountCountAggregateInputType = {
    boidId?: true
    _all?: true
  }

  export type BoidAccountAggregateArgs = {
    /**
     * Filter which BoidAccount to aggregate.
     * 
    **/
    where?: BoidAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoidAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<BoidAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: BoidAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoidAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoidAccounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BoidAccounts
    **/
    _count?: true | BoidAccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BoidAccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BoidAccountMaxAggregateInputType
  }

  export type GetBoidAccountAggregateType<T extends BoidAccountAggregateArgs> = {
        [P in keyof T & keyof AggregateBoidAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBoidAccount[P]>
      : GetScalarType<T[P], AggregateBoidAccount[P]>
  }




  export type BoidAccountGroupByArgs = {
    where?: BoidAccountWhereInput
    orderBy?: Enumerable<BoidAccountOrderByWithAggregationInput>
    by: Array<BoidAccountScalarFieldEnum>
    having?: BoidAccountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BoidAccountCountAggregateInputType | true
    _min?: BoidAccountMinAggregateInputType
    _max?: BoidAccountMaxAggregateInputType
  }


  export type BoidAccountGroupByOutputType = {
    boidId: string
    _count: BoidAccountCountAggregateOutputType | null
    _min: BoidAccountMinAggregateOutputType | null
    _max: BoidAccountMaxAggregateOutputType | null
  }

  type GetBoidAccountGroupByPayload<T extends BoidAccountGroupByArgs> = PrismaPromise<
    Array<
      PickArray<BoidAccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BoidAccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BoidAccountGroupByOutputType[P]>
            : GetScalarType<T[P], BoidAccountGroupByOutputType[P]>
        }
      >
    >


  export type BoidAccountSelect = {
    boidId?: boolean
  }


  export type BoidAccountGetPayload<S extends boolean | null | undefined | BoidAccountArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? BoidAccount :
    S extends undefined ? never :
    S extends { include: any } & (BoidAccountArgs | BoidAccountFindManyArgs)
    ? BoidAccount 
    : S extends { select: any } & (BoidAccountArgs | BoidAccountFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof BoidAccount ? BoidAccount[P] : never
  } 
      : BoidAccount


  type BoidAccountCountArgs = Merge<
    Omit<BoidAccountFindManyArgs, 'select' | 'include'> & {
      select?: BoidAccountCountAggregateInputType | true
    }
  >

  export interface BoidAccountDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one BoidAccount that matches the filter.
     * @param {BoidAccountFindUniqueArgs} args - Arguments to find a BoidAccount
     * @example
     * // Get one BoidAccount
     * const boidAccount = await prisma.boidAccount.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends BoidAccountFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, BoidAccountFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'BoidAccount'> extends True ? Prisma__BoidAccountClient<BoidAccountGetPayload<T>> : Prisma__BoidAccountClient<BoidAccountGetPayload<T> | null, null>

    /**
     * Find one BoidAccount that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {BoidAccountFindUniqueOrThrowArgs} args - Arguments to find a BoidAccount
     * @example
     * // Get one BoidAccount
     * const boidAccount = await prisma.boidAccount.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends BoidAccountFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, BoidAccountFindUniqueOrThrowArgs>
    ): Prisma__BoidAccountClient<BoidAccountGetPayload<T>>

    /**
     * Find the first BoidAccount that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoidAccountFindFirstArgs} args - Arguments to find a BoidAccount
     * @example
     * // Get one BoidAccount
     * const boidAccount = await prisma.boidAccount.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends BoidAccountFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, BoidAccountFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'BoidAccount'> extends True ? Prisma__BoidAccountClient<BoidAccountGetPayload<T>> : Prisma__BoidAccountClient<BoidAccountGetPayload<T> | null, null>

    /**
     * Find the first BoidAccount that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoidAccountFindFirstOrThrowArgs} args - Arguments to find a BoidAccount
     * @example
     * // Get one BoidAccount
     * const boidAccount = await prisma.boidAccount.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends BoidAccountFindFirstOrThrowArgs>(
      args?: SelectSubset<T, BoidAccountFindFirstOrThrowArgs>
    ): Prisma__BoidAccountClient<BoidAccountGetPayload<T>>

    /**
     * Find zero or more BoidAccounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoidAccountFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BoidAccounts
     * const boidAccounts = await prisma.boidAccount.findMany()
     * 
     * // Get first 10 BoidAccounts
     * const boidAccounts = await prisma.boidAccount.findMany({ take: 10 })
     * 
     * // Only select the `boidId`
     * const boidAccountWithBoidIdOnly = await prisma.boidAccount.findMany({ select: { boidId: true } })
     * 
    **/
    findMany<T extends BoidAccountFindManyArgs>(
      args?: SelectSubset<T, BoidAccountFindManyArgs>
    ): PrismaPromise<Array<BoidAccountGetPayload<T>>>

    /**
     * Create a BoidAccount.
     * @param {BoidAccountCreateArgs} args - Arguments to create a BoidAccount.
     * @example
     * // Create one BoidAccount
     * const BoidAccount = await prisma.boidAccount.create({
     *   data: {
     *     // ... data to create a BoidAccount
     *   }
     * })
     * 
    **/
    create<T extends BoidAccountCreateArgs>(
      args: SelectSubset<T, BoidAccountCreateArgs>
    ): Prisma__BoidAccountClient<BoidAccountGetPayload<T>>

    /**
     * Delete a BoidAccount.
     * @param {BoidAccountDeleteArgs} args - Arguments to delete one BoidAccount.
     * @example
     * // Delete one BoidAccount
     * const BoidAccount = await prisma.boidAccount.delete({
     *   where: {
     *     // ... filter to delete one BoidAccount
     *   }
     * })
     * 
    **/
    delete<T extends BoidAccountDeleteArgs>(
      args: SelectSubset<T, BoidAccountDeleteArgs>
    ): Prisma__BoidAccountClient<BoidAccountGetPayload<T>>

    /**
     * Update one BoidAccount.
     * @param {BoidAccountUpdateArgs} args - Arguments to update one BoidAccount.
     * @example
     * // Update one BoidAccount
     * const boidAccount = await prisma.boidAccount.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends BoidAccountUpdateArgs>(
      args: SelectSubset<T, BoidAccountUpdateArgs>
    ): Prisma__BoidAccountClient<BoidAccountGetPayload<T>>

    /**
     * Delete zero or more BoidAccounts.
     * @param {BoidAccountDeleteManyArgs} args - Arguments to filter BoidAccounts to delete.
     * @example
     * // Delete a few BoidAccounts
     * const { count } = await prisma.boidAccount.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends BoidAccountDeleteManyArgs>(
      args?: SelectSubset<T, BoidAccountDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more BoidAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoidAccountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BoidAccounts
     * const boidAccount = await prisma.boidAccount.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends BoidAccountUpdateManyArgs>(
      args: SelectSubset<T, BoidAccountUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one BoidAccount.
     * @param {BoidAccountUpsertArgs} args - Arguments to update or create a BoidAccount.
     * @example
     * // Update or create a BoidAccount
     * const boidAccount = await prisma.boidAccount.upsert({
     *   create: {
     *     // ... data to create a BoidAccount
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BoidAccount we want to update
     *   }
     * })
    **/
    upsert<T extends BoidAccountUpsertArgs>(
      args: SelectSubset<T, BoidAccountUpsertArgs>
    ): Prisma__BoidAccountClient<BoidAccountGetPayload<T>>

    /**
     * Count the number of BoidAccounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoidAccountCountArgs} args - Arguments to filter BoidAccounts to count.
     * @example
     * // Count the number of BoidAccounts
     * const count = await prisma.boidAccount.count({
     *   where: {
     *     // ... the filter for the BoidAccounts we want to count
     *   }
     * })
    **/
    count<T extends BoidAccountCountArgs>(
      args?: Subset<T, BoidAccountCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BoidAccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BoidAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoidAccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends BoidAccountAggregateArgs>(args: Subset<T, BoidAccountAggregateArgs>): PrismaPromise<GetBoidAccountAggregateType<T>>

    /**
     * Group by BoidAccount.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BoidAccountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends BoidAccountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BoidAccountGroupByArgs['orderBy'] }
        : { orderBy?: BoidAccountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, BoidAccountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBoidAccountGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for BoidAccount.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__BoidAccountClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * BoidAccount base type for findUnique actions
   */
  export type BoidAccountFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * Filter, which BoidAccount to fetch.
     * 
    **/
    where: BoidAccountWhereUniqueInput
  }

  /**
   * BoidAccount findUnique
   */
  export interface BoidAccountFindUniqueArgs extends BoidAccountFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * BoidAccount findUniqueOrThrow
   */
  export type BoidAccountFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * Filter, which BoidAccount to fetch.
     * 
    **/
    where: BoidAccountWhereUniqueInput
  }


  /**
   * BoidAccount base type for findFirst actions
   */
  export type BoidAccountFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * Filter, which BoidAccount to fetch.
     * 
    **/
    where?: BoidAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoidAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<BoidAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BoidAccounts.
     * 
    **/
    cursor?: BoidAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoidAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoidAccounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BoidAccounts.
     * 
    **/
    distinct?: Enumerable<BoidAccountScalarFieldEnum>
  }

  /**
   * BoidAccount findFirst
   */
  export interface BoidAccountFindFirstArgs extends BoidAccountFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * BoidAccount findFirstOrThrow
   */
  export type BoidAccountFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * Filter, which BoidAccount to fetch.
     * 
    **/
    where?: BoidAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoidAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<BoidAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BoidAccounts.
     * 
    **/
    cursor?: BoidAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoidAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoidAccounts.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BoidAccounts.
     * 
    **/
    distinct?: Enumerable<BoidAccountScalarFieldEnum>
  }


  /**
   * BoidAccount findMany
   */
  export type BoidAccountFindManyArgs = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * Filter, which BoidAccounts to fetch.
     * 
    **/
    where?: BoidAccountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BoidAccounts to fetch.
     * 
    **/
    orderBy?: Enumerable<BoidAccountOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BoidAccounts.
     * 
    **/
    cursor?: BoidAccountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BoidAccounts from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BoidAccounts.
     * 
    **/
    skip?: number
    distinct?: Enumerable<BoidAccountScalarFieldEnum>
  }


  /**
   * BoidAccount create
   */
  export type BoidAccountCreateArgs = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * The data needed to create a BoidAccount.
     * 
    **/
    data: XOR<BoidAccountCreateInput, BoidAccountUncheckedCreateInput>
  }


  /**
   * BoidAccount update
   */
  export type BoidAccountUpdateArgs = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * The data needed to update a BoidAccount.
     * 
    **/
    data: XOR<BoidAccountUpdateInput, BoidAccountUncheckedUpdateInput>
    /**
     * Choose, which BoidAccount to update.
     * 
    **/
    where: BoidAccountWhereUniqueInput
  }


  /**
   * BoidAccount updateMany
   */
  export type BoidAccountUpdateManyArgs = {
    /**
     * The data used to update BoidAccounts.
     * 
    **/
    data: XOR<BoidAccountUpdateManyMutationInput, BoidAccountUncheckedUpdateManyInput>
    /**
     * Filter which BoidAccounts to update
     * 
    **/
    where?: BoidAccountWhereInput
  }


  /**
   * BoidAccount upsert
   */
  export type BoidAccountUpsertArgs = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * The filter to search for the BoidAccount to update in case it exists.
     * 
    **/
    where: BoidAccountWhereUniqueInput
    /**
     * In case the BoidAccount found by the `where` argument doesn't exist, create a new BoidAccount with this data.
     * 
    **/
    create: XOR<BoidAccountCreateInput, BoidAccountUncheckedCreateInput>
    /**
     * In case the BoidAccount was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<BoidAccountUpdateInput, BoidAccountUncheckedUpdateInput>
  }


  /**
   * BoidAccount delete
   */
  export type BoidAccountDeleteArgs = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
    /**
     * Filter which BoidAccount to delete.
     * 
    **/
    where: BoidAccountWhereUniqueInput
  }


  /**
   * BoidAccount deleteMany
   */
  export type BoidAccountDeleteManyArgs = {
    /**
     * Filter which BoidAccounts to delete
     * 
    **/
    where?: BoidAccountWhereInput
  }


  /**
   * BoidAccount without action
   */
  export type BoidAccountArgs = {
    /**
     * Select specific fields to fetch from the BoidAccount
     * 
    **/
    select?: BoidAccountSelect | null
  }



  /**
   * Model AccountAdd
   */


  export type AggregateAccountAdd = {
    _count: AccountAddCountAggregateOutputType | null
    _avg: AccountAddAvgAggregateOutputType | null
    _sum: AccountAddSumAggregateOutputType | null
    _min: AccountAddMinAggregateOutputType | null
    _max: AccountAddMaxAggregateOutputType | null
  }

  export type AccountAddAvgAggregateOutputType = {
    sequence: number | null
  }

  export type AccountAddSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type AccountAddMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    sponsor: string | null
    owner: string | null
    key: string | null
  }

  export type AccountAddMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    sponsor: string | null
    owner: string | null
    key: string | null
  }

  export type AccountAddCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    sponsor: number
    owner: number
    key: number
    _all: number
  }


  export type AccountAddAvgAggregateInputType = {
    sequence?: true
  }

  export type AccountAddSumAggregateInputType = {
    sequence?: true
  }

  export type AccountAddMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    sponsor?: true
    owner?: true
    key?: true
  }

  export type AccountAddMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    sponsor?: true
    owner?: true
    key?: true
  }

  export type AccountAddCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    sponsor?: true
    owner?: true
    key?: true
    _all?: true
  }

  export type AccountAddAggregateArgs = {
    /**
     * Filter which AccountAdd to aggregate.
     * 
    **/
    where?: AccountAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AccountAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountAdds
    **/
    _count?: true | AccountAddCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountAddAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountAddSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountAddMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountAddMaxAggregateInputType
  }

  export type GetAccountAddAggregateType<T extends AccountAddAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountAdd]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountAdd[P]>
      : GetScalarType<T[P], AggregateAccountAdd[P]>
  }




  export type AccountAddGroupByArgs = {
    where?: AccountAddWhereInput
    orderBy?: Enumerable<AccountAddOrderByWithAggregationInput>
    by: Array<AccountAddScalarFieldEnum>
    having?: AccountAddScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountAddCountAggregateInputType | true
    _avg?: AccountAddAvgAggregateInputType
    _sum?: AccountAddSumAggregateInputType
    _min?: AccountAddMinAggregateInputType
    _max?: AccountAddMaxAggregateInputType
  }


  export type AccountAddGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    sponsor: string | null
    owner: string | null
    key: string | null
    _count: AccountAddCountAggregateOutputType | null
    _avg: AccountAddAvgAggregateOutputType | null
    _sum: AccountAddSumAggregateOutputType | null
    _min: AccountAddMinAggregateOutputType | null
    _max: AccountAddMaxAggregateOutputType | null
  }

  type GetAccountAddGroupByPayload<T extends AccountAddGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccountAddGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountAddGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountAddGroupByOutputType[P]>
            : GetScalarType<T[P], AccountAddGroupByOutputType[P]>
        }
      >
    >


  export type AccountAddSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    sponsor?: boolean
    owner?: boolean
    key?: boolean
  }


  export type AccountAddGetPayload<S extends boolean | null | undefined | AccountAddArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AccountAdd :
    S extends undefined ? never :
    S extends { include: any } & (AccountAddArgs | AccountAddFindManyArgs)
    ? AccountAdd 
    : S extends { select: any } & (AccountAddArgs | AccountAddFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AccountAdd ? AccountAdd[P] : never
  } 
      : AccountAdd


  type AccountAddCountArgs = Merge<
    Omit<AccountAddFindManyArgs, 'select' | 'include'> & {
      select?: AccountAddCountAggregateInputType | true
    }
  >

  export interface AccountAddDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AccountAdd that matches the filter.
     * @param {AccountAddFindUniqueArgs} args - Arguments to find a AccountAdd
     * @example
     * // Get one AccountAdd
     * const accountAdd = await prisma.accountAdd.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountAddFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountAddFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AccountAdd'> extends True ? Prisma__AccountAddClient<AccountAddGetPayload<T>> : Prisma__AccountAddClient<AccountAddGetPayload<T> | null, null>

    /**
     * Find one AccountAdd that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccountAddFindUniqueOrThrowArgs} args - Arguments to find a AccountAdd
     * @example
     * // Get one AccountAdd
     * const accountAdd = await prisma.accountAdd.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountAddFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccountAddFindUniqueOrThrowArgs>
    ): Prisma__AccountAddClient<AccountAddGetPayload<T>>

    /**
     * Find the first AccountAdd that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAddFindFirstArgs} args - Arguments to find a AccountAdd
     * @example
     * // Get one AccountAdd
     * const accountAdd = await prisma.accountAdd.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountAddFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountAddFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AccountAdd'> extends True ? Prisma__AccountAddClient<AccountAddGetPayload<T>> : Prisma__AccountAddClient<AccountAddGetPayload<T> | null, null>

    /**
     * Find the first AccountAdd that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAddFindFirstOrThrowArgs} args - Arguments to find a AccountAdd
     * @example
     * // Get one AccountAdd
     * const accountAdd = await prisma.accountAdd.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountAddFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountAddFindFirstOrThrowArgs>
    ): Prisma__AccountAddClient<AccountAddGetPayload<T>>

    /**
     * Find zero or more AccountAdds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAddFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountAdds
     * const accountAdds = await prisma.accountAdd.findMany()
     * 
     * // Get first 10 AccountAdds
     * const accountAdds = await prisma.accountAdd.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const accountAddWithSequenceOnly = await prisma.accountAdd.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends AccountAddFindManyArgs>(
      args?: SelectSubset<T, AccountAddFindManyArgs>
    ): PrismaPromise<Array<AccountAddGetPayload<T>>>

    /**
     * Create a AccountAdd.
     * @param {AccountAddCreateArgs} args - Arguments to create a AccountAdd.
     * @example
     * // Create one AccountAdd
     * const AccountAdd = await prisma.accountAdd.create({
     *   data: {
     *     // ... data to create a AccountAdd
     *   }
     * })
     * 
    **/
    create<T extends AccountAddCreateArgs>(
      args: SelectSubset<T, AccountAddCreateArgs>
    ): Prisma__AccountAddClient<AccountAddGetPayload<T>>

    /**
     * Delete a AccountAdd.
     * @param {AccountAddDeleteArgs} args - Arguments to delete one AccountAdd.
     * @example
     * // Delete one AccountAdd
     * const AccountAdd = await prisma.accountAdd.delete({
     *   where: {
     *     // ... filter to delete one AccountAdd
     *   }
     * })
     * 
    **/
    delete<T extends AccountAddDeleteArgs>(
      args: SelectSubset<T, AccountAddDeleteArgs>
    ): Prisma__AccountAddClient<AccountAddGetPayload<T>>

    /**
     * Update one AccountAdd.
     * @param {AccountAddUpdateArgs} args - Arguments to update one AccountAdd.
     * @example
     * // Update one AccountAdd
     * const accountAdd = await prisma.accountAdd.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountAddUpdateArgs>(
      args: SelectSubset<T, AccountAddUpdateArgs>
    ): Prisma__AccountAddClient<AccountAddGetPayload<T>>

    /**
     * Delete zero or more AccountAdds.
     * @param {AccountAddDeleteManyArgs} args - Arguments to filter AccountAdds to delete.
     * @example
     * // Delete a few AccountAdds
     * const { count } = await prisma.accountAdd.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountAddDeleteManyArgs>(
      args?: SelectSubset<T, AccountAddDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAddUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountAdds
     * const accountAdd = await prisma.accountAdd.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountAddUpdateManyArgs>(
      args: SelectSubset<T, AccountAddUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AccountAdd.
     * @param {AccountAddUpsertArgs} args - Arguments to update or create a AccountAdd.
     * @example
     * // Update or create a AccountAdd
     * const accountAdd = await prisma.accountAdd.upsert({
     *   create: {
     *     // ... data to create a AccountAdd
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountAdd we want to update
     *   }
     * })
    **/
    upsert<T extends AccountAddUpsertArgs>(
      args: SelectSubset<T, AccountAddUpsertArgs>
    ): Prisma__AccountAddClient<AccountAddGetPayload<T>>

    /**
     * Count the number of AccountAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAddCountArgs} args - Arguments to filter AccountAdds to count.
     * @example
     * // Count the number of AccountAdds
     * const count = await prisma.accountAdd.count({
     *   where: {
     *     // ... the filter for the AccountAdds we want to count
     *   }
     * })
    **/
    count<T extends AccountAddCountArgs>(
      args?: Subset<T, AccountAddCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountAddCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAddAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAddAggregateArgs>(args: Subset<T, AccountAddAggregateArgs>): PrismaPromise<GetAccountAddAggregateType<T>>

    /**
     * Group by AccountAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAddGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountAddGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountAddGroupByArgs['orderBy'] }
        : { orderBy?: AccountAddGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountAddGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountAddGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountAdd.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountAddClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AccountAdd base type for findUnique actions
   */
  export type AccountAddFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * Filter, which AccountAdd to fetch.
     * 
    **/
    where: AccountAddWhereUniqueInput
  }

  /**
   * AccountAdd findUnique
   */
  export interface AccountAddFindUniqueArgs extends AccountAddFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccountAdd findUniqueOrThrow
   */
  export type AccountAddFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * Filter, which AccountAdd to fetch.
     * 
    **/
    where: AccountAddWhereUniqueInput
  }


  /**
   * AccountAdd base type for findFirst actions
   */
  export type AccountAddFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * Filter, which AccountAdd to fetch.
     * 
    **/
    where?: AccountAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountAdds.
     * 
    **/
    cursor?: AccountAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountAdds.
     * 
    **/
    distinct?: Enumerable<AccountAddScalarFieldEnum>
  }

  /**
   * AccountAdd findFirst
   */
  export interface AccountAddFindFirstArgs extends AccountAddFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccountAdd findFirstOrThrow
   */
  export type AccountAddFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * Filter, which AccountAdd to fetch.
     * 
    **/
    where?: AccountAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountAdds.
     * 
    **/
    cursor?: AccountAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountAdds.
     * 
    **/
    distinct?: Enumerable<AccountAddScalarFieldEnum>
  }


  /**
   * AccountAdd findMany
   */
  export type AccountAddFindManyArgs = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * Filter, which AccountAdds to fetch.
     * 
    **/
    where?: AccountAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountAdds.
     * 
    **/
    cursor?: AccountAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountAdds.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccountAddScalarFieldEnum>
  }


  /**
   * AccountAdd create
   */
  export type AccountAddCreateArgs = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * The data needed to create a AccountAdd.
     * 
    **/
    data: XOR<AccountAddCreateInput, AccountAddUncheckedCreateInput>
  }


  /**
   * AccountAdd update
   */
  export type AccountAddUpdateArgs = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * The data needed to update a AccountAdd.
     * 
    **/
    data: XOR<AccountAddUpdateInput, AccountAddUncheckedUpdateInput>
    /**
     * Choose, which AccountAdd to update.
     * 
    **/
    where: AccountAddWhereUniqueInput
  }


  /**
   * AccountAdd updateMany
   */
  export type AccountAddUpdateManyArgs = {
    /**
     * The data used to update AccountAdds.
     * 
    **/
    data: XOR<AccountAddUpdateManyMutationInput, AccountAddUncheckedUpdateManyInput>
    /**
     * Filter which AccountAdds to update
     * 
    **/
    where?: AccountAddWhereInput
  }


  /**
   * AccountAdd upsert
   */
  export type AccountAddUpsertArgs = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * The filter to search for the AccountAdd to update in case it exists.
     * 
    **/
    where: AccountAddWhereUniqueInput
    /**
     * In case the AccountAdd found by the `where` argument doesn't exist, create a new AccountAdd with this data.
     * 
    **/
    create: XOR<AccountAddCreateInput, AccountAddUncheckedCreateInput>
    /**
     * In case the AccountAdd was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AccountAddUpdateInput, AccountAddUncheckedUpdateInput>
  }


  /**
   * AccountAdd delete
   */
  export type AccountAddDeleteArgs = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
    /**
     * Filter which AccountAdd to delete.
     * 
    **/
    where: AccountAddWhereUniqueInput
  }


  /**
   * AccountAdd deleteMany
   */
  export type AccountAddDeleteManyArgs = {
    /**
     * Filter which AccountAdds to delete
     * 
    **/
    where?: AccountAddWhereInput
  }


  /**
   * AccountAdd without action
   */
  export type AccountAddArgs = {
    /**
     * Select specific fields to fetch from the AccountAdd
     * 
    **/
    select?: AccountAddSelect | null
  }



  /**
   * Model AccountBuy
   */


  export type AggregateAccountBuy = {
    _count: AccountBuyCountAggregateOutputType | null
    _avg: AccountBuyAvgAggregateOutputType | null
    _sum: AccountBuySumAggregateOutputType | null
    _min: AccountBuyMinAggregateOutputType | null
    _max: AccountBuyMaxAggregateOutputType | null
  }

  export type AccountBuyAvgAggregateOutputType = {
    sequence: number | null
  }

  export type AccountBuySumAggregateOutputType = {
    sequence: bigint | null
  }

  export type AccountBuyMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    payer_boid_id: string | null
    boid_id: string | null
    key: string | null
    owner: string | null
  }

  export type AccountBuyMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    payer_boid_id: string | null
    boid_id: string | null
    key: string | null
    owner: string | null
  }

  export type AccountBuyCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    payer_boid_id: number
    boid_id: number
    key: number
    owner: number
    _all: number
  }


  export type AccountBuyAvgAggregateInputType = {
    sequence?: true
  }

  export type AccountBuySumAggregateInputType = {
    sequence?: true
  }

  export type AccountBuyMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    payer_boid_id?: true
    boid_id?: true
    key?: true
    owner?: true
  }

  export type AccountBuyMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    payer_boid_id?: true
    boid_id?: true
    key?: true
    owner?: true
  }

  export type AccountBuyCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    payer_boid_id?: true
    boid_id?: true
    key?: true
    owner?: true
    _all?: true
  }

  export type AccountBuyAggregateArgs = {
    /**
     * Filter which AccountBuy to aggregate.
     * 
    **/
    where?: AccountBuyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountBuys to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountBuyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AccountBuyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountBuys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountBuys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountBuys
    **/
    _count?: true | AccountBuyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountBuyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountBuySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountBuyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountBuyMaxAggregateInputType
  }

  export type GetAccountBuyAggregateType<T extends AccountBuyAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountBuy]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountBuy[P]>
      : GetScalarType<T[P], AggregateAccountBuy[P]>
  }




  export type AccountBuyGroupByArgs = {
    where?: AccountBuyWhereInput
    orderBy?: Enumerable<AccountBuyOrderByWithAggregationInput>
    by: Array<AccountBuyScalarFieldEnum>
    having?: AccountBuyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountBuyCountAggregateInputType | true
    _avg?: AccountBuyAvgAggregateInputType
    _sum?: AccountBuySumAggregateInputType
    _min?: AccountBuyMinAggregateInputType
    _max?: AccountBuyMaxAggregateInputType
  }


  export type AccountBuyGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    payer_boid_id: string
    boid_id: string
    key: string | null
    owner: string | null
    _count: AccountBuyCountAggregateOutputType | null
    _avg: AccountBuyAvgAggregateOutputType | null
    _sum: AccountBuySumAggregateOutputType | null
    _min: AccountBuyMinAggregateOutputType | null
    _max: AccountBuyMaxAggregateOutputType | null
  }

  type GetAccountBuyGroupByPayload<T extends AccountBuyGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccountBuyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountBuyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountBuyGroupByOutputType[P]>
            : GetScalarType<T[P], AccountBuyGroupByOutputType[P]>
        }
      >
    >


  export type AccountBuySelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    payer_boid_id?: boolean
    boid_id?: boolean
    key?: boolean
    owner?: boolean
  }


  export type AccountBuyGetPayload<S extends boolean | null | undefined | AccountBuyArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AccountBuy :
    S extends undefined ? never :
    S extends { include: any } & (AccountBuyArgs | AccountBuyFindManyArgs)
    ? AccountBuy 
    : S extends { select: any } & (AccountBuyArgs | AccountBuyFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AccountBuy ? AccountBuy[P] : never
  } 
      : AccountBuy


  type AccountBuyCountArgs = Merge<
    Omit<AccountBuyFindManyArgs, 'select' | 'include'> & {
      select?: AccountBuyCountAggregateInputType | true
    }
  >

  export interface AccountBuyDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AccountBuy that matches the filter.
     * @param {AccountBuyFindUniqueArgs} args - Arguments to find a AccountBuy
     * @example
     * // Get one AccountBuy
     * const accountBuy = await prisma.accountBuy.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountBuyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountBuyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AccountBuy'> extends True ? Prisma__AccountBuyClient<AccountBuyGetPayload<T>> : Prisma__AccountBuyClient<AccountBuyGetPayload<T> | null, null>

    /**
     * Find one AccountBuy that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccountBuyFindUniqueOrThrowArgs} args - Arguments to find a AccountBuy
     * @example
     * // Get one AccountBuy
     * const accountBuy = await prisma.accountBuy.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountBuyFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccountBuyFindUniqueOrThrowArgs>
    ): Prisma__AccountBuyClient<AccountBuyGetPayload<T>>

    /**
     * Find the first AccountBuy that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBuyFindFirstArgs} args - Arguments to find a AccountBuy
     * @example
     * // Get one AccountBuy
     * const accountBuy = await prisma.accountBuy.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountBuyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountBuyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AccountBuy'> extends True ? Prisma__AccountBuyClient<AccountBuyGetPayload<T>> : Prisma__AccountBuyClient<AccountBuyGetPayload<T> | null, null>

    /**
     * Find the first AccountBuy that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBuyFindFirstOrThrowArgs} args - Arguments to find a AccountBuy
     * @example
     * // Get one AccountBuy
     * const accountBuy = await prisma.accountBuy.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountBuyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountBuyFindFirstOrThrowArgs>
    ): Prisma__AccountBuyClient<AccountBuyGetPayload<T>>

    /**
     * Find zero or more AccountBuys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBuyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountBuys
     * const accountBuys = await prisma.accountBuy.findMany()
     * 
     * // Get first 10 AccountBuys
     * const accountBuys = await prisma.accountBuy.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const accountBuyWithSequenceOnly = await prisma.accountBuy.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends AccountBuyFindManyArgs>(
      args?: SelectSubset<T, AccountBuyFindManyArgs>
    ): PrismaPromise<Array<AccountBuyGetPayload<T>>>

    /**
     * Create a AccountBuy.
     * @param {AccountBuyCreateArgs} args - Arguments to create a AccountBuy.
     * @example
     * // Create one AccountBuy
     * const AccountBuy = await prisma.accountBuy.create({
     *   data: {
     *     // ... data to create a AccountBuy
     *   }
     * })
     * 
    **/
    create<T extends AccountBuyCreateArgs>(
      args: SelectSubset<T, AccountBuyCreateArgs>
    ): Prisma__AccountBuyClient<AccountBuyGetPayload<T>>

    /**
     * Delete a AccountBuy.
     * @param {AccountBuyDeleteArgs} args - Arguments to delete one AccountBuy.
     * @example
     * // Delete one AccountBuy
     * const AccountBuy = await prisma.accountBuy.delete({
     *   where: {
     *     // ... filter to delete one AccountBuy
     *   }
     * })
     * 
    **/
    delete<T extends AccountBuyDeleteArgs>(
      args: SelectSubset<T, AccountBuyDeleteArgs>
    ): Prisma__AccountBuyClient<AccountBuyGetPayload<T>>

    /**
     * Update one AccountBuy.
     * @param {AccountBuyUpdateArgs} args - Arguments to update one AccountBuy.
     * @example
     * // Update one AccountBuy
     * const accountBuy = await prisma.accountBuy.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountBuyUpdateArgs>(
      args: SelectSubset<T, AccountBuyUpdateArgs>
    ): Prisma__AccountBuyClient<AccountBuyGetPayload<T>>

    /**
     * Delete zero or more AccountBuys.
     * @param {AccountBuyDeleteManyArgs} args - Arguments to filter AccountBuys to delete.
     * @example
     * // Delete a few AccountBuys
     * const { count } = await prisma.accountBuy.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountBuyDeleteManyArgs>(
      args?: SelectSubset<T, AccountBuyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountBuys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBuyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountBuys
     * const accountBuy = await prisma.accountBuy.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountBuyUpdateManyArgs>(
      args: SelectSubset<T, AccountBuyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AccountBuy.
     * @param {AccountBuyUpsertArgs} args - Arguments to update or create a AccountBuy.
     * @example
     * // Update or create a AccountBuy
     * const accountBuy = await prisma.accountBuy.upsert({
     *   create: {
     *     // ... data to create a AccountBuy
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountBuy we want to update
     *   }
     * })
    **/
    upsert<T extends AccountBuyUpsertArgs>(
      args: SelectSubset<T, AccountBuyUpsertArgs>
    ): Prisma__AccountBuyClient<AccountBuyGetPayload<T>>

    /**
     * Count the number of AccountBuys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBuyCountArgs} args - Arguments to filter AccountBuys to count.
     * @example
     * // Count the number of AccountBuys
     * const count = await prisma.accountBuy.count({
     *   where: {
     *     // ... the filter for the AccountBuys we want to count
     *   }
     * })
    **/
    count<T extends AccountBuyCountArgs>(
      args?: Subset<T, AccountBuyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountBuyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountBuy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBuyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountBuyAggregateArgs>(args: Subset<T, AccountBuyAggregateArgs>): PrismaPromise<GetAccountBuyAggregateType<T>>

    /**
     * Group by AccountBuy.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountBuyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountBuyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountBuyGroupByArgs['orderBy'] }
        : { orderBy?: AccountBuyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountBuyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountBuyGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountBuy.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountBuyClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AccountBuy base type for findUnique actions
   */
  export type AccountBuyFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * Filter, which AccountBuy to fetch.
     * 
    **/
    where: AccountBuyWhereUniqueInput
  }

  /**
   * AccountBuy findUnique
   */
  export interface AccountBuyFindUniqueArgs extends AccountBuyFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccountBuy findUniqueOrThrow
   */
  export type AccountBuyFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * Filter, which AccountBuy to fetch.
     * 
    **/
    where: AccountBuyWhereUniqueInput
  }


  /**
   * AccountBuy base type for findFirst actions
   */
  export type AccountBuyFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * Filter, which AccountBuy to fetch.
     * 
    **/
    where?: AccountBuyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountBuys to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountBuyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountBuys.
     * 
    **/
    cursor?: AccountBuyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountBuys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountBuys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountBuys.
     * 
    **/
    distinct?: Enumerable<AccountBuyScalarFieldEnum>
  }

  /**
   * AccountBuy findFirst
   */
  export interface AccountBuyFindFirstArgs extends AccountBuyFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccountBuy findFirstOrThrow
   */
  export type AccountBuyFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * Filter, which AccountBuy to fetch.
     * 
    **/
    where?: AccountBuyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountBuys to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountBuyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountBuys.
     * 
    **/
    cursor?: AccountBuyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountBuys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountBuys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountBuys.
     * 
    **/
    distinct?: Enumerable<AccountBuyScalarFieldEnum>
  }


  /**
   * AccountBuy findMany
   */
  export type AccountBuyFindManyArgs = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * Filter, which AccountBuys to fetch.
     * 
    **/
    where?: AccountBuyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountBuys to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountBuyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountBuys.
     * 
    **/
    cursor?: AccountBuyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountBuys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountBuys.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccountBuyScalarFieldEnum>
  }


  /**
   * AccountBuy create
   */
  export type AccountBuyCreateArgs = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * The data needed to create a AccountBuy.
     * 
    **/
    data: XOR<AccountBuyCreateInput, AccountBuyUncheckedCreateInput>
  }


  /**
   * AccountBuy update
   */
  export type AccountBuyUpdateArgs = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * The data needed to update a AccountBuy.
     * 
    **/
    data: XOR<AccountBuyUpdateInput, AccountBuyUncheckedUpdateInput>
    /**
     * Choose, which AccountBuy to update.
     * 
    **/
    where: AccountBuyWhereUniqueInput
  }


  /**
   * AccountBuy updateMany
   */
  export type AccountBuyUpdateManyArgs = {
    /**
     * The data used to update AccountBuys.
     * 
    **/
    data: XOR<AccountBuyUpdateManyMutationInput, AccountBuyUncheckedUpdateManyInput>
    /**
     * Filter which AccountBuys to update
     * 
    **/
    where?: AccountBuyWhereInput
  }


  /**
   * AccountBuy upsert
   */
  export type AccountBuyUpsertArgs = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * The filter to search for the AccountBuy to update in case it exists.
     * 
    **/
    where: AccountBuyWhereUniqueInput
    /**
     * In case the AccountBuy found by the `where` argument doesn't exist, create a new AccountBuy with this data.
     * 
    **/
    create: XOR<AccountBuyCreateInput, AccountBuyUncheckedCreateInput>
    /**
     * In case the AccountBuy was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AccountBuyUpdateInput, AccountBuyUncheckedUpdateInput>
  }


  /**
   * AccountBuy delete
   */
  export type AccountBuyDeleteArgs = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
    /**
     * Filter which AccountBuy to delete.
     * 
    **/
    where: AccountBuyWhereUniqueInput
  }


  /**
   * AccountBuy deleteMany
   */
  export type AccountBuyDeleteManyArgs = {
    /**
     * Filter which AccountBuys to delete
     * 
    **/
    where?: AccountBuyWhereInput
  }


  /**
   * AccountBuy without action
   */
  export type AccountBuyArgs = {
    /**
     * Select specific fields to fetch from the AccountBuy
     * 
    **/
    select?: AccountBuySelect | null
  }



  /**
   * Model AccountEdit
   */


  export type AggregateAccountEdit = {
    _count: AccountEditCountAggregateOutputType | null
    _avg: AccountEditAvgAggregateOutputType | null
    _sum: AccountEditSumAggregateOutputType | null
    _min: AccountEditMinAggregateOutputType | null
    _max: AccountEditMaxAggregateOutputType | null
  }

  export type AccountEditAvgAggregateOutputType = {
    sequence: number | null
  }

  export type AccountEditSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type AccountEditMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    ipfs_meta: string | null
  }

  export type AccountEditMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    ipfs_meta: string | null
  }

  export type AccountEditCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    ipfs_meta: number
    _all: number
  }


  export type AccountEditAvgAggregateInputType = {
    sequence?: true
  }

  export type AccountEditSumAggregateInputType = {
    sequence?: true
  }

  export type AccountEditMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    ipfs_meta?: true
  }

  export type AccountEditMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    ipfs_meta?: true
  }

  export type AccountEditCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    ipfs_meta?: true
    _all?: true
  }

  export type AccountEditAggregateArgs = {
    /**
     * Filter which AccountEdit to aggregate.
     * 
    **/
    where?: AccountEditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountEdits to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountEditOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AccountEditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountEdits from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountEdits.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountEdits
    **/
    _count?: true | AccountEditCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountEditAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountEditSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountEditMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountEditMaxAggregateInputType
  }

  export type GetAccountEditAggregateType<T extends AccountEditAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountEdit]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountEdit[P]>
      : GetScalarType<T[P], AggregateAccountEdit[P]>
  }




  export type AccountEditGroupByArgs = {
    where?: AccountEditWhereInput
    orderBy?: Enumerable<AccountEditOrderByWithAggregationInput>
    by: Array<AccountEditScalarFieldEnum>
    having?: AccountEditScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountEditCountAggregateInputType | true
    _avg?: AccountEditAvgAggregateInputType
    _sum?: AccountEditSumAggregateInputType
    _min?: AccountEditMinAggregateInputType
    _max?: AccountEditMaxAggregateInputType
  }


  export type AccountEditGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    ipfs_meta: string
    _count: AccountEditCountAggregateOutputType | null
    _avg: AccountEditAvgAggregateOutputType | null
    _sum: AccountEditSumAggregateOutputType | null
    _min: AccountEditMinAggregateOutputType | null
    _max: AccountEditMaxAggregateOutputType | null
  }

  type GetAccountEditGroupByPayload<T extends AccountEditGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccountEditGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountEditGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountEditGroupByOutputType[P]>
            : GetScalarType<T[P], AccountEditGroupByOutputType[P]>
        }
      >
    >


  export type AccountEditSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    ipfs_meta?: boolean
  }


  export type AccountEditGetPayload<S extends boolean | null | undefined | AccountEditArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AccountEdit :
    S extends undefined ? never :
    S extends { include: any } & (AccountEditArgs | AccountEditFindManyArgs)
    ? AccountEdit 
    : S extends { select: any } & (AccountEditArgs | AccountEditFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AccountEdit ? AccountEdit[P] : never
  } 
      : AccountEdit


  type AccountEditCountArgs = Merge<
    Omit<AccountEditFindManyArgs, 'select' | 'include'> & {
      select?: AccountEditCountAggregateInputType | true
    }
  >

  export interface AccountEditDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AccountEdit that matches the filter.
     * @param {AccountEditFindUniqueArgs} args - Arguments to find a AccountEdit
     * @example
     * // Get one AccountEdit
     * const accountEdit = await prisma.accountEdit.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountEditFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountEditFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AccountEdit'> extends True ? Prisma__AccountEditClient<AccountEditGetPayload<T>> : Prisma__AccountEditClient<AccountEditGetPayload<T> | null, null>

    /**
     * Find one AccountEdit that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccountEditFindUniqueOrThrowArgs} args - Arguments to find a AccountEdit
     * @example
     * // Get one AccountEdit
     * const accountEdit = await prisma.accountEdit.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountEditFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccountEditFindUniqueOrThrowArgs>
    ): Prisma__AccountEditClient<AccountEditGetPayload<T>>

    /**
     * Find the first AccountEdit that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountEditFindFirstArgs} args - Arguments to find a AccountEdit
     * @example
     * // Get one AccountEdit
     * const accountEdit = await prisma.accountEdit.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountEditFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountEditFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AccountEdit'> extends True ? Prisma__AccountEditClient<AccountEditGetPayload<T>> : Prisma__AccountEditClient<AccountEditGetPayload<T> | null, null>

    /**
     * Find the first AccountEdit that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountEditFindFirstOrThrowArgs} args - Arguments to find a AccountEdit
     * @example
     * // Get one AccountEdit
     * const accountEdit = await prisma.accountEdit.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountEditFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountEditFindFirstOrThrowArgs>
    ): Prisma__AccountEditClient<AccountEditGetPayload<T>>

    /**
     * Find zero or more AccountEdits that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountEditFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountEdits
     * const accountEdits = await prisma.accountEdit.findMany()
     * 
     * // Get first 10 AccountEdits
     * const accountEdits = await prisma.accountEdit.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const accountEditWithSequenceOnly = await prisma.accountEdit.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends AccountEditFindManyArgs>(
      args?: SelectSubset<T, AccountEditFindManyArgs>
    ): PrismaPromise<Array<AccountEditGetPayload<T>>>

    /**
     * Create a AccountEdit.
     * @param {AccountEditCreateArgs} args - Arguments to create a AccountEdit.
     * @example
     * // Create one AccountEdit
     * const AccountEdit = await prisma.accountEdit.create({
     *   data: {
     *     // ... data to create a AccountEdit
     *   }
     * })
     * 
    **/
    create<T extends AccountEditCreateArgs>(
      args: SelectSubset<T, AccountEditCreateArgs>
    ): Prisma__AccountEditClient<AccountEditGetPayload<T>>

    /**
     * Delete a AccountEdit.
     * @param {AccountEditDeleteArgs} args - Arguments to delete one AccountEdit.
     * @example
     * // Delete one AccountEdit
     * const AccountEdit = await prisma.accountEdit.delete({
     *   where: {
     *     // ... filter to delete one AccountEdit
     *   }
     * })
     * 
    **/
    delete<T extends AccountEditDeleteArgs>(
      args: SelectSubset<T, AccountEditDeleteArgs>
    ): Prisma__AccountEditClient<AccountEditGetPayload<T>>

    /**
     * Update one AccountEdit.
     * @param {AccountEditUpdateArgs} args - Arguments to update one AccountEdit.
     * @example
     * // Update one AccountEdit
     * const accountEdit = await prisma.accountEdit.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountEditUpdateArgs>(
      args: SelectSubset<T, AccountEditUpdateArgs>
    ): Prisma__AccountEditClient<AccountEditGetPayload<T>>

    /**
     * Delete zero or more AccountEdits.
     * @param {AccountEditDeleteManyArgs} args - Arguments to filter AccountEdits to delete.
     * @example
     * // Delete a few AccountEdits
     * const { count } = await prisma.accountEdit.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountEditDeleteManyArgs>(
      args?: SelectSubset<T, AccountEditDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountEdits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountEditUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountEdits
     * const accountEdit = await prisma.accountEdit.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountEditUpdateManyArgs>(
      args: SelectSubset<T, AccountEditUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AccountEdit.
     * @param {AccountEditUpsertArgs} args - Arguments to update or create a AccountEdit.
     * @example
     * // Update or create a AccountEdit
     * const accountEdit = await prisma.accountEdit.upsert({
     *   create: {
     *     // ... data to create a AccountEdit
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountEdit we want to update
     *   }
     * })
    **/
    upsert<T extends AccountEditUpsertArgs>(
      args: SelectSubset<T, AccountEditUpsertArgs>
    ): Prisma__AccountEditClient<AccountEditGetPayload<T>>

    /**
     * Count the number of AccountEdits.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountEditCountArgs} args - Arguments to filter AccountEdits to count.
     * @example
     * // Count the number of AccountEdits
     * const count = await prisma.accountEdit.count({
     *   where: {
     *     // ... the filter for the AccountEdits we want to count
     *   }
     * })
    **/
    count<T extends AccountEditCountArgs>(
      args?: Subset<T, AccountEditCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountEditCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountEdit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountEditAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountEditAggregateArgs>(args: Subset<T, AccountEditAggregateArgs>): PrismaPromise<GetAccountEditAggregateType<T>>

    /**
     * Group by AccountEdit.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountEditGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountEditGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountEditGroupByArgs['orderBy'] }
        : { orderBy?: AccountEditGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountEditGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountEditGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountEdit.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountEditClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AccountEdit base type for findUnique actions
   */
  export type AccountEditFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * Filter, which AccountEdit to fetch.
     * 
    **/
    where: AccountEditWhereUniqueInput
  }

  /**
   * AccountEdit findUnique
   */
  export interface AccountEditFindUniqueArgs extends AccountEditFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccountEdit findUniqueOrThrow
   */
  export type AccountEditFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * Filter, which AccountEdit to fetch.
     * 
    **/
    where: AccountEditWhereUniqueInput
  }


  /**
   * AccountEdit base type for findFirst actions
   */
  export type AccountEditFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * Filter, which AccountEdit to fetch.
     * 
    **/
    where?: AccountEditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountEdits to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountEditOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountEdits.
     * 
    **/
    cursor?: AccountEditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountEdits from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountEdits.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountEdits.
     * 
    **/
    distinct?: Enumerable<AccountEditScalarFieldEnum>
  }

  /**
   * AccountEdit findFirst
   */
  export interface AccountEditFindFirstArgs extends AccountEditFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccountEdit findFirstOrThrow
   */
  export type AccountEditFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * Filter, which AccountEdit to fetch.
     * 
    **/
    where?: AccountEditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountEdits to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountEditOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountEdits.
     * 
    **/
    cursor?: AccountEditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountEdits from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountEdits.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountEdits.
     * 
    **/
    distinct?: Enumerable<AccountEditScalarFieldEnum>
  }


  /**
   * AccountEdit findMany
   */
  export type AccountEditFindManyArgs = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * Filter, which AccountEdits to fetch.
     * 
    **/
    where?: AccountEditWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountEdits to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountEditOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountEdits.
     * 
    **/
    cursor?: AccountEditWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountEdits from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountEdits.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccountEditScalarFieldEnum>
  }


  /**
   * AccountEdit create
   */
  export type AccountEditCreateArgs = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * The data needed to create a AccountEdit.
     * 
    **/
    data: XOR<AccountEditCreateInput, AccountEditUncheckedCreateInput>
  }


  /**
   * AccountEdit update
   */
  export type AccountEditUpdateArgs = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * The data needed to update a AccountEdit.
     * 
    **/
    data: XOR<AccountEditUpdateInput, AccountEditUncheckedUpdateInput>
    /**
     * Choose, which AccountEdit to update.
     * 
    **/
    where: AccountEditWhereUniqueInput
  }


  /**
   * AccountEdit updateMany
   */
  export type AccountEditUpdateManyArgs = {
    /**
     * The data used to update AccountEdits.
     * 
    **/
    data: XOR<AccountEditUpdateManyMutationInput, AccountEditUncheckedUpdateManyInput>
    /**
     * Filter which AccountEdits to update
     * 
    **/
    where?: AccountEditWhereInput
  }


  /**
   * AccountEdit upsert
   */
  export type AccountEditUpsertArgs = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * The filter to search for the AccountEdit to update in case it exists.
     * 
    **/
    where: AccountEditWhereUniqueInput
    /**
     * In case the AccountEdit found by the `where` argument doesn't exist, create a new AccountEdit with this data.
     * 
    **/
    create: XOR<AccountEditCreateInput, AccountEditUncheckedCreateInput>
    /**
     * In case the AccountEdit was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AccountEditUpdateInput, AccountEditUncheckedUpdateInput>
  }


  /**
   * AccountEdit delete
   */
  export type AccountEditDeleteArgs = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
    /**
     * Filter which AccountEdit to delete.
     * 
    **/
    where: AccountEditWhereUniqueInput
  }


  /**
   * AccountEdit deleteMany
   */
  export type AccountEditDeleteManyArgs = {
    /**
     * Filter which AccountEdits to delete
     * 
    **/
    where?: AccountEditWhereInput
  }


  /**
   * AccountEdit without action
   */
  export type AccountEditArgs = {
    /**
     * Select specific fields to fetch from the AccountEdit
     * 
    **/
    select?: AccountEditSelect | null
  }



  /**
   * Model AccountFree
   */


  export type AggregateAccountFree = {
    _count: AccountFreeCountAggregateOutputType | null
    _avg: AccountFreeAvgAggregateOutputType | null
    _sum: AccountFreeSumAggregateOutputType | null
    _min: AccountFreeMinAggregateOutputType | null
    _max: AccountFreeMaxAggregateOutputType | null
  }

  export type AccountFreeAvgAggregateOutputType = {
    sequence: number | null
  }

  export type AccountFreeSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type AccountFreeMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
  }

  export type AccountFreeMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
  }

  export type AccountFreeCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    _all: number
  }


  export type AccountFreeAvgAggregateInputType = {
    sequence?: true
  }

  export type AccountFreeSumAggregateInputType = {
    sequence?: true
  }

  export type AccountFreeMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
  }

  export type AccountFreeMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
  }

  export type AccountFreeCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    _all?: true
  }

  export type AccountFreeAggregateArgs = {
    /**
     * Filter which AccountFree to aggregate.
     * 
    **/
    where?: AccountFreeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountFrees to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountFreeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AccountFreeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountFrees from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountFrees.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AccountFrees
    **/
    _count?: true | AccountFreeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AccountFreeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AccountFreeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountFreeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountFreeMaxAggregateInputType
  }

  export type GetAccountFreeAggregateType<T extends AccountFreeAggregateArgs> = {
        [P in keyof T & keyof AggregateAccountFree]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccountFree[P]>
      : GetScalarType<T[P], AggregateAccountFree[P]>
  }




  export type AccountFreeGroupByArgs = {
    where?: AccountFreeWhereInput
    orderBy?: Enumerable<AccountFreeOrderByWithAggregationInput>
    by: Array<AccountFreeScalarFieldEnum>
    having?: AccountFreeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountFreeCountAggregateInputType | true
    _avg?: AccountFreeAvgAggregateInputType
    _sum?: AccountFreeSumAggregateInputType
    _min?: AccountFreeMinAggregateInputType
    _max?: AccountFreeMaxAggregateInputType
  }


  export type AccountFreeGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    _count: AccountFreeCountAggregateOutputType | null
    _avg: AccountFreeAvgAggregateOutputType | null
    _sum: AccountFreeSumAggregateOutputType | null
    _min: AccountFreeMinAggregateOutputType | null
    _max: AccountFreeMaxAggregateOutputType | null
  }

  type GetAccountFreeGroupByPayload<T extends AccountFreeGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AccountFreeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountFreeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountFreeGroupByOutputType[P]>
            : GetScalarType<T[P], AccountFreeGroupByOutputType[P]>
        }
      >
    >


  export type AccountFreeSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
  }


  export type AccountFreeGetPayload<S extends boolean | null | undefined | AccountFreeArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AccountFree :
    S extends undefined ? never :
    S extends { include: any } & (AccountFreeArgs | AccountFreeFindManyArgs)
    ? AccountFree 
    : S extends { select: any } & (AccountFreeArgs | AccountFreeFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AccountFree ? AccountFree[P] : never
  } 
      : AccountFree


  type AccountFreeCountArgs = Merge<
    Omit<AccountFreeFindManyArgs, 'select' | 'include'> & {
      select?: AccountFreeCountAggregateInputType | true
    }
  >

  export interface AccountFreeDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AccountFree that matches the filter.
     * @param {AccountFreeFindUniqueArgs} args - Arguments to find a AccountFree
     * @example
     * // Get one AccountFree
     * const accountFree = await prisma.accountFree.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AccountFreeFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AccountFreeFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AccountFree'> extends True ? Prisma__AccountFreeClient<AccountFreeGetPayload<T>> : Prisma__AccountFreeClient<AccountFreeGetPayload<T> | null, null>

    /**
     * Find one AccountFree that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AccountFreeFindUniqueOrThrowArgs} args - Arguments to find a AccountFree
     * @example
     * // Get one AccountFree
     * const accountFree = await prisma.accountFree.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AccountFreeFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AccountFreeFindUniqueOrThrowArgs>
    ): Prisma__AccountFreeClient<AccountFreeGetPayload<T>>

    /**
     * Find the first AccountFree that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFreeFindFirstArgs} args - Arguments to find a AccountFree
     * @example
     * // Get one AccountFree
     * const accountFree = await prisma.accountFree.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AccountFreeFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AccountFreeFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AccountFree'> extends True ? Prisma__AccountFreeClient<AccountFreeGetPayload<T>> : Prisma__AccountFreeClient<AccountFreeGetPayload<T> | null, null>

    /**
     * Find the first AccountFree that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFreeFindFirstOrThrowArgs} args - Arguments to find a AccountFree
     * @example
     * // Get one AccountFree
     * const accountFree = await prisma.accountFree.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AccountFreeFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AccountFreeFindFirstOrThrowArgs>
    ): Prisma__AccountFreeClient<AccountFreeGetPayload<T>>

    /**
     * Find zero or more AccountFrees that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFreeFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AccountFrees
     * const accountFrees = await prisma.accountFree.findMany()
     * 
     * // Get first 10 AccountFrees
     * const accountFrees = await prisma.accountFree.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const accountFreeWithSequenceOnly = await prisma.accountFree.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends AccountFreeFindManyArgs>(
      args?: SelectSubset<T, AccountFreeFindManyArgs>
    ): PrismaPromise<Array<AccountFreeGetPayload<T>>>

    /**
     * Create a AccountFree.
     * @param {AccountFreeCreateArgs} args - Arguments to create a AccountFree.
     * @example
     * // Create one AccountFree
     * const AccountFree = await prisma.accountFree.create({
     *   data: {
     *     // ... data to create a AccountFree
     *   }
     * })
     * 
    **/
    create<T extends AccountFreeCreateArgs>(
      args: SelectSubset<T, AccountFreeCreateArgs>
    ): Prisma__AccountFreeClient<AccountFreeGetPayload<T>>

    /**
     * Delete a AccountFree.
     * @param {AccountFreeDeleteArgs} args - Arguments to delete one AccountFree.
     * @example
     * // Delete one AccountFree
     * const AccountFree = await prisma.accountFree.delete({
     *   where: {
     *     // ... filter to delete one AccountFree
     *   }
     * })
     * 
    **/
    delete<T extends AccountFreeDeleteArgs>(
      args: SelectSubset<T, AccountFreeDeleteArgs>
    ): Prisma__AccountFreeClient<AccountFreeGetPayload<T>>

    /**
     * Update one AccountFree.
     * @param {AccountFreeUpdateArgs} args - Arguments to update one AccountFree.
     * @example
     * // Update one AccountFree
     * const accountFree = await prisma.accountFree.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AccountFreeUpdateArgs>(
      args: SelectSubset<T, AccountFreeUpdateArgs>
    ): Prisma__AccountFreeClient<AccountFreeGetPayload<T>>

    /**
     * Delete zero or more AccountFrees.
     * @param {AccountFreeDeleteManyArgs} args - Arguments to filter AccountFrees to delete.
     * @example
     * // Delete a few AccountFrees
     * const { count } = await prisma.accountFree.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AccountFreeDeleteManyArgs>(
      args?: SelectSubset<T, AccountFreeDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AccountFrees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFreeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AccountFrees
     * const accountFree = await prisma.accountFree.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AccountFreeUpdateManyArgs>(
      args: SelectSubset<T, AccountFreeUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AccountFree.
     * @param {AccountFreeUpsertArgs} args - Arguments to update or create a AccountFree.
     * @example
     * // Update or create a AccountFree
     * const accountFree = await prisma.accountFree.upsert({
     *   create: {
     *     // ... data to create a AccountFree
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AccountFree we want to update
     *   }
     * })
    **/
    upsert<T extends AccountFreeUpsertArgs>(
      args: SelectSubset<T, AccountFreeUpsertArgs>
    ): Prisma__AccountFreeClient<AccountFreeGetPayload<T>>

    /**
     * Count the number of AccountFrees.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFreeCountArgs} args - Arguments to filter AccountFrees to count.
     * @example
     * // Count the number of AccountFrees
     * const count = await prisma.accountFree.count({
     *   where: {
     *     // ... the filter for the AccountFrees we want to count
     *   }
     * })
    **/
    count<T extends AccountFreeCountArgs>(
      args?: Subset<T, AccountFreeCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountFreeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AccountFree.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFreeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountFreeAggregateArgs>(args: Subset<T, AccountFreeAggregateArgs>): PrismaPromise<GetAccountFreeAggregateType<T>>

    /**
     * Group by AccountFree.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountFreeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AccountFreeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AccountFreeGroupByArgs['orderBy'] }
        : { orderBy?: AccountFreeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AccountFreeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountFreeGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AccountFree.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AccountFreeClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AccountFree base type for findUnique actions
   */
  export type AccountFreeFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * Filter, which AccountFree to fetch.
     * 
    **/
    where: AccountFreeWhereUniqueInput
  }

  /**
   * AccountFree findUnique
   */
  export interface AccountFreeFindUniqueArgs extends AccountFreeFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccountFree findUniqueOrThrow
   */
  export type AccountFreeFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * Filter, which AccountFree to fetch.
     * 
    **/
    where: AccountFreeWhereUniqueInput
  }


  /**
   * AccountFree base type for findFirst actions
   */
  export type AccountFreeFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * Filter, which AccountFree to fetch.
     * 
    **/
    where?: AccountFreeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountFrees to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountFreeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountFrees.
     * 
    **/
    cursor?: AccountFreeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountFrees from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountFrees.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountFrees.
     * 
    **/
    distinct?: Enumerable<AccountFreeScalarFieldEnum>
  }

  /**
   * AccountFree findFirst
   */
  export interface AccountFreeFindFirstArgs extends AccountFreeFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AccountFree findFirstOrThrow
   */
  export type AccountFreeFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * Filter, which AccountFree to fetch.
     * 
    **/
    where?: AccountFreeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountFrees to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountFreeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AccountFrees.
     * 
    **/
    cursor?: AccountFreeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountFrees from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountFrees.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AccountFrees.
     * 
    **/
    distinct?: Enumerable<AccountFreeScalarFieldEnum>
  }


  /**
   * AccountFree findMany
   */
  export type AccountFreeFindManyArgs = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * Filter, which AccountFrees to fetch.
     * 
    **/
    where?: AccountFreeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AccountFrees to fetch.
     * 
    **/
    orderBy?: Enumerable<AccountFreeOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AccountFrees.
     * 
    **/
    cursor?: AccountFreeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AccountFrees from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AccountFrees.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AccountFreeScalarFieldEnum>
  }


  /**
   * AccountFree create
   */
  export type AccountFreeCreateArgs = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * The data needed to create a AccountFree.
     * 
    **/
    data: XOR<AccountFreeCreateInput, AccountFreeUncheckedCreateInput>
  }


  /**
   * AccountFree update
   */
  export type AccountFreeUpdateArgs = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * The data needed to update a AccountFree.
     * 
    **/
    data: XOR<AccountFreeUpdateInput, AccountFreeUncheckedUpdateInput>
    /**
     * Choose, which AccountFree to update.
     * 
    **/
    where: AccountFreeWhereUniqueInput
  }


  /**
   * AccountFree updateMany
   */
  export type AccountFreeUpdateManyArgs = {
    /**
     * The data used to update AccountFrees.
     * 
    **/
    data: XOR<AccountFreeUpdateManyMutationInput, AccountFreeUncheckedUpdateManyInput>
    /**
     * Filter which AccountFrees to update
     * 
    **/
    where?: AccountFreeWhereInput
  }


  /**
   * AccountFree upsert
   */
  export type AccountFreeUpsertArgs = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * The filter to search for the AccountFree to update in case it exists.
     * 
    **/
    where: AccountFreeWhereUniqueInput
    /**
     * In case the AccountFree found by the `where` argument doesn't exist, create a new AccountFree with this data.
     * 
    **/
    create: XOR<AccountFreeCreateInput, AccountFreeUncheckedCreateInput>
    /**
     * In case the AccountFree was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AccountFreeUpdateInput, AccountFreeUncheckedUpdateInput>
  }


  /**
   * AccountFree delete
   */
  export type AccountFreeDeleteArgs = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
    /**
     * Filter which AccountFree to delete.
     * 
    **/
    where: AccountFreeWhereUniqueInput
  }


  /**
   * AccountFree deleteMany
   */
  export type AccountFreeDeleteManyArgs = {
    /**
     * Filter which AccountFrees to delete
     * 
    **/
    where?: AccountFreeWhereInput
  }


  /**
   * AccountFree without action
   */
  export type AccountFreeArgs = {
    /**
     * Select specific fields to fetch from the AccountFree
     * 
    **/
    select?: AccountFreeSelect | null
  }



  /**
   * Model AuthAddKey
   */


  export type AggregateAuthAddKey = {
    _count: AuthAddKeyCountAggregateOutputType | null
    _avg: AuthAddKeyAvgAggregateOutputType | null
    _sum: AuthAddKeySumAggregateOutputType | null
    _min: AuthAddKeyMinAggregateOutputType | null
    _max: AuthAddKeyMaxAggregateOutputType | null
  }

  export type AuthAddKeyAvgAggregateOutputType = {
    sequence: number | null
  }

  export type AuthAddKeySumAggregateOutputType = {
    sequence: bigint | null
  }

  export type AuthAddKeyMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    key: string | null
  }

  export type AuthAddKeyMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    key: string | null
  }

  export type AuthAddKeyCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    key: number
    _all: number
  }


  export type AuthAddKeyAvgAggregateInputType = {
    sequence?: true
  }

  export type AuthAddKeySumAggregateInputType = {
    sequence?: true
  }

  export type AuthAddKeyMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    key?: true
  }

  export type AuthAddKeyMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    key?: true
  }

  export type AuthAddKeyCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    key?: true
    _all?: true
  }

  export type AuthAddKeyAggregateArgs = {
    /**
     * Filter which AuthAddKey to aggregate.
     * 
    **/
    where?: AuthAddKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthAddKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthAddKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AuthAddKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthAddKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthAddKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthAddKeys
    **/
    _count?: true | AuthAddKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthAddKeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthAddKeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthAddKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthAddKeyMaxAggregateInputType
  }

  export type GetAuthAddKeyAggregateType<T extends AuthAddKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthAddKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthAddKey[P]>
      : GetScalarType<T[P], AggregateAuthAddKey[P]>
  }




  export type AuthAddKeyGroupByArgs = {
    where?: AuthAddKeyWhereInput
    orderBy?: Enumerable<AuthAddKeyOrderByWithAggregationInput>
    by: Array<AuthAddKeyScalarFieldEnum>
    having?: AuthAddKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthAddKeyCountAggregateInputType | true
    _avg?: AuthAddKeyAvgAggregateInputType
    _sum?: AuthAddKeySumAggregateInputType
    _min?: AuthAddKeyMinAggregateInputType
    _max?: AuthAddKeyMaxAggregateInputType
  }


  export type AuthAddKeyGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    key: string
    _count: AuthAddKeyCountAggregateOutputType | null
    _avg: AuthAddKeyAvgAggregateOutputType | null
    _sum: AuthAddKeySumAggregateOutputType | null
    _min: AuthAddKeyMinAggregateOutputType | null
    _max: AuthAddKeyMaxAggregateOutputType | null
  }

  type GetAuthAddKeyGroupByPayload<T extends AuthAddKeyGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AuthAddKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthAddKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthAddKeyGroupByOutputType[P]>
            : GetScalarType<T[P], AuthAddKeyGroupByOutputType[P]>
        }
      >
    >


  export type AuthAddKeySelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    key?: boolean
  }


  export type AuthAddKeyGetPayload<S extends boolean | null | undefined | AuthAddKeyArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AuthAddKey :
    S extends undefined ? never :
    S extends { include: any } & (AuthAddKeyArgs | AuthAddKeyFindManyArgs)
    ? AuthAddKey 
    : S extends { select: any } & (AuthAddKeyArgs | AuthAddKeyFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AuthAddKey ? AuthAddKey[P] : never
  } 
      : AuthAddKey


  type AuthAddKeyCountArgs = Merge<
    Omit<AuthAddKeyFindManyArgs, 'select' | 'include'> & {
      select?: AuthAddKeyCountAggregateInputType | true
    }
  >

  export interface AuthAddKeyDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AuthAddKey that matches the filter.
     * @param {AuthAddKeyFindUniqueArgs} args - Arguments to find a AuthAddKey
     * @example
     * // Get one AuthAddKey
     * const authAddKey = await prisma.authAddKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuthAddKeyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuthAddKeyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AuthAddKey'> extends True ? Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T>> : Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T> | null, null>

    /**
     * Find one AuthAddKey that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AuthAddKeyFindUniqueOrThrowArgs} args - Arguments to find a AuthAddKey
     * @example
     * // Get one AuthAddKey
     * const authAddKey = await prisma.authAddKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuthAddKeyFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AuthAddKeyFindUniqueOrThrowArgs>
    ): Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T>>

    /**
     * Find the first AuthAddKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAddKeyFindFirstArgs} args - Arguments to find a AuthAddKey
     * @example
     * // Get one AuthAddKey
     * const authAddKey = await prisma.authAddKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuthAddKeyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuthAddKeyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AuthAddKey'> extends True ? Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T>> : Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T> | null, null>

    /**
     * Find the first AuthAddKey that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAddKeyFindFirstOrThrowArgs} args - Arguments to find a AuthAddKey
     * @example
     * // Get one AuthAddKey
     * const authAddKey = await prisma.authAddKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuthAddKeyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthAddKeyFindFirstOrThrowArgs>
    ): Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T>>

    /**
     * Find zero or more AuthAddKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAddKeyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthAddKeys
     * const authAddKeys = await prisma.authAddKey.findMany()
     * 
     * // Get first 10 AuthAddKeys
     * const authAddKeys = await prisma.authAddKey.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const authAddKeyWithSequenceOnly = await prisma.authAddKey.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends AuthAddKeyFindManyArgs>(
      args?: SelectSubset<T, AuthAddKeyFindManyArgs>
    ): PrismaPromise<Array<AuthAddKeyGetPayload<T>>>

    /**
     * Create a AuthAddKey.
     * @param {AuthAddKeyCreateArgs} args - Arguments to create a AuthAddKey.
     * @example
     * // Create one AuthAddKey
     * const AuthAddKey = await prisma.authAddKey.create({
     *   data: {
     *     // ... data to create a AuthAddKey
     *   }
     * })
     * 
    **/
    create<T extends AuthAddKeyCreateArgs>(
      args: SelectSubset<T, AuthAddKeyCreateArgs>
    ): Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T>>

    /**
     * Delete a AuthAddKey.
     * @param {AuthAddKeyDeleteArgs} args - Arguments to delete one AuthAddKey.
     * @example
     * // Delete one AuthAddKey
     * const AuthAddKey = await prisma.authAddKey.delete({
     *   where: {
     *     // ... filter to delete one AuthAddKey
     *   }
     * })
     * 
    **/
    delete<T extends AuthAddKeyDeleteArgs>(
      args: SelectSubset<T, AuthAddKeyDeleteArgs>
    ): Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T>>

    /**
     * Update one AuthAddKey.
     * @param {AuthAddKeyUpdateArgs} args - Arguments to update one AuthAddKey.
     * @example
     * // Update one AuthAddKey
     * const authAddKey = await prisma.authAddKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuthAddKeyUpdateArgs>(
      args: SelectSubset<T, AuthAddKeyUpdateArgs>
    ): Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T>>

    /**
     * Delete zero or more AuthAddKeys.
     * @param {AuthAddKeyDeleteManyArgs} args - Arguments to filter AuthAddKeys to delete.
     * @example
     * // Delete a few AuthAddKeys
     * const { count } = await prisma.authAddKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuthAddKeyDeleteManyArgs>(
      args?: SelectSubset<T, AuthAddKeyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthAddKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAddKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthAddKeys
     * const authAddKey = await prisma.authAddKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuthAddKeyUpdateManyArgs>(
      args: SelectSubset<T, AuthAddKeyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthAddKey.
     * @param {AuthAddKeyUpsertArgs} args - Arguments to update or create a AuthAddKey.
     * @example
     * // Update or create a AuthAddKey
     * const authAddKey = await prisma.authAddKey.upsert({
     *   create: {
     *     // ... data to create a AuthAddKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthAddKey we want to update
     *   }
     * })
    **/
    upsert<T extends AuthAddKeyUpsertArgs>(
      args: SelectSubset<T, AuthAddKeyUpsertArgs>
    ): Prisma__AuthAddKeyClient<AuthAddKeyGetPayload<T>>

    /**
     * Count the number of AuthAddKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAddKeyCountArgs} args - Arguments to filter AuthAddKeys to count.
     * @example
     * // Count the number of AuthAddKeys
     * const count = await prisma.authAddKey.count({
     *   where: {
     *     // ... the filter for the AuthAddKeys we want to count
     *   }
     * })
    **/
    count<T extends AuthAddKeyCountArgs>(
      args?: Subset<T, AuthAddKeyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthAddKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthAddKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAddKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthAddKeyAggregateArgs>(args: Subset<T, AuthAddKeyAggregateArgs>): PrismaPromise<GetAuthAddKeyAggregateType<T>>

    /**
     * Group by AuthAddKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthAddKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthAddKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthAddKeyGroupByArgs['orderBy'] }
        : { orderBy?: AuthAddKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthAddKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthAddKeyGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthAddKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuthAddKeyClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AuthAddKey base type for findUnique actions
   */
  export type AuthAddKeyFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * Filter, which AuthAddKey to fetch.
     * 
    **/
    where: AuthAddKeyWhereUniqueInput
  }

  /**
   * AuthAddKey findUnique
   */
  export interface AuthAddKeyFindUniqueArgs extends AuthAddKeyFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthAddKey findUniqueOrThrow
   */
  export type AuthAddKeyFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * Filter, which AuthAddKey to fetch.
     * 
    **/
    where: AuthAddKeyWhereUniqueInput
  }


  /**
   * AuthAddKey base type for findFirst actions
   */
  export type AuthAddKeyFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * Filter, which AuthAddKey to fetch.
     * 
    **/
    where?: AuthAddKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthAddKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthAddKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthAddKeys.
     * 
    **/
    cursor?: AuthAddKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthAddKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthAddKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthAddKeys.
     * 
    **/
    distinct?: Enumerable<AuthAddKeyScalarFieldEnum>
  }

  /**
   * AuthAddKey findFirst
   */
  export interface AuthAddKeyFindFirstArgs extends AuthAddKeyFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthAddKey findFirstOrThrow
   */
  export type AuthAddKeyFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * Filter, which AuthAddKey to fetch.
     * 
    **/
    where?: AuthAddKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthAddKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthAddKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthAddKeys.
     * 
    **/
    cursor?: AuthAddKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthAddKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthAddKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthAddKeys.
     * 
    **/
    distinct?: Enumerable<AuthAddKeyScalarFieldEnum>
  }


  /**
   * AuthAddKey findMany
   */
  export type AuthAddKeyFindManyArgs = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * Filter, which AuthAddKeys to fetch.
     * 
    **/
    where?: AuthAddKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthAddKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthAddKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthAddKeys.
     * 
    **/
    cursor?: AuthAddKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthAddKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthAddKeys.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AuthAddKeyScalarFieldEnum>
  }


  /**
   * AuthAddKey create
   */
  export type AuthAddKeyCreateArgs = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * The data needed to create a AuthAddKey.
     * 
    **/
    data: XOR<AuthAddKeyCreateInput, AuthAddKeyUncheckedCreateInput>
  }


  /**
   * AuthAddKey update
   */
  export type AuthAddKeyUpdateArgs = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * The data needed to update a AuthAddKey.
     * 
    **/
    data: XOR<AuthAddKeyUpdateInput, AuthAddKeyUncheckedUpdateInput>
    /**
     * Choose, which AuthAddKey to update.
     * 
    **/
    where: AuthAddKeyWhereUniqueInput
  }


  /**
   * AuthAddKey updateMany
   */
  export type AuthAddKeyUpdateManyArgs = {
    /**
     * The data used to update AuthAddKeys.
     * 
    **/
    data: XOR<AuthAddKeyUpdateManyMutationInput, AuthAddKeyUncheckedUpdateManyInput>
    /**
     * Filter which AuthAddKeys to update
     * 
    **/
    where?: AuthAddKeyWhereInput
  }


  /**
   * AuthAddKey upsert
   */
  export type AuthAddKeyUpsertArgs = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * The filter to search for the AuthAddKey to update in case it exists.
     * 
    **/
    where: AuthAddKeyWhereUniqueInput
    /**
     * In case the AuthAddKey found by the `where` argument doesn't exist, create a new AuthAddKey with this data.
     * 
    **/
    create: XOR<AuthAddKeyCreateInput, AuthAddKeyUncheckedCreateInput>
    /**
     * In case the AuthAddKey was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AuthAddKeyUpdateInput, AuthAddKeyUncheckedUpdateInput>
  }


  /**
   * AuthAddKey delete
   */
  export type AuthAddKeyDeleteArgs = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
    /**
     * Filter which AuthAddKey to delete.
     * 
    **/
    where: AuthAddKeyWhereUniqueInput
  }


  /**
   * AuthAddKey deleteMany
   */
  export type AuthAddKeyDeleteManyArgs = {
    /**
     * Filter which AuthAddKeys to delete
     * 
    **/
    where?: AuthAddKeyWhereInput
  }


  /**
   * AuthAddKey without action
   */
  export type AuthAddKeyArgs = {
    /**
     * Select specific fields to fetch from the AuthAddKey
     * 
    **/
    select?: AuthAddKeySelect | null
  }



  /**
   * Model AuthRmKey
   */


  export type AggregateAuthRmKey = {
    _count: AuthRmKeyCountAggregateOutputType | null
    _avg: AuthRmKeyAvgAggregateOutputType | null
    _sum: AuthRmKeySumAggregateOutputType | null
    _min: AuthRmKeyMinAggregateOutputType | null
    _max: AuthRmKeyMaxAggregateOutputType | null
  }

  export type AuthRmKeyAvgAggregateOutputType = {
    sequence: number | null
    keyIndex: number | null
  }

  export type AuthRmKeySumAggregateOutputType = {
    sequence: bigint | null
    keyIndex: number | null
  }

  export type AuthRmKeyMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    keyIndex: number | null
  }

  export type AuthRmKeyMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    keyIndex: number | null
  }

  export type AuthRmKeyCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    keyIndex: number
    _all: number
  }


  export type AuthRmKeyAvgAggregateInputType = {
    sequence?: true
    keyIndex?: true
  }

  export type AuthRmKeySumAggregateInputType = {
    sequence?: true
    keyIndex?: true
  }

  export type AuthRmKeyMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    keyIndex?: true
  }

  export type AuthRmKeyMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    keyIndex?: true
  }

  export type AuthRmKeyCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    keyIndex?: true
    _all?: true
  }

  export type AuthRmKeyAggregateArgs = {
    /**
     * Filter which AuthRmKey to aggregate.
     * 
    **/
    where?: AuthRmKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthRmKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthRmKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: AuthRmKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthRmKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthRmKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AuthRmKeys
    **/
    _count?: true | AuthRmKeyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AuthRmKeyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AuthRmKeySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AuthRmKeyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AuthRmKeyMaxAggregateInputType
  }

  export type GetAuthRmKeyAggregateType<T extends AuthRmKeyAggregateArgs> = {
        [P in keyof T & keyof AggregateAuthRmKey]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuthRmKey[P]>
      : GetScalarType<T[P], AggregateAuthRmKey[P]>
  }




  export type AuthRmKeyGroupByArgs = {
    where?: AuthRmKeyWhereInput
    orderBy?: Enumerable<AuthRmKeyOrderByWithAggregationInput>
    by: Array<AuthRmKeyScalarFieldEnum>
    having?: AuthRmKeyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AuthRmKeyCountAggregateInputType | true
    _avg?: AuthRmKeyAvgAggregateInputType
    _sum?: AuthRmKeySumAggregateInputType
    _min?: AuthRmKeyMinAggregateInputType
    _max?: AuthRmKeyMaxAggregateInputType
  }


  export type AuthRmKeyGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    keyIndex: number
    _count: AuthRmKeyCountAggregateOutputType | null
    _avg: AuthRmKeyAvgAggregateOutputType | null
    _sum: AuthRmKeySumAggregateOutputType | null
    _min: AuthRmKeyMinAggregateOutputType | null
    _max: AuthRmKeyMaxAggregateOutputType | null
  }

  type GetAuthRmKeyGroupByPayload<T extends AuthRmKeyGroupByArgs> = PrismaPromise<
    Array<
      PickArray<AuthRmKeyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AuthRmKeyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AuthRmKeyGroupByOutputType[P]>
            : GetScalarType<T[P], AuthRmKeyGroupByOutputType[P]>
        }
      >
    >


  export type AuthRmKeySelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    keyIndex?: boolean
  }


  export type AuthRmKeyGetPayload<S extends boolean | null | undefined | AuthRmKeyArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? AuthRmKey :
    S extends undefined ? never :
    S extends { include: any } & (AuthRmKeyArgs | AuthRmKeyFindManyArgs)
    ? AuthRmKey 
    : S extends { select: any } & (AuthRmKeyArgs | AuthRmKeyFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof AuthRmKey ? AuthRmKey[P] : never
  } 
      : AuthRmKey


  type AuthRmKeyCountArgs = Merge<
    Omit<AuthRmKeyFindManyArgs, 'select' | 'include'> & {
      select?: AuthRmKeyCountAggregateInputType | true
    }
  >

  export interface AuthRmKeyDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one AuthRmKey that matches the filter.
     * @param {AuthRmKeyFindUniqueArgs} args - Arguments to find a AuthRmKey
     * @example
     * // Get one AuthRmKey
     * const authRmKey = await prisma.authRmKey.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends AuthRmKeyFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, AuthRmKeyFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'AuthRmKey'> extends True ? Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T>> : Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T> | null, null>

    /**
     * Find one AuthRmKey that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {AuthRmKeyFindUniqueOrThrowArgs} args - Arguments to find a AuthRmKey
     * @example
     * // Get one AuthRmKey
     * const authRmKey = await prisma.authRmKey.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends AuthRmKeyFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, AuthRmKeyFindUniqueOrThrowArgs>
    ): Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T>>

    /**
     * Find the first AuthRmKey that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRmKeyFindFirstArgs} args - Arguments to find a AuthRmKey
     * @example
     * // Get one AuthRmKey
     * const authRmKey = await prisma.authRmKey.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends AuthRmKeyFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, AuthRmKeyFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'AuthRmKey'> extends True ? Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T>> : Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T> | null, null>

    /**
     * Find the first AuthRmKey that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRmKeyFindFirstOrThrowArgs} args - Arguments to find a AuthRmKey
     * @example
     * // Get one AuthRmKey
     * const authRmKey = await prisma.authRmKey.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends AuthRmKeyFindFirstOrThrowArgs>(
      args?: SelectSubset<T, AuthRmKeyFindFirstOrThrowArgs>
    ): Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T>>

    /**
     * Find zero or more AuthRmKeys that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRmKeyFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AuthRmKeys
     * const authRmKeys = await prisma.authRmKey.findMany()
     * 
     * // Get first 10 AuthRmKeys
     * const authRmKeys = await prisma.authRmKey.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const authRmKeyWithSequenceOnly = await prisma.authRmKey.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends AuthRmKeyFindManyArgs>(
      args?: SelectSubset<T, AuthRmKeyFindManyArgs>
    ): PrismaPromise<Array<AuthRmKeyGetPayload<T>>>

    /**
     * Create a AuthRmKey.
     * @param {AuthRmKeyCreateArgs} args - Arguments to create a AuthRmKey.
     * @example
     * // Create one AuthRmKey
     * const AuthRmKey = await prisma.authRmKey.create({
     *   data: {
     *     // ... data to create a AuthRmKey
     *   }
     * })
     * 
    **/
    create<T extends AuthRmKeyCreateArgs>(
      args: SelectSubset<T, AuthRmKeyCreateArgs>
    ): Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T>>

    /**
     * Delete a AuthRmKey.
     * @param {AuthRmKeyDeleteArgs} args - Arguments to delete one AuthRmKey.
     * @example
     * // Delete one AuthRmKey
     * const AuthRmKey = await prisma.authRmKey.delete({
     *   where: {
     *     // ... filter to delete one AuthRmKey
     *   }
     * })
     * 
    **/
    delete<T extends AuthRmKeyDeleteArgs>(
      args: SelectSubset<T, AuthRmKeyDeleteArgs>
    ): Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T>>

    /**
     * Update one AuthRmKey.
     * @param {AuthRmKeyUpdateArgs} args - Arguments to update one AuthRmKey.
     * @example
     * // Update one AuthRmKey
     * const authRmKey = await prisma.authRmKey.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends AuthRmKeyUpdateArgs>(
      args: SelectSubset<T, AuthRmKeyUpdateArgs>
    ): Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T>>

    /**
     * Delete zero or more AuthRmKeys.
     * @param {AuthRmKeyDeleteManyArgs} args - Arguments to filter AuthRmKeys to delete.
     * @example
     * // Delete a few AuthRmKeys
     * const { count } = await prisma.authRmKey.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends AuthRmKeyDeleteManyArgs>(
      args?: SelectSubset<T, AuthRmKeyDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more AuthRmKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRmKeyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AuthRmKeys
     * const authRmKey = await prisma.authRmKey.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends AuthRmKeyUpdateManyArgs>(
      args: SelectSubset<T, AuthRmKeyUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one AuthRmKey.
     * @param {AuthRmKeyUpsertArgs} args - Arguments to update or create a AuthRmKey.
     * @example
     * // Update or create a AuthRmKey
     * const authRmKey = await prisma.authRmKey.upsert({
     *   create: {
     *     // ... data to create a AuthRmKey
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AuthRmKey we want to update
     *   }
     * })
    **/
    upsert<T extends AuthRmKeyUpsertArgs>(
      args: SelectSubset<T, AuthRmKeyUpsertArgs>
    ): Prisma__AuthRmKeyClient<AuthRmKeyGetPayload<T>>

    /**
     * Count the number of AuthRmKeys.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRmKeyCountArgs} args - Arguments to filter AuthRmKeys to count.
     * @example
     * // Count the number of AuthRmKeys
     * const count = await prisma.authRmKey.count({
     *   where: {
     *     // ... the filter for the AuthRmKeys we want to count
     *   }
     * })
    **/
    count<T extends AuthRmKeyCountArgs>(
      args?: Subset<T, AuthRmKeyCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AuthRmKeyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AuthRmKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRmKeyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AuthRmKeyAggregateArgs>(args: Subset<T, AuthRmKeyAggregateArgs>): PrismaPromise<GetAuthRmKeyAggregateType<T>>

    /**
     * Group by AuthRmKey.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AuthRmKeyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AuthRmKeyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AuthRmKeyGroupByArgs['orderBy'] }
        : { orderBy?: AuthRmKeyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AuthRmKeyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuthRmKeyGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for AuthRmKey.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__AuthRmKeyClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * AuthRmKey base type for findUnique actions
   */
  export type AuthRmKeyFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * Filter, which AuthRmKey to fetch.
     * 
    **/
    where: AuthRmKeyWhereUniqueInput
  }

  /**
   * AuthRmKey findUnique
   */
  export interface AuthRmKeyFindUniqueArgs extends AuthRmKeyFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthRmKey findUniqueOrThrow
   */
  export type AuthRmKeyFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * Filter, which AuthRmKey to fetch.
     * 
    **/
    where: AuthRmKeyWhereUniqueInput
  }


  /**
   * AuthRmKey base type for findFirst actions
   */
  export type AuthRmKeyFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * Filter, which AuthRmKey to fetch.
     * 
    **/
    where?: AuthRmKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthRmKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthRmKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthRmKeys.
     * 
    **/
    cursor?: AuthRmKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthRmKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthRmKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthRmKeys.
     * 
    **/
    distinct?: Enumerable<AuthRmKeyScalarFieldEnum>
  }

  /**
   * AuthRmKey findFirst
   */
  export interface AuthRmKeyFindFirstArgs extends AuthRmKeyFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * AuthRmKey findFirstOrThrow
   */
  export type AuthRmKeyFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * Filter, which AuthRmKey to fetch.
     * 
    **/
    where?: AuthRmKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthRmKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthRmKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AuthRmKeys.
     * 
    **/
    cursor?: AuthRmKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthRmKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthRmKeys.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AuthRmKeys.
     * 
    **/
    distinct?: Enumerable<AuthRmKeyScalarFieldEnum>
  }


  /**
   * AuthRmKey findMany
   */
  export type AuthRmKeyFindManyArgs = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * Filter, which AuthRmKeys to fetch.
     * 
    **/
    where?: AuthRmKeyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AuthRmKeys to fetch.
     * 
    **/
    orderBy?: Enumerable<AuthRmKeyOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AuthRmKeys.
     * 
    **/
    cursor?: AuthRmKeyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AuthRmKeys from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AuthRmKeys.
     * 
    **/
    skip?: number
    distinct?: Enumerable<AuthRmKeyScalarFieldEnum>
  }


  /**
   * AuthRmKey create
   */
  export type AuthRmKeyCreateArgs = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * The data needed to create a AuthRmKey.
     * 
    **/
    data: XOR<AuthRmKeyCreateInput, AuthRmKeyUncheckedCreateInput>
  }


  /**
   * AuthRmKey update
   */
  export type AuthRmKeyUpdateArgs = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * The data needed to update a AuthRmKey.
     * 
    **/
    data: XOR<AuthRmKeyUpdateInput, AuthRmKeyUncheckedUpdateInput>
    /**
     * Choose, which AuthRmKey to update.
     * 
    **/
    where: AuthRmKeyWhereUniqueInput
  }


  /**
   * AuthRmKey updateMany
   */
  export type AuthRmKeyUpdateManyArgs = {
    /**
     * The data used to update AuthRmKeys.
     * 
    **/
    data: XOR<AuthRmKeyUpdateManyMutationInput, AuthRmKeyUncheckedUpdateManyInput>
    /**
     * Filter which AuthRmKeys to update
     * 
    **/
    where?: AuthRmKeyWhereInput
  }


  /**
   * AuthRmKey upsert
   */
  export type AuthRmKeyUpsertArgs = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * The filter to search for the AuthRmKey to update in case it exists.
     * 
    **/
    where: AuthRmKeyWhereUniqueInput
    /**
     * In case the AuthRmKey found by the `where` argument doesn't exist, create a new AuthRmKey with this data.
     * 
    **/
    create: XOR<AuthRmKeyCreateInput, AuthRmKeyUncheckedCreateInput>
    /**
     * In case the AuthRmKey was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<AuthRmKeyUpdateInput, AuthRmKeyUncheckedUpdateInput>
  }


  /**
   * AuthRmKey delete
   */
  export type AuthRmKeyDeleteArgs = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
    /**
     * Filter which AuthRmKey to delete.
     * 
    **/
    where: AuthRmKeyWhereUniqueInput
  }


  /**
   * AuthRmKey deleteMany
   */
  export type AuthRmKeyDeleteManyArgs = {
    /**
     * Filter which AuthRmKeys to delete
     * 
    **/
    where?: AuthRmKeyWhereInput
  }


  /**
   * AuthRmKey without action
   */
  export type AuthRmKeyArgs = {
    /**
     * Select specific fields to fetch from the AuthRmKey
     * 
    **/
    select?: AuthRmKeySelect | null
  }



  /**
   * Model InternalXfer
   */


  export type AggregateInternalXfer = {
    _count: InternalXferCountAggregateOutputType | null
    _avg: InternalXferAvgAggregateOutputType | null
    _sum: InternalXferSumAggregateOutputType | null
    _min: InternalXferMinAggregateOutputType | null
    _max: InternalXferMaxAggregateOutputType | null
  }

  export type InternalXferAvgAggregateOutputType = {
    sequence: number | null
    quantity: number | null
  }

  export type InternalXferSumAggregateOutputType = {
    sequence: bigint | null
    quantity: number | null
  }

  export type InternalXferMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    from_boid_id: string | null
    to_boid_id: string | null
    quantity: number | null
    memo: string | null
  }

  export type InternalXferMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    from_boid_id: string | null
    to_boid_id: string | null
    quantity: number | null
    memo: string | null
  }

  export type InternalXferCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    from_boid_id: number
    to_boid_id: number
    quantity: number
    memo: number
    _all: number
  }


  export type InternalXferAvgAggregateInputType = {
    sequence?: true
    quantity?: true
  }

  export type InternalXferSumAggregateInputType = {
    sequence?: true
    quantity?: true
  }

  export type InternalXferMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    from_boid_id?: true
    to_boid_id?: true
    quantity?: true
    memo?: true
  }

  export type InternalXferMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    from_boid_id?: true
    to_boid_id?: true
    quantity?: true
    memo?: true
  }

  export type InternalXferCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    from_boid_id?: true
    to_boid_id?: true
    quantity?: true
    memo?: true
    _all?: true
  }

  export type InternalXferAggregateArgs = {
    /**
     * Filter which InternalXfer to aggregate.
     * 
    **/
    where?: InternalXferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InternalXfers to fetch.
     * 
    **/
    orderBy?: Enumerable<InternalXferOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InternalXferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InternalXfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InternalXfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InternalXfers
    **/
    _count?: true | InternalXferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InternalXferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InternalXferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InternalXferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InternalXferMaxAggregateInputType
  }

  export type GetInternalXferAggregateType<T extends InternalXferAggregateArgs> = {
        [P in keyof T & keyof AggregateInternalXfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInternalXfer[P]>
      : GetScalarType<T[P], AggregateInternalXfer[P]>
  }




  export type InternalXferGroupByArgs = {
    where?: InternalXferWhereInput
    orderBy?: Enumerable<InternalXferOrderByWithAggregationInput>
    by: Array<InternalXferScalarFieldEnum>
    having?: InternalXferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InternalXferCountAggregateInputType | true
    _avg?: InternalXferAvgAggregateInputType
    _sum?: InternalXferSumAggregateInputType
    _min?: InternalXferMinAggregateInputType
    _max?: InternalXferMaxAggregateInputType
  }


  export type InternalXferGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    from_boid_id: string
    to_boid_id: string
    quantity: number
    memo: string | null
    _count: InternalXferCountAggregateOutputType | null
    _avg: InternalXferAvgAggregateOutputType | null
    _sum: InternalXferSumAggregateOutputType | null
    _min: InternalXferMinAggregateOutputType | null
    _max: InternalXferMaxAggregateOutputType | null
  }

  type GetInternalXferGroupByPayload<T extends InternalXferGroupByArgs> = PrismaPromise<
    Array<
      PickArray<InternalXferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InternalXferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InternalXferGroupByOutputType[P]>
            : GetScalarType<T[P], InternalXferGroupByOutputType[P]>
        }
      >
    >


  export type InternalXferSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    from_boid_id?: boolean
    to_boid_id?: boolean
    quantity?: boolean
    memo?: boolean
  }


  export type InternalXferGetPayload<S extends boolean | null | undefined | InternalXferArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? InternalXfer :
    S extends undefined ? never :
    S extends { include: any } & (InternalXferArgs | InternalXferFindManyArgs)
    ? InternalXfer 
    : S extends { select: any } & (InternalXferArgs | InternalXferFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof InternalXfer ? InternalXfer[P] : never
  } 
      : InternalXfer


  type InternalXferCountArgs = Merge<
    Omit<InternalXferFindManyArgs, 'select' | 'include'> & {
      select?: InternalXferCountAggregateInputType | true
    }
  >

  export interface InternalXferDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one InternalXfer that matches the filter.
     * @param {InternalXferFindUniqueArgs} args - Arguments to find a InternalXfer
     * @example
     * // Get one InternalXfer
     * const internalXfer = await prisma.internalXfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InternalXferFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InternalXferFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InternalXfer'> extends True ? Prisma__InternalXferClient<InternalXferGetPayload<T>> : Prisma__InternalXferClient<InternalXferGetPayload<T> | null, null>

    /**
     * Find one InternalXfer that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InternalXferFindUniqueOrThrowArgs} args - Arguments to find a InternalXfer
     * @example
     * // Get one InternalXfer
     * const internalXfer = await prisma.internalXfer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InternalXferFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, InternalXferFindUniqueOrThrowArgs>
    ): Prisma__InternalXferClient<InternalXferGetPayload<T>>

    /**
     * Find the first InternalXfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalXferFindFirstArgs} args - Arguments to find a InternalXfer
     * @example
     * // Get one InternalXfer
     * const internalXfer = await prisma.internalXfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InternalXferFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InternalXferFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InternalXfer'> extends True ? Prisma__InternalXferClient<InternalXferGetPayload<T>> : Prisma__InternalXferClient<InternalXferGetPayload<T> | null, null>

    /**
     * Find the first InternalXfer that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalXferFindFirstOrThrowArgs} args - Arguments to find a InternalXfer
     * @example
     * // Get one InternalXfer
     * const internalXfer = await prisma.internalXfer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InternalXferFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InternalXferFindFirstOrThrowArgs>
    ): Prisma__InternalXferClient<InternalXferGetPayload<T>>

    /**
     * Find zero or more InternalXfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalXferFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InternalXfers
     * const internalXfers = await prisma.internalXfer.findMany()
     * 
     * // Get first 10 InternalXfers
     * const internalXfers = await prisma.internalXfer.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const internalXferWithSequenceOnly = await prisma.internalXfer.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends InternalXferFindManyArgs>(
      args?: SelectSubset<T, InternalXferFindManyArgs>
    ): PrismaPromise<Array<InternalXferGetPayload<T>>>

    /**
     * Create a InternalXfer.
     * @param {InternalXferCreateArgs} args - Arguments to create a InternalXfer.
     * @example
     * // Create one InternalXfer
     * const InternalXfer = await prisma.internalXfer.create({
     *   data: {
     *     // ... data to create a InternalXfer
     *   }
     * })
     * 
    **/
    create<T extends InternalXferCreateArgs>(
      args: SelectSubset<T, InternalXferCreateArgs>
    ): Prisma__InternalXferClient<InternalXferGetPayload<T>>

    /**
     * Delete a InternalXfer.
     * @param {InternalXferDeleteArgs} args - Arguments to delete one InternalXfer.
     * @example
     * // Delete one InternalXfer
     * const InternalXfer = await prisma.internalXfer.delete({
     *   where: {
     *     // ... filter to delete one InternalXfer
     *   }
     * })
     * 
    **/
    delete<T extends InternalXferDeleteArgs>(
      args: SelectSubset<T, InternalXferDeleteArgs>
    ): Prisma__InternalXferClient<InternalXferGetPayload<T>>

    /**
     * Update one InternalXfer.
     * @param {InternalXferUpdateArgs} args - Arguments to update one InternalXfer.
     * @example
     * // Update one InternalXfer
     * const internalXfer = await prisma.internalXfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InternalXferUpdateArgs>(
      args: SelectSubset<T, InternalXferUpdateArgs>
    ): Prisma__InternalXferClient<InternalXferGetPayload<T>>

    /**
     * Delete zero or more InternalXfers.
     * @param {InternalXferDeleteManyArgs} args - Arguments to filter InternalXfers to delete.
     * @example
     * // Delete a few InternalXfers
     * const { count } = await prisma.internalXfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InternalXferDeleteManyArgs>(
      args?: SelectSubset<T, InternalXferDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more InternalXfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalXferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InternalXfers
     * const internalXfer = await prisma.internalXfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InternalXferUpdateManyArgs>(
      args: SelectSubset<T, InternalXferUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one InternalXfer.
     * @param {InternalXferUpsertArgs} args - Arguments to update or create a InternalXfer.
     * @example
     * // Update or create a InternalXfer
     * const internalXfer = await prisma.internalXfer.upsert({
     *   create: {
     *     // ... data to create a InternalXfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InternalXfer we want to update
     *   }
     * })
    **/
    upsert<T extends InternalXferUpsertArgs>(
      args: SelectSubset<T, InternalXferUpsertArgs>
    ): Prisma__InternalXferClient<InternalXferGetPayload<T>>

    /**
     * Count the number of InternalXfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalXferCountArgs} args - Arguments to filter InternalXfers to count.
     * @example
     * // Count the number of InternalXfers
     * const count = await prisma.internalXfer.count({
     *   where: {
     *     // ... the filter for the InternalXfers we want to count
     *   }
     * })
    **/
    count<T extends InternalXferCountArgs>(
      args?: Subset<T, InternalXferCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InternalXferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InternalXfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalXferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InternalXferAggregateArgs>(args: Subset<T, InternalXferAggregateArgs>): PrismaPromise<GetInternalXferAggregateType<T>>

    /**
     * Group by InternalXfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InternalXferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InternalXferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InternalXferGroupByArgs['orderBy'] }
        : { orderBy?: InternalXferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InternalXferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInternalXferGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InternalXfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InternalXferClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * InternalXfer base type for findUnique actions
   */
  export type InternalXferFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * Filter, which InternalXfer to fetch.
     * 
    **/
    where: InternalXferWhereUniqueInput
  }

  /**
   * InternalXfer findUnique
   */
  export interface InternalXferFindUniqueArgs extends InternalXferFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InternalXfer findUniqueOrThrow
   */
  export type InternalXferFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * Filter, which InternalXfer to fetch.
     * 
    **/
    where: InternalXferWhereUniqueInput
  }


  /**
   * InternalXfer base type for findFirst actions
   */
  export type InternalXferFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * Filter, which InternalXfer to fetch.
     * 
    **/
    where?: InternalXferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InternalXfers to fetch.
     * 
    **/
    orderBy?: Enumerable<InternalXferOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InternalXfers.
     * 
    **/
    cursor?: InternalXferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InternalXfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InternalXfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InternalXfers.
     * 
    **/
    distinct?: Enumerable<InternalXferScalarFieldEnum>
  }

  /**
   * InternalXfer findFirst
   */
  export interface InternalXferFindFirstArgs extends InternalXferFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InternalXfer findFirstOrThrow
   */
  export type InternalXferFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * Filter, which InternalXfer to fetch.
     * 
    **/
    where?: InternalXferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InternalXfers to fetch.
     * 
    **/
    orderBy?: Enumerable<InternalXferOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InternalXfers.
     * 
    **/
    cursor?: InternalXferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InternalXfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InternalXfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InternalXfers.
     * 
    **/
    distinct?: Enumerable<InternalXferScalarFieldEnum>
  }


  /**
   * InternalXfer findMany
   */
  export type InternalXferFindManyArgs = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * Filter, which InternalXfers to fetch.
     * 
    **/
    where?: InternalXferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InternalXfers to fetch.
     * 
    **/
    orderBy?: Enumerable<InternalXferOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InternalXfers.
     * 
    **/
    cursor?: InternalXferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InternalXfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InternalXfers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InternalXferScalarFieldEnum>
  }


  /**
   * InternalXfer create
   */
  export type InternalXferCreateArgs = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * The data needed to create a InternalXfer.
     * 
    **/
    data: XOR<InternalXferCreateInput, InternalXferUncheckedCreateInput>
  }


  /**
   * InternalXfer update
   */
  export type InternalXferUpdateArgs = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * The data needed to update a InternalXfer.
     * 
    **/
    data: XOR<InternalXferUpdateInput, InternalXferUncheckedUpdateInput>
    /**
     * Choose, which InternalXfer to update.
     * 
    **/
    where: InternalXferWhereUniqueInput
  }


  /**
   * InternalXfer updateMany
   */
  export type InternalXferUpdateManyArgs = {
    /**
     * The data used to update InternalXfers.
     * 
    **/
    data: XOR<InternalXferUpdateManyMutationInput, InternalXferUncheckedUpdateManyInput>
    /**
     * Filter which InternalXfers to update
     * 
    **/
    where?: InternalXferWhereInput
  }


  /**
   * InternalXfer upsert
   */
  export type InternalXferUpsertArgs = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * The filter to search for the InternalXfer to update in case it exists.
     * 
    **/
    where: InternalXferWhereUniqueInput
    /**
     * In case the InternalXfer found by the `where` argument doesn't exist, create a new InternalXfer with this data.
     * 
    **/
    create: XOR<InternalXferCreateInput, InternalXferUncheckedCreateInput>
    /**
     * In case the InternalXfer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InternalXferUpdateInput, InternalXferUncheckedUpdateInput>
  }


  /**
   * InternalXfer delete
   */
  export type InternalXferDeleteArgs = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
    /**
     * Filter which InternalXfer to delete.
     * 
    **/
    where: InternalXferWhereUniqueInput
  }


  /**
   * InternalXfer deleteMany
   */
  export type InternalXferDeleteManyArgs = {
    /**
     * Filter which InternalXfers to delete
     * 
    **/
    where?: InternalXferWhereInput
  }


  /**
   * InternalXfer without action
   */
  export type InternalXferArgs = {
    /**
     * Select specific fields to fetch from the InternalXfer
     * 
    **/
    select?: InternalXferSelect | null
  }



  /**
   * Model InviteAdd
   */


  export type AggregateInviteAdd = {
    _count: InviteAddCountAggregateOutputType | null
    _avg: InviteAddAvgAggregateOutputType | null
    _sum: InviteAddSumAggregateOutputType | null
    _min: InviteAddMinAggregateOutputType | null
    _max: InviteAddMaxAggregateOutputType | null
  }

  export type InviteAddAvgAggregateOutputType = {
    sequence: number | null
  }

  export type InviteAddSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type InviteAddMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    invite_code: string | null
    key: string | null
  }

  export type InviteAddMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    invite_code: string | null
    key: string | null
  }

  export type InviteAddCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    invite_code: number
    key: number
    _all: number
  }


  export type InviteAddAvgAggregateInputType = {
    sequence?: true
  }

  export type InviteAddSumAggregateInputType = {
    sequence?: true
  }

  export type InviteAddMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    invite_code?: true
    key?: true
  }

  export type InviteAddMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    invite_code?: true
    key?: true
  }

  export type InviteAddCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    invite_code?: true
    key?: true
    _all?: true
  }

  export type InviteAddAggregateArgs = {
    /**
     * Filter which InviteAdd to aggregate.
     * 
    **/
    where?: InviteAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InviteAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InviteAdds
    **/
    _count?: true | InviteAddCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InviteAddAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InviteAddSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InviteAddMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InviteAddMaxAggregateInputType
  }

  export type GetInviteAddAggregateType<T extends InviteAddAggregateArgs> = {
        [P in keyof T & keyof AggregateInviteAdd]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInviteAdd[P]>
      : GetScalarType<T[P], AggregateInviteAdd[P]>
  }




  export type InviteAddGroupByArgs = {
    where?: InviteAddWhereInput
    orderBy?: Enumerable<InviteAddOrderByWithAggregationInput>
    by: Array<InviteAddScalarFieldEnum>
    having?: InviteAddScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InviteAddCountAggregateInputType | true
    _avg?: InviteAddAvgAggregateInputType
    _sum?: InviteAddSumAggregateInputType
    _min?: InviteAddMinAggregateInputType
    _max?: InviteAddMaxAggregateInputType
  }


  export type InviteAddGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    invite_code: string
    key: string
    _count: InviteAddCountAggregateOutputType | null
    _avg: InviteAddAvgAggregateOutputType | null
    _sum: InviteAddSumAggregateOutputType | null
    _min: InviteAddMinAggregateOutputType | null
    _max: InviteAddMaxAggregateOutputType | null
  }

  type GetInviteAddGroupByPayload<T extends InviteAddGroupByArgs> = PrismaPromise<
    Array<
      PickArray<InviteAddGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InviteAddGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InviteAddGroupByOutputType[P]>
            : GetScalarType<T[P], InviteAddGroupByOutputType[P]>
        }
      >
    >


  export type InviteAddSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    invite_code?: boolean
    key?: boolean
  }


  export type InviteAddGetPayload<S extends boolean | null | undefined | InviteAddArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? InviteAdd :
    S extends undefined ? never :
    S extends { include: any } & (InviteAddArgs | InviteAddFindManyArgs)
    ? InviteAdd 
    : S extends { select: any } & (InviteAddArgs | InviteAddFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof InviteAdd ? InviteAdd[P] : never
  } 
      : InviteAdd


  type InviteAddCountArgs = Merge<
    Omit<InviteAddFindManyArgs, 'select' | 'include'> & {
      select?: InviteAddCountAggregateInputType | true
    }
  >

  export interface InviteAddDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one InviteAdd that matches the filter.
     * @param {InviteAddFindUniqueArgs} args - Arguments to find a InviteAdd
     * @example
     * // Get one InviteAdd
     * const inviteAdd = await prisma.inviteAdd.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InviteAddFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InviteAddFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InviteAdd'> extends True ? Prisma__InviteAddClient<InviteAddGetPayload<T>> : Prisma__InviteAddClient<InviteAddGetPayload<T> | null, null>

    /**
     * Find one InviteAdd that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InviteAddFindUniqueOrThrowArgs} args - Arguments to find a InviteAdd
     * @example
     * // Get one InviteAdd
     * const inviteAdd = await prisma.inviteAdd.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InviteAddFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, InviteAddFindUniqueOrThrowArgs>
    ): Prisma__InviteAddClient<InviteAddGetPayload<T>>

    /**
     * Find the first InviteAdd that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteAddFindFirstArgs} args - Arguments to find a InviteAdd
     * @example
     * // Get one InviteAdd
     * const inviteAdd = await prisma.inviteAdd.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InviteAddFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InviteAddFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InviteAdd'> extends True ? Prisma__InviteAddClient<InviteAddGetPayload<T>> : Prisma__InviteAddClient<InviteAddGetPayload<T> | null, null>

    /**
     * Find the first InviteAdd that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteAddFindFirstOrThrowArgs} args - Arguments to find a InviteAdd
     * @example
     * // Get one InviteAdd
     * const inviteAdd = await prisma.inviteAdd.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InviteAddFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InviteAddFindFirstOrThrowArgs>
    ): Prisma__InviteAddClient<InviteAddGetPayload<T>>

    /**
     * Find zero or more InviteAdds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteAddFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InviteAdds
     * const inviteAdds = await prisma.inviteAdd.findMany()
     * 
     * // Get first 10 InviteAdds
     * const inviteAdds = await prisma.inviteAdd.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const inviteAddWithSequenceOnly = await prisma.inviteAdd.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends InviteAddFindManyArgs>(
      args?: SelectSubset<T, InviteAddFindManyArgs>
    ): PrismaPromise<Array<InviteAddGetPayload<T>>>

    /**
     * Create a InviteAdd.
     * @param {InviteAddCreateArgs} args - Arguments to create a InviteAdd.
     * @example
     * // Create one InviteAdd
     * const InviteAdd = await prisma.inviteAdd.create({
     *   data: {
     *     // ... data to create a InviteAdd
     *   }
     * })
     * 
    **/
    create<T extends InviteAddCreateArgs>(
      args: SelectSubset<T, InviteAddCreateArgs>
    ): Prisma__InviteAddClient<InviteAddGetPayload<T>>

    /**
     * Delete a InviteAdd.
     * @param {InviteAddDeleteArgs} args - Arguments to delete one InviteAdd.
     * @example
     * // Delete one InviteAdd
     * const InviteAdd = await prisma.inviteAdd.delete({
     *   where: {
     *     // ... filter to delete one InviteAdd
     *   }
     * })
     * 
    **/
    delete<T extends InviteAddDeleteArgs>(
      args: SelectSubset<T, InviteAddDeleteArgs>
    ): Prisma__InviteAddClient<InviteAddGetPayload<T>>

    /**
     * Update one InviteAdd.
     * @param {InviteAddUpdateArgs} args - Arguments to update one InviteAdd.
     * @example
     * // Update one InviteAdd
     * const inviteAdd = await prisma.inviteAdd.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InviteAddUpdateArgs>(
      args: SelectSubset<T, InviteAddUpdateArgs>
    ): Prisma__InviteAddClient<InviteAddGetPayload<T>>

    /**
     * Delete zero or more InviteAdds.
     * @param {InviteAddDeleteManyArgs} args - Arguments to filter InviteAdds to delete.
     * @example
     * // Delete a few InviteAdds
     * const { count } = await prisma.inviteAdd.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InviteAddDeleteManyArgs>(
      args?: SelectSubset<T, InviteAddDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more InviteAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteAddUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InviteAdds
     * const inviteAdd = await prisma.inviteAdd.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InviteAddUpdateManyArgs>(
      args: SelectSubset<T, InviteAddUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one InviteAdd.
     * @param {InviteAddUpsertArgs} args - Arguments to update or create a InviteAdd.
     * @example
     * // Update or create a InviteAdd
     * const inviteAdd = await prisma.inviteAdd.upsert({
     *   create: {
     *     // ... data to create a InviteAdd
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InviteAdd we want to update
     *   }
     * })
    **/
    upsert<T extends InviteAddUpsertArgs>(
      args: SelectSubset<T, InviteAddUpsertArgs>
    ): Prisma__InviteAddClient<InviteAddGetPayload<T>>

    /**
     * Count the number of InviteAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteAddCountArgs} args - Arguments to filter InviteAdds to count.
     * @example
     * // Count the number of InviteAdds
     * const count = await prisma.inviteAdd.count({
     *   where: {
     *     // ... the filter for the InviteAdds we want to count
     *   }
     * })
    **/
    count<T extends InviteAddCountArgs>(
      args?: Subset<T, InviteAddCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InviteAddCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InviteAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteAddAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InviteAddAggregateArgs>(args: Subset<T, InviteAddAggregateArgs>): PrismaPromise<GetInviteAddAggregateType<T>>

    /**
     * Group by InviteAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteAddGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InviteAddGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InviteAddGroupByArgs['orderBy'] }
        : { orderBy?: InviteAddGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InviteAddGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInviteAddGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InviteAdd.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InviteAddClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * InviteAdd base type for findUnique actions
   */
  export type InviteAddFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * Filter, which InviteAdd to fetch.
     * 
    **/
    where: InviteAddWhereUniqueInput
  }

  /**
   * InviteAdd findUnique
   */
  export interface InviteAddFindUniqueArgs extends InviteAddFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InviteAdd findUniqueOrThrow
   */
  export type InviteAddFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * Filter, which InviteAdd to fetch.
     * 
    **/
    where: InviteAddWhereUniqueInput
  }


  /**
   * InviteAdd base type for findFirst actions
   */
  export type InviteAddFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * Filter, which InviteAdd to fetch.
     * 
    **/
    where?: InviteAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteAdds.
     * 
    **/
    cursor?: InviteAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteAdds.
     * 
    **/
    distinct?: Enumerable<InviteAddScalarFieldEnum>
  }

  /**
   * InviteAdd findFirst
   */
  export interface InviteAddFindFirstArgs extends InviteAddFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InviteAdd findFirstOrThrow
   */
  export type InviteAddFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * Filter, which InviteAdd to fetch.
     * 
    **/
    where?: InviteAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteAdds.
     * 
    **/
    cursor?: InviteAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteAdds.
     * 
    **/
    distinct?: Enumerable<InviteAddScalarFieldEnum>
  }


  /**
   * InviteAdd findMany
   */
  export type InviteAddFindManyArgs = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * Filter, which InviteAdds to fetch.
     * 
    **/
    where?: InviteAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InviteAdds.
     * 
    **/
    cursor?: InviteAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteAdds.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InviteAddScalarFieldEnum>
  }


  /**
   * InviteAdd create
   */
  export type InviteAddCreateArgs = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * The data needed to create a InviteAdd.
     * 
    **/
    data: XOR<InviteAddCreateInput, InviteAddUncheckedCreateInput>
  }


  /**
   * InviteAdd update
   */
  export type InviteAddUpdateArgs = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * The data needed to update a InviteAdd.
     * 
    **/
    data: XOR<InviteAddUpdateInput, InviteAddUncheckedUpdateInput>
    /**
     * Choose, which InviteAdd to update.
     * 
    **/
    where: InviteAddWhereUniqueInput
  }


  /**
   * InviteAdd updateMany
   */
  export type InviteAddUpdateManyArgs = {
    /**
     * The data used to update InviteAdds.
     * 
    **/
    data: XOR<InviteAddUpdateManyMutationInput, InviteAddUncheckedUpdateManyInput>
    /**
     * Filter which InviteAdds to update
     * 
    **/
    where?: InviteAddWhereInput
  }


  /**
   * InviteAdd upsert
   */
  export type InviteAddUpsertArgs = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * The filter to search for the InviteAdd to update in case it exists.
     * 
    **/
    where: InviteAddWhereUniqueInput
    /**
     * In case the InviteAdd found by the `where` argument doesn't exist, create a new InviteAdd with this data.
     * 
    **/
    create: XOR<InviteAddCreateInput, InviteAddUncheckedCreateInput>
    /**
     * In case the InviteAdd was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InviteAddUpdateInput, InviteAddUncheckedUpdateInput>
  }


  /**
   * InviteAdd delete
   */
  export type InviteAddDeleteArgs = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
    /**
     * Filter which InviteAdd to delete.
     * 
    **/
    where: InviteAddWhereUniqueInput
  }


  /**
   * InviteAdd deleteMany
   */
  export type InviteAddDeleteManyArgs = {
    /**
     * Filter which InviteAdds to delete
     * 
    **/
    where?: InviteAddWhereInput
  }


  /**
   * InviteAdd without action
   */
  export type InviteAddArgs = {
    /**
     * Select specific fields to fetch from the InviteAdd
     * 
    **/
    select?: InviteAddSelect | null
  }



  /**
   * Model InviteClaim
   */


  export type AggregateInviteClaim = {
    _count: InviteClaimCountAggregateOutputType | null
    _avg: InviteClaimAvgAggregateOutputType | null
    _sum: InviteClaimSumAggregateOutputType | null
    _min: InviteClaimMinAggregateOutputType | null
    _max: InviteClaimMaxAggregateOutputType | null
  }

  export type InviteClaimAvgAggregateOutputType = {
    sequence: number | null
  }

  export type InviteClaimSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type InviteClaimMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    sponsor_boid_id: string | null
    invite_code: string | null
    sig: string | null
    create_boid_id: string | null
    create_key: string | null
    create_owner: string | null
  }

  export type InviteClaimMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    sponsor_boid_id: string | null
    invite_code: string | null
    sig: string | null
    create_boid_id: string | null
    create_key: string | null
    create_owner: string | null
  }

  export type InviteClaimCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    sponsor_boid_id: number
    invite_code: number
    sig: number
    create_boid_id: number
    create_key: number
    create_owner: number
    _all: number
  }


  export type InviteClaimAvgAggregateInputType = {
    sequence?: true
  }

  export type InviteClaimSumAggregateInputType = {
    sequence?: true
  }

  export type InviteClaimMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    sponsor_boid_id?: true
    invite_code?: true
    sig?: true
    create_boid_id?: true
    create_key?: true
    create_owner?: true
  }

  export type InviteClaimMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    sponsor_boid_id?: true
    invite_code?: true
    sig?: true
    create_boid_id?: true
    create_key?: true
    create_owner?: true
  }

  export type InviteClaimCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    sponsor_boid_id?: true
    invite_code?: true
    sig?: true
    create_boid_id?: true
    create_key?: true
    create_owner?: true
    _all?: true
  }

  export type InviteClaimAggregateArgs = {
    /**
     * Filter which InviteClaim to aggregate.
     * 
    **/
    where?: InviteClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InviteClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InviteClaims
    **/
    _count?: true | InviteClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InviteClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InviteClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InviteClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InviteClaimMaxAggregateInputType
  }

  export type GetInviteClaimAggregateType<T extends InviteClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateInviteClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInviteClaim[P]>
      : GetScalarType<T[P], AggregateInviteClaim[P]>
  }




  export type InviteClaimGroupByArgs = {
    where?: InviteClaimWhereInput
    orderBy?: Enumerable<InviteClaimOrderByWithAggregationInput>
    by: Array<InviteClaimScalarFieldEnum>
    having?: InviteClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InviteClaimCountAggregateInputType | true
    _avg?: InviteClaimAvgAggregateInputType
    _sum?: InviteClaimSumAggregateInputType
    _min?: InviteClaimMinAggregateInputType
    _max?: InviteClaimMaxAggregateInputType
  }


  export type InviteClaimGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    sponsor_boid_id: string
    invite_code: string
    sig: string
    create_boid_id: string
    create_key: string | null
    create_owner: string | null
    _count: InviteClaimCountAggregateOutputType | null
    _avg: InviteClaimAvgAggregateOutputType | null
    _sum: InviteClaimSumAggregateOutputType | null
    _min: InviteClaimMinAggregateOutputType | null
    _max: InviteClaimMaxAggregateOutputType | null
  }

  type GetInviteClaimGroupByPayload<T extends InviteClaimGroupByArgs> = PrismaPromise<
    Array<
      PickArray<InviteClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InviteClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InviteClaimGroupByOutputType[P]>
            : GetScalarType<T[P], InviteClaimGroupByOutputType[P]>
        }
      >
    >


  export type InviteClaimSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    sponsor_boid_id?: boolean
    invite_code?: boolean
    sig?: boolean
    create_boid_id?: boolean
    create_key?: boolean
    create_owner?: boolean
  }


  export type InviteClaimGetPayload<S extends boolean | null | undefined | InviteClaimArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? InviteClaim :
    S extends undefined ? never :
    S extends { include: any } & (InviteClaimArgs | InviteClaimFindManyArgs)
    ? InviteClaim 
    : S extends { select: any } & (InviteClaimArgs | InviteClaimFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof InviteClaim ? InviteClaim[P] : never
  } 
      : InviteClaim


  type InviteClaimCountArgs = Merge<
    Omit<InviteClaimFindManyArgs, 'select' | 'include'> & {
      select?: InviteClaimCountAggregateInputType | true
    }
  >

  export interface InviteClaimDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one InviteClaim that matches the filter.
     * @param {InviteClaimFindUniqueArgs} args - Arguments to find a InviteClaim
     * @example
     * // Get one InviteClaim
     * const inviteClaim = await prisma.inviteClaim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InviteClaimFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InviteClaimFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InviteClaim'> extends True ? Prisma__InviteClaimClient<InviteClaimGetPayload<T>> : Prisma__InviteClaimClient<InviteClaimGetPayload<T> | null, null>

    /**
     * Find one InviteClaim that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InviteClaimFindUniqueOrThrowArgs} args - Arguments to find a InviteClaim
     * @example
     * // Get one InviteClaim
     * const inviteClaim = await prisma.inviteClaim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InviteClaimFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, InviteClaimFindUniqueOrThrowArgs>
    ): Prisma__InviteClaimClient<InviteClaimGetPayload<T>>

    /**
     * Find the first InviteClaim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteClaimFindFirstArgs} args - Arguments to find a InviteClaim
     * @example
     * // Get one InviteClaim
     * const inviteClaim = await prisma.inviteClaim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InviteClaimFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InviteClaimFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InviteClaim'> extends True ? Prisma__InviteClaimClient<InviteClaimGetPayload<T>> : Prisma__InviteClaimClient<InviteClaimGetPayload<T> | null, null>

    /**
     * Find the first InviteClaim that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteClaimFindFirstOrThrowArgs} args - Arguments to find a InviteClaim
     * @example
     * // Get one InviteClaim
     * const inviteClaim = await prisma.inviteClaim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InviteClaimFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InviteClaimFindFirstOrThrowArgs>
    ): Prisma__InviteClaimClient<InviteClaimGetPayload<T>>

    /**
     * Find zero or more InviteClaims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteClaimFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InviteClaims
     * const inviteClaims = await prisma.inviteClaim.findMany()
     * 
     * // Get first 10 InviteClaims
     * const inviteClaims = await prisma.inviteClaim.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const inviteClaimWithSequenceOnly = await prisma.inviteClaim.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends InviteClaimFindManyArgs>(
      args?: SelectSubset<T, InviteClaimFindManyArgs>
    ): PrismaPromise<Array<InviteClaimGetPayload<T>>>

    /**
     * Create a InviteClaim.
     * @param {InviteClaimCreateArgs} args - Arguments to create a InviteClaim.
     * @example
     * // Create one InviteClaim
     * const InviteClaim = await prisma.inviteClaim.create({
     *   data: {
     *     // ... data to create a InviteClaim
     *   }
     * })
     * 
    **/
    create<T extends InviteClaimCreateArgs>(
      args: SelectSubset<T, InviteClaimCreateArgs>
    ): Prisma__InviteClaimClient<InviteClaimGetPayload<T>>

    /**
     * Delete a InviteClaim.
     * @param {InviteClaimDeleteArgs} args - Arguments to delete one InviteClaim.
     * @example
     * // Delete one InviteClaim
     * const InviteClaim = await prisma.inviteClaim.delete({
     *   where: {
     *     // ... filter to delete one InviteClaim
     *   }
     * })
     * 
    **/
    delete<T extends InviteClaimDeleteArgs>(
      args: SelectSubset<T, InviteClaimDeleteArgs>
    ): Prisma__InviteClaimClient<InviteClaimGetPayload<T>>

    /**
     * Update one InviteClaim.
     * @param {InviteClaimUpdateArgs} args - Arguments to update one InviteClaim.
     * @example
     * // Update one InviteClaim
     * const inviteClaim = await prisma.inviteClaim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InviteClaimUpdateArgs>(
      args: SelectSubset<T, InviteClaimUpdateArgs>
    ): Prisma__InviteClaimClient<InviteClaimGetPayload<T>>

    /**
     * Delete zero or more InviteClaims.
     * @param {InviteClaimDeleteManyArgs} args - Arguments to filter InviteClaims to delete.
     * @example
     * // Delete a few InviteClaims
     * const { count } = await prisma.inviteClaim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InviteClaimDeleteManyArgs>(
      args?: SelectSubset<T, InviteClaimDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more InviteClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InviteClaims
     * const inviteClaim = await prisma.inviteClaim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InviteClaimUpdateManyArgs>(
      args: SelectSubset<T, InviteClaimUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one InviteClaim.
     * @param {InviteClaimUpsertArgs} args - Arguments to update or create a InviteClaim.
     * @example
     * // Update or create a InviteClaim
     * const inviteClaim = await prisma.inviteClaim.upsert({
     *   create: {
     *     // ... data to create a InviteClaim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InviteClaim we want to update
     *   }
     * })
    **/
    upsert<T extends InviteClaimUpsertArgs>(
      args: SelectSubset<T, InviteClaimUpsertArgs>
    ): Prisma__InviteClaimClient<InviteClaimGetPayload<T>>

    /**
     * Count the number of InviteClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteClaimCountArgs} args - Arguments to filter InviteClaims to count.
     * @example
     * // Count the number of InviteClaims
     * const count = await prisma.inviteClaim.count({
     *   where: {
     *     // ... the filter for the InviteClaims we want to count
     *   }
     * })
    **/
    count<T extends InviteClaimCountArgs>(
      args?: Subset<T, InviteClaimCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InviteClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InviteClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InviteClaimAggregateArgs>(args: Subset<T, InviteClaimAggregateArgs>): PrismaPromise<GetInviteClaimAggregateType<T>>

    /**
     * Group by InviteClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteClaimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InviteClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InviteClaimGroupByArgs['orderBy'] }
        : { orderBy?: InviteClaimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InviteClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInviteClaimGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InviteClaim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InviteClaimClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * InviteClaim base type for findUnique actions
   */
  export type InviteClaimFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * Filter, which InviteClaim to fetch.
     * 
    **/
    where: InviteClaimWhereUniqueInput
  }

  /**
   * InviteClaim findUnique
   */
  export interface InviteClaimFindUniqueArgs extends InviteClaimFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InviteClaim findUniqueOrThrow
   */
  export type InviteClaimFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * Filter, which InviteClaim to fetch.
     * 
    **/
    where: InviteClaimWhereUniqueInput
  }


  /**
   * InviteClaim base type for findFirst actions
   */
  export type InviteClaimFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * Filter, which InviteClaim to fetch.
     * 
    **/
    where?: InviteClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteClaims.
     * 
    **/
    cursor?: InviteClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteClaims.
     * 
    **/
    distinct?: Enumerable<InviteClaimScalarFieldEnum>
  }

  /**
   * InviteClaim findFirst
   */
  export interface InviteClaimFindFirstArgs extends InviteClaimFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InviteClaim findFirstOrThrow
   */
  export type InviteClaimFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * Filter, which InviteClaim to fetch.
     * 
    **/
    where?: InviteClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteClaims.
     * 
    **/
    cursor?: InviteClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteClaims.
     * 
    **/
    distinct?: Enumerable<InviteClaimScalarFieldEnum>
  }


  /**
   * InviteClaim findMany
   */
  export type InviteClaimFindManyArgs = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * Filter, which InviteClaims to fetch.
     * 
    **/
    where?: InviteClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InviteClaims.
     * 
    **/
    cursor?: InviteClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteClaims.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InviteClaimScalarFieldEnum>
  }


  /**
   * InviteClaim create
   */
  export type InviteClaimCreateArgs = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * The data needed to create a InviteClaim.
     * 
    **/
    data: XOR<InviteClaimCreateInput, InviteClaimUncheckedCreateInput>
  }


  /**
   * InviteClaim update
   */
  export type InviteClaimUpdateArgs = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * The data needed to update a InviteClaim.
     * 
    **/
    data: XOR<InviteClaimUpdateInput, InviteClaimUncheckedUpdateInput>
    /**
     * Choose, which InviteClaim to update.
     * 
    **/
    where: InviteClaimWhereUniqueInput
  }


  /**
   * InviteClaim updateMany
   */
  export type InviteClaimUpdateManyArgs = {
    /**
     * The data used to update InviteClaims.
     * 
    **/
    data: XOR<InviteClaimUpdateManyMutationInput, InviteClaimUncheckedUpdateManyInput>
    /**
     * Filter which InviteClaims to update
     * 
    **/
    where?: InviteClaimWhereInput
  }


  /**
   * InviteClaim upsert
   */
  export type InviteClaimUpsertArgs = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * The filter to search for the InviteClaim to update in case it exists.
     * 
    **/
    where: InviteClaimWhereUniqueInput
    /**
     * In case the InviteClaim found by the `where` argument doesn't exist, create a new InviteClaim with this data.
     * 
    **/
    create: XOR<InviteClaimCreateInput, InviteClaimUncheckedCreateInput>
    /**
     * In case the InviteClaim was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InviteClaimUpdateInput, InviteClaimUncheckedUpdateInput>
  }


  /**
   * InviteClaim delete
   */
  export type InviteClaimDeleteArgs = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
    /**
     * Filter which InviteClaim to delete.
     * 
    **/
    where: InviteClaimWhereUniqueInput
  }


  /**
   * InviteClaim deleteMany
   */
  export type InviteClaimDeleteManyArgs = {
    /**
     * Filter which InviteClaims to delete
     * 
    **/
    where?: InviteClaimWhereInput
  }


  /**
   * InviteClaim without action
   */
  export type InviteClaimArgs = {
    /**
     * Select specific fields to fetch from the InviteClaim
     * 
    **/
    select?: InviteClaimSelect | null
  }



  /**
   * Model InviteRm
   */


  export type AggregateInviteRm = {
    _count: InviteRmCountAggregateOutputType | null
    _avg: InviteRmAvgAggregateOutputType | null
    _sum: InviteRmSumAggregateOutputType | null
    _min: InviteRmMinAggregateOutputType | null
    _max: InviteRmMaxAggregateOutputType | null
  }

  export type InviteRmAvgAggregateOutputType = {
    sequence: number | null
  }

  export type InviteRmSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type InviteRmMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    sponsor_boid_id: string | null
    invite_code: string | null
  }

  export type InviteRmMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    sponsor_boid_id: string | null
    invite_code: string | null
  }

  export type InviteRmCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    sponsor_boid_id: number
    invite_code: number
    _all: number
  }


  export type InviteRmAvgAggregateInputType = {
    sequence?: true
  }

  export type InviteRmSumAggregateInputType = {
    sequence?: true
  }

  export type InviteRmMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    sponsor_boid_id?: true
    invite_code?: true
  }

  export type InviteRmMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    sponsor_boid_id?: true
    invite_code?: true
  }

  export type InviteRmCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    sponsor_boid_id?: true
    invite_code?: true
    _all?: true
  }

  export type InviteRmAggregateArgs = {
    /**
     * Filter which InviteRm to aggregate.
     * 
    **/
    where?: InviteRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteRms to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: InviteRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InviteRms
    **/
    _count?: true | InviteRmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InviteRmAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InviteRmSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InviteRmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InviteRmMaxAggregateInputType
  }

  export type GetInviteRmAggregateType<T extends InviteRmAggregateArgs> = {
        [P in keyof T & keyof AggregateInviteRm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInviteRm[P]>
      : GetScalarType<T[P], AggregateInviteRm[P]>
  }




  export type InviteRmGroupByArgs = {
    where?: InviteRmWhereInput
    orderBy?: Enumerable<InviteRmOrderByWithAggregationInput>
    by: Array<InviteRmScalarFieldEnum>
    having?: InviteRmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InviteRmCountAggregateInputType | true
    _avg?: InviteRmAvgAggregateInputType
    _sum?: InviteRmSumAggregateInputType
    _min?: InviteRmMinAggregateInputType
    _max?: InviteRmMaxAggregateInputType
  }


  export type InviteRmGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    sponsor_boid_id: string
    invite_code: string
    _count: InviteRmCountAggregateOutputType | null
    _avg: InviteRmAvgAggregateOutputType | null
    _sum: InviteRmSumAggregateOutputType | null
    _min: InviteRmMinAggregateOutputType | null
    _max: InviteRmMaxAggregateOutputType | null
  }

  type GetInviteRmGroupByPayload<T extends InviteRmGroupByArgs> = PrismaPromise<
    Array<
      PickArray<InviteRmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InviteRmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InviteRmGroupByOutputType[P]>
            : GetScalarType<T[P], InviteRmGroupByOutputType[P]>
        }
      >
    >


  export type InviteRmSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    sponsor_boid_id?: boolean
    invite_code?: boolean
  }


  export type InviteRmGetPayload<S extends boolean | null | undefined | InviteRmArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? InviteRm :
    S extends undefined ? never :
    S extends { include: any } & (InviteRmArgs | InviteRmFindManyArgs)
    ? InviteRm 
    : S extends { select: any } & (InviteRmArgs | InviteRmFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof InviteRm ? InviteRm[P] : never
  } 
      : InviteRm


  type InviteRmCountArgs = Merge<
    Omit<InviteRmFindManyArgs, 'select' | 'include'> & {
      select?: InviteRmCountAggregateInputType | true
    }
  >

  export interface InviteRmDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one InviteRm that matches the filter.
     * @param {InviteRmFindUniqueArgs} args - Arguments to find a InviteRm
     * @example
     * // Get one InviteRm
     * const inviteRm = await prisma.inviteRm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends InviteRmFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, InviteRmFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'InviteRm'> extends True ? Prisma__InviteRmClient<InviteRmGetPayload<T>> : Prisma__InviteRmClient<InviteRmGetPayload<T> | null, null>

    /**
     * Find one InviteRm that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {InviteRmFindUniqueOrThrowArgs} args - Arguments to find a InviteRm
     * @example
     * // Get one InviteRm
     * const inviteRm = await prisma.inviteRm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends InviteRmFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, InviteRmFindUniqueOrThrowArgs>
    ): Prisma__InviteRmClient<InviteRmGetPayload<T>>

    /**
     * Find the first InviteRm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteRmFindFirstArgs} args - Arguments to find a InviteRm
     * @example
     * // Get one InviteRm
     * const inviteRm = await prisma.inviteRm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends InviteRmFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, InviteRmFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'InviteRm'> extends True ? Prisma__InviteRmClient<InviteRmGetPayload<T>> : Prisma__InviteRmClient<InviteRmGetPayload<T> | null, null>

    /**
     * Find the first InviteRm that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteRmFindFirstOrThrowArgs} args - Arguments to find a InviteRm
     * @example
     * // Get one InviteRm
     * const inviteRm = await prisma.inviteRm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends InviteRmFindFirstOrThrowArgs>(
      args?: SelectSubset<T, InviteRmFindFirstOrThrowArgs>
    ): Prisma__InviteRmClient<InviteRmGetPayload<T>>

    /**
     * Find zero or more InviteRms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteRmFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InviteRms
     * const inviteRms = await prisma.inviteRm.findMany()
     * 
     * // Get first 10 InviteRms
     * const inviteRms = await prisma.inviteRm.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const inviteRmWithSequenceOnly = await prisma.inviteRm.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends InviteRmFindManyArgs>(
      args?: SelectSubset<T, InviteRmFindManyArgs>
    ): PrismaPromise<Array<InviteRmGetPayload<T>>>

    /**
     * Create a InviteRm.
     * @param {InviteRmCreateArgs} args - Arguments to create a InviteRm.
     * @example
     * // Create one InviteRm
     * const InviteRm = await prisma.inviteRm.create({
     *   data: {
     *     // ... data to create a InviteRm
     *   }
     * })
     * 
    **/
    create<T extends InviteRmCreateArgs>(
      args: SelectSubset<T, InviteRmCreateArgs>
    ): Prisma__InviteRmClient<InviteRmGetPayload<T>>

    /**
     * Delete a InviteRm.
     * @param {InviteRmDeleteArgs} args - Arguments to delete one InviteRm.
     * @example
     * // Delete one InviteRm
     * const InviteRm = await prisma.inviteRm.delete({
     *   where: {
     *     // ... filter to delete one InviteRm
     *   }
     * })
     * 
    **/
    delete<T extends InviteRmDeleteArgs>(
      args: SelectSubset<T, InviteRmDeleteArgs>
    ): Prisma__InviteRmClient<InviteRmGetPayload<T>>

    /**
     * Update one InviteRm.
     * @param {InviteRmUpdateArgs} args - Arguments to update one InviteRm.
     * @example
     * // Update one InviteRm
     * const inviteRm = await prisma.inviteRm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends InviteRmUpdateArgs>(
      args: SelectSubset<T, InviteRmUpdateArgs>
    ): Prisma__InviteRmClient<InviteRmGetPayload<T>>

    /**
     * Delete zero or more InviteRms.
     * @param {InviteRmDeleteManyArgs} args - Arguments to filter InviteRms to delete.
     * @example
     * // Delete a few InviteRms
     * const { count } = await prisma.inviteRm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends InviteRmDeleteManyArgs>(
      args?: SelectSubset<T, InviteRmDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more InviteRms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteRmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InviteRms
     * const inviteRm = await prisma.inviteRm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends InviteRmUpdateManyArgs>(
      args: SelectSubset<T, InviteRmUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one InviteRm.
     * @param {InviteRmUpsertArgs} args - Arguments to update or create a InviteRm.
     * @example
     * // Update or create a InviteRm
     * const inviteRm = await prisma.inviteRm.upsert({
     *   create: {
     *     // ... data to create a InviteRm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InviteRm we want to update
     *   }
     * })
    **/
    upsert<T extends InviteRmUpsertArgs>(
      args: SelectSubset<T, InviteRmUpsertArgs>
    ): Prisma__InviteRmClient<InviteRmGetPayload<T>>

    /**
     * Count the number of InviteRms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteRmCountArgs} args - Arguments to filter InviteRms to count.
     * @example
     * // Count the number of InviteRms
     * const count = await prisma.inviteRm.count({
     *   where: {
     *     // ... the filter for the InviteRms we want to count
     *   }
     * })
    **/
    count<T extends InviteRmCountArgs>(
      args?: Subset<T, InviteRmCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InviteRmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InviteRm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteRmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InviteRmAggregateArgs>(args: Subset<T, InviteRmAggregateArgs>): PrismaPromise<GetInviteRmAggregateType<T>>

    /**
     * Group by InviteRm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InviteRmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InviteRmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InviteRmGroupByArgs['orderBy'] }
        : { orderBy?: InviteRmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InviteRmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInviteRmGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for InviteRm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__InviteRmClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * InviteRm base type for findUnique actions
   */
  export type InviteRmFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * Filter, which InviteRm to fetch.
     * 
    **/
    where: InviteRmWhereUniqueInput
  }

  /**
   * InviteRm findUnique
   */
  export interface InviteRmFindUniqueArgs extends InviteRmFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InviteRm findUniqueOrThrow
   */
  export type InviteRmFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * Filter, which InviteRm to fetch.
     * 
    **/
    where: InviteRmWhereUniqueInput
  }


  /**
   * InviteRm base type for findFirst actions
   */
  export type InviteRmFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * Filter, which InviteRm to fetch.
     * 
    **/
    where?: InviteRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteRms to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteRms.
     * 
    **/
    cursor?: InviteRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteRms.
     * 
    **/
    distinct?: Enumerable<InviteRmScalarFieldEnum>
  }

  /**
   * InviteRm findFirst
   */
  export interface InviteRmFindFirstArgs extends InviteRmFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * InviteRm findFirstOrThrow
   */
  export type InviteRmFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * Filter, which InviteRm to fetch.
     * 
    **/
    where?: InviteRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteRms to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InviteRms.
     * 
    **/
    cursor?: InviteRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InviteRms.
     * 
    **/
    distinct?: Enumerable<InviteRmScalarFieldEnum>
  }


  /**
   * InviteRm findMany
   */
  export type InviteRmFindManyArgs = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * Filter, which InviteRms to fetch.
     * 
    **/
    where?: InviteRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InviteRms to fetch.
     * 
    **/
    orderBy?: Enumerable<InviteRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InviteRms.
     * 
    **/
    cursor?: InviteRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InviteRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InviteRms.
     * 
    **/
    skip?: number
    distinct?: Enumerable<InviteRmScalarFieldEnum>
  }


  /**
   * InviteRm create
   */
  export type InviteRmCreateArgs = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * The data needed to create a InviteRm.
     * 
    **/
    data: XOR<InviteRmCreateInput, InviteRmUncheckedCreateInput>
  }


  /**
   * InviteRm update
   */
  export type InviteRmUpdateArgs = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * The data needed to update a InviteRm.
     * 
    **/
    data: XOR<InviteRmUpdateInput, InviteRmUncheckedUpdateInput>
    /**
     * Choose, which InviteRm to update.
     * 
    **/
    where: InviteRmWhereUniqueInput
  }


  /**
   * InviteRm updateMany
   */
  export type InviteRmUpdateManyArgs = {
    /**
     * The data used to update InviteRms.
     * 
    **/
    data: XOR<InviteRmUpdateManyMutationInput, InviteRmUncheckedUpdateManyInput>
    /**
     * Filter which InviteRms to update
     * 
    **/
    where?: InviteRmWhereInput
  }


  /**
   * InviteRm upsert
   */
  export type InviteRmUpsertArgs = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * The filter to search for the InviteRm to update in case it exists.
     * 
    **/
    where: InviteRmWhereUniqueInput
    /**
     * In case the InviteRm found by the `where` argument doesn't exist, create a new InviteRm with this data.
     * 
    **/
    create: XOR<InviteRmCreateInput, InviteRmUncheckedCreateInput>
    /**
     * In case the InviteRm was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<InviteRmUpdateInput, InviteRmUncheckedUpdateInput>
  }


  /**
   * InviteRm delete
   */
  export type InviteRmDeleteArgs = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
    /**
     * Filter which InviteRm to delete.
     * 
    **/
    where: InviteRmWhereUniqueInput
  }


  /**
   * InviteRm deleteMany
   */
  export type InviteRmDeleteManyArgs = {
    /**
     * Filter which InviteRms to delete
     * 
    **/
    where?: InviteRmWhereInput
  }


  /**
   * InviteRm without action
   */
  export type InviteRmArgs = {
    /**
     * Select specific fields to fetch from the InviteRm
     * 
    **/
    select?: InviteRmSelect | null
  }



  /**
   * Model LogPwrAdd
   */


  export type AggregateLogPwrAdd = {
    _count: LogPwrAddCountAggregateOutputType | null
    _avg: LogPwrAddAvgAggregateOutputType | null
    _sum: LogPwrAddSumAggregateOutputType | null
    _min: LogPwrAddMinAggregateOutputType | null
    _max: LogPwrAddMaxAggregateOutputType | null
  }

  export type LogPwrAddAvgAggregateOutputType = {
    sequence: number | null
    received: number | null
    from_mult_mods: number | null
    diverted_to_sponsor: number | null
    power_increased: number | null
  }

  export type LogPwrAddSumAggregateOutputType = {
    sequence: bigint | null
    received: number | null
    from_mult_mods: number | null
    diverted_to_sponsor: number | null
    power_increased: number | null
  }

  export type LogPwrAddMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    received: number | null
    from_mult_mods: number | null
    diverted_to_sponsor: number | null
    power_increased: number | null
    orign: string | null
  }

  export type LogPwrAddMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    received: number | null
    from_mult_mods: number | null
    diverted_to_sponsor: number | null
    power_increased: number | null
    orign: string | null
  }

  export type LogPwrAddCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    received: number
    from_mult_mods: number
    diverted_to_sponsor: number
    power_increased: number
    orign: number
    _all: number
  }


  export type LogPwrAddAvgAggregateInputType = {
    sequence?: true
    received?: true
    from_mult_mods?: true
    diverted_to_sponsor?: true
    power_increased?: true
  }

  export type LogPwrAddSumAggregateInputType = {
    sequence?: true
    received?: true
    from_mult_mods?: true
    diverted_to_sponsor?: true
    power_increased?: true
  }

  export type LogPwrAddMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    received?: true
    from_mult_mods?: true
    diverted_to_sponsor?: true
    power_increased?: true
    orign?: true
  }

  export type LogPwrAddMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    received?: true
    from_mult_mods?: true
    diverted_to_sponsor?: true
    power_increased?: true
    orign?: true
  }

  export type LogPwrAddCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    received?: true
    from_mult_mods?: true
    diverted_to_sponsor?: true
    power_increased?: true
    orign?: true
    _all?: true
  }

  export type LogPwrAddAggregateArgs = {
    /**
     * Filter which LogPwrAdd to aggregate.
     * 
    **/
    where?: LogPwrAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogPwrAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<LogPwrAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LogPwrAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogPwrAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogPwrAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LogPwrAdds
    **/
    _count?: true | LogPwrAddCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LogPwrAddAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LogPwrAddSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogPwrAddMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogPwrAddMaxAggregateInputType
  }

  export type GetLogPwrAddAggregateType<T extends LogPwrAddAggregateArgs> = {
        [P in keyof T & keyof AggregateLogPwrAdd]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogPwrAdd[P]>
      : GetScalarType<T[P], AggregateLogPwrAdd[P]>
  }




  export type LogPwrAddGroupByArgs = {
    where?: LogPwrAddWhereInput
    orderBy?: Enumerable<LogPwrAddOrderByWithAggregationInput>
    by: Array<LogPwrAddScalarFieldEnum>
    having?: LogPwrAddScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogPwrAddCountAggregateInputType | true
    _avg?: LogPwrAddAvgAggregateInputType
    _sum?: LogPwrAddSumAggregateInputType
    _min?: LogPwrAddMinAggregateInputType
    _max?: LogPwrAddMaxAggregateInputType
  }


  export type LogPwrAddGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    received: number
    from_mult_mods: number
    diverted_to_sponsor: number
    power_increased: number
    orign: string
    _count: LogPwrAddCountAggregateOutputType | null
    _avg: LogPwrAddAvgAggregateOutputType | null
    _sum: LogPwrAddSumAggregateOutputType | null
    _min: LogPwrAddMinAggregateOutputType | null
    _max: LogPwrAddMaxAggregateOutputType | null
  }

  type GetLogPwrAddGroupByPayload<T extends LogPwrAddGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LogPwrAddGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogPwrAddGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogPwrAddGroupByOutputType[P]>
            : GetScalarType<T[P], LogPwrAddGroupByOutputType[P]>
        }
      >
    >


  export type LogPwrAddSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    received?: boolean
    from_mult_mods?: boolean
    diverted_to_sponsor?: boolean
    power_increased?: boolean
    orign?: boolean
  }


  export type LogPwrAddGetPayload<S extends boolean | null | undefined | LogPwrAddArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? LogPwrAdd :
    S extends undefined ? never :
    S extends { include: any } & (LogPwrAddArgs | LogPwrAddFindManyArgs)
    ? LogPwrAdd 
    : S extends { select: any } & (LogPwrAddArgs | LogPwrAddFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof LogPwrAdd ? LogPwrAdd[P] : never
  } 
      : LogPwrAdd


  type LogPwrAddCountArgs = Merge<
    Omit<LogPwrAddFindManyArgs, 'select' | 'include'> & {
      select?: LogPwrAddCountAggregateInputType | true
    }
  >

  export interface LogPwrAddDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one LogPwrAdd that matches the filter.
     * @param {LogPwrAddFindUniqueArgs} args - Arguments to find a LogPwrAdd
     * @example
     * // Get one LogPwrAdd
     * const logPwrAdd = await prisma.logPwrAdd.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LogPwrAddFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LogPwrAddFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LogPwrAdd'> extends True ? Prisma__LogPwrAddClient<LogPwrAddGetPayload<T>> : Prisma__LogPwrAddClient<LogPwrAddGetPayload<T> | null, null>

    /**
     * Find one LogPwrAdd that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LogPwrAddFindUniqueOrThrowArgs} args - Arguments to find a LogPwrAdd
     * @example
     * // Get one LogPwrAdd
     * const logPwrAdd = await prisma.logPwrAdd.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LogPwrAddFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LogPwrAddFindUniqueOrThrowArgs>
    ): Prisma__LogPwrAddClient<LogPwrAddGetPayload<T>>

    /**
     * Find the first LogPwrAdd that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrAddFindFirstArgs} args - Arguments to find a LogPwrAdd
     * @example
     * // Get one LogPwrAdd
     * const logPwrAdd = await prisma.logPwrAdd.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LogPwrAddFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LogPwrAddFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LogPwrAdd'> extends True ? Prisma__LogPwrAddClient<LogPwrAddGetPayload<T>> : Prisma__LogPwrAddClient<LogPwrAddGetPayload<T> | null, null>

    /**
     * Find the first LogPwrAdd that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrAddFindFirstOrThrowArgs} args - Arguments to find a LogPwrAdd
     * @example
     * // Get one LogPwrAdd
     * const logPwrAdd = await prisma.logPwrAdd.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LogPwrAddFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LogPwrAddFindFirstOrThrowArgs>
    ): Prisma__LogPwrAddClient<LogPwrAddGetPayload<T>>

    /**
     * Find zero or more LogPwrAdds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrAddFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogPwrAdds
     * const logPwrAdds = await prisma.logPwrAdd.findMany()
     * 
     * // Get first 10 LogPwrAdds
     * const logPwrAdds = await prisma.logPwrAdd.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const logPwrAddWithSequenceOnly = await prisma.logPwrAdd.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends LogPwrAddFindManyArgs>(
      args?: SelectSubset<T, LogPwrAddFindManyArgs>
    ): PrismaPromise<Array<LogPwrAddGetPayload<T>>>

    /**
     * Create a LogPwrAdd.
     * @param {LogPwrAddCreateArgs} args - Arguments to create a LogPwrAdd.
     * @example
     * // Create one LogPwrAdd
     * const LogPwrAdd = await prisma.logPwrAdd.create({
     *   data: {
     *     // ... data to create a LogPwrAdd
     *   }
     * })
     * 
    **/
    create<T extends LogPwrAddCreateArgs>(
      args: SelectSubset<T, LogPwrAddCreateArgs>
    ): Prisma__LogPwrAddClient<LogPwrAddGetPayload<T>>

    /**
     * Delete a LogPwrAdd.
     * @param {LogPwrAddDeleteArgs} args - Arguments to delete one LogPwrAdd.
     * @example
     * // Delete one LogPwrAdd
     * const LogPwrAdd = await prisma.logPwrAdd.delete({
     *   where: {
     *     // ... filter to delete one LogPwrAdd
     *   }
     * })
     * 
    **/
    delete<T extends LogPwrAddDeleteArgs>(
      args: SelectSubset<T, LogPwrAddDeleteArgs>
    ): Prisma__LogPwrAddClient<LogPwrAddGetPayload<T>>

    /**
     * Update one LogPwrAdd.
     * @param {LogPwrAddUpdateArgs} args - Arguments to update one LogPwrAdd.
     * @example
     * // Update one LogPwrAdd
     * const logPwrAdd = await prisma.logPwrAdd.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LogPwrAddUpdateArgs>(
      args: SelectSubset<T, LogPwrAddUpdateArgs>
    ): Prisma__LogPwrAddClient<LogPwrAddGetPayload<T>>

    /**
     * Delete zero or more LogPwrAdds.
     * @param {LogPwrAddDeleteManyArgs} args - Arguments to filter LogPwrAdds to delete.
     * @example
     * // Delete a few LogPwrAdds
     * const { count } = await prisma.logPwrAdd.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LogPwrAddDeleteManyArgs>(
      args?: SelectSubset<T, LogPwrAddDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogPwrAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrAddUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogPwrAdds
     * const logPwrAdd = await prisma.logPwrAdd.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LogPwrAddUpdateManyArgs>(
      args: SelectSubset<T, LogPwrAddUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one LogPwrAdd.
     * @param {LogPwrAddUpsertArgs} args - Arguments to update or create a LogPwrAdd.
     * @example
     * // Update or create a LogPwrAdd
     * const logPwrAdd = await prisma.logPwrAdd.upsert({
     *   create: {
     *     // ... data to create a LogPwrAdd
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogPwrAdd we want to update
     *   }
     * })
    **/
    upsert<T extends LogPwrAddUpsertArgs>(
      args: SelectSubset<T, LogPwrAddUpsertArgs>
    ): Prisma__LogPwrAddClient<LogPwrAddGetPayload<T>>

    /**
     * Count the number of LogPwrAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrAddCountArgs} args - Arguments to filter LogPwrAdds to count.
     * @example
     * // Count the number of LogPwrAdds
     * const count = await prisma.logPwrAdd.count({
     *   where: {
     *     // ... the filter for the LogPwrAdds we want to count
     *   }
     * })
    **/
    count<T extends LogPwrAddCountArgs>(
      args?: Subset<T, LogPwrAddCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogPwrAddCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LogPwrAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrAddAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogPwrAddAggregateArgs>(args: Subset<T, LogPwrAddAggregateArgs>): PrismaPromise<GetLogPwrAddAggregateType<T>>

    /**
     * Group by LogPwrAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrAddGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LogPwrAddGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogPwrAddGroupByArgs['orderBy'] }
        : { orderBy?: LogPwrAddGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LogPwrAddGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogPwrAddGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for LogPwrAdd.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LogPwrAddClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * LogPwrAdd base type for findUnique actions
   */
  export type LogPwrAddFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * Filter, which LogPwrAdd to fetch.
     * 
    **/
    where: LogPwrAddWhereUniqueInput
  }

  /**
   * LogPwrAdd findUnique
   */
  export interface LogPwrAddFindUniqueArgs extends LogPwrAddFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LogPwrAdd findUniqueOrThrow
   */
  export type LogPwrAddFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * Filter, which LogPwrAdd to fetch.
     * 
    **/
    where: LogPwrAddWhereUniqueInput
  }


  /**
   * LogPwrAdd base type for findFirst actions
   */
  export type LogPwrAddFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * Filter, which LogPwrAdd to fetch.
     * 
    **/
    where?: LogPwrAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogPwrAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<LogPwrAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogPwrAdds.
     * 
    **/
    cursor?: LogPwrAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogPwrAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogPwrAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogPwrAdds.
     * 
    **/
    distinct?: Enumerable<LogPwrAddScalarFieldEnum>
  }

  /**
   * LogPwrAdd findFirst
   */
  export interface LogPwrAddFindFirstArgs extends LogPwrAddFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LogPwrAdd findFirstOrThrow
   */
  export type LogPwrAddFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * Filter, which LogPwrAdd to fetch.
     * 
    **/
    where?: LogPwrAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogPwrAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<LogPwrAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogPwrAdds.
     * 
    **/
    cursor?: LogPwrAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogPwrAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogPwrAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogPwrAdds.
     * 
    **/
    distinct?: Enumerable<LogPwrAddScalarFieldEnum>
  }


  /**
   * LogPwrAdd findMany
   */
  export type LogPwrAddFindManyArgs = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * Filter, which LogPwrAdds to fetch.
     * 
    **/
    where?: LogPwrAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogPwrAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<LogPwrAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LogPwrAdds.
     * 
    **/
    cursor?: LogPwrAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogPwrAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogPwrAdds.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LogPwrAddScalarFieldEnum>
  }


  /**
   * LogPwrAdd create
   */
  export type LogPwrAddCreateArgs = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * The data needed to create a LogPwrAdd.
     * 
    **/
    data: XOR<LogPwrAddCreateInput, LogPwrAddUncheckedCreateInput>
  }


  /**
   * LogPwrAdd update
   */
  export type LogPwrAddUpdateArgs = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * The data needed to update a LogPwrAdd.
     * 
    **/
    data: XOR<LogPwrAddUpdateInput, LogPwrAddUncheckedUpdateInput>
    /**
     * Choose, which LogPwrAdd to update.
     * 
    **/
    where: LogPwrAddWhereUniqueInput
  }


  /**
   * LogPwrAdd updateMany
   */
  export type LogPwrAddUpdateManyArgs = {
    /**
     * The data used to update LogPwrAdds.
     * 
    **/
    data: XOR<LogPwrAddUpdateManyMutationInput, LogPwrAddUncheckedUpdateManyInput>
    /**
     * Filter which LogPwrAdds to update
     * 
    **/
    where?: LogPwrAddWhereInput
  }


  /**
   * LogPwrAdd upsert
   */
  export type LogPwrAddUpsertArgs = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * The filter to search for the LogPwrAdd to update in case it exists.
     * 
    **/
    where: LogPwrAddWhereUniqueInput
    /**
     * In case the LogPwrAdd found by the `where` argument doesn't exist, create a new LogPwrAdd with this data.
     * 
    **/
    create: XOR<LogPwrAddCreateInput, LogPwrAddUncheckedCreateInput>
    /**
     * In case the LogPwrAdd was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LogPwrAddUpdateInput, LogPwrAddUncheckedUpdateInput>
  }


  /**
   * LogPwrAdd delete
   */
  export type LogPwrAddDeleteArgs = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
    /**
     * Filter which LogPwrAdd to delete.
     * 
    **/
    where: LogPwrAddWhereUniqueInput
  }


  /**
   * LogPwrAdd deleteMany
   */
  export type LogPwrAddDeleteManyArgs = {
    /**
     * Filter which LogPwrAdds to delete
     * 
    **/
    where?: LogPwrAddWhereInput
  }


  /**
   * LogPwrAdd without action
   */
  export type LogPwrAddArgs = {
    /**
     * Select specific fields to fetch from the LogPwrAdd
     * 
    **/
    select?: LogPwrAddSelect | null
  }



  /**
   * Model LogPwrClaim
   */


  export type AggregateLogPwrClaim = {
    _count: LogPwrClaimCountAggregateOutputType | null
    _avg: LogPwrClaimAvgAggregateOutputType | null
    _sum: LogPwrClaimSumAggregateOutputType | null
    _min: LogPwrClaimMinAggregateOutputType | null
    _max: LogPwrClaimMaxAggregateOutputType | null
  }

  export type LogPwrClaimAvgAggregateOutputType = {
    sequence: number | null
    power_before: number | null
    power_after: number | null
    power_from_mods: number | null
    power_decayed: number | null
    power_rounds: number | null
    mint_account: number | null
    mint_team: number | null
    mint_team_owner: number | null
    mint_overstake: number | null
    mint_fundstake: number | null
    mint_total: number | null
  }

  export type LogPwrClaimSumAggregateOutputType = {
    sequence: bigint | null
    power_before: number | null
    power_after: number | null
    power_from_mods: number | null
    power_decayed: number | null
    power_rounds: number | null
    mint_account: number | null
    mint_team: number | null
    mint_team_owner: number | null
    mint_overstake: number | null
    mint_fundstake: number | null
    mint_total: number | null
  }

  export type LogPwrClaimMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    power_before: number | null
    power_after: number | null
    power_from_mods: number | null
    power_decayed: number | null
    power_rounds: number | null
    mint_account: number | null
    mint_team: number | null
    mint_team_owner: number | null
    mint_overstake: number | null
    mint_fundstake: number | null
    mint_total: number | null
  }

  export type LogPwrClaimMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    power_before: number | null
    power_after: number | null
    power_from_mods: number | null
    power_decayed: number | null
    power_rounds: number | null
    mint_account: number | null
    mint_team: number | null
    mint_team_owner: number | null
    mint_overstake: number | null
    mint_fundstake: number | null
    mint_total: number | null
  }

  export type LogPwrClaimCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    power_before: number
    power_after: number
    power_from_mods: number
    power_decayed: number
    power_rounds: number
    mint_account: number
    mint_team: number
    mint_team_owner: number
    mint_overstake: number
    mint_fundstake: number
    mint_total: number
    _all: number
  }


  export type LogPwrClaimAvgAggregateInputType = {
    sequence?: true
    power_before?: true
    power_after?: true
    power_from_mods?: true
    power_decayed?: true
    power_rounds?: true
    mint_account?: true
    mint_team?: true
    mint_team_owner?: true
    mint_overstake?: true
    mint_fundstake?: true
    mint_total?: true
  }

  export type LogPwrClaimSumAggregateInputType = {
    sequence?: true
    power_before?: true
    power_after?: true
    power_from_mods?: true
    power_decayed?: true
    power_rounds?: true
    mint_account?: true
    mint_team?: true
    mint_team_owner?: true
    mint_overstake?: true
    mint_fundstake?: true
    mint_total?: true
  }

  export type LogPwrClaimMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    power_before?: true
    power_after?: true
    power_from_mods?: true
    power_decayed?: true
    power_rounds?: true
    mint_account?: true
    mint_team?: true
    mint_team_owner?: true
    mint_overstake?: true
    mint_fundstake?: true
    mint_total?: true
  }

  export type LogPwrClaimMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    power_before?: true
    power_after?: true
    power_from_mods?: true
    power_decayed?: true
    power_rounds?: true
    mint_account?: true
    mint_team?: true
    mint_team_owner?: true
    mint_overstake?: true
    mint_fundstake?: true
    mint_total?: true
  }

  export type LogPwrClaimCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    power_before?: true
    power_after?: true
    power_from_mods?: true
    power_decayed?: true
    power_rounds?: true
    mint_account?: true
    mint_team?: true
    mint_team_owner?: true
    mint_overstake?: true
    mint_fundstake?: true
    mint_total?: true
    _all?: true
  }

  export type LogPwrClaimAggregateArgs = {
    /**
     * Filter which LogPwrClaim to aggregate.
     * 
    **/
    where?: LogPwrClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogPwrClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<LogPwrClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: LogPwrClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogPwrClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogPwrClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned LogPwrClaims
    **/
    _count?: true | LogPwrClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: LogPwrClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: LogPwrClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: LogPwrClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: LogPwrClaimMaxAggregateInputType
  }

  export type GetLogPwrClaimAggregateType<T extends LogPwrClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateLogPwrClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateLogPwrClaim[P]>
      : GetScalarType<T[P], AggregateLogPwrClaim[P]>
  }




  export type LogPwrClaimGroupByArgs = {
    where?: LogPwrClaimWhereInput
    orderBy?: Enumerable<LogPwrClaimOrderByWithAggregationInput>
    by: Array<LogPwrClaimScalarFieldEnum>
    having?: LogPwrClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: LogPwrClaimCountAggregateInputType | true
    _avg?: LogPwrClaimAvgAggregateInputType
    _sum?: LogPwrClaimSumAggregateInputType
    _min?: LogPwrClaimMinAggregateInputType
    _max?: LogPwrClaimMaxAggregateInputType
  }


  export type LogPwrClaimGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    power_before: number
    power_after: number
    power_from_mods: number
    power_decayed: number
    power_rounds: number
    mint_account: number
    mint_team: number
    mint_team_owner: number
    mint_overstake: number
    mint_fundstake: number
    mint_total: number
    _count: LogPwrClaimCountAggregateOutputType | null
    _avg: LogPwrClaimAvgAggregateOutputType | null
    _sum: LogPwrClaimSumAggregateOutputType | null
    _min: LogPwrClaimMinAggregateOutputType | null
    _max: LogPwrClaimMaxAggregateOutputType | null
  }

  type GetLogPwrClaimGroupByPayload<T extends LogPwrClaimGroupByArgs> = PrismaPromise<
    Array<
      PickArray<LogPwrClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof LogPwrClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], LogPwrClaimGroupByOutputType[P]>
            : GetScalarType<T[P], LogPwrClaimGroupByOutputType[P]>
        }
      >
    >


  export type LogPwrClaimSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    power_before?: boolean
    power_after?: boolean
    power_from_mods?: boolean
    power_decayed?: boolean
    power_rounds?: boolean
    mint_account?: boolean
    mint_team?: boolean
    mint_team_owner?: boolean
    mint_overstake?: boolean
    mint_fundstake?: boolean
    mint_total?: boolean
  }


  export type LogPwrClaimGetPayload<S extends boolean | null | undefined | LogPwrClaimArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? LogPwrClaim :
    S extends undefined ? never :
    S extends { include: any } & (LogPwrClaimArgs | LogPwrClaimFindManyArgs)
    ? LogPwrClaim 
    : S extends { select: any } & (LogPwrClaimArgs | LogPwrClaimFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof LogPwrClaim ? LogPwrClaim[P] : never
  } 
      : LogPwrClaim


  type LogPwrClaimCountArgs = Merge<
    Omit<LogPwrClaimFindManyArgs, 'select' | 'include'> & {
      select?: LogPwrClaimCountAggregateInputType | true
    }
  >

  export interface LogPwrClaimDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one LogPwrClaim that matches the filter.
     * @param {LogPwrClaimFindUniqueArgs} args - Arguments to find a LogPwrClaim
     * @example
     * // Get one LogPwrClaim
     * const logPwrClaim = await prisma.logPwrClaim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends LogPwrClaimFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, LogPwrClaimFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'LogPwrClaim'> extends True ? Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T>> : Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T> | null, null>

    /**
     * Find one LogPwrClaim that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {LogPwrClaimFindUniqueOrThrowArgs} args - Arguments to find a LogPwrClaim
     * @example
     * // Get one LogPwrClaim
     * const logPwrClaim = await prisma.logPwrClaim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends LogPwrClaimFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, LogPwrClaimFindUniqueOrThrowArgs>
    ): Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T>>

    /**
     * Find the first LogPwrClaim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrClaimFindFirstArgs} args - Arguments to find a LogPwrClaim
     * @example
     * // Get one LogPwrClaim
     * const logPwrClaim = await prisma.logPwrClaim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends LogPwrClaimFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, LogPwrClaimFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'LogPwrClaim'> extends True ? Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T>> : Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T> | null, null>

    /**
     * Find the first LogPwrClaim that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrClaimFindFirstOrThrowArgs} args - Arguments to find a LogPwrClaim
     * @example
     * // Get one LogPwrClaim
     * const logPwrClaim = await prisma.logPwrClaim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends LogPwrClaimFindFirstOrThrowArgs>(
      args?: SelectSubset<T, LogPwrClaimFindFirstOrThrowArgs>
    ): Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T>>

    /**
     * Find zero or more LogPwrClaims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrClaimFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all LogPwrClaims
     * const logPwrClaims = await prisma.logPwrClaim.findMany()
     * 
     * // Get first 10 LogPwrClaims
     * const logPwrClaims = await prisma.logPwrClaim.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const logPwrClaimWithSequenceOnly = await prisma.logPwrClaim.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends LogPwrClaimFindManyArgs>(
      args?: SelectSubset<T, LogPwrClaimFindManyArgs>
    ): PrismaPromise<Array<LogPwrClaimGetPayload<T>>>

    /**
     * Create a LogPwrClaim.
     * @param {LogPwrClaimCreateArgs} args - Arguments to create a LogPwrClaim.
     * @example
     * // Create one LogPwrClaim
     * const LogPwrClaim = await prisma.logPwrClaim.create({
     *   data: {
     *     // ... data to create a LogPwrClaim
     *   }
     * })
     * 
    **/
    create<T extends LogPwrClaimCreateArgs>(
      args: SelectSubset<T, LogPwrClaimCreateArgs>
    ): Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T>>

    /**
     * Delete a LogPwrClaim.
     * @param {LogPwrClaimDeleteArgs} args - Arguments to delete one LogPwrClaim.
     * @example
     * // Delete one LogPwrClaim
     * const LogPwrClaim = await prisma.logPwrClaim.delete({
     *   where: {
     *     // ... filter to delete one LogPwrClaim
     *   }
     * })
     * 
    **/
    delete<T extends LogPwrClaimDeleteArgs>(
      args: SelectSubset<T, LogPwrClaimDeleteArgs>
    ): Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T>>

    /**
     * Update one LogPwrClaim.
     * @param {LogPwrClaimUpdateArgs} args - Arguments to update one LogPwrClaim.
     * @example
     * // Update one LogPwrClaim
     * const logPwrClaim = await prisma.logPwrClaim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends LogPwrClaimUpdateArgs>(
      args: SelectSubset<T, LogPwrClaimUpdateArgs>
    ): Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T>>

    /**
     * Delete zero or more LogPwrClaims.
     * @param {LogPwrClaimDeleteManyArgs} args - Arguments to filter LogPwrClaims to delete.
     * @example
     * // Delete a few LogPwrClaims
     * const { count } = await prisma.logPwrClaim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends LogPwrClaimDeleteManyArgs>(
      args?: SelectSubset<T, LogPwrClaimDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more LogPwrClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many LogPwrClaims
     * const logPwrClaim = await prisma.logPwrClaim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends LogPwrClaimUpdateManyArgs>(
      args: SelectSubset<T, LogPwrClaimUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one LogPwrClaim.
     * @param {LogPwrClaimUpsertArgs} args - Arguments to update or create a LogPwrClaim.
     * @example
     * // Update or create a LogPwrClaim
     * const logPwrClaim = await prisma.logPwrClaim.upsert({
     *   create: {
     *     // ... data to create a LogPwrClaim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the LogPwrClaim we want to update
     *   }
     * })
    **/
    upsert<T extends LogPwrClaimUpsertArgs>(
      args: SelectSubset<T, LogPwrClaimUpsertArgs>
    ): Prisma__LogPwrClaimClient<LogPwrClaimGetPayload<T>>

    /**
     * Count the number of LogPwrClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrClaimCountArgs} args - Arguments to filter LogPwrClaims to count.
     * @example
     * // Count the number of LogPwrClaims
     * const count = await prisma.logPwrClaim.count({
     *   where: {
     *     // ... the filter for the LogPwrClaims we want to count
     *   }
     * })
    **/
    count<T extends LogPwrClaimCountArgs>(
      args?: Subset<T, LogPwrClaimCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], LogPwrClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a LogPwrClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends LogPwrClaimAggregateArgs>(args: Subset<T, LogPwrClaimAggregateArgs>): PrismaPromise<GetLogPwrClaimAggregateType<T>>

    /**
     * Group by LogPwrClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {LogPwrClaimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends LogPwrClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: LogPwrClaimGroupByArgs['orderBy'] }
        : { orderBy?: LogPwrClaimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, LogPwrClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetLogPwrClaimGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for LogPwrClaim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__LogPwrClaimClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * LogPwrClaim base type for findUnique actions
   */
  export type LogPwrClaimFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * Filter, which LogPwrClaim to fetch.
     * 
    **/
    where: LogPwrClaimWhereUniqueInput
  }

  /**
   * LogPwrClaim findUnique
   */
  export interface LogPwrClaimFindUniqueArgs extends LogPwrClaimFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LogPwrClaim findUniqueOrThrow
   */
  export type LogPwrClaimFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * Filter, which LogPwrClaim to fetch.
     * 
    **/
    where: LogPwrClaimWhereUniqueInput
  }


  /**
   * LogPwrClaim base type for findFirst actions
   */
  export type LogPwrClaimFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * Filter, which LogPwrClaim to fetch.
     * 
    **/
    where?: LogPwrClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogPwrClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<LogPwrClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogPwrClaims.
     * 
    **/
    cursor?: LogPwrClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogPwrClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogPwrClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogPwrClaims.
     * 
    **/
    distinct?: Enumerable<LogPwrClaimScalarFieldEnum>
  }

  /**
   * LogPwrClaim findFirst
   */
  export interface LogPwrClaimFindFirstArgs extends LogPwrClaimFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * LogPwrClaim findFirstOrThrow
   */
  export type LogPwrClaimFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * Filter, which LogPwrClaim to fetch.
     * 
    **/
    where?: LogPwrClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogPwrClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<LogPwrClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for LogPwrClaims.
     * 
    **/
    cursor?: LogPwrClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogPwrClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogPwrClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of LogPwrClaims.
     * 
    **/
    distinct?: Enumerable<LogPwrClaimScalarFieldEnum>
  }


  /**
   * LogPwrClaim findMany
   */
  export type LogPwrClaimFindManyArgs = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * Filter, which LogPwrClaims to fetch.
     * 
    **/
    where?: LogPwrClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of LogPwrClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<LogPwrClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing LogPwrClaims.
     * 
    **/
    cursor?: LogPwrClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` LogPwrClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` LogPwrClaims.
     * 
    **/
    skip?: number
    distinct?: Enumerable<LogPwrClaimScalarFieldEnum>
  }


  /**
   * LogPwrClaim create
   */
  export type LogPwrClaimCreateArgs = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * The data needed to create a LogPwrClaim.
     * 
    **/
    data: XOR<LogPwrClaimCreateInput, LogPwrClaimUncheckedCreateInput>
  }


  /**
   * LogPwrClaim update
   */
  export type LogPwrClaimUpdateArgs = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * The data needed to update a LogPwrClaim.
     * 
    **/
    data: XOR<LogPwrClaimUpdateInput, LogPwrClaimUncheckedUpdateInput>
    /**
     * Choose, which LogPwrClaim to update.
     * 
    **/
    where: LogPwrClaimWhereUniqueInput
  }


  /**
   * LogPwrClaim updateMany
   */
  export type LogPwrClaimUpdateManyArgs = {
    /**
     * The data used to update LogPwrClaims.
     * 
    **/
    data: XOR<LogPwrClaimUpdateManyMutationInput, LogPwrClaimUncheckedUpdateManyInput>
    /**
     * Filter which LogPwrClaims to update
     * 
    **/
    where?: LogPwrClaimWhereInput
  }


  /**
   * LogPwrClaim upsert
   */
  export type LogPwrClaimUpsertArgs = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * The filter to search for the LogPwrClaim to update in case it exists.
     * 
    **/
    where: LogPwrClaimWhereUniqueInput
    /**
     * In case the LogPwrClaim found by the `where` argument doesn't exist, create a new LogPwrClaim with this data.
     * 
    **/
    create: XOR<LogPwrClaimCreateInput, LogPwrClaimUncheckedCreateInput>
    /**
     * In case the LogPwrClaim was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<LogPwrClaimUpdateInput, LogPwrClaimUncheckedUpdateInput>
  }


  /**
   * LogPwrClaim delete
   */
  export type LogPwrClaimDeleteArgs = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
    /**
     * Filter which LogPwrClaim to delete.
     * 
    **/
    where: LogPwrClaimWhereUniqueInput
  }


  /**
   * LogPwrClaim deleteMany
   */
  export type LogPwrClaimDeleteManyArgs = {
    /**
     * Filter which LogPwrClaims to delete
     * 
    **/
    where?: LogPwrClaimWhereInput
  }


  /**
   * LogPwrClaim without action
   */
  export type LogPwrClaimArgs = {
    /**
     * Select specific fields to fetch from the LogPwrClaim
     * 
    **/
    select?: LogPwrClaimSelect | null
  }



  /**
   * Model NftLock
   */


  export type AggregateNftLock = {
    _count: NftLockCountAggregateOutputType | null
    _avg: NftLockAvgAggregateOutputType | null
    _sum: NftLockSumAggregateOutputType | null
    _min: NftLockMinAggregateOutputType | null
    _max: NftLockMaxAggregateOutputType | null
  }

  export type NftLockAvgAggregateOutputType = {
    sequence: number | null
    locked_until_round: number | null
  }

  export type NftLockSumAggregateOutputType = {
    sequence: bigint | null
    locked_until_round: number | null
  }

  export type NftLockMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    asset_id: string | null
    locked_until_round: number | null
  }

  export type NftLockMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    asset_id: string | null
    locked_until_round: number | null
  }

  export type NftLockCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    asset_id: number
    locked_until_round: number
    _all: number
  }


  export type NftLockAvgAggregateInputType = {
    sequence?: true
    locked_until_round?: true
  }

  export type NftLockSumAggregateInputType = {
    sequence?: true
    locked_until_round?: true
  }

  export type NftLockMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    asset_id?: true
    locked_until_round?: true
  }

  export type NftLockMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    asset_id?: true
    locked_until_round?: true
  }

  export type NftLockCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    asset_id?: true
    locked_until_round?: true
    _all?: true
  }

  export type NftLockAggregateArgs = {
    /**
     * Filter which NftLock to aggregate.
     * 
    **/
    where?: NftLockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftLocks to fetch.
     * 
    **/
    orderBy?: Enumerable<NftLockOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: NftLockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftLocks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftLocks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NftLocks
    **/
    _count?: true | NftLockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NftLockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NftLockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NftLockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NftLockMaxAggregateInputType
  }

  export type GetNftLockAggregateType<T extends NftLockAggregateArgs> = {
        [P in keyof T & keyof AggregateNftLock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNftLock[P]>
      : GetScalarType<T[P], AggregateNftLock[P]>
  }




  export type NftLockGroupByArgs = {
    where?: NftLockWhereInput
    orderBy?: Enumerable<NftLockOrderByWithAggregationInput>
    by: Array<NftLockScalarFieldEnum>
    having?: NftLockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NftLockCountAggregateInputType | true
    _avg?: NftLockAvgAggregateInputType
    _sum?: NftLockSumAggregateInputType
    _min?: NftLockMinAggregateInputType
    _max?: NftLockMaxAggregateInputType
  }


  export type NftLockGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    asset_id: string
    locked_until_round: number
    _count: NftLockCountAggregateOutputType | null
    _avg: NftLockAvgAggregateOutputType | null
    _sum: NftLockSumAggregateOutputType | null
    _min: NftLockMinAggregateOutputType | null
    _max: NftLockMaxAggregateOutputType | null
  }

  type GetNftLockGroupByPayload<T extends NftLockGroupByArgs> = PrismaPromise<
    Array<
      PickArray<NftLockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NftLockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NftLockGroupByOutputType[P]>
            : GetScalarType<T[P], NftLockGroupByOutputType[P]>
        }
      >
    >


  export type NftLockSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    asset_id?: boolean
    locked_until_round?: boolean
  }


  export type NftLockGetPayload<S extends boolean | null | undefined | NftLockArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? NftLock :
    S extends undefined ? never :
    S extends { include: any } & (NftLockArgs | NftLockFindManyArgs)
    ? NftLock 
    : S extends { select: any } & (NftLockArgs | NftLockFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof NftLock ? NftLock[P] : never
  } 
      : NftLock


  type NftLockCountArgs = Merge<
    Omit<NftLockFindManyArgs, 'select' | 'include'> & {
      select?: NftLockCountAggregateInputType | true
    }
  >

  export interface NftLockDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one NftLock that matches the filter.
     * @param {NftLockFindUniqueArgs} args - Arguments to find a NftLock
     * @example
     * // Get one NftLock
     * const nftLock = await prisma.nftLock.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NftLockFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NftLockFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'NftLock'> extends True ? Prisma__NftLockClient<NftLockGetPayload<T>> : Prisma__NftLockClient<NftLockGetPayload<T> | null, null>

    /**
     * Find one NftLock that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {NftLockFindUniqueOrThrowArgs} args - Arguments to find a NftLock
     * @example
     * // Get one NftLock
     * const nftLock = await prisma.nftLock.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends NftLockFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, NftLockFindUniqueOrThrowArgs>
    ): Prisma__NftLockClient<NftLockGetPayload<T>>

    /**
     * Find the first NftLock that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftLockFindFirstArgs} args - Arguments to find a NftLock
     * @example
     * // Get one NftLock
     * const nftLock = await prisma.nftLock.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NftLockFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NftLockFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'NftLock'> extends True ? Prisma__NftLockClient<NftLockGetPayload<T>> : Prisma__NftLockClient<NftLockGetPayload<T> | null, null>

    /**
     * Find the first NftLock that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftLockFindFirstOrThrowArgs} args - Arguments to find a NftLock
     * @example
     * // Get one NftLock
     * const nftLock = await prisma.nftLock.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends NftLockFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NftLockFindFirstOrThrowArgs>
    ): Prisma__NftLockClient<NftLockGetPayload<T>>

    /**
     * Find zero or more NftLocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftLockFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NftLocks
     * const nftLocks = await prisma.nftLock.findMany()
     * 
     * // Get first 10 NftLocks
     * const nftLocks = await prisma.nftLock.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const nftLockWithSequenceOnly = await prisma.nftLock.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends NftLockFindManyArgs>(
      args?: SelectSubset<T, NftLockFindManyArgs>
    ): PrismaPromise<Array<NftLockGetPayload<T>>>

    /**
     * Create a NftLock.
     * @param {NftLockCreateArgs} args - Arguments to create a NftLock.
     * @example
     * // Create one NftLock
     * const NftLock = await prisma.nftLock.create({
     *   data: {
     *     // ... data to create a NftLock
     *   }
     * })
     * 
    **/
    create<T extends NftLockCreateArgs>(
      args: SelectSubset<T, NftLockCreateArgs>
    ): Prisma__NftLockClient<NftLockGetPayload<T>>

    /**
     * Delete a NftLock.
     * @param {NftLockDeleteArgs} args - Arguments to delete one NftLock.
     * @example
     * // Delete one NftLock
     * const NftLock = await prisma.nftLock.delete({
     *   where: {
     *     // ... filter to delete one NftLock
     *   }
     * })
     * 
    **/
    delete<T extends NftLockDeleteArgs>(
      args: SelectSubset<T, NftLockDeleteArgs>
    ): Prisma__NftLockClient<NftLockGetPayload<T>>

    /**
     * Update one NftLock.
     * @param {NftLockUpdateArgs} args - Arguments to update one NftLock.
     * @example
     * // Update one NftLock
     * const nftLock = await prisma.nftLock.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NftLockUpdateArgs>(
      args: SelectSubset<T, NftLockUpdateArgs>
    ): Prisma__NftLockClient<NftLockGetPayload<T>>

    /**
     * Delete zero or more NftLocks.
     * @param {NftLockDeleteManyArgs} args - Arguments to filter NftLocks to delete.
     * @example
     * // Delete a few NftLocks
     * const { count } = await prisma.nftLock.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NftLockDeleteManyArgs>(
      args?: SelectSubset<T, NftLockDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more NftLocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftLockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NftLocks
     * const nftLock = await prisma.nftLock.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NftLockUpdateManyArgs>(
      args: SelectSubset<T, NftLockUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one NftLock.
     * @param {NftLockUpsertArgs} args - Arguments to update or create a NftLock.
     * @example
     * // Update or create a NftLock
     * const nftLock = await prisma.nftLock.upsert({
     *   create: {
     *     // ... data to create a NftLock
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NftLock we want to update
     *   }
     * })
    **/
    upsert<T extends NftLockUpsertArgs>(
      args: SelectSubset<T, NftLockUpsertArgs>
    ): Prisma__NftLockClient<NftLockGetPayload<T>>

    /**
     * Count the number of NftLocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftLockCountArgs} args - Arguments to filter NftLocks to count.
     * @example
     * // Count the number of NftLocks
     * const count = await prisma.nftLock.count({
     *   where: {
     *     // ... the filter for the NftLocks we want to count
     *   }
     * })
    **/
    count<T extends NftLockCountArgs>(
      args?: Subset<T, NftLockCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NftLockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NftLock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftLockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NftLockAggregateArgs>(args: Subset<T, NftLockAggregateArgs>): PrismaPromise<GetNftLockAggregateType<T>>

    /**
     * Group by NftLock.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftLockGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NftLockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NftLockGroupByArgs['orderBy'] }
        : { orderBy?: NftLockGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NftLockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNftLockGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for NftLock.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NftLockClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * NftLock base type for findUnique actions
   */
  export type NftLockFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * Filter, which NftLock to fetch.
     * 
    **/
    where: NftLockWhereUniqueInput
  }

  /**
   * NftLock findUnique
   */
  export interface NftLockFindUniqueArgs extends NftLockFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * NftLock findUniqueOrThrow
   */
  export type NftLockFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * Filter, which NftLock to fetch.
     * 
    **/
    where: NftLockWhereUniqueInput
  }


  /**
   * NftLock base type for findFirst actions
   */
  export type NftLockFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * Filter, which NftLock to fetch.
     * 
    **/
    where?: NftLockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftLocks to fetch.
     * 
    **/
    orderBy?: Enumerable<NftLockOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NftLocks.
     * 
    **/
    cursor?: NftLockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftLocks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftLocks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NftLocks.
     * 
    **/
    distinct?: Enumerable<NftLockScalarFieldEnum>
  }

  /**
   * NftLock findFirst
   */
  export interface NftLockFindFirstArgs extends NftLockFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * NftLock findFirstOrThrow
   */
  export type NftLockFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * Filter, which NftLock to fetch.
     * 
    **/
    where?: NftLockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftLocks to fetch.
     * 
    **/
    orderBy?: Enumerable<NftLockOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NftLocks.
     * 
    **/
    cursor?: NftLockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftLocks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftLocks.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NftLocks.
     * 
    **/
    distinct?: Enumerable<NftLockScalarFieldEnum>
  }


  /**
   * NftLock findMany
   */
  export type NftLockFindManyArgs = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * Filter, which NftLocks to fetch.
     * 
    **/
    where?: NftLockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftLocks to fetch.
     * 
    **/
    orderBy?: Enumerable<NftLockOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NftLocks.
     * 
    **/
    cursor?: NftLockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftLocks from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftLocks.
     * 
    **/
    skip?: number
    distinct?: Enumerable<NftLockScalarFieldEnum>
  }


  /**
   * NftLock create
   */
  export type NftLockCreateArgs = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * The data needed to create a NftLock.
     * 
    **/
    data: XOR<NftLockCreateInput, NftLockUncheckedCreateInput>
  }


  /**
   * NftLock update
   */
  export type NftLockUpdateArgs = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * The data needed to update a NftLock.
     * 
    **/
    data: XOR<NftLockUpdateInput, NftLockUncheckedUpdateInput>
    /**
     * Choose, which NftLock to update.
     * 
    **/
    where: NftLockWhereUniqueInput
  }


  /**
   * NftLock updateMany
   */
  export type NftLockUpdateManyArgs = {
    /**
     * The data used to update NftLocks.
     * 
    **/
    data: XOR<NftLockUpdateManyMutationInput, NftLockUncheckedUpdateManyInput>
    /**
     * Filter which NftLocks to update
     * 
    **/
    where?: NftLockWhereInput
  }


  /**
   * NftLock upsert
   */
  export type NftLockUpsertArgs = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * The filter to search for the NftLock to update in case it exists.
     * 
    **/
    where: NftLockWhereUniqueInput
    /**
     * In case the NftLock found by the `where` argument doesn't exist, create a new NftLock with this data.
     * 
    **/
    create: XOR<NftLockCreateInput, NftLockUncheckedCreateInput>
    /**
     * In case the NftLock was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<NftLockUpdateInput, NftLockUncheckedUpdateInput>
  }


  /**
   * NftLock delete
   */
  export type NftLockDeleteArgs = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
    /**
     * Filter which NftLock to delete.
     * 
    **/
    where: NftLockWhereUniqueInput
  }


  /**
   * NftLock deleteMany
   */
  export type NftLockDeleteManyArgs = {
    /**
     * Filter which NftLocks to delete
     * 
    **/
    where?: NftLockWhereInput
  }


  /**
   * NftLock without action
   */
  export type NftLockArgs = {
    /**
     * Select specific fields to fetch from the NftLock
     * 
    **/
    select?: NftLockSelect | null
  }



  /**
   * Model NftWithdraw
   */


  export type AggregateNftWithdraw = {
    _count: NftWithdrawCountAggregateOutputType | null
    _avg: NftWithdrawAvgAggregateOutputType | null
    _sum: NftWithdrawSumAggregateOutputType | null
    _min: NftWithdrawMinAggregateOutputType | null
    _max: NftWithdrawMaxAggregateOutputType | null
  }

  export type NftWithdrawAvgAggregateOutputType = {
    sequence: number | null
  }

  export type NftWithdrawSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type NftWithdrawMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    asset_ids: string | null
    to: string | null
  }

  export type NftWithdrawMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    asset_ids: string | null
    to: string | null
  }

  export type NftWithdrawCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    asset_ids: number
    to: number
    _all: number
  }


  export type NftWithdrawAvgAggregateInputType = {
    sequence?: true
  }

  export type NftWithdrawSumAggregateInputType = {
    sequence?: true
  }

  export type NftWithdrawMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    asset_ids?: true
    to?: true
  }

  export type NftWithdrawMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    asset_ids?: true
    to?: true
  }

  export type NftWithdrawCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    asset_ids?: true
    to?: true
    _all?: true
  }

  export type NftWithdrawAggregateArgs = {
    /**
     * Filter which NftWithdraw to aggregate.
     * 
    **/
    where?: NftWithdrawWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftWithdraws to fetch.
     * 
    **/
    orderBy?: Enumerable<NftWithdrawOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: NftWithdrawWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftWithdraws from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftWithdraws.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NftWithdraws
    **/
    _count?: true | NftWithdrawCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NftWithdrawAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NftWithdrawSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NftWithdrawMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NftWithdrawMaxAggregateInputType
  }

  export type GetNftWithdrawAggregateType<T extends NftWithdrawAggregateArgs> = {
        [P in keyof T & keyof AggregateNftWithdraw]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNftWithdraw[P]>
      : GetScalarType<T[P], AggregateNftWithdraw[P]>
  }




  export type NftWithdrawGroupByArgs = {
    where?: NftWithdrawWhereInput
    orderBy?: Enumerable<NftWithdrawOrderByWithAggregationInput>
    by: Array<NftWithdrawScalarFieldEnum>
    having?: NftWithdrawScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NftWithdrawCountAggregateInputType | true
    _avg?: NftWithdrawAvgAggregateInputType
    _sum?: NftWithdrawSumAggregateInputType
    _min?: NftWithdrawMinAggregateInputType
    _max?: NftWithdrawMaxAggregateInputType
  }


  export type NftWithdrawGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    asset_ids: string
    to: string
    _count: NftWithdrawCountAggregateOutputType | null
    _avg: NftWithdrawAvgAggregateOutputType | null
    _sum: NftWithdrawSumAggregateOutputType | null
    _min: NftWithdrawMinAggregateOutputType | null
    _max: NftWithdrawMaxAggregateOutputType | null
  }

  type GetNftWithdrawGroupByPayload<T extends NftWithdrawGroupByArgs> = PrismaPromise<
    Array<
      PickArray<NftWithdrawGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NftWithdrawGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NftWithdrawGroupByOutputType[P]>
            : GetScalarType<T[P], NftWithdrawGroupByOutputType[P]>
        }
      >
    >


  export type NftWithdrawSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    asset_ids?: boolean
    to?: boolean
  }


  export type NftWithdrawGetPayload<S extends boolean | null | undefined | NftWithdrawArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? NftWithdraw :
    S extends undefined ? never :
    S extends { include: any } & (NftWithdrawArgs | NftWithdrawFindManyArgs)
    ? NftWithdraw 
    : S extends { select: any } & (NftWithdrawArgs | NftWithdrawFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof NftWithdraw ? NftWithdraw[P] : never
  } 
      : NftWithdraw


  type NftWithdrawCountArgs = Merge<
    Omit<NftWithdrawFindManyArgs, 'select' | 'include'> & {
      select?: NftWithdrawCountAggregateInputType | true
    }
  >

  export interface NftWithdrawDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one NftWithdraw that matches the filter.
     * @param {NftWithdrawFindUniqueArgs} args - Arguments to find a NftWithdraw
     * @example
     * // Get one NftWithdraw
     * const nftWithdraw = await prisma.nftWithdraw.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NftWithdrawFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NftWithdrawFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'NftWithdraw'> extends True ? Prisma__NftWithdrawClient<NftWithdrawGetPayload<T>> : Prisma__NftWithdrawClient<NftWithdrawGetPayload<T> | null, null>

    /**
     * Find one NftWithdraw that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {NftWithdrawFindUniqueOrThrowArgs} args - Arguments to find a NftWithdraw
     * @example
     * // Get one NftWithdraw
     * const nftWithdraw = await prisma.nftWithdraw.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends NftWithdrawFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, NftWithdrawFindUniqueOrThrowArgs>
    ): Prisma__NftWithdrawClient<NftWithdrawGetPayload<T>>

    /**
     * Find the first NftWithdraw that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftWithdrawFindFirstArgs} args - Arguments to find a NftWithdraw
     * @example
     * // Get one NftWithdraw
     * const nftWithdraw = await prisma.nftWithdraw.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NftWithdrawFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NftWithdrawFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'NftWithdraw'> extends True ? Prisma__NftWithdrawClient<NftWithdrawGetPayload<T>> : Prisma__NftWithdrawClient<NftWithdrawGetPayload<T> | null, null>

    /**
     * Find the first NftWithdraw that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftWithdrawFindFirstOrThrowArgs} args - Arguments to find a NftWithdraw
     * @example
     * // Get one NftWithdraw
     * const nftWithdraw = await prisma.nftWithdraw.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends NftWithdrawFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NftWithdrawFindFirstOrThrowArgs>
    ): Prisma__NftWithdrawClient<NftWithdrawGetPayload<T>>

    /**
     * Find zero or more NftWithdraws that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftWithdrawFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NftWithdraws
     * const nftWithdraws = await prisma.nftWithdraw.findMany()
     * 
     * // Get first 10 NftWithdraws
     * const nftWithdraws = await prisma.nftWithdraw.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const nftWithdrawWithSequenceOnly = await prisma.nftWithdraw.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends NftWithdrawFindManyArgs>(
      args?: SelectSubset<T, NftWithdrawFindManyArgs>
    ): PrismaPromise<Array<NftWithdrawGetPayload<T>>>

    /**
     * Create a NftWithdraw.
     * @param {NftWithdrawCreateArgs} args - Arguments to create a NftWithdraw.
     * @example
     * // Create one NftWithdraw
     * const NftWithdraw = await prisma.nftWithdraw.create({
     *   data: {
     *     // ... data to create a NftWithdraw
     *   }
     * })
     * 
    **/
    create<T extends NftWithdrawCreateArgs>(
      args: SelectSubset<T, NftWithdrawCreateArgs>
    ): Prisma__NftWithdrawClient<NftWithdrawGetPayload<T>>

    /**
     * Delete a NftWithdraw.
     * @param {NftWithdrawDeleteArgs} args - Arguments to delete one NftWithdraw.
     * @example
     * // Delete one NftWithdraw
     * const NftWithdraw = await prisma.nftWithdraw.delete({
     *   where: {
     *     // ... filter to delete one NftWithdraw
     *   }
     * })
     * 
    **/
    delete<T extends NftWithdrawDeleteArgs>(
      args: SelectSubset<T, NftWithdrawDeleteArgs>
    ): Prisma__NftWithdrawClient<NftWithdrawGetPayload<T>>

    /**
     * Update one NftWithdraw.
     * @param {NftWithdrawUpdateArgs} args - Arguments to update one NftWithdraw.
     * @example
     * // Update one NftWithdraw
     * const nftWithdraw = await prisma.nftWithdraw.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NftWithdrawUpdateArgs>(
      args: SelectSubset<T, NftWithdrawUpdateArgs>
    ): Prisma__NftWithdrawClient<NftWithdrawGetPayload<T>>

    /**
     * Delete zero or more NftWithdraws.
     * @param {NftWithdrawDeleteManyArgs} args - Arguments to filter NftWithdraws to delete.
     * @example
     * // Delete a few NftWithdraws
     * const { count } = await prisma.nftWithdraw.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NftWithdrawDeleteManyArgs>(
      args?: SelectSubset<T, NftWithdrawDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more NftWithdraws.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftWithdrawUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NftWithdraws
     * const nftWithdraw = await prisma.nftWithdraw.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NftWithdrawUpdateManyArgs>(
      args: SelectSubset<T, NftWithdrawUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one NftWithdraw.
     * @param {NftWithdrawUpsertArgs} args - Arguments to update or create a NftWithdraw.
     * @example
     * // Update or create a NftWithdraw
     * const nftWithdraw = await prisma.nftWithdraw.upsert({
     *   create: {
     *     // ... data to create a NftWithdraw
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NftWithdraw we want to update
     *   }
     * })
    **/
    upsert<T extends NftWithdrawUpsertArgs>(
      args: SelectSubset<T, NftWithdrawUpsertArgs>
    ): Prisma__NftWithdrawClient<NftWithdrawGetPayload<T>>

    /**
     * Count the number of NftWithdraws.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftWithdrawCountArgs} args - Arguments to filter NftWithdraws to count.
     * @example
     * // Count the number of NftWithdraws
     * const count = await prisma.nftWithdraw.count({
     *   where: {
     *     // ... the filter for the NftWithdraws we want to count
     *   }
     * })
    **/
    count<T extends NftWithdrawCountArgs>(
      args?: Subset<T, NftWithdrawCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NftWithdrawCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NftWithdraw.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftWithdrawAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NftWithdrawAggregateArgs>(args: Subset<T, NftWithdrawAggregateArgs>): PrismaPromise<GetNftWithdrawAggregateType<T>>

    /**
     * Group by NftWithdraw.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftWithdrawGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NftWithdrawGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NftWithdrawGroupByArgs['orderBy'] }
        : { orderBy?: NftWithdrawGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NftWithdrawGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNftWithdrawGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for NftWithdraw.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NftWithdrawClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * NftWithdraw base type for findUnique actions
   */
  export type NftWithdrawFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * Filter, which NftWithdraw to fetch.
     * 
    **/
    where: NftWithdrawWhereUniqueInput
  }

  /**
   * NftWithdraw findUnique
   */
  export interface NftWithdrawFindUniqueArgs extends NftWithdrawFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * NftWithdraw findUniqueOrThrow
   */
  export type NftWithdrawFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * Filter, which NftWithdraw to fetch.
     * 
    **/
    where: NftWithdrawWhereUniqueInput
  }


  /**
   * NftWithdraw base type for findFirst actions
   */
  export type NftWithdrawFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * Filter, which NftWithdraw to fetch.
     * 
    **/
    where?: NftWithdrawWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftWithdraws to fetch.
     * 
    **/
    orderBy?: Enumerable<NftWithdrawOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NftWithdraws.
     * 
    **/
    cursor?: NftWithdrawWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftWithdraws from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftWithdraws.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NftWithdraws.
     * 
    **/
    distinct?: Enumerable<NftWithdrawScalarFieldEnum>
  }

  /**
   * NftWithdraw findFirst
   */
  export interface NftWithdrawFindFirstArgs extends NftWithdrawFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * NftWithdraw findFirstOrThrow
   */
  export type NftWithdrawFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * Filter, which NftWithdraw to fetch.
     * 
    **/
    where?: NftWithdrawWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftWithdraws to fetch.
     * 
    **/
    orderBy?: Enumerable<NftWithdrawOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NftWithdraws.
     * 
    **/
    cursor?: NftWithdrawWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftWithdraws from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftWithdraws.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NftWithdraws.
     * 
    **/
    distinct?: Enumerable<NftWithdrawScalarFieldEnum>
  }


  /**
   * NftWithdraw findMany
   */
  export type NftWithdrawFindManyArgs = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * Filter, which NftWithdraws to fetch.
     * 
    **/
    where?: NftWithdrawWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftWithdraws to fetch.
     * 
    **/
    orderBy?: Enumerable<NftWithdrawOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NftWithdraws.
     * 
    **/
    cursor?: NftWithdrawWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftWithdraws from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftWithdraws.
     * 
    **/
    skip?: number
    distinct?: Enumerable<NftWithdrawScalarFieldEnum>
  }


  /**
   * NftWithdraw create
   */
  export type NftWithdrawCreateArgs = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * The data needed to create a NftWithdraw.
     * 
    **/
    data: XOR<NftWithdrawCreateInput, NftWithdrawUncheckedCreateInput>
  }


  /**
   * NftWithdraw update
   */
  export type NftWithdrawUpdateArgs = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * The data needed to update a NftWithdraw.
     * 
    **/
    data: XOR<NftWithdrawUpdateInput, NftWithdrawUncheckedUpdateInput>
    /**
     * Choose, which NftWithdraw to update.
     * 
    **/
    where: NftWithdrawWhereUniqueInput
  }


  /**
   * NftWithdraw updateMany
   */
  export type NftWithdrawUpdateManyArgs = {
    /**
     * The data used to update NftWithdraws.
     * 
    **/
    data: XOR<NftWithdrawUpdateManyMutationInput, NftWithdrawUncheckedUpdateManyInput>
    /**
     * Filter which NftWithdraws to update
     * 
    **/
    where?: NftWithdrawWhereInput
  }


  /**
   * NftWithdraw upsert
   */
  export type NftWithdrawUpsertArgs = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * The filter to search for the NftWithdraw to update in case it exists.
     * 
    **/
    where: NftWithdrawWhereUniqueInput
    /**
     * In case the NftWithdraw found by the `where` argument doesn't exist, create a new NftWithdraw with this data.
     * 
    **/
    create: XOR<NftWithdrawCreateInput, NftWithdrawUncheckedCreateInput>
    /**
     * In case the NftWithdraw was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<NftWithdrawUpdateInput, NftWithdrawUncheckedUpdateInput>
  }


  /**
   * NftWithdraw delete
   */
  export type NftWithdrawDeleteArgs = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
    /**
     * Filter which NftWithdraw to delete.
     * 
    **/
    where: NftWithdrawWhereUniqueInput
  }


  /**
   * NftWithdraw deleteMany
   */
  export type NftWithdrawDeleteManyArgs = {
    /**
     * Filter which NftWithdraws to delete
     * 
    **/
    where?: NftWithdrawWhereInput
  }


  /**
   * NftWithdraw without action
   */
  export type NftWithdrawArgs = {
    /**
     * Select specific fields to fetch from the NftWithdraw
     * 
    **/
    select?: NftWithdrawSelect | null
  }



  /**
   * Model NftXfer
   */


  export type AggregateNftXfer = {
    _count: NftXferCountAggregateOutputType | null
    _avg: NftXferAvgAggregateOutputType | null
    _sum: NftXferSumAggregateOutputType | null
    _min: NftXferMinAggregateOutputType | null
    _max: NftXferMaxAggregateOutputType | null
  }

  export type NftXferAvgAggregateOutputType = {
    sequence: number | null
  }

  export type NftXferSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type NftXferMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    from_boid_id: string | null
    to_boid_id: string | null
    asset_ids: string | null
  }

  export type NftXferMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    from_boid_id: string | null
    to_boid_id: string | null
    asset_ids: string | null
  }

  export type NftXferCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    from_boid_id: number
    to_boid_id: number
    asset_ids: number
    _all: number
  }


  export type NftXferAvgAggregateInputType = {
    sequence?: true
  }

  export type NftXferSumAggregateInputType = {
    sequence?: true
  }

  export type NftXferMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    from_boid_id?: true
    to_boid_id?: true
    asset_ids?: true
  }

  export type NftXferMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    from_boid_id?: true
    to_boid_id?: true
    asset_ids?: true
  }

  export type NftXferCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    from_boid_id?: true
    to_boid_id?: true
    asset_ids?: true
    _all?: true
  }

  export type NftXferAggregateArgs = {
    /**
     * Filter which NftXfer to aggregate.
     * 
    **/
    where?: NftXferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftXfers to fetch.
     * 
    **/
    orderBy?: Enumerable<NftXferOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: NftXferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftXfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftXfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NftXfers
    **/
    _count?: true | NftXferCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NftXferAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NftXferSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NftXferMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NftXferMaxAggregateInputType
  }

  export type GetNftXferAggregateType<T extends NftXferAggregateArgs> = {
        [P in keyof T & keyof AggregateNftXfer]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNftXfer[P]>
      : GetScalarType<T[P], AggregateNftXfer[P]>
  }




  export type NftXferGroupByArgs = {
    where?: NftXferWhereInput
    orderBy?: Enumerable<NftXferOrderByWithAggregationInput>
    by: Array<NftXferScalarFieldEnum>
    having?: NftXferScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NftXferCountAggregateInputType | true
    _avg?: NftXferAvgAggregateInputType
    _sum?: NftXferSumAggregateInputType
    _min?: NftXferMinAggregateInputType
    _max?: NftXferMaxAggregateInputType
  }


  export type NftXferGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    from_boid_id: string
    to_boid_id: string
    asset_ids: string
    _count: NftXferCountAggregateOutputType | null
    _avg: NftXferAvgAggregateOutputType | null
    _sum: NftXferSumAggregateOutputType | null
    _min: NftXferMinAggregateOutputType | null
    _max: NftXferMaxAggregateOutputType | null
  }

  type GetNftXferGroupByPayload<T extends NftXferGroupByArgs> = PrismaPromise<
    Array<
      PickArray<NftXferGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NftXferGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NftXferGroupByOutputType[P]>
            : GetScalarType<T[P], NftXferGroupByOutputType[P]>
        }
      >
    >


  export type NftXferSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    from_boid_id?: boolean
    to_boid_id?: boolean
    asset_ids?: boolean
  }


  export type NftXferGetPayload<S extends boolean | null | undefined | NftXferArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? NftXfer :
    S extends undefined ? never :
    S extends { include: any } & (NftXferArgs | NftXferFindManyArgs)
    ? NftXfer 
    : S extends { select: any } & (NftXferArgs | NftXferFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof NftXfer ? NftXfer[P] : never
  } 
      : NftXfer


  type NftXferCountArgs = Merge<
    Omit<NftXferFindManyArgs, 'select' | 'include'> & {
      select?: NftXferCountAggregateInputType | true
    }
  >

  export interface NftXferDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one NftXfer that matches the filter.
     * @param {NftXferFindUniqueArgs} args - Arguments to find a NftXfer
     * @example
     * // Get one NftXfer
     * const nftXfer = await prisma.nftXfer.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends NftXferFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, NftXferFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'NftXfer'> extends True ? Prisma__NftXferClient<NftXferGetPayload<T>> : Prisma__NftXferClient<NftXferGetPayload<T> | null, null>

    /**
     * Find one NftXfer that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {NftXferFindUniqueOrThrowArgs} args - Arguments to find a NftXfer
     * @example
     * // Get one NftXfer
     * const nftXfer = await prisma.nftXfer.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends NftXferFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, NftXferFindUniqueOrThrowArgs>
    ): Prisma__NftXferClient<NftXferGetPayload<T>>

    /**
     * Find the first NftXfer that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftXferFindFirstArgs} args - Arguments to find a NftXfer
     * @example
     * // Get one NftXfer
     * const nftXfer = await prisma.nftXfer.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends NftXferFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, NftXferFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'NftXfer'> extends True ? Prisma__NftXferClient<NftXferGetPayload<T>> : Prisma__NftXferClient<NftXferGetPayload<T> | null, null>

    /**
     * Find the first NftXfer that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftXferFindFirstOrThrowArgs} args - Arguments to find a NftXfer
     * @example
     * // Get one NftXfer
     * const nftXfer = await prisma.nftXfer.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends NftXferFindFirstOrThrowArgs>(
      args?: SelectSubset<T, NftXferFindFirstOrThrowArgs>
    ): Prisma__NftXferClient<NftXferGetPayload<T>>

    /**
     * Find zero or more NftXfers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftXferFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NftXfers
     * const nftXfers = await prisma.nftXfer.findMany()
     * 
     * // Get first 10 NftXfers
     * const nftXfers = await prisma.nftXfer.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const nftXferWithSequenceOnly = await prisma.nftXfer.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends NftXferFindManyArgs>(
      args?: SelectSubset<T, NftXferFindManyArgs>
    ): PrismaPromise<Array<NftXferGetPayload<T>>>

    /**
     * Create a NftXfer.
     * @param {NftXferCreateArgs} args - Arguments to create a NftXfer.
     * @example
     * // Create one NftXfer
     * const NftXfer = await prisma.nftXfer.create({
     *   data: {
     *     // ... data to create a NftXfer
     *   }
     * })
     * 
    **/
    create<T extends NftXferCreateArgs>(
      args: SelectSubset<T, NftXferCreateArgs>
    ): Prisma__NftXferClient<NftXferGetPayload<T>>

    /**
     * Delete a NftXfer.
     * @param {NftXferDeleteArgs} args - Arguments to delete one NftXfer.
     * @example
     * // Delete one NftXfer
     * const NftXfer = await prisma.nftXfer.delete({
     *   where: {
     *     // ... filter to delete one NftXfer
     *   }
     * })
     * 
    **/
    delete<T extends NftXferDeleteArgs>(
      args: SelectSubset<T, NftXferDeleteArgs>
    ): Prisma__NftXferClient<NftXferGetPayload<T>>

    /**
     * Update one NftXfer.
     * @param {NftXferUpdateArgs} args - Arguments to update one NftXfer.
     * @example
     * // Update one NftXfer
     * const nftXfer = await prisma.nftXfer.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends NftXferUpdateArgs>(
      args: SelectSubset<T, NftXferUpdateArgs>
    ): Prisma__NftXferClient<NftXferGetPayload<T>>

    /**
     * Delete zero or more NftXfers.
     * @param {NftXferDeleteManyArgs} args - Arguments to filter NftXfers to delete.
     * @example
     * // Delete a few NftXfers
     * const { count } = await prisma.nftXfer.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends NftXferDeleteManyArgs>(
      args?: SelectSubset<T, NftXferDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more NftXfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftXferUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NftXfers
     * const nftXfer = await prisma.nftXfer.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends NftXferUpdateManyArgs>(
      args: SelectSubset<T, NftXferUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one NftXfer.
     * @param {NftXferUpsertArgs} args - Arguments to update or create a NftXfer.
     * @example
     * // Update or create a NftXfer
     * const nftXfer = await prisma.nftXfer.upsert({
     *   create: {
     *     // ... data to create a NftXfer
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NftXfer we want to update
     *   }
     * })
    **/
    upsert<T extends NftXferUpsertArgs>(
      args: SelectSubset<T, NftXferUpsertArgs>
    ): Prisma__NftXferClient<NftXferGetPayload<T>>

    /**
     * Count the number of NftXfers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftXferCountArgs} args - Arguments to filter NftXfers to count.
     * @example
     * // Count the number of NftXfers
     * const count = await prisma.nftXfer.count({
     *   where: {
     *     // ... the filter for the NftXfers we want to count
     *   }
     * })
    **/
    count<T extends NftXferCountArgs>(
      args?: Subset<T, NftXferCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NftXferCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NftXfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftXferAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NftXferAggregateArgs>(args: Subset<T, NftXferAggregateArgs>): PrismaPromise<GetNftXferAggregateType<T>>

    /**
     * Group by NftXfer.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NftXferGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NftXferGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NftXferGroupByArgs['orderBy'] }
        : { orderBy?: NftXferGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NftXferGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNftXferGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for NftXfer.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__NftXferClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * NftXfer base type for findUnique actions
   */
  export type NftXferFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * Filter, which NftXfer to fetch.
     * 
    **/
    where: NftXferWhereUniqueInput
  }

  /**
   * NftXfer findUnique
   */
  export interface NftXferFindUniqueArgs extends NftXferFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * NftXfer findUniqueOrThrow
   */
  export type NftXferFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * Filter, which NftXfer to fetch.
     * 
    **/
    where: NftXferWhereUniqueInput
  }


  /**
   * NftXfer base type for findFirst actions
   */
  export type NftXferFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * Filter, which NftXfer to fetch.
     * 
    **/
    where?: NftXferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftXfers to fetch.
     * 
    **/
    orderBy?: Enumerable<NftXferOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NftXfers.
     * 
    **/
    cursor?: NftXferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftXfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftXfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NftXfers.
     * 
    **/
    distinct?: Enumerable<NftXferScalarFieldEnum>
  }

  /**
   * NftXfer findFirst
   */
  export interface NftXferFindFirstArgs extends NftXferFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * NftXfer findFirstOrThrow
   */
  export type NftXferFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * Filter, which NftXfer to fetch.
     * 
    **/
    where?: NftXferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftXfers to fetch.
     * 
    **/
    orderBy?: Enumerable<NftXferOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NftXfers.
     * 
    **/
    cursor?: NftXferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftXfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftXfers.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NftXfers.
     * 
    **/
    distinct?: Enumerable<NftXferScalarFieldEnum>
  }


  /**
   * NftXfer findMany
   */
  export type NftXferFindManyArgs = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * Filter, which NftXfers to fetch.
     * 
    **/
    where?: NftXferWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NftXfers to fetch.
     * 
    **/
    orderBy?: Enumerable<NftXferOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NftXfers.
     * 
    **/
    cursor?: NftXferWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NftXfers from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NftXfers.
     * 
    **/
    skip?: number
    distinct?: Enumerable<NftXferScalarFieldEnum>
  }


  /**
   * NftXfer create
   */
  export type NftXferCreateArgs = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * The data needed to create a NftXfer.
     * 
    **/
    data: XOR<NftXferCreateInput, NftXferUncheckedCreateInput>
  }


  /**
   * NftXfer update
   */
  export type NftXferUpdateArgs = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * The data needed to update a NftXfer.
     * 
    **/
    data: XOR<NftXferUpdateInput, NftXferUncheckedUpdateInput>
    /**
     * Choose, which NftXfer to update.
     * 
    **/
    where: NftXferWhereUniqueInput
  }


  /**
   * NftXfer updateMany
   */
  export type NftXferUpdateManyArgs = {
    /**
     * The data used to update NftXfers.
     * 
    **/
    data: XOR<NftXferUpdateManyMutationInput, NftXferUncheckedUpdateManyInput>
    /**
     * Filter which NftXfers to update
     * 
    **/
    where?: NftXferWhereInput
  }


  /**
   * NftXfer upsert
   */
  export type NftXferUpsertArgs = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * The filter to search for the NftXfer to update in case it exists.
     * 
    **/
    where: NftXferWhereUniqueInput
    /**
     * In case the NftXfer found by the `where` argument doesn't exist, create a new NftXfer with this data.
     * 
    **/
    create: XOR<NftXferCreateInput, NftXferUncheckedCreateInput>
    /**
     * In case the NftXfer was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<NftXferUpdateInput, NftXferUncheckedUpdateInput>
  }


  /**
   * NftXfer delete
   */
  export type NftXferDeleteArgs = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
    /**
     * Filter which NftXfer to delete.
     * 
    **/
    where: NftXferWhereUniqueInput
  }


  /**
   * NftXfer deleteMany
   */
  export type NftXferDeleteManyArgs = {
    /**
     * Filter which NftXfers to delete
     * 
    **/
    where?: NftXferWhereInput
  }


  /**
   * NftXfer without action
   */
  export type NftXferArgs = {
    /**
     * Select specific fields to fetch from the NftXfer
     * 
    **/
    select?: NftXferSelect | null
  }



  /**
   * Model OfferClaim
   */


  export type AggregateOfferClaim = {
    _count: OfferClaimCountAggregateOutputType | null
    _avg: OfferClaimAvgAggregateOutputType | null
    _sum: OfferClaimSumAggregateOutputType | null
    _min: OfferClaimMinAggregateOutputType | null
    _max: OfferClaimMaxAggregateOutputType | null
  }

  export type OfferClaimAvgAggregateOutputType = {
    sequence: number | null
  }

  export type OfferClaimSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type OfferClaimMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    offer_id: string | null
    required_nft_action_ids: string | null
  }

  export type OfferClaimMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    offer_id: string | null
    required_nft_action_ids: string | null
  }

  export type OfferClaimCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    offer_id: number
    required_nft_action_ids: number
    _all: number
  }


  export type OfferClaimAvgAggregateInputType = {
    sequence?: true
  }

  export type OfferClaimSumAggregateInputType = {
    sequence?: true
  }

  export type OfferClaimMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    offer_id?: true
    required_nft_action_ids?: true
  }

  export type OfferClaimMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    offer_id?: true
    required_nft_action_ids?: true
  }

  export type OfferClaimCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    offer_id?: true
    required_nft_action_ids?: true
    _all?: true
  }

  export type OfferClaimAggregateArgs = {
    /**
     * Filter which OfferClaim to aggregate.
     * 
    **/
    where?: OfferClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfferClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<OfferClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: OfferClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfferClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfferClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OfferClaims
    **/
    _count?: true | OfferClaimCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OfferClaimAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OfferClaimSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OfferClaimMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OfferClaimMaxAggregateInputType
  }

  export type GetOfferClaimAggregateType<T extends OfferClaimAggregateArgs> = {
        [P in keyof T & keyof AggregateOfferClaim]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOfferClaim[P]>
      : GetScalarType<T[P], AggregateOfferClaim[P]>
  }




  export type OfferClaimGroupByArgs = {
    where?: OfferClaimWhereInput
    orderBy?: Enumerable<OfferClaimOrderByWithAggregationInput>
    by: Array<OfferClaimScalarFieldEnum>
    having?: OfferClaimScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OfferClaimCountAggregateInputType | true
    _avg?: OfferClaimAvgAggregateInputType
    _sum?: OfferClaimSumAggregateInputType
    _min?: OfferClaimMinAggregateInputType
    _max?: OfferClaimMaxAggregateInputType
  }


  export type OfferClaimGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    offer_id: string
    required_nft_action_ids: string
    _count: OfferClaimCountAggregateOutputType | null
    _avg: OfferClaimAvgAggregateOutputType | null
    _sum: OfferClaimSumAggregateOutputType | null
    _min: OfferClaimMinAggregateOutputType | null
    _max: OfferClaimMaxAggregateOutputType | null
  }

  type GetOfferClaimGroupByPayload<T extends OfferClaimGroupByArgs> = PrismaPromise<
    Array<
      PickArray<OfferClaimGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OfferClaimGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OfferClaimGroupByOutputType[P]>
            : GetScalarType<T[P], OfferClaimGroupByOutputType[P]>
        }
      >
    >


  export type OfferClaimSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    offer_id?: boolean
    required_nft_action_ids?: boolean
  }


  export type OfferClaimGetPayload<S extends boolean | null | undefined | OfferClaimArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? OfferClaim :
    S extends undefined ? never :
    S extends { include: any } & (OfferClaimArgs | OfferClaimFindManyArgs)
    ? OfferClaim 
    : S extends { select: any } & (OfferClaimArgs | OfferClaimFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof OfferClaim ? OfferClaim[P] : never
  } 
      : OfferClaim


  type OfferClaimCountArgs = Merge<
    Omit<OfferClaimFindManyArgs, 'select' | 'include'> & {
      select?: OfferClaimCountAggregateInputType | true
    }
  >

  export interface OfferClaimDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one OfferClaim that matches the filter.
     * @param {OfferClaimFindUniqueArgs} args - Arguments to find a OfferClaim
     * @example
     * // Get one OfferClaim
     * const offerClaim = await prisma.offerClaim.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OfferClaimFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, OfferClaimFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'OfferClaim'> extends True ? Prisma__OfferClaimClient<OfferClaimGetPayload<T>> : Prisma__OfferClaimClient<OfferClaimGetPayload<T> | null, null>

    /**
     * Find one OfferClaim that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {OfferClaimFindUniqueOrThrowArgs} args - Arguments to find a OfferClaim
     * @example
     * // Get one OfferClaim
     * const offerClaim = await prisma.offerClaim.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OfferClaimFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, OfferClaimFindUniqueOrThrowArgs>
    ): Prisma__OfferClaimClient<OfferClaimGetPayload<T>>

    /**
     * Find the first OfferClaim that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferClaimFindFirstArgs} args - Arguments to find a OfferClaim
     * @example
     * // Get one OfferClaim
     * const offerClaim = await prisma.offerClaim.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OfferClaimFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, OfferClaimFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'OfferClaim'> extends True ? Prisma__OfferClaimClient<OfferClaimGetPayload<T>> : Prisma__OfferClaimClient<OfferClaimGetPayload<T> | null, null>

    /**
     * Find the first OfferClaim that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferClaimFindFirstOrThrowArgs} args - Arguments to find a OfferClaim
     * @example
     * // Get one OfferClaim
     * const offerClaim = await prisma.offerClaim.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OfferClaimFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OfferClaimFindFirstOrThrowArgs>
    ): Prisma__OfferClaimClient<OfferClaimGetPayload<T>>

    /**
     * Find zero or more OfferClaims that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferClaimFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OfferClaims
     * const offerClaims = await prisma.offerClaim.findMany()
     * 
     * // Get first 10 OfferClaims
     * const offerClaims = await prisma.offerClaim.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const offerClaimWithSequenceOnly = await prisma.offerClaim.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends OfferClaimFindManyArgs>(
      args?: SelectSubset<T, OfferClaimFindManyArgs>
    ): PrismaPromise<Array<OfferClaimGetPayload<T>>>

    /**
     * Create a OfferClaim.
     * @param {OfferClaimCreateArgs} args - Arguments to create a OfferClaim.
     * @example
     * // Create one OfferClaim
     * const OfferClaim = await prisma.offerClaim.create({
     *   data: {
     *     // ... data to create a OfferClaim
     *   }
     * })
     * 
    **/
    create<T extends OfferClaimCreateArgs>(
      args: SelectSubset<T, OfferClaimCreateArgs>
    ): Prisma__OfferClaimClient<OfferClaimGetPayload<T>>

    /**
     * Delete a OfferClaim.
     * @param {OfferClaimDeleteArgs} args - Arguments to delete one OfferClaim.
     * @example
     * // Delete one OfferClaim
     * const OfferClaim = await prisma.offerClaim.delete({
     *   where: {
     *     // ... filter to delete one OfferClaim
     *   }
     * })
     * 
    **/
    delete<T extends OfferClaimDeleteArgs>(
      args: SelectSubset<T, OfferClaimDeleteArgs>
    ): Prisma__OfferClaimClient<OfferClaimGetPayload<T>>

    /**
     * Update one OfferClaim.
     * @param {OfferClaimUpdateArgs} args - Arguments to update one OfferClaim.
     * @example
     * // Update one OfferClaim
     * const offerClaim = await prisma.offerClaim.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OfferClaimUpdateArgs>(
      args: SelectSubset<T, OfferClaimUpdateArgs>
    ): Prisma__OfferClaimClient<OfferClaimGetPayload<T>>

    /**
     * Delete zero or more OfferClaims.
     * @param {OfferClaimDeleteManyArgs} args - Arguments to filter OfferClaims to delete.
     * @example
     * // Delete a few OfferClaims
     * const { count } = await prisma.offerClaim.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OfferClaimDeleteManyArgs>(
      args?: SelectSubset<T, OfferClaimDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more OfferClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferClaimUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OfferClaims
     * const offerClaim = await prisma.offerClaim.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OfferClaimUpdateManyArgs>(
      args: SelectSubset<T, OfferClaimUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one OfferClaim.
     * @param {OfferClaimUpsertArgs} args - Arguments to update or create a OfferClaim.
     * @example
     * // Update or create a OfferClaim
     * const offerClaim = await prisma.offerClaim.upsert({
     *   create: {
     *     // ... data to create a OfferClaim
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OfferClaim we want to update
     *   }
     * })
    **/
    upsert<T extends OfferClaimUpsertArgs>(
      args: SelectSubset<T, OfferClaimUpsertArgs>
    ): Prisma__OfferClaimClient<OfferClaimGetPayload<T>>

    /**
     * Count the number of OfferClaims.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferClaimCountArgs} args - Arguments to filter OfferClaims to count.
     * @example
     * // Count the number of OfferClaims
     * const count = await prisma.offerClaim.count({
     *   where: {
     *     // ... the filter for the OfferClaims we want to count
     *   }
     * })
    **/
    count<T extends OfferClaimCountArgs>(
      args?: Subset<T, OfferClaimCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OfferClaimCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OfferClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferClaimAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OfferClaimAggregateArgs>(args: Subset<T, OfferClaimAggregateArgs>): PrismaPromise<GetOfferClaimAggregateType<T>>

    /**
     * Group by OfferClaim.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OfferClaimGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OfferClaimGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OfferClaimGroupByArgs['orderBy'] }
        : { orderBy?: OfferClaimGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OfferClaimGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOfferClaimGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for OfferClaim.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OfferClaimClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * OfferClaim base type for findUnique actions
   */
  export type OfferClaimFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * Filter, which OfferClaim to fetch.
     * 
    **/
    where: OfferClaimWhereUniqueInput
  }

  /**
   * OfferClaim findUnique
   */
  export interface OfferClaimFindUniqueArgs extends OfferClaimFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * OfferClaim findUniqueOrThrow
   */
  export type OfferClaimFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * Filter, which OfferClaim to fetch.
     * 
    **/
    where: OfferClaimWhereUniqueInput
  }


  /**
   * OfferClaim base type for findFirst actions
   */
  export type OfferClaimFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * Filter, which OfferClaim to fetch.
     * 
    **/
    where?: OfferClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfferClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<OfferClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfferClaims.
     * 
    **/
    cursor?: OfferClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfferClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfferClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfferClaims.
     * 
    **/
    distinct?: Enumerable<OfferClaimScalarFieldEnum>
  }

  /**
   * OfferClaim findFirst
   */
  export interface OfferClaimFindFirstArgs extends OfferClaimFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * OfferClaim findFirstOrThrow
   */
  export type OfferClaimFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * Filter, which OfferClaim to fetch.
     * 
    **/
    where?: OfferClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfferClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<OfferClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OfferClaims.
     * 
    **/
    cursor?: OfferClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfferClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfferClaims.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OfferClaims.
     * 
    **/
    distinct?: Enumerable<OfferClaimScalarFieldEnum>
  }


  /**
   * OfferClaim findMany
   */
  export type OfferClaimFindManyArgs = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * Filter, which OfferClaims to fetch.
     * 
    **/
    where?: OfferClaimWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OfferClaims to fetch.
     * 
    **/
    orderBy?: Enumerable<OfferClaimOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OfferClaims.
     * 
    **/
    cursor?: OfferClaimWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OfferClaims from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OfferClaims.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OfferClaimScalarFieldEnum>
  }


  /**
   * OfferClaim create
   */
  export type OfferClaimCreateArgs = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * The data needed to create a OfferClaim.
     * 
    **/
    data: XOR<OfferClaimCreateInput, OfferClaimUncheckedCreateInput>
  }


  /**
   * OfferClaim update
   */
  export type OfferClaimUpdateArgs = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * The data needed to update a OfferClaim.
     * 
    **/
    data: XOR<OfferClaimUpdateInput, OfferClaimUncheckedUpdateInput>
    /**
     * Choose, which OfferClaim to update.
     * 
    **/
    where: OfferClaimWhereUniqueInput
  }


  /**
   * OfferClaim updateMany
   */
  export type OfferClaimUpdateManyArgs = {
    /**
     * The data used to update OfferClaims.
     * 
    **/
    data: XOR<OfferClaimUpdateManyMutationInput, OfferClaimUncheckedUpdateManyInput>
    /**
     * Filter which OfferClaims to update
     * 
    **/
    where?: OfferClaimWhereInput
  }


  /**
   * OfferClaim upsert
   */
  export type OfferClaimUpsertArgs = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * The filter to search for the OfferClaim to update in case it exists.
     * 
    **/
    where: OfferClaimWhereUniqueInput
    /**
     * In case the OfferClaim found by the `where` argument doesn't exist, create a new OfferClaim with this data.
     * 
    **/
    create: XOR<OfferClaimCreateInput, OfferClaimUncheckedCreateInput>
    /**
     * In case the OfferClaim was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<OfferClaimUpdateInput, OfferClaimUncheckedUpdateInput>
  }


  /**
   * OfferClaim delete
   */
  export type OfferClaimDeleteArgs = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
    /**
     * Filter which OfferClaim to delete.
     * 
    **/
    where: OfferClaimWhereUniqueInput
  }


  /**
   * OfferClaim deleteMany
   */
  export type OfferClaimDeleteManyArgs = {
    /**
     * Filter which OfferClaims to delete
     * 
    **/
    where?: OfferClaimWhereInput
  }


  /**
   * OfferClaim without action
   */
  export type OfferClaimArgs = {
    /**
     * Select specific fields to fetch from the OfferClaim
     * 
    **/
    select?: OfferClaimSelect | null
  }



  /**
   * Model OwnerAdd
   */


  export type AggregateOwnerAdd = {
    _count: OwnerAddCountAggregateOutputType | null
    _avg: OwnerAddAvgAggregateOutputType | null
    _sum: OwnerAddSumAggregateOutputType | null
    _min: OwnerAddMinAggregateOutputType | null
    _max: OwnerAddMaxAggregateOutputType | null
  }

  export type OwnerAddAvgAggregateOutputType = {
    sequence: number | null
  }

  export type OwnerAddSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type OwnerAddMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    owner: string | null
  }

  export type OwnerAddMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    owner: string | null
  }

  export type OwnerAddCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    owner: number
    _all: number
  }


  export type OwnerAddAvgAggregateInputType = {
    sequence?: true
  }

  export type OwnerAddSumAggregateInputType = {
    sequence?: true
  }

  export type OwnerAddMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    owner?: true
  }

  export type OwnerAddMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    owner?: true
  }

  export type OwnerAddCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    owner?: true
    _all?: true
  }

  export type OwnerAddAggregateArgs = {
    /**
     * Filter which OwnerAdd to aggregate.
     * 
    **/
    where?: OwnerAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnerAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<OwnerAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: OwnerAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnerAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnerAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OwnerAdds
    **/
    _count?: true | OwnerAddCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OwnerAddAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OwnerAddSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OwnerAddMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OwnerAddMaxAggregateInputType
  }

  export type GetOwnerAddAggregateType<T extends OwnerAddAggregateArgs> = {
        [P in keyof T & keyof AggregateOwnerAdd]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOwnerAdd[P]>
      : GetScalarType<T[P], AggregateOwnerAdd[P]>
  }




  export type OwnerAddGroupByArgs = {
    where?: OwnerAddWhereInput
    orderBy?: Enumerable<OwnerAddOrderByWithAggregationInput>
    by: Array<OwnerAddScalarFieldEnum>
    having?: OwnerAddScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OwnerAddCountAggregateInputType | true
    _avg?: OwnerAddAvgAggregateInputType
    _sum?: OwnerAddSumAggregateInputType
    _min?: OwnerAddMinAggregateInputType
    _max?: OwnerAddMaxAggregateInputType
  }


  export type OwnerAddGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    owner: string
    _count: OwnerAddCountAggregateOutputType | null
    _avg: OwnerAddAvgAggregateOutputType | null
    _sum: OwnerAddSumAggregateOutputType | null
    _min: OwnerAddMinAggregateOutputType | null
    _max: OwnerAddMaxAggregateOutputType | null
  }

  type GetOwnerAddGroupByPayload<T extends OwnerAddGroupByArgs> = PrismaPromise<
    Array<
      PickArray<OwnerAddGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OwnerAddGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OwnerAddGroupByOutputType[P]>
            : GetScalarType<T[P], OwnerAddGroupByOutputType[P]>
        }
      >
    >


  export type OwnerAddSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    owner?: boolean
  }


  export type OwnerAddGetPayload<S extends boolean | null | undefined | OwnerAddArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? OwnerAdd :
    S extends undefined ? never :
    S extends { include: any } & (OwnerAddArgs | OwnerAddFindManyArgs)
    ? OwnerAdd 
    : S extends { select: any } & (OwnerAddArgs | OwnerAddFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof OwnerAdd ? OwnerAdd[P] : never
  } 
      : OwnerAdd


  type OwnerAddCountArgs = Merge<
    Omit<OwnerAddFindManyArgs, 'select' | 'include'> & {
      select?: OwnerAddCountAggregateInputType | true
    }
  >

  export interface OwnerAddDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one OwnerAdd that matches the filter.
     * @param {OwnerAddFindUniqueArgs} args - Arguments to find a OwnerAdd
     * @example
     * // Get one OwnerAdd
     * const ownerAdd = await prisma.ownerAdd.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OwnerAddFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, OwnerAddFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'OwnerAdd'> extends True ? Prisma__OwnerAddClient<OwnerAddGetPayload<T>> : Prisma__OwnerAddClient<OwnerAddGetPayload<T> | null, null>

    /**
     * Find one OwnerAdd that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {OwnerAddFindUniqueOrThrowArgs} args - Arguments to find a OwnerAdd
     * @example
     * // Get one OwnerAdd
     * const ownerAdd = await prisma.ownerAdd.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OwnerAddFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, OwnerAddFindUniqueOrThrowArgs>
    ): Prisma__OwnerAddClient<OwnerAddGetPayload<T>>

    /**
     * Find the first OwnerAdd that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAddFindFirstArgs} args - Arguments to find a OwnerAdd
     * @example
     * // Get one OwnerAdd
     * const ownerAdd = await prisma.ownerAdd.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OwnerAddFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, OwnerAddFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'OwnerAdd'> extends True ? Prisma__OwnerAddClient<OwnerAddGetPayload<T>> : Prisma__OwnerAddClient<OwnerAddGetPayload<T> | null, null>

    /**
     * Find the first OwnerAdd that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAddFindFirstOrThrowArgs} args - Arguments to find a OwnerAdd
     * @example
     * // Get one OwnerAdd
     * const ownerAdd = await prisma.ownerAdd.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OwnerAddFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OwnerAddFindFirstOrThrowArgs>
    ): Prisma__OwnerAddClient<OwnerAddGetPayload<T>>

    /**
     * Find zero or more OwnerAdds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAddFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OwnerAdds
     * const ownerAdds = await prisma.ownerAdd.findMany()
     * 
     * // Get first 10 OwnerAdds
     * const ownerAdds = await prisma.ownerAdd.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const ownerAddWithSequenceOnly = await prisma.ownerAdd.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends OwnerAddFindManyArgs>(
      args?: SelectSubset<T, OwnerAddFindManyArgs>
    ): PrismaPromise<Array<OwnerAddGetPayload<T>>>

    /**
     * Create a OwnerAdd.
     * @param {OwnerAddCreateArgs} args - Arguments to create a OwnerAdd.
     * @example
     * // Create one OwnerAdd
     * const OwnerAdd = await prisma.ownerAdd.create({
     *   data: {
     *     // ... data to create a OwnerAdd
     *   }
     * })
     * 
    **/
    create<T extends OwnerAddCreateArgs>(
      args: SelectSubset<T, OwnerAddCreateArgs>
    ): Prisma__OwnerAddClient<OwnerAddGetPayload<T>>

    /**
     * Delete a OwnerAdd.
     * @param {OwnerAddDeleteArgs} args - Arguments to delete one OwnerAdd.
     * @example
     * // Delete one OwnerAdd
     * const OwnerAdd = await prisma.ownerAdd.delete({
     *   where: {
     *     // ... filter to delete one OwnerAdd
     *   }
     * })
     * 
    **/
    delete<T extends OwnerAddDeleteArgs>(
      args: SelectSubset<T, OwnerAddDeleteArgs>
    ): Prisma__OwnerAddClient<OwnerAddGetPayload<T>>

    /**
     * Update one OwnerAdd.
     * @param {OwnerAddUpdateArgs} args - Arguments to update one OwnerAdd.
     * @example
     * // Update one OwnerAdd
     * const ownerAdd = await prisma.ownerAdd.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OwnerAddUpdateArgs>(
      args: SelectSubset<T, OwnerAddUpdateArgs>
    ): Prisma__OwnerAddClient<OwnerAddGetPayload<T>>

    /**
     * Delete zero or more OwnerAdds.
     * @param {OwnerAddDeleteManyArgs} args - Arguments to filter OwnerAdds to delete.
     * @example
     * // Delete a few OwnerAdds
     * const { count } = await prisma.ownerAdd.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OwnerAddDeleteManyArgs>(
      args?: SelectSubset<T, OwnerAddDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more OwnerAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAddUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OwnerAdds
     * const ownerAdd = await prisma.ownerAdd.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OwnerAddUpdateManyArgs>(
      args: SelectSubset<T, OwnerAddUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one OwnerAdd.
     * @param {OwnerAddUpsertArgs} args - Arguments to update or create a OwnerAdd.
     * @example
     * // Update or create a OwnerAdd
     * const ownerAdd = await prisma.ownerAdd.upsert({
     *   create: {
     *     // ... data to create a OwnerAdd
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OwnerAdd we want to update
     *   }
     * })
    **/
    upsert<T extends OwnerAddUpsertArgs>(
      args: SelectSubset<T, OwnerAddUpsertArgs>
    ): Prisma__OwnerAddClient<OwnerAddGetPayload<T>>

    /**
     * Count the number of OwnerAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAddCountArgs} args - Arguments to filter OwnerAdds to count.
     * @example
     * // Count the number of OwnerAdds
     * const count = await prisma.ownerAdd.count({
     *   where: {
     *     // ... the filter for the OwnerAdds we want to count
     *   }
     * })
    **/
    count<T extends OwnerAddCountArgs>(
      args?: Subset<T, OwnerAddCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OwnerAddCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OwnerAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAddAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OwnerAddAggregateArgs>(args: Subset<T, OwnerAddAggregateArgs>): PrismaPromise<GetOwnerAddAggregateType<T>>

    /**
     * Group by OwnerAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerAddGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OwnerAddGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OwnerAddGroupByArgs['orderBy'] }
        : { orderBy?: OwnerAddGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OwnerAddGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnerAddGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for OwnerAdd.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OwnerAddClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * OwnerAdd base type for findUnique actions
   */
  export type OwnerAddFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * Filter, which OwnerAdd to fetch.
     * 
    **/
    where: OwnerAddWhereUniqueInput
  }

  /**
   * OwnerAdd findUnique
   */
  export interface OwnerAddFindUniqueArgs extends OwnerAddFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * OwnerAdd findUniqueOrThrow
   */
  export type OwnerAddFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * Filter, which OwnerAdd to fetch.
     * 
    **/
    where: OwnerAddWhereUniqueInput
  }


  /**
   * OwnerAdd base type for findFirst actions
   */
  export type OwnerAddFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * Filter, which OwnerAdd to fetch.
     * 
    **/
    where?: OwnerAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnerAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<OwnerAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OwnerAdds.
     * 
    **/
    cursor?: OwnerAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnerAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnerAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OwnerAdds.
     * 
    **/
    distinct?: Enumerable<OwnerAddScalarFieldEnum>
  }

  /**
   * OwnerAdd findFirst
   */
  export interface OwnerAddFindFirstArgs extends OwnerAddFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * OwnerAdd findFirstOrThrow
   */
  export type OwnerAddFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * Filter, which OwnerAdd to fetch.
     * 
    **/
    where?: OwnerAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnerAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<OwnerAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OwnerAdds.
     * 
    **/
    cursor?: OwnerAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnerAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnerAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OwnerAdds.
     * 
    **/
    distinct?: Enumerable<OwnerAddScalarFieldEnum>
  }


  /**
   * OwnerAdd findMany
   */
  export type OwnerAddFindManyArgs = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * Filter, which OwnerAdds to fetch.
     * 
    **/
    where?: OwnerAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnerAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<OwnerAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OwnerAdds.
     * 
    **/
    cursor?: OwnerAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnerAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnerAdds.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OwnerAddScalarFieldEnum>
  }


  /**
   * OwnerAdd create
   */
  export type OwnerAddCreateArgs = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * The data needed to create a OwnerAdd.
     * 
    **/
    data: XOR<OwnerAddCreateInput, OwnerAddUncheckedCreateInput>
  }


  /**
   * OwnerAdd update
   */
  export type OwnerAddUpdateArgs = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * The data needed to update a OwnerAdd.
     * 
    **/
    data: XOR<OwnerAddUpdateInput, OwnerAddUncheckedUpdateInput>
    /**
     * Choose, which OwnerAdd to update.
     * 
    **/
    where: OwnerAddWhereUniqueInput
  }


  /**
   * OwnerAdd updateMany
   */
  export type OwnerAddUpdateManyArgs = {
    /**
     * The data used to update OwnerAdds.
     * 
    **/
    data: XOR<OwnerAddUpdateManyMutationInput, OwnerAddUncheckedUpdateManyInput>
    /**
     * Filter which OwnerAdds to update
     * 
    **/
    where?: OwnerAddWhereInput
  }


  /**
   * OwnerAdd upsert
   */
  export type OwnerAddUpsertArgs = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * The filter to search for the OwnerAdd to update in case it exists.
     * 
    **/
    where: OwnerAddWhereUniqueInput
    /**
     * In case the OwnerAdd found by the `where` argument doesn't exist, create a new OwnerAdd with this data.
     * 
    **/
    create: XOR<OwnerAddCreateInput, OwnerAddUncheckedCreateInput>
    /**
     * In case the OwnerAdd was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<OwnerAddUpdateInput, OwnerAddUncheckedUpdateInput>
  }


  /**
   * OwnerAdd delete
   */
  export type OwnerAddDeleteArgs = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
    /**
     * Filter which OwnerAdd to delete.
     * 
    **/
    where: OwnerAddWhereUniqueInput
  }


  /**
   * OwnerAdd deleteMany
   */
  export type OwnerAddDeleteManyArgs = {
    /**
     * Filter which OwnerAdds to delete
     * 
    **/
    where?: OwnerAddWhereInput
  }


  /**
   * OwnerAdd without action
   */
  export type OwnerAddArgs = {
    /**
     * Select specific fields to fetch from the OwnerAdd
     * 
    **/
    select?: OwnerAddSelect | null
  }



  /**
   * Model OwnerRm
   */


  export type AggregateOwnerRm = {
    _count: OwnerRmCountAggregateOutputType | null
    _avg: OwnerRmAvgAggregateOutputType | null
    _sum: OwnerRmSumAggregateOutputType | null
    _min: OwnerRmMinAggregateOutputType | null
    _max: OwnerRmMaxAggregateOutputType | null
  }

  export type OwnerRmAvgAggregateOutputType = {
    sequence: number | null
  }

  export type OwnerRmSumAggregateOutputType = {
    sequence: bigint | null
  }

  export type OwnerRmMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    owner: string | null
  }

  export type OwnerRmMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    owner: string | null
  }

  export type OwnerRmCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    owner: number
    _all: number
  }


  export type OwnerRmAvgAggregateInputType = {
    sequence?: true
  }

  export type OwnerRmSumAggregateInputType = {
    sequence?: true
  }

  export type OwnerRmMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    owner?: true
  }

  export type OwnerRmMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    owner?: true
  }

  export type OwnerRmCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    owner?: true
    _all?: true
  }

  export type OwnerRmAggregateArgs = {
    /**
     * Filter which OwnerRm to aggregate.
     * 
    **/
    where?: OwnerRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnerRms to fetch.
     * 
    **/
    orderBy?: Enumerable<OwnerRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: OwnerRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnerRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnerRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned OwnerRms
    **/
    _count?: true | OwnerRmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OwnerRmAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OwnerRmSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OwnerRmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OwnerRmMaxAggregateInputType
  }

  export type GetOwnerRmAggregateType<T extends OwnerRmAggregateArgs> = {
        [P in keyof T & keyof AggregateOwnerRm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOwnerRm[P]>
      : GetScalarType<T[P], AggregateOwnerRm[P]>
  }




  export type OwnerRmGroupByArgs = {
    where?: OwnerRmWhereInput
    orderBy?: Enumerable<OwnerRmOrderByWithAggregationInput>
    by: Array<OwnerRmScalarFieldEnum>
    having?: OwnerRmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OwnerRmCountAggregateInputType | true
    _avg?: OwnerRmAvgAggregateInputType
    _sum?: OwnerRmSumAggregateInputType
    _min?: OwnerRmMinAggregateInputType
    _max?: OwnerRmMaxAggregateInputType
  }


  export type OwnerRmGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    owner: string
    _count: OwnerRmCountAggregateOutputType | null
    _avg: OwnerRmAvgAggregateOutputType | null
    _sum: OwnerRmSumAggregateOutputType | null
    _min: OwnerRmMinAggregateOutputType | null
    _max: OwnerRmMaxAggregateOutputType | null
  }

  type GetOwnerRmGroupByPayload<T extends OwnerRmGroupByArgs> = PrismaPromise<
    Array<
      PickArray<OwnerRmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OwnerRmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OwnerRmGroupByOutputType[P]>
            : GetScalarType<T[P], OwnerRmGroupByOutputType[P]>
        }
      >
    >


  export type OwnerRmSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    owner?: boolean
  }


  export type OwnerRmGetPayload<S extends boolean | null | undefined | OwnerRmArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? OwnerRm :
    S extends undefined ? never :
    S extends { include: any } & (OwnerRmArgs | OwnerRmFindManyArgs)
    ? OwnerRm 
    : S extends { select: any } & (OwnerRmArgs | OwnerRmFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof OwnerRm ? OwnerRm[P] : never
  } 
      : OwnerRm


  type OwnerRmCountArgs = Merge<
    Omit<OwnerRmFindManyArgs, 'select' | 'include'> & {
      select?: OwnerRmCountAggregateInputType | true
    }
  >

  export interface OwnerRmDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one OwnerRm that matches the filter.
     * @param {OwnerRmFindUniqueArgs} args - Arguments to find a OwnerRm
     * @example
     * // Get one OwnerRm
     * const ownerRm = await prisma.ownerRm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends OwnerRmFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, OwnerRmFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'OwnerRm'> extends True ? Prisma__OwnerRmClient<OwnerRmGetPayload<T>> : Prisma__OwnerRmClient<OwnerRmGetPayload<T> | null, null>

    /**
     * Find one OwnerRm that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {OwnerRmFindUniqueOrThrowArgs} args - Arguments to find a OwnerRm
     * @example
     * // Get one OwnerRm
     * const ownerRm = await prisma.ownerRm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends OwnerRmFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, OwnerRmFindUniqueOrThrowArgs>
    ): Prisma__OwnerRmClient<OwnerRmGetPayload<T>>

    /**
     * Find the first OwnerRm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerRmFindFirstArgs} args - Arguments to find a OwnerRm
     * @example
     * // Get one OwnerRm
     * const ownerRm = await prisma.ownerRm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends OwnerRmFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, OwnerRmFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'OwnerRm'> extends True ? Prisma__OwnerRmClient<OwnerRmGetPayload<T>> : Prisma__OwnerRmClient<OwnerRmGetPayload<T> | null, null>

    /**
     * Find the first OwnerRm that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerRmFindFirstOrThrowArgs} args - Arguments to find a OwnerRm
     * @example
     * // Get one OwnerRm
     * const ownerRm = await prisma.ownerRm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends OwnerRmFindFirstOrThrowArgs>(
      args?: SelectSubset<T, OwnerRmFindFirstOrThrowArgs>
    ): Prisma__OwnerRmClient<OwnerRmGetPayload<T>>

    /**
     * Find zero or more OwnerRms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerRmFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all OwnerRms
     * const ownerRms = await prisma.ownerRm.findMany()
     * 
     * // Get first 10 OwnerRms
     * const ownerRms = await prisma.ownerRm.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const ownerRmWithSequenceOnly = await prisma.ownerRm.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends OwnerRmFindManyArgs>(
      args?: SelectSubset<T, OwnerRmFindManyArgs>
    ): PrismaPromise<Array<OwnerRmGetPayload<T>>>

    /**
     * Create a OwnerRm.
     * @param {OwnerRmCreateArgs} args - Arguments to create a OwnerRm.
     * @example
     * // Create one OwnerRm
     * const OwnerRm = await prisma.ownerRm.create({
     *   data: {
     *     // ... data to create a OwnerRm
     *   }
     * })
     * 
    **/
    create<T extends OwnerRmCreateArgs>(
      args: SelectSubset<T, OwnerRmCreateArgs>
    ): Prisma__OwnerRmClient<OwnerRmGetPayload<T>>

    /**
     * Delete a OwnerRm.
     * @param {OwnerRmDeleteArgs} args - Arguments to delete one OwnerRm.
     * @example
     * // Delete one OwnerRm
     * const OwnerRm = await prisma.ownerRm.delete({
     *   where: {
     *     // ... filter to delete one OwnerRm
     *   }
     * })
     * 
    **/
    delete<T extends OwnerRmDeleteArgs>(
      args: SelectSubset<T, OwnerRmDeleteArgs>
    ): Prisma__OwnerRmClient<OwnerRmGetPayload<T>>

    /**
     * Update one OwnerRm.
     * @param {OwnerRmUpdateArgs} args - Arguments to update one OwnerRm.
     * @example
     * // Update one OwnerRm
     * const ownerRm = await prisma.ownerRm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends OwnerRmUpdateArgs>(
      args: SelectSubset<T, OwnerRmUpdateArgs>
    ): Prisma__OwnerRmClient<OwnerRmGetPayload<T>>

    /**
     * Delete zero or more OwnerRms.
     * @param {OwnerRmDeleteManyArgs} args - Arguments to filter OwnerRms to delete.
     * @example
     * // Delete a few OwnerRms
     * const { count } = await prisma.ownerRm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends OwnerRmDeleteManyArgs>(
      args?: SelectSubset<T, OwnerRmDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more OwnerRms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerRmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many OwnerRms
     * const ownerRm = await prisma.ownerRm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends OwnerRmUpdateManyArgs>(
      args: SelectSubset<T, OwnerRmUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one OwnerRm.
     * @param {OwnerRmUpsertArgs} args - Arguments to update or create a OwnerRm.
     * @example
     * // Update or create a OwnerRm
     * const ownerRm = await prisma.ownerRm.upsert({
     *   create: {
     *     // ... data to create a OwnerRm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the OwnerRm we want to update
     *   }
     * })
    **/
    upsert<T extends OwnerRmUpsertArgs>(
      args: SelectSubset<T, OwnerRmUpsertArgs>
    ): Prisma__OwnerRmClient<OwnerRmGetPayload<T>>

    /**
     * Count the number of OwnerRms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerRmCountArgs} args - Arguments to filter OwnerRms to count.
     * @example
     * // Count the number of OwnerRms
     * const count = await prisma.ownerRm.count({
     *   where: {
     *     // ... the filter for the OwnerRms we want to count
     *   }
     * })
    **/
    count<T extends OwnerRmCountArgs>(
      args?: Subset<T, OwnerRmCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OwnerRmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a OwnerRm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerRmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OwnerRmAggregateArgs>(args: Subset<T, OwnerRmAggregateArgs>): PrismaPromise<GetOwnerRmAggregateType<T>>

    /**
     * Group by OwnerRm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OwnerRmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OwnerRmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OwnerRmGroupByArgs['orderBy'] }
        : { orderBy?: OwnerRmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OwnerRmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOwnerRmGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for OwnerRm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__OwnerRmClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * OwnerRm base type for findUnique actions
   */
  export type OwnerRmFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * Filter, which OwnerRm to fetch.
     * 
    **/
    where: OwnerRmWhereUniqueInput
  }

  /**
   * OwnerRm findUnique
   */
  export interface OwnerRmFindUniqueArgs extends OwnerRmFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * OwnerRm findUniqueOrThrow
   */
  export type OwnerRmFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * Filter, which OwnerRm to fetch.
     * 
    **/
    where: OwnerRmWhereUniqueInput
  }


  /**
   * OwnerRm base type for findFirst actions
   */
  export type OwnerRmFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * Filter, which OwnerRm to fetch.
     * 
    **/
    where?: OwnerRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnerRms to fetch.
     * 
    **/
    orderBy?: Enumerable<OwnerRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OwnerRms.
     * 
    **/
    cursor?: OwnerRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnerRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnerRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OwnerRms.
     * 
    **/
    distinct?: Enumerable<OwnerRmScalarFieldEnum>
  }

  /**
   * OwnerRm findFirst
   */
  export interface OwnerRmFindFirstArgs extends OwnerRmFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * OwnerRm findFirstOrThrow
   */
  export type OwnerRmFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * Filter, which OwnerRm to fetch.
     * 
    **/
    where?: OwnerRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnerRms to fetch.
     * 
    **/
    orderBy?: Enumerable<OwnerRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for OwnerRms.
     * 
    **/
    cursor?: OwnerRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnerRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnerRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of OwnerRms.
     * 
    **/
    distinct?: Enumerable<OwnerRmScalarFieldEnum>
  }


  /**
   * OwnerRm findMany
   */
  export type OwnerRmFindManyArgs = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * Filter, which OwnerRms to fetch.
     * 
    **/
    where?: OwnerRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of OwnerRms to fetch.
     * 
    **/
    orderBy?: Enumerable<OwnerRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing OwnerRms.
     * 
    **/
    cursor?: OwnerRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` OwnerRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` OwnerRms.
     * 
    **/
    skip?: number
    distinct?: Enumerable<OwnerRmScalarFieldEnum>
  }


  /**
   * OwnerRm create
   */
  export type OwnerRmCreateArgs = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * The data needed to create a OwnerRm.
     * 
    **/
    data: XOR<OwnerRmCreateInput, OwnerRmUncheckedCreateInput>
  }


  /**
   * OwnerRm update
   */
  export type OwnerRmUpdateArgs = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * The data needed to update a OwnerRm.
     * 
    **/
    data: XOR<OwnerRmUpdateInput, OwnerRmUncheckedUpdateInput>
    /**
     * Choose, which OwnerRm to update.
     * 
    **/
    where: OwnerRmWhereUniqueInput
  }


  /**
   * OwnerRm updateMany
   */
  export type OwnerRmUpdateManyArgs = {
    /**
     * The data used to update OwnerRms.
     * 
    **/
    data: XOR<OwnerRmUpdateManyMutationInput, OwnerRmUncheckedUpdateManyInput>
    /**
     * Filter which OwnerRms to update
     * 
    **/
    where?: OwnerRmWhereInput
  }


  /**
   * OwnerRm upsert
   */
  export type OwnerRmUpsertArgs = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * The filter to search for the OwnerRm to update in case it exists.
     * 
    **/
    where: OwnerRmWhereUniqueInput
    /**
     * In case the OwnerRm found by the `where` argument doesn't exist, create a new OwnerRm with this data.
     * 
    **/
    create: XOR<OwnerRmCreateInput, OwnerRmUncheckedCreateInput>
    /**
     * In case the OwnerRm was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<OwnerRmUpdateInput, OwnerRmUncheckedUpdateInput>
  }


  /**
   * OwnerRm delete
   */
  export type OwnerRmDeleteArgs = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
    /**
     * Filter which OwnerRm to delete.
     * 
    **/
    where: OwnerRmWhereUniqueInput
  }


  /**
   * OwnerRm deleteMany
   */
  export type OwnerRmDeleteManyArgs = {
    /**
     * Filter which OwnerRms to delete
     * 
    **/
    where?: OwnerRmWhereInput
  }


  /**
   * OwnerRm without action
   */
  export type OwnerRmArgs = {
    /**
     * Select specific fields to fetch from the OwnerRm
     * 
    **/
    select?: OwnerRmSelect | null
  }



  /**
   * Model PwrModAdd
   */


  export type AggregatePwrModAdd = {
    _count: PwrModAddCountAggregateOutputType | null
    _avg: PwrModAddAvgAggregateOutputType | null
    _sum: PwrModAddSumAggregateOutputType | null
    _min: PwrModAddMinAggregateOutputType | null
    _max: PwrModAddMaxAggregateOutputType | null
  }

  export type PwrModAddAvgAggregateOutputType = {
    sequence: number | null
    mod_id: number | null
  }

  export type PwrModAddSumAggregateOutputType = {
    sequence: bigint | null
    mod_id: number | null
  }

  export type PwrModAddMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    mod_id: number | null
  }

  export type PwrModAddMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    mod_id: number | null
  }

  export type PwrModAddCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    mod_id: number
    _all: number
  }


  export type PwrModAddAvgAggregateInputType = {
    sequence?: true
    mod_id?: true
  }

  export type PwrModAddSumAggregateInputType = {
    sequence?: true
    mod_id?: true
  }

  export type PwrModAddMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    mod_id?: true
  }

  export type PwrModAddMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    mod_id?: true
  }

  export type PwrModAddCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    mod_id?: true
    _all?: true
  }

  export type PwrModAddAggregateArgs = {
    /**
     * Filter which PwrModAdd to aggregate.
     * 
    **/
    where?: PwrModAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PwrModAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<PwrModAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PwrModAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PwrModAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PwrModAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PwrModAdds
    **/
    _count?: true | PwrModAddCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PwrModAddAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PwrModAddSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PwrModAddMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PwrModAddMaxAggregateInputType
  }

  export type GetPwrModAddAggregateType<T extends PwrModAddAggregateArgs> = {
        [P in keyof T & keyof AggregatePwrModAdd]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePwrModAdd[P]>
      : GetScalarType<T[P], AggregatePwrModAdd[P]>
  }




  export type PwrModAddGroupByArgs = {
    where?: PwrModAddWhereInput
    orderBy?: Enumerable<PwrModAddOrderByWithAggregationInput>
    by: Array<PwrModAddScalarFieldEnum>
    having?: PwrModAddScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PwrModAddCountAggregateInputType | true
    _avg?: PwrModAddAvgAggregateInputType
    _sum?: PwrModAddSumAggregateInputType
    _min?: PwrModAddMinAggregateInputType
    _max?: PwrModAddMaxAggregateInputType
  }


  export type PwrModAddGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    mod_id: number
    _count: PwrModAddCountAggregateOutputType | null
    _avg: PwrModAddAvgAggregateOutputType | null
    _sum: PwrModAddSumAggregateOutputType | null
    _min: PwrModAddMinAggregateOutputType | null
    _max: PwrModAddMaxAggregateOutputType | null
  }

  type GetPwrModAddGroupByPayload<T extends PwrModAddGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PwrModAddGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PwrModAddGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PwrModAddGroupByOutputType[P]>
            : GetScalarType<T[P], PwrModAddGroupByOutputType[P]>
        }
      >
    >


  export type PwrModAddSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    mod_id?: boolean
  }


  export type PwrModAddGetPayload<S extends boolean | null | undefined | PwrModAddArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PwrModAdd :
    S extends undefined ? never :
    S extends { include: any } & (PwrModAddArgs | PwrModAddFindManyArgs)
    ? PwrModAdd 
    : S extends { select: any } & (PwrModAddArgs | PwrModAddFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof PwrModAdd ? PwrModAdd[P] : never
  } 
      : PwrModAdd


  type PwrModAddCountArgs = Merge<
    Omit<PwrModAddFindManyArgs, 'select' | 'include'> & {
      select?: PwrModAddCountAggregateInputType | true
    }
  >

  export interface PwrModAddDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one PwrModAdd that matches the filter.
     * @param {PwrModAddFindUniqueArgs} args - Arguments to find a PwrModAdd
     * @example
     * // Get one PwrModAdd
     * const pwrModAdd = await prisma.pwrModAdd.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PwrModAddFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PwrModAddFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PwrModAdd'> extends True ? Prisma__PwrModAddClient<PwrModAddGetPayload<T>> : Prisma__PwrModAddClient<PwrModAddGetPayload<T> | null, null>

    /**
     * Find one PwrModAdd that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PwrModAddFindUniqueOrThrowArgs} args - Arguments to find a PwrModAdd
     * @example
     * // Get one PwrModAdd
     * const pwrModAdd = await prisma.pwrModAdd.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PwrModAddFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PwrModAddFindUniqueOrThrowArgs>
    ): Prisma__PwrModAddClient<PwrModAddGetPayload<T>>

    /**
     * Find the first PwrModAdd that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModAddFindFirstArgs} args - Arguments to find a PwrModAdd
     * @example
     * // Get one PwrModAdd
     * const pwrModAdd = await prisma.pwrModAdd.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PwrModAddFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PwrModAddFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PwrModAdd'> extends True ? Prisma__PwrModAddClient<PwrModAddGetPayload<T>> : Prisma__PwrModAddClient<PwrModAddGetPayload<T> | null, null>

    /**
     * Find the first PwrModAdd that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModAddFindFirstOrThrowArgs} args - Arguments to find a PwrModAdd
     * @example
     * // Get one PwrModAdd
     * const pwrModAdd = await prisma.pwrModAdd.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PwrModAddFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PwrModAddFindFirstOrThrowArgs>
    ): Prisma__PwrModAddClient<PwrModAddGetPayload<T>>

    /**
     * Find zero or more PwrModAdds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModAddFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PwrModAdds
     * const pwrModAdds = await prisma.pwrModAdd.findMany()
     * 
     * // Get first 10 PwrModAdds
     * const pwrModAdds = await prisma.pwrModAdd.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const pwrModAddWithSequenceOnly = await prisma.pwrModAdd.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends PwrModAddFindManyArgs>(
      args?: SelectSubset<T, PwrModAddFindManyArgs>
    ): PrismaPromise<Array<PwrModAddGetPayload<T>>>

    /**
     * Create a PwrModAdd.
     * @param {PwrModAddCreateArgs} args - Arguments to create a PwrModAdd.
     * @example
     * // Create one PwrModAdd
     * const PwrModAdd = await prisma.pwrModAdd.create({
     *   data: {
     *     // ... data to create a PwrModAdd
     *   }
     * })
     * 
    **/
    create<T extends PwrModAddCreateArgs>(
      args: SelectSubset<T, PwrModAddCreateArgs>
    ): Prisma__PwrModAddClient<PwrModAddGetPayload<T>>

    /**
     * Delete a PwrModAdd.
     * @param {PwrModAddDeleteArgs} args - Arguments to delete one PwrModAdd.
     * @example
     * // Delete one PwrModAdd
     * const PwrModAdd = await prisma.pwrModAdd.delete({
     *   where: {
     *     // ... filter to delete one PwrModAdd
     *   }
     * })
     * 
    **/
    delete<T extends PwrModAddDeleteArgs>(
      args: SelectSubset<T, PwrModAddDeleteArgs>
    ): Prisma__PwrModAddClient<PwrModAddGetPayload<T>>

    /**
     * Update one PwrModAdd.
     * @param {PwrModAddUpdateArgs} args - Arguments to update one PwrModAdd.
     * @example
     * // Update one PwrModAdd
     * const pwrModAdd = await prisma.pwrModAdd.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PwrModAddUpdateArgs>(
      args: SelectSubset<T, PwrModAddUpdateArgs>
    ): Prisma__PwrModAddClient<PwrModAddGetPayload<T>>

    /**
     * Delete zero or more PwrModAdds.
     * @param {PwrModAddDeleteManyArgs} args - Arguments to filter PwrModAdds to delete.
     * @example
     * // Delete a few PwrModAdds
     * const { count } = await prisma.pwrModAdd.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PwrModAddDeleteManyArgs>(
      args?: SelectSubset<T, PwrModAddDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PwrModAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModAddUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PwrModAdds
     * const pwrModAdd = await prisma.pwrModAdd.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PwrModAddUpdateManyArgs>(
      args: SelectSubset<T, PwrModAddUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PwrModAdd.
     * @param {PwrModAddUpsertArgs} args - Arguments to update or create a PwrModAdd.
     * @example
     * // Update or create a PwrModAdd
     * const pwrModAdd = await prisma.pwrModAdd.upsert({
     *   create: {
     *     // ... data to create a PwrModAdd
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PwrModAdd we want to update
     *   }
     * })
    **/
    upsert<T extends PwrModAddUpsertArgs>(
      args: SelectSubset<T, PwrModAddUpsertArgs>
    ): Prisma__PwrModAddClient<PwrModAddGetPayload<T>>

    /**
     * Count the number of PwrModAdds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModAddCountArgs} args - Arguments to filter PwrModAdds to count.
     * @example
     * // Count the number of PwrModAdds
     * const count = await prisma.pwrModAdd.count({
     *   where: {
     *     // ... the filter for the PwrModAdds we want to count
     *   }
     * })
    **/
    count<T extends PwrModAddCountArgs>(
      args?: Subset<T, PwrModAddCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PwrModAddCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PwrModAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModAddAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PwrModAddAggregateArgs>(args: Subset<T, PwrModAddAggregateArgs>): PrismaPromise<GetPwrModAddAggregateType<T>>

    /**
     * Group by PwrModAdd.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModAddGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PwrModAddGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PwrModAddGroupByArgs['orderBy'] }
        : { orderBy?: PwrModAddGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PwrModAddGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPwrModAddGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for PwrModAdd.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PwrModAddClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * PwrModAdd base type for findUnique actions
   */
  export type PwrModAddFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * Filter, which PwrModAdd to fetch.
     * 
    **/
    where: PwrModAddWhereUniqueInput
  }

  /**
   * PwrModAdd findUnique
   */
  export interface PwrModAddFindUniqueArgs extends PwrModAddFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PwrModAdd findUniqueOrThrow
   */
  export type PwrModAddFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * Filter, which PwrModAdd to fetch.
     * 
    **/
    where: PwrModAddWhereUniqueInput
  }


  /**
   * PwrModAdd base type for findFirst actions
   */
  export type PwrModAddFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * Filter, which PwrModAdd to fetch.
     * 
    **/
    where?: PwrModAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PwrModAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<PwrModAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PwrModAdds.
     * 
    **/
    cursor?: PwrModAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PwrModAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PwrModAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PwrModAdds.
     * 
    **/
    distinct?: Enumerable<PwrModAddScalarFieldEnum>
  }

  /**
   * PwrModAdd findFirst
   */
  export interface PwrModAddFindFirstArgs extends PwrModAddFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PwrModAdd findFirstOrThrow
   */
  export type PwrModAddFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * Filter, which PwrModAdd to fetch.
     * 
    **/
    where?: PwrModAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PwrModAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<PwrModAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PwrModAdds.
     * 
    **/
    cursor?: PwrModAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PwrModAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PwrModAdds.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PwrModAdds.
     * 
    **/
    distinct?: Enumerable<PwrModAddScalarFieldEnum>
  }


  /**
   * PwrModAdd findMany
   */
  export type PwrModAddFindManyArgs = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * Filter, which PwrModAdds to fetch.
     * 
    **/
    where?: PwrModAddWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PwrModAdds to fetch.
     * 
    **/
    orderBy?: Enumerable<PwrModAddOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PwrModAdds.
     * 
    **/
    cursor?: PwrModAddWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PwrModAdds from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PwrModAdds.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PwrModAddScalarFieldEnum>
  }


  /**
   * PwrModAdd create
   */
  export type PwrModAddCreateArgs = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * The data needed to create a PwrModAdd.
     * 
    **/
    data: XOR<PwrModAddCreateInput, PwrModAddUncheckedCreateInput>
  }


  /**
   * PwrModAdd update
   */
  export type PwrModAddUpdateArgs = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * The data needed to update a PwrModAdd.
     * 
    **/
    data: XOR<PwrModAddUpdateInput, PwrModAddUncheckedUpdateInput>
    /**
     * Choose, which PwrModAdd to update.
     * 
    **/
    where: PwrModAddWhereUniqueInput
  }


  /**
   * PwrModAdd updateMany
   */
  export type PwrModAddUpdateManyArgs = {
    /**
     * The data used to update PwrModAdds.
     * 
    **/
    data: XOR<PwrModAddUpdateManyMutationInput, PwrModAddUncheckedUpdateManyInput>
    /**
     * Filter which PwrModAdds to update
     * 
    **/
    where?: PwrModAddWhereInput
  }


  /**
   * PwrModAdd upsert
   */
  export type PwrModAddUpsertArgs = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * The filter to search for the PwrModAdd to update in case it exists.
     * 
    **/
    where: PwrModAddWhereUniqueInput
    /**
     * In case the PwrModAdd found by the `where` argument doesn't exist, create a new PwrModAdd with this data.
     * 
    **/
    create: XOR<PwrModAddCreateInput, PwrModAddUncheckedCreateInput>
    /**
     * In case the PwrModAdd was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PwrModAddUpdateInput, PwrModAddUncheckedUpdateInput>
  }


  /**
   * PwrModAdd delete
   */
  export type PwrModAddDeleteArgs = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
    /**
     * Filter which PwrModAdd to delete.
     * 
    **/
    where: PwrModAddWhereUniqueInput
  }


  /**
   * PwrModAdd deleteMany
   */
  export type PwrModAddDeleteManyArgs = {
    /**
     * Filter which PwrModAdds to delete
     * 
    **/
    where?: PwrModAddWhereInput
  }


  /**
   * PwrModAdd without action
   */
  export type PwrModAddArgs = {
    /**
     * Select specific fields to fetch from the PwrModAdd
     * 
    **/
    select?: PwrModAddSelect | null
  }



  /**
   * Model PwrModRm
   */


  export type AggregatePwrModRm = {
    _count: PwrModRmCountAggregateOutputType | null
    _avg: PwrModRmAvgAggregateOutputType | null
    _sum: PwrModRmSumAggregateOutputType | null
    _min: PwrModRmMinAggregateOutputType | null
    _max: PwrModRmMaxAggregateOutputType | null
  }

  export type PwrModRmAvgAggregateOutputType = {
    sequence: number | null
    pwrmod_index: number | null
  }

  export type PwrModRmSumAggregateOutputType = {
    sequence: bigint | null
    pwrmod_index: number | null
  }

  export type PwrModRmMinAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    pwrmod_index: number | null
  }

  export type PwrModRmMaxAggregateOutputType = {
    sequence: bigint | null
    trxId: string | null
    timeStamp: Date | null
    boid_id: string | null
    pwrmod_index: number | null
  }

  export type PwrModRmCountAggregateOutputType = {
    sequence: number
    trxId: number
    timeStamp: number
    boid_id: number
    pwrmod_index: number
    _all: number
  }


  export type PwrModRmAvgAggregateInputType = {
    sequence?: true
    pwrmod_index?: true
  }

  export type PwrModRmSumAggregateInputType = {
    sequence?: true
    pwrmod_index?: true
  }

  export type PwrModRmMinAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    pwrmod_index?: true
  }

  export type PwrModRmMaxAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    pwrmod_index?: true
  }

  export type PwrModRmCountAggregateInputType = {
    sequence?: true
    trxId?: true
    timeStamp?: true
    boid_id?: true
    pwrmod_index?: true
    _all?: true
  }

  export type PwrModRmAggregateArgs = {
    /**
     * Filter which PwrModRm to aggregate.
     * 
    **/
    where?: PwrModRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PwrModRms to fetch.
     * 
    **/
    orderBy?: Enumerable<PwrModRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     * 
    **/
    cursor?: PwrModRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PwrModRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PwrModRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PwrModRms
    **/
    _count?: true | PwrModRmCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PwrModRmAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PwrModRmSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PwrModRmMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PwrModRmMaxAggregateInputType
  }

  export type GetPwrModRmAggregateType<T extends PwrModRmAggregateArgs> = {
        [P in keyof T & keyof AggregatePwrModRm]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePwrModRm[P]>
      : GetScalarType<T[P], AggregatePwrModRm[P]>
  }




  export type PwrModRmGroupByArgs = {
    where?: PwrModRmWhereInput
    orderBy?: Enumerable<PwrModRmOrderByWithAggregationInput>
    by: Array<PwrModRmScalarFieldEnum>
    having?: PwrModRmScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PwrModRmCountAggregateInputType | true
    _avg?: PwrModRmAvgAggregateInputType
    _sum?: PwrModRmSumAggregateInputType
    _min?: PwrModRmMinAggregateInputType
    _max?: PwrModRmMaxAggregateInputType
  }


  export type PwrModRmGroupByOutputType = {
    sequence: bigint
    trxId: string
    timeStamp: Date
    boid_id: string
    pwrmod_index: number
    _count: PwrModRmCountAggregateOutputType | null
    _avg: PwrModRmAvgAggregateOutputType | null
    _sum: PwrModRmSumAggregateOutputType | null
    _min: PwrModRmMinAggregateOutputType | null
    _max: PwrModRmMaxAggregateOutputType | null
  }

  type GetPwrModRmGroupByPayload<T extends PwrModRmGroupByArgs> = PrismaPromise<
    Array<
      PickArray<PwrModRmGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PwrModRmGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PwrModRmGroupByOutputType[P]>
            : GetScalarType<T[P], PwrModRmGroupByOutputType[P]>
        }
      >
    >


  export type PwrModRmSelect = {
    sequence?: boolean
    trxId?: boolean
    timeStamp?: boolean
    boid_id?: boolean
    pwrmod_index?: boolean
  }


  export type PwrModRmGetPayload<S extends boolean | null | undefined | PwrModRmArgs> =
    S extends { select: any, include: any } ? 'Please either choose `select` or `include`' :
    S extends true ? PwrModRm :
    S extends undefined ? never :
    S extends { include: any } & (PwrModRmArgs | PwrModRmFindManyArgs)
    ? PwrModRm 
    : S extends { select: any } & (PwrModRmArgs | PwrModRmFindManyArgs)
      ? {
    [P in TruthyKeys<S['select']>]:
    P extends keyof PwrModRm ? PwrModRm[P] : never
  } 
      : PwrModRm


  type PwrModRmCountArgs = Merge<
    Omit<PwrModRmFindManyArgs, 'select' | 'include'> & {
      select?: PwrModRmCountAggregateInputType | true
    }
  >

  export interface PwrModRmDelegate<GlobalRejectSettings extends Prisma.RejectOnNotFound | Prisma.RejectPerOperation | false | undefined> {
    /**
     * Find zero or one PwrModRm that matches the filter.
     * @param {PwrModRmFindUniqueArgs} args - Arguments to find a PwrModRm
     * @example
     * // Get one PwrModRm
     * const pwrModRm = await prisma.pwrModRm.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUnique<T extends PwrModRmFindUniqueArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args: SelectSubset<T, PwrModRmFindUniqueArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findUnique', 'PwrModRm'> extends True ? Prisma__PwrModRmClient<PwrModRmGetPayload<T>> : Prisma__PwrModRmClient<PwrModRmGetPayload<T> | null, null>

    /**
     * Find one PwrModRm that matches the filter or throw an error  with `error.code='P2025'` 
     *     if no matches were found.
     * @param {PwrModRmFindUniqueOrThrowArgs} args - Arguments to find a PwrModRm
     * @example
     * // Get one PwrModRm
     * const pwrModRm = await prisma.pwrModRm.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findUniqueOrThrow<T extends PwrModRmFindUniqueOrThrowArgs>(
      args?: SelectSubset<T, PwrModRmFindUniqueOrThrowArgs>
    ): Prisma__PwrModRmClient<PwrModRmGetPayload<T>>

    /**
     * Find the first PwrModRm that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModRmFindFirstArgs} args - Arguments to find a PwrModRm
     * @example
     * // Get one PwrModRm
     * const pwrModRm = await prisma.pwrModRm.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirst<T extends PwrModRmFindFirstArgs,  LocalRejectSettings = T["rejectOnNotFound"] extends RejectOnNotFound ? T['rejectOnNotFound'] : undefined>(
      args?: SelectSubset<T, PwrModRmFindFirstArgs>
    ): HasReject<GlobalRejectSettings, LocalRejectSettings, 'findFirst', 'PwrModRm'> extends True ? Prisma__PwrModRmClient<PwrModRmGetPayload<T>> : Prisma__PwrModRmClient<PwrModRmGetPayload<T> | null, null>

    /**
     * Find the first PwrModRm that matches the filter or
     * throw `NotFoundError` if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModRmFindFirstOrThrowArgs} args - Arguments to find a PwrModRm
     * @example
     * // Get one PwrModRm
     * const pwrModRm = await prisma.pwrModRm.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
    **/
    findFirstOrThrow<T extends PwrModRmFindFirstOrThrowArgs>(
      args?: SelectSubset<T, PwrModRmFindFirstOrThrowArgs>
    ): Prisma__PwrModRmClient<PwrModRmGetPayload<T>>

    /**
     * Find zero or more PwrModRms that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModRmFindManyArgs=} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PwrModRms
     * const pwrModRms = await prisma.pwrModRm.findMany()
     * 
     * // Get first 10 PwrModRms
     * const pwrModRms = await prisma.pwrModRm.findMany({ take: 10 })
     * 
     * // Only select the `sequence`
     * const pwrModRmWithSequenceOnly = await prisma.pwrModRm.findMany({ select: { sequence: true } })
     * 
    **/
    findMany<T extends PwrModRmFindManyArgs>(
      args?: SelectSubset<T, PwrModRmFindManyArgs>
    ): PrismaPromise<Array<PwrModRmGetPayload<T>>>

    /**
     * Create a PwrModRm.
     * @param {PwrModRmCreateArgs} args - Arguments to create a PwrModRm.
     * @example
     * // Create one PwrModRm
     * const PwrModRm = await prisma.pwrModRm.create({
     *   data: {
     *     // ... data to create a PwrModRm
     *   }
     * })
     * 
    **/
    create<T extends PwrModRmCreateArgs>(
      args: SelectSubset<T, PwrModRmCreateArgs>
    ): Prisma__PwrModRmClient<PwrModRmGetPayload<T>>

    /**
     * Delete a PwrModRm.
     * @param {PwrModRmDeleteArgs} args - Arguments to delete one PwrModRm.
     * @example
     * // Delete one PwrModRm
     * const PwrModRm = await prisma.pwrModRm.delete({
     *   where: {
     *     // ... filter to delete one PwrModRm
     *   }
     * })
     * 
    **/
    delete<T extends PwrModRmDeleteArgs>(
      args: SelectSubset<T, PwrModRmDeleteArgs>
    ): Prisma__PwrModRmClient<PwrModRmGetPayload<T>>

    /**
     * Update one PwrModRm.
     * @param {PwrModRmUpdateArgs} args - Arguments to update one PwrModRm.
     * @example
     * // Update one PwrModRm
     * const pwrModRm = await prisma.pwrModRm.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    update<T extends PwrModRmUpdateArgs>(
      args: SelectSubset<T, PwrModRmUpdateArgs>
    ): Prisma__PwrModRmClient<PwrModRmGetPayload<T>>

    /**
     * Delete zero or more PwrModRms.
     * @param {PwrModRmDeleteManyArgs} args - Arguments to filter PwrModRms to delete.
     * @example
     * // Delete a few PwrModRms
     * const { count } = await prisma.pwrModRm.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
    **/
    deleteMany<T extends PwrModRmDeleteManyArgs>(
      args?: SelectSubset<T, PwrModRmDeleteManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Update zero or more PwrModRms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModRmUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PwrModRms
     * const pwrModRm = await prisma.pwrModRm.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
    **/
    updateMany<T extends PwrModRmUpdateManyArgs>(
      args: SelectSubset<T, PwrModRmUpdateManyArgs>
    ): PrismaPromise<BatchPayload>

    /**
     * Create or update one PwrModRm.
     * @param {PwrModRmUpsertArgs} args - Arguments to update or create a PwrModRm.
     * @example
     * // Update or create a PwrModRm
     * const pwrModRm = await prisma.pwrModRm.upsert({
     *   create: {
     *     // ... data to create a PwrModRm
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PwrModRm we want to update
     *   }
     * })
    **/
    upsert<T extends PwrModRmUpsertArgs>(
      args: SelectSubset<T, PwrModRmUpsertArgs>
    ): Prisma__PwrModRmClient<PwrModRmGetPayload<T>>

    /**
     * Count the number of PwrModRms.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModRmCountArgs} args - Arguments to filter PwrModRms to count.
     * @example
     * // Count the number of PwrModRms
     * const count = await prisma.pwrModRm.count({
     *   where: {
     *     // ... the filter for the PwrModRms we want to count
     *   }
     * })
    **/
    count<T extends PwrModRmCountArgs>(
      args?: Subset<T, PwrModRmCountArgs>,
    ): PrismaPromise<
      T extends _Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PwrModRmCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PwrModRm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModRmAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PwrModRmAggregateArgs>(args: Subset<T, PwrModRmAggregateArgs>): PrismaPromise<GetPwrModRmAggregateType<T>>

    /**
     * Group by PwrModRm.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PwrModRmGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PwrModRmGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PwrModRmGroupByArgs['orderBy'] }
        : { orderBy?: PwrModRmGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends TupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PwrModRmGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPwrModRmGroupByPayload<T> : PrismaPromise<InputErrors>

  }

  /**
   * The delegate class that acts as a "Promise-like" for PwrModRm.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export class Prisma__PwrModRmClient<T, Null = never> implements PrismaPromise<T> {
    [prisma]: true;
    private readonly _dmmf;
    private readonly _fetcher;
    private readonly _queryType;
    private readonly _rootField;
    private readonly _clientMethod;
    private readonly _args;
    private readonly _dataPath;
    private readonly _errorFormat;
    private readonly _measurePerformance?;
    private _isList;
    private _callsite;
    private _requestPromise?;
    constructor(_dmmf: runtime.DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
    readonly [Symbol.toStringTag]: 'PrismaClientPromise';


    private get _document();
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): Promise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): Promise<T>;
  }



  // Custom InputTypes

  /**
   * PwrModRm base type for findUnique actions
   */
  export type PwrModRmFindUniqueArgsBase = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * Filter, which PwrModRm to fetch.
     * 
    **/
    where: PwrModRmWhereUniqueInput
  }

  /**
   * PwrModRm findUnique
   */
  export interface PwrModRmFindUniqueArgs extends PwrModRmFindUniqueArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findUniqueOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PwrModRm findUniqueOrThrow
   */
  export type PwrModRmFindUniqueOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * Filter, which PwrModRm to fetch.
     * 
    **/
    where: PwrModRmWhereUniqueInput
  }


  /**
   * PwrModRm base type for findFirst actions
   */
  export type PwrModRmFindFirstArgsBase = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * Filter, which PwrModRm to fetch.
     * 
    **/
    where?: PwrModRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PwrModRms to fetch.
     * 
    **/
    orderBy?: Enumerable<PwrModRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PwrModRms.
     * 
    **/
    cursor?: PwrModRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PwrModRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PwrModRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PwrModRms.
     * 
    **/
    distinct?: Enumerable<PwrModRmScalarFieldEnum>
  }

  /**
   * PwrModRm findFirst
   */
  export interface PwrModRmFindFirstArgs extends PwrModRmFindFirstArgsBase {
   /**
    * Throw an Error if query returns no results
    * @deprecated since 4.0.0: use `findFirstOrThrow` method instead
    */
    rejectOnNotFound?: RejectOnNotFound
  }
      

  /**
   * PwrModRm findFirstOrThrow
   */
  export type PwrModRmFindFirstOrThrowArgs = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * Filter, which PwrModRm to fetch.
     * 
    **/
    where?: PwrModRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PwrModRms to fetch.
     * 
    **/
    orderBy?: Enumerable<PwrModRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PwrModRms.
     * 
    **/
    cursor?: PwrModRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PwrModRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PwrModRms.
     * 
    **/
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PwrModRms.
     * 
    **/
    distinct?: Enumerable<PwrModRmScalarFieldEnum>
  }


  /**
   * PwrModRm findMany
   */
  export type PwrModRmFindManyArgs = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * Filter, which PwrModRms to fetch.
     * 
    **/
    where?: PwrModRmWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PwrModRms to fetch.
     * 
    **/
    orderBy?: Enumerable<PwrModRmOrderByWithRelationInput>
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PwrModRms.
     * 
    **/
    cursor?: PwrModRmWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PwrModRms from the position of the cursor.
     * 
    **/
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PwrModRms.
     * 
    **/
    skip?: number
    distinct?: Enumerable<PwrModRmScalarFieldEnum>
  }


  /**
   * PwrModRm create
   */
  export type PwrModRmCreateArgs = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * The data needed to create a PwrModRm.
     * 
    **/
    data: XOR<PwrModRmCreateInput, PwrModRmUncheckedCreateInput>
  }


  /**
   * PwrModRm update
   */
  export type PwrModRmUpdateArgs = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * The data needed to update a PwrModRm.
     * 
    **/
    data: XOR<PwrModRmUpdateInput, PwrModRmUncheckedUpdateInput>
    /**
     * Choose, which PwrModRm to update.
     * 
    **/
    where: PwrModRmWhereUniqueInput
  }


  /**
   * PwrModRm updateMany
   */
  export type PwrModRmUpdateManyArgs = {
    /**
     * The data used to update PwrModRms.
     * 
    **/
    data: XOR<PwrModRmUpdateManyMutationInput, PwrModRmUncheckedUpdateManyInput>
    /**
     * Filter which PwrModRms to update
     * 
    **/
    where?: PwrModRmWhereInput
  }


  /**
   * PwrModRm upsert
   */
  export type PwrModRmUpsertArgs = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * The filter to search for the PwrModRm to update in case it exists.
     * 
    **/
    where: PwrModRmWhereUniqueInput
    /**
     * In case the PwrModRm found by the `where` argument doesn't exist, create a new PwrModRm with this data.
     * 
    **/
    create: XOR<PwrModRmCreateInput, PwrModRmUncheckedCreateInput>
    /**
     * In case the PwrModRm was found with the provided `where` argument, update it with this data.
     * 
    **/
    update: XOR<PwrModRmUpdateInput, PwrModRmUncheckedUpdateInput>
  }


  /**
   * PwrModRm delete
   */
  export type PwrModRmDeleteArgs = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
    /**
     * Filter which PwrModRm to delete.
     * 
    **/
    where: PwrModRmWhereUniqueInput
  }


  /**
   * PwrModRm deleteMany
   */
  export type PwrModRmDeleteManyArgs = {
    /**
     * Filter which PwrModRms to delete
     * 
    **/
    where?: PwrModRmWhereInput
  }


  /**
   * PwrModRm without action
   */
  export type PwrModRmArgs = {
    /**
     * Select specific fields to fetch from the PwrModRm
     * 
    **/
    select?: PwrModRmSelect | null
  }



  /**
   * Enums
   */

  // Based on
  // https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

  export const AccountAddScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    sponsor: 'sponsor',
    owner: 'owner',
    key: 'key'
  };

  export type AccountAddScalarFieldEnum = (typeof AccountAddScalarFieldEnum)[keyof typeof AccountAddScalarFieldEnum]


  export const AccountBuyScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    payer_boid_id: 'payer_boid_id',
    boid_id: 'boid_id',
    key: 'key',
    owner: 'owner'
  };

  export type AccountBuyScalarFieldEnum = (typeof AccountBuyScalarFieldEnum)[keyof typeof AccountBuyScalarFieldEnum]


  export const AccountEditScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    ipfs_meta: 'ipfs_meta'
  };

  export type AccountEditScalarFieldEnum = (typeof AccountEditScalarFieldEnum)[keyof typeof AccountEditScalarFieldEnum]


  export const AccountFreeScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id'
  };

  export type AccountFreeScalarFieldEnum = (typeof AccountFreeScalarFieldEnum)[keyof typeof AccountFreeScalarFieldEnum]


  export const AuthAddKeyScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    key: 'key'
  };

  export type AuthAddKeyScalarFieldEnum = (typeof AuthAddKeyScalarFieldEnum)[keyof typeof AuthAddKeyScalarFieldEnum]


  export const AuthRmKeyScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    keyIndex: 'keyIndex'
  };

  export type AuthRmKeyScalarFieldEnum = (typeof AuthRmKeyScalarFieldEnum)[keyof typeof AuthRmKeyScalarFieldEnum]


  export const BoidAccountScalarFieldEnum: {
    boidId: 'boidId'
  };

  export type BoidAccountScalarFieldEnum = (typeof BoidAccountScalarFieldEnum)[keyof typeof BoidAccountScalarFieldEnum]


  export const FahDataScalarFieldEnum: {
    id: 'id',
    time: 'time',
    fahid: 'fahid',
    name: 'name',
    score: 'score',
    wus: 'wus'
  };

  export type FahDataScalarFieldEnum = (typeof FahDataScalarFieldEnum)[keyof typeof FahDataScalarFieldEnum]


  export const InternalXferScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    from_boid_id: 'from_boid_id',
    to_boid_id: 'to_boid_id',
    quantity: 'quantity',
    memo: 'memo'
  };

  export type InternalXferScalarFieldEnum = (typeof InternalXferScalarFieldEnum)[keyof typeof InternalXferScalarFieldEnum]


  export const InviteAddScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    invite_code: 'invite_code',
    key: 'key'
  };

  export type InviteAddScalarFieldEnum = (typeof InviteAddScalarFieldEnum)[keyof typeof InviteAddScalarFieldEnum]


  export const InviteClaimScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    sponsor_boid_id: 'sponsor_boid_id',
    invite_code: 'invite_code',
    sig: 'sig',
    create_boid_id: 'create_boid_id',
    create_key: 'create_key',
    create_owner: 'create_owner'
  };

  export type InviteClaimScalarFieldEnum = (typeof InviteClaimScalarFieldEnum)[keyof typeof InviteClaimScalarFieldEnum]


  export const InviteRmScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    sponsor_boid_id: 'sponsor_boid_id',
    invite_code: 'invite_code'
  };

  export type InviteRmScalarFieldEnum = (typeof InviteRmScalarFieldEnum)[keyof typeof InviteRmScalarFieldEnum]


  export const LogPwrAddScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    received: 'received',
    from_mult_mods: 'from_mult_mods',
    diverted_to_sponsor: 'diverted_to_sponsor',
    power_increased: 'power_increased',
    orign: 'orign'
  };

  export type LogPwrAddScalarFieldEnum = (typeof LogPwrAddScalarFieldEnum)[keyof typeof LogPwrAddScalarFieldEnum]


  export const LogPwrClaimScalarFieldEnum: {
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
  };

  export type LogPwrClaimScalarFieldEnum = (typeof LogPwrClaimScalarFieldEnum)[keyof typeof LogPwrClaimScalarFieldEnum]


  export const NftLockScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    asset_id: 'asset_id',
    locked_until_round: 'locked_until_round'
  };

  export type NftLockScalarFieldEnum = (typeof NftLockScalarFieldEnum)[keyof typeof NftLockScalarFieldEnum]


  export const NftWithdrawScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    asset_ids: 'asset_ids',
    to: 'to'
  };

  export type NftWithdrawScalarFieldEnum = (typeof NftWithdrawScalarFieldEnum)[keyof typeof NftWithdrawScalarFieldEnum]


  export const NftXferScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    from_boid_id: 'from_boid_id',
    to_boid_id: 'to_boid_id',
    asset_ids: 'asset_ids'
  };

  export type NftXferScalarFieldEnum = (typeof NftXferScalarFieldEnum)[keyof typeof NftXferScalarFieldEnum]


  export const OfferClaimScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    offer_id: 'offer_id',
    required_nft_action_ids: 'required_nft_action_ids'
  };

  export type OfferClaimScalarFieldEnum = (typeof OfferClaimScalarFieldEnum)[keyof typeof OfferClaimScalarFieldEnum]


  export const OwnerAddScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    owner: 'owner'
  };

  export type OwnerAddScalarFieldEnum = (typeof OwnerAddScalarFieldEnum)[keyof typeof OwnerAddScalarFieldEnum]


  export const OwnerRmScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    owner: 'owner'
  };

  export type OwnerRmScalarFieldEnum = (typeof OwnerRmScalarFieldEnum)[keyof typeof OwnerRmScalarFieldEnum]


  export const PwrModAddScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    mod_id: 'mod_id'
  };

  export type PwrModAddScalarFieldEnum = (typeof PwrModAddScalarFieldEnum)[keyof typeof PwrModAddScalarFieldEnum]


  export const PwrModRmScalarFieldEnum: {
    sequence: 'sequence',
    trxId: 'trxId',
    timeStamp: 'timeStamp',
    boid_id: 'boid_id',
    pwrmod_index: 'pwrmod_index'
  };

  export type PwrModRmScalarFieldEnum = (typeof PwrModRmScalarFieldEnum)[keyof typeof PwrModRmScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  /**
   * Deep Input Types
   */


  export type FahDataWhereInput = {
    AND?: Enumerable<FahDataWhereInput>
    OR?: Enumerable<FahDataWhereInput>
    NOT?: Enumerable<FahDataWhereInput>
    id?: StringFilter | string
    time?: DateTimeFilter | Date | string
    fahid?: BigIntFilter | bigint | number
    name?: StringFilter | string
    score?: BigIntFilter | bigint | number
    wus?: BigIntFilter | bigint | number
  }

  export type FahDataOrderByWithRelationInput = {
    id?: SortOrder
    time?: SortOrder
    fahid?: SortOrder
    name?: SortOrder
    score?: SortOrder
    wus?: SortOrder
  }

  export type FahDataWhereUniqueInput = {
    id?: string
  }

  export type FahDataOrderByWithAggregationInput = {
    id?: SortOrder
    time?: SortOrder
    fahid?: SortOrder
    name?: SortOrder
    score?: SortOrder
    wus?: SortOrder
    _count?: FahDataCountOrderByAggregateInput
    _avg?: FahDataAvgOrderByAggregateInput
    _max?: FahDataMaxOrderByAggregateInput
    _min?: FahDataMinOrderByAggregateInput
    _sum?: FahDataSumOrderByAggregateInput
  }

  export type FahDataScalarWhereWithAggregatesInput = {
    AND?: Enumerable<FahDataScalarWhereWithAggregatesInput>
    OR?: Enumerable<FahDataScalarWhereWithAggregatesInput>
    NOT?: Enumerable<FahDataScalarWhereWithAggregatesInput>
    id?: StringWithAggregatesFilter | string
    time?: DateTimeWithAggregatesFilter | Date | string
    fahid?: BigIntWithAggregatesFilter | bigint | number
    name?: StringWithAggregatesFilter | string
    score?: BigIntWithAggregatesFilter | bigint | number
    wus?: BigIntWithAggregatesFilter | bigint | number
  }

  export type BoidAccountWhereInput = {
    AND?: Enumerable<BoidAccountWhereInput>
    OR?: Enumerable<BoidAccountWhereInput>
    NOT?: Enumerable<BoidAccountWhereInput>
    boidId?: StringFilter | string
  }

  export type BoidAccountOrderByWithRelationInput = {
    boidId?: SortOrder
  }

  export type BoidAccountWhereUniqueInput = {
    boidId?: string
  }

  export type BoidAccountOrderByWithAggregationInput = {
    boidId?: SortOrder
    _count?: BoidAccountCountOrderByAggregateInput
    _max?: BoidAccountMaxOrderByAggregateInput
    _min?: BoidAccountMinOrderByAggregateInput
  }

  export type BoidAccountScalarWhereWithAggregatesInput = {
    AND?: Enumerable<BoidAccountScalarWhereWithAggregatesInput>
    OR?: Enumerable<BoidAccountScalarWhereWithAggregatesInput>
    NOT?: Enumerable<BoidAccountScalarWhereWithAggregatesInput>
    boidId?: StringWithAggregatesFilter | string
  }

  export type AccountAddWhereInput = {
    AND?: Enumerable<AccountAddWhereInput>
    OR?: Enumerable<AccountAddWhereInput>
    NOT?: Enumerable<AccountAddWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    sponsor?: StringNullableFilter | string | null
    owner?: StringNullableFilter | string | null
    key?: StringNullableFilter | string | null
  }

  export type AccountAddOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    sponsor?: SortOrder
    owner?: SortOrder
    key?: SortOrder
  }

  export type AccountAddWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type AccountAddOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    sponsor?: SortOrder
    owner?: SortOrder
    key?: SortOrder
    _count?: AccountAddCountOrderByAggregateInput
    _avg?: AccountAddAvgOrderByAggregateInput
    _max?: AccountAddMaxOrderByAggregateInput
    _min?: AccountAddMinOrderByAggregateInput
    _sum?: AccountAddSumOrderByAggregateInput
  }

  export type AccountAddScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountAddScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountAddScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountAddScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    sponsor?: StringNullableWithAggregatesFilter | string | null
    owner?: StringNullableWithAggregatesFilter | string | null
    key?: StringNullableWithAggregatesFilter | string | null
  }

  export type AccountBuyWhereInput = {
    AND?: Enumerable<AccountBuyWhereInput>
    OR?: Enumerable<AccountBuyWhereInput>
    NOT?: Enumerable<AccountBuyWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    payer_boid_id?: StringFilter | string
    boid_id?: StringFilter | string
    key?: StringNullableFilter | string | null
    owner?: StringNullableFilter | string | null
  }

  export type AccountBuyOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    payer_boid_id?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
    owner?: SortOrder
  }

  export type AccountBuyWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type AccountBuyOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    payer_boid_id?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
    owner?: SortOrder
    _count?: AccountBuyCountOrderByAggregateInput
    _avg?: AccountBuyAvgOrderByAggregateInput
    _max?: AccountBuyMaxOrderByAggregateInput
    _min?: AccountBuyMinOrderByAggregateInput
    _sum?: AccountBuySumOrderByAggregateInput
  }

  export type AccountBuyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountBuyScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountBuyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountBuyScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    payer_boid_id?: StringWithAggregatesFilter | string
    boid_id?: StringWithAggregatesFilter | string
    key?: StringNullableWithAggregatesFilter | string | null
    owner?: StringNullableWithAggregatesFilter | string | null
  }

  export type AccountEditWhereInput = {
    AND?: Enumerable<AccountEditWhereInput>
    OR?: Enumerable<AccountEditWhereInput>
    NOT?: Enumerable<AccountEditWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    ipfs_meta?: StringFilter | string
  }

  export type AccountEditOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    ipfs_meta?: SortOrder
  }

  export type AccountEditWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type AccountEditOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    ipfs_meta?: SortOrder
    _count?: AccountEditCountOrderByAggregateInput
    _avg?: AccountEditAvgOrderByAggregateInput
    _max?: AccountEditMaxOrderByAggregateInput
    _min?: AccountEditMinOrderByAggregateInput
    _sum?: AccountEditSumOrderByAggregateInput
  }

  export type AccountEditScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountEditScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountEditScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountEditScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    ipfs_meta?: StringWithAggregatesFilter | string
  }

  export type AccountFreeWhereInput = {
    AND?: Enumerable<AccountFreeWhereInput>
    OR?: Enumerable<AccountFreeWhereInput>
    NOT?: Enumerable<AccountFreeWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
  }

  export type AccountFreeOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
  }

  export type AccountFreeWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type AccountFreeOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    _count?: AccountFreeCountOrderByAggregateInput
    _avg?: AccountFreeAvgOrderByAggregateInput
    _max?: AccountFreeMaxOrderByAggregateInput
    _min?: AccountFreeMinOrderByAggregateInput
    _sum?: AccountFreeSumOrderByAggregateInput
  }

  export type AccountFreeScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AccountFreeScalarWhereWithAggregatesInput>
    OR?: Enumerable<AccountFreeScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AccountFreeScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
  }

  export type AuthAddKeyWhereInput = {
    AND?: Enumerable<AuthAddKeyWhereInput>
    OR?: Enumerable<AuthAddKeyWhereInput>
    NOT?: Enumerable<AuthAddKeyWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    key?: StringFilter | string
  }

  export type AuthAddKeyOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
  }

  export type AuthAddKeyWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type AuthAddKeyOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
    _count?: AuthAddKeyCountOrderByAggregateInput
    _avg?: AuthAddKeyAvgOrderByAggregateInput
    _max?: AuthAddKeyMaxOrderByAggregateInput
    _min?: AuthAddKeyMinOrderByAggregateInput
    _sum?: AuthAddKeySumOrderByAggregateInput
  }

  export type AuthAddKeyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuthAddKeyScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuthAddKeyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuthAddKeyScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    key?: StringWithAggregatesFilter | string
  }

  export type AuthRmKeyWhereInput = {
    AND?: Enumerable<AuthRmKeyWhereInput>
    OR?: Enumerable<AuthRmKeyWhereInput>
    NOT?: Enumerable<AuthRmKeyWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    keyIndex?: IntFilter | number
  }

  export type AuthRmKeyOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    keyIndex?: SortOrder
  }

  export type AuthRmKeyWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type AuthRmKeyOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    keyIndex?: SortOrder
    _count?: AuthRmKeyCountOrderByAggregateInput
    _avg?: AuthRmKeyAvgOrderByAggregateInput
    _max?: AuthRmKeyMaxOrderByAggregateInput
    _min?: AuthRmKeyMinOrderByAggregateInput
    _sum?: AuthRmKeySumOrderByAggregateInput
  }

  export type AuthRmKeyScalarWhereWithAggregatesInput = {
    AND?: Enumerable<AuthRmKeyScalarWhereWithAggregatesInput>
    OR?: Enumerable<AuthRmKeyScalarWhereWithAggregatesInput>
    NOT?: Enumerable<AuthRmKeyScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    keyIndex?: IntWithAggregatesFilter | number
  }

  export type InternalXferWhereInput = {
    AND?: Enumerable<InternalXferWhereInput>
    OR?: Enumerable<InternalXferWhereInput>
    NOT?: Enumerable<InternalXferWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    from_boid_id?: StringFilter | string
    to_boid_id?: StringFilter | string
    quantity?: IntFilter | number
    memo?: StringNullableFilter | string | null
  }

  export type InternalXferOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    quantity?: SortOrder
    memo?: SortOrder
  }

  export type InternalXferWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type InternalXferOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    quantity?: SortOrder
    memo?: SortOrder
    _count?: InternalXferCountOrderByAggregateInput
    _avg?: InternalXferAvgOrderByAggregateInput
    _max?: InternalXferMaxOrderByAggregateInput
    _min?: InternalXferMinOrderByAggregateInput
    _sum?: InternalXferSumOrderByAggregateInput
  }

  export type InternalXferScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InternalXferScalarWhereWithAggregatesInput>
    OR?: Enumerable<InternalXferScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InternalXferScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    from_boid_id?: StringWithAggregatesFilter | string
    to_boid_id?: StringWithAggregatesFilter | string
    quantity?: IntWithAggregatesFilter | number
    memo?: StringNullableWithAggregatesFilter | string | null
  }

  export type InviteAddWhereInput = {
    AND?: Enumerable<InviteAddWhereInput>
    OR?: Enumerable<InviteAddWhereInput>
    NOT?: Enumerable<InviteAddWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    invite_code?: StringFilter | string
    key?: StringFilter | string
  }

  export type InviteAddOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    invite_code?: SortOrder
    key?: SortOrder
  }

  export type InviteAddWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type InviteAddOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    invite_code?: SortOrder
    key?: SortOrder
    _count?: InviteAddCountOrderByAggregateInput
    _avg?: InviteAddAvgOrderByAggregateInput
    _max?: InviteAddMaxOrderByAggregateInput
    _min?: InviteAddMinOrderByAggregateInput
    _sum?: InviteAddSumOrderByAggregateInput
  }

  export type InviteAddScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InviteAddScalarWhereWithAggregatesInput>
    OR?: Enumerable<InviteAddScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InviteAddScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    invite_code?: StringWithAggregatesFilter | string
    key?: StringWithAggregatesFilter | string
  }

  export type InviteClaimWhereInput = {
    AND?: Enumerable<InviteClaimWhereInput>
    OR?: Enumerable<InviteClaimWhereInput>
    NOT?: Enumerable<InviteClaimWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    sponsor_boid_id?: StringFilter | string
    invite_code?: StringFilter | string
    sig?: StringFilter | string
    create_boid_id?: StringFilter | string
    create_key?: StringNullableFilter | string | null
    create_owner?: StringNullableFilter | string | null
  }

  export type InviteClaimOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
    sig?: SortOrder
    create_boid_id?: SortOrder
    create_key?: SortOrder
    create_owner?: SortOrder
  }

  export type InviteClaimWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type InviteClaimOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
    sig?: SortOrder
    create_boid_id?: SortOrder
    create_key?: SortOrder
    create_owner?: SortOrder
    _count?: InviteClaimCountOrderByAggregateInput
    _avg?: InviteClaimAvgOrderByAggregateInput
    _max?: InviteClaimMaxOrderByAggregateInput
    _min?: InviteClaimMinOrderByAggregateInput
    _sum?: InviteClaimSumOrderByAggregateInput
  }

  export type InviteClaimScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InviteClaimScalarWhereWithAggregatesInput>
    OR?: Enumerable<InviteClaimScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InviteClaimScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    sponsor_boid_id?: StringWithAggregatesFilter | string
    invite_code?: StringWithAggregatesFilter | string
    sig?: StringWithAggregatesFilter | string
    create_boid_id?: StringWithAggregatesFilter | string
    create_key?: StringNullableWithAggregatesFilter | string | null
    create_owner?: StringNullableWithAggregatesFilter | string | null
  }

  export type InviteRmWhereInput = {
    AND?: Enumerable<InviteRmWhereInput>
    OR?: Enumerable<InviteRmWhereInput>
    NOT?: Enumerable<InviteRmWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    sponsor_boid_id?: StringFilter | string
    invite_code?: StringFilter | string
  }

  export type InviteRmOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
  }

  export type InviteRmWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type InviteRmOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
    _count?: InviteRmCountOrderByAggregateInput
    _avg?: InviteRmAvgOrderByAggregateInput
    _max?: InviteRmMaxOrderByAggregateInput
    _min?: InviteRmMinOrderByAggregateInput
    _sum?: InviteRmSumOrderByAggregateInput
  }

  export type InviteRmScalarWhereWithAggregatesInput = {
    AND?: Enumerable<InviteRmScalarWhereWithAggregatesInput>
    OR?: Enumerable<InviteRmScalarWhereWithAggregatesInput>
    NOT?: Enumerable<InviteRmScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    sponsor_boid_id?: StringWithAggregatesFilter | string
    invite_code?: StringWithAggregatesFilter | string
  }

  export type LogPwrAddWhereInput = {
    AND?: Enumerable<LogPwrAddWhereInput>
    OR?: Enumerable<LogPwrAddWhereInput>
    NOT?: Enumerable<LogPwrAddWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    received?: IntFilter | number
    from_mult_mods?: IntFilter | number
    diverted_to_sponsor?: IntFilter | number
    power_increased?: IntFilter | number
    orign?: StringFilter | string
  }

  export type LogPwrAddOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    received?: SortOrder
    from_mult_mods?: SortOrder
    diverted_to_sponsor?: SortOrder
    power_increased?: SortOrder
    orign?: SortOrder
  }

  export type LogPwrAddWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type LogPwrAddOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    received?: SortOrder
    from_mult_mods?: SortOrder
    diverted_to_sponsor?: SortOrder
    power_increased?: SortOrder
    orign?: SortOrder
    _count?: LogPwrAddCountOrderByAggregateInput
    _avg?: LogPwrAddAvgOrderByAggregateInput
    _max?: LogPwrAddMaxOrderByAggregateInput
    _min?: LogPwrAddMinOrderByAggregateInput
    _sum?: LogPwrAddSumOrderByAggregateInput
  }

  export type LogPwrAddScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LogPwrAddScalarWhereWithAggregatesInput>
    OR?: Enumerable<LogPwrAddScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LogPwrAddScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    received?: IntWithAggregatesFilter | number
    from_mult_mods?: IntWithAggregatesFilter | number
    diverted_to_sponsor?: IntWithAggregatesFilter | number
    power_increased?: IntWithAggregatesFilter | number
    orign?: StringWithAggregatesFilter | string
  }

  export type LogPwrClaimWhereInput = {
    AND?: Enumerable<LogPwrClaimWhereInput>
    OR?: Enumerable<LogPwrClaimWhereInput>
    NOT?: Enumerable<LogPwrClaimWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    power_before?: IntFilter | number
    power_after?: IntFilter | number
    power_from_mods?: IntFilter | number
    power_decayed?: IntFilter | number
    power_rounds?: IntFilter | number
    mint_account?: IntFilter | number
    mint_team?: IntFilter | number
    mint_team_owner?: IntFilter | number
    mint_overstake?: IntFilter | number
    mint_fundstake?: IntFilter | number
    mint_total?: IntFilter | number
  }

  export type LogPwrClaimOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    power_before?: SortOrder
    power_after?: SortOrder
    power_from_mods?: SortOrder
    power_decayed?: SortOrder
    power_rounds?: SortOrder
    mint_account?: SortOrder
    mint_team?: SortOrder
    mint_team_owner?: SortOrder
    mint_overstake?: SortOrder
    mint_fundstake?: SortOrder
    mint_total?: SortOrder
  }

  export type LogPwrClaimWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type LogPwrClaimOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    power_before?: SortOrder
    power_after?: SortOrder
    power_from_mods?: SortOrder
    power_decayed?: SortOrder
    power_rounds?: SortOrder
    mint_account?: SortOrder
    mint_team?: SortOrder
    mint_team_owner?: SortOrder
    mint_overstake?: SortOrder
    mint_fundstake?: SortOrder
    mint_total?: SortOrder
    _count?: LogPwrClaimCountOrderByAggregateInput
    _avg?: LogPwrClaimAvgOrderByAggregateInput
    _max?: LogPwrClaimMaxOrderByAggregateInput
    _min?: LogPwrClaimMinOrderByAggregateInput
    _sum?: LogPwrClaimSumOrderByAggregateInput
  }

  export type LogPwrClaimScalarWhereWithAggregatesInput = {
    AND?: Enumerable<LogPwrClaimScalarWhereWithAggregatesInput>
    OR?: Enumerable<LogPwrClaimScalarWhereWithAggregatesInput>
    NOT?: Enumerable<LogPwrClaimScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    power_before?: IntWithAggregatesFilter | number
    power_after?: IntWithAggregatesFilter | number
    power_from_mods?: IntWithAggregatesFilter | number
    power_decayed?: IntWithAggregatesFilter | number
    power_rounds?: IntWithAggregatesFilter | number
    mint_account?: IntWithAggregatesFilter | number
    mint_team?: IntWithAggregatesFilter | number
    mint_team_owner?: IntWithAggregatesFilter | number
    mint_overstake?: IntWithAggregatesFilter | number
    mint_fundstake?: IntWithAggregatesFilter | number
    mint_total?: IntWithAggregatesFilter | number
  }

  export type NftLockWhereInput = {
    AND?: Enumerable<NftLockWhereInput>
    OR?: Enumerable<NftLockWhereInput>
    NOT?: Enumerable<NftLockWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    asset_id?: StringFilter | string
    locked_until_round?: IntFilter | number
  }

  export type NftLockOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_id?: SortOrder
    locked_until_round?: SortOrder
  }

  export type NftLockWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type NftLockOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_id?: SortOrder
    locked_until_round?: SortOrder
    _count?: NftLockCountOrderByAggregateInput
    _avg?: NftLockAvgOrderByAggregateInput
    _max?: NftLockMaxOrderByAggregateInput
    _min?: NftLockMinOrderByAggregateInput
    _sum?: NftLockSumOrderByAggregateInput
  }

  export type NftLockScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NftLockScalarWhereWithAggregatesInput>
    OR?: Enumerable<NftLockScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NftLockScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    asset_id?: StringWithAggregatesFilter | string
    locked_until_round?: IntWithAggregatesFilter | number
  }

  export type NftWithdrawWhereInput = {
    AND?: Enumerable<NftWithdrawWhereInput>
    OR?: Enumerable<NftWithdrawWhereInput>
    NOT?: Enumerable<NftWithdrawWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    asset_ids?: StringFilter | string
    to?: StringFilter | string
  }

  export type NftWithdrawOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_ids?: SortOrder
    to?: SortOrder
  }

  export type NftWithdrawWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type NftWithdrawOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_ids?: SortOrder
    to?: SortOrder
    _count?: NftWithdrawCountOrderByAggregateInput
    _avg?: NftWithdrawAvgOrderByAggregateInput
    _max?: NftWithdrawMaxOrderByAggregateInput
    _min?: NftWithdrawMinOrderByAggregateInput
    _sum?: NftWithdrawSumOrderByAggregateInput
  }

  export type NftWithdrawScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NftWithdrawScalarWhereWithAggregatesInput>
    OR?: Enumerable<NftWithdrawScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NftWithdrawScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    asset_ids?: StringWithAggregatesFilter | string
    to?: StringWithAggregatesFilter | string
  }

  export type NftXferWhereInput = {
    AND?: Enumerable<NftXferWhereInput>
    OR?: Enumerable<NftXferWhereInput>
    NOT?: Enumerable<NftXferWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    from_boid_id?: StringFilter | string
    to_boid_id?: StringFilter | string
    asset_ids?: StringFilter | string
  }

  export type NftXferOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    asset_ids?: SortOrder
  }

  export type NftXferWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type NftXferOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    asset_ids?: SortOrder
    _count?: NftXferCountOrderByAggregateInput
    _avg?: NftXferAvgOrderByAggregateInput
    _max?: NftXferMaxOrderByAggregateInput
    _min?: NftXferMinOrderByAggregateInput
    _sum?: NftXferSumOrderByAggregateInput
  }

  export type NftXferScalarWhereWithAggregatesInput = {
    AND?: Enumerable<NftXferScalarWhereWithAggregatesInput>
    OR?: Enumerable<NftXferScalarWhereWithAggregatesInput>
    NOT?: Enumerable<NftXferScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    from_boid_id?: StringWithAggregatesFilter | string
    to_boid_id?: StringWithAggregatesFilter | string
    asset_ids?: StringWithAggregatesFilter | string
  }

  export type OfferClaimWhereInput = {
    AND?: Enumerable<OfferClaimWhereInput>
    OR?: Enumerable<OfferClaimWhereInput>
    NOT?: Enumerable<OfferClaimWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    offer_id?: StringFilter | string
    required_nft_action_ids?: StringFilter | string
  }

  export type OfferClaimOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    offer_id?: SortOrder
    required_nft_action_ids?: SortOrder
  }

  export type OfferClaimWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type OfferClaimOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    offer_id?: SortOrder
    required_nft_action_ids?: SortOrder
    _count?: OfferClaimCountOrderByAggregateInput
    _avg?: OfferClaimAvgOrderByAggregateInput
    _max?: OfferClaimMaxOrderByAggregateInput
    _min?: OfferClaimMinOrderByAggregateInput
    _sum?: OfferClaimSumOrderByAggregateInput
  }

  export type OfferClaimScalarWhereWithAggregatesInput = {
    AND?: Enumerable<OfferClaimScalarWhereWithAggregatesInput>
    OR?: Enumerable<OfferClaimScalarWhereWithAggregatesInput>
    NOT?: Enumerable<OfferClaimScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    offer_id?: StringWithAggregatesFilter | string
    required_nft_action_ids?: StringWithAggregatesFilter | string
  }

  export type OwnerAddWhereInput = {
    AND?: Enumerable<OwnerAddWhereInput>
    OR?: Enumerable<OwnerAddWhereInput>
    NOT?: Enumerable<OwnerAddWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    owner?: StringFilter | string
  }

  export type OwnerAddOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
  }

  export type OwnerAddWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type OwnerAddOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
    _count?: OwnerAddCountOrderByAggregateInput
    _avg?: OwnerAddAvgOrderByAggregateInput
    _max?: OwnerAddMaxOrderByAggregateInput
    _min?: OwnerAddMinOrderByAggregateInput
    _sum?: OwnerAddSumOrderByAggregateInput
  }

  export type OwnerAddScalarWhereWithAggregatesInput = {
    AND?: Enumerable<OwnerAddScalarWhereWithAggregatesInput>
    OR?: Enumerable<OwnerAddScalarWhereWithAggregatesInput>
    NOT?: Enumerable<OwnerAddScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    owner?: StringWithAggregatesFilter | string
  }

  export type OwnerRmWhereInput = {
    AND?: Enumerable<OwnerRmWhereInput>
    OR?: Enumerable<OwnerRmWhereInput>
    NOT?: Enumerable<OwnerRmWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    owner?: StringFilter | string
  }

  export type OwnerRmOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
  }

  export type OwnerRmWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type OwnerRmOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
    _count?: OwnerRmCountOrderByAggregateInput
    _avg?: OwnerRmAvgOrderByAggregateInput
    _max?: OwnerRmMaxOrderByAggregateInput
    _min?: OwnerRmMinOrderByAggregateInput
    _sum?: OwnerRmSumOrderByAggregateInput
  }

  export type OwnerRmScalarWhereWithAggregatesInput = {
    AND?: Enumerable<OwnerRmScalarWhereWithAggregatesInput>
    OR?: Enumerable<OwnerRmScalarWhereWithAggregatesInput>
    NOT?: Enumerable<OwnerRmScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    owner?: StringWithAggregatesFilter | string
  }

  export type PwrModAddWhereInput = {
    AND?: Enumerable<PwrModAddWhereInput>
    OR?: Enumerable<PwrModAddWhereInput>
    NOT?: Enumerable<PwrModAddWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    mod_id?: IntFilter | number
  }

  export type PwrModAddOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    mod_id?: SortOrder
  }

  export type PwrModAddWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type PwrModAddOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    mod_id?: SortOrder
    _count?: PwrModAddCountOrderByAggregateInput
    _avg?: PwrModAddAvgOrderByAggregateInput
    _max?: PwrModAddMaxOrderByAggregateInput
    _min?: PwrModAddMinOrderByAggregateInput
    _sum?: PwrModAddSumOrderByAggregateInput
  }

  export type PwrModAddScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PwrModAddScalarWhereWithAggregatesInput>
    OR?: Enumerable<PwrModAddScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PwrModAddScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    mod_id?: IntWithAggregatesFilter | number
  }

  export type PwrModRmWhereInput = {
    AND?: Enumerable<PwrModRmWhereInput>
    OR?: Enumerable<PwrModRmWhereInput>
    NOT?: Enumerable<PwrModRmWhereInput>
    sequence?: BigIntFilter | bigint | number
    trxId?: StringFilter | string
    timeStamp?: DateTimeFilter | Date | string
    boid_id?: StringFilter | string
    pwrmod_index?: IntFilter | number
  }

  export type PwrModRmOrderByWithRelationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    pwrmod_index?: SortOrder
  }

  export type PwrModRmWhereUniqueInput = {
    sequence?: bigint | number
  }

  export type PwrModRmOrderByWithAggregationInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    pwrmod_index?: SortOrder
    _count?: PwrModRmCountOrderByAggregateInput
    _avg?: PwrModRmAvgOrderByAggregateInput
    _max?: PwrModRmMaxOrderByAggregateInput
    _min?: PwrModRmMinOrderByAggregateInput
    _sum?: PwrModRmSumOrderByAggregateInput
  }

  export type PwrModRmScalarWhereWithAggregatesInput = {
    AND?: Enumerable<PwrModRmScalarWhereWithAggregatesInput>
    OR?: Enumerable<PwrModRmScalarWhereWithAggregatesInput>
    NOT?: Enumerable<PwrModRmScalarWhereWithAggregatesInput>
    sequence?: BigIntWithAggregatesFilter | bigint | number
    trxId?: StringWithAggregatesFilter | string
    timeStamp?: DateTimeWithAggregatesFilter | Date | string
    boid_id?: StringWithAggregatesFilter | string
    pwrmod_index?: IntWithAggregatesFilter | number
  }

  export type FahDataCreateInput = {
    id?: string
    time: Date | string
    fahid: bigint | number
    name: string
    score: bigint | number
    wus: bigint | number
  }

  export type FahDataUncheckedCreateInput = {
    id?: string
    time: Date | string
    fahid: bigint | number
    name: string
    score: bigint | number
    wus: bigint | number
  }

  export type FahDataUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    fahid?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    score?: BigIntFieldUpdateOperationsInput | bigint | number
    wus?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type FahDataUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    fahid?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    score?: BigIntFieldUpdateOperationsInput | bigint | number
    wus?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type FahDataUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    fahid?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    score?: BigIntFieldUpdateOperationsInput | bigint | number
    wus?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type FahDataUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    time?: DateTimeFieldUpdateOperationsInput | Date | string
    fahid?: BigIntFieldUpdateOperationsInput | bigint | number
    name?: StringFieldUpdateOperationsInput | string
    score?: BigIntFieldUpdateOperationsInput | bigint | number
    wus?: BigIntFieldUpdateOperationsInput | bigint | number
  }

  export type BoidAccountCreateInput = {
    boidId: string
  }

  export type BoidAccountUncheckedCreateInput = {
    boidId: string
  }

  export type BoidAccountUpdateInput = {
    boidId?: StringFieldUpdateOperationsInput | string
  }

  export type BoidAccountUncheckedUpdateInput = {
    boidId?: StringFieldUpdateOperationsInput | string
  }

  export type BoidAccountUpdateManyMutationInput = {
    boidId?: StringFieldUpdateOperationsInput | string
  }

  export type BoidAccountUncheckedUpdateManyInput = {
    boidId?: StringFieldUpdateOperationsInput | string
  }

  export type AccountAddCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    sponsor?: string | null
    owner?: string | null
    key?: string | null
  }

  export type AccountAddUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    sponsor?: string | null
    owner?: string | null
    key?: string | null
  }

  export type AccountAddUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountAddUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountAddUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountAddUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    sponsor?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
    key?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountBuyCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    payer_boid_id: string
    boid_id: string
    key?: string | null
    owner?: string | null
  }

  export type AccountBuyUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    payer_boid_id: string
    boid_id: string
    key?: string | null
    owner?: string | null
  }

  export type AccountBuyUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    payer_boid_id?: StringFieldUpdateOperationsInput | string
    boid_id?: StringFieldUpdateOperationsInput | string
    key?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountBuyUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    payer_boid_id?: StringFieldUpdateOperationsInput | string
    boid_id?: StringFieldUpdateOperationsInput | string
    key?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountBuyUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    payer_boid_id?: StringFieldUpdateOperationsInput | string
    boid_id?: StringFieldUpdateOperationsInput | string
    key?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountBuyUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    payer_boid_id?: StringFieldUpdateOperationsInput | string
    boid_id?: StringFieldUpdateOperationsInput | string
    key?: NullableStringFieldUpdateOperationsInput | string | null
    owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type AccountEditCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    ipfs_meta: string
  }

  export type AccountEditUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    ipfs_meta: string
  }

  export type AccountEditUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    ipfs_meta?: StringFieldUpdateOperationsInput | string
  }

  export type AccountEditUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    ipfs_meta?: StringFieldUpdateOperationsInput | string
  }

  export type AccountEditUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    ipfs_meta?: StringFieldUpdateOperationsInput | string
  }

  export type AccountEditUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    ipfs_meta?: StringFieldUpdateOperationsInput | string
  }

  export type AccountFreeCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
  }

  export type AccountFreeUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
  }

  export type AccountFreeUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
  }

  export type AccountFreeUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
  }

  export type AccountFreeUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
  }

  export type AccountFreeUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
  }

  export type AuthAddKeyCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    key: string
  }

  export type AuthAddKeyUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    key: string
  }

  export type AuthAddKeyUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type AuthAddKeyUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type AuthAddKeyUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type AuthAddKeyUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type AuthRmKeyCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    keyIndex: number
  }

  export type AuthRmKeyUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    keyIndex: number
  }

  export type AuthRmKeyUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    keyIndex?: IntFieldUpdateOperationsInput | number
  }

  export type AuthRmKeyUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    keyIndex?: IntFieldUpdateOperationsInput | number
  }

  export type AuthRmKeyUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    keyIndex?: IntFieldUpdateOperationsInput | number
  }

  export type AuthRmKeyUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    keyIndex?: IntFieldUpdateOperationsInput | number
  }

  export type InternalXferCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    from_boid_id: string
    to_boid_id: string
    quantity: number
    memo?: string | null
  }

  export type InternalXferUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    from_boid_id: string
    to_boid_id: string
    quantity: number
    memo?: string | null
  }

  export type InternalXferUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_boid_id?: StringFieldUpdateOperationsInput | string
    to_boid_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InternalXferUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_boid_id?: StringFieldUpdateOperationsInput | string
    to_boid_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InternalXferUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_boid_id?: StringFieldUpdateOperationsInput | string
    to_boid_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InternalXferUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_boid_id?: StringFieldUpdateOperationsInput | string
    to_boid_id?: StringFieldUpdateOperationsInput | string
    quantity?: IntFieldUpdateOperationsInput | number
    memo?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InviteAddCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    invite_code: string
    key: string
  }

  export type InviteAddUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    invite_code: string
    key: string
  }

  export type InviteAddUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type InviteAddUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type InviteAddUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type InviteAddUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
  }

  export type InviteClaimCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    sponsor_boid_id: string
    invite_code: string
    sig: string
    create_boid_id: string
    create_key?: string | null
    create_owner?: string | null
  }

  export type InviteClaimUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    sponsor_boid_id: string
    invite_code: string
    sig: string
    create_boid_id: string
    create_key?: string | null
    create_owner?: string | null
  }

  export type InviteClaimUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsor_boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
    sig?: StringFieldUpdateOperationsInput | string
    create_boid_id?: StringFieldUpdateOperationsInput | string
    create_key?: NullableStringFieldUpdateOperationsInput | string | null
    create_owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InviteClaimUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsor_boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
    sig?: StringFieldUpdateOperationsInput | string
    create_boid_id?: StringFieldUpdateOperationsInput | string
    create_key?: NullableStringFieldUpdateOperationsInput | string | null
    create_owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InviteClaimUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsor_boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
    sig?: StringFieldUpdateOperationsInput | string
    create_boid_id?: StringFieldUpdateOperationsInput | string
    create_key?: NullableStringFieldUpdateOperationsInput | string | null
    create_owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InviteClaimUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsor_boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
    sig?: StringFieldUpdateOperationsInput | string
    create_boid_id?: StringFieldUpdateOperationsInput | string
    create_key?: NullableStringFieldUpdateOperationsInput | string | null
    create_owner?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type InviteRmCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    sponsor_boid_id: string
    invite_code: string
  }

  export type InviteRmUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    sponsor_boid_id: string
    invite_code: string
  }

  export type InviteRmUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsor_boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
  }

  export type InviteRmUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsor_boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
  }

  export type InviteRmUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsor_boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
  }

  export type InviteRmUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    sponsor_boid_id?: StringFieldUpdateOperationsInput | string
    invite_code?: StringFieldUpdateOperationsInput | string
  }

  export type LogPwrAddCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    received: number
    from_mult_mods: number
    diverted_to_sponsor: number
    power_increased: number
    orign: string
  }

  export type LogPwrAddUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    received: number
    from_mult_mods: number
    diverted_to_sponsor: number
    power_increased: number
    orign: string
  }

  export type LogPwrAddUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    received?: IntFieldUpdateOperationsInput | number
    from_mult_mods?: IntFieldUpdateOperationsInput | number
    diverted_to_sponsor?: IntFieldUpdateOperationsInput | number
    power_increased?: IntFieldUpdateOperationsInput | number
    orign?: StringFieldUpdateOperationsInput | string
  }

  export type LogPwrAddUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    received?: IntFieldUpdateOperationsInput | number
    from_mult_mods?: IntFieldUpdateOperationsInput | number
    diverted_to_sponsor?: IntFieldUpdateOperationsInput | number
    power_increased?: IntFieldUpdateOperationsInput | number
    orign?: StringFieldUpdateOperationsInput | string
  }

  export type LogPwrAddUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    received?: IntFieldUpdateOperationsInput | number
    from_mult_mods?: IntFieldUpdateOperationsInput | number
    diverted_to_sponsor?: IntFieldUpdateOperationsInput | number
    power_increased?: IntFieldUpdateOperationsInput | number
    orign?: StringFieldUpdateOperationsInput | string
  }

  export type LogPwrAddUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    received?: IntFieldUpdateOperationsInput | number
    from_mult_mods?: IntFieldUpdateOperationsInput | number
    diverted_to_sponsor?: IntFieldUpdateOperationsInput | number
    power_increased?: IntFieldUpdateOperationsInput | number
    orign?: StringFieldUpdateOperationsInput | string
  }

  export type LogPwrClaimCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    power_before: number
    power_after: number
    power_from_mods: number
    power_decayed: number
    power_rounds: number
    mint_account: number
    mint_team: number
    mint_team_owner: number
    mint_overstake: number
    mint_fundstake: number
    mint_total: number
  }

  export type LogPwrClaimUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    power_before: number
    power_after: number
    power_from_mods: number
    power_decayed: number
    power_rounds: number
    mint_account: number
    mint_team: number
    mint_team_owner: number
    mint_overstake: number
    mint_fundstake: number
    mint_total: number
  }

  export type LogPwrClaimUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    power_before?: IntFieldUpdateOperationsInput | number
    power_after?: IntFieldUpdateOperationsInput | number
    power_from_mods?: IntFieldUpdateOperationsInput | number
    power_decayed?: IntFieldUpdateOperationsInput | number
    power_rounds?: IntFieldUpdateOperationsInput | number
    mint_account?: IntFieldUpdateOperationsInput | number
    mint_team?: IntFieldUpdateOperationsInput | number
    mint_team_owner?: IntFieldUpdateOperationsInput | number
    mint_overstake?: IntFieldUpdateOperationsInput | number
    mint_fundstake?: IntFieldUpdateOperationsInput | number
    mint_total?: IntFieldUpdateOperationsInput | number
  }

  export type LogPwrClaimUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    power_before?: IntFieldUpdateOperationsInput | number
    power_after?: IntFieldUpdateOperationsInput | number
    power_from_mods?: IntFieldUpdateOperationsInput | number
    power_decayed?: IntFieldUpdateOperationsInput | number
    power_rounds?: IntFieldUpdateOperationsInput | number
    mint_account?: IntFieldUpdateOperationsInput | number
    mint_team?: IntFieldUpdateOperationsInput | number
    mint_team_owner?: IntFieldUpdateOperationsInput | number
    mint_overstake?: IntFieldUpdateOperationsInput | number
    mint_fundstake?: IntFieldUpdateOperationsInput | number
    mint_total?: IntFieldUpdateOperationsInput | number
  }

  export type LogPwrClaimUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    power_before?: IntFieldUpdateOperationsInput | number
    power_after?: IntFieldUpdateOperationsInput | number
    power_from_mods?: IntFieldUpdateOperationsInput | number
    power_decayed?: IntFieldUpdateOperationsInput | number
    power_rounds?: IntFieldUpdateOperationsInput | number
    mint_account?: IntFieldUpdateOperationsInput | number
    mint_team?: IntFieldUpdateOperationsInput | number
    mint_team_owner?: IntFieldUpdateOperationsInput | number
    mint_overstake?: IntFieldUpdateOperationsInput | number
    mint_fundstake?: IntFieldUpdateOperationsInput | number
    mint_total?: IntFieldUpdateOperationsInput | number
  }

  export type LogPwrClaimUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    power_before?: IntFieldUpdateOperationsInput | number
    power_after?: IntFieldUpdateOperationsInput | number
    power_from_mods?: IntFieldUpdateOperationsInput | number
    power_decayed?: IntFieldUpdateOperationsInput | number
    power_rounds?: IntFieldUpdateOperationsInput | number
    mint_account?: IntFieldUpdateOperationsInput | number
    mint_team?: IntFieldUpdateOperationsInput | number
    mint_team_owner?: IntFieldUpdateOperationsInput | number
    mint_overstake?: IntFieldUpdateOperationsInput | number
    mint_fundstake?: IntFieldUpdateOperationsInput | number
    mint_total?: IntFieldUpdateOperationsInput | number
  }

  export type NftLockCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    asset_id: string
    locked_until_round: number
  }

  export type NftLockUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    asset_id: string
    locked_until_round: number
  }

  export type NftLockUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    locked_until_round?: IntFieldUpdateOperationsInput | number
  }

  export type NftLockUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    locked_until_round?: IntFieldUpdateOperationsInput | number
  }

  export type NftLockUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    locked_until_round?: IntFieldUpdateOperationsInput | number
  }

  export type NftLockUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    asset_id?: StringFieldUpdateOperationsInput | string
    locked_until_round?: IntFieldUpdateOperationsInput | number
  }

  export type NftWithdrawCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    asset_ids: string
    to: string
  }

  export type NftWithdrawUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    asset_ids: string
    to: string
  }

  export type NftWithdrawUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    asset_ids?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
  }

  export type NftWithdrawUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    asset_ids?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
  }

  export type NftWithdrawUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    asset_ids?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
  }

  export type NftWithdrawUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    asset_ids?: StringFieldUpdateOperationsInput | string
    to?: StringFieldUpdateOperationsInput | string
  }

  export type NftXferCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    from_boid_id: string
    to_boid_id: string
    asset_ids: string
  }

  export type NftXferUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    from_boid_id: string
    to_boid_id: string
    asset_ids: string
  }

  export type NftXferUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_boid_id?: StringFieldUpdateOperationsInput | string
    to_boid_id?: StringFieldUpdateOperationsInput | string
    asset_ids?: StringFieldUpdateOperationsInput | string
  }

  export type NftXferUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_boid_id?: StringFieldUpdateOperationsInput | string
    to_boid_id?: StringFieldUpdateOperationsInput | string
    asset_ids?: StringFieldUpdateOperationsInput | string
  }

  export type NftXferUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_boid_id?: StringFieldUpdateOperationsInput | string
    to_boid_id?: StringFieldUpdateOperationsInput | string
    asset_ids?: StringFieldUpdateOperationsInput | string
  }

  export type NftXferUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    from_boid_id?: StringFieldUpdateOperationsInput | string
    to_boid_id?: StringFieldUpdateOperationsInput | string
    asset_ids?: StringFieldUpdateOperationsInput | string
  }

  export type OfferClaimCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    offer_id: string
    required_nft_action_ids: string
  }

  export type OfferClaimUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    offer_id: string
    required_nft_action_ids: string
  }

  export type OfferClaimUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    offer_id?: StringFieldUpdateOperationsInput | string
    required_nft_action_ids?: StringFieldUpdateOperationsInput | string
  }

  export type OfferClaimUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    offer_id?: StringFieldUpdateOperationsInput | string
    required_nft_action_ids?: StringFieldUpdateOperationsInput | string
  }

  export type OfferClaimUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    offer_id?: StringFieldUpdateOperationsInput | string
    required_nft_action_ids?: StringFieldUpdateOperationsInput | string
  }

  export type OfferClaimUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    offer_id?: StringFieldUpdateOperationsInput | string
    required_nft_action_ids?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerAddCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    owner: string
  }

  export type OwnerAddUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    owner: string
  }

  export type OwnerAddUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerAddUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerAddUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerAddUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerRmCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    owner: string
  }

  export type OwnerRmUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    owner: string
  }

  export type OwnerRmUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerRmUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerRmUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type OwnerRmUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    owner?: StringFieldUpdateOperationsInput | string
  }

  export type PwrModAddCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    mod_id: number
  }

  export type PwrModAddUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    mod_id: number
  }

  export type PwrModAddUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    mod_id?: IntFieldUpdateOperationsInput | number
  }

  export type PwrModAddUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    mod_id?: IntFieldUpdateOperationsInput | number
  }

  export type PwrModAddUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    mod_id?: IntFieldUpdateOperationsInput | number
  }

  export type PwrModAddUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    mod_id?: IntFieldUpdateOperationsInput | number
  }

  export type PwrModRmCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    pwrmod_index: number
  }

  export type PwrModRmUncheckedCreateInput = {
    sequence: bigint | number
    trxId: string
    timeStamp: Date | string
    boid_id: string
    pwrmod_index: number
  }

  export type PwrModRmUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    pwrmod_index?: IntFieldUpdateOperationsInput | number
  }

  export type PwrModRmUncheckedUpdateInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    pwrmod_index?: IntFieldUpdateOperationsInput | number
  }

  export type PwrModRmUpdateManyMutationInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    pwrmod_index?: IntFieldUpdateOperationsInput | number
  }

  export type PwrModRmUncheckedUpdateManyInput = {
    sequence?: BigIntFieldUpdateOperationsInput | bigint | number
    trxId?: StringFieldUpdateOperationsInput | string
    timeStamp?: DateTimeFieldUpdateOperationsInput | Date | string
    boid_id?: StringFieldUpdateOperationsInput | string
    pwrmod_index?: IntFieldUpdateOperationsInput | number
  }

  export type StringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type DateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type BigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type FahDataCountOrderByAggregateInput = {
    id?: SortOrder
    time?: SortOrder
    fahid?: SortOrder
    name?: SortOrder
    score?: SortOrder
    wus?: SortOrder
  }

  export type FahDataAvgOrderByAggregateInput = {
    fahid?: SortOrder
    score?: SortOrder
    wus?: SortOrder
  }

  export type FahDataMaxOrderByAggregateInput = {
    id?: SortOrder
    time?: SortOrder
    fahid?: SortOrder
    name?: SortOrder
    score?: SortOrder
    wus?: SortOrder
  }

  export type FahDataMinOrderByAggregateInput = {
    id?: SortOrder
    time?: SortOrder
    fahid?: SortOrder
    name?: SortOrder
    score?: SortOrder
    wus?: SortOrder
  }

  export type FahDataSumOrderByAggregateInput = {
    fahid?: SortOrder
    score?: SortOrder
    wus?: SortOrder
  }

  export type StringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type DateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type BigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type BoidAccountCountOrderByAggregateInput = {
    boidId?: SortOrder
  }

  export type BoidAccountMaxOrderByAggregateInput = {
    boidId?: SortOrder
  }

  export type BoidAccountMinOrderByAggregateInput = {
    boidId?: SortOrder
  }

  export type StringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type AccountAddCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    sponsor?: SortOrder
    owner?: SortOrder
    key?: SortOrder
  }

  export type AccountAddAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AccountAddMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    sponsor?: SortOrder
    owner?: SortOrder
    key?: SortOrder
  }

  export type AccountAddMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    sponsor?: SortOrder
    owner?: SortOrder
    key?: SortOrder
  }

  export type AccountAddSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type StringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type AccountBuyCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    payer_boid_id?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
    owner?: SortOrder
  }

  export type AccountBuyAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AccountBuyMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    payer_boid_id?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
    owner?: SortOrder
  }

  export type AccountBuyMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    payer_boid_id?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
    owner?: SortOrder
  }

  export type AccountBuySumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AccountEditCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    ipfs_meta?: SortOrder
  }

  export type AccountEditAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AccountEditMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    ipfs_meta?: SortOrder
  }

  export type AccountEditMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    ipfs_meta?: SortOrder
  }

  export type AccountEditSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AccountFreeCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
  }

  export type AccountFreeAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AccountFreeMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
  }

  export type AccountFreeMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
  }

  export type AccountFreeSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AuthAddKeyCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
  }

  export type AuthAddKeyAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type AuthAddKeyMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
  }

  export type AuthAddKeyMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    key?: SortOrder
  }

  export type AuthAddKeySumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type IntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type AuthRmKeyCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    keyIndex?: SortOrder
  }

  export type AuthRmKeyAvgOrderByAggregateInput = {
    sequence?: SortOrder
    keyIndex?: SortOrder
  }

  export type AuthRmKeyMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    keyIndex?: SortOrder
  }

  export type AuthRmKeyMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    keyIndex?: SortOrder
  }

  export type AuthRmKeySumOrderByAggregateInput = {
    sequence?: SortOrder
    keyIndex?: SortOrder
  }

  export type IntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }

  export type InternalXferCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    quantity?: SortOrder
    memo?: SortOrder
  }

  export type InternalXferAvgOrderByAggregateInput = {
    sequence?: SortOrder
    quantity?: SortOrder
  }

  export type InternalXferMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    quantity?: SortOrder
    memo?: SortOrder
  }

  export type InternalXferMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    quantity?: SortOrder
    memo?: SortOrder
  }

  export type InternalXferSumOrderByAggregateInput = {
    sequence?: SortOrder
    quantity?: SortOrder
  }

  export type InviteAddCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    invite_code?: SortOrder
    key?: SortOrder
  }

  export type InviteAddAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type InviteAddMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    invite_code?: SortOrder
    key?: SortOrder
  }

  export type InviteAddMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    invite_code?: SortOrder
    key?: SortOrder
  }

  export type InviteAddSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type InviteClaimCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
    sig?: SortOrder
    create_boid_id?: SortOrder
    create_key?: SortOrder
    create_owner?: SortOrder
  }

  export type InviteClaimAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type InviteClaimMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
    sig?: SortOrder
    create_boid_id?: SortOrder
    create_key?: SortOrder
    create_owner?: SortOrder
  }

  export type InviteClaimMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
    sig?: SortOrder
    create_boid_id?: SortOrder
    create_key?: SortOrder
    create_owner?: SortOrder
  }

  export type InviteClaimSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type InviteRmCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
  }

  export type InviteRmAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type InviteRmMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
  }

  export type InviteRmMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    sponsor_boid_id?: SortOrder
    invite_code?: SortOrder
  }

  export type InviteRmSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type LogPwrAddCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    received?: SortOrder
    from_mult_mods?: SortOrder
    diverted_to_sponsor?: SortOrder
    power_increased?: SortOrder
    orign?: SortOrder
  }

  export type LogPwrAddAvgOrderByAggregateInput = {
    sequence?: SortOrder
    received?: SortOrder
    from_mult_mods?: SortOrder
    diverted_to_sponsor?: SortOrder
    power_increased?: SortOrder
  }

  export type LogPwrAddMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    received?: SortOrder
    from_mult_mods?: SortOrder
    diverted_to_sponsor?: SortOrder
    power_increased?: SortOrder
    orign?: SortOrder
  }

  export type LogPwrAddMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    received?: SortOrder
    from_mult_mods?: SortOrder
    diverted_to_sponsor?: SortOrder
    power_increased?: SortOrder
    orign?: SortOrder
  }

  export type LogPwrAddSumOrderByAggregateInput = {
    sequence?: SortOrder
    received?: SortOrder
    from_mult_mods?: SortOrder
    diverted_to_sponsor?: SortOrder
    power_increased?: SortOrder
  }

  export type LogPwrClaimCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    power_before?: SortOrder
    power_after?: SortOrder
    power_from_mods?: SortOrder
    power_decayed?: SortOrder
    power_rounds?: SortOrder
    mint_account?: SortOrder
    mint_team?: SortOrder
    mint_team_owner?: SortOrder
    mint_overstake?: SortOrder
    mint_fundstake?: SortOrder
    mint_total?: SortOrder
  }

  export type LogPwrClaimAvgOrderByAggregateInput = {
    sequence?: SortOrder
    power_before?: SortOrder
    power_after?: SortOrder
    power_from_mods?: SortOrder
    power_decayed?: SortOrder
    power_rounds?: SortOrder
    mint_account?: SortOrder
    mint_team?: SortOrder
    mint_team_owner?: SortOrder
    mint_overstake?: SortOrder
    mint_fundstake?: SortOrder
    mint_total?: SortOrder
  }

  export type LogPwrClaimMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    power_before?: SortOrder
    power_after?: SortOrder
    power_from_mods?: SortOrder
    power_decayed?: SortOrder
    power_rounds?: SortOrder
    mint_account?: SortOrder
    mint_team?: SortOrder
    mint_team_owner?: SortOrder
    mint_overstake?: SortOrder
    mint_fundstake?: SortOrder
    mint_total?: SortOrder
  }

  export type LogPwrClaimMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    power_before?: SortOrder
    power_after?: SortOrder
    power_from_mods?: SortOrder
    power_decayed?: SortOrder
    power_rounds?: SortOrder
    mint_account?: SortOrder
    mint_team?: SortOrder
    mint_team_owner?: SortOrder
    mint_overstake?: SortOrder
    mint_fundstake?: SortOrder
    mint_total?: SortOrder
  }

  export type LogPwrClaimSumOrderByAggregateInput = {
    sequence?: SortOrder
    power_before?: SortOrder
    power_after?: SortOrder
    power_from_mods?: SortOrder
    power_decayed?: SortOrder
    power_rounds?: SortOrder
    mint_account?: SortOrder
    mint_team?: SortOrder
    mint_team_owner?: SortOrder
    mint_overstake?: SortOrder
    mint_fundstake?: SortOrder
    mint_total?: SortOrder
  }

  export type NftLockCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_id?: SortOrder
    locked_until_round?: SortOrder
  }

  export type NftLockAvgOrderByAggregateInput = {
    sequence?: SortOrder
    locked_until_round?: SortOrder
  }

  export type NftLockMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_id?: SortOrder
    locked_until_round?: SortOrder
  }

  export type NftLockMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_id?: SortOrder
    locked_until_round?: SortOrder
  }

  export type NftLockSumOrderByAggregateInput = {
    sequence?: SortOrder
    locked_until_round?: SortOrder
  }

  export type NftWithdrawCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_ids?: SortOrder
    to?: SortOrder
  }

  export type NftWithdrawAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type NftWithdrawMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_ids?: SortOrder
    to?: SortOrder
  }

  export type NftWithdrawMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    asset_ids?: SortOrder
    to?: SortOrder
  }

  export type NftWithdrawSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type NftXferCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    asset_ids?: SortOrder
  }

  export type NftXferAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type NftXferMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    asset_ids?: SortOrder
  }

  export type NftXferMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    from_boid_id?: SortOrder
    to_boid_id?: SortOrder
    asset_ids?: SortOrder
  }

  export type NftXferSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type OfferClaimCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    offer_id?: SortOrder
    required_nft_action_ids?: SortOrder
  }

  export type OfferClaimAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type OfferClaimMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    offer_id?: SortOrder
    required_nft_action_ids?: SortOrder
  }

  export type OfferClaimMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    offer_id?: SortOrder
    required_nft_action_ids?: SortOrder
  }

  export type OfferClaimSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type OwnerAddCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
  }

  export type OwnerAddAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type OwnerAddMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
  }

  export type OwnerAddMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
  }

  export type OwnerAddSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type OwnerRmCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
  }

  export type OwnerRmAvgOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type OwnerRmMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
  }

  export type OwnerRmMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    owner?: SortOrder
  }

  export type OwnerRmSumOrderByAggregateInput = {
    sequence?: SortOrder
  }

  export type PwrModAddCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    mod_id?: SortOrder
  }

  export type PwrModAddAvgOrderByAggregateInput = {
    sequence?: SortOrder
    mod_id?: SortOrder
  }

  export type PwrModAddMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    mod_id?: SortOrder
  }

  export type PwrModAddMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    mod_id?: SortOrder
  }

  export type PwrModAddSumOrderByAggregateInput = {
    sequence?: SortOrder
    mod_id?: SortOrder
  }

  export type PwrModRmCountOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    pwrmod_index?: SortOrder
  }

  export type PwrModRmAvgOrderByAggregateInput = {
    sequence?: SortOrder
    pwrmod_index?: SortOrder
  }

  export type PwrModRmMaxOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    pwrmod_index?: SortOrder
  }

  export type PwrModRmMinOrderByAggregateInput = {
    sequence?: SortOrder
    trxId?: SortOrder
    timeStamp?: SortOrder
    boid_id?: SortOrder
    pwrmod_index?: SortOrder
  }

  export type PwrModRmSumOrderByAggregateInput = {
    sequence?: SortOrder
    pwrmod_index?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringFilter | string
  }

  export type NestedDateTimeFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeFilter | Date | string
  }

  export type NestedBigIntFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntFilter | bigint | number
  }

  export type NestedStringWithAggregatesFilter = {
    equals?: string
    in?: Enumerable<string>
    notIn?: Enumerable<string>
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringWithAggregatesFilter | string
    _count?: NestedIntFilter
    _min?: NestedStringFilter
    _max?: NestedStringFilter
  }

  export type NestedIntFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntFilter | number
  }

  export type NestedDateTimeWithAggregatesFilter = {
    equals?: Date | string
    in?: Enumerable<Date> | Enumerable<string>
    notIn?: Enumerable<Date> | Enumerable<string>
    lt?: Date | string
    lte?: Date | string
    gt?: Date | string
    gte?: Date | string
    not?: NestedDateTimeWithAggregatesFilter | Date | string
    _count?: NestedIntFilter
    _min?: NestedDateTimeFilter
    _max?: NestedDateTimeFilter
  }

  export type NestedBigIntWithAggregatesFilter = {
    equals?: bigint | number
    in?: Enumerable<bigint> | Enumerable<number>
    notIn?: Enumerable<bigint> | Enumerable<number>
    lt?: bigint | number
    lte?: bigint | number
    gt?: bigint | number
    gte?: bigint | number
    not?: NestedBigIntWithAggregatesFilter | bigint | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedBigIntFilter
    _min?: NestedBigIntFilter
    _max?: NestedBigIntFilter
  }

  export type NestedFloatFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedFloatFilter | number
  }

  export type NestedStringNullableFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableFilter | string | null
  }

  export type NestedStringNullableWithAggregatesFilter = {
    equals?: string | null
    in?: Enumerable<string> | null
    notIn?: Enumerable<string> | null
    lt?: string
    lte?: string
    gt?: string
    gte?: string
    contains?: string
    startsWith?: string
    endsWith?: string
    not?: NestedStringNullableWithAggregatesFilter | string | null
    _count?: NestedIntNullableFilter
    _min?: NestedStringNullableFilter
    _max?: NestedStringNullableFilter
  }

  export type NestedIntNullableFilter = {
    equals?: number | null
    in?: Enumerable<number> | null
    notIn?: Enumerable<number> | null
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntNullableFilter | number | null
  }

  export type NestedIntWithAggregatesFilter = {
    equals?: number
    in?: Enumerable<number>
    notIn?: Enumerable<number>
    lt?: number
    lte?: number
    gt?: number
    gte?: number
    not?: NestedIntWithAggregatesFilter | number
    _count?: NestedIntFilter
    _avg?: NestedFloatFilter
    _sum?: NestedIntFilter
    _min?: NestedIntFilter
    _max?: NestedIntFilter
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}