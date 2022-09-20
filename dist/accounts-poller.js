import { Account } from "./lib/types/boid.system.js";
import { getFullTable } from "./lib/eosio.js";
import db from "./lib/db.js";
import log from "./lib/logger.js";
import env from "./lib/env.js";
async function init() {
    try {
        const allAccounts = await getFullTable({ tableName: "accounts", contract: env.contracts.system }, Account);
        log.info("Got all Boid accounts:", allAccounts.length);
        const accountNames = allAccounts.map(el => el.boid_id.toString());
        let inserted = 0;
        for (const boidId of accountNames) {
            const result = await db.boidAccount.create({ data: { boidId } }).catch(() => { });
            log.debug(result);
            if (result)
                inserted++;
        }
        log.info("inserted", inserted, "new users");
    }
    catch (error) {
        console.error(error.toString());
    }
}
init().catch(console.error);
//# sourceMappingURL=accounts-poller.js.map