import { getBoincProtocols } from "lib/queries"
import { handleProtocol } from "lib/reportUtils"
import logger from "lib/logger"
const log = logger.getLogger("boinc-doReports")

const boincMetas = await getBoincProtocols()
for (const boincMeta of boincMetas) {
  await handleProtocol(boincMeta.protocol_id.toNumber()).catch(log.error)
}
process.exit(0)

