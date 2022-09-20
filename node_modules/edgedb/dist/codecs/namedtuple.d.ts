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
import { ICodec, Codec, uuid, IArgsCodec, CodecKind } from "./ifaces";
import { ReadBuffer, WriteBuffer } from "../primitives/buffer";
export declare class NamedTupleCodec extends Codec implements ICodec, IArgsCodec {
    private subCodecs;
    private names;
    private namesSet;
    constructor(tid: uuid, codecs: ICodec[], names: string[]);
    encode(_buf: WriteBuffer, _object: any): void;
    encodeArgs(args: any): Buffer;
    decode(buf: ReadBuffer): any;
    getSubcodecs(): ICodec[];
    getNames(): string[];
    getKind(): CodecKind;
}
