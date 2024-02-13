/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChainCalculator, defaultConfig } from "lib/calculator/contract-util"
import { Config, UserConfig } from "lib/types/calc-types"
import { Types } from "lib/types/boid-contract-structure"
import { toObject } from "lib/utils"
import { log } from "console"

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

async function testAcct(boid_id:string, rounds:number, basePowerPerRound:number, roundLenght:number, chainCalc:ChainCalculator) {
  // Loop for the specified number of rounds
  for (let round = 0; round < rounds; round++) {
    // console.log("Round before add:", chainCalc.currentRound())

    await chainCalc.addRounds(1, roundLenght) // Advance one round
    // chainCalc.act("thisround").catch(console.error)
    // console.log("Round after add:", chainCalc.currentRound())
    // Calculate fluctuation: a random percentage between -20% and +20%
    const fluctuationPercent = (Math.random() * 40 - 20) / 100
    const powerToAdd = Math.round(basePowerPerRound + basePowerPerRound * fluctuationPercent)

    await chainCalc.act("power.add", { boid_id, power: powerToAdd }) // Add fluctuating power for the round
    // log(toObject(chainCalc.account(boid_id)))
    // Claim power after adding for all rounds
    if (round > 1) await chainCalc.act("power.claim", { boid_id })
  }
}

export async function calculator(rounds:number, basePowerPerRound:number, stake:number, userConfig:UserConfig) {
  const mergedConfig = mergeConfig(defaultConfig, userConfig)
  const chainCalc = new ChainCalculator(mergedConfig)
  await chainCalc.init(mergedConfig)
  await chainCalc.act("account.add", { boid_id: chainCalc.acc, owners: [chainCalc.acc], sponsors: [], keys: [] })
  await chainCalc.tkn.transfer({ from: "tknmint.boid", to: chainCalc.acc, quantity: `${stake.toFixed(4)} BOID`, memo: "" }).send("tknmint.boid")
  await chainCalc.tkn.transfer({ from: chainCalc.acc, to: "boid", quantity: `${stake.toFixed(4)} BOID`, memo: "deposit boid_id=testacct" }).send(chainCalc.acc)
  await chainCalc.act("stake", { boid_id: chainCalc.acc, quantity: stake })
  const roundLength = defaultConfig.time.round_length_sec
  await testAcct(chainCalc.acc, rounds, basePowerPerRound, roundLength, chainCalc)
  // chainCalc.act("thisround").catch(console.error)
  const accData = chainCalc.account(chainCalc.acc)
  console.log("Round:", chainCalc.currentRound())
  return { accData, chainCalc }
}

// :Promise<Types.Account>
//// only for testing
const userConfig = {
  power: {
    sponsor_tax_mult: 0.1,
    powered_stake_mult: 1000
  },
  mint: {
    round_powered_stake_mult: 0.0001,
    round_power_mult: 1
  }
}

const rounds = 50
const basePowerPerRound = 100
const stake = 1000


calculator(rounds, basePowerPerRound, stake, userConfig).then(
  (result) => {
    console.log("Result:", toObject(result.accData))
    console.log("Total power:", result.accData.power.rating.toNumber())
    console.log("Total stake:", result.accData.stake.self_staked.toNumber())
  }
).catch((error) => {
  console.error("An error occurred during main execution:", error)
})
