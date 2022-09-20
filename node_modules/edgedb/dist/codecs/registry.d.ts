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
import { ICodec, uuid } from "./ifaces";
import { ProtocolVersion } from "../ifaces";
export interface CustomCodecSpec {
    decimal_string?: boolean;
    int64_bigint?: boolean;
    datetime_localDatetime?: boolean;
    json_string?: boolean;
}
export declare class CodecsRegistry {
    private codecsBuildCache;
    private codecs;
    private customScalarCodecs;
    constructor();
    setCustomCodecs({ decimal_string, int64_bigint, datetime_localDatetime, json_string, }?: CustomCodecSpec): void;
    hasCodec(typeId: uuid): boolean;
    getCodec(typeId: uuid): ICodec | null;
    buildCodec(spec: Buffer, protocolVersion: ProtocolVersion): ICodec;
    private _buildCodec;
}
