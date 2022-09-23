import { ActionPusher } from "../../lib/actionPusher.js";
import { pwrActions } from "../../lib/actions.js";
import logger from "../../lib/logger.js";
import { getReportScopes, tables } from "../../lib/queries.js";
import { Mergereports } from "../../lib/types/power.boid.types.js";
import { finalizedRound, shouldMergeReports } from "../../lib/utils.js";
const log = logger.getLogger("mergeReports");
async function init() {
    log.info("starting mergeReports");
    const reportScopes = await getReportScopes();
    log.info("found report scopes:", reportScopes.length);
    const finalRound = await finalizedRound();
    log.debug("final round:", finalRound);
    const config = await tables.pwr.config();
    const pusher = new ActionPusher();
    for (const scope of reportScopes) {
        let reports = await tables.pwr.pwrReports(scope);
        reports = reports.filter(el => (el.report.round.toNumber() >= finalRound && !el.reported && !el.merged));
        if (reports.length < 2) {
            log.debug("no mergable reports found for", scope.toString());
            continue;
        }
        log.debug("searching", reports.length, "reports for", scope.toString(), "for potential merges");
        const protocols = {};
        const rounds = {};
        // sort the protocols by rounds and protocols
        reports.forEach(el => {
            const proto = el.report.protocol_id.toNumber();
            const round = el.report.round.toNumber();
            if (!rounds[round]) {
                rounds[round] = {};
                rounds[round][proto] = [el];
            }
            else {
                if (!rounds[round][proto]) {
                    rounds[round][proto] = [el];
                }
                else {
                    rounds[round][proto].push(el);
                }
            }
        });
        // log.debug("sorted reports", rounds)
        // continue
        // if there is multiple reports for a protocol in a single round, try to merge them
        for (const [round, protocols] of Object.entries(rounds)) {
            const roundNum = parseInt(round);
            for (const [proto, reports] of Object.entries(protocols)) {
                // const protoNum = parseInt(proto)
                if (reports.length < 2)
                    continue;
                log.debug("considering merging reports for", scope.toString(), "and round", round.toString());
                if (!(await shouldMergeReports(roundNum, reports))) {
                    log.info("not mergable");
                    log.debug(JSON.parse(JSON.stringify(reports)));
                    continue;
                }
                const mergeAction = Mergereports.from({ boid_id_scope: scope, pwrreport_ids: reports.map(el => el.report_id) });
                pusher.add(pwrActions.mergeReports(mergeAction));
            }
        }
    }
    pusher.stop();
}
init().catch(log.error);
//# sourceMappingURL=mergeReports.js.map