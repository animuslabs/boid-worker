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
/// <reference types="node" />
import { H, HMAC } from "./adapter.node";
export { H, HMAC };
export declare function saslprep(str: string): string;
export declare function generateNonce(length?: number): Promise<Buffer>;
export declare function buildClientFirstMessage(clientNonce: Buffer, username: string): [string, string];
export declare function parseServerFirstMessage(msg: string): [Buffer, Buffer, number];
export declare function parseServerFinalMessage(msg: string): Buffer;
export declare function buildClientFinalMessage(password: string, salt: Buffer, iterations: number, clientFirstBare: string, serverFirst: string, serverNonce: Buffer): [string, Buffer];
export declare function getSaltedPassword(password: Buffer, salt: Buffer, iterations: number): Buffer;
export declare function getClientKey(saltedPassword: Buffer): Buffer;
export declare function getServerKey(saltedPassword: Buffer): Buffer;
export declare function XOR(a: Buffer, b: Buffer): Buffer;
