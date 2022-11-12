import * as IPFS from "ipfs-core"
import events from "events"
events.setMaxListeners(1000000)
async function init() {
  IPFS.create()
}
init().catch(console.error)
