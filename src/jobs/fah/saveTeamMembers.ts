
import db from "lib/db.js"
import logger from "lib/logger"
import { fah } from "lib/fah"
import { Timer } from "lib/timer"
const jobName = "fah:saveTeamMembers"
const log = logger.getLogger(jobName)

log.info("starting:", jobName)
log.info("querying for fah team members")
const scores = await fah.getTeamMembers()
log.info("received", scores.length, "fah members")
log.info("top member:", scores[0])
let dbTimer:Timer = new Timer()
if (log.getLevel() < 2) dbTimer.start()
for (const score of scores) {
  const result = await db.fahData.create({
    data: {
      fahid: score.id,
      name: score.name,
      score: score.score,
      time: new Date(),
      wus: score.wus
    }
  })
  log.debug("wrote FaH data to DB:", result)
}
log.info("finished writing fah members to DB")
if (log.getLevel() < 2) log.debug("DB write time ms:", dbTimer.stop().elapsed)


process.exit(0)

