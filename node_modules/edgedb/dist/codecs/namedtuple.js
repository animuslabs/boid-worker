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
exports.NamedTupleCodec = void 0;
const ifaces_1 = require("./ifaces");
const buffer_1 = require("../primitives/buffer");
const tuple_1 = require("./tuple");
const errors_1 = require("../errors");
class NamedTupleCodec extends ifaces_1.Codec {
    constructor(tid, codecs, names) {
        super(tid);
        Object.defineProperty(this, "subCodecs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "names", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "namesSet", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.subCodecs = codecs;
        this.names = names;
        this.namesSet = new Set(names);
    }
    encode(_buf, _object) {
        throw new errors_1.InvalidArgumentError("Named tuples cannot be passed in query arguments");
    }
    encodeArgs(args) {
        if (args == null) {
            throw new errors_1.MissingArgumentError("One or more named arguments expected, received null");
        }
        const keys = Object.keys(args);
        const names = this.names;
        const namesSet = this.namesSet;
        const codecs = this.subCodecs;
        const codecsLen = codecs.length;
        if (keys.length > codecsLen) {
            const extraKeys = keys.filter(key => !namesSet.has(key));
            throw new errors_1.UnknownArgumentError(`Unused named argument${extraKeys.length === 1 ? "" : "s"}: "${extraKeys.join('", "')}"`);
        }
        if (!codecsLen) {
            return tuple_1.EmptyTupleCodec.BUFFER;
        }
        const elemData = new buffer_1.WriteBuffer();
        for (let i = 0; i < codecsLen; i++) {
            const key = names[i];
            const val = args[key];
            elemData.writeInt32(0);
            if (val == null) {
                elemData.writeInt32(-1);
            }
            else {
                const codec = codecs[i];
                codec.encode(elemData, val);
            }
        }
        const elemBuf = elemData.unwrap();
        const buf = new buffer_1.WriteBuffer();
        buf.writeInt32(4 + elemBuf.length);
        buf.writeInt32(codecsLen);
        buf.writeBuffer(elemBuf);
        return buf.unwrap();
    }
    decode(buf) {
        const els = buf.readUInt32();
        const subCodecs = this.subCodecs;
        if (els !== subCodecs.length) {
            throw new errors_1.ProtocolError(`cannot decode NamedTuple: expected ` +
                `${subCodecs.length} elements, got ${els}`);
        }
        const elemBuf = buffer_1.ReadBuffer.alloc();
        const names = this.names;
        const result = {};
        for (let i = 0; i < els; i++) {
            buf.discard(4);
            const elemLen = buf.readInt32();
            let val = null;
            if (elemLen !== -1) {
                buf.sliceInto(elemBuf, elemLen);
                val = subCodecs[i].decode(elemBuf);
                elemBuf.finish();
            }
            result[names[i]] = val;
        }
        return result;
    }
    getSubcodecs() {
        return Array.from(this.subCodecs);
    }
    getNames() {
        return Array.from(this.names);
    }
    getKind() {
        return "namedtuple";
    }
}
exports.NamedTupleCodec = NamedTupleCodec;
