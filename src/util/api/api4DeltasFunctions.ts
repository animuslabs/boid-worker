import db from "lib/db"
import { RequestQueryParams, AccountsDeltaData, PwrClaimData, AccountResponse, RequestParams, GlobalDeltaResponse, FahDataResponse, FahDataResTimeStamp, CombinedResponse } from "./api4DeltasTypes"

// get a list of boidids from the db
export async function getBoidIDs():Promise<string[]> {
  const boidIDs = await db.boidAccount.findMany({
    select: {
      boidId: true
    }
  })
  return boidIDs.map((boidAcc) => boidAcc.boidId)
}

// returns an array of |timeStamp|boid_id|balance|selfStaked|power|receivedDelegatedStake| that is takes from accountsDelta table from the db | this shows entries for chosen boid_id
// quite detailed data
export async function getAllAccountsDeltas(queryParams:RequestQueryParams):Promise<AccountsDeltaData[]> {
  const accountsDelta = await db.accountsDelta.findMany({
    where: {
      boid_id: queryParams.boid_id ? { equals: queryParams.boid_id } : undefined,
      timeStamp: {
        gte: queryParams.from,
        lte: queryParams.to
      }
    },
    select: {
      timeStamp: true,
      boid_id: true,
      balance: true,
      selfStaked: true,
      power: true,
      receivedDelegatedStake: true
    }
  })

  return accountsDelta.map((account) => ({
    timeStamp: account.timeStamp,
    boid_id: account.boid_id,
    balance: Number(account.balance),
    selfStaked: Number(account.selfStaked),
    power: Number(account.power),
    receivedDelegatedStake: Number(account.receivedDelegatedStake)
  }))
}

// returns an array of |timestamp|boid_id|power_before|power_after|power_decayed|mint_total that is takes from logPwrClaim table from the db | this shows entries for chosen boid_id
export async function getLogPwrClaimData(queryParams:RequestQueryParams):Promise<PwrClaimData[]> {    
  const logPwrClaim = await db.logPwrClaim.findMany({
    where: {
      boid_id: queryParams.boid_id ? { equals: queryParams.boid_id } : undefined,
      timeStamp: {
        gte: queryParams.from,
        lte: queryParams.to
      }
    },
    select: {
      timeStamp: true,
      boid_id: true,
      power_before: true,
      power_after: true,
      power_from_boosters: true,
      mint_account_earned: true,
      mint_total: true,
      mint_overstake_mint: true,
      mint_power_mint: true,
      mint_powered_stake_mint: true,
      mint_team_cut: true,
      mint_team_owner_earned: true
    }
  })
  return logPwrClaim.map((data) => ({
    timeStamp: data.timeStamp,
    boid_id: data.boid_id,
    power_before: Number(data.power_before),
    power_after: Number(data.power_after),
    power_from_boosters: Number(data.power_from_boosters),
    mint_account_earned: Number(data.mint_account_earned),
    mint_total: Number(data.mint_total),
    mint_overstake_mint: Number(data.mint_overstake_mint),
    mint_power_mint: Number(data.mint_power_mint),
    mint_powered_stake_mint: Number(data.mint_powered_stake_mint),
    mint_team_cut: Number(data.mint_team_cut),
    mint_team_owner_earned: Number(data.mint_team_owner_earned)
  }))
}

// returns an array of |timeStamp|total_accounts|total_power|total_liquid_balance|total_stake| that it takes from GlobalDelta table from the db |
// this shows last entry for each day
export async function getGlobalDeltaData(queryParams:RequestParams):Promise<GlobalDeltaResponse[]> {
  try {
    const from = Math.floor(new Date(queryParams.from).getTime() / 1000)
    const to = Math.floor(new Date(queryParams.to).getTime() / 1000) 
    const globalDeltas = await db.$queryRaw<GlobalDeltaResponse[]>`
    SELECT gd.id, gd."timeStamp", gd.total_power
    FROM public."GlobalDelta" gd
    JOIN (
      SELECT date_trunc('day', "timeStamp") AS day, MAX("timeStamp") AS max_time
      FROM public."GlobalDelta"
      WHERE "timeStamp" BETWEEN to_timestamp(${from}) AND to_timestamp(${to})
      GROUP BY day
    ) sub ON gd."timeStamp" = sub.max_time
    ORDER BY gd."timeStamp";
  ` 
    const result:GlobalDeltaResponse[] = globalDeltas.map((delta) => ({
      timeStamp: delta.timeStamp,
      total_power: delta.total_power.toString()
    }))

    console.log("Result length:", result.length)
    return result
  } catch (error) {
    console.error("Error fetching GlobalDelta data:", error)
    throw error
  }
}

// returns an array of |date|boid_id|staked|power|balance| that is takes from accountsTable from the db | this shows entries for chosen boid_id
// shows an average of the day where it takes first and last entry of the day and averages them
async function getAccountData(queryParams:RequestQueryParams):Promise<AccountResponse[]> {
  try {
    const from = Math.floor(new Date(queryParams.from).getTime() / 1000)
    const to = Math.floor(new Date(queryParams.to).getTime() / 1000)

    const accounts = await db.$queryRaw<AccountResponse[]>`
      WITH start_end_entries AS (
        SELECT at.id, at."timeStamp", at.boid_id, at.staked, at.power, at.balance,
               ROW_NUMBER() OVER (PARTITION BY date_trunc('day', at."timeStamp") ORDER BY at."timeStamp") AS row_start,
               ROW_NUMBER() OVER (PARTITION BY date_trunc('day', at."timeStamp") ORDER BY at."timeStamp" DESC) AS row_end
        FROM public."AccountsTable" at
        WHERE at.boid_id = ${queryParams.boid_id} AND "timeStamp" BETWEEN to_timestamp(${from}) AND to_timestamp(${to})
      ),
      selected_entries AS (
        SELECT *
        FROM start_end_entries
        WHERE row_start = 1 OR row_end = 1
      )
      SELECT date_trunc('day', "timeStamp") AS date,
             boid_id,
             ROUND(AVG(staked)) AS staked,
             ROUND(AVG(power)) AS power,
             ROUND(AVG(balance)) AS balance
      FROM selected_entries
      GROUP BY date, boid_id
      ORDER BY date;
    `

    return accounts.map((account) => ({
      date: account.date,
      boid_id: account.boid_id,
      staked: account.staked,
      power: account.power,
      balance: account.balance
    }))
  } catch (error) {
    console.error("Error fetching account data:", error)
    throw error
  }
}

// returns an array of |time|name|score| that it takes from FahData table from the db |
// this shows entries for chosen name = boid_id | it shows the max score for each day
async function getFahData(queryParams:RequestQueryParams):Promise<FahDataResTimeStamp[]> {
  try {
    const from = Math.floor(new Date(queryParams.from).getTime() / 1000)
    const to = Math.floor(new Date(queryParams.to).getTime() / 1000)
    const fahData = await db.$queryRaw<FahDataResponse[]>`
      SELECT date_trunc('day', "time") AS day, MAX(score) AS max_score, MAX(wus) AS max_wus
      FROM public."FahData"
      WHERE "time" BETWEEN to_timestamp(${from}) AND to_timestamp(${to}) AND name = ${queryParams.boid_id}
      GROUP BY day
      ORDER BY day ASC
    `
    const result:FahDataResTimeStamp[] = fahData.map((data:any) => ({
      timeStamp: data.day,
      boid_id: queryParams.boid_id || "",
      score: data.max_score
    }))
    // console.log("Result: ", result)
    return result
  } catch (error) {
    console.error("Error fetching FahData:", error)
    throw error
  }
}


// returns an array of |date|boid_id|staked|power|balance|score| that is takes from accountsTable and FahData table from the db |
// returns one entry for each day
export async function getCombinedData(queryParams:RequestQueryParams):Promise<CombinedResponse[]> {
  try {
    const accountData = await getAccountData(queryParams)
    const fahData = await getFahData(queryParams)

    const combinedData:CombinedResponse[] = accountData.map((account) => {
      const matchingFah = fahData.find((fah) => {
        return (
          account.boid_id === fah.boid_id &&
          new Date(account.date).toLocaleDateString() ===
            new Date(fah.timeStamp).toLocaleDateString()
        )
      })

      return {
        ...account,
        score: matchingFah ? matchingFah.score.toString() : "0"
      }
    })

    // console.log("Combined Data: ", combinedData)
    return combinedData
  } catch (error) {
    console.error("Error fetching combined data:", error)
    throw error
  }
}



const queryParams:RequestQueryParams = {
  boid_id: "seth.voice",
  from: new Date("2023-04-25T00:00:00.000Z"),
  to: new Date("2023-04-29T00:00:00.000Z")
}

// console.log(await getCombinedData(queryParams))
// console.log(await getBoidIDs())
// console.log(await getAllAccountsDeltas(queryParams))
// console.log(await getLogPwrClaimData(queryParams))
// console.log(await getAccountData(queryParams))
// console.log(await getGlobalDeltaData(queryParams))
// console.log(await getFahData(queryParams))
