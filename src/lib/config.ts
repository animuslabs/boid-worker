import dotenv from "dotenv"
import fs from "fs-extra"
import { Name, NameType, PrivateKey } from "@wharfkit/antelope"

dotenv.config()
const chains = ["eos", "kylin", "jungle", "wax", "waxTest", "telos", "telosTest"] as const
export type ChainsType = typeof chains[number]
export function throwErr(msg:string):never {
  throw new Error(msg)
}
interface eosioConfig {
  chain:ChainsType
  endpoints:URL[],

  worker:{
    account:NameType
    permission:NameType
    key:PrivateKey
  }
  contracts:{
    power:NameType
    system:NameType
    token:NameType
    evmBridge:NameType
  }
  ipfs?:any,
  proxy?:{
    maintainerEmail:string,
    proxies:Array<{external:string[], internal:string[]}>
  }, relayer?:{
    port:number
  },
  dburl:string,
  history?:{
    hyperion:string[],
    injestChunkSize:number,
    keepHistoryDataDays:number,
    injestLoopDelaySec:number,
    port:number
  },
  historyDeltasAPI?:{
    port:number
  },
  evm?:{
    endpoint:string,
    chainId:string,
    evmTokenBridge:string
  }
}
type eosioConfigs = { [k in ChainsType]?:eosioConfig }
interface envType {
  default:ChainsType
  chain:eosioConfigs
}
let cachedConfig:eosioConfig|undefined
export default function getConfig(chain?:ChainsType):eosioConfig {
  if (cachedConfig) return cachedConfig
  // console.log("+++getConfig+++")
  let useChain = chain || process.env.CHAIN
  const readEnv:envType = fs.readJSONSync("../.env.json")
  // log("readEnv", readEnv)
  if (!useChain) useChain = readEnv.default
  if (!chains.includes(useChain as ChainsType)) throwErr("CHAIN not recognized: " + useChain)
  const untyped = readEnv.chain[useChain]
  const typed:eosioConfig = {
    chain: useChain as ChainsType,
    endpoints: untyped.endpoints.map(el => new URL(el)),
    worker: {
      account: Name.from(untyped.worker.account),
      permission: Name.from(untyped.worker.permission),
      key: PrivateKey.from(untyped.worker.key)
    },
    contracts: {
      power: Name.from(untyped.contracts.power),
      system: Name.from(untyped.contracts.system),
      token: Name.from(untyped.contracts.token),
      evmBridge: Name.from(untyped.contracts.evmBridge)
    },
    ipfs: untyped.ipfs,
    proxy: untyped.proxy
      ? {
          maintainerEmail: untyped.proxy.maintainerEmail,
          proxies: untyped.proxy.proxies
        }
      : undefined,
    relayer: untyped.relayer
      ? {
          port: untyped.relayer.port
        }
      : undefined,
    dburl: untyped.dburl,
    history: untyped.history
      ? {
          hyperion: untyped.history.hyperion,
          injestChunkSize: untyped.history.injestChunkSize,
          keepHistoryDataDays: untyped.history.keepHistoryDataDays,
          injestLoopDelaySec: untyped.history.injestLoopDelaySec,
          port: untyped.history.port
        }
      : undefined,
    historyDeltasAPI: untyped.historyDeltasAPI
      ? {
          port: untyped.historyDeltasAPI.port
        }
      : undefined,
    evm: untyped.evm
      ? {
          endpoint: untyped.evm.endpoint,
          chainId: untyped.evm.chainId,
          evmTokenBridge: untyped.evm.evmTokenBridge
        }
      : undefined
  }
  cachedConfig = typed
  return typed
}
export function test() {
  console.log("calledConfigTest")
}
