import { ActionPusher } from "../../lib/actionPusher.js";
import { pwrActions } from "../../lib/actions.js";
import logger from "../../lib/logger.js";
import { getOracleStat, tables } from "../../lib/queries.js";
import { Slashabsent } from "../../lib/types/power.boid.types.js";
import { currentRound, finalizedRound } from "../../lib/utils.js";
const log = logger.getLogger("slashAbsent");
async function init() {
    log.info("starting slashAbsent: searching for absent oracles to slash");
    const oracles = await tables.pwr.oracles();
    const round = await currentRound();
    log.debug("current round:", round);
    const stats = await tables.pwr.stats();
    const finalRound = await finalizedRound();
    log.debug("final round:", finalRound);
    const activeOracles = oracles.filter(el => !el.standby);
    log.debug("active oracles:", activeOracles.length);
    const finalizedStats = stats.filter(el => el.round.toNumber() - 1 < finalRound);
    const pusher = new ActionPusher(5000);
    log.info("checking stats:", finalizedStats.length);
    for (const stat of finalizedStats) {
        const global = stat.starting_global;
        const absent = global.expected_active_oracles.filter(el => !global.active_oracles.find(el2 => el.equals(el2)));
        log.info("checking absent oracles for round", stat.round.toNumber() - 1, JSON.parse(JSON.stringify(absent)));
        for (const oracle of absent) {
            log.info("checking:", oracle.toString());
            const matchedOracle = activeOracles.find(el => el.account.equals(oracle));
            if (!matchedOracle)
                break;
            const expectedActive = matchedOracle.expected_active_after_round.toNumber();
            log.debug("matched oracle expected active after:", matchedOracle.account.toString(), matchedOracle.expected_active_after_round.toNumber());
            const targetRound = stat.round.toNumber() - 1;
            log.debug("checking", targetRound);
            if (expectedActive > targetRound)
                break;
            // check if a row was added already (from previous slashing)
            const existing = await getOracleStat(oracle, targetRound);
            if (existing)
                continue;
            const slashData = Slashabsent.from({ oracle, round: stat.round.toNumber() - 1 });
            const slashAction = pwrActions.slashAbsent(slashData);
            log.info("created slashabsent action:", JSON.parse(JSON.stringify(slashData.toJSON())));
            pusher.add(slashAction);
        }
    }
    pusher.stop();
}
init().catch();
//# sourceMappingURL=slashAbsent.js.map