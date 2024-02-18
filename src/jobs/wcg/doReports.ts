import { getProtocols } from "lib/queries"
import { handleProtocol } from "lib/reportUtils"
import logger from "lib/logger"
const log = logger.getLogger("wcg-doReports")

const protoRows = await getProtocols()
const wcgRow = protoRows.find(el => el.protocol_name.toString() == "wcg")
if (!wcgRow) {
  log.error("WCG protocol not found")
  process.exit(0)
}
await handleProtocol(wcgRow.protocol_id.toNumber())
process.exit(0)

