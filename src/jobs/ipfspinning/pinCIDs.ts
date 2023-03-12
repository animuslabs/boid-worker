// get info from chain | push to db | pin to ipfs
import { MyResultType } from "./types"
// import { PinnedType, MyResultType } from "./types"
import { create } from "ipfs-http-client"
// import { PrismaClient } from "@prisma/client"

// create an instance of the prisma client
// const prisma = new PrismaClient()

// this will push the data to the database but check first if there is already a record with the same CID
// export async function createPinned(name:string, CID:string, datatype:string):Promise<PinnedType> {
//   const existingPinned = await prisma.pinned.findFirst({
//     where: {
//       CID
//     }
//   })

//   if (existingPinned) {
//     console.log(`Object with CID ${CID} already exists in the database.`)
//     return existingPinned
//   }

//   const newPinned = await prisma.pinned.create({
//     data: {
//       name,
//       CID,
//       active: true, // Set active to true by default
//       datatype,
//       size: 0 // Set size to 0 by default
//     }
//   })
//   console.log(`Created an object with ID: ${newPinned.index}`)
//   return newPinned
// }


// this will pin the data to ipfs unless it is already pinned on the node
const checkIfPinned = (cid:string, ipfs:{ name:string, url:string }, pinList:MyResultType[]) => {
  return pinList.some((pin:any) => pin.cid.toString() === cid.toString())
}

// this pins the data to ipfs
export const pinAllToIpfs = async(data:any[], ipfsNodes:{ name:string, url:string }[]) => {
  try {
    for (const ipfs of ipfsNodes) {
      const client = create({ url: ipfs.url })
      const pins = await client.pin.ls()
      const pinArray:MyResultType[] = []
      for await (const pin of pins) {
        pinArray.push({
          cid: pin.cid,
          pinType: pin.type as "recursive" | "direct"
        })
      }

      for (const item of data) {
        let isPinned = false
        try {
          const { name, CID } = item
          console.log(`Checking if ${name} is already pinned to IPFS at ${ipfs.url} with CID: ${CID}`)
          const isPinnedOnNode = checkIfPinned(CID, ipfs, pinArray)
          if (!isPinnedOnNode) {
            console.log(`Pinning ${name} to IPFS at ${ipfs.url} with CID: ${CID}`)
            const cid = await client.pin.add(CID, { recursive: true })
            console.log(`Pinned ${name} to IPFS at ${ipfs.url} with CID: ${cid}`)
            isPinned = true
          }
        } catch (error) {
          if (error instanceof ReferenceError && error.message.includes("name is not defined")) {
            console.error(`Failed to pin record to IPFS: ${error}`)
          } else {
            console.error(`Failed to pin ${name} to IPFS at ${ipfs.url}: ${error}`)
          }
        }
        if (!isPinned) {
          console.log(`${item.name} is already pinned to IPFS at ${ipfs.url}`)
        }
      }
    }
  } catch (error) {
    console.error(`Failed to pin to multiple IPFS nodes: ${error}`)
    // Optionally handle the error here (e.g. stop the entire pinning process)
  }
}


// this will read all the records from the db
// const pinnedRecords = await prisma.pinned.findMany()
// console.log('Pinned records:', pinnedRecords)

// this will format the data to be pinned to ipfs; name on the ipfs nodes will have datatype added to the original name
// export const pinnedRecordsToPin:any = pinnedRecords.map(record => ({
//   name: `${record.name}.${record.datatype}`,
//   CID: record.CID
// }))
// console.log('Pinned records to pin:', pinnedRecordsToPin)
