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
exports.XOR = exports.getServerKey = exports.getClientKey = exports.getSaltedPassword = exports.buildClientFinalMessage = exports.parseServerFinalMessage = exports.parseServerFirstMessage = exports.buildClientFirstMessage = exports.generateNonce = exports.saslprep = exports.HMAC = exports.H = void 0;
const adapter_node_1 = require("./adapter.node");
Object.defineProperty(exports, "H", { enumerable: true, get: function () { return adapter_node_1.H; } });
Object.defineProperty(exports, "HMAC", { enumerable: true, get: function () { return adapter_node_1.HMAC; } });
const errors_1 = require("./errors");
const RAW_NONCE_LENGTH = 18;
function saslprep(str) {
    return str.normalize("NFKC");
}
exports.saslprep = saslprep;
async function generateNonce(length = RAW_NONCE_LENGTH) {
    return await (0, adapter_node_1.randomBytes)(length);
}
exports.generateNonce = generateNonce;
function buildClientFirstMessage(clientNonce, username) {
    const bare = `n=${saslprep(username)},r=${clientNonce.toString("base64")}`;
    return [`n,,${bare}`, bare];
}
exports.buildClientFirstMessage = buildClientFirstMessage;
function parseServerFirstMessage(msg) {
    const attrs = msg.split(",");
    if (attrs.length < 3) {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const nonceAttr = attrs[0];
    if (!nonceAttr || nonceAttr[0] !== "r") {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const nonceB64 = nonceAttr.split("=", 2)[1];
    if (!nonceB64) {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const nonce = Buffer.from(nonceB64, "base64");
    const saltAttr = attrs[1];
    if (!saltAttr || saltAttr[0] !== "s") {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const saltB64 = saltAttr.split("=", 2)[1];
    if (!saltB64) {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const salt = Buffer.from(saltB64, "base64");
    const iterAttr = attrs[2];
    if (!iterAttr || iterAttr[0] !== "i") {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const iter = iterAttr.split("=", 2)[1];
    if (!iter || !iter.match(/^[0-9]*$/)) {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const iterCount = parseInt(iter, 10);
    if (iterCount <= 0) {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    return [nonce, salt, iterCount];
}
exports.parseServerFirstMessage = parseServerFirstMessage;
function parseServerFinalMessage(msg) {
    const attrs = msg.split(",");
    if (attrs.length < 1) {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const nonceAttr = attrs[0];
    if (!nonceAttr || nonceAttr[0] !== "v") {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const signatureB64 = nonceAttr.split("=", 2)[1];
    if (!signatureB64) {
        throw new errors_1.ProtocolError("malformed SCRAM message");
    }
    const sig = Buffer.from(signatureB64, "base64");
    return sig;
}
exports.parseServerFinalMessage = parseServerFinalMessage;
function buildClientFinalMessage(password, salt, iterations, clientFirstBare, serverFirst, serverNonce) {
    const clientFinal = `c=biws,r=${serverNonce.toString("base64")}`;
    const authMessage = Buffer.from(`${clientFirstBare},${serverFirst},${clientFinal}`, "utf8");
    const saltedPassword = getSaltedPassword(Buffer.from(saslprep(password), "utf8"), salt, iterations);
    const clientKey = getClientKey(saltedPassword);
    const storedKey = (0, adapter_node_1.H)(clientKey);
    const clientSignature = (0, adapter_node_1.HMAC)(storedKey, authMessage);
    const clientProof = XOR(clientKey, clientSignature);
    const serverKey = getServerKey(saltedPassword);
    const serverProof = (0, adapter_node_1.HMAC)(serverKey, authMessage);
    return [`${clientFinal},p=${clientProof.toString("base64")}`, serverProof];
}
exports.buildClientFinalMessage = buildClientFinalMessage;
function getSaltedPassword(password, salt, iterations) {
    let Hi = (0, adapter_node_1.HMAC)(password, salt, Buffer.from("00000001", "hex"));
    let Ui = Hi;
    for (let _ = 0; _ < iterations - 1; _++) {
        Ui = (0, adapter_node_1.HMAC)(password, Ui);
        Hi = XOR(Hi, Ui);
    }
    return Hi;
}
exports.getSaltedPassword = getSaltedPassword;
function getClientKey(saltedPassword) {
    return (0, adapter_node_1.HMAC)(saltedPassword, Buffer.from("Client Key", "utf8"));
}
exports.getClientKey = getClientKey;
function getServerKey(saltedPassword) {
    return (0, adapter_node_1.HMAC)(saltedPassword, Buffer.from("Server Key", "utf8"));
}
exports.getServerKey = getServerKey;
function XOR(a, b) {
    const len = a.length;
    if (len !== b.length) {
        throw new errors_1.ProtocolError("scram.XOR: buffers are of different lengths");
    }
    const res = Buffer.allocUnsafe(len);
    for (let i = 0; i < len; i++) {
        res[i] = a[i] ^ b[i];
    }
    return res;
}
exports.XOR = XOR;
