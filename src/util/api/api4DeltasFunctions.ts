import db from "lib/db"
import { RequestQueryParams, AccountsDeltaData, MintData, MintTotalByDate, AccountResponse, RequestParams, GlobalDeltaResponse } from "./api4DeltasTypes"

export async function getDeltasBoidID(boid_id:string, fromDate:Date, toDate:Date):Promise<AccountsDeltaData[]> {
  const accountsDelta = await db.accountsDelta.findMany({
    where: {
      boid_id,
      timeStamp: {
        gte: fromDate,
        lte: toDate
      }
    },
    select: {
      timeStamp: true,
      boid_id: true,
      power: true
    }
  })
  //   console.log("accountsDelta", accountsDelta)
  return accountsDelta.map((account) => ({
    timeStamp: account.timeStamp,
    boid_id: account.boid_id,
    power: Number(account.power)
  }))
}
    
export async function getAllDeltas(fromDate:Date, toDate:Date):Promise<AccountsDeltaData[]> {
  const accountsDelta = await db.accountsDelta.findMany({
    where: {
      timeStamp: {
        gte: fromDate,
        lte: toDate
      }
    },
    select: {
      timeStamp: true,
      boid_id: true,
      power: true
    }
  })
    
  return accountsDelta.map((account) => ({
    timeStamp: account.timeStamp,
    boid_id: account.boid_id,
    power: Number(account.power)
  }))
}

export async function getLogPwrClaimData(queryParams?:RequestQueryParams):Promise<MintData> {
  const fromDate = queryParams?.from ? new Date(queryParams.from) : new Date(0) // default from date is epoch start
  console.log("fromDate", fromDate)
  const toDate = queryParams?.to ? new Date(queryParams.to) : new Date() // default to date is today
  toDate.setHours(23, 59, 59, 999)
  console.log("toDate", toDate)
  const boid_id = queryParams?.boid_id ? queryParams.boid_id : undefined // get the boidId filter value or undefined if not provided
  console.log("boidId", boid_id)
    
  const logPwrClaim = await db.logPwrClaim.findMany({
    where: {
      boid_id: boid_id ? { equals: boid_id } : undefined,
      timeStamp: {
        gte: fromDate,
        lte: toDate
      }
    },
    select: {
      timeStamp: true,
      boid_id: true,
      mint_total: true
    }
  })
    
  const mintTotalsByDate:MintTotalByDate[] = []
  let totalMinted = 0
    
  logPwrClaim.forEach((data) => {
    const date = data.timeStamp.toISOString().substring(0, 10)
    
    const existing = mintTotalsByDate.find((x) => x.date === date)
    if (existing) {
      existing.total += data.mint_total
    } else {
      mintTotalsByDate.push({ date, total: data.mint_total })
    }
    
    totalMinted += data.mint_total
  })
    
  return { boid_id, perDay: mintTotalsByDate, total: totalMinted }
}

export async function getAccountData(queryParams?:RequestQueryParams):Promise<AccountResponse[]> {
  try {
    const fromDate = queryParams?.from ? new Date(queryParams.from) : new Date(0) // default from date is epoch start
    console.log("fromDate", fromDate)
    const toDate = queryParams?.to ? new Date(queryParams.to) : new Date() // default to date is today
    toDate.setHours(23, 59, 59, 999)
    console.log("toDate", toDate)
    const boidId = queryParams?.boid_id ? queryParams.boid_id : undefined // get the boidId filter value or undefined if not provided
    console.log("boidId", boidId)
    const accounts = await db.accountsTable.findMany({
      where: {
        timeStamp: {
          gte: fromDate,
          lte: toDate
        },
        boid_id: boidId ? { equals: boidId } : undefined
      }
    })
    return accounts.map((account) => ({
      date: account.timeStamp,
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

export async function getGlobalDeltaData(queryParams?:RequestParams):Promise<GlobalDeltaResponse[]> {
  try {
    const fromDate = queryParams?.from ? new Date(queryParams.from) : new Date(0)
    const toDate = queryParams?.to ? new Date(queryParams.to) : new Date()
    toDate.setHours(23, 59, 59, 999)

    const globalDeltas = await db.$queryRaw<GlobalDeltaResponse[]>`
  SELECT gd.id, gd."timeStamp", gd.total_accounts, gd.total_power, gd.total_liquid_balance, gd.total_stake
  FROM public."GlobalDelta" gd
  JOIN (
    SELECT date_trunc('day', "timeStamp") as day,
           min("timeStamp") as start_time,
           max("timeStamp") as end_time
    FROM public."GlobalDelta"
    WHERE "timeStamp" BETWEEN to_timestamp(${fromDate.getTime() / 1000}) AND to_timestamp(${toDate.getTime() / 1000})
    GROUP BY day
  ) d ON gd."timeStamp" = d.start_time OR gd."timeStamp" = d.end_time
  ORDER BY gd."timeStamp"
`

    const result:GlobalDeltaResponse[] = globalDeltas.map((delta) => ({
      timeStamp: delta.timeStamp,
      total_accounts: delta.total_accounts.toString(),
      total_power: delta.total_power.toString(),
      total_liquid_balance: delta.total_liquid_balance.toString(),
      total_stake: delta.total_stake.toString()
    }))

    console.log("Result length:", result.length)
    return result
  } catch (error) {
    console.error("Error fetching GlobalDelta data:", error)
    throw error
  }
}
