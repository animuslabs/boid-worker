// @filename: server.ts
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import Express from "express"
import cors from "cors"
import * as invites from "servers/routes/invites"
import t from "servers/trpc"
import { pushActions } from "servers/routes/actions"

const app = Express()

const appRouter = t.router({
  pushActions,
  ...invites
})

export type AppRouter = typeof appRouter;

app.use(cors())
app.use(createExpressMiddleware({ router: appRouter }))
app.listen(8017)
