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


// CHECK AGAIN DOESNT LOOK GOOD
async function fetchPwrClaim(boid_id) {
  const fromDate = "2023-10-25T00:00:00.000Z"
  const toDate = "2023-10-31T00:00:00.000Z"
  
  try {
    const queryParameters:any = { from: fromDate, to: toDate }
    if (boid_id) {
      queryParameters.boid_id = boid_id
    }
    const data = await trpc.GetLogPwrClaim.query(queryParameters)
    console.log("All Deltas:", data)
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

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

async function fetchGlobalDeltas() {
  const fromDate = "2023-10-10T00:00:00.000Z"
  const toDate = "2023-10-31T23:59:59.000Z"
  
  try {
    const queryParameters:any = { from: fromDate, to: toDate }
    if (boid_id) {
      queryParameters.boid_id = boid_id
    }
    const data = await trpc.GetGlobalDeltas.query(queryParameters)
    console.log("All Deltas:", data)
  } catch (error) {
    console.error("Error fetching data:", error)
  }
}

const boid_id = "boidis.cool"
// fetchperBoidID(boid_id)
// fetchperBoidID("")
// fetchPwrClaim(boid_id)
// fetchCombinedData(boid_id)
fetchGlobalDeltas()
