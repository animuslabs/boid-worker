import { Wcg } from "lib/wcg"
import logger from "lib/logger"
import { getBoincProtocols, getProtocols } from "lib/queries"
import { toObject } from "lib/utils"
const log = logger.getLogger("wcg-saveMembers")
const teamId = "0FVBH11FK2"


const protoRows = await getProtocols()
const wcgRow = protoRows.find(el => el.protocol_name.toString() == "wcg")
if (!wcgRow) {
  log.error("WCG protocol not found")
  process.exit(0)
}
const wcg = new Wcg(teamId, wcgRow.protocol_id.toNumber())
log.debug("Processing WCG Protocol", toObject(wcgRow))
await wcg.saveMembers(await wcg.getMembers())


process.exit(0)
