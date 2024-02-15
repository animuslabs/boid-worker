import ax from "axios"
import { parseString } from "xml2js"
const teamId = 36190
const queryString = `https://boinc.bakerlab.org/rosetta/team_email_list.php?teamid=${teamId}&xml=1`

type RosettaMember = {
  id:number
  cpid:string
  total_credits:number
  name:string
}

export const rosetta = {
  async getTeamMembers() {
    const response = await ax.get(queryString)
    let donors:RosettaMember[] = []
    parseString(response.data, (err, arg) => {
      if (err) throw new Error(err)
      console.log(arg.users.user)
      donors = arg.users.user.map(el => {
        const data:RosettaMember = {
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

// const result = await rosetta.getTeamMembers()
// console.log("top member:", result)
