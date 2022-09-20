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
exports.INVALID_CODEC = exports.NULL_CODEC = exports.SCALAR_CODECS = exports.NullCodec = void 0;
const buffer_1 = require("../primitives/buffer");
const boolean_1 = require("./boolean");
const ifaces_1 = require("./ifaces");
const numbers_1 = require("./numbers");
const numerics_1 = require("./numerics");
const text_1 = require("./text");
const uuid_1 = require("./uuid");
const bytes_1 = require("./bytes");
const json_1 = require("./json");
const datetime_1 = require("./datetime");
const memory_1 = require("./memory");
const errors_1 = require("../errors");
const consts_1 = require("./consts");
class NullCodec extends ifaces_1.Codec {
    encode(_buf, _object) {
        throw new errors_1.InternalClientError("null codec cannot used to encode data");
    }
    decode(_buf) {
        throw new errors_1.InternalClientError("null codec cannot used to decode data");
    }
    getSubcodecs() {
        return [];
    }
    getKind() {
        return "scalar";
    }
}
exports.NullCodec = NullCodec;
Object.defineProperty(NullCodec, "BUFFER", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: new buffer_1.WriteBuffer().writeInt32(0).unwrap()
});
exports.SCALAR_CODECS = new Map();
exports.NULL_CODEC = new NullCodec(consts_1.NULL_CODEC_ID);
exports.INVALID_CODEC = new NullCodec(consts_1.INVALID_CODEC_ID);
function registerScalarCodec(typename, type) {
    const id = consts_1.KNOWN_TYPENAMES.get(typename);
    if (id == null) {
        throw new errors_1.InternalClientError("unknown type name");
    }
    exports.SCALAR_CODECS.set(id, new type(id));
}
registerScalarCodec("std::int16", numbers_1.Int16Codec);
registerScalarCodec("std::int32", numbers_1.Int32Codec);
registerScalarCodec("std::int64", numbers_1.Int64Codec);
registerScalarCodec("std::float32", numbers_1.Float32Codec);
registerScalarCodec("std::float64", numbers_1.Float64Codec);
registerScalarCodec("std::bigint", numerics_1.BigIntCodec);
registerScalarCodec("std::bool", boolean_1.BoolCodec);
registerScalarCodec("std::json", json_1.JSONCodec);
registerScalarCodec("std::str", text_1.StrCodec);
registerScalarCodec("std::bytes", bytes_1.BytesCodec);
registerScalarCodec("std::uuid", uuid_1.UUIDCodec);
registerScalarCodec("cal::local_date", datetime_1.LocalDateCodec);
registerScalarCodec("cal::local_time", datetime_1.LocalTimeCodec);
registerScalarCodec("cal::local_datetime", datetime_1.LocalDateTimeCodec);
registerScalarCodec("std::datetime", datetime_1.DateTimeCodec);
registerScalarCodec("std::duration", datetime_1.DurationCodec);
registerScalarCodec("cal::relative_duration", datetime_1.RelativeDurationCodec);
registerScalarCodec("cal::date_duration", datetime_1.DateDurationCodec);
registerScalarCodec("cfg::memory", memory_1.ConfigMemoryCodec);
