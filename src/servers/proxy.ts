import GreenlockProxy from "greenlock-proxy"
import env from "lib/env"
import logger from "lib/logger"
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
    proxy.register(["api.eospowerup.io"], ["http://localhost:3000"])
    proxy.register(["ipfs.eospowerup.io"], ["http://localhost:3333"])

    // Start proxiyng
    proxy.start()
  } catch (error) {
    console.error("proxy error:", error)
    process.kill(process.pid)
  }
}

init()
