import type {
  Action,
  BytesType,
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
  Bytes,
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
  "DmVvc2lvOjphYmkvMS4yAEcHQWNjb3VudAAKB2JvaWRfaWQEbmFtZQZvd25lcnMGbmFtZVtdBGF1dGgLQWNjb3VudEF1dGgIc3BvbnNvcnMGbmFtZVtdBXN0YWtlDEFjY291bnRTdGFrZQVwb3dlcgxBY2NvdW50UG93ZXIEdGVhbQtBY2NvdW50VGVhbQdiYWxhbmNlBnVpbnQzMgtuZnRfYmFsYW5jZQZ1aW50MTYLcmVjb3ZlcmFibGUEYm9vbAtBY2NvdW50QXV0aAACBGtleXMMcHVibGljX2tleVtdBW5vbmNlBXVpbnQ4DkFjY291bnRCb29zdGVyAAQOcHdyX211bHRpcGxpZXIFdWludDgRcHdyX2FkZF9wZXJfcm91bmQGdWludDE2DWV4cGlyZXNfcm91bmQGdWludDE2F2FnZ3JlZ2F0ZV9wd3JfcmVtYWluaW5nBnVpbnQzMgxBY2NvdW50UG93ZXIABRJsYXN0X2NsYWltZWRfcm91bmQGdWludDE2EGxhc3RfYWRkZWRfcm91bmQGdWludDE2BnJhdGluZwZ1aW50MTYHaGlzdG9yeQh1aW50MTZbXQhib29zdGVycxBBY2NvdW50Qm9vc3RlcltdDEFjY291bnRTdGFrZQADCXVuc3Rha2luZw5Ub2tlblVuc3Rha2VbXQtzZWxmX3N0YWtlZAZ1aW50MzIYcmVjZWl2ZWRfZGVsZWdhdGVkX3N0YWtlBnVpbnQxNgtBY2NvdW50VGVhbQAEB3RlYW1faWQFdWludDgPbGFzdF9lZGl0X3JvdW5kBnVpbnQxNg10ZWFtX3RheF9tdWx0BXVpbnQ4HHRlYW1fY3VtdWxhdGl2ZV9jb250cmlidXRpb24GdWludDMyCUJvaW5jTWV0YQAEC3Byb3RvY29sX2lkBnVpbnQ2NAN1cmwGc3RyaW5nBnRlYW1JZAZ1aW50NjQEbWV0YQVieXRlcxBDb2xsYXRlcmFsQ29uZmlnAAIjb3JhY2xlX2NvbGxhdGVyYWxfZGVwb3NpdF9pbmNyZW1lbnQGdWludDMyGW9yYWNsZV9jb2xsYXRlcmFsX21pbmltdW0GdWludDMyBkNvbmZpZwAMB2FjY291bnQNQ29uZmlnQWNjb3VudAVwb3dlcgtDb25maWdQb3dlcgRtaW50CkNvbmZpZ01pbnQEdGVhbQpDb25maWdUZWFtBXN0YWtlC0NvbmZpZ1N0YWtlBHRpbWUKQ29uZmlnVGltZQRhdXRoCkNvbmZpZ0F1dGgDbmZ0CUNvbmZpZ05mdAZwYXVzZWQEYm9vbA5hbGxvd19kZXBvc2l0cwRib29sEWFsbG93X3dpdGhkcmF3YWxzBGJvb2wPcmVjb3ZlcnlBY2NvdW50BG5hbWUNQ29uZmlnQWNjb3VudAAJDGludml0ZV9wcmljZQZ1aW50MzIWcHJlbWl1bV9wdXJjaGFzZV9wcmljZQZ1aW50MzISbWF4X3ByZW1pdW1fcHJlZml4BXVpbnQ4Cm1heF9vd25lcnMFdWludDgMbWF4X2Jvb3N0ZXJzBXVpbnQ4EHN1ZmZpeF93aGl0ZWxpc3QGbmFtZVtdFHJlbW92ZV9zcG9uc29yX3ByaWNlBnVpbnQzMhhzcG9uc29yX21heF9pbnZpdGVfY29kZXMFdWludDgZaW52aXRlX2NvZGVfZXhwaXJlX3JvdW5kcwZ1aW50MTYKQ29uZmlnQXV0aAAFFWtleV9hY3Rpb25zX3doaXRlbGlzdAZuYW1lW10Va2V5X2FjY291bnRfbWF4X3N0YWtlBnVpbnQzMhdrZXlfYWNjb3VudF9tYXhfYmFsYW5jZQZ1aW50MzIQYWNjb3VudF9tYXhfa2V5cwV1aW50OBp3b3JrZXJfbWF4X2JpbGxfcGVyX2FjdGlvbgZ1aW50MzIKQ29uZmlnTWludAACGHJvdW5kX3Bvd2VyZWRfc3Rha2VfbXVsdAdmbG9hdDMyEHJvdW5kX3Bvd2VyX211bHQHZmxvYXQzMglDb25maWdOZnQAAhRib2lkX2lkX21heGltdW1fbmZ0cwZ1aW50MTYVd2hpdGVsaXN0X2NvbGxlY3Rpb25zBm5hbWVbXQtDb25maWdQb3dlcgAFEHNwb25zb3JfdGF4X211bHQHZmxvYXQzMhJwb3dlcmVkX3N0YWtlX211bHQHZmxvYXQzMhxjbGFpbV9tYXhpbXVtX2VsYXBzZWRfcm91bmRzBnVpbnQxNhBzb2Z0X21heF9wd3JfYWRkBnVpbnQxNhRoaXN0b3J5X3Nsb3RzX2xlbmd0aAV1aW50OAtDb25maWdTdGFrZQACDnVuc3Rha2Vfcm91bmRzBXVpbnQ4HWV4dHJhX3N0YWtlX21pbl9sb2NrZWRfcm91bmRzBXVpbnQ4CkNvbmZpZ1RlYW0ABhFjaGFuZ2VfbWluX3JvdW5kcwZ1aW50MTYUZWRpdF90ZWFtX21pbl9yb3VuZHMGdWludDE2GHRlYW1fZWRpdF9tYXhfcGN0X2NoYW5nZQZ1aW50MTYNYnV5X3RlYW1fY29zdAZ1aW50MzIUb3duZXJfc3Rha2VfcmVxdWlyZWQGdWludDMyJ293bmVyX2Z1dHVyZV9zdGFrZV9sb2NrX3JvdW5kc19yZXF1aXJlZAZ1aW50MTYKQ29uZmlnVGltZQACHHJvdW5kc19zdGFydF9zZWNfc2luY2VfZXBvY2gGdWludDMyEHJvdW5kX2xlbmd0aF9zZWMGdWludDMyD0NvbnNlbnN1c0NvbmZpZwADCm1pbl93ZWlnaHQGdWludDMyDm1pbl93ZWlnaHRfcGN0B2Zsb2F0MzITbWVyZ2VfZGV2aWF0aW9uX3BjdAdmbG9hdDMyBk9yYWNsZQAGB2FjY291bnQEbmFtZQZ3ZWlnaHQFdWludDgKY29sbGF0ZXJhbBBPcmFjbGVDb2xsYXRlcmFsBWZ1bmRzC09yYWNsZUZ1bmRzB3N0YW5kYnkEYm9vbBlsYXN0X3N0YW5kYnlfdG9nZ2xlX3JvdW5kBnVpbnQxNhBPcmFjbGVDb2xsYXRlcmFsAAUGbG9ja2VkBnVpbnQzMgl1bmxvY2tpbmcGdWludDMyB3NsYXNoZWQGdWludDMyFXVubG9ja19maW5pc2hlZF9yb3VuZAZ1aW50MTYWbWluX3VubG9ja19zdGFydF9yb3VuZAZ1aW50MTYLT3JhY2xlRnVuZHMABAdjbGFpbWVkBnVpbnQzMgl1bmNsYWltZWQGdWludDMyC3dpdGhkcmF3aW5nBnVpbnQzMhh3aXRoZHJhd2FibGVfYWZ0ZXJfcm91bmQGdWludDE2Ck9yYWNsZVN0YXQABAVyb3VuZAZ1aW50MTYGd2VpZ2h0BXVpbnQ4B3JlcG9ydHMHUmVwb3J0cwlwcm9jZXNzZWQEYm9vbA1QYXltZW50Q29uZmlnAAUhY29sbGF0ZXJhbF9wY3RfcGF5X3Blcl9yb3VuZF9tdWx0B2Zsb2F0MzIXcm91bmRfYm9udXNfcGF5X3JlcG9ydHMGdWludDMyGHJvdW5kX2JvbnVzX3BheV9wcm9wb3NlZAZ1aW50MzIbcmVwb3J0c19wcm9wb3NlZF9hZGp1c3RfcHdyB2Zsb2F0MzIXbnVtX29yYWNsZXNfYWRqdXN0X2Jhc2UHZmxvYXQzMghQcm90b2NvbAAEC3Byb3RvY29sX2lkBnVpbnQ2NA1wcm90b2NvbF9uYW1lBG5hbWUNdW5pdFBvd2VyTXVsdAdmbG9hdDMyBmFjdGl2ZQRib29sCVB3ckNvbmZpZwALBnBhdXNlZARib29sCWNvbnNlbnN1cw9Db25zZW5zdXNDb25maWcHcGF5bWVudA1QYXltZW50Q29uZmlnCHNsYXNoTG93C1NsYXNoQ29uZmlnCHNsYXNoTWVkC1NsYXNoQ29uZmlnCXNsYXNoSGlnaAtTbGFzaENvbmZpZwV3YWl0cwpXYWl0Q29uZmlnCmNvbGxhdGVyYWwQQ29sbGF0ZXJhbENvbmZpZxlrZWVwX2ZpbmFsaXplZF9zdGF0c19yb3dzBnVpbnQzMh5zdGFuZGJ5X3RvZ2dsZV9pbnRlcnZhbF9yb3VuZHMGdWludDE2I3JlcG9ydHNfYWNjdW11bGF0ZV93ZWlnaHRfcm91bmRfcGN0B2Zsb2F0MzIJUHdyR2xvYmFsAAUPcmVwb3J0aW5nX3JvdW5kBnVpbnQxNg5hY3RpdmVfb3JhY2xlcwZuYW1lW10XZXhwZWN0ZWRfYWN0aXZlX29yYWNsZXMGbmFtZVtdFmV4cGVjdGVkX2FjdGl2ZV93ZWlnaHQGdWludDE2DWFjdGl2ZV93ZWlnaHQGdWludDE2CVB3clJlcG9ydAADC3Byb3RvY29sX2lkBXVpbnQ4BXJvdW5kBnVpbnQxNgV1bml0cwZ1aW50MzIMUHdyUmVwb3J0Um93AAQIcHJvcG9zZXIEbmFtZQZyZXBvcnQJUHdyUmVwb3J0CWFwcHJvdmFscwZuYW1lW10PYXBwcm92YWxfd2VpZ2h0BnVpbnQxNgdSZXBvcnRzAAMIcHJvcG9zZWQGdWludDMyEnJlcG9ydGVkX29yX21lcmdlZAZ1aW50MzITdW5yZXBvcnRlZF91bm1lcmdlZAZ1aW50MzILUm91bmRDb21taXQABA9yb3VuZF9jb21taXRfaWQGdWludDY0C3Byb3RvY29sX2lkBXVpbnQ4BXJvdW5kBnVpbnQxNgdib2lkX2lkBG5hbWULU2xhc2hDb25maWcAAhVzbGFzaF9xdWFudGl0eV9zdGF0aWMGdWludDMyHXNsYXNoX3F1YW50aXR5X2NvbGxhdGVyYWxfcGN0B2Zsb2F0MzIMVG9rZW5VbnN0YWtlAAIWcmVkZWVtYWJsZV9hZnRlcl9yb3VuZAZ1aW50MTYIcXVhbnRpdHkGdWludDMyCldhaXRDb25maWcAAhR3aXRoZHJhd19yb3VuZHNfd2FpdAZ1aW50MTYdY29sbGF0ZXJhbF91bmxvY2tfd2FpdF9yb3VuZHMGdWludDE2CWFkZGNvbW1pdAACBm9yYWNsZQRuYW1lBmNvbW1pdAtSb3VuZENvbW1pdAlhZGRyZXBvcnQAAgZvcmFjbGUEbmFtZQZyZXBvcnQMUHdyUmVwb3J0Um93CmJvaW5jY2xlYXIAAAhib2luY3NldAABCWJvaW5jTWV0YQlCb2luY01ldGEMY29tbWl0c2NsZWFuAAIFc2NvcGUEbmFtZQVyb3VuZAZ1aW50MTYMY29tbWl0c2NsZWFyAAEFc2NvcGUEbmFtZQtjb25maWdjbGVhcgAACWNvbmZpZ3NldAABBmNvbmZpZwlQd3JDb25maWcKZmluYWxyb3VuZAAADGZpbmlzaHJlcG9ydAACDWJvaWRfaWRfc2NvcGUEbmFtZQxwd3JyZXBvcnRfaWQGdWludDY0C2dsb2JhbGNsZWFyAAAJZ2xvYmFsc2V0AAEGZ2xvYmFsCVB3ckdsb2JhbAxtZXJnZXJlcG9ydHMAAg1ib2lkX2lkX3Njb3BlBG5hbWUNcHdycmVwb3J0X2lkcwh1aW50NjRbXQxvcmFjbGRlcG9zaXQAAgZvcmFjbGUEbmFtZQ9kZXBvc2l0UXVhbnRpdHkGdWludDMyDG9yYWNsZXNjbGVhcgAACW9yYWNsZXNldAADBm9yYWNsZQRuYW1lBndlaWdodAV1aW50OBFhZGRpbmdfY29sbGF0ZXJhbAZ1aW50MzILb3N0YXRzY2xlYW4AAQVzY29wZQRuYW1lC29zdGF0c2NsZWFyAAEFc2NvcGUEbmFtZQlwYXlvcmFjbGUABQZvcmFjbGUEbmFtZQdiYXNlUGF5BnVpbnQzMghib251c1BheQZ1aW50MzIFcm91bmQGdWludDE2B3JlcG9ydHMHUmVwb3J0cwtwYXlvdXRyb3VuZAACBm9yYWNsZQRuYW1lBXJvdW5kBnVpbnQxNgpwcm90b2NsZWFyAAAIcHJvdG9zZXQAAQhwcm90b2NvbAhQcm90b2NvbAlwd3JyZXBvcnQAAwZvcmFjbGUEbmFtZQ1ib2lkX2lkX3Njb3BlBG5hbWUGcmVwb3J0CVB3clJlcG9ydAxyZXBvcnRzY2xlYW4AAQVzY29wZQRuYW1lDHJlcG9ydHNjbGVhcgABBXNjb3BlBG5hbWUKcmVwb3J0c2VudAADBnJlcG9ydAxQd3JSZXBvcnRSb3cMYWRkaW5nX3Bvd2VyBnVpbnQxNg50YXJnZXRfYm9pZF9pZARuYW1lC3JvdW5kY29tbWl0AAQGb3JhY2xlBG5hbWUHYm9pZF9pZARuYW1lC3Byb3RvY29sX2lkBXVpbnQ4BXJvdW5kBnVpbnQxNgpzZXRzdGFuZGJ5AAIGb3JhY2xlBG5hbWUHc3RhbmRieQRib29sCXNldHdlaWdodAACBm9yYWNsZQRuYW1lBndlaWdodAV1aW50OAlzbGFzaGhpZ2gAAQZvcmFjbGUEbmFtZQhzbGFzaGxvdwABBm9yYWNsZQRuYW1lCHNsYXNobWVkAAEGb3JhY2xlBG5hbWULc2xhc2hvcmFjbGUAAgZvcmFjbGUEbmFtZQhxdWFudGl0eQZ1aW50MzIJdGhpc3JvdW5kAAAGdW5sb2NrAAEGb3JhY2xlBG5hbWUKdW5sb2NraW5pdAABBm9yYWNsZQRuYW1lCHdpdGhkcmF3AAEGb3JhY2xlBG5hbWUMd2l0aGRyYXdpbml0AAEGb3JhY2xlBG5hbWUmAADITkqKUjIJYWRkY29tbWl0AAAAyJdWdVMyCWFkZHJlcG9ydAAAwDUqIjQdPQpib2luY2NsZWFyAAAAAFlhNB09CGJvaW5jc2V0ADCNighnJyVFDGNvbW1pdHNjbGVhbgBwjYoIZyclRQxjb21taXRzY2xlYXIAAK5RETG3JkULY29uZmlnY2xlYXIAAADICjO3JkUJY29uZmlnc2V0AABAmpreaKZbCmZpbmFscm91bmQAkC+t6jbsplsMZmluaXNocmVwb3J0AACuURFFc2hkC2dsb2JhbGNsZWFyAAAAyApHc2hkCWdsb2JhbHNldACA86VVXcWukgxtZXJnZXJlcG9ydHMAkB2mVaWIzKUMb3JhY2xkZXBvc2l0AHCNigiriMylDG9yYWNsZXNjbGVhcgAAAMgKq4jMpQlvcmFjbGVzZXQAAKZREeFsMqYLb3N0YXRzY2xlYW4AAK5REeFsMqYLb3N0YXRzY2xlYXIAAABQEZlLvakJcGF5b3JhY2xlAADS1PRmTb2pC3BheW91dHJvdW5kAADANSoimumtCnByb3RvY2xlYXIAAAAAWWGa6a0IcHJvdG9zZXQAAADIl1Z1L68JcHdycmVwb3J0ADCNigjnS6u6DHJlcG9ydHNjbGVhbgBwjYoI50urugxyZXBvcnRzY2xlYXIAAECeCudLq7oKcmVwb3J0c2VudAAAspOSojQ1vQtyb3VuZGNvbW1pdAAAgD9pmoyzwgpzZXRzdGFuZGJ5AAAAyI05xbPCCXNldHdlaWdodAAAAGjMtYZNxAlzbGFzaGhpZ2gAAAAAnMaGTcQIc2xhc2hsb3cAAAAAScmGTcQIc2xhc2htZWQAAFRE5tKGTcQLc2xhc2hvcmFjbGUAAABIU9OLXcsJdGhpc3JvdW5kAAAAAABAROPUBnVubG9jawAAQHbTQUTj1Ap1bmxvY2tpbml0AAAAANzc1LLjCHdpdGhkcmF3AJDddNzc1LLjDHdpdGhkcmF3aW5pdAAKAAAAOE9NETIDaTY0AAAHQWNjb3VudAAAMFlJNB09A2k2NAAACUJvaW5jTWV0YQAAAAAwtyZFA2k2NAAABkNvbmZpZwAAAABEc2hkA2k2NAAACVB3ckdsb2JhbAAAAACriMylA2k2NAAABk9yYWNsZQBwNhmriMylA2k2NAAACk9yYWNsZVN0YXQAAMCRIprprQNpNjQAAAhQcm90b2NvbAAAYG5Nii6vA2k2NAAACVB3ckNvbmZpZwAAzpdWdS+vA2k2NAAADFB3clJlcG9ydFJvdwCyk5KiNDW9A2k2NAAAC1JvdW5kQ29tbWl0AAAAAAA="
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

        @Struct.field(UInt16)
          rating!:UInt16

        @Struct.field(UInt16, { array: true })
          history!:UInt16[]

        @Struct.field(AccountBooster, { array: true })
          boosters!:AccountBooster[]
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
    @Struct.type("BoincMeta")
    export class BoincMeta extends Struct {
        @Struct.field(UInt64)
          protocol_id!:UInt64

        @Struct.field("string")
          url!:string

        @Struct.field(UInt64)
          teamId!:UInt64

        @Struct.field(Bytes)
          meta!:Bytes
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
          reports_accumulate_weight_round_pct!:Float32
    }
    @Struct.type("PwrGlobal")
    export class PwrGlobal extends Struct {
        @Struct.field(UInt16)
          reporting_round!:UInt16

        @Struct.field(Name, { array: true })
          active_oracles!:Name[]

        @Struct.field(Name, { array: true })
          expected_active_oracles!:Name[]

        @Struct.field(UInt16)
          expected_active_weight!:UInt16

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
    @Struct.type("addcommit")
    export class addcommit extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(RoundCommit)
          commit!:RoundCommit
    }
    @Struct.type("addreport")
    export class addreport extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(PwrReportRow)
          report!:PwrReportRow
    }
    @Struct.type("boincclear")
    export class boincclear extends Struct {}
    @Struct.type("boincset")
    export class boincset extends Struct {
        @Struct.field(BoincMeta)
          boincMeta!:BoincMeta
    }
    @Struct.type("commitsclean")
    export class commitsclean extends Struct {
        @Struct.field(Name)
          scope!:Name

        @Struct.field(UInt16)
          round!:UInt16
    }
    @Struct.type("commitsclear")
    export class commitsclear extends Struct {
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
    @Struct.type("globalset")
    export class globalset extends Struct {
        @Struct.field(PwrGlobal)
          global!:PwrGlobal
    }
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
    @Struct.type("ostatsclear")
    export class ostatsclear extends Struct {
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

        @Struct.field(Reports)
          reports!:Reports
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
    @Struct.type("reportsent")
    export class reportsent extends Struct {
        @Struct.field(PwrReportRow)
          report!:PwrReportRow

        @Struct.field(UInt16)
          adding_power!:UInt16

        @Struct.field(Name)
          target_boid_id!:Name
    }
    @Struct.type("roundcommit")
    export class roundcommit extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt8)
          protocol_id!:UInt8

        @Struct.field(UInt16)
          round!:UInt16
    }
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
  boincmeta: Types.BoincMeta,
  config: Types.Config,
  global: Types.PwrGlobal,
  oracles: Types.Oracle,
  oraclestats: Types.OracleStat,
  protocols: Types.Protocol,
  pwrconfig: Types.PwrConfig,
  pwrreports: Types.PwrReportRow,
  roundcommit: Types.RoundCommit
}
export interface TableTypes {
    accounts:Types.Account
    boincmeta:Types.BoincMeta
    config:Types.Config
    global:Types.PwrGlobal
    oracles:Types.Oracle
    oraclestats:Types.OracleStat
    protocols:Types.Protocol
    pwrconfig:Types.PwrConfig
    pwrreports:Types.PwrReportRow
    roundcommit:Types.RoundCommit
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {
        export interface RoundCommit {
            round_commit_id:UInt64Type
            protocol_id:UInt8Type
            round:UInt16Type
            boid_id:NameType
        }
        export interface PwrReportRow {
            proposer:NameType
            report:Type.PwrReport
            approvals:NameType[]
            approval_weight:UInt16Type
        }
        export interface PwrReport {
            protocol_id:UInt8Type
            round:UInt16Type
            units:UInt32Type
        }
        export interface BoincMeta {
            protocol_id:UInt64Type
            url:string
            teamId:UInt64Type
            meta:BytesType
        }
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
        export interface PwrGlobal {
            reporting_round:UInt16Type
            active_oracles:NameType[]
            expected_active_oracles:NameType[]
            expected_active_weight:UInt16Type
            active_weight:UInt16Type
        }
        export interface Reports {
            proposed:UInt32Type
            reported_or_merged:UInt32Type
            unreported_unmerged:UInt32Type
        }
        export interface Protocol {
            protocol_id:UInt64Type
            protocol_name:NameType
            unitPowerMult:Float32Type
            active:boolean
        }
    }
    export interface addcommit {
        oracle:NameType
        commit:Type.RoundCommit
    }
    export interface addreport {
        oracle:NameType
        report:Type.PwrReportRow
    }
    export interface boincclear {}
    export interface boincset {
        boincMeta:Type.BoincMeta
    }
    export interface commitsclean {
        scope:NameType
        round:UInt16Type
    }
    export interface commitsclear {
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
    export interface globalset {
        global:Type.PwrGlobal
    }
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
    export interface ostatsclear {
        scope:NameType
    }
    export interface payoracle {
        oracle:NameType
        basePay:UInt32Type
        bonusPay:UInt32Type
        round:UInt16Type
        reports:Type.Reports
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
    export interface reportsent {
        report:Type.PwrReportRow
        adding_power:UInt16Type
        target_boid_id:NameType
    }
    export interface roundcommit {
        oracle:NameType
        boid_id:NameType
        protocol_id:UInt8Type
        round:UInt16Type
    }
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
    addcommit:ActionParams.addcommit
    addreport:ActionParams.addreport
    boincclear:ActionParams.boincclear
    boincset:ActionParams.boincset
    commitsclean:ActionParams.commitsclean
    commitsclear:ActionParams.commitsclear
    configclear:ActionParams.configclear
    configset:ActionParams.configset
    finalround:ActionParams.finalround
    finishreport:ActionParams.finishreport
    globalclear:ActionParams.globalclear
    globalset:ActionParams.globalset
    mergereports:ActionParams.mergereports
    oracldeposit:ActionParams.oracldeposit
    oraclesclear:ActionParams.oraclesclear
    oracleset:ActionParams.oracleset
    ostatsclean:ActionParams.ostatsclean
    ostatsclear:ActionParams.ostatsclear
    payoracle:ActionParams.payoracle
    payoutround:ActionParams.payoutround
    protoclear:ActionParams.protoclear
    protoset:ActionParams.protoset
    pwrreport:ActionParams.pwrreport
    reportsclean:ActionParams.reportsclean
    reportsclear:ActionParams.reportsclear
    reportsent:ActionParams.reportsent
    roundcommit:ActionParams.roundcommit
    setstandby:ActionParams.setstandby
    setweight:ActionParams.setweight
    slashhigh:ActionParams.slashhigh
    slashlow:ActionParams.slashlow
    slashmed:ActionParams.slashmed
    slashoracle:ActionParams.slashoracle
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
      account: args.account || Name.from("unknown")
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
