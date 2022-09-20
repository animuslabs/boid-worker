import { doAction } from "./eosio.js";
import logger from "./logger.js";
import { sleep } from "./utils.js";
const log = logger.getLogger("ActionPusher");
export class ActionPusher {
    constructor(intervalms = 1000) {
        this.queue = [];
        this.timer = setInterval(() => this.pushTrx(), intervalms);
    }
    async stop() {
        log.debug("stopping pusher");
        while (this.queue.length > 0) {
            await sleep(1000);
            log.debug("queue remaining", this.queue.length);
        }
        log.debug("stopped");
        clearInterval(this.timer);
    }
    add(act) {
        this.queue.push(act);
    }
    async pushTrx() {
        // log.debug("queue:", this)
        const act = this.queue.shift();
        if (!act)
            return;
        const result = await doAction(act.name, act.data, act.account);
        log.debug("pushTrx result:", result);
        if (result?.receipts.length == 0) {
            log.error("Transaction Error:", result.errors);
        }
        else {
            log.debug("transaction success:", result?.receipts[0].receipt.id);
        }
    }
}
//# sourceMappingURL=actionPusher.js.map