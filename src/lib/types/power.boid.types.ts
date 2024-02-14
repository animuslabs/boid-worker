import type {
  Action,
  Float32Type,
  NameType,
  UInt16Type,
  UInt32Type,
  UInt64Type,
  UInt8Type
} from "@wharfkit/antelope"
import {
  ABI,
  Blob,
  Float32,
  Name,
  PublicKey,
  Struct,
  UInt16,
  UInt32,
  UInt64,
  UInt8
} from "@wharfkit/antelope"
import type { ActionOptions, ContractArgs, PartialBy, Table } from "@wharfkit/contract"
import { Contract as BaseContract } from "@wharfkit/contract"
export const abiBlob = Blob.from(
  "DmVvc2lvOjphYmkvMS4yAEIHQWNjb3VudAAKB2JvaWRfaWQEbmFtZQZvd25lcnMGbmFtZVtdBGF1dGgLQWNjb3VudEF1dGgIc3BvbnNvcnMGbmFtZVtdBXN0YWtlDEFjY291bnRTdGFrZQVwb3dlcgxBY2NvdW50UG93ZXIEdGVhbQtBY2NvdW50VGVhbQdiYWxhbmNlBnVpbnQzMgtuZnRfYmFsYW5jZQZ1aW50MTYLcmVjb3ZlcmFibGUEYm9vbAtBY2NvdW50QXV0aAACBGtleXMMcHVibGljX2tleVtdBW5vbmNlBXVpbnQ4DkFjY291bnRCb29zdGVyAAQOcHdyX211bHRpcGxpZXIFdWludDgRcHdyX2FkZF9wZXJfcm91bmQGdWludDE2DWV4cGlyZXNfcm91bmQGdWludDE2F2FnZ3JlZ2F0ZV9wd3JfcmVtYWluaW5nBnVpbnQzMgxBY2NvdW50UG93ZXIABRJsYXN0X2NsYWltZWRfcm91bmQGdWludDE2EGxhc3RfYWRkZWRfcm91bmQGdWludDE2BnJhdGluZwZ1aW50MzIHaGlzdG9yeQh1aW50MTZbXQRtb2RzEEFjY291bnRCb29zdGVyW10MQWNjb3VudFN0YWtlAAMJdW5zdGFraW5nDlRva2VuVW5zdGFrZVtdC3NlbGZfc3Rha2VkBnVpbnQzMhhyZWNlaXZlZF9kZWxlZ2F0ZWRfc3Rha2UGdWludDE2C0FjY291bnRUZWFtAAQHdGVhbV9pZAV1aW50OA9sYXN0X2VkaXRfcm91bmQGdWludDE2DXRlYW1fdGF4X211bHQFdWludDgcdGVhbV9jdW11bGF0aXZlX2NvbnRyaWJ1dGlvbgZ1aW50MzIQQ29sbGF0ZXJhbENvbmZpZwACI29yYWNsZV9jb2xsYXRlcmFsX2RlcG9zaXRfaW5jcmVtZW50BnVpbnQzMhlvcmFjbGVfY29sbGF0ZXJhbF9taW5pbXVtBnVpbnQzMgZDb25maWcADAdhY2NvdW50DUNvbmZpZ0FjY291bnQFcG93ZXILQ29uZmlnUG93ZXIEbWludApDb25maWdNaW50BHRlYW0KQ29uZmlnVGVhbQVzdGFrZQtDb25maWdTdGFrZQR0aW1lCkNvbmZpZ1RpbWUEYXV0aApDb25maWdBdXRoA25mdAlDb25maWdOZnQGcGF1c2VkBGJvb2wOYWxsb3dfZGVwb3NpdHMEYm9vbBFhbGxvd193aXRoZHJhd2FscwRib29sD3JlY292ZXJ5QWNjb3VudARuYW1lDUNvbmZpZ0FjY291bnQACQxpbnZpdGVfcHJpY2UGdWludDMyFnByZW1pdW1fcHVyY2hhc2VfcHJpY2UGdWludDMyEm1heF9wcmVtaXVtX3ByZWZpeAV1aW50OAptYXhfb3duZXJzBXVpbnQ4DG1heF9ib29zdGVycwV1aW50OBBzdWZmaXhfd2hpdGVsaXN0Bm5hbWVbXRRyZW1vdmVfc3BvbnNvcl9wcmljZQZ1aW50MzIYc3BvbnNvcl9tYXhfaW52aXRlX2NvZGVzBXVpbnQ4GWludml0ZV9jb2RlX2V4cGlyZV9yb3VuZHMGdWludDE2CkNvbmZpZ0F1dGgABRVrZXlfYWN0aW9uc193aGl0ZWxpc3QGbmFtZVtdFWtleV9hY2NvdW50X21heF9zdGFrZQZ1aW50MzIXa2V5X2FjY291bnRfbWF4X2JhbGFuY2UGdWludDMyEGFjY291bnRfbWF4X2tleXMFdWludDgad29ya2VyX21heF9iaWxsX3Blcl9hY3Rpb24GdWludDMyCkNvbmZpZ01pbnQAAhhyb3VuZF9wb3dlcmVkX3N0YWtlX211bHQHZmxvYXQzMhByb3VuZF9wb3dlcl9tdWx0B2Zsb2F0MzIJQ29uZmlnTmZ0AAIUYm9pZF9pZF9tYXhpbXVtX25mdHMGdWludDE2FXdoaXRlbGlzdF9jb2xsZWN0aW9ucwZuYW1lW10LQ29uZmlnUG93ZXIABRBzcG9uc29yX3RheF9tdWx0B2Zsb2F0MzIScG93ZXJlZF9zdGFrZV9tdWx0B2Zsb2F0MzIcY2xhaW1fbWF4aW11bV9lbGFwc2VkX3JvdW5kcwZ1aW50MTYQc29mdF9tYXhfcHdyX2FkZAZ1aW50MTYUaGlzdG9yeV9zbG90c19sZW5ndGgFdWludDgLQ29uZmlnU3Rha2UAAg51bnN0YWtlX3JvdW5kcwV1aW50OB1leHRyYV9zdGFrZV9taW5fbG9ja2VkX3JvdW5kcwV1aW50OApDb25maWdUZWFtAAYRY2hhbmdlX21pbl9yb3VuZHMGdWludDE2FGVkaXRfdGVhbV9taW5fcm91bmRzBnVpbnQxNhh0ZWFtX2VkaXRfbWF4X3BjdF9jaGFuZ2UGdWludDE2DWJ1eV90ZWFtX2Nvc3QGdWludDMyFG93bmVyX3N0YWtlX3JlcXVpcmVkBnVpbnQzMidvd25lcl9mdXR1cmVfc3Rha2VfbG9ja19yb3VuZHNfcmVxdWlyZWQGdWludDE2CkNvbmZpZ1RpbWUAAhxyb3VuZHNfc3RhcnRfc2VjX3NpbmNlX2Vwb2NoBnVpbnQzMhByb3VuZF9sZW5ndGhfc2VjBnVpbnQzMg9Db25zZW5zdXNDb25maWcAAwptaW5fd2VpZ2h0BnVpbnQzMg5taW5fd2VpZ2h0X3BjdAdmbG9hdDMyE21lcmdlX2RldmlhdGlvbl9wY3QHZmxvYXQzMg1HbG9iYWxSZXBvcnRzAAQGbWVyZ2VkBnVpbnQ2NBd1bnJlcG9ydGVkX2FuZF91bm1lcmdlZAZ1aW50NjQIcmVwb3J0ZWQGdWludDY0CHByb3Bvc2VkBnVpbnQ2NAZPcmFjbGUABgdhY2NvdW50BG5hbWUGd2VpZ2h0BXVpbnQ4CmNvbGxhdGVyYWwQT3JhY2xlQ29sbGF0ZXJhbAVmdW5kcwtPcmFjbGVGdW5kcwdzdGFuZGJ5BGJvb2wZbGFzdF9zdGFuZGJ5X3RvZ2dsZV9yb3VuZAZ1aW50MTYQT3JhY2xlQ29sbGF0ZXJhbAAFBmxvY2tlZAZ1aW50MzIJdW5sb2NraW5nBnVpbnQzMgdzbGFzaGVkBnVpbnQzMhV1bmxvY2tfZmluaXNoZWRfcm91bmQGdWludDE2Fm1pbl91bmxvY2tfc3RhcnRfcm91bmQGdWludDE2C09yYWNsZUZ1bmRzAAQHY2xhaW1lZAZ1aW50MzIJdW5jbGFpbWVkBnVpbnQzMgt3aXRoZHJhd2luZwZ1aW50MzIYd2l0aGRyYXdhYmxlX2FmdGVyX3JvdW5kBnVpbnQxNgpPcmFjbGVTdGF0AAQFcm91bmQGdWludDE2BndlaWdodAV1aW50OAdyZXBvcnRzB1JlcG9ydHMJcHJvY2Vzc2VkBGJvb2wNUGF5bWVudENvbmZpZwAFIWNvbGxhdGVyYWxfcGN0X3BheV9wZXJfcm91bmRfbXVsdAdmbG9hdDMyF3JvdW5kX2JvbnVzX3BheV9yZXBvcnRzBnVpbnQzMhhyb3VuZF9ib251c19wYXlfcHJvcG9zZWQGdWludDMyG3JlcG9ydHNfcHJvcG9zZWRfYWRqdXN0X3B3cgdmbG9hdDMyF251bV9vcmFjbGVzX2FkanVzdF9iYXNlB2Zsb2F0MzIIUHJvdG9jb2wABAtwcm90b2NvbF9pZAZ1aW50NjQNcHJvdG9jb2xfbmFtZQRuYW1lDXVuaXRQb3dlck11bHQHZmxvYXQzMgZhY3RpdmUEYm9vbAlQd3JDb25maWcADAZwYXVzZWQEYm9vbAljb25zZW5zdXMPQ29uc2Vuc3VzQ29uZmlnB3BheW1lbnQNUGF5bWVudENvbmZpZwhzbGFzaExvdwtTbGFzaENvbmZpZwhzbGFzaE1lZAtTbGFzaENvbmZpZwlzbGFzaEhpZ2gLU2xhc2hDb25maWcFd2FpdHMKV2FpdENvbmZpZwpjb2xsYXRlcmFsEENvbGxhdGVyYWxDb25maWcZa2VlcF9maW5hbGl6ZWRfc3RhdHNfcm93cwZ1aW50MzIec3RhbmRieV90b2dnbGVfaW50ZXJ2YWxfcm91bmRzBnVpbnQxNh5taW5fcGF5X3JlcG9ydF9zaGFyZV90aHJlc2hvbGQHZmxvYXQzMiNyZXBvcnRzX2FjY3VtdWxhdGVfd2VpZ2h0X3JvdW5kX3BjdAdmbG9hdDMyCVB3ckdsb2JhbAAHDmFjdGl2ZV9vcmFjbGVzBm5hbWVbXRdleHBlY3RlZF9hY3RpdmVfb3JhY2xlcwZuYW1lW10Pc3RhbmRieV9vcmFjbGVzBXVpbnQ4FmV4cGVjdGVkX2FjdGl2ZV93ZWlnaHQGdWludDE2B3JlcG9ydHMNR2xvYmFsUmVwb3J0cwxyZXdhcmRzX3BhaWQGdWludDY0DWFjdGl2ZV93ZWlnaHQGdWludDE2CVB3clJlcG9ydAADC3Byb3RvY29sX2lkBXVpbnQ4BXJvdW5kBnVpbnQxNgV1bml0cwZ1aW50MzIMUHdyUmVwb3J0Um93AAYIcHJvcG9zZXIEbmFtZQZyZXBvcnQJUHdyUmVwb3J0CWFwcHJvdmFscwZuYW1lW10PYXBwcm92YWxfd2VpZ2h0BnVpbnQxNghyZXBvcnRlZARib29sBm1lcmdlZARib29sB1B3clN0YXQABwVyb3VuZAZ1aW50MTYPc3RhcnRpbmdfZ2xvYmFsCVB3ckdsb2JhbBdyZXBvcnRlZF9zaW5jZV9wcmV2aW91cwZ1aW50MzIidW5yZXBvcnRlZF91bm1lcmdlZF9zaW5jZV9wcmV2aW91cwZ1aW50MzIXcHJvcG9zZWRfc2luY2VfcHJldmlvdXMGdWludDMyF3Jld2FyZGVkX3NpbmNlX3ByZXZpb3VzBnVpbnQzMh12YWxpZF9wcm9wb3NlZF9zaW5jZV9wcmV2aW91cwZ1aW50MzIHUmVwb3J0cwADCHByb3Bvc2VkBnVpbnQzMhJyZXBvcnRlZF9vcl9tZXJnZWQGdWludDMyE3VucmVwb3J0ZWRfdW5tZXJnZWQGdWludDMyC1JvdW5kQ29tbWl0AAQPcm91bmRfY29tbWl0X2lkBnVpbnQ2NAtwcm90b2NvbF9pZAV1aW50OAVyb3VuZAZ1aW50MTYHYm9pZF9pZARuYW1lC1NsYXNoQ29uZmlnAAIVc2xhc2hfcXVhbnRpdHlfc3RhdGljBnVpbnQzMh1zbGFzaF9xdWFudGl0eV9jb2xsYXRlcmFsX3BjdAdmbG9hdDMyDFRva2VuVW5zdGFrZQACFnJlZGVlbWFibGVfYWZ0ZXJfcm91bmQGdWludDE2CHF1YW50aXR5BnVpbnQzMgpXYWl0Q29uZmlnAAIUd2l0aGRyYXdfcm91bmRzX3dhaXQGdWludDE2HWNvbGxhdGVyYWxfdW5sb2NrX3dhaXRfcm91bmRzBnVpbnQxNgxjb21taXRzY2xlYW4AAQVzY29wZQRuYW1lC2NvbmZpZ2NsZWFyAAAJY29uZmlnc2V0AAEGY29uZmlnCVB3ckNvbmZpZwpmaW5hbHJvdW5kAAAMZmluaXNocmVwb3J0AAINYm9pZF9pZF9zY29wZQRuYW1lDHB3cnJlcG9ydF9pZAZ1aW50NjQLZ2xvYmFsY2xlYXIAAAxtZXJnZXJlcG9ydHMAAg1ib2lkX2lkX3Njb3BlBG5hbWUNcHdycmVwb3J0X2lkcwh1aW50NjRbXQxvcmFjbGRlcG9zaXQAAgZvcmFjbGUEbmFtZQ9kZXBvc2l0UXVhbnRpdHkGdWludDMyDG9yYWNsZXNjbGVhcgAACW9yYWNsZXNldAADBm9yYWNsZQRuYW1lBndlaWdodAV1aW50OBFhZGRpbmdfY29sbGF0ZXJhbAZ1aW50MzILb3N0YXRzY2xlYW4AAQVzY29wZQRuYW1lCXBheW9yYWNsZQAEBm9yYWNsZQRuYW1lB2Jhc2VQYXkGdWludDMyCGJvbnVzUGF5BnVpbnQzMgVyb3VuZAZ1aW50MTYLcGF5b3V0cm91bmQAAgZvcmFjbGUEbmFtZQVyb3VuZAZ1aW50MTYKcHJvdG9jbGVhcgAACHByb3Rvc2V0AAEIcHJvdG9jb2wIUHJvdG9jb2wJcHdycmVwb3J0AAMGb3JhY2xlBG5hbWUNYm9pZF9pZF9zY29wZQRuYW1lBnJlcG9ydAlQd3JSZXBvcnQMcmVwb3J0c2NsZWFuAAEFc2NvcGUEbmFtZQxyZXBvcnRzY2xlYXIAAQVzY29wZQRuYW1lCnJvdW5kc3RhdHMAAApzZXRzdGFuZGJ5AAIGb3JhY2xlBG5hbWUHc3RhbmRieQRib29sCXNldHdlaWdodAACBm9yYWNsZQRuYW1lBndlaWdodAV1aW50OAlzbGFzaGhpZ2gAAQZvcmFjbGUEbmFtZQhzbGFzaGxvdwABBm9yYWNsZQRuYW1lCHNsYXNobWVkAAEGb3JhY2xlBG5hbWULc2xhc2hvcmFjbGUAAgZvcmFjbGUEbmFtZQhxdWFudGl0eQZ1aW50MzIKc3RhdHNjbGVhbgAACnN0YXRzY2xlYXIAAAl0aGlzcm91bmQAAAZ1bmxvY2sAAQZvcmFjbGUEbmFtZQp1bmxvY2tpbml0AAEGb3JhY2xlBG5hbWUId2l0aGRyYXcAAQZvcmFjbGUEbmFtZQx3aXRoZHJhd2luaXQAAQZvcmFjbGUEbmFtZSAwjYoIZyclRQxjb21taXRzY2xlYW4AAK5RETG3JkULY29uZmlnY2xlYXIAAADICjO3JkUJY29uZmlnc2V0AABAmpreaKZbCmZpbmFscm91bmQAkC+t6jbsplsMZmluaXNocmVwb3J0AACuURFFc2hkC2dsb2JhbGNsZWFyAIDzpVVdxa6SDG1lcmdlcmVwb3J0cwCQHaZVpYjMpQxvcmFjbGRlcG9zaXQAcI2KCKuIzKUMb3JhY2xlc2NsZWFyAAAAyAqriMylCW9yYWNsZXNldAAAplER4Wwypgtvc3RhdHNjbGVhbgAAAFARmUu9qQlwYXlvcmFjbGUAANLU9GZNvakLcGF5b3V0cm91bmQAAMA1KiKa6a0KcHJvdG9jbGVhcgAAAABZYZrprQhwcm90b3NldAAAAMiXVnUvrwlwd3JyZXBvcnQAMI2KCOdLq7oMcmVwb3J0c2NsZWFuAHCNigjnS6u6DHJlcG9ydHNjbGVhcgAAAM4m4zQ1vQpyb3VuZHN0YXRzAACAP2majLPCCnNldHN0YW5kYnkAAADIjTnFs8IJc2V0d2VpZ2h0AAAAaMy1hk3ECXNsYXNoaGlnaAAAAACcxoZNxAhzbGFzaGxvdwAAAABJyYZNxAhzbGFzaG1lZAAAVETm0oZNxAtzbGFzaG9yYWNsZQAAwDQqIpxNxgpzdGF0c2NsZWFuAADANSoinE3GCnN0YXRzY2xlYXIAAABIU9OLXcsJdGhpc3JvdW5kAAAAAABAROPUBnVubG9jawAAQHbTQUTj1Ap1bmxvY2tpbml0AAAAANzc1LLjCHdpdGhkcmF3AJDddNzc1LLjDHdpdGhkcmF3aW5pdAAKAAAAOE9NETIDaTY0AAAHQWNjb3VudAAAc2tSlBw9A2k2NAAABkNvbmZpZwAAAAAwtyZFA2k2NAAACVB3ckNvbmZpZwAAAABEc2hkA2k2NAAACVB3ckdsb2JhbAAAAACriMylA2k2NAAABk9yYWNsZQBwNhmriMylA2k2NAAACk9yYWNsZVN0YXQAAMCRIprprQNpNjQAAAhQcm90b2NvbAAAzpdWdS+vA2k2NAAADFB3clJlcG9ydFJvdwCyk5KiNDW9A2k2NAAAC1JvdW5kQ29tbWl0AAAAAACcTcYDaTY0AAAHUHdyU3RhdAAAAAAA"
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Struct.type("AccountAuth")
    export class AccountAuth extends Struct {
        @Struct.field(PublicKey, { array: true })
          keys!:PublicKey[]

        @Struct.field(UInt8)
          nonce!:UInt8
    }
    @Struct.type("TokenUnstake")
    export class TokenUnstake extends Struct {
        @Struct.field(UInt16)
          redeemable_after_round!:UInt16

        @Struct.field(UInt32)
          quantity!:UInt32
    }
    @Struct.type("AccountStake")
    export class AccountStake extends Struct {
        @Struct.field(TokenUnstake, { array: true })
          unstaking!:TokenUnstake[]

        @Struct.field(UInt32)
          self_staked!:UInt32

        @Struct.field(UInt16)
          received_delegated_stake!:UInt16
    }
    @Struct.type("AccountBooster")
    export class AccountBooster extends Struct {
        @Struct.field(UInt8)
          pwr_multiplier!:UInt8

        @Struct.field(UInt16)
          pwr_add_per_round!:UInt16

        @Struct.field(UInt16)
          expires_round!:UInt16

        @Struct.field(UInt32)
          aggregate_pwr_remaining!:UInt32
    }
    @Struct.type("AccountPower")
    export class AccountPower extends Struct {
        @Struct.field(UInt16)
          last_claimed_round!:UInt16

        @Struct.field(UInt16)
          last_added_round!:UInt16

        @Struct.field(UInt32)
          rating!:UInt32

        @Struct.field(UInt16, { array: true })
          history!:UInt16[]

        @Struct.field(AccountBooster, { array: true })
          mods!:AccountBooster[]
    }
    @Struct.type("AccountTeam")
    export class AccountTeam extends Struct {
        @Struct.field(UInt8)
          team_id!:UInt8

        @Struct.field(UInt16)
          last_edit_round!:UInt16

        @Struct.field(UInt8)
          team_tax_mult!:UInt8

        @Struct.field(UInt32)
          team_cumulative_contribution!:UInt32
    }
    @Struct.type("Account")
    export class Account extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Name, { array: true })
          owners!:Name[]

        @Struct.field(AccountAuth)
          auth!:AccountAuth

        @Struct.field(Name, { array: true })
          sponsors!:Name[]

        @Struct.field(AccountStake)
          stake!:AccountStake

        @Struct.field(AccountPower)
          power!:AccountPower

        @Struct.field(AccountTeam)
          team!:AccountTeam

        @Struct.field(UInt32)
          balance!:UInt32

        @Struct.field(UInt16)
          nft_balance!:UInt16

        @Struct.field("bool")
          recoverable!:boolean
    }
    @Struct.type("CollateralConfig")
    export class CollateralConfig extends Struct {
        @Struct.field(UInt32)
          oracle_collateral_deposit_increment!:UInt32

        @Struct.field(UInt32)
          oracle_collateral_minimum!:UInt32
    }
    @Struct.type("ConfigAccount")
    export class ConfigAccount extends Struct {
        @Struct.field(UInt32)
          invite_price!:UInt32

        @Struct.field(UInt32)
          premium_purchase_price!:UInt32

        @Struct.field(UInt8)
          max_premium_prefix!:UInt8

        @Struct.field(UInt8)
          max_owners!:UInt8

        @Struct.field(UInt8)
          max_boosters!:UInt8

        @Struct.field(Name, { array: true })
          suffix_whitelist!:Name[]

        @Struct.field(UInt32)
          remove_sponsor_price!:UInt32

        @Struct.field(UInt8)
          sponsor_max_invite_codes!:UInt8

        @Struct.field(UInt16)
          invite_code_expire_rounds!:UInt16
    }
    @Struct.type("ConfigPower")
    export class ConfigPower extends Struct {
        @Struct.field(Float32)
          sponsor_tax_mult!:Float32

        @Struct.field(Float32)
          powered_stake_mult!:Float32

        @Struct.field(UInt16)
          claim_maximum_elapsed_rounds!:UInt16

        @Struct.field(UInt16)
          soft_max_pwr_add!:UInt16

        @Struct.field(UInt8)
          history_slots_length!:UInt8
    }
    @Struct.type("ConfigMint")
    export class ConfigMint extends Struct {
        @Struct.field(Float32)
          round_powered_stake_mult!:Float32

        @Struct.field(Float32)
          round_power_mult!:Float32
    }
    @Struct.type("ConfigTeam")
    export class ConfigTeam extends Struct {
        @Struct.field(UInt16)
          change_min_rounds!:UInt16

        @Struct.field(UInt16)
          edit_team_min_rounds!:UInt16

        @Struct.field(UInt16)
          team_edit_max_pct_change!:UInt16

        @Struct.field(UInt32)
          buy_team_cost!:UInt32

        @Struct.field(UInt32)
          owner_stake_required!:UInt32

        @Struct.field(UInt16)
          owner_future_stake_lock_rounds_required!:UInt16
    }
    @Struct.type("ConfigStake")
    export class ConfigStake extends Struct {
        @Struct.field(UInt8)
          unstake_rounds!:UInt8

        @Struct.field(UInt8)
          extra_stake_min_locked_rounds!:UInt8
    }
    @Struct.type("ConfigTime")
    export class ConfigTime extends Struct {
        @Struct.field(UInt32)
          rounds_start_sec_since_epoch!:UInt32

        @Struct.field(UInt32)
          round_length_sec!:UInt32
    }
    @Struct.type("ConfigAuth")
    export class ConfigAuth extends Struct {
        @Struct.field(Name, { array: true })
          key_actions_whitelist!:Name[]

        @Struct.field(UInt32)
          key_account_max_stake!:UInt32

        @Struct.field(UInt32)
          key_account_max_balance!:UInt32

        @Struct.field(UInt8)
          account_max_keys!:UInt8

        @Struct.field(UInt32)
          worker_max_bill_per_action!:UInt32
    }
    @Struct.type("ConfigNft")
    export class ConfigNft extends Struct {
        @Struct.field(UInt16)
          boid_id_maximum_nfts!:UInt16

        @Struct.field(Name, { array: true })
          whitelist_collections!:Name[]
    }
    @Struct.type("Config")
    export class Config extends Struct {
        @Struct.field(ConfigAccount)
          account!:ConfigAccount

        @Struct.field(ConfigPower)
          power!:ConfigPower

        @Struct.field(ConfigMint)
          mint!:ConfigMint

        @Struct.field(ConfigTeam)
          team!:ConfigTeam

        @Struct.field(ConfigStake)
          stake!:ConfigStake

        @Struct.field(ConfigTime)
          time!:ConfigTime

        @Struct.field(ConfigAuth)
          auth!:ConfigAuth

        @Struct.field(ConfigNft)
          nft!:ConfigNft

        @Struct.field("bool")
          paused!:boolean

        @Struct.field("bool")
          allow_deposits!:boolean

        @Struct.field("bool")
          allow_withdrawals!:boolean

        @Struct.field(Name)
          recoveryAccount!:Name
    }
    @Struct.type("ConsensusConfig")
    export class ConsensusConfig extends Struct {
        @Struct.field(UInt32)
          min_weight!:UInt32

        @Struct.field(Float32)
          min_weight_pct!:Float32

        @Struct.field(Float32)
          merge_deviation_pct!:Float32
    }
    @Struct.type("GlobalReports")
    export class GlobalReports extends Struct {
        @Struct.field(UInt64)
          merged!:UInt64

        @Struct.field(UInt64)
          unreported_and_unmerged!:UInt64

        @Struct.field(UInt64)
          reported!:UInt64

        @Struct.field(UInt64)
          proposed!:UInt64
    }
    @Struct.type("OracleCollateral")
    export class OracleCollateral extends Struct {
        @Struct.field(UInt32)
          locked!:UInt32

        @Struct.field(UInt32)
          unlocking!:UInt32

        @Struct.field(UInt32)
          slashed!:UInt32

        @Struct.field(UInt16)
          unlock_finished_round!:UInt16

        @Struct.field(UInt16)
          min_unlock_start_round!:UInt16
    }
    @Struct.type("OracleFunds")
    export class OracleFunds extends Struct {
        @Struct.field(UInt32)
          claimed!:UInt32

        @Struct.field(UInt32)
          unclaimed!:UInt32

        @Struct.field(UInt32)
          withdrawing!:UInt32

        @Struct.field(UInt16)
          withdrawable_after_round!:UInt16
    }
    @Struct.type("Oracle")
    export class Oracle extends Struct {
        @Struct.field(Name)
          account!:Name

        @Struct.field(UInt8)
          weight!:UInt8

        @Struct.field(OracleCollateral)
          collateral!:OracleCollateral

        @Struct.field(OracleFunds)
          funds!:OracleFunds

        @Struct.field("bool")
          standby!:boolean

        @Struct.field(UInt16)
          last_standby_toggle_round!:UInt16
    }
    @Struct.type("Reports")
    export class Reports extends Struct {
        @Struct.field(UInt32)
          proposed!:UInt32

        @Struct.field(UInt32)
          reported_or_merged!:UInt32

        @Struct.field(UInt32)
          unreported_unmerged!:UInt32
    }
    @Struct.type("OracleStat")
    export class OracleStat extends Struct {
        @Struct.field(UInt16)
          round!:UInt16

        @Struct.field(UInt8)
          weight!:UInt8

        @Struct.field(Reports)
          reports!:Reports

        @Struct.field("bool")
          processed!:boolean
    }
    @Struct.type("PaymentConfig")
    export class PaymentConfig extends Struct {
        @Struct.field(Float32)
          collateral_pct_pay_per_round_mult!:Float32

        @Struct.field(UInt32)
          round_bonus_pay_reports!:UInt32

        @Struct.field(UInt32)
          round_bonus_pay_proposed!:UInt32

        @Struct.field(Float32)
          reports_proposed_adjust_pwr!:Float32

        @Struct.field(Float32)
          num_oracles_adjust_base!:Float32
    }
    @Struct.type("Protocol")
    export class Protocol extends Struct {
        @Struct.field(UInt64)
          protocol_id!:UInt64

        @Struct.field(Name)
          protocol_name!:Name

        @Struct.field(Float32)
          unitPowerMult!:Float32

        @Struct.field("bool")
          active!:boolean
    }
    @Struct.type("SlashConfig")
    export class SlashConfig extends Struct {
        @Struct.field(UInt32)
          slash_quantity_static!:UInt32

        @Struct.field(Float32)
          slash_quantity_collateral_pct!:Float32
    }
    @Struct.type("WaitConfig")
    export class WaitConfig extends Struct {
        @Struct.field(UInt16)
          withdraw_rounds_wait!:UInt16

        @Struct.field(UInt16)
          collateral_unlock_wait_rounds!:UInt16
    }
    @Struct.type("PwrConfig")
    export class PwrConfig extends Struct {
        @Struct.field("bool")
          paused!:boolean

        @Struct.field(ConsensusConfig)
          consensus!:ConsensusConfig

        @Struct.field(PaymentConfig)
          payment!:PaymentConfig

        @Struct.field(SlashConfig)
          slashLow!:SlashConfig

        @Struct.field(SlashConfig)
          slashMed!:SlashConfig

        @Struct.field(SlashConfig)
          slashHigh!:SlashConfig

        @Struct.field(WaitConfig)
          waits!:WaitConfig

        @Struct.field(CollateralConfig)
          collateral!:CollateralConfig

        @Struct.field(UInt32)
          keep_finalized_stats_rows!:UInt32

        @Struct.field(UInt16)
          standby_toggle_interval_rounds!:UInt16

        @Struct.field(Float32)
          min_pay_report_share_threshold!:Float32

        @Struct.field(Float32)
          reports_accumulate_weight_round_pct!:Float32
    }
    @Struct.type("PwrGlobal")
    export class PwrGlobal extends Struct {
        @Struct.field(Name, { array: true })
          active_oracles!:Name[]

        @Struct.field(Name, { array: true })
          expected_active_oracles!:Name[]

        @Struct.field(UInt8)
          standby_oracles!:UInt8

        @Struct.field(UInt16)
          expected_active_weight!:UInt16

        @Struct.field(GlobalReports)
          reports!:GlobalReports

        @Struct.field(UInt64)
          rewards_paid!:UInt64

        @Struct.field(UInt16)
          active_weight!:UInt16
    }
    @Struct.type("PwrReport")
    export class PwrReport extends Struct {
        @Struct.field(UInt8)
          protocol_id!:UInt8

        @Struct.field(UInt16)
          round!:UInt16

        @Struct.field(UInt32)
          units!:UInt32
    }
    @Struct.type("PwrReportRow")
    export class PwrReportRow extends Struct {
        @Struct.field(Name)
          proposer!:Name

        @Struct.field(PwrReport)
          report!:PwrReport

        @Struct.field(Name, { array: true })
          approvals!:Name[]

        @Struct.field(UInt16)
          approval_weight!:UInt16

        @Struct.field("bool")
          reported!:boolean

        @Struct.field("bool")
          merged!:boolean
    }
    @Struct.type("PwrStat")
    export class PwrStat extends Struct {
        @Struct.field(UInt16)
          round!:UInt16

        @Struct.field(PwrGlobal)
          starting_global!:PwrGlobal

        @Struct.field(UInt32)
          reported_since_previous!:UInt32

        @Struct.field(UInt32)
          unreported_unmerged_since_previous!:UInt32

        @Struct.field(UInt32)
          proposed_since_previous!:UInt32

        @Struct.field(UInt32)
          rewarded_since_previous!:UInt32

        @Struct.field(UInt32)
          valid_proposed_since_previous!:UInt32
    }
    @Struct.type("RoundCommit")
    export class RoundCommit extends Struct {
        @Struct.field(UInt64)
          round_commit_id!:UInt64

        @Struct.field(UInt8)
          protocol_id!:UInt8

        @Struct.field(UInt16)
          round!:UInt16

        @Struct.field(Name)
          boid_id!:Name
    }
    @Struct.type("commitsclean")
    export class commitsclean extends Struct {
        @Struct.field(Name)
          scope!:Name
    }
    @Struct.type("configclear")
    export class configclear extends Struct {}
    @Struct.type("configset")
    export class configset extends Struct {
        @Struct.field(PwrConfig)
          config!:PwrConfig
    }
    @Struct.type("finalround")
    export class finalround extends Struct {}
    @Struct.type("finishreport")
    export class finishreport extends Struct {
        @Struct.field(Name)
          boid_id_scope!:Name

        @Struct.field(UInt64)
          pwrreport_id!:UInt64
    }
    @Struct.type("globalclear")
    export class globalclear extends Struct {}
    @Struct.type("mergereports")
    export class mergereports extends Struct {
        @Struct.field(Name)
          boid_id_scope!:Name

        @Struct.field(UInt64, { array: true })
          pwrreport_ids!:UInt64[]
    }
    @Struct.type("oracldeposit")
    export class oracldeposit extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(UInt32)
          depositQuantity!:UInt32
    }
    @Struct.type("oraclesclear")
    export class oraclesclear extends Struct {}
    @Struct.type("oracleset")
    export class oracleset extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(UInt8)
          weight!:UInt8

        @Struct.field(UInt32)
          adding_collateral!:UInt32
    }
    @Struct.type("ostatsclean")
    export class ostatsclean extends Struct {
        @Struct.field(Name)
          scope!:Name
    }
    @Struct.type("payoracle")
    export class payoracle extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(UInt32)
          basePay!:UInt32

        @Struct.field(UInt32)
          bonusPay!:UInt32

        @Struct.field(UInt16)
          round!:UInt16
    }
    @Struct.type("payoutround")
    export class payoutround extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(UInt16)
          round!:UInt16
    }
    @Struct.type("protoclear")
    export class protoclear extends Struct {}
    @Struct.type("protoset")
    export class protoset extends Struct {
        @Struct.field(Protocol)
          protocol!:Protocol
    }
    @Struct.type("pwrreport")
    export class pwrreport extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(Name)
          boid_id_scope!:Name

        @Struct.field(PwrReport)
          report!:PwrReport
    }
    @Struct.type("reportsclean")
    export class reportsclean extends Struct {
        @Struct.field(Name)
          scope!:Name
    }
    @Struct.type("reportsclear")
    export class reportsclear extends Struct {
        @Struct.field(Name)
          scope!:Name
    }
    @Struct.type("roundstats")
    export class roundstats extends Struct {}
    @Struct.type("setstandby")
    export class setstandby extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field("bool")
          standby!:boolean
    }
    @Struct.type("setweight")
    export class setweight extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(UInt8)
          weight!:UInt8
    }
    @Struct.type("slashhigh")
    export class slashhigh extends Struct {
        @Struct.field(Name)
          oracle!:Name
    }
    @Struct.type("slashlow")
    export class slashlow extends Struct {
        @Struct.field(Name)
          oracle!:Name
    }
    @Struct.type("slashmed")
    export class slashmed extends Struct {
        @Struct.field(Name)
          oracle!:Name
    }
    @Struct.type("slashoracle")
    export class slashoracle extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(UInt32)
          quantity!:UInt32
    }
    @Struct.type("statsclean")
    export class statsclean extends Struct {}
    @Struct.type("statsclear")
    export class statsclear extends Struct {}
    @Struct.type("thisround")
    export class thisround extends Struct {}
    @Struct.type("unlock")
    export class unlock extends Struct {
        @Struct.field(Name)
          oracle!:Name
    }
    @Struct.type("unlockinit")
    export class unlockinit extends Struct {
        @Struct.field(Name)
          oracle!:Name
    }
    @Struct.type("withdraw")
    export class withdraw extends Struct {
        @Struct.field(Name)
          oracle!:Name
    }
    @Struct.type("withdrawinit")
    export class withdrawinit extends Struct {
        @Struct.field(Name)
          oracle!:Name
    }
}
export const TableMap = {
  accounts: Types.Account,
  boidconfig: Types.Config,
  config: Types.PwrConfig,
  global: Types.PwrGlobal,
  oracles: Types.Oracle,
  oraclestats: Types.OracleStat,
  protocols: Types.Protocol,
  pwrreports: Types.PwrReportRow,
  roundcommit: Types.RoundCommit,
  stats: Types.PwrStat
}
export interface TableTypes {
    accounts:Types.Account
    boidconfig:Types.Config
    config:Types.PwrConfig
    global:Types.PwrGlobal
    oracles:Types.Oracle
    oraclestats:Types.OracleStat
    protocols:Types.Protocol
    pwrreports:Types.PwrReportRow
    roundcommit:Types.RoundCommit
    stats:Types.PwrStat
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {
        export interface PwrConfig {
            paused:boolean
            consensus:Type.ConsensusConfig
            payment:Type.PaymentConfig
            slashLow:Type.SlashConfig
            slashMed:Type.SlashConfig
            slashHigh:Type.SlashConfig
            waits:Type.WaitConfig
            collateral:Type.CollateralConfig
            keep_finalized_stats_rows:UInt32Type
            standby_toggle_interval_rounds:UInt16Type
            min_pay_report_share_threshold:Float32Type
            reports_accumulate_weight_round_pct:Float32Type
        }
        export interface ConsensusConfig {
            min_weight:UInt32Type
            min_weight_pct:Float32Type
            merge_deviation_pct:Float32Type
        }
        export interface PaymentConfig {
            collateral_pct_pay_per_round_mult:Float32Type
            round_bonus_pay_reports:UInt32Type
            round_bonus_pay_proposed:UInt32Type
            reports_proposed_adjust_pwr:Float32Type
            num_oracles_adjust_base:Float32Type
        }
        export interface SlashConfig {
            slash_quantity_static:UInt32Type
            slash_quantity_collateral_pct:Float32Type
        }
        export interface WaitConfig {
            withdraw_rounds_wait:UInt16Type
            collateral_unlock_wait_rounds:UInt16Type
        }
        export interface CollateralConfig {
            oracle_collateral_deposit_increment:UInt32Type
            oracle_collateral_minimum:UInt32Type
        }
        export interface Protocol {
            protocol_id:UInt64Type
            protocol_name:NameType
            unitPowerMult:Float32Type
            active:boolean
        }
        export interface PwrReport {
            protocol_id:UInt8Type
            round:UInt16Type
            units:UInt32Type
        }
    }
    export interface commitsclean {
        scope:NameType
    }
    export interface configclear {}
    export interface configset {
        config:Type.PwrConfig
    }
    export interface finalround {}
    export interface finishreport {
        boid_id_scope:NameType
        pwrreport_id:UInt64Type
    }
    export interface globalclear {}
    export interface mergereports {
        boid_id_scope:NameType
        pwrreport_ids:UInt64Type[]
    }
    export interface oracldeposit {
        oracle:NameType
        depositQuantity:UInt32Type
    }
    export interface oraclesclear {}
    export interface oracleset {
        oracle:NameType
        weight:UInt8Type
        adding_collateral:UInt32Type
    }
    export interface ostatsclean {
        scope:NameType
    }
    export interface payoracle {
        oracle:NameType
        basePay:UInt32Type
        bonusPay:UInt32Type
        round:UInt16Type
    }
    export interface payoutround {
        oracle:NameType
        round:UInt16Type
    }
    export interface protoclear {}
    export interface protoset {
        protocol:Type.Protocol
    }
    export interface pwrreport {
        oracle:NameType
        boid_id_scope:NameType
        report:Type.PwrReport
    }
    export interface reportsclean {
        scope:NameType
    }
    export interface reportsclear {
        scope:NameType
    }
    export interface roundstats {}
    export interface setstandby {
        oracle:NameType
        standby:boolean
    }
    export interface setweight {
        oracle:NameType
        weight:UInt8Type
    }
    export interface slashhigh {
        oracle:NameType
    }
    export interface slashlow {
        oracle:NameType
    }
    export interface slashmed {
        oracle:NameType
    }
    export interface slashoracle {
        oracle:NameType
        quantity:UInt32Type
    }
    export interface statsclean {}
    export interface statsclear {}
    export interface thisround {}
    export interface unlock {
        oracle:NameType
    }
    export interface unlockinit {
        oracle:NameType
    }
    export interface withdraw {
        oracle:NameType
    }
    export interface withdrawinit {
        oracle:NameType
    }
}
export interface ActionNameParams {
    commitsclean:ActionParams.commitsclean
    configclear:ActionParams.configclear
    configset:ActionParams.configset
    finalround:ActionParams.finalround
    finishreport:ActionParams.finishreport
    globalclear:ActionParams.globalclear
    mergereports:ActionParams.mergereports
    oracldeposit:ActionParams.oracldeposit
    oraclesclear:ActionParams.oraclesclear
    oracleset:ActionParams.oracleset
    ostatsclean:ActionParams.ostatsclean
    payoracle:ActionParams.payoracle
    payoutround:ActionParams.payoutround
    protoclear:ActionParams.protoclear
    protoset:ActionParams.protoset
    pwrreport:ActionParams.pwrreport
    reportsclean:ActionParams.reportsclean
    reportsclear:ActionParams.reportsclear
    roundstats:ActionParams.roundstats
    setstandby:ActionParams.setstandby
    setweight:ActionParams.setweight
    slashhigh:ActionParams.slashhigh
    slashlow:ActionParams.slashlow
    slashmed:ActionParams.slashmed
    slashoracle:ActionParams.slashoracle
    statsclean:ActionParams.statsclean
    statsclear:ActionParams.statsclear
    thisround:ActionParams.thisround
    unlock:ActionParams.unlock
    unlockinit:ActionParams.unlockinit
    withdraw:ActionParams.withdraw
    withdrawinit:ActionParams.withdrawinit
}
export type ActionNames = keyof ActionNameParams
export class Contract extends BaseContract {
  constructor(args:PartialBy<ContractArgs, "abi" | "account">) {
    super({
      client: args.client,
      abi,
      account: args.account || Name.from("power.boid")
    })
  }

  action<T extends ActionNames>(
    name:T,
    data:ActionNameParams[T],
    options?:ActionOptions
  ):Action {
    return super.action(name, data, options)
  }

  table<T extends TableNames>(name:T, scope?:NameType):Table<RowType<T>> {
    return super.table(name, scope, TableMap[name])
  }
}
