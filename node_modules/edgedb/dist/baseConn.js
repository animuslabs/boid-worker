"use strict";
/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2019-present MagicStack Inc. and the EdgeDB authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRawConnection = exports.Capabilities = exports.PROTO_VER_MIN = exports.PROTO_VER = void 0;
const codecs_1 = require("./codecs/codecs");
const namedtuple_1 = require("./codecs/namedtuple");
const object_1 = require("./codecs/object");
const tuple_1 = require("./codecs/tuple");
const utils_1 = require("./utils");
const errors = __importStar(require("./errors"));
const resolve_1 = require("./errors/resolve");
const ifaces_1 = require("./ifaces");
const buffer_1 = require("./primitives/buffer");
const chars = __importStar(require("./primitives/chars"));
const event_1 = __importDefault(require("./primitives/event"));
const lru_1 = __importDefault(require("./primitives/lru"));
const options_1 = require("./options");
exports.PROTO_VER = [1, 0];
exports.PROTO_VER_MIN = [0, 9];
var TransactionStatus;
(function (TransactionStatus) {
    TransactionStatus[TransactionStatus["TRANS_IDLE"] = 0] = "TRANS_IDLE";
    TransactionStatus[TransactionStatus["TRANS_ACTIVE"] = 1] = "TRANS_ACTIVE";
    TransactionStatus[TransactionStatus["TRANS_INTRANS"] = 2] = "TRANS_INTRANS";
    TransactionStatus[TransactionStatus["TRANS_INERROR"] = 3] = "TRANS_INERROR";
    TransactionStatus[TransactionStatus["TRANS_UNKNOWN"] = 4] = "TRANS_UNKNOWN";
})(TransactionStatus || (TransactionStatus = {}));
var Capabilities;
(function (Capabilities) {
    Capabilities[Capabilities["NONE"] = 0] = "NONE";
    Capabilities[Capabilities["MODIFICATONS"] = 1] = "MODIFICATONS";
    Capabilities[Capabilities["SESSION_CONFIG"] = 2] = "SESSION_CONFIG";
    Capabilities[Capabilities["TRANSACTION"] = 4] = "TRANSACTION";
    Capabilities[Capabilities["DDL"] = 8] = "DDL";
    Capabilities[Capabilities["PERSISTENT_CONFIG"] = 16] = "PERSISTENT_CONFIG";
    Capabilities[Capabilities["ALL"] = 4294967295] = "ALL";
})(Capabilities = exports.Capabilities || (exports.Capabilities = {}));
const NO_TRANSACTION_CAPABILITIES = (Capabilities.ALL & ~Capabilities.TRANSACTION) >>> 0;
const NO_TRANSACTION_CAPABILITIES_BYTES = Buffer.alloc(8, 0xff);
NO_TRANSACTION_CAPABILITIES_BYTES.writeUInt32BE(NO_TRANSACTION_CAPABILITIES, 4);
const RESTRICTED_CAPABILITIES = (Capabilities.ALL &
    ~Capabilities.TRANSACTION &
    ~Capabilities.SESSION_CONFIG) >>>
    0;
var CompilationFlag;
(function (CompilationFlag) {
    CompilationFlag[CompilationFlag["INJECT_OUTPUT_TYPE_IDS"] = 1] = "INJECT_OUTPUT_TYPE_IDS";
    CompilationFlag[CompilationFlag["INJECT_OUTPUT_TYPE_NAMES"] = 2] = "INJECT_OUTPUT_TYPE_NAMES";
    CompilationFlag[CompilationFlag["INJECT_OUTPUT_OBJECT_IDS"] = 4] = "INJECT_OUTPUT_OBJECT_IDS";
})(CompilationFlag || (CompilationFlag = {}));
const OLD_ERROR_CODES = new Map([
    [84082689, 84082945],
    [84082690, 84082946],
]);
class BaseRawConnection {
    constructor(registry) {
        Object.defineProperty(this, "connected", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "exposeErrorAttributes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "lastStatus", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "codecsRegistry", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "queryCodecCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serverSecret", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serverSettings", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "serverXactStatus", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "buffer", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "messageWaiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "connWaiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "connAbortWaiter", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_abortedWith", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        Object.defineProperty(this, "protocolVersion", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: exports.PROTO_VER
        });
        Object.defineProperty(this, "isLegacyProtocol", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: false
        });
        Object.defineProperty(this, "stateCodec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: codecs_1.INVALID_CODEC
        });
        Object.defineProperty(this, "stateCache", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: null
        });
        this.buffer = new buffer_1.ReadMessageBuffer();
        this.codecsRegistry = registry;
        this.queryCodecCache = new lru_1.default({ capacity: 1000 });
        this.lastStatus = null;
        this.serverSecret = null;
        this.serverSettings = {};
        this.serverXactStatus = TransactionStatus.TRANS_UNKNOWN;
        this.messageWaiter = null;
        this.connWaiter = new event_1.default();
        this.connAbortWaiter = new event_1.default();
    }
    throwNotImplemented(method) {
        throw new errors.InternalClientError(`method ${method} is not implemented`);
    }
    async _waitForMessage() {
        this.throwNotImplemented("_waitForMessage");
    }
    _sendData(data) {
        this.throwNotImplemented("_sendData");
    }
    getConnAbortError() {
        var _a;
        return ((_a = this._abortedWith) !== null && _a !== void 0 ? _a : new errors.InterfaceError(`client has been closed`));
    }
    _checkState() {
        if (this.isClosed()) {
            throw this.getConnAbortError();
        }
    }
    _abortWithError(err) {
        this._abortedWith = err;
        this._abort();
    }
    _ignoreHeaders() {
        let numFields = this.buffer.readInt16();
        while (numFields) {
            this.buffer.readInt16();
            this.buffer.readLenPrefixedBuffer();
            numFields--;
        }
    }
    _abortWaiters(err) {
        var _a;
        if (!this.connWaiter.done) {
            this.connWaiter.setError(err);
        }
        (_a = this.messageWaiter) === null || _a === void 0 ? void 0 : _a.setError(err);
        this.messageWaiter = null;
    }
    _parseHeaders() {
        const ret = new Map();
        let numFields = this.buffer.readInt16();
        while (numFields) {
            const key = this.buffer.readInt16();
            const value = this.buffer.readLenPrefixedBuffer();
            ret.set(key, value);
            numFields--;
        }
        return ret;
    }
    _parseDescribeTypeMessage() {
        let capabilities = -1;
        if (this.isLegacyProtocol) {
            const headers = this._parseHeaders();
            if (headers.has(ifaces_1.LegacyHeaderCodes.capabilities)) {
                capabilities = Number(headers.get(ifaces_1.LegacyHeaderCodes.capabilities).readBigInt64BE());
            }
        }
        else {
            this._ignoreHeaders();
            capabilities = Number(this.buffer.readBigInt64());
        }
        const cardinality = this.buffer.readChar();
        const inTypeId = this.buffer.readUUID();
        const inTypeData = this.buffer.readLenPrefixedBuffer();
        const outTypeId = this.buffer.readUUID();
        const outTypeData = this.buffer.readLenPrefixedBuffer();
        this.buffer.finishMessage();
        let inCodec = this.codecsRegistry.getCodec(inTypeId);
        if (inCodec == null) {
            inCodec = this.codecsRegistry.buildCodec(inTypeData, this.protocolVersion);
        }
        let outCodec = this.codecsRegistry.getCodec(outTypeId);
        if (outCodec == null) {
            outCodec = this.codecsRegistry.buildCodec(outTypeData, this.protocolVersion);
        }
        return [
            cardinality,
            inCodec,
            outCodec,
            capabilities,
            inTypeData,
            outTypeData,
        ];
    }
    _parseCommandCompleteMessage() {
        this._ignoreHeaders();
        let status;
        if (this.isLegacyProtocol) {
            status = this.buffer.readString();
        }
        else {
            this.buffer.readBigInt64();
            status = this.buffer.readString();
            this.buffer.readUUID();
            this.buffer.readLenPrefixedBuffer();
        }
        this.buffer.finishMessage();
        return status;
    }
    _parseErrorMessage() {
        var _a;
        this.buffer.readChar();
        const code = this.buffer.readUInt32();
        const message = this.buffer.readString();
        const errorType = (0, resolve_1.resolveErrorCode)((_a = OLD_ERROR_CODES.get(code)) !== null && _a !== void 0 ? _a : code);
        const err = new errorType(message);
        if (this.exposeErrorAttributes) {
            err.attrs = this._parseHeaders();
        }
        else {
            this._ignoreHeaders();
        }
        this.buffer.finishMessage();
        if (err instanceof errors.AuthenticationError) {
            throw err;
        }
        return err;
    }
    _parseSyncMessage() {
        this._parseHeaders();
        const status = this.buffer.readChar();
        switch (status) {
            case chars.$I:
                this.serverXactStatus = TransactionStatus.TRANS_IDLE;
                break;
            case chars.$T:
                this.serverXactStatus = TransactionStatus.TRANS_INTRANS;
                break;
            case chars.$E:
                this.serverXactStatus = TransactionStatus.TRANS_INERROR;
                break;
            default:
                this.serverXactStatus = TransactionStatus.TRANS_UNKNOWN;
        }
        this.buffer.finishMessage();
    }
    _parseDataMessages(codec, result) {
        const frb = buffer_1.ReadBuffer.alloc();
        const $D = chars.$D;
        const buffer = this.buffer;
        if (Array.isArray(result)) {
            while (buffer.takeMessageType($D)) {
                buffer.consumeMessageInto(frb);
                frb.discard(6);
                result.push(codec.decode(frb));
                frb.finish();
            }
        }
        else {
            while (buffer.takeMessageType($D)) {
                const msg = buffer.consumeMessage();
                result.writeChar($D);
                result.writeInt32(msg.length + 4);
                result.writeBuffer(msg);
            }
        }
    }
    _parseServerSettings(name, value) {
        switch (name) {
            case "suggested_pool_concurrency": {
                this.serverSettings.suggested_pool_concurrency = parseInt(value.toString("utf8"), 10);
                break;
            }
            case "system_config": {
                const buf = new buffer_1.ReadBuffer(value);
                const typedescLen = buf.readInt32() - 16;
                const typedescId = buf.readUUID();
                const typedesc = buf.readBuffer(typedescLen);
                let codec = this.codecsRegistry.getCodec(typedescId);
                if (codec === null) {
                    codec = this.codecsRegistry.buildCodec(typedesc, this.protocolVersion);
                }
                buf.discard(4);
                const data = codec.decode(buf);
                buf.finish();
                this.serverSettings.system_config = data;
                break;
            }
            default:
                this.serverSettings[name] = value;
                break;
        }
    }
    _parseDescribeStateMessage() {
        const typedescId = this.buffer.readUUID();
        const typedesc = this.buffer.readBuffer(this.buffer.readInt32());
        let codec = this.codecsRegistry.getCodec(typedescId);
        if (codec === null) {
            codec = this.codecsRegistry.buildCodec(typedesc, this.protocolVersion);
        }
        this.stateCodec = codec;
        this.stateCache = null;
        this.buffer.finishMessage();
    }
    _fallthrough() {
        const mtype = this.buffer.getMessageType();
        switch (mtype) {
            case chars.$S: {
                const name = this.buffer.readString();
                const value = this.buffer.readLenPrefixedBuffer();
                this._parseServerSettings(name, value);
                this.buffer.finishMessage();
                break;
            }
            case chars.$L: {
                const severity = this.buffer.readChar();
                const code = this.buffer.readUInt32();
                const message = this.buffer.readString();
                this._parseHeaders();
                this.buffer.finishMessage();
                console.info("SERVER MESSAGE", severity, code, message);
                break;
            }
            default:
                throw new errors.UnexpectedMessageError(`unexpected message type ${mtype} ("${chars.chr(mtype)}")`);
        }
    }
    async _legacyParse(query, outputFormat, expectOne) {
        const wb = new buffer_1.WriteMessageBuffer();
        const parseSendsTypeData = (0, utils_1.versionGreaterThanOrEqual)(this.protocolVersion, [0, 14]);
        wb.beginMessage(chars.$P)
            .writeLegacyHeaders({
            explicitObjectids: "true",
            allowCapabilities: NO_TRANSACTION_CAPABILITIES_BYTES,
        })
            .writeChar(outputFormat)
            .writeChar(expectOne ? ifaces_1.Cardinality.AT_MOST_ONE : ifaces_1.Cardinality.MANY);
        wb.writeString("");
        wb.writeString(query);
        wb.endMessage();
        wb.writeSync();
        this._sendData(wb.unwrap());
        let cardinality;
        let inTypeId;
        let outTypeId;
        let inCodec;
        let outCodec;
        let capabilities = -1;
        let parsing = true;
        let error = null;
        let inCodecData = null;
        let outCodecData = null;
        while (parsing) {
            if (!this.buffer.takeMessage()) {
                await this._waitForMessage();
            }
            const mtype = this.buffer.getMessageType();
            switch (mtype) {
                case chars.$1: {
                    const headers = this._parseHeaders();
                    if (headers.has(ifaces_1.LegacyHeaderCodes.capabilities)) {
                        capabilities = Number(headers.get(ifaces_1.LegacyHeaderCodes.capabilities).readBigInt64BE());
                    }
                    cardinality = this.buffer.readChar();
                    if (parseSendsTypeData) {
                        inTypeId = this.buffer.readUUID();
                        inCodecData = this.buffer.readLenPrefixedBuffer();
                        outTypeId = this.buffer.readUUID();
                        outCodecData = this.buffer.readLenPrefixedBuffer();
                    }
                    else {
                        inTypeId = this.buffer.readUUID();
                        outTypeId = this.buffer.readUUID();
                    }
                    this.buffer.finishMessage();
                    break;
                }
                case chars.$E: {
                    error = this._parseErrorMessage();
                    break;
                }
                case chars.$Z: {
                    this._parseSyncMessage();
                    parsing = false;
                    break;
                }
                default:
                    this._fallthrough();
            }
        }
        if (error != null) {
            throw error;
        }
        if (inTypeId == null || outTypeId == null) {
            throw new errors.ProtocolError("did not receive in/out type ids in Parse response");
        }
        inCodec = this.codecsRegistry.getCodec(inTypeId);
        outCodec = this.codecsRegistry.getCodec(outTypeId);
        if (inCodec == null && inCodecData != null) {
            inCodec = this.codecsRegistry.buildCodec(inCodecData, this.protocolVersion);
        }
        if (outCodec == null && outCodecData != null) {
            outCodec = this.codecsRegistry.buildCodec(outCodecData, this.protocolVersion);
        }
        if (inCodec == null || outCodec == null || !parseSendsTypeData) {
            if (parseSendsTypeData) {
                throw new errors.ProtocolError("in/out codecs were not sent");
            }
            wb.reset();
            wb.beginMessage(chars.$D)
                .writeInt16(0)
                .writeChar(chars.$T)
                .writeString("")
                .endMessage()
                .writeSync();
            this._sendData(wb.unwrap());
            parsing = true;
            while (parsing) {
                if (!this.buffer.takeMessage()) {
                    await this._waitForMessage();
                }
                const mtype = this.buffer.getMessageType();
                switch (mtype) {
                    case chars.$T: {
                        try {
                            [
                                cardinality,
                                inCodec,
                                outCodec,
                                capabilities,
                                inCodecData,
                                outCodecData,
                            ] = this._parseDescribeTypeMessage();
                        }
                        catch (e) {
                            error = e;
                        }
                        break;
                    }
                    case chars.$E: {
                        error = this._parseErrorMessage();
                        break;
                    }
                    case chars.$Z: {
                        this._parseSyncMessage();
                        parsing = false;
                        break;
                    }
                    default:
                        this._fallthrough();
                }
            }
            if (error != null) {
                throw error;
            }
        }
        if (cardinality == null || outCodec == null || inCodec == null) {
            throw new errors.ProtocolError("failed to receive type information in response to a Parse message");
        }
        return [
            cardinality,
            inCodec,
            outCodec,
            capabilities,
            inCodecData,
            outCodecData,
        ];
    }
    _encodeArgs(args, inCodec) {
        if ((0, utils_1.versionGreaterThanOrEqual)(this.protocolVersion, [0, 12])) {
            if (inCodec === codecs_1.NULL_CODEC) {
                if (args != null) {
                    throw new errors.QueryArgumentError(`This query does not contain any query parameters, ` +
                        `but query arguments were provided to the 'query*()' method`);
                }
                return codecs_1.NullCodec.BUFFER;
            }
            if (inCodec instanceof object_1.ObjectCodec) {
                return inCodec.encodeArgs(args);
            }
            throw new errors.ProtocolError("invalid input codec");
        }
        else {
            if (inCodec === tuple_1.EMPTY_TUPLE_CODEC) {
                if (args != null) {
                    throw new errors.QueryArgumentError(`This query does not contain any query parameters, ` +
                        `but query arguments were provided to the 'query*()' method`);
                }
                return tuple_1.EmptyTupleCodec.BUFFER;
            }
            if (inCodec instanceof namedtuple_1.NamedTupleCodec ||
                inCodec instanceof tuple_1.TupleCodec) {
                return inCodec.encodeArgs(args);
            }
            throw new errors.ProtocolError("invalid input codec");
        }
    }
    async _legacyExecuteFlow(args, inCodec, outCodec, result) {
        const wb = new buffer_1.WriteMessageBuffer();
        wb.beginMessage(chars.$E)
            .writeLegacyHeaders({
            allowCapabilities: NO_TRANSACTION_CAPABILITIES_BYTES,
        })
            .writeString("")
            .writeBuffer(this._encodeArgs(args, inCodec))
            .endMessage()
            .writeSync();
        this._sendData(wb.unwrap());
        let parsing = true;
        let error = null;
        while (parsing) {
            if (!this.buffer.takeMessage()) {
                await this._waitForMessage();
            }
            const mtype = this.buffer.getMessageType();
            switch (mtype) {
                case chars.$D: {
                    if (error == null) {
                        try {
                            this._parseDataMessages(outCodec, result);
                        }
                        catch (e) {
                            error = e;
                            this.buffer.finishMessage();
                        }
                    }
                    else {
                        this.buffer.discardMessage();
                    }
                    break;
                }
                case chars.$C: {
                    this.lastStatus = this._parseCommandCompleteMessage();
                    break;
                }
                case chars.$E: {
                    error = this._parseErrorMessage();
                    break;
                }
                case chars.$Z: {
                    this._parseSyncMessage();
                    parsing = false;
                    break;
                }
                default:
                    this._fallthrough();
            }
        }
        if (error != null) {
            throw error;
        }
    }
    async _legacyOptimisticExecuteFlow(query, args, outputFormat, expectedCardinality, inCodec, outCodec, result) {
        const expectOne = expectedCardinality === ifaces_1.Cardinality.ONE ||
            expectedCardinality === ifaces_1.Cardinality.AT_MOST_ONE;
        const wb = new buffer_1.WriteMessageBuffer();
        wb.beginMessage(chars.$O);
        wb.writeLegacyHeaders({
            explicitObjectids: "true",
            allowCapabilities: NO_TRANSACTION_CAPABILITIES_BYTES,
        });
        wb.writeChar(outputFormat);
        wb.writeChar(expectOne ? ifaces_1.Cardinality.AT_MOST_ONE : ifaces_1.Cardinality.MANY);
        wb.writeString(query);
        wb.writeBuffer(inCodec.tidBuffer);
        wb.writeBuffer(outCodec.tidBuffer);
        wb.writeBuffer(this._encodeArgs(args, inCodec));
        wb.endMessage();
        wb.writeSync();
        this._sendData(wb.unwrap());
        let reExec = false;
        let error = null;
        let parsing = true;
        let newCard = null;
        let capabilities = -1;
        while (parsing) {
            if (!this.buffer.takeMessage()) {
                await this._waitForMessage();
            }
            const mtype = this.buffer.getMessageType();
            switch (mtype) {
                case chars.$D: {
                    if (error == null) {
                        try {
                            this._parseDataMessages(outCodec, result);
                        }
                        catch (e) {
                            error = e;
                            this.buffer.finishMessage();
                        }
                    }
                    else {
                        this.buffer.discardMessage();
                    }
                    break;
                }
                case chars.$C: {
                    this.lastStatus = this._parseCommandCompleteMessage();
                    break;
                }
                case chars.$Z: {
                    this._parseSyncMessage();
                    parsing = false;
                    break;
                }
                case chars.$T: {
                    try {
                        [newCard, inCodec, outCodec, capabilities] =
                            this._parseDescribeTypeMessage();
                        const key = this._getQueryCacheKey(query, outputFormat, expectedCardinality);
                        this.queryCodecCache.set(key, [
                            newCard,
                            inCodec,
                            outCodec,
                            capabilities,
                        ]);
                        reExec = true;
                    }
                    catch (e) {
                        error = e;
                    }
                    break;
                }
                case chars.$E: {
                    error = this._parseErrorMessage();
                    break;
                }
                default:
                    this._fallthrough();
            }
        }
        if (error != null) {
            throw error;
        }
        if (reExec) {
            this._validateFetchCardinality(newCard, outputFormat, expectedCardinality);
            return await this._legacyExecuteFlow(args, inCodec, outCodec, result);
        }
    }
    _encodeParseParams(wb, query, outputFormat, expectedCardinality, state, privilegedMode, options) {
        var _a, _b;
        wb.writeFlags(4294967295, privilegedMode ? Capabilities.ALL : RESTRICTED_CAPABILITIES);
        wb.writeFlags(0, 0 |
            ((options === null || options === void 0 ? void 0 : options.injectObjectids)
                ? CompilationFlag.INJECT_OUTPUT_OBJECT_IDS
                : 0) |
            ((options === null || options === void 0 ? void 0 : options.injectTypeids) ? CompilationFlag.INJECT_OUTPUT_TYPE_IDS : 0) |
            ((options === null || options === void 0 ? void 0 : options.injectTypenames)
                ? CompilationFlag.INJECT_OUTPUT_TYPE_NAMES
                : 0));
        wb.writeBigInt64((_a = options === null || options === void 0 ? void 0 : options.implicitLimit) !== null && _a !== void 0 ? _a : BigInt(0));
        wb.writeChar(outputFormat);
        wb.writeChar(expectedCardinality === ifaces_1.Cardinality.ONE ||
            expectedCardinality === ifaces_1.Cardinality.AT_MOST_ONE
            ? ifaces_1.Cardinality.AT_MOST_ONE
            : ifaces_1.Cardinality.MANY);
        wb.writeString(query);
        if (state === options_1.Session.defaults()) {
            wb.writeBuffer(codecs_1.NULL_CODEC.tidBuffer);
            wb.writeInt32(0);
        }
        else {
            wb.writeBuffer(this.stateCodec.tidBuffer);
            if (this.stateCodec === codecs_1.INVALID_CODEC) {
                wb.writeInt32(0);
            }
            else {
                if (((_b = this.stateCache) === null || _b === void 0 ? void 0 : _b[0]) !== state) {
                    const buf = new buffer_1.WriteBuffer();
                    this.stateCodec.encode(buf, state._serialise());
                    this.stateCache = [state, buf.unwrap()];
                }
                wb.writeBuffer(this.stateCache[1]);
            }
        }
    }
    async _parse(query, outputFormat, expectedCardinality, state, privilegedMode = false, options) {
        const wb = new buffer_1.WriteMessageBuffer();
        wb.beginMessage(chars.$P);
        wb.writeUInt16(0);
        this._encodeParseParams(wb, query, outputFormat, expectedCardinality, state, privilegedMode, options);
        wb.endMessage();
        wb.writeSync();
        this._sendData(wb.unwrap());
        let parsing = true;
        let error = null;
        let newCard = null;
        let capabilities = -1;
        let inCodec = null;
        let outCodec = null;
        let inCodecBuf = null;
        let outCodecBuf = null;
        while (parsing) {
            if (!this.buffer.takeMessage()) {
                await this._waitForMessage();
            }
            const mtype = this.buffer.getMessageType();
            switch (mtype) {
                case chars.$T: {
                    try {
                        [
                            newCard,
                            inCodec,
                            outCodec,
                            capabilities,
                            inCodecBuf,
                            outCodecBuf,
                        ] = this._parseDescribeTypeMessage();
                        const key = this._getQueryCacheKey(query, outputFormat, expectedCardinality);
                        this.queryCodecCache.set(key, [
                            newCard,
                            inCodec,
                            outCodec,
                            capabilities,
                        ]);
                    }
                    catch (e) {
                        error = e;
                    }
                    break;
                }
                case chars.$E: {
                    error = this._parseErrorMessage();
                    break;
                }
                case chars.$s: {
                    this._parseDescribeStateMessage();
                    break;
                }
                case chars.$Z: {
                    this._parseSyncMessage();
                    parsing = false;
                    break;
                }
                default:
                    this._fallthrough();
            }
        }
        if (error !== null) {
            if (error instanceof errors.StateMismatchError) {
                return this._parse(query, outputFormat, expectedCardinality, state, privilegedMode, options);
            }
            throw error;
        }
        return [
            newCard,
            inCodec,
            outCodec,
            capabilities,
            inCodecBuf,
            outCodecBuf,
        ];
    }
    async _executeFlow(query, args, outputFormat, expectedCardinality, state, inCodec, outCodec, result, privilegedMode = false, options) {
        const wb = new buffer_1.WriteMessageBuffer();
        wb.beginMessage(chars.$O);
        wb.writeUInt16(0);
        this._encodeParseParams(wb, query, outputFormat, expectedCardinality, state, privilegedMode, options);
        wb.writeBuffer(inCodec.tidBuffer);
        wb.writeBuffer(outCodec.tidBuffer);
        if (inCodec) {
            wb.writeBuffer(this._encodeArgs(args, inCodec));
        }
        else {
            wb.writeInt32(0);
        }
        wb.endMessage();
        wb.writeSync();
        this._sendData(wb.unwrap());
        let error = null;
        let parsing = true;
        while (parsing) {
            if (!this.buffer.takeMessage()) {
                await this._waitForMessage();
            }
            const mtype = this.buffer.getMessageType();
            switch (mtype) {
                case chars.$D: {
                    if (error == null) {
                        try {
                            this._parseDataMessages(outCodec, result);
                        }
                        catch (e) {
                            error = e;
                            this.buffer.finishMessage();
                        }
                    }
                    else {
                        this.buffer.discardMessage();
                    }
                    break;
                }
                case chars.$C: {
                    this.lastStatus = this._parseCommandCompleteMessage();
                    break;
                }
                case chars.$Z: {
                    this._parseSyncMessage();
                    parsing = false;
                    break;
                }
                case chars.$T: {
                    try {
                        const [newCard, newInCodec, newOutCodec, capabilities] = this._parseDescribeTypeMessage();
                        const key = this._getQueryCacheKey(query, outputFormat, expectedCardinality);
                        this.queryCodecCache.set(key, [
                            newCard,
                            newInCodec,
                            newOutCodec,
                            capabilities,
                        ]);
                        outCodec = newOutCodec;
                    }
                    catch (e) {
                        error = e;
                    }
                    break;
                }
                case chars.$s: {
                    this._parseDescribeStateMessage();
                    break;
                }
                case chars.$E: {
                    error = this._parseErrorMessage();
                    break;
                }
                default:
                    this._fallthrough();
            }
        }
        if (error != null) {
            if (error instanceof errors.StateMismatchError) {
                return this._executeFlow(query, args, outputFormat, expectedCardinality, state, inCodec, outCodec, result, privilegedMode, options);
            }
            throw error;
        }
    }
    _getQueryCacheKey(query, outputFormat, expectedCardinality) {
        const expectOne = expectedCardinality === ifaces_1.Cardinality.ONE ||
            expectedCardinality === ifaces_1.Cardinality.AT_MOST_ONE;
        return [outputFormat, expectOne, query.length, query].join(";");
    }
    _validateFetchCardinality(card, outputFormat, expectedCardinality) {
        if (expectedCardinality === ifaces_1.Cardinality.ONE &&
            card === ifaces_1.Cardinality.NO_RESULT) {
            throw new errors.NoDataError(`query executed via queryRequiredSingle${outputFormat === ifaces_1.OutputFormat.JSON ? "JSON" : ""}() returned no data`);
        }
    }
    async fetch(query, args = null, outputFormat, expectedCardinality, state, privilegedMode = false) {
        var _a, _b;
        if (this.isLegacyProtocol && outputFormat === ifaces_1.OutputFormat.NONE) {
            if (args != null) {
                throw new errors.InterfaceError(`arguments in execute() is not supported in this version of ` +
                    `EdgeDB. Upgrade to EdgeDB 2.0 or newer.`);
            }
            return this.legacyExecute(query, privilegedMode);
        }
        this._checkState();
        const requiredOne = expectedCardinality === ifaces_1.Cardinality.ONE;
        const expectOne = requiredOne || expectedCardinality === ifaces_1.Cardinality.AT_MOST_ONE;
        const asJson = outputFormat === ifaces_1.OutputFormat.JSON;
        const key = this._getQueryCacheKey(query, outputFormat, expectedCardinality);
        const ret = [];
        if (!this.isLegacyProtocol) {
            let [card, inCodec, outCodec] = (_a = this.queryCodecCache.get(key)) !== null && _a !== void 0 ? _a : [];
            if (card) {
                this._validateFetchCardinality(card, outputFormat, expectedCardinality);
            }
            if ((!inCodec && args !== null) ||
                (this.stateCodec === codecs_1.INVALID_CODEC && state !== options_1.Session.defaults())) {
                [card, inCodec, outCodec] = await this._parse(query, outputFormat, expectedCardinality, state, privilegedMode);
                this._validateFetchCardinality(card, outputFormat, expectedCardinality);
            }
            try {
                await this._executeFlow(query, args, outputFormat, expectedCardinality, state, inCodec !== null && inCodec !== void 0 ? inCodec : codecs_1.NULL_CODEC, outCodec !== null && outCodec !== void 0 ? outCodec : codecs_1.NULL_CODEC, ret, privilegedMode);
            }
            catch (e) {
                if (e instanceof errors.ParameterTypeMismatchError) {
                    [card, inCodec, outCodec] = this.queryCodecCache.get(key);
                    await this._executeFlow(query, args, outputFormat, expectedCardinality, state, inCodec !== null && inCodec !== void 0 ? inCodec : codecs_1.NULL_CODEC, outCodec !== null && outCodec !== void 0 ? outCodec : codecs_1.NULL_CODEC, ret, privilegedMode);
                }
                else {
                    throw e;
                }
            }
        }
        else {
            if (state !== options_1.Session.defaults()) {
                throw new errors.InterfaceError(`setting session state is not supported in this version of ` +
                    `EdgeDB. Upgrade to EdgeDB 2.0 or newer.`);
            }
            if (this.queryCodecCache.has(key)) {
                const [card, inCodec, outCodec] = this.queryCodecCache.get(key);
                this._validateFetchCardinality(card, outputFormat, expectedCardinality);
                await this._legacyOptimisticExecuteFlow(query, args, outputFormat, expectedCardinality, inCodec, outCodec, ret);
            }
            else {
                const [card, inCodec, outCodec, capabilities] = await this._legacyParse(query, outputFormat, expectOne);
                this._validateFetchCardinality(card, outputFormat, expectedCardinality);
                this.queryCodecCache.set(key, [card, inCodec, outCodec, capabilities]);
                await this._legacyExecuteFlow(args, inCodec, outCodec, ret);
            }
        }
        if (outputFormat === ifaces_1.OutputFormat.NONE) {
            return;
        }
        if (expectOne) {
            if (requiredOne && !ret.length) {
                throw new errors.NoDataError("query returned no data");
            }
            else {
                return (_b = ret[0]) !== null && _b !== void 0 ? _b : (asJson ? "null" : null);
            }
        }
        else {
            if (ret && ret.length) {
                if (asJson) {
                    return ret[0];
                }
                else {
                    return ret;
                }
            }
            else {
                if (asJson) {
                    return "[]";
                }
                else {
                    return ret;
                }
            }
        }
    }
    getQueryCapabilities(query, outputFormat, expectedCardinality) {
        var _a, _b;
        const key = this._getQueryCacheKey(query, outputFormat, expectedCardinality);
        return (_b = (_a = this.queryCodecCache.get(key)) === null || _a === void 0 ? void 0 : _a[3]) !== null && _b !== void 0 ? _b : null;
    }
    async legacyExecute(query, allowTransactionCommands = false) {
        this._checkState();
        const wb = new buffer_1.WriteMessageBuffer();
        wb.beginMessage(chars.$Q)
            .writeLegacyHeaders({
            allowCapabilities: !allowTransactionCommands
                ? NO_TRANSACTION_CAPABILITIES_BYTES
                : undefined,
        })
            .writeString(query)
            .endMessage();
        this._sendData(wb.unwrap());
        let error = null;
        let parsing = true;
        while (parsing) {
            if (!this.buffer.takeMessage()) {
                await this._waitForMessage();
            }
            const mtype = this.buffer.getMessageType();
            switch (mtype) {
                case chars.$C: {
                    this.lastStatus = this._parseCommandCompleteMessage();
                    break;
                }
                case chars.$Z: {
                    this._parseSyncMessage();
                    parsing = false;
                    break;
                }
                case chars.$E: {
                    error = this._parseErrorMessage();
                    break;
                }
                default:
                    this._fallthrough();
            }
        }
        if (error != null) {
            throw error;
        }
    }
    async resetState() {
        if (this.connected &&
            this.serverXactStatus !== TransactionStatus.TRANS_IDLE) {
            try {
                await this.fetch(`rollback`, undefined, ifaces_1.OutputFormat.NONE, ifaces_1.Cardinality.NO_RESULT, options_1.Session.defaults(), true);
            }
            catch {
                this._abortWithError(new errors.ClientConnectionClosedError("failed to reset state"));
            }
        }
    }
    _abort() {
        this.connected = false;
        this._abortWaiters(this.getConnAbortError());
        if (!this.connAbortWaiter.done) {
            this.connAbortWaiter.set();
        }
    }
    isClosed() {
        return !this.connected;
    }
    async close() {
        this._abort();
    }
    async rawParse(query, state, options) {
        const result = (await this._parse(query, ifaces_1.OutputFormat.BINARY, ifaces_1.Cardinality.MANY, state, false, options));
        return [
            result[1],
            result[2],
            result[4],
            result[5],
            this.protocolVersion,
            result[3],
        ];
    }
    async rawExecute(query, state, outCodec, options, inCodec, args = null) {
        const result = new buffer_1.WriteBuffer();
        await this._executeFlow(query, args, outCodec ? ifaces_1.OutputFormat.BINARY : ifaces_1.OutputFormat.NONE, ifaces_1.Cardinality.MANY, state, inCodec !== null && inCodec !== void 0 ? inCodec : codecs_1.NULL_CODEC, outCodec !== null && outCodec !== void 0 ? outCodec : codecs_1.NULL_CODEC, result, false, options);
        return result.unwrap();
    }
}
exports.BaseRawConnection = BaseRawConnection;
