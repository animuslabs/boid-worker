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
exports.BytesCodec = void 0;
const ifaces_1 = require("./ifaces");
const errors_1 = require("../errors");
class BytesCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!(object instanceof Buffer)) {
            throw new errors_1.InvalidArgumentError(`a Buffer was expected, got "${object}"`);
        }
        buf.writeInt32(object.length);
        buf.writeBuffer(object);
    }
    decode(buf) {
        return buf.consumeAsBuffer();
    }
}
exports.BytesCodec = BytesCodec;
