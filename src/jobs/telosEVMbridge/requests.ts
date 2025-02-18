import { ActionPusher } from "lib/actionPusher"
import { actions } from "lib/actions"
import { UInt64 } from "@wharfkit/antelope"
import logger from "lib/logger"
import { sleep } from "lib/utils"
import { queryActiveRequests } from "./reqOnEVM"
import { doAction, getFullTable, sendAction } from "../../lib/eosio"
import getConfig from "lib/config"
import { Types as EVMboidTypes } from "lib/types/evm.boid"

const env = getConfig()
const log = logger.getLogger("evm-requests")
const pusher = new ActionPusher()

async function processBridgeRequests():Promise<void> {
  // 1. Query active requests and push "reqnotify" actions
  const activeReqs = await queryActiveRequests()
  log.info("activeReqs:", activeReqs)
  if (activeReqs.length > 0) {
    for (const req of activeReqs) {
      pusher.add(actions.evm.reqnotify({ req_id: UInt64.from(req.id) }))
      log.info("reqnotify:", req.id)
      await sleep(1000) // wait 1s between pushes
    }
  }
  
  // 2. Query the full table and push "verifytrx" actions for unprocessed requests
  const allReqs = await getFullTable({ tableName: "requests", contract: env.contracts.evmBridge }, EVMboidTypes.requests)
  const unprocessed = allReqs.filter(req => !req.processed)
  if (unprocessed.length > 0) {
    for (const req of unprocessed) {
      pusher.add(actions.evm.verifytrx({ req_id: UInt64.from(req.request_id) }))
      log.info("verifytrx:", req.request_id)
      await sleep(1000) // wait 1s between pushes
    }
  }
  log.info("Job finished successfully")
}

processBridgeRequests()
  .then(() => process.exit(0))
  .catch(err => {
    log.error(err)
    process.exit(1)
  })
