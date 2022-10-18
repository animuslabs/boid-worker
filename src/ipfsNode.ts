import * as IPFS from "ipfs-core"

async function init() {
  const ipfs = await IPFS.create()
  // ipfs.start()
}
init().catch(console.error)
