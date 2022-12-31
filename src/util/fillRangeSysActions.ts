import config from "lib/env"
import Logger from "lib/logger"
import ms from "ms"
import injest, { actionMap } from "lib/injest"
import db from "lib/db"
import { parseISOString, shuffle, sleep } from "lib/utils"
import { getActions, getActionsRange } from "lib/hyp"
const sysContract = config.contracts.system.toString()
const log = Logger.getLogger("fillRangeSysActions")

async function init() {
  await getActionsRange(new Date(), new Date(Date.now() - ms("3h")), "logpwradd")
}
init().catch(log.error)
