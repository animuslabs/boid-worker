import { ABI, Name, Serializer, UInt64 } from "@wharfkit/antelope"
import { safeDo, getAccount } from "./eosio"
import { tables } from "./queries"
import moment from "moment"

import { dirname } from "path"
import { fileURLToPath } from "url"

import logger from "lib/logger"
import { Types } from "lib/types/power.boid.types"
import fs from "fs-extra"
let log = logger.getLogger("utils")
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const sleep = async(ms:number) => new Promise(resolve => setTimeout(resolve, ms))

export function shuffle<T>(array:T[]) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex] as T
    array[randomIndex] = temporaryValue
  }

  return array
}

export function getReportId(report:Types.PwrReport) {
  return UInt64.from((BigInt(report.protocol_id.toNumber()) << BigInt(48)) + (BigInt(report.round.toNumber()) << BigInt(32)) + BigInt(report.units.toNumber()))
}

export async function accountExists(name:string) {
  const validRegex = /(^[a-z1-5.]{0,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)/
  if (typeof name !== "string") return false
  if (!validRegex.test(name)) return false
  try {
    const result = await getAccount(Name.from(name))
    if (result) return true
    return false
  } catch (error:any) {
    console.log("can't find account", error.toString())
    return false
  }
}

export function rand(min:number, max:number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function evalTypedEOSIOList(list:any[]):any[] {
  return list.map(el => {
    const result = {}
    Object.entries(el).forEach((item) => {
      const param = item[1] as any
      result[item[0]] = param.toString()
    })
    return result
  })
}

export async function currentRound() {
  const config = await tables.sys.config()
  return (Date.now() - config.time.rounds_start_sec_since_epoch.toNumber() * 1000) / (config.time.round_length_sec.toNumber() * 1000)
}
export async function finalRound() {
  const round = await currentRound()
  return round - 2
}

export interface roundData {
  round:number
  start:Date,
  end:Date
}
export async function getRoundData(round:number) {
  round = Math.floor(round)
  const config = await tables.sys.config()
  const roundLength = config.time.round_length_sec.toNumber() * 1000
  const roundsStarted = config.time.rounds_start_sec_since_epoch.toNumber() * 1000
  log.debug("round Length ms:", roundLength)
  log.debug("rounds started ms:", roundsStarted)
  const start = new Date((roundLength * round) + roundsStarted)
  const end = new Date(start.getTime() + roundLength)
  return { round, start, end }
}

export function toObject(data) {
  return JSON.parse(JSON.stringify(data, (key, value) =>
    typeof value === "bigint"
      ? value.toString()
      : value // return everything else unchanged
  ))
}

export function toInt(num:BigInt):number {
  return parseInt(num.toString())
}
function getMinApproval(config:Types.PwrConfig, global:Types.PwrGlobal) {
  return Math.max(config.consensus.min_weight_pct.value * global.expected_active_weight.value, config.consensus.min_weight.value)
}

export async function shouldFinishReport(report:Types.PwrReportRow):Promise<boolean> {
  let log = logger.getLogger("shouldFinishReport(): ")
  const config = await tables.pwr.config()
  const global = await tables.pwr.global()
  const round = await currentRound()
  const minApproval = getMinApproval(config, global)
  log.debug("calculated min consensus weight: ", minApproval)
  const rndProgress = round % parseInt(`${round}`)
  log.debug("current round", round)
  log.debug("rndProgress", rndProgress)
  log.debug("report round", report.report.round.toNumber())
  const reportingRound = parseInt(round.toString()) - 1
  log.debug("activeReportingRound:", reportingRound)
  const reportIsActiveReportingRound = report.report.round.toNumber() == reportingRound
  const leewayPeriod = rndProgress < config.reports_accumulate_weight_round_pct.value
  log.debug(reportIsActiveReportingRound, leewayPeriod)
  if (reportIsActiveReportingRound && leewayPeriod) return false
  log.debug("already merged/reported?", report.merged || report.reported)
  if (report.merged || report.reported) return false
  log.debug("has sufficient weight?:", report.approval_weight.value >= minApproval)
  log.debug(report.approval_weight.value, minApproval)
  if (report.approval_weight.value >= minApproval) return true
  return false
}
export async function shouldMergeReports(roundNum:number, reports:Types.PwrReportRow[]):Promise<boolean> {
  if (reports.length < 2) return false
  const config = await tables.pwr.config()
  const global = await tables.pwr.global()
  const round = await currentRound()
  const minApproval = getMinApproval(config, global)
  log.debug("calculated min consensus weight: ", minApproval)
  const cumulativeWeight = reports.reduce((acc:number, el) => acc + el.approval_weight.toNumber(), 0)
  const rndProgress = round % parseInt(`${round}`)
  if (roundNum == round - 1 && rndProgress < config.reports_accumulate_weight_round_pct.value) return false
  if (reports.some(el => (el.merged || el.reported))) return false
  if (cumulativeWeight >= minApproval) return true
  return false
}
export function pickRand<T>(arr:T[]):T {
  const randomIndex = Math.floor(Math.random() * arr.length)
  return arr[randomIndex]
}
export async function finalizedRound():Promise<number> {
  const round = await currentRound()
  return round - 2
}

export function parseISOString(s) {
  let b = s.split(/\D+/)
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]))
}
export function toDate(string) {
  return new Date(parseISOString(string))
}

export function validateDate(dateString:string):Date {
  // Use a regular expression to parse the input date string into its individual parts (date and time)
  const dateTimeParts = dateString.match(/^(\d{4})?-?(\d{1,2})?-?(\d{1,2})?(T(\d{2})?:?(\d{2})?:?(\d{2})?)?$/)
  if (!dateTimeParts) {
    throw new Error(`Invalid date format: ${dateString}`)
  }
  // Extract the date and time parts from the regular expression match
  const dateParts = dateTimeParts.slice(1, 4)
  const timeParts = dateTimeParts.slice(5)

  // Add default zero values for any missing date or time parts
  for (let i = 0; i < 3; i++) {
    if (dateParts[i] === undefined) {
      dateParts[i] = "00"
    }
  }
  for (let i = 0; i < 3; i++) {
    if (timeParts[i] === undefined) {
      timeParts[i] = "00"
    }
  }

  // Add leading or trailing zeros to the year, month, day, hours, minutes, and seconds values if necessary
  for (let i = 0; i < 3; i++) {
    if (dateParts[i].length < 2) {
      dateParts[i] = `${"0".repeat(2 - dateParts[i].length)}${dateParts[i]}`
    }
  }
  for (let i = 0; i < 3; i++) {
    if (timeParts[i].length < 2) {
      timeParts[i] = `${"0".repeat(2 - timeParts[i].length)}${timeParts[i]}`
    }
  }

  // Reassemble the date and time parts with the default zero values added
  const validatedDateTimeString = `${dateParts.join("-")}T${timeParts.join(":")}`

  // Check if the reassembled date and time string is a valid date
  const date = moment(validatedDateTimeString, "YYYY-MM-DDTHH:mm:ss").toDate()

  return date
}

export function removeDuplicates(arr:any[]) {
  return Array.from(new Set(arr))
}
