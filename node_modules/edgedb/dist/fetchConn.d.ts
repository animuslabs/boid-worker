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
/// <reference types="node" />
import { CodecsRegistry } from "./codecs/registry";
import { Address } from "./conUtils";
import { BaseRawConnection } from "./baseConn";
interface FetchConfig {
    address: Address | string;
    database: string;
    user?: string;
    token?: string;
}
declare class BaseFetchConnection extends BaseRawConnection {
    protected config: FetchConfig;
    protected addr: string;
    constructor(config: FetchConfig, registry: CodecsRegistry);
    protected _buildAddr(): string;
    protected _waitForMessage(): Promise<void>;
    protected __sendData(data: Buffer): Promise<void>;
    protected _sendData(data: Buffer): void;
    static create(config: FetchConfig, registry: CodecsRegistry): BaseFetchConnection;
}
export declare class AdminUIFetchConnection extends BaseFetchConnection {
    protected _buildAddr(): string;
}
export {};
