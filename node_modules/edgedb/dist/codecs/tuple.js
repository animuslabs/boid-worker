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
exports.EMPTY_TUPLE_CODEC = exports.EMPTY_TUPLE_CODEC_ID = exports.EmptyTupleCodec = exports.TupleCodec = void 0;
const consts_1 = require("./consts");
const ifaces_1 = require("./ifaces");
const buffer_1 = require("../primitives/buffer");
const errors_1 = require("../errors");
class TupleCodec extends ifaces_1.Codec {
    constructor(tid, codecs) {
        super(tid);
        Object.defineProperty(this, "subCodecs", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.subCodecs = codecs;
    }
    encode(buf, object) {
        if (!Array.isArray(object)) {
            throw new errors_1.InvalidArgumentError(`an array was expected, got ${object}`);
        }
        const codecs = this.subCodecs;
        const codecsLen = codecs.length;
        if (object.length !== codecsLen) {
            throw new errors_1.InvalidArgumentError(`expected ${codecsLen} tuple item${codecsLen === 1 ? "" : "s"}, got ${object.length}`);
        }
        if (!codecsLen) {
            buf.writeBuffer(EmptyTupleCodec.BUFFER);
        }
        const elemData = new buffer_1.WriteBuffer();
        for (let i = 0; i < codecsLen; i++) {
            const elem = object[i];
            elemData.writeInt32(0);
            if (elem == null) {
                elemData.writeInt32(-1);
            }
            else {
                const codec = codecs[i];
                codec.encode(elemData, elem);
            }
        }
        const elemBuf = elemData.unwrap();
        buf.writeInt32(4 + elemBuf.length);
        buf.writeInt32(codecsLen);
        buf.writeBuffer(elemBuf);
    }
    encodeArgs(args) {
        if (!Array.isArray(args)) {
            throw new errors_1.InvalidArgumentError("an array of arguments was expected");
        }
        const codecsLen = this.subCodecs.length;
        if (args.length !== codecsLen) {
            throw new errors_1.InvalidArgumentError(`expected ${codecsLen} argument${codecsLen === 1 ? "" : "s"}, got ${args.length}`);
        }
        const buf = new buffer_1.WriteBuffer();
        this.encode(buf, args);
        return buf.unwrap();
    }
    decode(buf) {
        const els = buf.readUInt32();
        const subCodecs = this.subCodecs;
        if (els !== subCodecs.length) {
            throw new errors_1.ProtocolError(`cannot decode Tuple: expected ` +
                `${subCodecs.length} elements, got ${els}`);
        }
        const elemBuf = buffer_1.ReadBuffer.alloc();
        const result = new Array(els);
        for (let i = 0; i < els; i++) {
            buf.discard(4);
            const elemLen = buf.readInt32();
            if (elemLen === -1) {
                result[i] = null;
            }
            else {
                buf.sliceInto(elemBuf, elemLen);
                result[i] = subCodecs[i].decode(elemBuf);
                elemBuf.finish();
            }
        }
        return result;
    }
    getSubcodecs() {
        return Array.from(this.subCodecs);
    }
    getKind() {
        return "tuple";
    }
}
exports.TupleCodec = TupleCodec;
class EmptyTupleCodec extends ifaces_1.Codec {
    encode(buf, object) {
        if (!Array.isArray(object)) {
            throw new errors_1.InvalidArgumentError("cannot encode empty Tuple: expected an array");
        }
        if (object.length) {
            throw new errors_1.InvalidArgumentError(`cannot encode empty Tuple: expected 0 elements got ${object.length}`);
        }
        buf.writeInt32(4);
        buf.writeInt32(0);
    }
    decode(buf) {
        const els = buf.readInt32();
        if (els !== 0) {
            throw new errors_1.ProtocolError(`cannot decode empty Tuple: expected 0 elements, received ${els}`);
        }
        return [];
    }
    getSubcodecs() {
        return [];
    }
    getKind() {
        return "tuple";
    }
}
exports.EmptyTupleCodec = EmptyTupleCodec;
Object.defineProperty(EmptyTupleCodec, "BUFFER", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new buffer_1.WriteBuffer()
        .writeInt32(4)
        .writeInt32(0)
        .unwrap()
});
exports.EMPTY_TUPLE_CODEC_ID = consts_1.KNOWN_TYPENAMES.get("empty-tuple");
exports.EMPTY_TUPLE_CODEC = new EmptyTupleCodec(exports.EMPTY_TUPLE_CODEC_ID);
