// TESTING TRPC CLIENT ONLY
import { createTRPCProxyClient, httpBatchLink } from "@trpc/client"
import type { AppRouter } from "./trpcAPI"

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: "http://localhost:3000/api/"
    })
  ]
})

// async function fetchAllBoidIDs() {
//   try {
//     const data = await trpc.BoidIDlist.query(undefined)
//     console.log("All Boid IDs:", data)
//   } catch (error) {
//     console.error("Error fetching data:", error)
//   }
// }

// fetchAllBoidIDs()


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

async function fetchPowerReports(round?:number, boid_id?:string, protocol_id?:number) {
  try {
    const queryParameters:any = { round }
    if (boid_id) {
      queryParameters.boid_id = boid_id
    }
    if (protocol_id) {
      queryParameters.protocol_id = protocol_id
    }
    if (round) {
      queryParameters.round = round
    }
    const data = await trpc.GetPowerReports.query(queryParameters)
    console.log("Power Reports:", data)
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}


const boid_id = "seth.voice"
// fetchperBoidID(boid_id)
// fetchperBoidID("")
// fetchPwrClaim(boid_id)
// fetchCombinedData(boid_id)
// fetchGlobalDeltas()
// await fetchCalculatorData()


const protocol_id = 1
const round = 130
await fetchPowerReports(round)
