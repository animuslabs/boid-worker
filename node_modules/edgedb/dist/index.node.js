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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.$ = exports.reflection = exports.defaultBackoff = exports.Session = exports.RetryOptions = exports.RetryCondition = exports.IsolationLevel = exports._RawConnection = exports.createClient = void 0;
var client_1 = require("./client");
Object.defineProperty(exports, "createClient", { enumerable: true, get: function () { return client_1.createClient; } });
const client_2 = require("./client");
exports.default = client_2.createClient;
var rawConn_1 = require("./rawConn");
Object.defineProperty(exports, "_RawConnection", { enumerable: true, get: function () { return rawConn_1.RawConnection; } });
var options_1 = require("./options");
Object.defineProperty(exports, "IsolationLevel", { enumerable: true, get: function () { return options_1.IsolationLevel; } });
Object.defineProperty(exports, "RetryCondition", { enumerable: true, get: function () { return options_1.RetryCondition; } });
Object.defineProperty(exports, "RetryOptions", { enumerable: true, get: function () { return options_1.RetryOptions; } });
Object.defineProperty(exports, "Session", { enumerable: true, get: function () { return options_1.Session; } });
var options_2 = require("./options");
Object.defineProperty(exports, "defaultBackoff", { enumerable: true, get: function () { return options_2.defaultBackoff; } });
__exportStar(require("./index.shared"), exports);
exports.reflection = __importStar(require("./reflection"));
exports.$ = __importStar(require("./reflection"));
