import GreenlockProxy from "greenlock-proxy"
import logger from "lib/logger"
import fs from "fs-extra"

const log = logger.getLogger("proxy")
const config = fs.readJsonSync("../proxyConfig.json")

if (!config) throw new Error("no proxyConfig.json found in project root")

try {
  let proxy = new GreenlockProxy({
    maintainerEmail: config.maintainerEmail,
    staging: false
  })
  for (const params of config.proxies) {
    proxy.register(params.external, params.internal)
  }
  // Start proxiyng
  proxy.start()
} catch (error) {
  log.error("proxy error:", error)
  process.kill(process.pid)
}
