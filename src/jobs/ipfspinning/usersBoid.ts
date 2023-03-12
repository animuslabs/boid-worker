import { TelosTestrpc } from "./eosio"
import { DoubleStringArray, TableByScope, AccMetaCID } from "./types"
import { CID } from "multiformats/cid"

// find out how many rows are in the table in boid main contract for acctmeta
const getRowCount = async():Promise<TableByScope> => {
  try {
    const getdata = await TelosTestrpc.get_table_by_scope(
      {
        code: "boid",
        table: "acctmeta",
        // lower_bound: "string",
        // upper_bound: "string",
        limit: 10,
        reverse: false,
        show_payer: false
      })
    // console.log("Number of rows in the table:", getdata.rows[0].count);
    return {
      code: getdata.rows[0].code,
      scope: getdata.rows[0].scope,
      table: getdata.rows[0].table,
      payer: getdata.rows[0].payer,
      count: getdata.rows[0].count
    }
  } catch (error) {
    console.error(error)
    throw error
  }
}
  
  
// get all table rows from boid main contract for acctmeta
const getAllTableData = async():Promise<DoubleStringArray> => {
  try {
    let lower_bound = null
    const getdata = await TelosTestrpc.get_table_rows({
      json: true,
      code: "boid",
      table: "acctmeta",
      scope: "boid",
      lower_bound,
      // upper_bound: 30,
      limit: 10000
    })
    // console.log("Get Account Metadata Information from chain (getAllTableData function):", getdata);
    if (getdata.rows.length === 0) {
      throw new Error("table is empty metadata")
    }
    // console.log("getdata function rows:", getdata.rows);
    return getdata.rows
  } catch (error) {
    console.error(error)
    throw error
  }
}
  

// compare the number of rows in the table to the number of rows returned from the table
const compareRowCount = async() => {
// console.log('getAllTableData()', await getAllTableData());
  const rowCount = (await getAllTableData()).length
  const rowCountFromTable = (await getRowCount()).count
  console.log(`Number of rows returned from the table: ${rowCount}`)
  console.log(`Number of rows that are in the table: ${rowCountFromTable}`)
  if (rowCount !== rowCountFromTable) {
    throw new Error("Number of rows does not match")
  }
}
compareRowCount()


// // get CID from hex data
async function datareturn():Promise<AccMetaCID[]> {
  try {
    const data = await getAllTableData()
    const getAccMeta = data.map((item:any) => {
      const hexString = (item.ipfs_meta)
      // console.log("Returns hexString information before change",hexString);
      function hexStringToUint8Array(hexString:string):Uint8Array {
        const data = hexString.match(/.{1,2}/g)
        if (!data) return new Uint8Array([])
        return hexString ? new Uint8Array(data.map(byte => parseInt(byte, 16))) : new Uint8Array([])
      }
      const cid2decode = CID.decode(hexStringToUint8Array(hexString))
      const cid:string = cid2decode.toString()
      // console.log("Exported CID record:",cid);
      return {
        boid_id: item.boid_id,
        ipfs_meta: cid
      }
    })
    // console.log("Result of getAccMeta function: ",getAccMeta);
    return getAccMeta
  } catch (e:any) {
    console.error(e)
    if (e.message === "boid_id not found in metadata") {
      return []
    } else {
      return []
    }
  }
}

// processed hex data in CID format
const dataincid = await datareturn()

// update data and return boid_id and ipfs_meta for pinning
async function boid_id_data(dataincid:AccMetaCID[]) {
  try {
    if (!Array.isArray(dataincid)) {
      throw new Error("Input is not an array")
    }
    if (dataincid.length === 0) {
      console.log("Input array is empty")
      return null
    }
    const updatedData = await Promise.all(dataincid.map(async(item) => {
      if (!item.ipfs_meta) {
        return { boid_id: item.boid_id, ipfs_meta: { links: [], media: [], text: [], extra: [] } }
      }
      const cid = item.ipfs_meta
      // console.log('boid_id_data function - updateData result cid: ', cid);
      return { boid_id: item.boid_id, ipfs_meta: cid }
    }))
    const updatedBoidIds = updatedData.map((item) => ({ boid_id: `${item.boid_id}`, ipfs_meta: item.ipfs_meta }))
    return updatedBoidIds
  } catch (error) {
    console.error(error)
    return null
  }
}

// export result of boid_id_data function to be used in pinning
export const dataFromBoidID:any = await boid_id_data(dataincid)
// console.log('Final result: ', dataFromBoidID);
