import { FahData, InviteCode, InviteCodeUsed } from "@prisma/client"
import { sysActions } from "lib/actions"
import db from "lib/db"
import { doAction, sendAction } from "lib/eosio"
import { tables } from "lib/queries"
import { AccountCreate, InviteClaim } from "lib/types/boid.system"
import { pushActions } from "servers/routes/actions"
import { z } from "zod"
import { route } from "../trpc"
import env from "lib/env"

export const claimInvite = route
  .input(
    z.object({
      sponsor_boid_id: z.string(),
      invite_code: z.number(),
      sig: z.string(),
      new_account: z.object({
        boid_id: z.string(),
        keys: z.array(z.string()),
        owners: z.array(z.string())
      })
    })
  )
  .mutation(async({ input, ctx }) => {
    console.log({ input, ctx })
    const result = await doAction("invite.claim", InviteClaim.from(input), env.contracts.system)
    return result
  })
