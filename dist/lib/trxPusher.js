import { doAction } from "./eosio.js";
import logger from "./logger.js";
const log = logger.getLogger("ActionPusher");
export class ActionPusher {
    constructor(intervalms = 1000) {
        this.queue = [];
        this.interval = intervalms;
        this.timer = setInterval(this.pushTrx, this.interval);
    }
    pushTrx() {
        const act = this.queue.shift();
        if (!act)
            return;
        const result = doAction(act.name, act.data, act.account);
        log.debug(result);
    }
    add(act) {
        this.queue.push(act);
    }
}
//# sourceMappingURL=trxPusher.js.map