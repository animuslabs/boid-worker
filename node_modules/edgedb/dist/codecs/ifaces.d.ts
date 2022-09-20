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
import { ReadBuffer, WriteBuffer } from "../primitives/buffer";
export declare type uuid = string;
export declare type CodecKind = "array" | "tuple" | "namedtuple" | "object" | "set" | "scalar" | "sparse_object" | "range";
export interface ICodec {
    readonly tid: uuid;
    readonly tidBuffer: Buffer;
    encode(buf: WriteBuffer, object: any): void;
    decode(buf: ReadBuffer): any;
    getSubcodecs(): ICodec[];
    getKind(): CodecKind;
    getKnownTypeName(): string;
}
export interface IArgsCodec {
    encodeArgs(args: any): Buffer;
}
export declare abstract class Codec {
    readonly tid: uuid;
    readonly tidBuffer: Buffer;
    constructor(tid: uuid);
    getKnownTypeName(): string;
}
export declare abstract class ScalarCodec extends Codec {
    private derivedFromTid;
    private typeName;
    constructor(tid: uuid, derivedFromTid?: uuid | null);
    derive(tid: uuid): Codec;
    getSubcodecs(): ICodec[];
    getKind(): CodecKind;
    getKnownTypeName(): string;
}
