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
    }).passthrough()).nonempty(),
    boid_id: z.string(),
    keyIndex: z.number(),
    sig: z.string(),
    expires_utc_sec: z.number(),
    additional: z.object({
      socialJson: z.object({}).passthrough().optional()
    }).passthrough().optional()
  }))
  .mutation(async(data) => {
    const result = await doAction("auth", Auth.from(data.input), "boid")
    console.log(result)
    return { result, receipt: result?.receipts[0] }
  })
