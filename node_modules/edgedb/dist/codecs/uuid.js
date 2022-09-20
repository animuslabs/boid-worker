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
exports.UUIDCodec = exports.bytesToHex = void 0;
const ifaces_1 = require("./ifaces");
const errors_1 = require("../errors");
function UUIDBufferFromString(uuid) {
    let uuidClean = uuid;
    if (uuidClean.length !== 32) {
        uuidClean = uuidClean.replace(/\-/g, "");
        if (uuidClean.length !== 32) {
            throw new TypeError(`invalid UUID "${uuid}"`);
        }
    }
    const buf = Buffer.from(uuidClean, "hex");
    if (buf.length !== 16) {
        throw new TypeError(`invalid UUID "${uuid}"`);
    }
    return buf;
}
const byteToHex = [];
for (let i = 0; i < 256; ++i) {
    byteToHex.push((i + 0x100).toString(16).slice(1));
}
function bytesToHex(buf) {
    return (byteToHex[buf[0]] +
        byteToHex[buf[1]] +
        byteToHex[buf[2]] +
        byteToHex[buf[3]] +
        "-" +
        byteToHex[buf[4]] +
        byteToHex[buf[5]] +
        "-" +
        byteToHex[buf[6]] +
        byteToHex[buf[7]] +
        "-" +
        byteToHex[buf[8]] +
        byteToHex[buf[9]] +
        "-" +
        byteToHex[buf[10]] +
        byteToHex[buf[11]] +
        byteToHex[buf[12]] +
        byteToHex[buf[13]] +
        byteToHex[buf[14]] +
        byteToHex[buf[15]]);
}
exports.bytesToHex = bytesToHex;
class UUIDCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (typeof object === "string") {
            const ubuf = UUIDBufferFromString(object);
            buf.writeInt32(16);
            buf.writeBuffer(ubuf);
        }
        else {
            throw new errors_1.InvalidArgumentError(`cannot encode UUID "${object}": invalid type`);
        }
    }
    decode(buf) {
        return bytesToHex(buf.readBuffer(16));
    }
}
exports.UUIDCodec = UUIDCodec;
