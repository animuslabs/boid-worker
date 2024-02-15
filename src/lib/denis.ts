import ax from "axios"
import { parseString } from "xml2js"
const teamId = 11420
const queryString = `https://denis.usj.es/denisathome/team_email_list.php?teamid=${teamId}&xml=1`

type DenisMember = {
  id:number
  cpid:string
  total_credits:number
  name:string
}

export const denis = {
  async getTeamMembers() {
    const response = await ax.get(queryString, { timeout: 15000 })
    let donors:DenisMember[] = []
    parseString(response.data, (err, arg) => {
      if (err) throw new Error(err)
      console.log(arg.users.user)
      donors = arg.users.user.map(el => {
        const data:DenisMember = {
          id: el.id[0],
          cpid: el.cpid[0],
          total_credits: parseInt(el.total_credit[0]),
          name: el.name[0]
        }
        return data
      })
    })
    return donors
  }
}

// const result = await denis.getTeamMembers()
// console.log("top member:", result)
