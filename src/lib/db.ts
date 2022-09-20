import * as prisma from "@prisma/client"
const db = new prisma.PrismaClient({ errorFormat: "pretty" })
export default db
