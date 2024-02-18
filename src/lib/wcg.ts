import ax from "axios"
import db from "lib/db"
import logger from "lib/logger"
import { parseString } from "xml2js"
import { Prisma } from "../../prisma/client"

const log = logger.getLogger("wcg")
export type BoincData = Prisma.BoincDataCreateInput

export class Wcg {
  teamId:string = ""
  protocolId:number = 0
  constructor(teamId:string, protocolId:number) {
    this.teamId = teamId
    this.protocolId = protocolId
  }

  get url() {
    return `https://www.worldcommunitygrid.org/team/viewTeamMemberDetail.do?sort=name&teamId=${this.teamId}&xml=true`
  }

  async getMembers() {
    const response = await ax.get(this.url, { timeout: 15000 })
    let donors:BoincData[] = []
    parseString(response.data, (err, arg) => {
      if (err) throw new Error(err)
      donors = arg.TeamMemberDetails.TeamMember.map(el => {
        let credits = 0
        if (el.StatisticsTotals) credits = el?.StatisticsTotals[0].Points[0]
        else credits = 0
        log.debug(credits)
        const data:BoincData = {
          boincProtocolId: this.protocolId,
          cpid: el.MemberId[0],
          credits: BigInt(credits),
          name: el.Name[0]
        }
        return data
      })
    })
    return donors
  }

  async saveMembers(members:BoincData[]) {
    for (const data of members) {
      const result = await db.boincData.create({ data })
      log.debug("wrote WCG Data to DB:", result)
    }
  }
}

// const wcg = new Wcg("0FVBH11FK2", 5)
// const members = await wcg.saveMembers(await wcg.getMembers())
// log.debug(members)
