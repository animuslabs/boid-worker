import { APIClient } from "@wharfkit/antelope"
import { ContractKit } from "@wharfkit/contract"
import { toObject } from "lib/utils"
import { BoidData } from "lib/types/calc-types"

const endpoints:string[][] = [
  ["EOS Endpoint", "https://eos.api.animus.is"],
  ["Telos Endpoint", "https://telos.api.animus.is"],
  ["Telos Testnet Endpoint", "https://telos.testnet.boid.animus.is"]
]

const eosClientAPI = new APIClient({ url: endpoints[0][1] })
const contractKitEOS = new ContractKit({ client: eosClientAPI })
const contractBOIDonEOS = await contractKitEOS.load("boidcomtoken")

const telosClientAPI = new APIClient({ url: endpoints[1][1] })
const contractKitTelos = new ContractKit({ client: telosClientAPI })
const contractBOIDonTelos = await contractKitTelos.load("token.boid")

export async function aggregateBoidData():Promise<BoidData> {
  // Fetch locked and staked BOID data
  const lockedBOIDonEOSibc = await contractBOIDonEOS.table("accounts", "wl.tlos.boid").get()
  const liquidBOIDonDefibox = await contractBOIDonEOS.table("accounts", "swap.defi").get()
  const stakedBOIDonTelos = await contractBOIDonTelos.table("accounts", "stake.boid").get()
  const liquidBOIDonAlcor = await contractBOIDonTelos.table("accounts", "swap.alcor").get()
  const burnedBOID = await contractBOIDonTelos.table("accounts", "burn.boid").get()
  const mintAcconTelos = await contractBOIDonTelos.table("accounts", "tknmint.boid").get()
  const boidEosSupply = await eosClientAPI.v1.chain.get_currency_stats("boidcomtoken", "BOID")
  const boidTlosSupply = await telosClientAPI.v1.chain.get_currency_stats("token.boid", "BOID")

  // Aggregate data into one object
  const aggregatedData:BoidData = {
    locked_BOID_EOS_IBC: toObject(lockedBOIDonEOSibc).balance,
    mint_BOID_Telos: toObject(mintAcconTelos).balance,
    burned_BOID_Telos: toObject(burnedBOID).balance,
    staked_BOID_Telos: toObject(stakedBOIDonTelos).balance,
    liquid_BOID_AlcorTelos: toObject(liquidBOIDonAlcor).balance,
    liquid_BOID_DefiboxEOS: toObject(liquidBOIDonDefibox).balance,
    boid_EOS_supply: toObject(boidEosSupply).BOID.supply,
    boid_TLOS_supply: toObject(boidTlosSupply).BOID.supply,
    boid_max_total_supply: toObject(boidEosSupply).BOID.max_supply
  }
  
  return aggregatedData
}
