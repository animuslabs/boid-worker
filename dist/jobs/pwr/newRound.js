import { doAction } from "../../lib/eosio.js";
import logger from "../../lib/logger.js";
import { getStatRow } from "../../lib/queries.js";
import { currentRound } from "../../lib/utils.js";
const log = logger.getLogger("newRound");
// roundstats
async function init() {
    log.info("starting newRound Check");
    const round = await currentRound();
    log.info("current round:", round);
    const row = await getStatRow(round);
    if (row) {
        log.info("Stats row exists for current round, no action needed.");
        log.debug(JSON.stringify(row));
    }
    else {
        await doAction("roundstats");
    }
}
init().catch(log.error);
//# sourceMappingURL=newRound.js.map