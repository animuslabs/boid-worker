// TESTING TRPC CLIENT ONLY
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import { ReqQueryReport, ReqQueryOracle, RequestQueryParams } from "./api4DeltasTypes"
import type { AppRouter } from "./trpcAPI"

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/"
      // url: "http://192.168.0.44:3000/api/"
      // url: "http://192.168.0.126:3000/api/"
    })
  ]
})

// async function fetchAllBoidIDs():Promise<void> {
//   try {
//     const data = await trpc.BoidIDlist.query(undefined)
//     console.log("All Boid IDs:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }

// fetchAllBoidIDs().catch(error => console.error("Error in fetchAllBoidIDs:", error))


// async function fetchperBoidID(boid_id) {
//   const fromDate = "2023-10-28T00:00:00.000Z"
//   const toDate = "2023-10-31T23:59:59.000Z"
  
//   try {
//     const queryParameters:any = { from: fromDate, to: toDate }
//     if (boid_id) {
//       queryParameters.boid_id = boid_id
//     }
//     const data = await trpc.GetDeltasBoidID.query(queryParameters)
//     console.log("All Deltas:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }  


// async function fetchCombinedData(boid_id) {
//   const fromDate = "2023-10-15T00:00:00.000Z"
//   const toDate = "2023-10-31T23:59:59.000Z"
  
//   try {
//     const queryParameters:any = { from: fromDate, to: toDate }
//     if (boid_id) {
//       queryParameters.boid_id = boid_id
//     }
//     const data = await trpc.GetCombinedData.query(queryParameters)
//     console.log("All Deltas:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }

// async function fetchGlobalDeltas() {
//   const fromDate = "2023-10-10T00:00:00.000Z"
//   const toDate = "2023-10-31T23:59:59.000Z"
  
//   try {
//     const queryParameters:any = { from: fromDate, to: toDate }
//     if (boid_id) {
//       queryParameters.boid_id = boid_id
//     }
//     const data = await trpc.GetGlobalDeltas.query(queryParameters)
//     console.log("All Deltas:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }

// async function fetchCalculatorData() {
//   const rounds = 100
//   const basePowerPerRound = 100
//   const stake = 100
//   const liveSim = false
//   const activeSponsor = false
//   const configAccount = {
//     min_pwr_tax_mult: 10
//   }
//   const userConfig = {
//     power: {
//       sponsor_tax_mult: 0.1,
//       powered_stake_mult: 0.1
//     },
//     mint: {
//       round_powered_stake_mult: 0.1,
//       round_power_mult: 0.1
//     }
//   }
  
//   try {
//     const queryParameters:any = { rounds, basePowerPerRound, stake, userConfig, liveSim, activeSponsor, configAccount }

//     const data = await trpc.GetCalculatedData.query(queryParameters)
//     console.log("Calculator Data:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }

// fetchCalculatorData().catch(error => console.error("Error in fetchCalculatorData:", error))


// interface PowerReportsQueryParams {
//   round?:number;
//   boid_id?:string;
//   protocol_id?:number;
// }

// async function fetchPowerReports(params:PowerReportsQueryParams) {
//   try {
//     // Directly pass params as they are already structured correctly
//     const data = await trpc.GetPowerReports.query(params)
//     console.log("Power Reports:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }
// await fetchPowerReports({ round: 130, boid_id: "seth.voice" })

// // Update this to match the actual required parameters
// interface PayOracleQueryParams {
//   oracle?:string;
//   round?:number;
//   // Add from and to if required
// }

// async function fetchPayOracleData(params:PayOracleQueryParams) {
//   try {
//     // Again, pass params directly
//     const data = await trpc.GetPayOracle.query(params)
//     console.log("Oracle Payments:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }
// await fetchPayOracleData({ oracle: "progrediallc", round: 130 })

// async function fetchOracleReport() {
//   const fromDate = "2023-10-15T00:00:00.000Z"
//   const toDate = "2025-10-31T23:59:59.000Z"
//   const oracle = "progrediallc"
//   const round = 130
  
//   try {
//     const queryParameters:any = { from: new Date(fromDate), to: new Date(toDate), oracle }
//     const data = await trpc.GetOraclePowerReport.query(queryParameters)
//     console.log("Oracle Report:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }

// await fetchOracleReport()

// async function fetchBOIDtokenInfo() {
//   try {
//     const data = await trpc.GetBOIDtokenInfo.query(undefined)
//     console.log("BOID Tokens Info:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }

// fetchBOIDtokenInfo().catch(error => console.error("Error in fetchBOIDtokenInfo:", error))
