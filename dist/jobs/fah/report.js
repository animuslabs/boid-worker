import log from "../../lib/logger.js";
import { currentRound, getRoundData } from "../../lib/utils.js";
async function init() {
    try {
        const reportingRound = await getRoundData(await currentRound());
        console.log(reportingRound);
        // e.select(e.fahRecord, record => ({
        //   ...e.fahRecord["*"]
        //   // filter: e.op(record.time, "<", e.datetime(new Date.from(currentRound() - tables.sys.config().)))
        // }))
    }
    catch (error) {
        log.error(error.toString());
        log.debug(error);
    }
}
init();
//# sourceMappingURL=report.js.map