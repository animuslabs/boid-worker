import config from "lib/env"
import Logger from "lib/logger"
import ms from "ms"
import { GetActions, JsonRpc } from "@proton/hyperion"
import { actionMap, ActionMapType } from "lib/injest"
import db from "lib/db"

const log = Logger.getLogger("cleanOldRecords")
const cutoff = new Date(Date.now() - ms(config.history?.keepHistoryDataDays + "d" || "90d"))
log.info("deleting history data older than", "local:", cutoff.toLocaleString(), "ISO:", cutoff.toISOString())

async function init() {
  // return
  for (const table of Object.keys(actionMap)) {
    log.info("checking", table)
    const result = await db[table].deleteMany({ where: { timeStamp: { lt: cutoff } } })
    log.info("deleted:", result.count)
  }
}
await init().catch(log.error)
process.exit(0)

