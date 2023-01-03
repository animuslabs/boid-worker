import db from "lib/db"
import { CID } from "multiformats"

// const result = await db.accountEdit.findMany({
//   "where": {
//     "timeStamp": {
//       "gte": "2022-10-05T04:20:24.255Z"
//     },
//     "AND": {
//       "timeStamp": {
//         "lte": "2023-01-03T04:20:24.364Z"
//       }
//     },
//     "boid_id": "trovi.oid"
//   },
//   "skip": 0,
//   "take": 100,
//   "orderBy": {
//     "sequence": "desc"
//   }
// }).catch(console.error)
// console.log(result)

const hexString = "1220977DB9EA97E36E5EA7DA565B519D08CD7A3B5FD33F22E5374DD9F5AFCE869739"

function hexStringToUint8Array(hexString:string):Uint8Array {
  const data = hexString.match(/.{1,2}/g)
  if (!data) return new Uint8Array([])
  return hexString ? new Uint8Array(data.map(byte => parseInt(byte, 16))) : new Uint8Array([])
}


const cid = CID.decode(hexStringToUint8Array(hexString))
console.log(cid.toString())
