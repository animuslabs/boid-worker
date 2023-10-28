import { dbQuery } from "lib/queries"


const result = await dbQuery.getLastFahRecordofRound("seth.voice", {
  round: 6,
  start: new Date("2023-10-26T11:43:47.000Z"),
  end: new Date("2023-10-27T13:23:47.000Z")
})

console.log(result)

