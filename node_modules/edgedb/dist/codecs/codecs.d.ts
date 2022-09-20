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
import { ICodec, Codec, CodecKind } from "./ifaces";
export declare class NullCodec extends Codec implements ICodec {
    static BUFFER: Buffer;
    encode(_buf: WriteBuffer, _object: any): void;
    decode(_buf: ReadBuffer): any;
    getSubcodecs(): ICodec[];
    getKind(): CodecKind;
}
export declare const SCALAR_CODECS: Map<string, ICodec>;
export declare const NULL_CODEC: NullCodec;
export declare const INVALID_CODEC: NullCodec;
