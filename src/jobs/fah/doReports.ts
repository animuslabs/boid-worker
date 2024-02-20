import { getProtocols } from "lib/queries"
import { handleProtocol } from "lib/fahReportUtils"
import logger from "lib/logger"
const log = logger.getLogger("wcg-doReports")

const protoRows = await getProtocols()
const fahRow = protoRows.find(el => el.protocol_name.toString() == "fah")
if (!fahRow) {
  log.error("fah protocol not found")
  process.exit(0)
}
await handleProtocol(fahRow.protocol_id.toNumber())
process.exit(0)

