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
exports.parseHumanDurationString = exports.DateDuration = exports.RelativeDuration = exports.Duration = exports.LocalDateTime = exports.LocalDateFromOrdinal = exports.LocalDateToOrdinal = exports.LocalDate = exports.LocalTime = exports.DATE_PRIVATE = void 0;
const compat_1 = require("../compat");
const bi = __importStar(require("../primitives/bigint"));
const dateutil_1 = require("./dateutil");
exports.DATE_PRIVATE = Symbol.for("edgedb.datetime");
function toNumber(val) {
    const n = Number(val);
    if (Number.isNaN(n)) {
        return 0;
    }
    return n;
}
function assertInteger(val) {
    if (!Number.isInteger(val)) {
        throw new RangeError(`unsupported fractional value ${val}`);
    }
    return val;
}
class LocalTime {
    constructor(isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0) {
        Object.defineProperty(this, "_hour", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_minute", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_second", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_millisecond", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_microsecond", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_nanosecond", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        isoHour = Math.floor(toNumber(isoHour));
        isoMinute = Math.floor(toNumber(isoMinute));
        isoSecond = Math.floor(toNumber(isoSecond));
        isoMillisecond = Math.floor(toNumber(isoMillisecond));
        isoMicrosecond = Math.floor(toNumber(isoMicrosecond));
        isoNanosecond = Math.floor(toNumber(isoNanosecond));
        if (isoHour < 0 || isoHour > 23) {
            throw new RangeError(`invalid number of hours ${isoHour}: expected a value in 0-23 range`);
        }
        if (isoMinute < 0 || isoMinute > 59) {
            throw new RangeError(`invalid number of minutes ${isoMinute}: expected a value in 0-59 range`);
        }
        if (isoSecond < 0 || isoSecond > 59) {
            throw new RangeError(`invalid number of seconds ${isoSecond}: expected a value in 0-59 range`);
        }
        if (isoMillisecond < 0 || isoMillisecond > 999) {
            throw new RangeError(`invalid number of milliseconds ${isoMillisecond}: ` +
                `expected a value in 0-999 range`);
        }
        if (isoMicrosecond < 0 || isoMicrosecond > 999) {
            throw new RangeError(`invalid number of microseconds ${isoMicrosecond}: ` +
                `expected a value in 0-999 range`);
        }
        if (isoNanosecond < 0 || isoNanosecond > 999) {
            throw new RangeError(`invalid number of nanoseconds ${isoNanosecond}: ` +
                `expected a value in 0-999 range`);
        }
        this._hour = isoHour;
        this._minute = isoMinute;
        this._second = isoSecond;
        this._millisecond = isoMillisecond;
        this._microsecond = isoMicrosecond;
        this._nanosecond = isoNanosecond;
    }
    get hour() {
        return this._hour;
    }
    get minute() {
        return this._minute;
    }
    get second() {
        return this._second;
    }
    get millisecond() {
        return this._millisecond;
    }
    get microsecond() {
        return this._microsecond;
    }
    get nanosecond() {
        return this._nanosecond;
    }
    toString() {
        const hh = this._hour.toString().padStart(2, "0");
        const mm = this._minute.toString().padStart(2, "0");
        const ss = this._second.toString().padStart(2, "0");
        let repr = `${hh}:${mm}:${ss}`;
        if (this._millisecond || this._microsecond || this._nanosecond) {
            repr += `.${this._millisecond
                .toString()
                .padStart(3, "0")}${this._microsecond
                .toString()
                .padStart(3, "0")}${this._nanosecond
                .toString()
                .padStart(3, "0")}`.replace(/(?:0+)$/, "");
        }
        return repr;
    }
    toJSON() {
        return this.toString();
    }
    valueOf() {
        throw new TypeError("Not possible to compare LocalTime");
    }
    [compat_1.inspect.custom](_depth, _options) {
        return `LocalTime [ ${this.toString()} ]`;
    }
}
exports.LocalTime = LocalTime;
class LocalDate {
    constructor(isoYear, isoMonth, isoDay) {
        Object.defineProperty(this, "_date", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        isoYear = Math.trunc(toNumber(isoYear));
        isoMonth = Math.floor(toNumber(isoMonth));
        isoDay = Math.floor(toNumber(isoDay));
        if (isoYear < -271820 || isoYear > 275759) {
            throw new RangeError(`invalid year ${isoYear}: expected a value in -271820-275759 range`);
        }
        if (isoMonth < 1 || isoMonth > 12) {
            throw new RangeError(`invalid month ${isoMonth}: expected a value in 1-12 range`);
        }
        const maxDays = (0, dateutil_1.daysInMonth)(isoYear, isoMonth);
        if (isoDay < 1 || isoDay > maxDays) {
            throw new RangeError(`invalid number of days ${isoDay}: expected a value in 1-${maxDays} range`);
        }
        this._date = new Date(Date.UTC(isoYear, isoMonth - 1, isoDay));
        if (isoYear >= 0 && isoYear <= 99) {
            this._date.setUTCFullYear(isoYear);
        }
    }
    get year() {
        return this._date.getUTCFullYear();
    }
    get month() {
        return this._date.getUTCMonth() + 1;
    }
    get day() {
        return this._date.getUTCDate();
    }
    get dayOfWeek() {
        return ((this._date.getUTCDay() + 6) % 7) + 1;
    }
    get dayOfYear() {
        return ((0, dateutil_1.daysBeforeMonth)(this._date.getUTCFullYear(), this._date.getUTCMonth() + 1) + this._date.getUTCDate());
    }
    get daysInWeek() {
        return 7;
    }
    get daysInMonth() {
        return (0, dateutil_1.daysInMonth)(this._date.getUTCFullYear(), this._date.getUTCMonth() + 1);
    }
    get daysInYear() {
        return (0, dateutil_1.isLeapYear)(this._date.getUTCFullYear()) ? 366 : 365;
    }
    get monthsInYear() {
        return 12;
    }
    get inLeapYear() {
        return (0, dateutil_1.isLeapYear)(this._date.getUTCFullYear());
    }
    toString() {
        const year = this.year < 1000 || this.year > 9999
            ? (this.year < 0 ? "-" : "+") +
                Math.abs(this.year).toString().padStart(6, "0")
            : this.year.toString();
        const month = this.month.toString().padStart(2, "0");
        const day = this.day.toString().padStart(2, "0");
        return `${year}-${month}-${day}`;
    }
    toJSON() {
        return this.toString();
    }
    valueOf() {
        throw new TypeError("Not possible to compare LocalDate");
    }
    [compat_1.inspect.custom](_depth, _options) {
        return `LocalDate [ ${this.toString()} ]`;
    }
}
exports.LocalDate = LocalDate;
function LocalDateToOrdinal(localdate) {
    return (0, dateutil_1.ymd2ord)(localdate.year, localdate.month, localdate.day);
}
exports.LocalDateToOrdinal = LocalDateToOrdinal;
function LocalDateFromOrdinal(ordinal) {
    const [year, month, day] = (0, dateutil_1.ord2ymd)(ordinal);
    return new LocalDate(year, month, day);
}
exports.LocalDateFromOrdinal = LocalDateFromOrdinal;
class LocalDateTime extends LocalDate {
    constructor(isoYear, isoMonth, isoDay, isoHour = 0, isoMinute = 0, isoSecond = 0, isoMillisecond = 0, isoMicrosecond = 0, isoNanosecond = 0) {
        super(isoYear, isoMonth, isoDay);
        Object.defineProperty(this, "_time", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._time = new LocalTime(isoHour, isoMinute, isoSecond, isoMillisecond, isoMicrosecond, isoNanosecond);
    }
    get hour() {
        return this._time["_hour"];
    }
    get minute() {
        return this._time["_minute"];
    }
    get second() {
        return this._time["_second"];
    }
    get millisecond() {
        return this._time["_millisecond"];
    }
    get microsecond() {
        return this._time["_microsecond"];
    }
    get nanosecond() {
        return this._time["_nanosecond"];
    }
    toString() {
        return `${super.toString()}T${this._time.toString()}`;
    }
    valueOf() {
        throw new TypeError("Not possible to compare LocalDateTime");
    }
    [compat_1.inspect.custom](_depth, _options) {
        return `LocalDateTime [ ${this.toString()} ]`;
    }
}
exports.LocalDateTime = LocalDateTime;
const durationRegex = new RegExp(`^(\\-|\\+)?P(?:(\\d+)Y)?(?:(\\d+)M)?(?:(\\d+)W)?(?:(\\d+)D)?` +
    `(T(?:(\\d+)(\\.\\d{1,10})?H)?(?:(\\d+)(\\.\\d{1,10})?M)?` +
    `(?:(\\d+)(\\.\\d{1,9})?S)?)?$`, "i");
class Duration {
    constructor(years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0, nanoseconds = 0) {
        Object.defineProperty(this, "_years", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_months", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_weeks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_days", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_hours", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_minutes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_seconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_milliseconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_microseconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_nanoseconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_sign", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        years = assertInteger(toNumber(years));
        months = assertInteger(toNumber(months));
        weeks = assertInteger(toNumber(weeks));
        days = assertInteger(toNumber(days));
        hours = assertInteger(toNumber(hours));
        minutes = assertInteger(toNumber(minutes));
        seconds = assertInteger(toNumber(seconds));
        milliseconds = assertInteger(toNumber(milliseconds));
        microseconds = assertInteger(toNumber(microseconds));
        nanoseconds = assertInteger(toNumber(nanoseconds));
        const fields = [
            years,
            months,
            weeks,
            days,
            hours,
            minutes,
            seconds,
            milliseconds,
            microseconds,
            nanoseconds,
        ];
        let sign = 0;
        for (const field of fields) {
            if (field === Infinity || field === -Infinity) {
                throw new RangeError("infinite values not allowed as duration fields");
            }
            const fieldSign = Math.sign(field);
            if (sign && fieldSign && fieldSign !== sign) {
                throw new RangeError("mixed-sign values not allowed as duration fields");
            }
            sign = sign || fieldSign;
        }
        this._years = years || 0;
        this._months = months || 0;
        this._weeks = weeks || 0;
        this._days = days || 0;
        this._hours = hours || 0;
        this._minutes = minutes || 0;
        this._seconds = seconds || 0;
        this._milliseconds = milliseconds || 0;
        this._microseconds = microseconds || 0;
        this._nanoseconds = nanoseconds || 0;
        this._sign = sign || 0;
    }
    get years() {
        return this._years;
    }
    get months() {
        return this._months;
    }
    get weeks() {
        return this._weeks;
    }
    get days() {
        return this._days;
    }
    get hours() {
        return this._hours;
    }
    get minutes() {
        return this._minutes;
    }
    get seconds() {
        return this._seconds;
    }
    get milliseconds() {
        return this._milliseconds;
    }
    get microseconds() {
        return this._microseconds;
    }
    get nanoseconds() {
        return this._nanoseconds;
    }
    get sign() {
        return this._sign;
    }
    get blank() {
        return this._sign === 0;
    }
    toString() {
        let dateParts = "";
        if (this._years) {
            dateParts += bi.make(Math.abs(this._years)) + "Y";
        }
        if (this._months) {
            dateParts += bi.make(Math.abs(this._months)) + "M";
        }
        if (this._weeks) {
            dateParts += bi.make(Math.abs(this._weeks)) + "W";
        }
        if (this._days) {
            dateParts += bi.make(Math.abs(this._days)) + "D";
        }
        let timeParts = "";
        if (this._hours) {
            timeParts += bi.make(Math.abs(this._hours)) + "H";
        }
        if (this._minutes) {
            timeParts += bi.make(Math.abs(this._minutes)) + "M";
        }
        if ((!dateParts && !timeParts) ||
            this._seconds ||
            this._milliseconds ||
            this._microseconds ||
            this._nanoseconds) {
            const totalNanoseconds = bi
                .add(bi.add(bi.add(bi.mul(bi.make(Math.abs(this._seconds)), bi.make(1e9)), bi.mul(bi.make(Math.abs(this._milliseconds)), bi.make(1e6))), bi.mul(bi.make(Math.abs(this._microseconds)), bi.make(1e3))), bi.make(Math.abs(this._nanoseconds)))
                .toString()
                .padStart(10, "0");
            const seconds = totalNanoseconds.slice(0, -9);
            const fracSeconds = totalNanoseconds.slice(-9).replace(/0+$/, "");
            timeParts +=
                seconds + (fracSeconds.length ? "." + fracSeconds : "") + "S";
        }
        return ((this._sign === -1 ? "-" : "") +
            "P" +
            dateParts +
            (timeParts ? "T" + timeParts : ""));
    }
    toJSON() {
        return this.toString();
    }
    valueOf() {
        throw new TypeError("Not possible to compare TemporalDuration");
    }
    static from(item) {
        let result;
        if (item instanceof Duration) {
            result = item;
        }
        if (typeof item === "object") {
            if (item.years === undefined &&
                item.months === undefined &&
                item.weeks === undefined &&
                item.days === undefined &&
                item.hours === undefined &&
                item.minutes === undefined &&
                item.seconds === undefined &&
                item.milliseconds === undefined &&
                item.microseconds === undefined &&
                item.nanoseconds === undefined) {
                throw new TypeError(`invalid duration-like`);
            }
            result = item;
        }
        else {
            const str = String(item);
            const matches = str.match(durationRegex);
            if (!matches) {
                throw new RangeError(`invalid duration: ${str}`);
            }
            const [_duration, _sign, years, months, weeks, days, _time, hours, fHours, minutes, fMinutes, seconds, fSeconds,] = matches;
            if (_duration.length < 3 || _time.length === 1) {
                throw new RangeError(`invalid duration: ${str}`);
            }
            const sign = _sign === "-" ? -1 : 1;
            result = {};
            if (years) {
                result.years = sign * Number(years);
            }
            if (months) {
                result.months = sign * Number(months);
            }
            if (weeks) {
                result.weeks = sign * Number(weeks);
            }
            if (days) {
                result.days = sign * Number(days);
            }
            if (hours) {
                result.hours = sign * Number(hours);
            }
            if (fHours) {
                if (minutes || fMinutes || seconds || fSeconds) {
                    throw new RangeError("only the smallest unit can be fractional");
                }
                result.minutes = Number(fHours) * 60;
            }
            else {
                result.minutes = toNumber(minutes);
            }
            if (fMinutes) {
                if (seconds || fSeconds) {
                    throw new RangeError("only the smallest unit can be fractional");
                }
                result.seconds = Number(fMinutes) * 60;
            }
            else if (seconds) {
                result.seconds = Number(seconds);
            }
            else {
                result.seconds = (result.minutes % 1) * 60;
            }
            if (fSeconds) {
                result.milliseconds = Number(fSeconds) * 1000;
            }
            else {
                result.milliseconds = (result.seconds % 1) * 1000;
            }
            result.microseconds = (result.milliseconds % 1) * 1000;
            result.nanoseconds = sign * Math.floor((result.microseconds % 1) * 1000);
            result.minutes = sign * Math.floor(result.minutes);
            result.seconds = sign * Math.floor(result.seconds);
            result.milliseconds = sign * Math.floor(result.milliseconds);
            result.microseconds = sign * Math.floor(result.microseconds);
        }
        return new Duration(result.years, result.months, result.weeks, result.days, result.hours, result.minutes, result.seconds, result.milliseconds, result.microseconds, result.nanoseconds);
    }
    [compat_1.inspect.custom](_depth, _options) {
        return `Duration [ ${this.toString()} ]`;
    }
}
exports.Duration = Duration;
class RelativeDuration {
    constructor(years = 0, months = 0, weeks = 0, days = 0, hours = 0, minutes = 0, seconds = 0, milliseconds = 0, microseconds = 0) {
        Object.defineProperty(this, "_years", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_months", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_weeks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_days", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_hours", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_minutes", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_seconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_milliseconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_microseconds", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._years = Math.trunc(years) || 0;
        this._months = Math.trunc(months) || 0;
        this._weeks = Math.trunc(weeks) || 0;
        this._days = Math.trunc(days) || 0;
        this._hours = Math.trunc(hours) || 0;
        this._minutes = Math.trunc(minutes) || 0;
        this._seconds = Math.trunc(seconds) || 0;
        this._milliseconds = Math.trunc(milliseconds) || 0;
        this._microseconds = Math.trunc(microseconds) || 0;
    }
    get years() {
        return this._years;
    }
    get months() {
        return this._months;
    }
    get weeks() {
        return this._weeks;
    }
    get days() {
        return this._days;
    }
    get hours() {
        return this._hours;
    }
    get minutes() {
        return this._minutes;
    }
    get seconds() {
        return this._seconds;
    }
    get milliseconds() {
        return this._milliseconds;
    }
    get microseconds() {
        return this._microseconds;
    }
    toString() {
        let str = "P";
        if (this._years) {
            str += `${this._years}Y`;
        }
        if (this._months) {
            str += `${this._months}M`;
        }
        const days = this._days + 7 * this._weeks;
        if (days) {
            str += `${days}D`;
        }
        let timeParts = "";
        if (this._hours) {
            timeParts += `${this._hours}H`;
        }
        if (this._minutes) {
            timeParts += `${this._minutes}M`;
        }
        const seconds = this._seconds + this._milliseconds / 1e3 + this._microseconds / 1e6;
        if (seconds !== 0) {
            timeParts += `${seconds}S`;
        }
        if (timeParts) {
            str += `T${timeParts}`;
        }
        if (str === "P") {
            return "PT0S";
        }
        return str;
    }
    toJSON() {
        return this.toString();
    }
    valueOf() {
        throw new TypeError("Not possible to compare RelativeDuration");
    }
}
exports.RelativeDuration = RelativeDuration;
class DateDuration {
    constructor(years = 0, months = 0, weeks = 0, days = 0) {
        Object.defineProperty(this, "_years", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_months", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_weeks", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "_days", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this._years = Math.trunc(years) || 0;
        this._months = Math.trunc(months) || 0;
        this._weeks = Math.trunc(weeks) || 0;
        this._days = Math.trunc(days) || 0;
    }
    get years() {
        return this._years;
    }
    get months() {
        return this._months;
    }
    get weeks() {
        return this._weeks;
    }
    get days() {
        return this._days;
    }
    toString() {
        let str = "P";
        if (this._years) {
            str += `${this._years}Y`;
        }
        if (this._months) {
            str += `${this._months}M`;
        }
        const days = this._days + 7 * this._weeks;
        if (days) {
            str += `${days}D`;
        }
        if (str === "P") {
            return "PT0S";
        }
        return str;
    }
    toJSON() {
        return this.toString();
    }
    valueOf() {
        throw new TypeError("Not possible to compare DateDuration");
    }
}
exports.DateDuration = DateDuration;
const humanDurationPrefixes = {
    h: 3600000,
    hou: 3600000,
    m: 60000,
    min: 60000,
    s: 1000,
    sec: 1000,
    ms: 1,
    mil: 1,
};
function parseHumanDurationString(durationStr) {
    const regex = /(\d+|\d+\.\d+|\.\d+)\s*(hours?|minutes?|seconds?|milliseconds?|ms|h|m|s)\s*/g;
    let duration = 0;
    const seen = new Set();
    let match = regex.exec(durationStr);
    let lastIndex = 0;
    while (match) {
        if (match.index !== lastIndex) {
            throw new Error(`invalid duration "${durationStr}"`);
        }
        const mult = humanDurationPrefixes[match[2].slice(0, 3)];
        if (seen.has(mult)) {
            throw new Error(`invalid duration "${durationStr}"`);
        }
        duration += Number(match[1]) * mult;
        seen.add(mult);
        lastIndex = regex.lastIndex;
        match = regex.exec(durationStr);
    }
    if (lastIndex !== durationStr.length) {
        throw new Error(`invalid duration "${durationStr}"`);
    }
    return duration;
}
exports.parseHumanDurationString = parseHumanDurationString;
