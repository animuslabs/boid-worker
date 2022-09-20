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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetCodec = void 0;
const ifaces_1 = require("./ifaces");
const buffer_1 = require("../primitives/buffer");
const array_1 = require("./array");
const errors_1 = require("../errors");
class SetCodec extends ifaces_1.Codec {
    constructor(tid, subCodec) {
        super(tid);
        Object.defineProperty(this, "subCodec", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.subCodec = subCodec;
    }
    encode(_buf, _obj) {
        throw new errors_1.InvalidArgumentError("Sets cannot be passed in query arguments");
    }
    decode(buf) {
        if (this.subCodec instanceof array_1.ArrayCodec) {
            return this.decodeSetOfArrays(buf);
        }
        else {
            return this.decodeSet(buf);
        }
    }
    decodeSetOfArrays(buf) {
        const ndims = buf.readInt32();
        buf.discard(4);
        buf.discard(4);
        if (ndims === 0) {
            return [];
        }
        if (ndims !== 1) {
            throw new errors_1.ProtocolError(`expected 1-dimensional array of records of arrays`);
        }
        const len = buf.readUInt32();
        buf.discard(4);
        const result = new Array(len);
        const elemBuf = buffer_1.ReadBuffer.alloc();
        const subCodec = this.subCodec;
        for (let i = 0; i < len; i++) {
            buf.discard(4);
            const recSize = buf.readUInt32();
            if (recSize !== 1) {
                throw new errors_1.ProtocolError("expected a record with a single element as an array set " +
                    "element envelope");
            }
            buf.discard(4);
            const elemLen = buf.readInt32();
            if (elemLen === -1) {
                throw new errors_1.ProtocolError("unexpected NULL value in array set element");
            }
            buf.sliceInto(elemBuf, elemLen);
            result[i] = subCodec.decode(elemBuf);
            elemBuf.finish();
        }
        return result;
    }
    decodeSet(buf) {
        const ndims = buf.readInt32();
        buf.discard(4);
        buf.discard(4);
        if (ndims === 0) {
            return [];
        }
        if (ndims !== 1) {
            throw new errors_1.ProtocolError(`invalid set dimensinality: ${ndims}`);
        }
        const len = buf.readUInt32();
        buf.discard(4);
        const result = new Array(len);
        const elemBuf = buffer_1.ReadBuffer.alloc();
        const subCodec = this.subCodec;
        for (let i = 0; i < len; i++) {
            const elemLen = buf.readInt32();
            if (elemLen === -1) {
                result[i] = null;
            }
            else {
                buf.sliceInto(elemBuf, elemLen);
                result[i] = subCodec.decode(elemBuf);
                elemBuf.finish();
            }
        }
        return result;
    }
    getSubcodecs() {
        return [this.subCodec];
    }
    getKind() {
        return "set";
    }
}
exports.SetCodec = SetCodec;
