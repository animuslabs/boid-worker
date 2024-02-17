import { Types } from "lib/types/power.boid.types"
import ax from "axios"
import { throwErr } from "lib/utils"
import { getProtocolRow, getStatRow } from "lib/queries"
import { Prisma } from "../../prisma/client"
import { parseString } from "xml2js"
import logger from "lib/logger"
import db from "lib/db"

const log = logger.getLogger("boinc")
export type BoincData = Prisma.BoincDataCreateInput

export class Boinc {
  boincMeta:Types.BoincMeta
  protocolRow:Types.Protocol|null = null

  constructor(boincMeta:Types.BoincMeta) {
    this.boincMeta = boincMeta
  }

  async init() {
    const protocolRow = await getProtocolRow(this.boincMeta.protocol_id)
    this.protocolRow = protocolRow
    return this
  }

  async getMembers() {
    if (!this.protocolRow) throwErr("must load protocol first, call .init()")
    const queryString = `${this.boincMeta.url}team_email_list.php?teamid=${this.boincMeta.teamId}&xml=1`
    const response = await ax.get(queryString, { timeout: 15000 })
    let donors:BoincData[] = []
    parseString(response.data, (err, arg) => {
      if (err) throw new Error(err)
      console.log(arg.users.user)
      donors = arg.users.user.map(el => {
        if (!this.protocolRow) throwErr("boinc protocol must be found")
        const data:BoincData = {
          boincProtocolId: this.boincMeta.protocol_id.toNumber(),
          cpid: el.cpid[0],
          credits: BigInt(parseInt(el.total_credit[0])),
          name: el.name[0]
        }
        return data
      })
    })
    return donors
  }

  async saveMembers(members:BoincData[]) {
    for (const data of members) {
      const result = await db.boincData.create({ data })
      log.debug("wrote Boinc Data to DB:", result)
    }
  }
}
