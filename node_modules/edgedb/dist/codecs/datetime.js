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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateDurationCodec = exports.RelativeDurationCodec = exports.DurationCodec = exports.checkValidEdgeDBDuration = exports.LocalTimeCodec = exports.LocalDateCodec = exports.LocalDateTimeCodec = exports.DateTimeCodec = void 0;
const ifaces_1 = require("./ifaces");
const bi = __importStar(require("../primitives/bigint"));
const datetime_1 = require("../datatypes/datetime");
const dateutil_1 = require("../datatypes/dateutil");
const errors_1 = require("../errors");
const TIMESHIFT = 946684800000;
const DATESHIFT_ORD = (0, dateutil_1.ymd2ord)(2000, 1, 1);
class DateTimeCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!(object instanceof Date)) {
            throw new errors_1.InvalidArgumentError(`a Date instance was expected, got "${object}"`);
        }
        const ms = object.getTime() - TIMESHIFT;
        const us = ms * 1000.0;
        buf.writeInt32(8);
        buf.writeInt64(us);
    }
    decode(buf) {
        const us = buf.readBigInt64();
        const ms = Number(us) / 1000.0;
        return new Date(ms + TIMESHIFT);
    }
}
exports.DateTimeCodec = DateTimeCodec;
class LocalDateTimeCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!(object instanceof datetime_1.LocalDateTime)) {
            throw new errors_1.InvalidArgumentError(`a LocalDateTime instance was expected, got "${object}"`);
        }
        const ms = bi.make(object["_date"].getTime() - TIMESHIFT);
        const us = bi.add(bi.mul(ms, bi.make(1000)), bi.make(object.hour * 3600000000 +
            object.minute * 60000000 +
            object.second * 1000000 +
            object.millisecond * 1000 +
            object.microsecond));
        buf.writeInt32(8);
        buf.writeBigInt64(us);
    }
    decode(buf) {
        const bi1000 = bi.make(1000);
        const us = buf.readBigInt64();
        const ms = bi.div(us, bi1000);
        const date = new Date(Number(ms) + TIMESHIFT);
        return new datetime_1.LocalDateTime(date.getUTCFullYear(), date.getUTCMonth() + 1, date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds(), Number(bi.sub(us, bi.mul(ms, bi1000))));
    }
}
exports.LocalDateTimeCodec = LocalDateTimeCodec;
class LocalDateCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!(object instanceof datetime_1.LocalDate)) {
            throw new errors_1.InvalidArgumentError(`a LocalDate instance was expected, got "${object}"`);
        }
        buf.writeInt32(4);
        buf.writeInt32((0, datetime_1.LocalDateToOrdinal)(object) - DATESHIFT_ORD);
    }
    decode(buf) {
        const ord = buf.readInt32();
        return (0, datetime_1.LocalDateFromOrdinal)(ord + DATESHIFT_ORD);
    }
}
exports.LocalDateCodec = LocalDateCodec;
class LocalTimeCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!(object instanceof datetime_1.LocalTime)) {
            throw new errors_1.InvalidArgumentError(`a LocalTime instance was expected, got "${object}"`);
        }
        buf.writeInt32(8);
        const us = object.hour * 3600000000 +
            object.minute * 60000000 +
            object.second * 1000000 +
            object.millisecond * 1000 +
            object.microsecond;
        buf.writeInt64(us);
    }
    decode(buf) {
        let us = Number(buf.readBigInt64());
        let seconds = Math.floor(us / 1000000);
        const ms = Math.floor((us % 1000000) / 1000);
        us = (us % 1000000) - ms * 1000;
        let minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        const hours = Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);
        return new datetime_1.LocalTime(hours, minutes, seconds, ms, us);
    }
}
exports.LocalTimeCodec = LocalTimeCodec;
const unencodableDurationFields = [
    "years",
    "months",
    "weeks",
    "days",
];
function checkValidEdgeDBDuration(duration) {
    for (const field of unencodableDurationFields) {
        if (duration[field] !== 0) {
            return field;
        }
    }
    return null;
}
exports.checkValidEdgeDBDuration = checkValidEdgeDBDuration;
class DurationCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!(object instanceof datetime_1.Duration)) {
            throw new errors_1.InvalidArgumentError(`a Duration instance was expected, got "${object}"`);
        }
        const invalidField = checkValidEdgeDBDuration(object);
        if (invalidField) {
            throw new errors_1.InvalidArgumentError(`Cannot encode a 'Duration' with a non-zero number of ${invalidField}`);
        }
        let us = bi.make(object.microseconds);
        us = bi.add(us, bi.mul(bi.make(object.milliseconds), bi.make(1000)));
        us = bi.add(us, bi.mul(bi.make(object.seconds), bi.make(1000000)));
        us = bi.add(us, bi.mul(bi.make(object.minutes), bi.make(60000000)));
        us = bi.add(us, bi.mul(bi.make(object.hours), bi.make(3600000000)));
        buf.writeInt32(16);
        buf.writeBigInt64(us);
        buf.writeInt32(0);
        buf.writeInt32(0);
    }
    decode(buf) {
        let bius = buf.readBigInt64();
        const days = buf.readInt32();
        const months = buf.readInt32();
        if (days !== 0) {
            throw new errors_1.ProtocolError("non-zero reserved bytes in duration");
        }
        if (months !== 0) {
            throw new errors_1.ProtocolError("non-zero reserved bytes in duration");
        }
        let sign = 1;
        if (Number(bius) < 0) {
            sign = -1;
            bius = bi.mul(bi.make(-1), bius);
        }
        const biMillion = bi.make(1000000);
        const biSeconds = bi.div(bius, biMillion);
        let us = Number(bi.sub(bius, bi.mul(biSeconds, biMillion)));
        const ms = Math.floor(us / 1000);
        us = us % 1000;
        let seconds = Number(biSeconds);
        let minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        const hours = Math.floor(minutes / 60);
        minutes = Math.floor(minutes % 60);
        return new datetime_1.Duration(0, 0, 0, 0, hours * sign, minutes * sign, seconds * sign, ms * sign, us * sign);
    }
}
exports.DurationCodec = DurationCodec;
class RelativeDurationCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!(object instanceof datetime_1.RelativeDuration)) {
            throw new errors_1.InvalidArgumentError(`
        a RelativeDuration instance was expected, got "${object}"
      `);
        }
        let us = bi.make(object.microseconds);
        us = bi.add(us, bi.mul(bi.make(object.milliseconds), bi.make(1000)));
        us = bi.add(us, bi.mul(bi.make(object.seconds), bi.make(1000000)));
        us = bi.add(us, bi.mul(bi.make(object.minutes), bi.make(60000000)));
        us = bi.add(us, bi.mul(bi.make(object.hours), bi.make(3600000000)));
        buf.writeInt32(16);
        buf.writeBigInt64(us);
        buf.writeInt32(object.days + 7 * object.weeks);
        buf.writeInt32(object.months + 12 * object.years);
    }
    decode(buf) {
        let bius = buf.readBigInt64();
        let days = buf.readInt32();
        let months = buf.readInt32();
        let sign = 1;
        if (Number(bius) < 0) {
            sign = -1;
            bius = bi.mul(bi.make(-1), bius);
        }
        const biMillion = bi.make(1000000);
        const biSeconds = bi.div(bius, biMillion);
        let us = Number(bi.sub(bius, bi.mul(biSeconds, biMillion)));
        const ms = Math.trunc(us / 1000);
        us = us % 1000;
        let seconds = Number(biSeconds);
        let minutes = Math.trunc(seconds / 60);
        seconds = Math.trunc(seconds % 60);
        const hours = Math.trunc(minutes / 60);
        minutes = Math.trunc(minutes % 60);
        const weeks = Math.trunc(days / 7);
        days = Math.trunc(days % 7);
        const years = Math.trunc(months / 12);
        months = Math.trunc(months % 12);
        return new datetime_1.RelativeDuration(years, months, weeks, days, hours * sign, minutes * sign, seconds * sign, ms * sign, us * sign);
    }
}
exports.RelativeDurationCodec = RelativeDurationCodec;
class DateDurationCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!(object instanceof datetime_1.DateDuration)) {
            throw new errors_1.InvalidArgumentError(`
        a DateDuration instance was expected, got "${object}"
      `);
        }
        buf.writeInt32(16);
        buf.writeInt64(0);
        buf.writeInt32(object.days + 7 * object.weeks);
        buf.writeInt32(object.months + 12 * object.years);
    }
    decode(buf) {
        buf.discard(8);
        let days = buf.readInt32();
        let months = buf.readInt32();
        const weeks = Math.trunc(days / 7);
        days = Math.trunc(days % 7);
        const years = Math.trunc(months / 12);
        months = Math.trunc(months % 12);
        return new datetime_1.DateDuration(years, months, weeks, days);
    }
}
exports.DateDurationCodec = DateDurationCodec;
