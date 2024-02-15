import ax from "axios"
import db from "lib/db"
import logger from "lib/logger"
import { rosetta } from "lib/rosetta"
import { Timer } from "lib/timer"
const jobName = "rosetta:saveMembers"
const log = logger.getLogger(jobName)

async function init() {
  log.info("starting:", jobName)
  log.info("querying for Rosetta team members")
  const scores = await rosetta.getTeamMembers()
  log.info("received", scores.length, "rosetta members")
  let dbTimer:Timer = new Timer()
  if (log.getLevel() < 2) dbTimer.start()
  for (const score of scores) {
    const result = await db.rosettaData.create({
      data: {
        rosettaId: score.id.toString(),
        name: score.name,
        credits: score.total_credits,
        time: new Date(),
        cpid: score.cpid
      }
    })
    log.debug("wrote Rosetta data to DB:", result)
  }
  log.info("finished writing Rosetta members to DB")
  if (log.getLevel() < 2) log.debug("DB write time ms:", dbTimer.stop().elapsed)
}

await init().catch(err => {
  log.error(err.toString())
  log.debug(err)
})
process.exit(0)

