// import { pinAllToIpfs, pinnedRecordsToPin, createPinned } from "./pinCIDs"
import { pinAllToIpfs } from "./pinCIDs"
import { IPFSnodes } from "./links"
import {
  allEOSCollectionsTemplates,
  allWAXCollectionsTemplates,
  allTelosCollectionsTemplates
} from "./atomicData"
import { dataFromTeams } from "./teamsBoid"

// Schedule the function to run every x hours
const interval3 = 3 * 60 * 60 * 1000 // 3 hours in milliseconds
const interval4 = 4 * 60 * 60 * 1000 // 4 hours in milliseconds
const interval6 = 6 * 60 * 60 * 1000 // 6 hours in milliseconds

// this is when you don't want to use db and just pin everything to IPFS
const waxNameCids = allWAXCollectionsTemplates.map(({ name, CID }) => ({ name, CID }))
const eosNameCids = allEOSCollectionsTemplates.map(({ name, CID }) => ({ name, CID }))
const telosNameCids = allTelosCollectionsTemplates.map(({ name, CID }) => ({ name, CID }))

const runPinning = async() => {
  try {
    await pinAllToIpfs(dataFromTeams, IPFSnodes)
    await pinAllToIpfs(waxNameCids, IPFSnodes)
    await pinAllToIpfs(eosNameCids, IPFSnodes)
    await pinAllToIpfs(telosNameCids, IPFSnodes)
    console.log("All data pinned successfully")
  } catch (error) {
    console.error("Failed to pin data to IPFS:", error)
  }
}
runPinning()
setInterval(async() => {
  runPinning()
}, interval6)



// this section is for the version with the postgres db only
// setInterval(async() => {
//   try {
//     // this creates records in the db by taking them from the array from the allEOSCollectionsTemplates function (EOS collections)
//     for (const obj of allEOSCollectionsTemplates) {
//       await createPinned(obj.name, obj.CID, obj.datatype)
//     }
//     // this creates records in the db by taking them from the array from the allWAXCollectionsTemplates function (WAX collections)
//     for (const obj of allWAXCollectionsTemplates) {
//       await createPinned(obj.name, obj.CID, obj.datatype)
//     }
//     // // this creates records in the db by taking them from the array from the getTeamData function (team id's and their metadata)
//     for (const obj of dataFromTeams) {
//       await createPinned(obj.name, obj.CID, "JSON")
//     }
//     console.log("Successfully created pinned records in the database")
//   } catch (error) {
//     console.error("Error creating pinned records in the database:", error)
//   }
// }, interval3)

// // this pins all the records in the db to IPFS
// setInterval(async() => {
//   try {
//     await pinAllToIpfs(pinnedRecordsToPin, IPFSnodes)
//   } catch (error) {
//     console.log(error)
//   }
// }, interval4)



// // run straigt away everything and only once
// for (const obj of allEOSCollectionsTemplates) {
//   await createPinned(obj.name, obj.CID, obj.datatype);
// }
// // this creates records in the db by taking them from the array from the allWAXCollectionsTemplates function (WAX collections)
// for (const obj of allWAXCollectionsTemplates) {
//   await createPinned(obj.name, obj.CID, obj.datatype);
// }
// // // this creates records in the db by taking them from the array from the getTeamData function (team id's and their metadata)
// for (const obj of dataFromTeams) {
//   await createPinned(obj.name, obj.CID, "JSON");
// }
//   await pinAllToIpfs(pinnedRecordsToPin, IPFSnodes);
