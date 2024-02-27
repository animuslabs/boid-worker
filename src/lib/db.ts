import { Prisma, PrismaClient } from "../../prisma/client"
import getConfig from "lib/config"
const env = getConfig()
const db = new PrismaClient({ errorFormat: "pretty", datasourceUrl: env.dburl })
export { Prisma }
export default db
