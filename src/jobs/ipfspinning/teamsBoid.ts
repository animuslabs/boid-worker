import { RPCendpoints } from "./eosio"
import { DoubleStringArray, TeamDataRes } from "./types"
import { CID } from "multiformats/cid"
import { teamNames } from "./links"
import { JsonRpc } from "eosjs"

const TelosTestRPC = RPCendpoints[2]
// get info from the smart contract about teams
const getTeamData = async(RPCendpoint:JsonRpc):Promise<DoubleStringArray> => {
  try {
    const getdata = await RPCendpoint.get_table_rows({
      json: true,
      code: "boid",
      table: "teams",
      scope: "boid",
      lower_bound: "",
      upper_bound: "",
      limit: 10
    })
    // console.log("getdata function rows:", getdata.rows);
    return getdata.rows
  } catch (error) {
    console.error(error)
    throw error
  }
}

// console.log("getTeamData function rows:", getTeamData(TelosTestRPC));


// // get CID from hex data
async function datareturn():Promise<TeamDataRes[]> {
  try {
    const data = await getTeamData(TelosTestRPC)
    const getTeamMeta = data.map((item:any) => {
      const hexString = (item.team_meta_ipfs)
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
        team_id: item.team_id,
        balance: item.balance,
        stake: {
          unstaking: item.stake.unstaking,
          self_staked: item.stake.self_staked,
          received_delegated_stake: item.stake.received_delegated_stake
        },
        owner: item.owner,
        managers: item.managers,
        min_pwr_tax_mult: item.min_pwr_tax_mult,
        owner_cut_mult: item.owner_cut_mult,
        url_safe_name: item.url_safe_name,
        power: item.power,
        members: item.members,
        last_edit_round: item.last_edit_round,
        team_meta_ipfs: cid
      }
    })
    return getTeamMeta
  } catch (e:any) {
    console.error(e)
    if (e.message === "teams not found in metadata") {
      return []
    } else {
      return []
    }
  }
}
    
// // processed hex data in CID format
const dataincid = datareturn()
// console.log("dataincid function rows:", dataincid);
    
// update data and return name and CID for pinning
async function teamsData(dataincid:TeamDataRes[]) {
  try {
    if (!Array.isArray(dataincid)) {
      throw new Error("Input is not an array")
    }
    if (dataincid.length === 0) {
      console.log("Input array is empty")
      return null
    }
    const updatedData = await Promise.all(dataincid.map(async(item) => {
      if (!item.team_meta_ipfs) {
        console.log("Team has no meta")
        return null
      }
      const cid = item.team_meta_ipfs
      return { name: teamNames[0].name, CID: cid }
    }))
    return updatedData
  } catch (error) {
    console.error(error)
    return null
  }
}

// export result of teamsData function to be used in pinning
export const dataFromTeams:any = await teamsData(await dataincid)
// console.log('Final result: ', dataFromTeams);
