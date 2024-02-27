import GreenlockProxy from "greenlock-proxy"
import getConfig from "lib/config"
import logger from "lib/logger"
import events from "events"
const env = getConfig()
const log = logger.getLogger("proxy")

async function init() {
  if (!env.proxy) throw new Error("proxy settings missing from .env.json")
  try {
    let proxy = new GreenlockProxy({
      maintainerEmail: env.proxy.maintainerEmail,
      staging: false
    })
    for (const params of env.proxy.proxies) {
      proxy.register(params.external, params.internal)
    }
    // Start proxiyng
    proxy.start()
  } catch (error) {
    console.error("proxy error:", error)
    process.kill(process.pid)
  }
}

init()
