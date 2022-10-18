import { initTRPC } from "@trpc/server"
const t = initTRPC.create()
export default t
export const route = t.procedure
