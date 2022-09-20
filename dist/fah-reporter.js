import log from "loglevel";
import ax from "axios";
import db from "./lib/db.js";
const teamid = "238663";
const apiRoot = `https://api2.foldingathome.org/team/${teamid}/members`;
log.setDefaultLevel(0);
export async function getCurrentScores() {
    const response = await ax.get(apiRoot);
    let donors = response.data.map((el) => {
        return {
            name: el[0].toLowerCase(),
            id: el[1],
            rank: el[2],
            score: el[3],
            wus: el[4]
        };
    });
    donors.shift();
    return donors;
}
async function init() {
    console.log("hi");
    log.error("hello from fah worker");
    const scores = await getCurrentScores();
    // log.info(scores)
    const now = new Date();
    for (const score of scores) {
        // log.info(score)
        const cmd = `
      insert fahRecord {
        fahid := "${score.id}",
        name := "${score.name}",
        score := ${score.score},
        time := datetime_current(),
        wus := ${score.wus}
      }
    `;
        console.log(cmd);
        await db.execute(cmd);
    }
    // const result = await db.queryJSON(`
    //   select fahRecord {id}
    // `)
    // log.info(result)
}
// init().catch(err => {
//   console.log(err.toString())
// })
//# sourceMappingURL=fah-reporter.js.map