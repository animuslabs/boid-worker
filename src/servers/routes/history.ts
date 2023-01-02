import { Action } from "@greymass/eosio"
import { FahData } from "@prisma/client"
import db, { Prisma } from "lib/db"
import { doAction, getAbi } from "lib/eosio"
import { ipfsClient, jsonToBytes, jsonToCID } from "lib/ipfs"
import { AccountEdit, Auth } from "lib/types/boid.system"
import { CID } from "multiformats/cid"
import * as z from "zod"
import { route } from "../trpc"
import Logger from "lib/logger"
import { getTableFromAction } from "lib/injest"
import ms from "ms"
const log = Logger.getLogger("history-api")

export const actions = route
  .input(z.object({
    actions: z.array(z.string()).nonempty(),
    start: z.date().optional(),
    end: z.date().optional(),
    sort: z.string().optional(),
    limit: z.number().lte(100).gt(0).optional(),
    filter: z.object({
      boid_id: z.string()
    }),
    skip: z.number().optional()
  }))
  .mutation(async({ ctx, input }) => {
    let rows:Record<string, any> = {}
    let where = {
      timeStamp: { gte: input.start ? input.start : new Date(Date.now() - ms("24h")) },
      AND: {
        timeStamp: { lte: input.end ? input.end : new Date() }
      }
    }
    if (input.filter) where = Object.assign(where, input.filter)
    if (input.skip) where = Object.assign(where, input.skip)

    for (const action of input.actions) {
      const table = getTableFromAction(action)
      const results = await db[table as any].findMany({ where, skip: input.skip, limit: input.limit ? input.limit : 10 })
      results.forEach(el => rows[el.sequence.toString()] = el)
    }
    let results = Object.values(rows)
    if (!input.sort || input.sort == "desc") results.sort((a, b) => a.timeStamp.getTime() - b.timeStamp.getTime())
    else if (input.sort == "asc") results.sort((a, b) => b.timeStamp.getTime() - a.timeStamp.getTime())
    else throw (new Error("invalid sort param, must be 'asc', 'desc' or not included"))
    return results
  })
