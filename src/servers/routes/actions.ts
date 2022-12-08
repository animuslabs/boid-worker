import { Action } from "@greymass/eosio"
import { FahData, InviteCode, InviteCodeUsed } from "@prisma/client"
import db from "lib/db"
import { doAction, getAbi } from "lib/eosio"
import { ipfsClient, jsonToBytes, jsonToCID } from "lib/ipfs"
import { AccountEdit, Auth } from "lib/types/boid.system"
import { CID } from "multiformats/cid"
import { z } from "zod"
import { route } from "../trpc"

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
    for (const action of data.input.actions) {
      if (action.name == "account.edit") {
        // console.log(action)
        const action = Action.from(data.input.actions[0] as any, await getAbi(data.input.actions[0].account))
        const editData = action.decodeData(AccountEdit)
        const cid = CID.decode(editData.ipfs_meta.array)
        console.log("CID:", cid.toString())
        const acctMeta = data.input.additional?.accountMeta
        if (!acctMeta) throw new Error("missing account metadata")
        const result = await ipfsClient.add(await jsonToBytes(acctMeta))
        const pinned = result.cid
        console.log("Pinned CID:", pinned.toString())
        if (!pinned.equals(cid)) throw new Error("account metadata mismatch")
      }
    }
    const result = await doAction("auth", Auth.from(data.input), "boid")
    console.log(result)
    return { result, receipt: result?.receipts[0] }
  })
