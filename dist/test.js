import { fah } from "./lib/fah.js";
const teamid = "238663";
const apiRoot = "https://api2.foldingathome.org/uid/612188543";
// "https://api2.foldingathome.org/uid/612188543"
async function init() {
    const members = await fah.getTeamMembers();
    console.log(JSON.stringify(members, null, 2));
    // const id = reportIdFromReport(PwrReport.from({ "protocol_id": 0, "round": 48, "units": 20492 }))
    // log.debug("reportId:", id)
    // should be 10480128000
}
init().catch(console.error);
//# sourceMappingURL=test.js.map