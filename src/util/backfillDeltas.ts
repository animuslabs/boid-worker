import Logger from "lib/logger"
import ms from "ms"
import { sleep } from "lib/utils"
import { deltas, loadDeltas } from "lib/deltas"
import getConfig from "lib/config"

const config = getConfig()
const log = Logger.getLogger("loadStateDeltas")
const sysContract = config.contracts.system.toString()
const powerContract = config.contracts.power.toString()
async function init(retries:number, sleepfor:string) {
  for (let i = 0; i < retries; i++) {
    for (const table of Object.keys(deltas)) {
      try {
        await loadDeltas("backwards", table as any, sysContract, sysContract, sysContract)
      } catch (error) {
        log.error(`Error loading deltas for table ${table}: ${error}`)
        if (i < retries - 1) {
          log.info(`Sleeping for ${sleepfor} before retrying...`)
          await sleep(ms(sleepfor)) // wait before retrying
        } else {
          throw error // re-throw error if no more retries left
        }
      }
    }
  }
}

const retries = 10
const sleepfor = "3s"

init(retries, sleepfor).catch((error) => {
  log.error(`Error initializing state deltas: ${error}`)
})
