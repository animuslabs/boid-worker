import { Prisma, PrismaClient } from "../../prisma/client"
const db = new PrismaClient({ errorFormat: "pretty" })
export { Prisma }
export default db
