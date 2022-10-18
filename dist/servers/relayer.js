// @filename: server.ts
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import Express from "express";
import cors from "cors";
import * as invites from "../servers/routes/invites.js";
import t from "../servers/trpc.js";
import { pushActions } from "../servers/routes/actions.js";
const app = Express();
const appRouter = t.router({
    pushActions,
    ...invites
});
app.use(cors());
app.use(createExpressMiddleware({ router: appRouter }));
app.listen(8017);
//# sourceMappingURL=relayer.js.map