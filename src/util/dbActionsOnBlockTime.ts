import fs from "fs-extra"
import db, { Prisma } from "lib/db"
import { actionMap } from "lib/injest"
import { parseISOString, toObject } from "lib/utils"


async function init(timeStamp:string) {
  if (!timeStamp || typeof timeStamp != "string") throw (new Error("must provide valid ISO timestamp"))
  const blockDate = parseISOString(timeStamp)
  let results:any[] = []
  for (let act of Object.keys(actionMap)) {
    let dbTable = act as Prisma.ModelName
    const query = { where: { timeStamp: { equals: timeStamp } } }
    const response = await db[dbTable].findMany(query)
    if (response) {
      response.forEach(el => {
        el.dbTable = act
        results.push(toObject(el))
      })
    }
  }
  const writeFile = "../actions-" + blockDate.toISOString() + ".json"
  fs.writeJsonSync(writeFile, results, { spaces: 2 })
  console.log(results)
  console.log("wrote to file:", writeFile)
}

const params = process.argv.slice(2)
init(params[0]).catch(console.error)
