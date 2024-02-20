import { dbQuery } from "lib/queries"
import { throwErr } from "lib/utils"
import { parseString } from "xml2js"
import { XMLParser } from "fast-xml-parser"
import ms from "ms"
import axios from "axios"
import { log } from "console"


const data = await axios.get("https://einsteinathome.org/community/teams/230028/members")
const parsingOptions = {
  ignoreAttributes: false,
  // preserveOrder: true,
  unpairedTags: ["hr", "br", "link", "meta"],
  stopNodes: ["*.pre", "*.script"],
  processEntities: true,
  htmlEntities: true
}
const parser = new XMLParser(parsingOptions)
const htmlJson = parser.parse(data.data)
// log(JSON.stringify(htmlJson, null, 2))


type UserData = {
    name:string;
    credits?:string;
    id:string;
};

function extractUsersWithCredits(htmlJson:any):UserData[] {
  // Assuming the user data is always located in this specific path
  const userDataPath = htmlJson.html.body.div[0].div[1].div[0].div[0].div[1].div[0].div[0].div[0].div[0].div
  const users:UserData[] = []
  const creditsText = userDataPath[0].div[0].ul.li[0] // "Total credit: XX,XXX"
  const creditsPattern = /Total credit: ([\d,]+)/
  const creditsMatch = creditsPattern.exec(creditsText)
  let credits = creditsMatch ? creditsMatch[1] : undefined

  userDataPath[1].div.forEach((column:any) => {
    column.ul.li.forEach((li:any) => {
      if ("a" in li) {
        const user:UserData = {
          name: li.a["#text"],
          id: li.a["@_href"].split("/").pop()
        }
        if (credits) {
          user.credits = credits
        }
        // Only add user if they have credits
        if (user.credits) {
          users.push(user)
        }
      }
    })
  })

  return users
}

console.log(extractUsersWithCredits(htmlJson))

