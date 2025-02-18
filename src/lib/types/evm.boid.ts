import type { Action, Checksum160Type, NameType, UInt64Type, UInt8Type } from "@wharfkit/antelope"
import {
  ABI,
  Asset,
  Blob,
  Checksum160,
  Name,
  Struct,
  TimePoint,
  UInt64,
  UInt8
} from "@wharfkit/antelope"
import type { ActionOptions, ContractArgs, PartialBy, Table } from "@wharfkit/contract"
import { Contract as BaseContract } from "@wharfkit/contract"
export const abiBlob = Blob.from(
  "DmVvc2lvOjphYmkvMS4yAAkMYnJpZGdlY29uZmlnAAgSZXZtX2JyaWRnZV9hZGRyZXNzC2NoZWNrc3VtMTYwEGV2bV9icmlkZ2Vfc2NvcGUGdWludDY0EWV2bV90b2tlbl9hZGRyZXNzC2NoZWNrc3VtMTYwDGV2bV9jaGFpbl9pZAV1aW50OBNuYXRpdmVfdG9rZW5fc3ltYm9sBnN5bWJvbBVuYXRpdmVfdG9rZW5fY29udHJhY3QEbmFtZQ1mZWVzX2NvbnRyYWN0BG5hbWUJaXNfbG9ja2VkBGJvb2wMY2xyZmFpbGVkcmVxAAAEaW5pdAAHEmV2bV9icmlkZ2VfYWRkcmVzcwtjaGVja3N1bTE2MBFldm1fdG9rZW5fYWRkcmVzcwtjaGVja3N1bTE2MAxldm1fY2hhaW5faWQFdWludDgTbmF0aXZlX3Rva2VuX3N5bWJvbAZzeW1ib2wVbmF0aXZlX3Rva2VuX2NvbnRyYWN0BG5hbWUNZmVlc19jb250cmFjdARuYW1lCWlzX2xvY2tlZARib29sC3JlZnN0dWNrcmVxAAAJcmVxbm90aWZ5AAEGcmVxX2lkBnVpbnQ2NAhyZXF1ZXN0cwAHCnJlcXVlc3RfaWQGdWludDY0CXRpbWVzdGFtcAp0aW1lX3BvaW50CXByb2Nlc3NlZARib29sBmFtb3VudAZ1aW50NjQIcmVjZWl2ZXIEbmFtZQZzZW5kZXIGc3RyaW5nBG1lbW8Gc3RyaW5nBXJtcmVxAAEGcmVxX2lkBnVpbnQ2NApybXJlcW9uZXZtAAEGcmVxX2lkBnVpbnQ2NAl2ZXJpZnl0cngAAQZyZXFfaWQGdWludDY0B2DVTSo6s25EDGNscmZhaWxlZHJlcQAAAAAAAJDddARpbml0AACsuhDpjJe6C3JlZnN0dWNrcmVxAAAA8MtlOq26CXJlcW5vdGlmeQAAAAAAAKuuvAVybXJlcQAAgNxqUquuvApybXJlcW9uZXZtAAAA6Df75a7aCXZlcmlmeXRyeAACwNyaFCmW3D0DaTY0AAAMYnJpZGdlY29uZmlnAAAAOGOlrboDaTY0AAAIcmVxdWVzdHMAAAAAAA=="
)
export const abi = ABI.from(abiBlob)
export namespace Types {
    @Struct.type("bridgeconfig")
    export class bridgeconfig extends Struct {
        @Struct.field(Checksum160)
      declare evm_bridge_address:Checksum160

        @Struct.field(UInt64)
        declare evm_bridge_scope:UInt64

        @Struct.field(Checksum160)
        declare evm_token_address:Checksum160

        @Struct.field(UInt8)
        declare evm_chain_id:UInt8

        @Struct.field(Asset.Symbol)
        declare native_token_symbol:Asset.Symbol

        @Struct.field(Name)
        declare native_token_contract:Name

        @Struct.field(Name)
        declare fees_contract:Name

        @Struct.field("bool")
        declare is_locked:boolean
    }
    @Struct.type("clrfailedreq")
    export class clrfailedreq extends Struct {}
    @Struct.type("init")
    export class init extends Struct {
        @Struct.field(Checksum160)
      declare evm_bridge_address:Checksum160

        @Struct.field(Checksum160)
        declare evm_token_address:Checksum160

        @Struct.field(UInt8)
        declare evm_chain_id:UInt8

        @Struct.field(Asset.Symbol)
        declare native_token_symbol:Asset.Symbol

        @Struct.field(Name)
        declare native_token_contract:Name

        @Struct.field(Name)
        declare fees_contract:Name

        @Struct.field("bool")
        declare is_locked:boolean
    }
    @Struct.type("refstuckreq")
    export class refstuckreq extends Struct {}
    @Struct.type("reqnotify")
    export class reqnotify extends Struct {
        @Struct.field(UInt64)
      declare req_id:UInt64
    }
    @Struct.type("requests")
    export class requests extends Struct {
        @Struct.field(UInt64)
      declare request_id:UInt64

        @Struct.field(TimePoint)
        declare timestamp:TimePoint

        @Struct.field("bool")
        declare processed:boolean

        @Struct.field(UInt64)
        declare amount:UInt64

        @Struct.field(Name)
        declare receiver:Name

        @Struct.field("string")
        declare sender:string

        @Struct.field("string")
        declare memo:string
    }
    @Struct.type("rmreq")
    export class rmreq extends Struct {
        @Struct.field(UInt64)
      declare req_id:UInt64
    }
    @Struct.type("rmreqonevm")
    export class rmreqonevm extends Struct {
        @Struct.field(UInt64)
      declare req_id:UInt64
    }
    @Struct.type("verifytrx")
    export class verifytrx extends Struct {
        @Struct.field(UInt64)
      declare req_id:UInt64
    }
}
export const TableMap = {
  bridgeconfig: Types.bridgeconfig,
  requests: Types.requests
}
export interface TableTypes {
    bridgeconfig:Types.bridgeconfig
    requests:Types.requests
}
export type RowType<T> = T extends keyof TableTypes ? TableTypes[T] : any
export type TableNames = keyof TableTypes
export namespace ActionParams {
    export namespace Type {}
    export interface clrfailedreq {}
    export interface init {
        evm_bridge_address:Checksum160Type
        evm_token_address:Checksum160Type
        evm_chain_id:UInt8Type
        native_token_symbol:Asset.SymbolType
        native_token_contract:NameType
        fees_contract:NameType
        is_locked:boolean
    }
    export interface refstuckreq {}
    export interface reqnotify {
        req_id:UInt64Type
    }
    export interface rmreq {
        req_id:UInt64Type
    }
    export interface rmreqonevm {
        req_id:UInt64Type
    }
    export interface verifytrx {
        req_id:UInt64Type
    }
}
export interface ActionNameParams {
    clrfailedreq:ActionParams.clrfailedreq
    init:ActionParams.init
    refstuckreq:ActionParams.refstuckreq
    reqnotify:ActionParams.reqnotify
    rmreq:ActionParams.rmreq
    rmreqonevm:ActionParams.rmreqonevm
    verifytrx:ActionParams.verifytrx
}
export type ActionNames = keyof ActionNameParams
export class Contract extends BaseContract {
  constructor(args:PartialBy<ContractArgs, "abi" | "account">) {
    super({
      client: args.client,
      abi,
      account: args.account || Name.from("evm.boid")
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
