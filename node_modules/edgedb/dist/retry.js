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
exports.retryingConnect = void 0;
const adapter_node_1 = require("./adapter.node");
const errors = __importStar(require("./errors"));
const rawConn_1 = require("./rawConn");
const utils_1 = require("./utils");
let lastLoggingAt = 0;
async function retryingConnect(config, registry) {
    const maxTime = config.connectionParams.waitUntilAvailable === 0
        ? 0
        : (0, adapter_node_1.hrTime)() + config.connectionParams.waitUntilAvailable;
    while (true) {
        try {
            return await rawConn_1.RawConnection.connectWithTimeout(config.connectionParams.address, config, registry);
        }
        catch (e) {
            if (e instanceof errors.ClientConnectionError) {
                if (e.hasTag(errors.SHOULD_RECONNECT)) {
                    const now = (0, adapter_node_1.hrTime)();
                    if (now > maxTime) {
                        throw e;
                    }
                    if (config.logging &&
                        (!lastLoggingAt || now - lastLoggingAt > 5000)) {
                        lastLoggingAt = now;
                        const logMsg = [
                            `A client connection error occurred; reconnecting because ` +
                                `of "waitUntilAvailable=${config.connectionParams.waitUntilAvailable}".`,
                            e,
                        ];
                        if (config.inProject && !config.fromProject && !config.fromEnv) {
                            logMsg.push(`\n\n\n` +
                                `Hint: it looks like the program is running from a ` +
                                `directory initialized with "edgedb project init". ` +
                                `Consider calling "edgedb.connect()" without arguments.` +
                                `\n`);
                        }
                        console.warn(...logMsg);
                    }
                }
                else {
                    throw e;
                }
            }
            else {
                console.error("Unexpected connection error:", e);
                throw e;
            }
        }
        await (0, utils_1.sleep)(Math.trunc(10 + Math.random() * 200));
    }
}
exports.retryingConnect = retryingConnect;
