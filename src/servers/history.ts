import { createExpressMiddleware } from "@trpc/server/adapters/express"
import Express from "express"
import cors from "cors"
import * as invites from "servers/routes/invites"
import t from "servers/trpc"
import { pushActions } from "servers/routes/actions"
import getConfig from "lib/config"
import ms from "ms"
import blacklist from "express-blacklist"
import rateLimit from "express-rate-limit"
import { actions } from "servers/routes/history"
const env = getConfig()

if (!env.history) throw new Error(".env.json missing history config")

const app = Express()
app.set("trust proxy", 1)
app.use(blacklist.blockRequests("../blacklist.txt"))


const limiter = rateLimit({
  windowMs: ms("30m"),
  max: 100
})

const appRouter = t.router({
  actions
})

export type AppRouter = typeof appRouter;

app.use(cors())
app.use(limiter, createExpressMiddleware({ router: appRouter }))
app.listen(env.history?.port || 8018)

