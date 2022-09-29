import { ActionPusher } from "../../lib/actionPusher.js";
import { pwrActions } from "../../lib/actions.js";
import logger from "../../lib/logger.js";
import { getOracleStats, getOracleStatsScopes, tables } from "../../lib/queries.js";
import { currentRound, finalRound } from "../../lib/utils.js";
const log = logger.getLogger("handleOracleStats");
async function init() {
    const round = await currentRound();
    const final = await finalRound();
    const scopes = await getOracleStatsScopes();
    const pusher = new ActionPusher(1000);
    const stats = await tables.pwr.stats();
    for (const oracle of scopes) {
        const allStats = await getOracleStats(oracle);
        const finalStats = allStats.filter(el => el.round.toNumber() <= final && !el.processed);
        log.debug("unprocessed finalized stats for:", oracle.toString(), finalStats.length);
        finalStats.forEach(el => {
            const statsExist = stats.some(stat => stat.round.toNumber() == el.round.toNumber() + 1);
            if (statsExist)
                pusher.add(pwrActions.handleostat({ oracle, round: el.round.toNumber() }));
            else
                log.info("found oracle stat with missing global stat, can't process", JSON.stringify(el, null, 2));
        });
    }
    pusher.stop();
}
init().catch(log.error);
//# sourceMappingURL=handleOracleStats.js.map