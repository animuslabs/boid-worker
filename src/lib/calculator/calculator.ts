/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { init, chain, account, acc, act, tkn, addRounds, defaultConfig } from "lib/calculator/contract-util"
import { Config, UserConfig } from "lib/types/calc-types"

//// only for testing
const userConfig = {
  power: {
    sponsor_tax_mult: 0.1,
    powered_stake_mult: 10
  },
  mint: {
    round_powered_stake_mult: 0.0001,
    round_power_mult: 1
  }
}

const rounds = 10
const basePowerPerRound = 100
const stake = 1000000
//////////////


async function testAcct(boid_id:string, rounds:number, basePowerPerRound:number, roundLenght:number) {
  // Loop for the specified number of rounds
  for (let round = 0; round < rounds; round++) {
    addRounds(1, roundLenght) // Advance one round

    // Calculate fluctuation: a random percentage between -20% and +20%
    const fluctuationPercent = (Math.random() * 40 - 20) / 100
    const powerToAdd = Math.round(basePowerPerRound + basePowerPerRound * fluctuationPercent)

    await act("power.add", { boid_id, power: powerToAdd }) // Add fluctuating power for the round
    // console.log(`Round ${round + 1}: Added ${powerToAdd} power to ${boid_id}`)
  }

  // Claim power after adding for all rounds
  await act("power.claim", { boid_id })
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


async function main(rounds:number, basePowerPerRound:number, stake:number, userConfig:UserConfig) {
  const mergedConfig = mergeConfig(defaultConfig, userConfig)
  await init(mergedConfig)
  await act("account.add", { boid_id: acc, owners: [acc], sponsors: [], keys: [] })
  await tkn.transfer!({ from: "tknmint.boid", to: acc, quantity: `${stake.toFixed(4)} BOID`, memo: "" }).send("tknmint.boid")
  await tkn.transfer!({ from: acc, to: "boid", quantity: `${stake.toFixed(4)} BOID`, memo: "deposit boid_id=testacct" }).send(acc)
  await act("stake", { boid_id: acc, quantity: stake })
  const roundLength = defaultConfig.time.round_length_sec
  await testAcct(acc, rounds, basePowerPerRound, roundLength)
  console.log("Account: ", account(acc))
  console.log("console", chain.console)
  // console.log(account(boid_id))
  // console.log(chain.actionTraces.map(el => [el.action.toString(), JSON.stringify(el.decodedData, null, 2)]))
  // console.log(chain.actionTraces.map(el => [el.action.toString()]))
  return chain.store
}



main(rounds, basePowerPerRound, stake, userConfig).catch((error) => {
  console.error("An error occurred during main execution:", error)
})

