import * as dotenv from "dotenv"
import t from "servers/trpc"
import cors from "cors"
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import express from "express"
import { z } from "zod"
import { getAllAccountsDeltas, getBoidIDs, getLogPwrClaimData, getCombinedData, getGlobalDeltaData } from "./api4DeltasFunctions"
import { RequestQueryParams } from "./api4DeltasTypes"
import { accountCalculator } from "lib/calculator/calculator"
import { aggregateBoidData } from "lib/calculator/antelope"
import { toObject } from "lib/utils"
import { calculateAveragesAndTotal } from "lib/calculator/userAverage"

process.env.TZ = "Etc/UTC"
dotenv.config()

const apiport = process.env.TRPC_API_PORT
const app = express()
app.use(cors())
app.use(express.json())
const publicProcedure = t.procedure

const inputSchema = z.object({
  from: z.string(),
  to: z.string()
})

const extInputSchema = inputSchema.extend({
  boid_id: z.string().optional()
})

const calculatedDataInputSchema = z.object({
  rounds: z.number(),
  basePowerPerRound: z.number(),
  stake: z.number(),
  userConfig: z.object({
    power: z.object({
      sponsor_tax_mult: z.number(),
      powered_stake_mult: z.number()
    }),
    mint: z.object({
      round_powered_stake_mult: z.number(),
      round_power_mult: z.number()
    })
  }),
  liveSim: z.boolean(),
  activeSponsor: z.boolean(),
  configAccount: z.object({
    min_pwr_tax_mult: z.number()
  })
})

/* *** API Routes *** */
const appRouter = t.router({
  /* *** Provides a list of all Boid IDs *** */
  BoidIDlist: publicProcedure
    .query(async(input) => {  
      if (input) {
        const allBoidIDs = await getBoidIDs()
        return allBoidIDs
      } else {
        throw new Error("There was an issue with getting the data")
      }
    }),
  /* *** GetDeltasBoidID provides an array of |timeStamp|boid_id|balance|selfStaked|power|receivedDelegatedStake| that it takes from accountsDelta table from the db | this shows only entries for one boid_id *** */
  GetDeltasBoidID: publicProcedure
    .input(extInputSchema)
    .query(async(input) => {
      const from = new Date(input.input.from)
      const to = new Date(input.input.to)
      const boid_id = input.input.boid_id as string
      const queryParams:RequestQueryParams = { boid_id, from, to }
      if (from && !isNaN(from.valueOf()) && to && !isNaN(to.valueOf())) {
        const deltasBoidID = boid_id ? await getAllAccountsDeltas(queryParams) : await getAllAccountsDeltas(queryParams)
        return deltasBoidID
      } else {
        throw new Error("Invalid date range or boid_id")
      }
    }),
  /* *** GetLogPwrClaim provides an array of |timestamp|boid_id|power_before|power_after|power_decayed|mint_total| that it takes from logPwrClaim table from the db | this shows only entries for one boid_id *** */
  GetLogPwrClaim: publicProcedure
    .input(extInputSchema)
    .query(async(input) => {
      const from = new Date(input.input.from)
      const to = new Date(input.input.to)
      const boid_id = input.input.boid_id as string
      const queryParams:RequestQueryParams = { boid_id, from, to }
      if (from && !isNaN(from.valueOf()) && to && !isNaN(to.valueOf())) {
        const pwrClaimArray = boid_id ? await getLogPwrClaimData(queryParams) : await getLogPwrClaimData(queryParams)
        return pwrClaimArray
      } else {
        throw new Error("Invalid date range or boid_id")
      }
    }),
  /* *** GetCombinedData provides an array of |date|boid_id|staked|power|balance|score| that is takes from accountsTable and FahData table from the db | this shows only entries for one boid_id *** */
  GetCombinedData: publicProcedure
    .input(extInputSchema)
    .query(async(input) => {
      const from = new Date(input.input.from)
      const to = new Date(input.input.to)
      const boid_id = input.input.boid_id as string
      const queryParams:RequestQueryParams = { boid_id, from, to }
      if (from && !isNaN(from.valueOf()) && to && !isNaN(to.valueOf())) {
        const pwrClaimArray = boid_id ? await getCombinedData(queryParams) : await getCombinedData(queryParams)
        return pwrClaimArray
      } else {
        throw new Error("Invalid date range or boid_id")
      }
    }),
  /* *** GetGlobalDeltas provides an array of |timeStamp|total_accounts|total_power|total_liquid_balance|total_stake| that is takes from GlobalDelta from the db | this shows global entries *** */
  GetGlobalDeltas: publicProcedure
    .input(extInputSchema)
    .query(async(input) => {
      const from = new Date(input.input.from)
      const to = new Date(input.input.to)
      const boid_id = input.input.boid_id as string
      const queryParams:RequestQueryParams = { boid_id, from, to }
      if (from && !isNaN(from.valueOf()) && to && !isNaN(to.valueOf())) {
        const pwrClaimArray = boid_id ? await getGlobalDeltaData(queryParams) : await getGlobalDeltaData(queryParams)
        return pwrClaimArray
      } else {
        throw new Error("Invalid date range or boid_id")
      }
    }),
  /* *** GetCalculatedData provides an account object that simulates accounts earnings based on input *** */
  GetCalculatedData: publicProcedure
    .input(calculatedDataInputSchema)
    .query(async(input) => {
      const calculatedData = await accountCalculator(input.input.rounds, input.input.basePowerPerRound, input.input.stake, input.input.userConfig, input.input.liveSim, input.input.activeSponsor, input.input.configAccount)
      return toObject(calculatedData)
    }),
  /* *** GetBOIDtokenInfo provides data from chain for the BOID token *** */
  GetBOIDtokenInfo: publicProcedure
    .query(async() => {
      const tokenInfo = await aggregateBoidData()
      const avTotals = await calculateAveragesAndTotal()
      return { tokenInfo, avTotals }
    })
})

export type AppRouter = typeof appRouter

// Handle incoming tRPC requests
app.use("/api/", createExpressMiddleware({ router: appRouter }))  
app.listen(apiport, () => {
  console.log("Server listening on port " + apiport + "...")
})
