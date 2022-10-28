import { Action } from "@greymass/eosio"
import { FahData, InviteCode, InviteCodeUsed } from "@prisma/client"
import db from "lib/db"
import { doAction, getAbi } from "lib/eosio"
import { ipfsClient, jsonToBytes, jsonToCID } from "lib/ipfs"
import { AccountEdit, Auth } from "lib/types/boid.system"
import { z } from "zod"
import { route } from "../trpc"

export const pushActions = route
  .input(z.object({
    actions: z.array(z.object({
      account: z.string(),
      name: z.string(),
      authorization: z.array(z.any()),
      data: z.any()
    }).passthrough()).nonempty().length(1),
    boid_id: z.string(),
    keyIndex: z.number(),
    sig: z.string(),
    additional: z.object({
      socialJson: z.object({}).passthrough().optional()
    }).passthrough().optional()
  }))
  .mutation(async(data) => {
    if (data.input.actions[0].name == "account.edit") {
      try {
        const json = data.input.additional?.socialJson
        if (!json) throw new Error("missing")
        // console.log(data.input.actions[0])
        const abi = await getAbi(data.input.actions[0].account)
        const action = Action.from(data.input.actions[0] as any, await getAbi(data.input.actions[0].account))
        const actData = action.decodeData(AccountEdit)
        console.log(actData.social_ipfs_json.toString())
        console.log((await jsonToCID(json)).bytes)

        // if (actData.social_ipfs_json.toString() != (await jsonToCID(json)).bytes.toString()) throw new Error("json ipfs cid mismatch")
        const result = await ipfsClient.add(await jsonToBytes(json))
        console.log(result.cid.bytes.toString())
        const param = data.input
        const paramrdy = {
          boid_id: param.boid_id,
          actions: param.actions,
          sig: param.sig,
          keyIndex: param.keyIndex,
          expires_utc_sec: parseInt(((Date.now() / 1000) + 1000).toString())
        }
        console.log(paramrdy)

        const actResult = await doAction("auth", Auth.from(paramrdy), "boid")
        console.log(actResult)

        return { success: true, receipt: actResult?.receipts[0] }
      } catch (error) {
        console.log(error)
        // return { success: false }
        throw error
      }
    } else {
      const actResult = await doAction("auth", Auth.from(data.input), "boid")
      return { success: true, receipt: actResult?.receipts[0] }
    }
  })
