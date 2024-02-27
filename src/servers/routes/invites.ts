
import { doAction, sendAction } from "lib/eosio"
import { Types } from "lib/types/boid-contract-structure"
import { z } from "zod"
import { route } from "../trpc"
import getConfig from "lib/config"
const env = getConfig()

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
    const result = await doAction("invite.claim", Types.inviteclaim.from(input), env.contracts.system)
    return result
  })
