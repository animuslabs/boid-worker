"use strict";
/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2022-present MagicStack Inc. and the EdgeDB authors.
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminUIFetchConnection = void 0;
const baseConn_1 = require("./baseConn");
const event_1 = __importDefault(require("./primitives/event"));
const chars = __importStar(require("./primitives/chars"));
const errors_1 = require("./errors");
if (typeof fetch === "undefined") {
    globalThis.fetch = require("node-fetch");
}
const PROTO_MIME = `application/x.edgedb.v_${baseConn_1.PROTO_VER[0]}_${baseConn_1.PROTO_VER[1]}.binary'`;
class BaseFetchConnection extends baseConn_1.BaseRawConnection {
    constructor(config, registry) {
        super(registry);
        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        Object.defineProperty(this, "addr", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.config = config;
        this.addr = this._buildAddr();
    }
    _buildAddr() {
        this.throwNotImplemented("_buildAddr");
    }
    async _waitForMessage() {
        if (this.buffer.takeMessage()) {
            return;
        }
        if (this.messageWaiter == null || this.messageWaiter.done) {
            throw new errors_1.InternalClientError(`message waiter was not initialized before waiting for response`);
        }
        await this.messageWaiter.wait();
    }
    async __sendData(data) {
        if (this.buffer.takeMessage()) {
            const mtype = this.buffer.getMessageType();
            throw new errors_1.InternalClientError(`sending request before reading all data of the previous one: ` +
                `${chars.chr(mtype)}`);
        }
        if (this.messageWaiter != null && !this.messageWaiter.done) {
            throw new errors_1.InternalClientError(`sending request before waiting for completion of the previous one`);
        }
        this.messageWaiter = new event_1.default();
        try {
            const headers = { "Content-Type": PROTO_MIME };
            if (this.config.user !== undefined) {
                headers["X-EdgeDB-User"] = this.config.user;
            }
            if (this.config.token !== undefined) {
                headers.Authorization = `Bearer ${this.config.token}`;
            }
            const resp = await fetch(this.addr, {
                method: "post",
                body: data,
                headers,
            });
            if (!resp.ok) {
                throw new errors_1.ProtocolError(`fetch failed with status code ${resp.status}: ${resp.statusText}`);
            }
            const respData = await resp.arrayBuffer();
            const buf = Buffer.from(respData);
            let pause = false;
            try {
                pause = this.buffer.feed(buf);
            }
            catch (e) {
                this.messageWaiter.setError(e);
            }
            if (pause) {
                throw new errors_1.ProtocolError("too much data received");
            }
            if (!this.buffer.takeMessage()) {
                throw new errors_1.ProtocolError("no binary protocol messages in the response");
            }
            this.messageWaiter.set();
        }
        catch (e) {
            this.messageWaiter.setError(e);
        }
    }
    _sendData(data) {
        this.__sendData(data);
    }
    static create(config, registry) {
        const conn = new this(config, registry);
        conn.connected = true;
        conn.exposeErrorAttributes = true;
        return conn;
    }
}
class AdminUIFetchConnection extends BaseFetchConnection {
    _buildAddr() {
        const config = this.config;
        return `${typeof config.address === "string"
            ? config.address
            : `http://${config.address[0]}:${config.address[1]}`}/db/${config.database}`;
    }
}
exports.AdminUIFetchConnection = AdminUIFetchConnection;
