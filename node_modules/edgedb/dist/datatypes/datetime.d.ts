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
export declare const DATE_PRIVATE: unique symbol;
export declare class LocalTime {
    private readonly _hour;
    private readonly _minute;
    private readonly _second;
    private readonly _millisecond;
    private readonly _microsecond;
    private readonly _nanosecond;
    constructor(isoHour?: number, isoMinute?: number, isoSecond?: number, isoMillisecond?: number, isoMicrosecond?: number, isoNanosecond?: number);
    get hour(): number;
    get minute(): number;
    get second(): number;
    get millisecond(): number;
    get microsecond(): number;
    get nanosecond(): number;
    toString(): string;
    toJSON(): string;
    valueOf(): any;
}
export declare class LocalDate {
    private readonly _date;
    constructor(isoYear: number, isoMonth: number, isoDay: number);
    get year(): number;
    get month(): number;
    get day(): number;
    get dayOfWeek(): number;
    get dayOfYear(): number;
    get daysInWeek(): number;
    get daysInMonth(): number;
    get daysInYear(): number;
    get monthsInYear(): number;
    get inLeapYear(): boolean;
    toString(): string;
    toJSON(): string;
    valueOf(): any;
}
export declare function LocalDateToOrdinal(localdate: LocalDate): number;
export declare function LocalDateFromOrdinal(ordinal: number): LocalDate;
export declare class LocalDateTime extends LocalDate {
    private readonly _time;
    constructor(isoYear: number, isoMonth: number, isoDay: number, isoHour?: number, isoMinute?: number, isoSecond?: number, isoMillisecond?: number, isoMicrosecond?: number, isoNanosecond?: number);
    get hour(): number;
    get minute(): number;
    get second(): number;
    get millisecond(): number;
    get microsecond(): number;
    get nanosecond(): number;
    toString(): string;
    valueOf(): any;
}
interface DurationLike {
    years?: number;
    months?: number;
    weeks?: number;
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
    milliseconds?: number;
    microseconds?: number;
    nanoseconds?: number;
}
export declare class Duration {
    private readonly _years;
    private readonly _months;
    private readonly _weeks;
    private readonly _days;
    private readonly _hours;
    private readonly _minutes;
    private readonly _seconds;
    private readonly _milliseconds;
    private readonly _microseconds;
    private readonly _nanoseconds;
    private readonly _sign;
    constructor(years?: number, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number, microseconds?: number, nanoseconds?: number);
    get years(): number;
    get months(): number;
    get weeks(): number;
    get days(): number;
    get hours(): number;
    get minutes(): number;
    get seconds(): number;
    get milliseconds(): number;
    get microseconds(): number;
    get nanoseconds(): number;
    get sign(): number;
    get blank(): boolean;
    toString(): string;
    toJSON(): string;
    valueOf(): any;
    static from(item: string | Duration | DurationLike): Duration;
}
export declare class RelativeDuration {
    private readonly _years;
    private readonly _months;
    private readonly _weeks;
    private readonly _days;
    private readonly _hours;
    private readonly _minutes;
    private readonly _seconds;
    private readonly _milliseconds;
    private readonly _microseconds;
    constructor(years?: number, months?: number, weeks?: number, days?: number, hours?: number, minutes?: number, seconds?: number, milliseconds?: number, microseconds?: number);
    get years(): number;
    get months(): number;
    get weeks(): number;
    get days(): number;
    get hours(): number;
    get minutes(): number;
    get seconds(): number;
    get milliseconds(): number;
    get microseconds(): number;
    toString(): string;
    toJSON(): string;
    valueOf(): any;
}
export declare class DateDuration {
    private readonly _years;
    private readonly _months;
    private readonly _weeks;
    private readonly _days;
    constructor(years?: number, months?: number, weeks?: number, days?: number);
    get years(): number;
    get months(): number;
    get weeks(): number;
    get days(): number;
    toString(): string;
    toJSON(): string;
    valueOf(): any;
}
export declare function parseHumanDurationString(durationStr: string): number;
export {};
