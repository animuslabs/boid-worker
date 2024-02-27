import { Prisma, PrismaClient } from "../../prisma/client"
import env from "./env"
const db = new PrismaClient({ errorFormat: "pretty", datasourceUrl: env.dburl })
export { Prisma }
export default db
