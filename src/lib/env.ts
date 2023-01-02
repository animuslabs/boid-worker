import dotenv from "dotenv"
import fs from "fs-extra"
import { Name, NameType, PrivateKey } from "@greymass/eosio"
import { Options } from "ipfs-http-client"
dotenv.config()

type chains = "eos" | "kylin" | "jungle" | "wax" | "waxTest" | "telos" | "telosTest"
interface eosioConfig {
  chain:string
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
  }
  ipfs?:Options,
  proxy?:{
    maintainerEmail:string,
    proxies:Array<{external:string[], internal:string[]}>
  }, relayer?:{
    port:number
  },
  history?:{
    hyperion:string[],
    injestChunkSize:number,
    keepHistoryDataDays:number,
    injestLoopDelaySec:number,
    port:number
  }
}
type eosioConfigs = { [k in chains]?:eosioConfig }
interface envType {
  default:chains
  chain:eosioConfigs
}

const readEnv:envType = fs.readJSONSync("../.env.json")
// console.log("readENV", readEnv)
let useChain = process.env.CHAIN
if (!useChain) useChain = readEnv.default
// console.log(useChain)

const untyped = readEnv.chain[useChain]
const typed:eosioConfig = {
  chain: useChain,
  endpoints: untyped.endpoints.map(el => new URL(el)),
  worker: {
    account: Name.from(untyped.worker.account),
    permission: Name.from(untyped.worker.permission),
    key: PrivateKey.from(untyped.worker.key)
  },
  contracts: {
    power: Name.from(untyped.contracts.power),
    system: Name.from(untyped.contracts.system),
    token: Name.from(untyped.contracts.token)
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
  history: untyped.history
    ? {
        hyperion: untyped.history.hyperion,
        injestChunkSize: untyped.history.injestChunkSize,
        keepHistoryDataDays: untyped.history.keepHistoryDataDays,
        injestLoopDelaySec: untyped.history.injestLoopDelaySec,
        port: untyped.history.port
      }
    : undefined
}
const config:eosioConfig = typed
export default config
