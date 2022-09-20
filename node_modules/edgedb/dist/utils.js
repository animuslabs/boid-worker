"use strict";
/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2020-present MagicStack Inc. and the EdgeDB authors.
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
exports.versionGreaterThanOrEqual = exports.versionGreaterThan = exports.sleep = exports.getUniqueId = void 0;
const idCounter = {};
function getUniqueId(prefix = "") {
    if (!idCounter[prefix]) {
        idCounter[prefix] = 0;
    }
    const id = ++idCounter[prefix];
    return `_edgedb_${prefix}_${id.toString(16)}_`;
}
exports.getUniqueId = getUniqueId;
function sleep(durationMillis) {
    return new Promise(accept => {
        setTimeout(() => accept(), durationMillis);
    });
}
exports.sleep = sleep;
function versionGreaterThan(left, right) {
    if (left[0] > right[0]) {
        return true;
    }
    if (left[0] < right[0]) {
        return false;
    }
    return left[1] > right[1];
}
exports.versionGreaterThan = versionGreaterThan;
function versionGreaterThanOrEqual(left, right) {
    if (left[0] === right[0] && left[1] === right[1]) {
        return true;
    }
    return versionGreaterThan(left, right);
}
exports.versionGreaterThanOrEqual = versionGreaterThanOrEqual;
