/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { chain, init, account, acc, act, tkn, addRounds, defaultConfig } from "lib/calculator/contract-util"
import { Config, UserConfig } from "lib/types/calc-types"
import { Types } from "lib/types/boid-contract-structure"
import { currentRound, sleep } from "lib/utils"

async function testAcct(boid_id:string, rounds:number, basePowerPerRound:number, roundLenght:number) {
  // Loop for the specified number of rounds
  for (let round = 0; round < rounds; round++) {
    console.log("Round before add:", await currentRound())
    addRounds(1, roundLenght) // Advance one round
    console.log("Round after add:", await currentRound())
    // Calculate fluctuation: a random percentage between -20% and +20%
    const fluctuationPercent = (Math.random() * 40 - 20) / 100
    const powerToAdd = Math.round(basePowerPerRound + basePowerPerRound * fluctuationPercent)

    await act("power.add", { boid_id, power: powerToAdd }) // Add fluctuating power for the round
    // console.log(`Round ${round + 1}: Added ${powerToAdd} power to ${boid_id}`)

    
    // Claim power after adding for all rounds
    // await act("power.claim", { boid_id })
  }
}

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


export async function calculator(rounds:number, basePowerPerRound:number, stake:number, userConfig:UserConfig):Promise<Types.Account> {
  const mergedConfig = mergeConfig(defaultConfig, userConfig)
  chain.resetTables()
  await init(mergedConfig)
  await act("account.add", { boid_id: acc, owners: [acc], sponsors: [], keys: [] })
  await tkn.transfer!({ from: "tknmint.boid", to: acc, quantity: `${stake.toFixed(4)} BOID`, memo: "" }).send("tknmint.boid")
  await tkn.transfer!({ from: acc, to: "boid", quantity: `${stake.toFixed(4)} BOID`, memo: "deposit boid_id=testacct" }).send(acc)
  await act("stake", { boid_id: acc, quantity: stake })
  const roundLength = defaultConfig.time.round_length_sec
  await testAcct(acc, rounds, basePowerPerRound, roundLength)

  const accData = account(acc)
  console.log("Round:", await currentRound())
  return accData
  process.exit(0)
}


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

const rounds = 500
const basePowerPerRound = 100
const stake = 1000000


calculator(rounds, basePowerPerRound, stake, userConfig).then(
  (result) => {
    // console.log("Result:", result)
    console.log("Total power:", result.power.rating.toNumber())
    console.log("Total stake:", result.stake.self_staked.toNumber())
    console.log
  }
).catch((error) => {
  console.error("An error occurred during main execution:", error)
})
