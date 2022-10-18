import { Account } from "../../lib/types/boid.system.js";
import { getFullTable } from "../../lib/eosio.js";
import log from "../../lib/logger.js";
import env from "../../lib/env.js";
import { currentRound } from "../../lib/utils.js";
import { getSysConf } from "../../lib/queries.js";
import { ActionPusher } from "../../lib/actionPusher.js";
import { sysActions } from "../../lib/actions.js";
async function init() {
    try {
        const allAccounts = await getFullTable({ tableName: "accounts", contract: env.contracts.system }, Account);
        log.info("Got all Boid accounts:", allAccounts.length);
        let claimed = 0;
        const round = await currentRound();
        const config = await getSysConf();
        const pusher = new ActionPusher();
        for (const account of allAccounts) {
            if (account.boid_id.toString() == "boid")
                continue;
            const elapsed = round - account.power.last_claimed_round.toNumber();
            if (elapsed < config.power.claim_maximum_elapsed_rounds.toNumber() / 2)
                continue;
            claimed++;
            pusher.add(sysActions.claim({ boid_id: account.boid_id }));
        }
        pusher.stop();
        log.info("claimed", claimed, "accounts");
    }
    catch (error) {
        console.error(error.toString());
    }
}
init().catch(console.error);
//# sourceMappingURL=claimBoidAccounts.js.map