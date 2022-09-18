
import db from "lib/db.js"
// import { fah } from "lib/fah"
import logger from "lib/logger"
import e from "lib/edgeql/index"
import { fah } from "lib/fah"
import { Timer } from "lib/timer"
// import { fah } from "../../lib/fah"
const jobName = "fah:saveTeamMembers"
const log = logger.getLogger(jobName)

async function init() {
  log.info("starting:", jobName)
  log.info("querying for fah team members")
  console.time("teamQuery")
  const scores = await fah.getTeamMembers()
  console.timeEnd("teamQuery")
  log.info("received", scores.length, "fah members")
  log.info("top member:", scores[0])
  let dbTimer:Timer = new Timer()
  if (log.getLevel() < 2) dbTimer.start()
  for (const score of scores) {
    const cmd = e.insert(e.fahRecord, {
      fahid: score.id,
      name: score.name,
      score: score.score,
      time: e.datetime_current(),
      wus: score.wus
    })
    log.debug("writing user to DB:\n", cmd.toEdgeQL())
    await db.execute(cmd.toEdgeQL())
  }
  log.info("finished writing fah members to DB")
  if (log.getLevel() < 2) log.debug("DB write time ms:", dbTimer.stop().elapsed)
  console.timeEnd("DBWrite")
}
init().catch(err => {
  log.error(err.toString())
  log.debug(err)
})
