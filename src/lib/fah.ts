import ax from "axios"

const teamid = "238663"
const teamapi = `https://api2.foldingathome.org/team/${teamid}/members`

type FahApiData = {
  name:string
  id:number
  rank:number|null
  score:number
  wus:number
}

export const fah = {
  async getTeamMembers() {
    const response = await ax.get(teamapi)
    let donors = response.data.map((el:string[]) => {
      return {
        name: el[0].toLowerCase(),
        id: el[1],
        rank: el[2],
        score: el[3],
        wus: el[4]
      }
    })
    donors.shift()
    return donors as FahApiData[]
  }
}
