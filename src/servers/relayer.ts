// @filename: server.ts
import { createExpressMiddleware } from "@trpc/server/adapters/express"
import Express from "express"
import cors from "cors"
import * as invites from "servers/routes/invites"
import t from "servers/trpc"
import { pushActions } from "servers/routes/actions"
import env from "lib/env"
import ms from "ms"
import blacklist from "express-blacklist"
import rateLimit from "express-rate-limit"

if (!env.relayer) throw new Error(".env.json missing relayer config")

const app = Express()
app.set("trust proxy", 1)
app.use(blacklist.blockRequests("../blacklist.txt"))

const limiter = rateLimit({
  windowMs: ms("30m"),
  max: 100
})

const appRouter = t.router({
  pushActions,
  ...invites
})

export type AppRouter = typeof appRouter;

app.use(cors())
app.use(limiter, createExpressMiddleware({ router: appRouter }))
app.listen(env.relayer?.port || 8017)
