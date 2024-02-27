import { log } from "console"
import { getAllRoundCommits, getOldestReport, getOldestRoundCommit, getPwrReport } from "lib/queries"
import { Types } from "lib/types/power.boid.types"
import { getReportId, toObject } from "lib/utils"

// const roundCommit = await getRoundCommit("boidworker11", Name.from("aerokossa.oid"), 0, 52)
// const roundCommit = await getOldestRoundCommit("boidworker11")
// const roundCommit = await getRoundCommitFromID(Name.from("boidworker12"), "2418825707512760199806976")
// log(roundCommit)

// const data = { oracle: "boidworker12", boid_id: "trovi.oid", round: 52, protocol_id: 2 }
// const action = pwrActions.roundCommit(data)
// const result = await computeAction(action.name, action.data, action.account)
// const result = await commitExists("boidworker12", "trovi.oid", 52, 2)
// log(result)


// function combineProtocolIdAndBoidId(protocol_id:number, boid_id:Name):UInt64 {
//   const protocolIdShifted = BigInt(protocol_id) << BigInt(56)

//   // Combine the shifted protocol_id with boid_id without shifting boid_id,
//   // assuming boid_id's significant content is in the lower bits and we want to preserve it.
//   const combinedId = protocolIdShifted | BigInt(boid_id.value.toString())

//   return UInt64.from(combinedId)
// }

// // const num = combineProtocolIdAndBoidId(3, name)
// // const num2 = combineProtocolIdAndBoidId(4, name)
// // console.log(num.toString())
// // console.log(num2.toString())

// const name = Name.from("a")
// const name2 = Name.from("b")
// console.log(name.value.toString())
// console.log(name2.value.toString())
// const result = await getOldestReport("boidworker11")
// console.log(toObject(result))
// process.exit(0)

// const id = getReportId(Types.PwrReport.from({ "protocol_id": 0, "round": 54, "units": 54053 }))
// log(id.toString())
// const report = await getPwrReport("brandonr.oid", id)
// log(toObject(report))


const allCommits = await getAllRoundCommits("work1.animus", 64)
log(toObject(allCommits))
