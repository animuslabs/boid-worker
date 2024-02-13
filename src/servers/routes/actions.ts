import { Action } from "@wharfkit/antelope"
import { doAction, getAbi } from "lib/eosio"
import { ipfsClient, jsonToBytes } from "lib/ipfs"
import { Types } from "lib/types/boid-contract-structure"
import { CID } from "multiformats/cid"
import { z } from "zod"
import { route } from "../trpc"
import logger from "lib/logger"
const log = logger.getLogger("actions")

export const pushActions = route
  .input(z.object({
    actions: z.array(z.object({
      account: z.string(),
      name: z.string(),
      authorization: z.array(z.any()),
      data: z.any()
    }).passthrough()).nonempty(),
    boid_id: z.string(),
    keyIndex: z.number(),
    sig: z.string(),
    expires_utc_sec: z.number(),
    additional: z.object({
      accountMeta: z.object({}).passthrough().optional(),
      teamMeta: z.object({}).passthrough().optional()
    }).passthrough().optional()
  }))
  .mutation(async(data) => {
    const action = data.input.actions[0]
    if (!action) throw new Error("Invalid number of actions")
    // if (action.name == "account.edit") {
    // console.log(action)
    //   const action = Action.from(data.input.actions[0] as any, await getAbi(data.input.actions[0].account))
    //   const editData = action.decodeData(AccountEdit)
    //   const cid = CID.decode(editData.meta.array)
    //   console.log("CID:", cid.toString())
    //   const acctMeta = data.input.additional?.accountMeta
    //   if (!acctMeta) throw new Error("missing account metadata")
    //   const result = await ipfsClient.add(await jsonToBytes(acctMeta))
    //   const pinned = result.cid
    //   console.log("Pinned CID:", pinned.toString())
    //   if (!pinned.equals(cid)) throw new Error("account metadata mismatch")
    // }
    const result = await doAction("auth", Types.auth.from(data.input), "boid")
    console.log(result)
    return { result, receipt: result?.receipts[0] }
  })
