import { getBoincProtocols } from "lib/queries"
import { handleProtocol } from "lib/reportUtils"

const boincMetas = await getBoincProtocols()
for (const boincMeta of boincMetas) {
  await handleProtocol(boincMeta.protocol_id.toNumber())
}
process.exit(0)

