import { Action } from "@greymass/eosio"
import { ActionPusher } from "lib/actionPusher"
import { actions } from "lib/actions"
import logger from "lib/logger"
import { getInviteScopes, getOldestOracleStat, getOldestReport, getOldestRoundCommit, getOracleStatsScopes, getReportScopes, getRoundCommitScopes, getStatRow, tables } from "lib/queries"
import { Config } from "lib/types/boid.system"
import { currentRound } from "lib/utils"
const log = logger.getLogger("pwr-cleanTables")
const pusher = new ActionPusher()

async function cleanInvites(config:Config, round:number) {
  const expireRounds = config.account.invite_code_expire_rounds
  const scopes = await getInviteScopes()
  for (const scope of scopes) {
    log.debug("checking:", scope.toString())
    const invites = await tables.sys.invites(scope)
    for (const invite of invites) {
      const expires = invite.created_round.toNumber() + expireRounds.toNumber()
      log.debug("invite expires round:", expires)
      if (expires > round) continue
      pusher.add(actions.sys.inviteRm({ sponsor_boid_id: scope, invite_code: invite.invite_code }))
    }
  }
}

async function init() {
  const config = await tables.sys.config()
  const round = Math.floor(await currentRound())
  log.info("starting cleanTables, current round:", round)
  await cleanInvites(config, round)
  pusher.stop()
}
init().catch(log.error)
