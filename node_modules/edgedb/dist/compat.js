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
exports.decodeInt64ToString = exports.inspect = void 0;
let inspect = (() => {
    const f = () => null;
    f.custom = Symbol();
    return f;
})();
exports.inspect = inspect;
if (typeof window === "undefined" && typeof Deno === "undefined") {
    const utilMod = require("util");
    exports.inspect = inspect = utilMod.inspect;
}
function decodeInt64ToString(buf) {
    if (buf.length !== 8) {
        throw new Error("expected 8 bytes buffer");
    }
    let inp = Array.from(buf);
    let negative = false;
    if (inp[0] & 0x80) {
        inp = inp.map(x => x ^ 0xff);
        inp[inp.length - 1]++;
        negative = true;
    }
    let result = "0";
    for (const digit of inp) {
        let acc = digit;
        let ret = "";
        for (let j = result.length - 1; j >= 0; j--) {
            const num = parseInt(result[j], 10) * 256 + acc;
            ret = (num % 10) + ret;
            acc = Math.floor(num / 10);
        }
        result = acc ? acc + ret : ret;
    }
    return negative ? `-${result}` : result;
}
exports.decodeInt64ToString = decodeInt64ToString;
