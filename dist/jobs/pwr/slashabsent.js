import { ActionPusher } from "../../lib/actionPusher.js";
import { createSlashAbsentAction } from "../../lib/actions.js";
import logger from "../../lib/logger.js";
import { tables } from "../../lib/queries.js";
import { currentRound, finalizedRound } from "../../lib/utils.js";
const log = logger.getLogger("slashAbsent");
async function init() {
    log.info("starting slashAbsent: searching for absent oracles to slash");
    const oracles = await tables.pwr.oracles();
    const round = await currentRound();
    const stats = await tables.pwr.stats();
    const finalRound = await finalizedRound();
    const activeOracles = oracles.filter(el => !el.standby && el.expected_active_after_round.toNumber() < round).map(el => el.account.toString());
    const finalizedStats = stats.filter(el => el.round.toNumber() - 1 <= finalRound);
    const pusher = new ActionPusher(5000);
    log.info("checking stats:", finalizedStats.length);
    for (const stat of finalizedStats) {
        const global = stat.starting_global;
        const absent = [];
        global.expected_active_oracles.forEach(el => {
            const active = global.active_oracles.includes(el);
            if (!active)
                absent.push(el.toString());
        });
        for (const oracle of absent) {
            if (!activeOracles.includes(oracle))
                break;
            const slashData = { oracle, round: stat.round.toNumber() - 1 };
            const slashAction = createSlashAbsentAction(slashData);
            log.info("created slashabsent action:", { oracle, round: stat.round.toNumber() - 1 });
            pusher.add(slashAction);
        }
    }
    pusher.stop();
}
init().catch();
//# sourceMappingURL=slashAbsent.js.map