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
exports.JSONStringCodec = exports.JSONCodec = void 0;
const ifaces_1 = require("./ifaces");
const errors_1 = require("../errors");
class JSONCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        let val;
        try {
            val = JSON.stringify(object);
        }
        catch (err) {
            throw new errors_1.InvalidArgumentError(`a JSON-serializable value was expected, got "${object}"`);
        }
        if (typeof val !== "string") {
            throw new errors_1.InvalidArgumentError(`a JSON-serializable value was expected, got "${object}"`);
        }
        const strbuf = Buffer.from(val, "utf8");
        buf.writeInt32(strbuf.length + 1);
        buf.writeChar(1);
        buf.writeBuffer(strbuf);
    }
    decode(buf) {
        const format = buf.readUInt8();
        if (format !== 1) {
            throw new errors_1.ProtocolError(`unexpected JSON format ${format}`);
        }
        return JSON.parse(buf.consumeAsString());
    }
}
exports.JSONCodec = JSONCodec;
class JSONStringCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (typeof object !== "string") {
            throw new errors_1.InvalidArgumentError(`a string was expected, got "${object}"`);
        }
        const strbuf = Buffer.from(object, "utf8");
        buf.writeInt32(strbuf.length + 1);
        buf.writeChar(1);
        buf.writeBuffer(strbuf);
    }
    decode(buf) {
        const format = buf.readUInt8();
        if (format !== 1) {
            throw new errors_1.ProtocolError(`unexpected JSON format ${format}`);
        }
        return buf.consumeAsString();
    }
}
exports.JSONStringCodec = JSONStringCodec;
