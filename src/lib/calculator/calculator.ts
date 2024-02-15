/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChainCalculator, defaultConfig } from "lib/calculator/contract-util"
import { Config, UserConfig, ConfigAccount } from "lib/types/calc-types"
import { Types } from "lib/types/boid-contract-structure"
import { toObject } from "lib/utils"

function mergeConfig(defaultConfig:Config, userConfig:UserConfig):Config {
  let mergedConfig:Config = JSON.parse(JSON.stringify(defaultConfig))

  // Directly check and assign if not undefined, without iterating over keys
  if (userConfig.power !== undefined) {
    if (userConfig.power.sponsor_tax_mult !== undefined) {
      mergedConfig.power.sponsor_tax_mult = userConfig.power.sponsor_tax_mult
    }
    if (userConfig.power.powered_stake_mult !== undefined) {
      mergedConfig.power.powered_stake_mult = userConfig.power.powered_stake_mult
    }
    // Repeat for other power properties if necessary
  }

  if (userConfig.mint !== undefined) {
    if (userConfig.mint.round_powered_stake_mult !== undefined) {
      mergedConfig.mint.round_powered_stake_mult = userConfig.mint.round_powered_stake_mult
    }
    if (userConfig.mint.round_power_mult !== undefined) {
      mergedConfig.mint.round_power_mult = userConfig.mint.round_power_mult
    }
    // Repeat for other mint properties if necessary
  }

  return mergedConfig
}

export interface MintObject {
  power_mint:number;
  powered_stake_mint:number;
  account_earned:number;
  team_cut:number;
  team_owner_earned:number;
  overstake_mint:number;
  total:number;
}

function accumulateMintObjects(objects:any[]):MintObject {
  return objects.reduce((accumulator, current) => {
    return {
      power_mint: accumulator.power_mint + current.power_mint,
      powered_stake_mint: accumulator.powered_stake_mint + current.powered_stake_mint,
      account_earned: accumulator.account_earned + current.account_earned,
      team_cut: accumulator.team_cut + current.team_cut,
      team_owner_earned: accumulator.team_owner_earned + current.team_owner_earned,
      overstake_mint: accumulator.overstake_mint + current.overstake_mint,
      total: accumulator.total + current.total
    }
  }, {
    power_mint: 0,
    powered_stake_mint: 0,
    account_earned: 0,
    team_cut: 0,
    team_owner_earned: 0,
    overstake_mint: 0,
    total: 0
  })
}

async function testAcct(boid_id:string, rounds:number, basePowerPerRound:number, roundLenght:number, chainCalc:ChainCalculator, liveSim:boolean = false) {
  let mintObjects:MintObject[] = []
  // Loop for the specified number of rounds
  for (let round = 0; round < rounds; round++) {
    await chainCalc.addRounds(1, roundLenght) // Advance one round
    let powerToAdd = basePowerPerRound
    // Calculate fluctuation: a random percentage between -20% and +20%
    if (liveSim == true) {    
      const fluctuationPercent = (Math.random() * 40 - 20) / 100
      powerToAdd = Math.round(basePowerPerRound + basePowerPerRound * fluctuationPercent) 
    }

    await chainCalc.act("power.add", { boid_id, power: powerToAdd }) // Add fluctuating power for the round
    // log(toObject(chainCalc.account(boid_id)))
    // Claim power after adding for all rounds
    if (round > 1) await chainCalc.act("power.claim", { boid_id })
    const traceAction = chainCalc.chain.actionTraces.map((action) => action.decodedData)[2]
    let mintAction = null
    if (traceAction) mintAction = toObject(traceAction as any).mint
    if (mintAction) mintObjects.push(mintAction)
  }
  const accumulatedMint = accumulateMintObjects(mintObjects)
  console.log("Accumulated Mint: ", accumulatedMint)
  return accumulatedMint
}

async function calculator(rounds:number, basePowerPerRound:number, stake:number, userConfig:UserConfig, liveSim:boolean, activeSponsor:boolean, configAccount:ConfigAccount) {
  const mergedConfig = mergeConfig(defaultConfig, userConfig)
  const chainCalc = new ChainCalculator(mergedConfig, configAccount)
  await chainCalc.init(mergedConfig, configAccount)
  
  // Conditional parameters based on activeSponsor flag
  const accountAddParams = activeSponsor 
    ? { boid_id: chainCalc.acc, owners: [], sponsors: ["sponsoracct"], keys: [] }
    : { boid_id: chainCalc.acc, owners: [chainCalc.acc], sponsors: [], keys: [] }

  await chainCalc.act("account.add", accountAddParams)
  await chainCalc.tkn.transfer({ from: "tknmint.boid", to: chainCalc.acc, quantity: `${stake.toFixed(4)} BOID`, memo: "" }).send("tknmint.boid")
  await chainCalc.tkn.transfer({ from: chainCalc.acc, to: "boid", quantity: `${stake.toFixed(4)} BOID`, memo: "deposit boid_id=testacct" }).send(chainCalc.acc)
  await chainCalc.act("stake", { boid_id: chainCalc.acc, quantity: stake })
  const roundLength = defaultConfig.time.round_length_sec
  const accumulatedMint = await testAcct(chainCalc.acc, rounds, basePowerPerRound, roundLength, chainCalc, liveSim)
  return { chainCalc, accumulatedMint }
}

export async function accountCalculator(rounds:number, basePowerPerRound:number, stake:number, userConfig:UserConfig, liveSim:boolean, activeSponsor:boolean, configAccount:ConfigAccount) {
  const result = await calculator(rounds, basePowerPerRound, stake, userConfig, liveSim, activeSponsor, configAccount)
  return { acc: result.chainCalc.account(result.chainCalc.acc), accumulated: result.accumulatedMint }
}

//-------------------------------------------------------------------------------
// only for testing
// const userConfig = {
//   power: {
//     sponsor_tax_mult: 0.1,
//     powered_stake_mult: 1000
//   },
//   mint: {
//     round_powered_stake_mult: 0.0001,
//     round_power_mult: 1
//   }
// }

// const rounds = 500
// const basePowerPerRound = 1000
// const stake = 100000000
// const liveSim = true
// const activeSponsor = true
// const configAccount = { min_pwr_tax_mult: 50 }

// accountCalculator(rounds, basePowerPerRound, stake, userConfig, liveSim, activeSponsor, configAccount).then(
//   (result) => {
//     console.log("Result:", toObject(result))
//   }
// ).catch((error) => {
//   console.error("An error occurred during main execution:", error)
// })
