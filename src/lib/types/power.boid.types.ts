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
  "DmVvc2lvOjphYmkvMS4yAEkHQWNjb3VudAAKB2JvaWRfaWQEbmFtZQZvd25lcnMGbmFtZVtdBGF1dGgLQWNjb3VudEF1dGgIc3BvbnNvcnMGbmFtZVtdBXN0YWtlDEFjY291bnRTdGFrZQVwb3dlcgxBY2NvdW50UG93ZXIEdGVhbQtBY2NvdW50VGVhbQdiYWxhbmNlBnVpbnQzMgtuZnRfYmFsYW5jZQZ1aW50MTYLcmVjb3ZlcmFibGUEYm9vbAtBY2NvdW50QXV0aAACBGtleXMMcHVibGljX2tleVtdBW5vbmNlBXVpbnQ4DkFjY291bnRCb29zdGVyAAQOcHdyX211bHRpcGxpZXIFdWludDgRcHdyX2FkZF9wZXJfcm91bmQGdWludDE2DWV4cGlyZXNfcm91bmQGdWludDE2F2FnZ3JlZ2F0ZV9wd3JfcmVtYWluaW5nBnVpbnQzMgxBY2NvdW50UG93ZXIABRJsYXN0X2NsYWltZWRfcm91bmQGdWludDE2EGxhc3RfYWRkZWRfcm91bmQGdWludDE2BnJhdGluZwZ1aW50MTYHaGlzdG9yeQh1aW50MTZbXQhib29zdGVycxBBY2NvdW50Qm9vc3RlcltdDEFjY291bnRTdGFrZQADCXVuc3Rha2luZw5Ub2tlblVuc3Rha2VbXQtzZWxmX3N0YWtlZAZ1aW50MzIYcmVjZWl2ZWRfZGVsZWdhdGVkX3N0YWtlBnVpbnQxNgtBY2NvdW50VGVhbQAEB3RlYW1faWQFdWludDgPbGFzdF9lZGl0X3JvdW5kBnVpbnQxNg10ZWFtX3RheF9tdWx0BXVpbnQ4HHRlYW1fY3VtdWxhdGl2ZV9jb250cmlidXRpb24GdWludDMyCUJvaW5jQ1BJRAACB2JvaWRfaWQEbmFtZQpjcGlkX2J5dGVzBWJ5dGVzCUJvaW5jTWV0YQAEC3Byb3RvY29sX2lkBnVpbnQ2NAN1cmwGc3RyaW5nBnRlYW1JZAZ1aW50NjQEbWV0YQVieXRlcwpDUElEUmVwb3J0AAULcHJvdG9jb2xfaWQFdWludDgKY3BpZF9ieXRlcwVieXRlcwVyb3VuZAZ1aW50MTYJYXBwcm92YWxzBm5hbWVbXQ9hcHByb3ZhbF93ZWlnaHQGdWludDE2EENvbGxhdGVyYWxDb25maWcAAiNvcmFjbGVfY29sbGF0ZXJhbF9kZXBvc2l0X2luY3JlbWVudAZ1aW50MzIZb3JhY2xlX2NvbGxhdGVyYWxfbWluaW11bQZ1aW50MzIGQ29uZmlnAAwHYWNjb3VudA1Db25maWdBY2NvdW50BXBvd2VyC0NvbmZpZ1Bvd2VyBG1pbnQKQ29uZmlnTWludAR0ZWFtCkNvbmZpZ1RlYW0Fc3Rha2ULQ29uZmlnU3Rha2UEdGltZQpDb25maWdUaW1lBGF1dGgKQ29uZmlnQXV0aANuZnQJQ29uZmlnTmZ0BnBhdXNlZARib29sDmFsbG93X2RlcG9zaXRzBGJvb2wRYWxsb3dfd2l0aGRyYXdhbHMEYm9vbA9yZWNvdmVyeUFjY291bnQEbmFtZQ1Db25maWdBY2NvdW50AAkMaW52aXRlX3ByaWNlBnVpbnQzMhZwcmVtaXVtX3B1cmNoYXNlX3ByaWNlBnVpbnQzMhJtYXhfcHJlbWl1bV9wcmVmaXgFdWludDgKbWF4X293bmVycwV1aW50OAxtYXhfYm9vc3RlcnMFdWludDgQc3VmZml4X3doaXRlbGlzdAZuYW1lW10UcmVtb3ZlX3Nwb25zb3JfcHJpY2UGdWludDMyGHNwb25zb3JfbWF4X2ludml0ZV9jb2RlcwV1aW50OBlpbnZpdGVfY29kZV9leHBpcmVfcm91bmRzBnVpbnQxNgpDb25maWdBdXRoAAUVa2V5X2FjdGlvbnNfd2hpdGVsaXN0Bm5hbWVbXRVrZXlfYWNjb3VudF9tYXhfc3Rha2UGdWludDMyF2tleV9hY2NvdW50X21heF9iYWxhbmNlBnVpbnQzMhBhY2NvdW50X21heF9rZXlzBXVpbnQ4Gndvcmtlcl9tYXhfYmlsbF9wZXJfYWN0aW9uBnVpbnQzMgpDb25maWdNaW50AAIYcm91bmRfcG93ZXJlZF9zdGFrZV9tdWx0B2Zsb2F0MzIQcm91bmRfcG93ZXJfbXVsdAdmbG9hdDMyCUNvbmZpZ05mdAACFGJvaWRfaWRfbWF4aW11bV9uZnRzBnVpbnQxNhV3aGl0ZWxpc3RfY29sbGVjdGlvbnMGbmFtZVtdC0NvbmZpZ1Bvd2VyAAUQc3BvbnNvcl90YXhfbXVsdAdmbG9hdDMyEnBvd2VyZWRfc3Rha2VfbXVsdAdmbG9hdDMyHGNsYWltX21heGltdW1fZWxhcHNlZF9yb3VuZHMGdWludDE2EHNvZnRfbWF4X3B3cl9hZGQGdWludDE2FGhpc3Rvcnlfc2xvdHNfbGVuZ3RoBXVpbnQ4C0NvbmZpZ1N0YWtlAAIOdW5zdGFrZV9yb3VuZHMFdWludDgdZXh0cmFfc3Rha2VfbWluX2xvY2tlZF9yb3VuZHMFdWludDgKQ29uZmlnVGVhbQAGEWNoYW5nZV9taW5fcm91bmRzBnVpbnQxNhRlZGl0X3RlYW1fbWluX3JvdW5kcwZ1aW50MTYYdGVhbV9lZGl0X21heF9wY3RfY2hhbmdlBnVpbnQxNg1idXlfdGVhbV9jb3N0BnVpbnQzMhRvd25lcl9zdGFrZV9yZXF1aXJlZAZ1aW50MzInb3duZXJfZnV0dXJlX3N0YWtlX2xvY2tfcm91bmRzX3JlcXVpcmVkBnVpbnQxNgpDb25maWdUaW1lAAIccm91bmRzX3N0YXJ0X3NlY19zaW5jZV9lcG9jaAZ1aW50MzIQcm91bmRfbGVuZ3RoX3NlYwZ1aW50MzIPQ29uc2Vuc3VzQ29uZmlnAAMKbWluX3dlaWdodAZ1aW50MzIObWluX3dlaWdodF9wY3QHZmxvYXQzMhNtZXJnZV9kZXZpYXRpb25fcGN0B2Zsb2F0MzINR2xvYmFsUmVwb3J0cwAEBm1lcmdlZAZ1aW50NjQXdW5yZXBvcnRlZF9hbmRfdW5tZXJnZWQGdWludDY0CHJlcG9ydGVkBnVpbnQ2NAhwcm9wb3NlZAZ1aW50NjQGT3JhY2xlAAYHYWNjb3VudARuYW1lBndlaWdodAV1aW50OApjb2xsYXRlcmFsEE9yYWNsZUNvbGxhdGVyYWwFZnVuZHMLT3JhY2xlRnVuZHMHc3RhbmRieQRib29sGWxhc3Rfc3RhbmRieV90b2dnbGVfcm91bmQGdWludDE2EE9yYWNsZUNvbGxhdGVyYWwABQZsb2NrZWQGdWludDMyCXVubG9ja2luZwZ1aW50MzIHc2xhc2hlZAZ1aW50MzIVdW5sb2NrX2ZpbmlzaGVkX3JvdW5kBnVpbnQxNhZtaW5fdW5sb2NrX3N0YXJ0X3JvdW5kBnVpbnQxNgtPcmFjbGVGdW5kcwAEB2NsYWltZWQGdWludDMyCXVuY2xhaW1lZAZ1aW50MzILd2l0aGRyYXdpbmcGdWludDMyGHdpdGhkcmF3YWJsZV9hZnRlcl9yb3VuZAZ1aW50MTYKT3JhY2xlU3RhdAAEBXJvdW5kBnVpbnQxNgZ3ZWlnaHQFdWludDgHcmVwb3J0cwdSZXBvcnRzCXByb2Nlc3NlZARib29sDVBheW1lbnRDb25maWcABSFjb2xsYXRlcmFsX3BjdF9wYXlfcGVyX3JvdW5kX211bHQHZmxvYXQzMhdyb3VuZF9ib251c19wYXlfcmVwb3J0cwZ1aW50MzIYcm91bmRfYm9udXNfcGF5X3Byb3Bvc2VkBnVpbnQzMhtyZXBvcnRzX3Byb3Bvc2VkX2FkanVzdF9wd3IHZmxvYXQzMhdudW1fb3JhY2xlc19hZGp1c3RfYmFzZQdmbG9hdDMyCFByb3RvY29sAAQLcHJvdG9jb2xfaWQGdWludDY0DXByb3RvY29sX25hbWUEbmFtZQ11bml0UG93ZXJNdWx0B2Zsb2F0MzIGYWN0aXZlBGJvb2wJUHdyQ29uZmlnAAwGcGF1c2VkBGJvb2wJY29uc2Vuc3VzD0NvbnNlbnN1c0NvbmZpZwdwYXltZW50DVBheW1lbnRDb25maWcIc2xhc2hMb3cLU2xhc2hDb25maWcIc2xhc2hNZWQLU2xhc2hDb25maWcJc2xhc2hIaWdoC1NsYXNoQ29uZmlnBXdhaXRzCldhaXRDb25maWcKY29sbGF0ZXJhbBBDb2xsYXRlcmFsQ29uZmlnGWtlZXBfZmluYWxpemVkX3N0YXRzX3Jvd3MGdWludDMyHnN0YW5kYnlfdG9nZ2xlX2ludGVydmFsX3JvdW5kcwZ1aW50MTYebWluX3BheV9yZXBvcnRfc2hhcmVfdGhyZXNob2xkB2Zsb2F0MzIjcmVwb3J0c19hY2N1bXVsYXRlX3dlaWdodF9yb3VuZF9wY3QHZmxvYXQzMglQd3JHbG9iYWwABw5hY3RpdmVfb3JhY2xlcwZuYW1lW10XZXhwZWN0ZWRfYWN0aXZlX29yYWNsZXMGbmFtZVtdD3N0YW5kYnlfb3JhY2xlcwV1aW50OBZleHBlY3RlZF9hY3RpdmVfd2VpZ2h0BnVpbnQxNgdyZXBvcnRzDUdsb2JhbFJlcG9ydHMMcmV3YXJkc19wYWlkBnVpbnQ2NA1hY3RpdmVfd2VpZ2h0BnVpbnQxNglQd3JSZXBvcnQAAwtwcm90b2NvbF9pZAV1aW50OAVyb3VuZAZ1aW50MTYFdW5pdHMGdWludDMyDFB3clJlcG9ydFJvdwAGCHByb3Bvc2VyBG5hbWUGcmVwb3J0CVB3clJlcG9ydAlhcHByb3ZhbHMGbmFtZVtdD2FwcHJvdmFsX3dlaWdodAZ1aW50MTYIcmVwb3J0ZWQEYm9vbAZtZXJnZWQEYm9vbAdQd3JTdGF0AAcFcm91bmQGdWludDE2D3N0YXJ0aW5nX2dsb2JhbAlQd3JHbG9iYWwXcmVwb3J0ZWRfc2luY2VfcHJldmlvdXMGdWludDMyInVucmVwb3J0ZWRfdW5tZXJnZWRfc2luY2VfcHJldmlvdXMGdWludDMyF3Byb3Bvc2VkX3NpbmNlX3ByZXZpb3VzBnVpbnQzMhdyZXdhcmRlZF9zaW5jZV9wcmV2aW91cwZ1aW50MzIddmFsaWRfcHJvcG9zZWRfc2luY2VfcHJldmlvdXMGdWludDMyB1JlcG9ydHMAAwhwcm9wb3NlZAZ1aW50MzIScmVwb3J0ZWRfb3JfbWVyZ2VkBnVpbnQzMhN1bnJlcG9ydGVkX3VubWVyZ2VkBnVpbnQzMgtSb3VuZENvbW1pdAAED3JvdW5kX2NvbW1pdF9pZAZ1aW50NjQLcHJvdG9jb2xfaWQFdWludDgFcm91bmQGdWludDE2B2JvaWRfaWQEbmFtZQtTbGFzaENvbmZpZwACFXNsYXNoX3F1YW50aXR5X3N0YXRpYwZ1aW50MzIdc2xhc2hfcXVhbnRpdHlfY29sbGF0ZXJhbF9wY3QHZmxvYXQzMgxUb2tlblVuc3Rha2UAAhZyZWRlZW1hYmxlX2FmdGVyX3JvdW5kBnVpbnQxNghxdWFudGl0eQZ1aW50MzIKV2FpdENvbmZpZwACFHdpdGhkcmF3X3JvdW5kc193YWl0BnVpbnQxNh1jb2xsYXRlcmFsX3VubG9ja193YWl0X3JvdW5kcwZ1aW50MTYIYm9pbmNzZXQAAQlib2luY01ldGEJQm9pbmNNZXRhDGNvbW1pdHNjbGVhbgABBXNjb3BlBG5hbWULY29uZmlnY2xlYXIAAAljb25maWdzZXQAAQZjb25maWcJUHdyQ29uZmlnDGNwaWRyZXBjbGVhbgABDWJvaWRfaWRfc2NvcGUEbmFtZQpjcGlkcmVwb3J0AAQGb3JhY2xlBG5hbWULcHJvdG9jb2xfaWQFdWludDgNYm9pZF9pZF9zY29wZQRuYW1lCmNwaWRfYnl0ZXMFYnl0ZXMHY3BpZHNldAADC3Byb3RvY29sX2lkBnVpbnQ2NAdib2lkX2lkBG5hbWUKY3BpZF9ieXRlcwVieXRlcwpmaW5hbHJvdW5kAAAMZmluaXNocmVwb3J0AAINYm9pZF9pZF9zY29wZQRuYW1lDHB3cnJlcG9ydF9pZAZ1aW50NjQLZ2xvYmFsY2xlYXIAAAxtZXJnZXJlcG9ydHMAAg1ib2lkX2lkX3Njb3BlBG5hbWUNcHdycmVwb3J0X2lkcwh1aW50NjRbXQxvcmFjbGRlcG9zaXQAAgZvcmFjbGUEbmFtZQ9kZXBvc2l0UXVhbnRpdHkGdWludDMyDG9yYWNsZXNjbGVhcgAACW9yYWNsZXNldAADBm9yYWNsZQRuYW1lBndlaWdodAV1aW50OBFhZGRpbmdfY29sbGF0ZXJhbAZ1aW50MzILb3N0YXRzY2xlYW4AAQVzY29wZQRuYW1lCXBheW9yYWNsZQAEBm9yYWNsZQRuYW1lB2Jhc2VQYXkGdWludDMyCGJvbnVzUGF5BnVpbnQzMgVyb3VuZAZ1aW50MTYLcGF5b3V0cm91bmQAAgZvcmFjbGUEbmFtZQVyb3VuZAZ1aW50MTYKcHJvdG9jbGVhcgAACHByb3Rvc2V0AAEIcHJvdG9jb2wIUHJvdG9jb2wJcHdycmVwb3J0AAMGb3JhY2xlBG5hbWUNYm9pZF9pZF9zY29wZQRuYW1lBnJlcG9ydAlQd3JSZXBvcnQMcmVwb3J0c2NsZWFuAAEFc2NvcGUEbmFtZQxyZXBvcnRzY2xlYXIAAQVzY29wZQRuYW1lCnJvdW5kc3RhdHMAAApzZXRzdGFuZGJ5AAIGb3JhY2xlBG5hbWUHc3RhbmRieQRib29sCXNldHdlaWdodAACBm9yYWNsZQRuYW1lBndlaWdodAV1aW50OAlzbGFzaGhpZ2gAAQZvcmFjbGUEbmFtZQhzbGFzaGxvdwABBm9yYWNsZQRuYW1lCHNsYXNobWVkAAEGb3JhY2xlBG5hbWULc2xhc2hvcmFjbGUAAgZvcmFjbGUEbmFtZQhxdWFudGl0eQZ1aW50MzIKc3RhdHNjbGVhbgAACnN0YXRzY2xlYXIAAAl0aGlzcm91bmQAAAZ1bmxvY2sAAQZvcmFjbGUEbmFtZQp1bmxvY2tpbml0AAEGb3JhY2xlBG5hbWUId2l0aGRyYXcAAQZvcmFjbGUEbmFtZQx3aXRoZHJhd2luaXQAAQZvcmFjbGUEbmFtZSQAAABZYTQdPQhib2luY3NldAAwjYoIZyclRQxjb21taXRzY2xlYW4AAK5RETG3JkULY29uZmlnY2xlYXIAAADICjO3JkUJY29uZmlnc2V0ADCNiqiqm1xFDGNwaWRyZXBjbGVhbgAAQL60qptcRQpjcGlkcmVwb3J0AAAAACArnFxFB2NwaWRzZXQAAECamt5oplsKZmluYWxyb3VuZACQL63qNuymWwxmaW5pc2hyZXBvcnQAAK5REUVzaGQLZ2xvYmFsY2xlYXIAgPOlVV3FrpIMbWVyZ2VyZXBvcnRzAJAdplWliMylDG9yYWNsZGVwb3NpdABwjYoIq4jMpQxvcmFjbGVzY2xlYXIAAADICquIzKUJb3JhY2xlc2V0AACmURHhbDKmC29zdGF0c2NsZWFuAAAAUBGZS72pCXBheW9yYWNsZQAA0tT0Zk29qQtwYXlvdXRyb3VuZAAAwDUqIprprQpwcm90b2NsZWFyAAAAAFlhmumtCHByb3Rvc2V0AAAAyJdWdS+vCXB3cnJlcG9ydAAwjYoI50urugxyZXBvcnRzY2xlYW4AcI2KCOdLq7oMcmVwb3J0c2NsZWFyAAAAzibjNDW9CnJvdW5kc3RhdHMAAIA/aZqMs8IKc2V0c3RhbmRieQAAAMiNOcWzwglzZXR3ZWlnaHQAAABozLWGTcQJc2xhc2hoaWdoAAAAAJzGhk3ECHNsYXNobG93AAAAAEnJhk3ECHNsYXNobWVkAABURObShk3EC3NsYXNob3JhY2xlAADANCoinE3GCnN0YXRzY2xlYW4AAMA1KiKcTcYKc3RhdHNjbGVhcgAAAEhT04tdywl0aGlzcm91bmQAAAAAAEBE49QGdW5sb2NrAABAdtNBROPUCnVubG9ja2luaXQAAAAA3NzUsuMId2l0aGRyYXcAkN103NzUsuMMd2l0aGRyYXdpbml0AA0AAAA4T00RMgNpNjQAAAdBY2NvdW50AABOriI0HT0DaTY0AAAJQm9pbmNDUElEAAAwWUk0HT0DaTY0AAAJQm9pbmNNZXRhAAAAADC3JkUDaTY0AAAGQ29uZmlnAHC+tKqbXEUDaTY0AAAKQ1BJRFJlcG9ydAAAAABEc2hkA2k2NAAACVB3ckdsb2JhbAAAAACriMylA2k2NAAABk9yYWNsZQBwNhmriMylA2k2NAAACk9yYWNsZVN0YXQAAMCRIprprQNpNjQAAAhQcm90b2NvbAAAYG5Nii6vA2k2NAAACVB3ckNvbmZpZwAAzpdWdS+vA2k2NAAADFB3clJlcG9ydFJvdwCyk5KiNDW9A2k2NAAAC1JvdW5kQ29tbWl0AAAAAACcTcYDaTY0AAAHUHdyU3RhdAAAAAAA"
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
    @Struct.type("BoincCPID")
    export class BoincCPID extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Bytes)
          cpid_bytes!:Bytes
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
    @Struct.type("CPIDReport")
    export class CPIDReport extends Struct {
        @Struct.field(UInt8)
          protocol_id!:UInt8

        @Struct.field(Bytes)
          cpid_bytes!:Bytes

        @Struct.field(UInt16)
          round!:UInt16

        @Struct.field(Name, { array: true })
          approvals!:Name[]

        @Struct.field(UInt16)
          approval_weight!:UInt16
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
    @Struct.type("boincset")
    export class boincset extends Struct {
        @Struct.field(BoincMeta)
          boincMeta!:BoincMeta
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
    @Struct.type("cpidrepclean")
    export class cpidrepclean extends Struct {
        @Struct.field(Name)
          boid_id_scope!:Name
    }
    @Struct.type("cpidreport")
    export class cpidreport extends Struct {
        @Struct.field(Name)
          oracle!:Name

        @Struct.field(UInt8)
          protocol_id!:UInt8

        @Struct.field(Name)
          boid_id_scope!:Name

        @Struct.field(Bytes)
          cpid_bytes!:Bytes
    }
    @Struct.type("cpidset")
    export class cpidset extends Struct {
        @Struct.field(UInt64)
          protocol_id!:UInt64

        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Bytes)
          cpid_bytes!:Bytes
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
  boinccpids: Types.BoincCPID,
  boincmeta: Types.BoincMeta,
  config: Types.Config,
  cpidreports: Types.CPIDReport,
  global: Types.PwrGlobal,
  oracles: Types.Oracle,
  oraclestats: Types.OracleStat,
  protocols: Types.Protocol,
  pwrconfig: Types.PwrConfig,
  pwrreports: Types.PwrReportRow,
  roundcommit: Types.RoundCommit,
  stats: Types.PwrStat
}
export interface TableTypes {
    accounts:Types.Account
    boinccpids:Types.BoincCPID
    boincmeta:Types.BoincMeta
    config:Types.Config
    cpidreports:Types.CPIDReport
    global:Types.PwrGlobal
    oracles:Types.Oracle
    oraclestats:Types.OracleStat
    protocols:Types.Protocol
    pwrconfig:Types.PwrConfig
    pwrreports:Types.PwrReportRow
    roundcommit:Types.RoundCommit
    stats:Types.PwrStat
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {
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
    export interface boincset {
        boincMeta:Type.BoincMeta
    }
    export interface commitsclean {
        scope:NameType
    }
    export interface configclear {}
    export interface configset {
        config:Type.PwrConfig
    }
    export interface cpidrepclean {
        boid_id_scope:NameType
    }
    export interface cpidreport {
        oracle:NameType
        protocol_id:UInt8Type
        boid_id_scope:NameType
        cpid_bytes:BytesType
    }
    export interface cpidset {
        protocol_id:UInt64Type
        boid_id:NameType
        cpid_bytes:BytesType
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
    boincset:ActionParams.boincset
    commitsclean:ActionParams.commitsclean
    configclear:ActionParams.configclear
    configset:ActionParams.configset
    cpidrepclean:ActionParams.cpidrepclean
    cpidreport:ActionParams.cpidreport
    cpidset:ActionParams.cpidset
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
