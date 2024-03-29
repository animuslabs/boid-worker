import { Boinc } from "lib/boinc"
import logger from "lib/logger"
import { getBoincProtocols } from "lib/queries"
import { toObject } from "lib/utils"
const log = logger.getLogger("boinc-saveMembers")

const boincRows = await getBoincProtocols()
for (let row of boincRows) {
  try {
    const boinc = await new Boinc(row).init()
    log.debug("Processing Protocol", toObject(row))
    await boinc.saveMembers(await boinc.getMembers())
  } catch (err) { log.error(err) }
}

process.exit(0)
