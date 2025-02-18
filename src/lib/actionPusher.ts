import { Action } from "@wharfkit/antelope"
import { sendAction } from "lib/eosio"
import logger from "lib/logger"
import { sleep } from "lib/utils"
const log = logger.getLogger("ActionPusher")

export class ActionPusher {
  constructor(intervalms:number = 1000) {
    this.timer = setInterval(() => this.pushTrx(), intervalms)
  }

  async stop() {
    log.debug("stopping pusher")
    while (this.queue.length > 0) {
      await sleep(1000)
      log.debug("queue remaining", this.queue.length)
    }
    log.debug("stopped")
    clearInterval(this.timer)
  }

  add(act:Action) {
    this.queue.push(act)
  }

  timer:NodeJS.Timeout
  queue:Action[] = []

  async pushTrx() {
    log.debug("queue:", this.queue.length)
    const act = this.queue.shift()
    if (!act) return
    const result = await sendAction(act)
    log.debug("pushTrx result:", result)
    if (result?.receipts.length == 0) {
      log.error("Transaction Error:", result.errors)
    } else {
      log.debug("transaction success:", result?.receipts[0].receipt.id)
    }
  }
}
