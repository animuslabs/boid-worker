import { ABI, Name, Serializer } from "@greymass/eosio"
import { safeDo, getAccount } from "./eosio"
import { tables } from "./queries"

import { dirname } from "path"
import { fileURLToPath } from "url"

import log from "lib/logger"
import { PwrReport, PwrReportRow } from "lib/types/power.boid.types"
import fs from "fs-extra"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export const sleep = async(ms:number) => new Promise(resolve => setTimeout(resolve, ms))
const thisFile = () => import.meta.url.split(".")[0].split("/").reverse()[0]
export function shuffle<T>(array:T[]) {
  let currentIndex = array.length
  let temporaryValue
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export async function accountExists(name:string) {
  const validRegex = /(^[a-z1-5.]{0,11}[a-z1-5]$)|(^[a-z1-5.]{12}[a-j1-5]$)/
  if (typeof name !== "string") return false
  if (!validRegex.test(name)) return false
  try {
    const result = await getAccount(Name.from(name))
    if (result) return true
    return false
  } catch (error) {
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
  return (Date.now() - config.time.rounds_start.toMilliseconds()) / (config.time.round_length_sec.toNumber() * 1000)
}

export interface roundData {
  round:number
  start:Date,
  end:Date
}
export async function getRoundData(round:number) {
  round = Math.floor(round)
  const config = await tables.sys.config()
  const roundLength = config.time.round_length_sec.multiplying(1000).toNumber()
  const roundsStarted = config.time.rounds_start.toMilliseconds()
  log.debug("round Length ms:", roundLength)
  const start = new Date((roundLength * round) + roundsStarted)
  const end = new Date(start.getTime() + roundLength)
  return { round, start, end }
}

export function reportIdFromReport(report:PwrReport):number {
  const ser = Serializer.encode({ object: report })
  const int = parseInt("1" + ser.array.reduce((acc:string, val:number) => acc + val.toString(), ""))
  log.debug(int)
  return int
}

export async function shouldFinishReport(report:PwrReportRow):Promise<boolean> {
  const config = await tables.pwr.config()
  const global = await tables.pwr.global()
  const round = await currentRound()
  const minApproval = Math.max(config.min_consensus_pct.value * global.expected_active_weight.value, config.min_consensus_weight.value)
  log.debug("calculated min consensus weight: ", minApproval)
  const rndProgress = round % parseInt(`${round}`)
  if (report.report.round.toNumber() == round - 1 && rndProgress < config.reports_accumulate_weight_round_pct.value) return false
  if (report.merged || report.reported) return false
  if (report.approval_weight.value >= minApproval) return true
  return false
}

export async function finalizedRound():Promise<number> {
  const round = await currentRound()
  const config = await tables.pwr.config()
  return round - config.reports_finalized_after_rounds.toNumber()
}
