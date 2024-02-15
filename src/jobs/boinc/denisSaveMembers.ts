import ax from "axios"
import db from "lib/db"
import logger from "lib/logger"
import { denis } from "lib/denis"
import { Timer } from "lib/timer"
const jobName = "denis:saveMembers"
const log = logger.getLogger(jobName)

async function init() {
  log.info("starting:", jobName)
  log.info("querying for denis team members")
  const scores = await denis.getTeamMembers()
  log.info("received", scores.length, "dennis members")
  let dbTimer:Timer = new Timer()
  if (log.getLevel() < 2) dbTimer.start()
  for (const score of scores) {
    const result = await db.denisData.create({
      data: {
        denisId: score.id.toString(),
        name: score.name,
        credits: score.total_credits,
        time: new Date(),
        cpid: score.cpid
      }
    })
    log.debug("wrote denis data to DB:", result)
  }
  log.info("finished writing denis members to DB")
  if (log.getLevel() < 2) log.debug("DB write time ms:", dbTimer.stop().elapsed)
}

await init().catch(err => {
  log.error(err.toString())
  log.debug(err)
})
process.exit(0)

