import express from "express"
import swaggerUi from "swagger-ui-express"
import swaggerSpec from "../../apiSwagger.json" assert { type: "json" }
import config from "lib/env"
import { getAllDeltas, getDeltasBoidID, getLogPwrClaimData, getAccountData, getGlobalDeltaData } from "./api4DeltasFunctions"
import { AccountsDeltaData, AveragePowerData, DeltasByDateAndBoidId, TotalAveragePowerData, RequestQueryParams, RequestParams } from "./api4DeltasTypes"

const API = express()
process.env.TZ = "Etc/UTC"
const apiport = config.historyDeltasAPI?.port

API.listen(apiport, () => {
  console.log(`API is listening on port ${apiport}`)
})

API.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

API.get("/accounts/deltas", async(req, res) => {
  const fromDate = req.query.from
    ? new Date(req.query.from as string)
    : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // default from date is 30 days ago
  console.log("fromDate", fromDate)
  const toDate = req.query.to ? new Date(req.query.to as string) : new Date() // default to date is today
  toDate.setHours(23, 59, 59, 999)
  console.log("toDate", toDate)
  const boid_id = req.query.boid_id ? String(req.query.boid_id) : undefined // get the boidId filter value or undefined if not provided
  console.log("boidId", boid_id)
  
  try {
    let deltas:AccountsDeltaData[]
    const deltasAll = await getAllDeltas(fromDate, toDate)
    if (boid_id) {
      deltas = await getDeltasBoidID(boid_id, fromDate, toDate)
    } else {
      deltas = await getAllDeltas(fromDate, toDate)
    }
  
    // calculate total power for each day and boid_id
    const deltasByDateAndBoidId:DeltasByDateAndBoidId = {}
    const totalPowerAndCountByDate:{ [date:string]:{ totPower:number; count:number } } = {}
  
    deltasAll.forEach((delta) => {
      const dateAsTimestamp = delta.timeStamp.valueOf()
      const date = new Date(dateAsTimestamp).toISOString().substring(0, 10)
        
      // Update total power and count for each date
      if (!totalPowerAndCountByDate[date]) {
        totalPowerAndCountByDate[date] = {
          totPower: 0,
          count: 0
        }
      }
      totalPowerAndCountByDate[date].totPower += delta.power
      totalPowerAndCountByDate[date].count++
  
      if (boid_id && delta.boid_id !== boid_id) return
  
      if (!deltasByDateAndBoidId[date]) {
        deltasByDateAndBoidId[date] = {}
      }
      if (!deltasByDateAndBoidId[date][delta.boid_id]) {
        deltasByDateAndBoidId[date][delta.boid_id] = {
          totPower: 0,
          count: 0
        }
      }
      deltasByDateAndBoidId[date][delta.boid_id].totPower += delta.power
      deltasByDateAndBoidId[date][delta.boid_id].count++
    })
  
    const averagePower:AveragePowerData[] = []
    Object.entries(deltasByDateAndBoidId).forEach(([date, deltas]) => {
      Object.entries(deltas).forEach(([boid_id, { totPower, count }]) => {
        const avgPower = totPower / count
        averagePower.push({
          date, // Date is already formatted as a string in "yyyy-mm-dd" format
          boid_id,
          avgPower
        })
      })
    })
  
    const totalAverageAddedPower:TotalAveragePowerData[] = Object.entries(totalPowerAndCountByDate).map(([date, { totPower, count }]) => ({
      date, // Date is already formatted as a string in "yyyy-mm-dd" format
      avgPower: totPower / count
    }))

    res.status(200).json({ averagePower, totalAverageAddedPower })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal server error" })
  }
})

API.get("/accounts/mint", async(req, res) => {
  try {
    const queryParams:RequestQueryParams = {
      from: req.query.from as string | undefined,
      to: req.query.to as string | undefined,
      boid_id: req.query.boid_id as string | undefined
    }
    const mintData = await getLogPwrClaimData(queryParams)
    res.status(200).json(mintData)
  } catch (error:any) {
    res.status(500).send(error.message)
  }
})

API.get("/global/accounts", async(req, res) => {
  try {
    const queryParams:RequestQueryParams = {
      from: req.query.from as string | undefined,
      to: req.query.to as string | undefined,
      boid_id: req.query.boid_id as string | undefined
    }
    const accounts = await getAccountData(queryParams)
    res.status(200).json(accounts)
  } catch (error:any) {
    res.status(500).send(error.message)
  }
})

API.get("/global/delta", async(req, res) => {
  try {
    const queryParams:RequestParams = {
      from: req.query.from as string | undefined,
      to: req.query.to as string | undefined
    }
    const globalDeltas = await getGlobalDeltaData(queryParams)
    res.status(200).json(globalDeltas)
  } catch (error:any) {
    res.status(500).send(error.message)
  }
})
