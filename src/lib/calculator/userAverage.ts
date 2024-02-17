import db from "lib/db"

async function fetchLatestEntriesFiltered() {
  const query = `
    WITH ranked_entries AS (
      SELECT *,
             ROW_NUMBER() OVER(PARTITION BY boid_id ORDER BY "timeStamp" DESC) as rn
      FROM "AccountsTable"
      WHERE staked > 0 AND power > 0
    )
    SELECT boid_id, staked, power
    FROM ranked_entries
    WHERE rn = 1;
  `

  const latestEntries = await db.$queryRawUnsafe(query)
  // Assuming the result structure, adjust if necessary
  return latestEntries as { boid_id:string; staked:number; power:number }[]
}

async function countActiveBoidIdsBasedOnLatestEntries() {
  const query = `
    WITH ranked_entries AS (
      SELECT *,
             ROW_NUMBER() OVER(PARTITION BY boid_id ORDER BY "timeStamp" DESC) as rn
      FROM "AccountsTable"
      WHERE staked > 0 AND power > 0
    )
    SELECT COUNT(DISTINCT boid_id) as active_count
    FROM ranked_entries
    WHERE rn = 1;
  `

  const result = await db.$queryRawUnsafe(query)
  // Here, we assert the result to have a structure we expect
  const countResult = result as { active_count:number }[]
  return countResult[0]?.active_count || 0
}

export async function calculateAveragesAndTotal():Promise<{ averageStaked:number; averagePower:number; totalUsers:number }> {
  try {
    // Fetch the latest entries for each boid_id
    const latestEntries = await fetchLatestEntriesFiltered()
  
    // Calculate total staked and power values
    const totals = latestEntries.reduce((acc, entry) => {
      acc.totalStaked += entry.staked
      acc.totalPower += entry.power
      return acc
    }, { totalStaked: 0, totalPower: 0 })
  
    // Calculate averages and round to the nearest whole number
    const averageStaked = Math.round(totals.totalStaked / latestEntries.length)
    const averagePower = Math.round(totals.totalPower / latestEntries.length)
  
    // Get the total number of active boid_id's
    const activeBoidCount = Number(await countActiveBoidIdsBasedOnLatestEntries())
    console.log("totalusers: ", activeBoidCount)
    return {
      averageStaked,
      averagePower,
      totalUsers: activeBoidCount
    }
  } catch (e) {
    console.error("An error occurred during calculation:", e)
    throw e // Rethrow if you want to propagate the error
  }
} 
