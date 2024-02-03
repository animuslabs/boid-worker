import { API, APIClient, APIProvider, FetchProvider, Name, Action, Transaction, ActionFields, Authority, PermissionLevel, SignedTransaction, PrivateKey, NameType, AnyAction, ABI, ABISerializableConstructor } from "@wharfkit/antelope"
import fetch from "node-fetch"
import ms from "ms"
import { rand, shuffle, sleep } from "./utils"
import env from "./env"
import logger from "lib/logger"
import { caching } from "cache-manager"
const log = logger.getLogger("eosio")
let client:APIClient
let provider:APIProvider
let cache = await caching("memory", { max: 100, ttl: ms("12s") })

export const rpcs:{ endpoint:URL, rpc:typeof client.v1.chain }[] = env.endpoints.map(el => {
  provider = new FetchProvider(el.toString(), { fetch })
  client = new APIClient({ provider })
  return { endpoint: el, rpc: client.v1.chain }
})
const abiCache:Record<string, ABI.Def> = {}

export async function getAbi(contract:NameType) {
  let abi:ABI.Def|undefined = abiCache[contract.toString()]
  if (!abi) {
    abi = (await pickRpc().rpc.get_abi(contract)).abi
    if (abi) abiCache[contract.toString()] = abi
  }
  if (!abi) {
    throw new Error(`No ABI for ${contract}`)
  }
  return abi
}

export interface TransactionResponse {
  url:string
  receipt:{
    id:string;
    block_num:number;
    block_time:string;
    receipt:{
      status:string;
      cpu_usage_us:number;
      net_usage_words:number;
    };
    elapsed:number;
    net_usage:number;
    scheduled:boolean;
    action_traces:any[];
    account_ram_delta:any;
  }
}
export interface DoActionResponse {
  receipts:TransactionResponse[]
  errors:any[]
}

interface GetTableParams {
  tableName:NameType
  scope?:NameType
  contract?:NameType
}

async function errorCounter(endpoint:string, error:string) {
  log.info("error:", endpoint, error)
}

export async function safeDo(cb:string, params?:any, retry?:number):Promise<any | null> {
  if (!retry) retry = 0
  const rpc = pickRpc()
  const url = rpc.endpoint.toString()
  // log.debug("Try rpc:", url)

  try {
    const doit = async() => {
      try {
        const result = (await rpc.rpc[cb](params))
        // log.debug("Returned:", cb, result)
        return result
      } catch (error:any) {
        const errorMsg = error.toString() as string
        log.error("safeDo Error:", rpc.endpoint.toString(), errorMsg, error)
        if (cb === "get_account" && (errorMsg.search("unknown key") > -1)) {
          retry = 5
          throw (error)
        } else {
          errorCounter(url, errorMsg)
          await sleep(ms("8s"))
          throw (error)
        }
      }
    }
    const result = await Promise.race([
      doit(),
      // doit(),
      new Promise((res, reject) => setTimeout(() => reject(new Error("SafeDo Timeout:")), ms("3s")))
    ])
    // log.info('Result:', result);

    return result
  } catch (error) {
    log.error("DoRequest Error:", url)
    retry++
    log.error("RETRY", retry)
    if (retry < 5) return safeDo(cb, params, retry)
  }
}

export async function getAllScopes(params:API.v1.GetTableByScopeParams) {
  let { code, table } = params
  if (!code) code = env.contracts.power
  let lower_bound:any = null
  const rows:any[] = []
  async function loop():Promise<any> {
    const result = await safeDo("get_table_by_scope", { code, table, limit: -1, lower_bound })
    result.rows.forEach((el:any) => rows.push(el))
    log.info("scopes:", rows.length)

    if (result.more) lower_bound = result.more
    else return
    return loop()
  }
  await loop()
  return rows.map(el => el.scope) as Name[]
}
export async function sendAction(act:Action) {
  // const authorization = [PermissionLevel.from({ actor: env.worker.account, permission: env.worker.permission })]

  return doAction(act.name, act.data, act.account)
}
export async function getFullTable< T extends ABISerializableConstructor>(params:GetTableParams, type?:T):Promise<InstanceType<T>[]> {
  let code = params.contract
  const table = params.tableName
  let { scope } = params
  if (!scope) scope = code

  let lower_bound:any = null
  const rows:T[] = []
  async function loop() {
    const result = await safeDo("get_table_rows", { code, table, scope, limit: 100, lower_bound, type })
    result.rows.forEach(el => rows.push(el))
    if (result.more) lower_bound = result.next_key
    else return
    return loop()
  }
  await loop()
  return rows as InstanceType<T>[]
}

let infoCache:any
export async function getInfo():Promise<API.v1.GetInfoResponse> {
  const result = await cache.get("get_info")
  // log.debug("getinfo:", result)
  if (result) return result as API.v1.GetInfoResponse
  else {
    log.info("got info")
    const info = await safeDo("get_info")
    // log.info("got info", info)
    cache.set("get_info", info)
    return info
  }
}

export async function getAccount(name:Name):Promise<API.v1.AccountObject> {
  const result = (await safeDo("get_account", name)) as API.v1.AccountObject
  return result
}

// export function sendAction(action:AnyAction) {

// }

export async function doAction(name:NameType, data:{ [key:string]:any } = {}, contract:NameType = env.contracts.power, authorization?:PermissionLevel[], keys?:PrivateKey[], retry?:number):Promise<DoActionResponse | null> {
  if (!data) data = {}
  if (!authorization) authorization = [PermissionLevel.from({ actor: env.worker.account, permission: env.worker.permission })]
  log.debug("Do action:", name.toString(), JSON.stringify(data, null, 2))
  const info:any = await getInfo().catch(error => log.error("doAction:getInfo error", error))
  // log.debug("got info:", info.toJSON())
  const header = info.getTransactionHeader()
  let action:Action
  try {
    action = Action.from({
      authorization,
      account: contract,
      name,
      data
    })
  } catch (error) {
    // log.info(error.toString())

    let abi:ABI.Def|undefined = abiCache[contract.toString()]
    if (!abi) {
      abi = (await pickRpc().rpc.get_abi(contract)).abi
      if (abi) abiCache[contract.toString()] = abi
    }
    if (!abi) {
      throw new Error(`No ABI for ${contract}`)
    }
    action = Action.from({
      authorization,
      account: contract,
      name,
      data
    }, abi)
  }
  const transaction = Transaction.from({
    ...header,
    actions: [action]
  })
  if (!keys) keys = [env.worker.key]

  const signatures = keys.map(key => key.signDigest(transaction.signingDigest(info.chain_id)))
  const signedTransaction = SignedTransaction.from({ ...transaction, signatures })
  const receipts:TransactionResponse[] = []
  const errors:any[] = []
  let apis = shuffle(rpcs)
  if (apis.length > 3) apis = apis.slice(0, 3)
  // log.info(apis)

  const timeoutTimer = ms("15s")
  await Promise.all(apis.map(({ endpoint, rpc }) => Promise.race([
    new Promise(res => {
      rpc.push_transaction(signedTransaction).then(result => {
        receipts.push({ url: endpoint.origin, receipt: result.processed })
      }).catch(error => {
        // log.info('Error Type:', typeof error);
        errors.push({ url: endpoint.origin, error: error?.error?.details[0]?.message || JSON.stringify(error?.error, null, 2) })
      }).finally(() => res(null))
    }),
    new Promise(res => setTimeout(() => {
      errors.push({ url: endpoint.origin, error: "Timeout Error after " + (timeoutTimer / 1000) + " seconds" })
      res(null)
    }, timeoutTimer))
  ])))
  // log.info('doAction finished;', receipts, errors);
  interface UniqueErrors {
    endpoints:string[]
    error:string
  }
  const uniqueErrors:UniqueErrors[] = []
  errors.forEach(el => {
    const exists = uniqueErrors.findIndex(el2 => el2.error = el.error)
    if (exists === -1) {
      el.endpoints = [el.url]
      delete el.url
      uniqueErrors.push(el)
    } else {
      uniqueErrors[exists].endpoints.push(el.url)
    }
  })

  return { receipts, errors: uniqueErrors }
}

export function pickRpc():typeof rpcs[0] {
  const pick = rpcs[rand(0, rpcs.length - 1)]
  // log.info('pickRPC:', pick.endpoint.toString())
  return pick
}

export function pickEndpoint():string {
  const pick = rpcs[rand(0, rpcs.length - 1)]
  // log.info('pickRPC:', pick.endpoint.toString())
  return pick.endpoint.toString()
}
