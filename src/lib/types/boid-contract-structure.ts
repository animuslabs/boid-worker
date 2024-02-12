import type {
  Action,
  BytesType,
  Float32Type,
  Float64Type,
  Int16Type,
  Int32Type,
  Int64Type,
  Int8Type,
  NameType,
  PublicKeyType,
  SignatureType,
  UInt16Type,
  UInt32Type,
  UInt64Type,
  UInt8Type
} from "@wharfkit/antelope"
import {
  ABI,
  Asset,
  Blob,
  Bytes,
  Float32,
  Float64,
  Int16,
  Int32,
  Int64,
  Int8,
  Name,
  PublicKey,
  Signature,
  Struct,
  UInt16,
  UInt32,
  UInt64,
  UInt8,
  Variant
} from "@wharfkit/antelope"
import type { ActionOptions, ContractArgs, PartialBy, Table } from "@wharfkit/contract"
import { Contract as BaseContract } from "@wharfkit/contract"
export const abiBlob = Blob.from(
  "DmVvc2lvOjphYmkvMS4yAF4HQWNjb3VudAAKB2JvaWRfaWQEbmFtZQZvd25lcnMGbmFtZVtdBGF1dGgLQWNjb3VudEF1dGgIc3BvbnNvcnMGbmFtZVtdBXN0YWtlDEFjY291bnRTdGFrZQVwb3dlcgxBY2NvdW50UG93ZXIEdGVhbQtBY2NvdW50VGVhbQdiYWxhbmNlBnVpbnQzMgtuZnRfYmFsYW5jZQZ1aW50MTYLcmVjb3ZlcmFibGUEYm9vbAtBY2NvdW50QXV0aAACBGtleXMMcHVibGljX2tleVtdBW5vbmNlBXVpbnQ4DkFjY291bnRCb29zdGVyAAQOcHdyX211bHRpcGxpZXIFdWludDgRcHdyX2FkZF9wZXJfcm91bmQGdWludDE2DWV4cGlyZXNfcm91bmQGdWludDE2F2FnZ3JlZ2F0ZV9wd3JfcmVtYWluaW5nBnVpbnQzMg1BY2NvdW50Q3JlYXRlAAMHYm9pZF9pZARuYW1lBGtleXMMcHVibGljX2tleVtdBm93bmVycwZuYW1lW10MQWNjb3VudFBvd2VyAAUSbGFzdF9jbGFpbWVkX3JvdW5kBnVpbnQxNhBsYXN0X2FkZGVkX3JvdW5kBnVpbnQxNgZyYXRpbmcGdWludDE2B2hpc3RvcnkIdWludDE2W10IYm9vc3RlcnMQQWNjb3VudEJvb3N0ZXJbXQxBY2NvdW50U3Rha2UAAwl1bnN0YWtpbmcOVG9rZW5VbnN0YWtlW10Lc2VsZl9zdGFrZWQGdWludDMyGHJlY2VpdmVkX2RlbGVnYXRlZF9zdGFrZQZ1aW50MTYLQWNjb3VudFRlYW0ABAd0ZWFtX2lkBXVpbnQ4D2xhc3RfZWRpdF9yb3VuZAZ1aW50MTYNdGVhbV90YXhfbXVsdAV1aW50OBx0ZWFtX2N1bXVsYXRpdmVfY29udHJpYnV0aW9uBnVpbnQzMghBY2N0TWV0YQACB2JvaWRfaWQEbmFtZQRtZXRhBWJ5dGVzBkFjdGlvbgAEB2FjY291bnQEbmFtZQRuYW1lBG5hbWUNYXV0aG9yaXphdGlvbhFQZXJtaXNzaW9uTGV2ZWxbXQRkYXRhBWJ5dGVzD0F0b21pY0F0dHJpYnV0ZQACA2tleQZzdHJpbmcFdmFsdWULQXRvbWljVmFsdWUMQXRvbWljRm9ybWF0AAIEbmFtZQZzdHJpbmcEdHlwZQZzdHJpbmcEQXV0aAABDGJvaWRfaWRfYXV0aARuYW1lB0Jvb3N0ZXIABQpib29zdGVyX2lkBXVpbnQ4DnB3cl9tdWx0aXBsaWVyBXVpbnQ4EXB3cl9hZGRfcGVyX3JvdW5kBnVpbnQxNhtleHBpcmVfYWZ0ZXJfZWxhcHNlZF9yb3VuZHMGdWludDE2FmFnZ3JlZ2F0ZV9wd3JfY2FwYWNpdHkGdWludDMyBkNvbmZpZwAMB2FjY291bnQNQ29uZmlnQWNjb3VudAVwb3dlcgtDb25maWdQb3dlcgRtaW50CkNvbmZpZ01pbnQEdGVhbQpDb25maWdUZWFtBXN0YWtlC0NvbmZpZ1N0YWtlBHRpbWUKQ29uZmlnVGltZQRhdXRoCkNvbmZpZ0F1dGgDbmZ0CUNvbmZpZ05mdAZwYXVzZWQEYm9vbA5hbGxvd19kZXBvc2l0cwRib29sEWFsbG93X3dpdGhkcmF3YWxzBGJvb2wPcmVjb3ZlcnlBY2NvdW50BG5hbWUNQ29uZmlnQWNjb3VudAAJDGludml0ZV9wcmljZQZ1aW50MzIWcHJlbWl1bV9wdXJjaGFzZV9wcmljZQZ1aW50MzISbWF4X3ByZW1pdW1fcHJlZml4BXVpbnQ4Cm1heF9vd25lcnMFdWludDgMbWF4X2Jvb3N0ZXJzBXVpbnQ4EHN1ZmZpeF93aGl0ZWxpc3QGbmFtZVtdFHJlbW92ZV9zcG9uc29yX3ByaWNlBnVpbnQzMhhzcG9uc29yX21heF9pbnZpdGVfY29kZXMFdWludDgZaW52aXRlX2NvZGVfZXhwaXJlX3JvdW5kcwZ1aW50MTYKQ29uZmlnQXV0aAAFFWtleV9hY3Rpb25zX3doaXRlbGlzdAZuYW1lW10Va2V5X2FjY291bnRfbWF4X3N0YWtlBnVpbnQzMhdrZXlfYWNjb3VudF9tYXhfYmFsYW5jZQZ1aW50MzIQYWNjb3VudF9tYXhfa2V5cwV1aW50OBp3b3JrZXJfbWF4X2JpbGxfcGVyX2FjdGlvbgZ1aW50MzIKQ29uZmlnTWludAACGHJvdW5kX3Bvd2VyZWRfc3Rha2VfbXVsdAdmbG9hdDMyEHJvdW5kX3Bvd2VyX211bHQHZmxvYXQzMglDb25maWdOZnQAAhRib2lkX2lkX21heGltdW1fbmZ0cwZ1aW50MTYVd2hpdGVsaXN0X2NvbGxlY3Rpb25zBm5hbWVbXQtDb25maWdQb3dlcgAFEHNwb25zb3JfdGF4X211bHQHZmxvYXQzMhJwb3dlcmVkX3N0YWtlX211bHQHZmxvYXQzMhxjbGFpbV9tYXhpbXVtX2VsYXBzZWRfcm91bmRzBnVpbnQxNhBzb2Z0X21heF9wd3JfYWRkBnVpbnQxNhRoaXN0b3J5X3Nsb3RzX2xlbmd0aAV1aW50OAtDb25maWdTdGFrZQACDnVuc3Rha2Vfcm91bmRzBXVpbnQ4HWV4dHJhX3N0YWtlX21pbl9sb2NrZWRfcm91bmRzBXVpbnQ4CkNvbmZpZ1RlYW0ABhFjaGFuZ2VfbWluX3JvdW5kcwZ1aW50MTYUZWRpdF90ZWFtX21pbl9yb3VuZHMGdWludDE2GHRlYW1fZWRpdF9tYXhfcGN0X2NoYW5nZQZ1aW50MTYNYnV5X3RlYW1fY29zdAZ1aW50MzIUb3duZXJfc3Rha2VfcmVxdWlyZWQGdWludDMyJ293bmVyX2Z1dHVyZV9zdGFrZV9sb2NrX3JvdW5kc19yZXF1aXJlZAZ1aW50MTYKQ29uZmlnVGltZQACHHJvdW5kc19zdGFydF9zZWNfc2luY2VfZXBvY2gGdWludDMyEHJvdW5kX2xlbmd0aF9zZWMGdWludDMyDkV4dGVuZGVkU3ltYm9sAAIDc3ltBnN5bWJvbAhjb250cmFjdARuYW1lBkdsb2JhbAADCmNoYWluX25hbWUEbmFtZQt0b3RhbF9wb3dlcgZ1aW50NjQbbGFzdF9pbmZsYXRpb25fYWRqdXN0X3JvdW5kBnVpbnQxNgZJbnZpdGUAAwtpbnZpdGVfY29kZQZ1aW50NjQDa2V5CnB1YmxpY19rZXkNY3JlYXRlZF9yb3VuZAZ1aW50MTYHTWludExvZwAHCnBvd2VyX21pbnQGdWludDMyEnBvd2VyZWRfc3Rha2VfbWludAZ1aW50MzIOYWNjb3VudF9lYXJuZWQGdWludDMyCHRlYW1fY3V0BnVpbnQzMhF0ZWFtX293bmVyX2Vhcm5lZAZ1aW50MzIOb3ZlcnN0YWtlX21pbnQGdWludDMyBXRvdGFsBnVpbnQzMgNORlQAAghhc3NldF9pZAZ1aW50NjQSbG9ja2VkX3VudGlsX3JvdW5kBnVpbnQxNgdORlRNaW50AAIVbWludF9yZWNlaXZlcl9ib2lkX2lkBG5hbWUXbWludF9xdWFudGl0eV9yZW1haW5pbmcGdWludDE2CU5mdEFjdGlvbgAHD2NvbGxlY3Rpb25fbmFtZQRuYW1lC3NjaGVtYV9uYW1lBG5hbWULdGVtcGxhdGVfaWQFaW50MzIabWF0Y2hfaW1tdXRhYmxlX2F0dHJpYnV0ZXMRQXRvbWljQXR0cmlidXRlW10YbWF0Y2hfbXV0YWJsZV9hdHRyaWJ1dGVzEUF0b21pY0F0dHJpYnV0ZVtdBGJ1cm4EYm9vbAtsb2NrX3JvdW5kcwZ1aW50MTYHTmZ0TWludAAGEG1pbnRfdGVtcGxhdGVfaWQFaW50MzIQbWludF9zY2hlbWFfbmFtZQRuYW1lFG1pbnRfY29sbGVjdGlvbl9uYW1lBG5hbWUOaW1tdXRhYmxlX2RhdGERQXRvbWljQXR0cmlidXRlW10MbXV0YWJsZV9kYXRhEUF0b21pY0F0dHJpYnV0ZVtdCHF1YW50aXR5BXVpbnQ4BU9mZmVyAAYIb2ZmZXJfaWQGdWludDY0DHJlcXVpcmVtZW50cxFPZmZlclJlcXVpcmVtZW50cwdhY3Rpb25zC09mZmVyQWN0aW9uB3Jld2FyZHMMT2ZmZXJSZXdhcmRzBmxpbWl0cwtPZmZlckxpbWl0cw10b3RhbF9jbGFpbWVkBnVpbnQzMgtPZmZlckFjdGlvbgAED2RlbGVnYXRlZF9zdGFrZQZ1aW50MTYec3Rha2VfbG9ja2VkX2FkZGl0aW9uYWxfcm91bmRzBnVpbnQxNgtuZnRfYWN0aW9ucwtOZnRBY3Rpb25bXQ9iYWxhbmNlX3BheW1lbnQGdWludDMyC09mZmVyTGltaXRzAAIYb2ZmZXJfcXVhbnRpdHlfcmVtYWluaW5nBnVpbnQzMhVhdmFpbGFibGVfdW50aWxfcm91bmQGdWludDE2EU9mZmVyUmVxdWlyZW1lbnRzAAUHdGVhbV9pZAVieXRlcwltaW5fcG93ZXIGdWludDE2C21pbl9iYWxhbmNlBnVpbnQzMgltaW5fc3Rha2UGdWludDMyIG1pbl9jdW11bGF0aXZlX3RlYW1fY29udHJpYnV0aW9uBnVpbnQzMgxPZmZlclJld2FyZHMABQluZnRfbWludHMJTmZ0TWludFtdD2JhbGFuY2VfZGVwb3NpdAZ1aW50MzIPZGVsZWdhdGVkX3N0YWtlBnVpbnQxNh5zdGFrZV9sb2NrZWRfYWRkaXRpb25hbF9yb3VuZHMGdWludDE2FGFjdGl2YXRlX2Jvb3N0ZXJfaWRzBWJ5dGVzD1Blcm1pc3Npb25MZXZlbAACBWFjdG9yBG5hbWUKcGVybWlzc2lvbgRuYW1lDVBvd2VyQ2xhaW1Mb2cABAZiZWZvcmUGdWludDMyBWFmdGVyBnVpbnQzMg1mcm9tX2Jvb3N0ZXJzBnVpbnQzMg5lbGFwc2VkX3JvdW5kcwZ1aW50MTYHU3BvbnNvcgAGD3Nwb25zb3JfYm9pZF9pZARuYW1lD2ludml0ZXNfYmFsYW5jZQZ1aW50MTYWaW52aXRlX2NvZGVzX3VuY2xhaW1lZAZ1aW50MTYUaW52aXRlX2NvZGVzX2NsYWltZWQGdWludDMyEnNwb25zb3JlZF91cGdyYWRlcwZ1aW50MzIVdXBncmFkZXNfdG90YWxfZWFybmVkBnVpbnQzMgVTdGFrZQAFCHN0YWtlX2lkBnVpbnQ2NAxmcm9tX2JvaWRfaWQEbmFtZQp0b19ib2lkX2lkBG5hbWUOc3Rha2VfcXVhbnRpdHkGdWludDE2EmxvY2tlZF91bnRpbF9yb3VuZAZ1aW50MTYEVGVhbQAMB3RlYW1faWQGdWludDE2B2JhbGFuY2UGdWludDMyBXN0YWtlDEFjY291bnRTdGFrZQVvd25lcgRuYW1lCG1hbmFnZXJzBm5hbWVbXRBtaW5fcHdyX3RheF9tdWx0BXVpbnQ4Dm93bmVyX2N1dF9tdWx0BXVpbnQ4DXVybF9zYWZlX25hbWUGc3RyaW5nBXBvd2VyBnVpbnQ2NAdtZW1iZXJzBnVpbnQzMg9sYXN0X2VkaXRfcm91bmQGdWludDE2BG1ldGEFYnl0ZXMMVG9rZW5VbnN0YWtlAAIWcmVkZWVtYWJsZV9hZnRlcl9yb3VuZAZ1aW50MTYIcXVhbnRpdHkGdWludDMyC2FjY291bnQuYWRkAAQHYm9pZF9pZARuYW1lBm93bmVycwZuYW1lW10Ic3BvbnNvcnMGbmFtZVtdBGtleXMMcHVibGljX2tleVtdC2FjY291bnQuYnV5AAINcGF5ZXJfYm9pZF9pZARuYW1lC25ld19hY2NvdW50DUFjY291bnRDcmVhdGUMYWNjb3VudC5lZGl0AAIHYm9pZF9pZARuYW1lBG1ldGEFYnl0ZXMMYWNjb3VudC5mcmVlAAEHYm9pZF9pZARuYW1lCmFjY291bnQucm0AAQdib2lkX2lkBG5hbWUEYXV0aAAFB2JvaWRfaWQEbmFtZQdhY3Rpb25zCEFjdGlvbltdA3NpZwlzaWduYXR1cmUIa2V5SW5kZXgFaW50MzIPZXhwaXJlc191dGNfc2VjBnVpbnQzMgthdXRoLmFkZGtleQACB2JvaWRfaWQEbmFtZQNrZXkKcHVibGljX2tleQlhdXRoLmluaXQAAAphdXRoLnJta2V5AAIHYm9pZF9pZARuYW1lCGtleUluZGV4BWludDMyC2Jvb3N0ZXIuYWRkAAIHYm9pZF9pZARuYW1lCmJvb3N0ZXJfaWQFdWludDgLYm9vc3Rlci5uZXcAAQdib29zdGVyB0Jvb3N0ZXIKYm9vc3Rlci5ybQACB2JvaWRfaWQEbmFtZQ1ib29zdGVyX2luZGV4B2ludDMyW10MY29uZmlnLmNsZWFyAAAKY29uZmlnLnNldAABBmNvbmZpZwZDb25maWcMZ2xvYmFsLmNoYWluAAEKY2hhaW5fbmFtZQRuYW1lDGdsb2JhbC5jbGVhcgAACmdsb2JhbC5zZXQAAQpnbG9iYWxEYXRhBkdsb2JhbAxpbnRlcm5hbHhmZXIABAxmcm9tX2JvaWRfaWQEbmFtZQp0b19ib2lkX2lkBG5hbWUIcXVhbnRpdHkGdWludDMyBG1lbW8Gc3RyaW5nCmludml0ZS5hZGQAAwdib2lkX2lkBG5hbWULaW52aXRlX2NvZGUGdWludDY0A2tleQpwdWJsaWNfa2V5Cmludml0ZS5idXkAAgdib2lkX2lkBG5hbWUIcXVhbnRpdHkGdWludDE2DGludml0ZS5jbGFpbQAED3Nwb25zb3JfYm9pZF9pZARuYW1lC2ludml0ZV9jb2RlBnVpbnQ2NANzaWcJc2lnbmF0dXJlC25ld19hY2NvdW50DUFjY291bnRDcmVhdGUJaW52aXRlLnJtAAIPc3BvbnNvcl9ib2lkX2lkBG5hbWULaW52aXRlX2NvZGUGdWludDY0CWxvZ3B3cmFkZAAGB2JvaWRfaWQEbmFtZQhyZWNlaXZlZAZ1aW50MTYSZnJvbV9tdWx0X2Jvb3N0ZXJzBnVpbnQxNhNkaXZlcnRlZF90b19zcG9uc29yBnVpbnQxNg9wb3dlcl9pbmNyZWFzZWQGdWludDE2BW9yaWduBG5hbWULbG9ncHdyY2xhaW0AAwdib2lkX2lkBG5hbWUFcG93ZXINUG93ZXJDbGFpbUxvZwRtaW50B01pbnRMb2cEbWludAACAnRvBG5hbWUOd2hvbGVfcXVhbnRpdHkGdWludDMyCG5mdC5sb2NrAAMHYm9pZF9pZARuYW1lCGFzc2V0X2lkBnVpbnQ2NBJsb2NrZWRfdW50aWxfcm91bmQGdWludDE2DG5mdC5yZWNlaXZlcgACB2JvaWRfaWQEbmFtZQ1taW50X3F1YW50aXR5BnVpbnQxNgxuZnQud2l0aGRyYXcAAwdib2lkX2lkBG5hbWUJYXNzZXRfaWRzCHVpbnQ2NFtdAnRvBG5hbWUIbmZ0LnhmZXIAAwxmcm9tX2JvaWRfaWQEbmFtZQp0b19ib2lkX2lkBG5hbWUJYXNzZXRfaWRzCHVpbnQ2NFtdCW9mZmVyLmFkZAAEDHJlcXVpcmVtZW50cxFPZmZlclJlcXVpcmVtZW50cwdhY3Rpb25zC09mZmVyQWN0aW9uB3Jld2FyZHMMT2ZmZXJSZXdhcmRzBmxpbWl0cwtPZmZlckxpbWl0cwtvZmZlci5jbGFpbQADB2JvaWRfaWQEbmFtZQhvZmZlcl9pZAZ1aW50NjQXcmVxdWlyZWRfbmZ0X2FjdGlvbl9pZHMIdWludDY0W10Lb2ZmZXIuY2xlYW4AAAhvZmZlci5ybQABCG9mZmVyX2lkBnVpbnQ2NAlvd25lci5hZGQAAgdib2lkX2lkBG5hbWUFb3duZXIEbmFtZQhvd25lci5ybQACB2JvaWRfaWQEbmFtZQVvd25lcgRuYW1lCXBvd2VyLmFkZAACB2JvaWRfaWQEbmFtZQVwb3dlcgZ1aW50MTYLcG93ZXIuY2xhaW0AAQdib2lkX2lkBG5hbWUKc3BvbnNvci5ybQABD3Nwb25zb3JfYm9pZF9pZARuYW1lC3Nwb25zb3Iuc2V0AAEDcm93B1Nwb25zb3IFc3Rha2UAAgdib2lkX2lkBG5hbWUIcXVhbnRpdHkGdWludDMyC3N0YWtlLmRlbGVnAAQMZnJvbV9ib2lkX2lkBG5hbWUKdG9fYm9pZF9pZARuYW1lDnN0YWtlX3F1YW50aXR5BnVpbnQxNhBsb2NrX3VudGlsX3JvdW5kBnVpbnQxNgt0ZWFtLmNoYW5nZQADB2JvaWRfaWQEbmFtZQtuZXdfdGVhbV9pZAV1aW50OBBuZXdfcHdyX3RheF9tdWx0BXVpbnQ4C3RlYW0uY3JlYXRlAAQFb3duZXIEbmFtZRBtaW5fcHdyX3RheF9tdWx0BXVpbnQ4Dm93bmVyX2N1dF9tdWx0BXVpbnQ4DXVybF9zYWZlX25hbWUGc3RyaW5nCXRlYW0uZWRpdAAGB3RlYW1faWQFdWludDgFb3duZXIEbmFtZQhtYW5hZ2VycwZuYW1lW10QbWluX3B3cl90YXhfbXVsdAV1aW50OA5vd25lcl9jdXRfbXVsdAV1aW50OA11cmxfc2FmZV9uYW1lBnN0cmluZwd0ZWFtLnJtAAEHdGVhbV9pZAV1aW50OAx0ZWFtLnNldG1ldGEAAgd0ZWFtX2lkBXVpbnQ4BG1ldGEFYnl0ZXMMdGVhbS50YXhyYXRlAAIHYm9pZF9pZARuYW1lEG5ld19wd3JfdGF4X211bHQFdWludDgJdGhpc3JvdW5kAAALdW5zdGFrZS5lbmQAAQdib2lkX2lkBG5hbWUMdW5zdGFrZS5pbml0AAIHYm9pZF9pZARuYW1lCHF1YW50aXR5BnVpbnQzMgx1bnN0YWtlLnN0b3AAAQdib2lkX2lkBG5hbWUMdW5zdGtlLmRlbGVnAAEIc3Rha2VfaWQGdWludDY0CHdpdGhkcmF3AAMHYm9pZF9pZARuYW1lCHF1YW50aXR5BnVpbnQzMgJ0bwRuYW1lNQBSMiBPTREyC2FjY291bnQuYWRkAAC8PiBPTREyC2FjY291bnQuYnV5AJBdUiBPTREyDGFjY291bnQuZWRpdACg1F0gT00RMgxhY2NvdW50LmZyZWUAAIC8IE9NETIKYWNjb3VudC5ybQAAAAAAANCyNgRhdXRoAAC8gikZ0LI2C2F1dGguYWRka2V5AAAAyG460LI2CWF1dGguaW5pdAAAgFdQXtCyNgphdXRoLnJta2V5AABSMuCqjCk9C2Jvb3N0ZXIuYWRkAAC4muCqjCk9C2Jvb3N0ZXIubmV3AACAvOCqjCk9CmJvb3N0ZXIucm0AcI2KCDC3JkUMY29uZmlnLmNsZWFyAABAVhgwtyZFCmNvbmZpZy5zZXQAMJ1pCERzaGQMZ2xvYmFsLmNoYWluAHCNighEc2hkDGdsb2JhbC5jbGVhcgAAQFYYRHNoZApnbG9iYWwuc2V0AHDV6tHMq/J0DGludGVybmFseGZlcgAAQEoGqOz2dAppbnZpdGUuYWRkAACA1weo7PZ0Cmludml0ZS5idXkAIJ2JCKjs9nQMaW52aXRlLmNsYWltAAAAkBeo7PZ0CWludml0ZS5ybQAAAEjJXF4ZjQlsb2dwd3JhZGQAAKQzEV1eGY0LbG9ncHdyY2xhaW0AAAAAAACQp5MEbWludAAAAAAQ0QjymghuZnQubG9jawBw1XYKqQvymgxuZnQucmVjZWl2ZXIAwM1NLTsO8poMbmZ0LndpdGhkcmF3AAAAAFetDvKaCG5mdC54ZmVyAAAASMmAq9aiCW9mZmVyLmFkZAAApDMRgavWogtvZmZlci5jbGFpbQAAplERgavWogtvZmZlci5jbGVhbgAAAADygqvWoghvZmZlci5ybQAAAEjJgKsmpwlvd25lci5hZGQAAAAA8oKrJqcIb3duZXIucm0AAABIyYCrOK0JcG93ZXIuYWRkAACkMxGBqzitC3Bvd2VyLmNsYWltAACAvOBSPGnFCnNwb25zb3Iucm0AALLC4FI8acULc3BvbnNvci5zZXQAAAAAAAAFTcYFc3Rha2UAAJiKKgEFTcYLc3Rha2UuZGVsZWcAABSbpiEgjcoLdGVhbS5jaGFuZ2UAAFQ26iIgjcoLdGVhbS5jcmVhdGUAAADILikgjcoJdGVhbS5lZGl0AAAAAEBeII3KB3RlYW0ucm0AYLKSWWEgjcoMdGVhbS5zZXRtZXRhAKCyud1kII3KDHRlYW0udGF4cmF0ZQAAAEhT04tdywl0aGlzcm91bmQAANJUQEGT8dQLdW5zdGFrZS5lbmQAkN10QEGT8dQMdW5zdGFrZS5pbml0AFBpxkBBk/HUDHVuc3Rha2Uuc3RvcADAVFQJKJjx1Ax1bnN0a2UuZGVsZWcAAAAA3NzUsuMId2l0aGRyYXcADQAAADhPTREyA2k2NAAAB0FjY291bnQAAAAmK5kRMgNpNjQAAAhBY2N0TWV0YQAAAAAA0LI2A2k2NAAABEF1dGgAAAD4qowpPQNpNjQAAAdCb29zdGVyAAAAADC3JkUDaTY0AAAGQ29uZmlnAAAAAERzaGQDaTY0AAAGR2xvYmFsAAAAAKvs9nQDaTY0AAAGSW52aXRlAAAAIE8n85oDaTY0AAAHTkZUTWludAAAAAAAgPOaA2k2NAAAA05GVAAAAADgq9aiA2k2NAAABU9mZmVyAAAA+FI8acUDaTY0AAAHU3BvbnNvcgAAAABgBU3GA2k2NAAABVN0YWtlAAAAAAAsjcoDaTY0AAAEVGVhbQAAAAELQXRvbWljVmFsdWUWBGludDgFaW50MTYFaW50MzIFaW50NjQFdWludDgGdWludDE2BnVpbnQzMgZ1aW50NjQHZmxvYXQzMgdmbG9hdDY0BnN0cmluZwZpbnQ4W10HaW50MTZbXQdpbnQzMltdB2ludDY0W10FYnl0ZXMIdWludDE2W10IdWludDMyW10IdWludDY0W10JZmxvYXQzMltdCWZsb2F0NjRbXQhzdHJpbmdbXQA="
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Variant.type("AtomicValue", [
      Int8,
      Int16,
      Int32,
      Int64,
      UInt8,
      UInt16,
      UInt32,
      UInt64,
      Float32,
      Float64,
      "string",
      { type: Int8, array: true },
      { type: Int16, array: true },
      { type: Int32, array: true },
      { type: Int64, array: true },
      Bytes,
      { type: UInt16, array: true },
      { type: UInt32, array: true },
      { type: UInt64, array: true },
      { type: Float32, array: true },
      { type: Float64, array: true },
      "string[]"
    ])
    export class AtomicValue extends Variant {
      declare value:| Int8
            | Int16
            | Int32
            | Int64
            | UInt8
            | UInt16
            | UInt32
            | UInt64
            | Float32
            | Float64
            | string
            | Int8[]
            | Int16[]
            | Int32[]
            | Int64[]
            | Bytes
            | UInt16[]
            | UInt32[]
            | UInt64[]
            | Float32[]
            | Float64[]
            | string[]
    }
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
    @Struct.type("AccountCreate")
    export class AccountCreate extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(PublicKey, { array: true })
          keys!:PublicKey[]

        @Struct.field(Name, { array: true })
          owners!:Name[]
    }
    @Struct.type("AcctMeta")
    export class AcctMeta extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Bytes)
          meta!:Bytes
    }
    @Struct.type("PermissionLevel")
    export class PermissionLevel extends Struct {
        @Struct.field(Name)
          actor!:Name

        @Struct.field(Name)
          permission!:Name
    }
    @Struct.type("Action")
    export class Action extends Struct {
        @Struct.field(Name)
          account!:Name

        @Struct.field(Name)
          name!:Name

        @Struct.field(PermissionLevel, { array: true })
          authorization!:PermissionLevel[]

        @Struct.field(Bytes)
          data!:Bytes
    }
    @Struct.type("AtomicAttribute")
    export class AtomicAttribute extends Struct {
        @Struct.field("string")
          key!:string

        @Struct.field(AtomicValue)
          value!:AtomicValue
    }
    @Struct.type("AtomicFormat")
    export class AtomicFormat extends Struct {
        @Struct.field("string")
          name!:string

        @Struct.field("string")
          type!:string
    }
    @Struct.type("Auth")
    export class Auth extends Struct {
        @Struct.field(Name)
          boid_id_auth!:Name
    }
    @Struct.type("Booster")
    export class Booster extends Struct {
        @Struct.field(UInt8)
          booster_id!:UInt8

        @Struct.field(UInt8)
          pwr_multiplier!:UInt8

        @Struct.field(UInt16)
          pwr_add_per_round!:UInt16

        @Struct.field(UInt16)
          expire_after_elapsed_rounds!:UInt16

        @Struct.field(UInt32)
          aggregate_pwr_capacity!:UInt32
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
    @Struct.type("ExtendedSymbol")
    export class ExtendedSymbol extends Struct {
        @Struct.field(Asset.Symbol)
          sym!:Asset.Symbol

        @Struct.field(Name)
          contract!:Name
    }
    @Struct.type("Global")
    export class Global extends Struct {
        @Struct.field(Name)
          chain_name!:Name

        @Struct.field(UInt64)
          total_power!:UInt64

        @Struct.field(UInt16)
          last_inflation_adjust_round!:UInt16
    }
    @Struct.type("Invite")
    export class Invite extends Struct {
        @Struct.field(UInt64)
          invite_code!:UInt64

        @Struct.field(PublicKey)
          key!:PublicKey

        @Struct.field(UInt16)
          created_round!:UInt16
    }
    @Struct.type("MintLog")
    export class MintLog extends Struct {
        @Struct.field(UInt32)
          power_mint!:UInt32

        @Struct.field(UInt32)
          powered_stake_mint!:UInt32

        @Struct.field(UInt32)
          account_earned!:UInt32

        @Struct.field(UInt32)
          team_cut!:UInt32

        @Struct.field(UInt32)
          team_owner_earned!:UInt32

        @Struct.field(UInt32)
          overstake_mint!:UInt32

        @Struct.field(UInt32)
          total!:UInt32
    }
    @Struct.type("NFT")
    export class NFT extends Struct {
        @Struct.field(UInt64)
          asset_id!:UInt64

        @Struct.field(UInt16)
          locked_until_round!:UInt16
    }
    @Struct.type("NFTMint")
    export class NFTMint extends Struct {
        @Struct.field(Name)
          mint_receiver_boid_id!:Name

        @Struct.field(UInt16)
          mint_quantity_remaining!:UInt16
    }
    @Struct.type("NftAction")
    export class NftAction extends Struct {
        @Struct.field(Name)
          collection_name!:Name

        @Struct.field(Name)
          schema_name!:Name

        @Struct.field(Int32)
          template_id!:Int32

        @Struct.field(AtomicAttribute, { array: true })
          match_immutable_attributes!:AtomicAttribute[]

        @Struct.field(AtomicAttribute, { array: true })
          match_mutable_attributes!:AtomicAttribute[]

        @Struct.field("bool")
          burn!:boolean

        @Struct.field(UInt16)
          lock_rounds!:UInt16
    }
    @Struct.type("NftMint")
    export class NftMint extends Struct {
        @Struct.field(Int32)
          mint_template_id!:Int32

        @Struct.field(Name)
          mint_schema_name!:Name

        @Struct.field(Name)
          mint_collection_name!:Name

        @Struct.field(AtomicAttribute, { array: true })
          immutable_data!:AtomicAttribute[]

        @Struct.field(AtomicAttribute, { array: true })
          mutable_data!:AtomicAttribute[]

        @Struct.field(UInt8)
          quantity!:UInt8
    }
    @Struct.type("OfferRequirements")
    export class OfferRequirements extends Struct {
        @Struct.field(Bytes)
          team_id!:Bytes

        @Struct.field(UInt16)
          min_power!:UInt16

        @Struct.field(UInt32)
          min_balance!:UInt32

        @Struct.field(UInt32)
          min_stake!:UInt32

        @Struct.field(UInt32)
          min_cumulative_team_contribution!:UInt32
    }
    @Struct.type("OfferAction")
    export class OfferAction extends Struct {
        @Struct.field(UInt16)
          delegated_stake!:UInt16

        @Struct.field(UInt16)
          stake_locked_additional_rounds!:UInt16

        @Struct.field(NftAction, { array: true })
          nft_actions!:NftAction[]

        @Struct.field(UInt32)
          balance_payment!:UInt32
    }
    @Struct.type("OfferRewards")
    export class OfferRewards extends Struct {
        @Struct.field(NftMint, { array: true })
          nft_mints!:NftMint[]

        @Struct.field(UInt32)
          balance_deposit!:UInt32

        @Struct.field(UInt16)
          delegated_stake!:UInt16

        @Struct.field(UInt16)
          stake_locked_additional_rounds!:UInt16

        @Struct.field(Bytes)
          activate_booster_ids!:Bytes
    }
    @Struct.type("OfferLimits")
    export class OfferLimits extends Struct {
        @Struct.field(UInt32)
          offer_quantity_remaining!:UInt32

        @Struct.field(UInt16)
          available_until_round!:UInt16
    }
    @Struct.type("Offer")
    export class Offer extends Struct {
        @Struct.field(UInt64)
          offer_id!:UInt64

        @Struct.field(OfferRequirements)
          requirements!:OfferRequirements

        @Struct.field(OfferAction)
          actions!:OfferAction

        @Struct.field(OfferRewards)
          rewards!:OfferRewards

        @Struct.field(OfferLimits)
          limits!:OfferLimits

        @Struct.field(UInt32)
          total_claimed!:UInt32
    }
    @Struct.type("PowerClaimLog")
    export class PowerClaimLog extends Struct {
        @Struct.field(UInt32)
          before!:UInt32

        @Struct.field(UInt32)
          after!:UInt32

        @Struct.field(UInt32)
          from_boosters!:UInt32

        @Struct.field(UInt16)
          elapsed_rounds!:UInt16
    }
    @Struct.type("Sponsor")
    export class Sponsor extends Struct {
        @Struct.field(Name)
          sponsor_boid_id!:Name

        @Struct.field(UInt16)
          invites_balance!:UInt16

        @Struct.field(UInt16)
          invite_codes_unclaimed!:UInt16

        @Struct.field(UInt32)
          invite_codes_claimed!:UInt32

        @Struct.field(UInt32)
          sponsored_upgrades!:UInt32

        @Struct.field(UInt32)
          upgrades_total_earned!:UInt32
    }
    @Struct.type("Stake")
    export class Stake extends Struct {
        @Struct.field(UInt64)
          stake_id!:UInt64

        @Struct.field(Name)
          from_boid_id!:Name

        @Struct.field(Name)
          to_boid_id!:Name

        @Struct.field(UInt16)
          stake_quantity!:UInt16

        @Struct.field(UInt16)
          locked_until_round!:UInt16
    }
    @Struct.type("Team")
    export class Team extends Struct {
        @Struct.field(UInt16)
          team_id!:UInt16

        @Struct.field(UInt32)
          balance!:UInt32

        @Struct.field(AccountStake)
          stake!:AccountStake

        @Struct.field(Name)
          owner!:Name

        @Struct.field(Name, { array: true })
          managers!:Name[]

        @Struct.field(UInt8)
          min_pwr_tax_mult!:UInt8

        @Struct.field(UInt8)
          owner_cut_mult!:UInt8

        @Struct.field("string")
          url_safe_name!:string

        @Struct.field(UInt64)
          power!:UInt64

        @Struct.field(UInt32)
          members!:UInt32

        @Struct.field(UInt16)
          last_edit_round!:UInt16

        @Struct.field(Bytes)
          meta!:Bytes
    }
    @Struct.type("account.add")
    export class accountadd extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Name, { array: true })
          owners!:Name[]

        @Struct.field(Name, { array: true })
          sponsors!:Name[]

        @Struct.field(PublicKey, { array: true })
          keys!:PublicKey[]
    }
    @Struct.type("account.buy")
    export class accountbuy extends Struct {
        @Struct.field(Name)
          payer_boid_id!:Name

        @Struct.field(AccountCreate)
          new_account!:AccountCreate
    }
    @Struct.type("account.edit")
    export class accountedit extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Bytes)
          meta!:Bytes
    }
    @Struct.type("account.free")
    export class accountfree extends Struct {
        @Struct.field(Name)
          boid_id!:Name
    }
    @Struct.type("account.rm")
    export class accountrm extends Struct {
        @Struct.field(Name)
          boid_id!:Name
    }
    @Struct.type("auth")
    export class auth extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Action, { array: true })
          actions!:Action[]

        @Struct.field(Signature)
          sig!:Signature

        @Struct.field(Int32)
          keyIndex!:Int32

        @Struct.field(UInt32)
          expires_utc_sec!:UInt32
    }
    @Struct.type("auth.addkey")
    export class authaddkey extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(PublicKey)
          key!:PublicKey
    }
    @Struct.type("auth.init")
    export class authinit extends Struct {}
    @Struct.type("auth.rmkey")
    export class authrmkey extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Int32)
          keyIndex!:Int32
    }
    @Struct.type("booster.add")
    export class boosteradd extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt8)
          booster_id!:UInt8
    }
    @Struct.type("booster.new")
    export class boosternew extends Struct {
        @Struct.field(Booster)
          booster!:Booster
    }
    @Struct.type("booster.rm")
    export class boosterrm extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Int32, { array: true })
          booster_index!:Int32[]
    }
    @Struct.type("config.clear")
    export class configclear extends Struct {}
    @Struct.type("config.set")
    export class configset extends Struct {
        @Struct.field(Config)
          config!:Config
    }
    @Struct.type("global.chain")
    export class globalchain extends Struct {
        @Struct.field(Name)
          chain_name!:Name
    }
    @Struct.type("global.clear")
    export class globalclear extends Struct {}
    @Struct.type("global.set")
    export class globalset extends Struct {
        @Struct.field(Global)
          globalData!:Global
    }
    @Struct.type("internalxfer")
    export class internalxfer extends Struct {
        @Struct.field(Name)
          from_boid_id!:Name

        @Struct.field(Name)
          to_boid_id!:Name

        @Struct.field(UInt32)
          quantity!:UInt32

        @Struct.field("string")
          memo!:string
    }
    @Struct.type("invite.add")
    export class inviteadd extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt64)
          invite_code!:UInt64

        @Struct.field(PublicKey)
          key!:PublicKey
    }
    @Struct.type("invite.buy")
    export class invitebuy extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt16)
          quantity!:UInt16
    }
    @Struct.type("invite.claim")
    export class inviteclaim extends Struct {
        @Struct.field(Name)
          sponsor_boid_id!:Name

        @Struct.field(UInt64)
          invite_code!:UInt64

        @Struct.field(Signature)
          sig!:Signature

        @Struct.field(AccountCreate)
          new_account!:AccountCreate
    }
    @Struct.type("invite.rm")
    export class inviterm extends Struct {
        @Struct.field(Name)
          sponsor_boid_id!:Name

        @Struct.field(UInt64)
          invite_code!:UInt64
    }
    @Struct.type("logpwradd")
    export class logpwradd extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt16)
          received!:UInt16

        @Struct.field(UInt16)
          from_mult_boosters!:UInt16

        @Struct.field(UInt16)
          diverted_to_sponsor!:UInt16

        @Struct.field(UInt16)
          power_increased!:UInt16

        @Struct.field(Name)
          orign!:Name
    }
    @Struct.type("logpwrclaim")
    export class logpwrclaim extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(PowerClaimLog)
          power!:PowerClaimLog

        @Struct.field(MintLog)
          mint!:MintLog
    }
    @Struct.type("mint")
    export class mint extends Struct {
        @Struct.field(Name)
          to!:Name

        @Struct.field(UInt32)
          whole_quantity!:UInt32
    }
    @Struct.type("nft.lock")
    export class nftlock extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt64)
          asset_id!:UInt64

        @Struct.field(UInt16)
          locked_until_round!:UInt16
    }
    @Struct.type("nft.receiver")
    export class nftreceiver extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt16)
          mint_quantity!:UInt16
    }
    @Struct.type("nft.withdraw")
    export class nftwithdraw extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt64, { array: true })
          asset_ids!:UInt64[]

        @Struct.field(Name)
          to!:Name
    }
    @Struct.type("nft.xfer")
    export class nftxfer extends Struct {
        @Struct.field(Name)
          from_boid_id!:Name

        @Struct.field(Name)
          to_boid_id!:Name

        @Struct.field(UInt64, { array: true })
          asset_ids!:UInt64[]
    }
    @Struct.type("offer.add")
    export class offeradd extends Struct {
        @Struct.field(OfferRequirements)
          requirements!:OfferRequirements

        @Struct.field(OfferAction)
          actions!:OfferAction

        @Struct.field(OfferRewards)
          rewards!:OfferRewards

        @Struct.field(OfferLimits)
          limits!:OfferLimits
    }
    @Struct.type("offer.claim")
    export class offerclaim extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt64)
          offer_id!:UInt64

        @Struct.field(UInt64, { array: true })
          required_nft_action_ids!:UInt64[]
    }
    @Struct.type("offer.clean")
    export class offerclean extends Struct {}
    @Struct.type("offer.rm")
    export class offerrm extends Struct {
        @Struct.field(UInt64)
          offer_id!:UInt64
    }
    @Struct.type("owner.add")
    export class owneradd extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Name)
          owner!:Name
    }
    @Struct.type("owner.rm")
    export class ownerrm extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(Name)
          owner!:Name
    }
    @Struct.type("power.add")
    export class poweradd extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt16)
          power!:UInt16
    }
    @Struct.type("power.claim")
    export class powerclaim extends Struct {
        @Struct.field(Name)
          boid_id!:Name
    }
    @Struct.type("sponsor.rm")
    export class sponsorrm extends Struct {
        @Struct.field(Name)
          sponsor_boid_id!:Name
    }
    @Struct.type("sponsor.set")
    export class sponsorset extends Struct {
        @Struct.field(Sponsor)
          row!:Sponsor
    }
    @Struct.type("stake")
    export class stake extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt32)
          quantity!:UInt32
    }
    @Struct.type("stake.deleg")
    export class stakedeleg extends Struct {
        @Struct.field(Name)
          from_boid_id!:Name

        @Struct.field(Name)
          to_boid_id!:Name

        @Struct.field(UInt16)
          stake_quantity!:UInt16

        @Struct.field(UInt16)
          lock_until_round!:UInt16
    }
    @Struct.type("team.change")
    export class teamchange extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt8)
          new_team_id!:UInt8

        @Struct.field(UInt8)
          new_pwr_tax_mult!:UInt8
    }
    @Struct.type("team.create")
    export class teamcreate extends Struct {
        @Struct.field(Name)
          owner!:Name

        @Struct.field(UInt8)
          min_pwr_tax_mult!:UInt8

        @Struct.field(UInt8)
          owner_cut_mult!:UInt8

        @Struct.field("string")
          url_safe_name!:string
    }
    @Struct.type("team.edit")
    export class teamedit extends Struct {
        @Struct.field(UInt8)
          team_id!:UInt8

        @Struct.field(Name)
          owner!:Name

        @Struct.field(Name, { array: true })
          managers!:Name[]

        @Struct.field(UInt8)
          min_pwr_tax_mult!:UInt8

        @Struct.field(UInt8)
          owner_cut_mult!:UInt8

        @Struct.field("string")
          url_safe_name!:string
    }
    @Struct.type("team.rm")
    export class teamrm extends Struct {
        @Struct.field(UInt8)
          team_id!:UInt8
    }
    @Struct.type("team.setmeta")
    export class teamsetmeta extends Struct {
        @Struct.field(UInt8)
          team_id!:UInt8

        @Struct.field(Bytes)
          meta!:Bytes
    }
    @Struct.type("team.taxrate")
    export class teamtaxrate extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt8)
          new_pwr_tax_mult!:UInt8
    }
    @Struct.type("thisround")
    export class thisround extends Struct {}
    @Struct.type("unstake.end")
    export class unstakeend extends Struct {
        @Struct.field(Name)
          boid_id!:Name
    }
    @Struct.type("unstake.init")
    export class unstakeinit extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt32)
          quantity!:UInt32
    }
    @Struct.type("unstake.stop")
    export class unstakestop extends Struct {
        @Struct.field(Name)
          boid_id!:Name
    }
    @Struct.type("unstke.deleg")
    export class unstkedeleg extends Struct {
        @Struct.field(UInt64)
          stake_id!:UInt64
    }
    @Struct.type("withdraw")
    export class withdraw extends Struct {
        @Struct.field(Name)
          boid_id!:Name

        @Struct.field(UInt32)
          quantity!:UInt32

        @Struct.field(Name)
          to!:Name
    }
}
export const TableMap = {
  accounts: Types.Account,
  acctmeta: Types.AcctMeta,
  auth: Types.Auth,
  boosters: Types.Booster,
  config: Types.Config,
  global: Types.Global,
  invites: Types.Invite,
  nftmint: Types.NFTMint,
  nfts: Types.NFT,
  offers: Types.Offer,
  sponsors: Types.Sponsor,
  stakes: Types.Stake,
  teams: Types.Team
}
export interface TableTypes {
    accounts:Types.Account
    acctmeta:Types.AcctMeta
    auth:Types.Auth
    boosters:Types.Booster
    config:Types.Config
    global:Types.Global
    invites:Types.Invite
    nftmint:Types.NFTMint
    nfts:Types.NFT
    offers:Types.Offer
    sponsors:Types.Sponsor
    stakes:Types.Stake
    teams:Types.Team
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export namespace ActionParams {
    export namespace Type {
        export interface AccountCreate {
            boid_id:NameType
            keys:PublicKeyType[]
            owners:NameType[]
        }
        export interface Action {
            account:NameType
            name:NameType
            authorization:Type.PermissionLevel[]
            data:BytesType
        }
        export interface PermissionLevel {
            actor:NameType
            permission:NameType
        }
        export interface Booster {
            booster_id:UInt8Type
            pwr_multiplier:UInt8Type
            pwr_add_per_round:UInt16Type
            expire_after_elapsed_rounds:UInt16Type
            aggregate_pwr_capacity:UInt32Type
        }
        export interface Config {
            account:Type.ConfigAccount
            power:Type.ConfigPower
            mint:Type.ConfigMint
            team:Type.ConfigTeam
            stake:Type.ConfigStake
            time:Type.ConfigTime
            auth:Type.ConfigAuth
            nft:Type.ConfigNft
            paused:boolean
            allow_deposits:boolean
            allow_withdrawals:boolean
            recoveryAccount:NameType
        }
        export interface ConfigAccount {
            invite_price:UInt32Type
            premium_purchase_price:UInt32Type
            max_premium_prefix:UInt8Type
            max_owners:UInt8Type
            max_boosters:UInt8Type
            suffix_whitelist:NameType[]
            remove_sponsor_price:UInt32Type
            sponsor_max_invite_codes:UInt8Type
            invite_code_expire_rounds:UInt16Type
        }
        export interface ConfigPower {
            sponsor_tax_mult:Float32Type
            powered_stake_mult:Float32Type
            claim_maximum_elapsed_rounds:UInt16Type
            soft_max_pwr_add:UInt16Type
            history_slots_length:UInt8Type
        }
        export interface ConfigMint {
            round_powered_stake_mult:Float32Type
            round_power_mult:Float32Type
        }
        export interface ConfigTeam {
            change_min_rounds:UInt16Type
            edit_team_min_rounds:UInt16Type
            team_edit_max_pct_change:UInt16Type
            buy_team_cost:UInt32Type
            owner_stake_required:UInt32Type
            owner_future_stake_lock_rounds_required:UInt16Type
        }
        export interface ConfigStake {
            unstake_rounds:UInt8Type
            extra_stake_min_locked_rounds:UInt8Type
        }
        export interface ConfigTime {
            rounds_start_sec_since_epoch:UInt32Type
            round_length_sec:UInt32Type
        }
        export interface ConfigAuth {
            key_actions_whitelist:NameType[]
            key_account_max_stake:UInt32Type
            key_account_max_balance:UInt32Type
            account_max_keys:UInt8Type
            worker_max_bill_per_action:UInt32Type
        }
        export interface ConfigNft {
            boid_id_maximum_nfts:UInt16Type
            whitelist_collections:NameType[]
        }
        export interface Global {
            chain_name:NameType
            total_power:UInt64Type
            last_inflation_adjust_round:UInt16Type
        }
        export interface PowerClaimLog {
            before:UInt32Type
            after:UInt32Type
            from_boosters:UInt32Type
            elapsed_rounds:UInt16Type
        }
        export interface MintLog {
            power_mint:UInt32Type
            powered_stake_mint:UInt32Type
            account_earned:UInt32Type
            team_cut:UInt32Type
            team_owner_earned:UInt32Type
            overstake_mint:UInt32Type
            total:UInt32Type
        }
        export interface OfferRequirements {
            team_id:BytesType
            min_power:UInt16Type
            min_balance:UInt32Type
            min_stake:UInt32Type
            min_cumulative_team_contribution:UInt32Type
        }
        export interface OfferAction {
            delegated_stake:UInt16Type
            stake_locked_additional_rounds:UInt16Type
            nft_actions:Type.NftAction[]
            balance_payment:UInt32Type
        }
        export interface NftAction {
            collection_name:NameType
            schema_name:NameType
            template_id:Int32Type
            match_immutable_attributes:Type.AtomicAttribute[]
            match_mutable_attributes:Type.AtomicAttribute[]
            burn:boolean
            lock_rounds:UInt16Type
        }
        export interface AtomicAttribute {
            key:string
            value:Type.AtomicValue
        }
        export type AtomicValue =
            | Int8Type
            | Int16Type
            | Int32Type
            | Int64Type
            | UInt8Type
            | UInt16Type
            | UInt32Type
            | UInt64Type
            | Float32Type
            | Float64Type
            | string
            | Int8Type[]
            | Int16Type[]
            | Int32Type[]
            | Int64Type[]
            | BytesType
            | UInt16Type[]
            | UInt32Type[]
            | UInt64Type[]
            | Float32Type[]
            | Float64Type[]
            | string[]
            | Types.AtomicValue
        export interface OfferRewards {
            nft_mints:Type.NftMint[]
            balance_deposit:UInt32Type
            delegated_stake:UInt16Type
            stake_locked_additional_rounds:UInt16Type
            activate_booster_ids:BytesType
        }
        export interface NftMint {
            mint_template_id:Int32Type
            mint_schema_name:NameType
            mint_collection_name:NameType
            immutable_data:Type.AtomicAttribute[]
            mutable_data:Type.AtomicAttribute[]
            quantity:UInt8Type
        }
        export interface OfferLimits {
            offer_quantity_remaining:UInt32Type
            available_until_round:UInt16Type
        }
        export interface Sponsor {
            sponsor_boid_id:NameType
            invites_balance:UInt16Type
            invite_codes_unclaimed:UInt16Type
            invite_codes_claimed:UInt32Type
            sponsored_upgrades:UInt32Type
            upgrades_total_earned:UInt32Type
        }
    }
    export interface accountadd {
        boid_id:NameType
        owners:NameType[]
        sponsors:NameType[]
        keys:PublicKeyType[]
    }
    export interface accountbuy {
        payer_boid_id:NameType
        new_account:Type.AccountCreate
    }
    export interface accountedit {
        boid_id:NameType
        meta:BytesType
    }
    export interface accountfree {
        boid_id:NameType
    }
    export interface accountrm {
        boid_id:NameType
    }
    export interface auth {
        boid_id:NameType
        actions:Type.Action[]
        sig:SignatureType
        keyIndex:Int32Type
        expires_utc_sec:UInt32Type
    }
    export interface authaddkey {
        boid_id:NameType
        key:PublicKeyType
    }
    export interface authinit {}
    export interface authrmkey {
        boid_id:NameType
        keyIndex:Int32Type
    }
    export interface boosteradd {
        boid_id:NameType
        booster_id:UInt8Type
    }
    export interface boosternew {
        booster:Type.Booster
    }
    export interface boosterrm {
        boid_id:NameType
        booster_index:Int32Type[]
    }
    export interface configclear {}
    export interface configset {
        config:Type.Config
    }
    export interface globalchain {
        chain_name:NameType
    }
    export interface globalclear {}
    export interface globalset {
        globalData:Type.Global
    }
    export interface internalxfer {
        from_boid_id:NameType
        to_boid_id:NameType
        quantity:UInt32Type
        memo:string
    }
    export interface inviteadd {
        boid_id:NameType
        invite_code:UInt64Type
        key:PublicKeyType
    }
    export interface invitebuy {
        boid_id:NameType
        quantity:UInt16Type
    }
    export interface inviteclaim {
        sponsor_boid_id:NameType
        invite_code:UInt64Type
        sig:SignatureType
        new_account:Type.AccountCreate
    }
    export interface inviterm {
        sponsor_boid_id:NameType
        invite_code:UInt64Type
    }
    export interface logpwradd {
        boid_id:NameType
        received:UInt16Type
        from_mult_boosters:UInt16Type
        diverted_to_sponsor:UInt16Type
        power_increased:UInt16Type
        orign:NameType
    }
    export interface logpwrclaim {
        boid_id:NameType
        power:Type.PowerClaimLog
        mint:Type.MintLog
    }
    export interface mint {
        to:NameType
        whole_quantity:UInt32Type
    }
    export interface nftlock {
        boid_id:NameType
        asset_id:UInt64Type
        locked_until_round:UInt16Type
    }
    export interface nftreceiver {
        boid_id:NameType
        mint_quantity:UInt16Type
    }
    export interface nftwithdraw {
        boid_id:NameType
        asset_ids:UInt64Type[]
        to:NameType
    }
    export interface nftxfer {
        from_boid_id:NameType
        to_boid_id:NameType
        asset_ids:UInt64Type[]
    }
    export interface offeradd {
        requirements:Type.OfferRequirements
        actions:Type.OfferAction
        rewards:Type.OfferRewards
        limits:Type.OfferLimits
    }
    export interface offerclaim {
        boid_id:NameType
        offer_id:UInt64Type
        required_nft_action_ids:UInt64Type[]
    }
    export interface offerclean {}
    export interface offerrm {
        offer_id:UInt64Type
    }
    export interface owneradd {
        boid_id:NameType
        owner:NameType
    }
    export interface ownerrm {
        boid_id:NameType
        owner:NameType
    }
    export interface poweradd {
        boid_id:NameType
        power:UInt16Type
    }
    export interface powerclaim {
        boid_id:NameType
    }
    export interface sponsorrm {
        sponsor_boid_id:NameType
    }
    export interface sponsorset {
        row:Type.Sponsor
    }
    export interface stake {
        boid_id:NameType
        quantity:UInt32Type
    }
    export interface stakedeleg {
        from_boid_id:NameType
        to_boid_id:NameType
        stake_quantity:UInt16Type
        lock_until_round:UInt16Type
    }
    export interface teamchange {
        boid_id:NameType
        new_team_id:UInt8Type
        new_pwr_tax_mult:UInt8Type
    }
    export interface teamcreate {
        owner:NameType
        min_pwr_tax_mult:UInt8Type
        owner_cut_mult:UInt8Type
        url_safe_name:string
    }
    export interface teamedit {
        team_id:UInt8Type
        owner:NameType
        managers:NameType[]
        min_pwr_tax_mult:UInt8Type
        owner_cut_mult:UInt8Type
        url_safe_name:string
    }
    export interface teamrm {
        team_id:UInt8Type
    }
    export interface teamsetmeta {
        team_id:UInt8Type
        meta:BytesType
    }
    export interface teamtaxrate {
        boid_id:NameType
        new_pwr_tax_mult:UInt8Type
    }
    export interface thisround {}
    export interface unstakeend {
        boid_id:NameType
    }
    export interface unstakeinit {
        boid_id:NameType
        quantity:UInt32Type
    }
    export interface unstakestop {
        boid_id:NameType
    }
    export interface unstkedeleg {
        stake_id:UInt64Type
    }
    export interface withdraw {
        boid_id:NameType
        quantity:UInt32Type
        to:NameType
    }
}

export interface ActionNameParams {
    "account.add":ActionParams.accountadd
    "account.buy":ActionParams.accountbuy
    "account.edit":ActionParams.accountedit
    "account.free":ActionParams.accountfree
    "account.rm":ActionParams.accountrm
    auth:ActionParams.auth
    "auth.addkey":ActionParams.authaddkey
    "auth.init":ActionParams.authinit
    "auth.rmkey":ActionParams.authrmkey
    "booster.add":ActionParams.boosteradd
    "booster.new":ActionParams.boosternew
    "booster.rm":ActionParams.boosterrm
    "config.clear":ActionParams.configclear
    "config.set":ActionParams.configset
    "global.chain":ActionParams.globalchain
    "global.clear":ActionParams.globalclear
    "global.set":ActionParams.globalset
    internalxfer:ActionParams.internalxfer
    "invite.add":ActionParams.inviteadd
    "invite.buy":ActionParams.invitebuy
    "invite.claim":ActionParams.inviteclaim
    "invite.rm":ActionParams.inviterm
    logpwradd:ActionParams.logpwradd
    logpwrclaim:ActionParams.logpwrclaim
    mint:ActionParams.mint
    "nft.lock":ActionParams.nftlock
    "nft.receiver":ActionParams.nftreceiver
    "nft.withdraw":ActionParams.nftwithdraw
    "nft.xfer":ActionParams.nftxfer
    "offer.add":ActionParams.offeradd
    "offer.claim":ActionParams.offerclaim
    "offer.clean":ActionParams.offerclean
    "offer.rm":ActionParams.offerrm
    "owner.add":ActionParams.owneradd
    "owner.rm":ActionParams.ownerrm
    "power.add":ActionParams.poweradd
    "power.claim":ActionParams.powerclaim
    "sponsor.rm":ActionParams.sponsorrm
    "sponsor.set":ActionParams.sponsorset
    stake:ActionParams.stake
    "stake.deleg":ActionParams.stakedeleg
    "team.change":ActionParams.teamchange
    "team.create":ActionParams.teamcreate
    "team.edit":ActionParams.teamedit
    "team.rm":ActionParams.teamrm
    "team.setmeta":ActionParams.teamsetmeta
    "team.taxrate":ActionParams.teamtaxrate
    thisround:ActionParams.thisround
    "unstake.end":ActionParams.unstakeend
    "unstake.init":ActionParams.unstakeinit
    "unstake.stop":ActionParams.unstakestop
    "unstke.deleg":ActionParams.unstkedeleg
    withdraw:ActionParams.withdraw
}

export type ActionNames = keyof ActionNameParams
export type TableNames = keyof TableTypes

export class Contract extends BaseContract {
  constructor(args:PartialBy<ContractArgs, "abi" | "account">) {
    super({
      client: args.client,
      abi,
      account: args.account || Name.from("boid")
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
