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
import { tls } from "./adapter.node";
import { Duration } from "./datatypes/datetime";
export declare type Address = [string, number];
export declare const validTlsSecurityValues: readonly ["insecure", "no_host_verification", "strict", "default"];
export declare type TlsSecurity = typeof validTlsSecurityValues[number];
interface PartiallyNormalizedConfig {
    connectionParams: ResolvedConnectConfig;
    inProject: boolean;
    fromProject: boolean;
    fromEnv: boolean;
}
export interface NormalizedConnectConfig extends PartiallyNormalizedConfig {
    connectTimeout?: number;
    logging: boolean;
}
export interface ConnectConfig {
    dsn?: string;
    credentials?: string;
    credentialsFile?: string;
    host?: string;
    port?: number;
    database?: string;
    user?: string;
    password?: string;
    serverSettings?: any;
    tlsCA?: string;
    tlsCAFile?: string;
    tlsSecurity?: TlsSecurity;
    timeout?: number;
    waitUntilAvailable?: Duration | number;
    logging?: boolean;
}
export declare function parseConnectArguments(opts?: ConnectConfig): Promise<NormalizedConnectConfig>;
declare type ConnectConfigParams = "host" | "port" | "database" | "user" | "password" | "tlsCAData" | "tlsSecurity" | "waitUntilAvailable";
export declare class ResolvedConnectConfig {
    _host: string | null;
    _hostSource: string | null;
    _port: number | null;
    _portSource: string | null;
    _database: string | null;
    _databaseSource: string | null;
    _user: string | null;
    _userSource: string | null;
    _password: string | null;
    _passwordSource: string | null;
    _tlsCAData: string | null;
    _tlsCADataSource: string | null;
    _tlsSecurity: TlsSecurity | null;
    _tlsSecuritySource: string | null;
    _waitUntilAvailable: number | null;
    _waitUntilAvailableSource: string | null;
    serverSettings: {
        [key: string]: string;
    };
    constructor();
    _setParam<Param extends ConnectConfigParams, Value extends any>(param: Param, value: Value, source: string, validator?: (value: NonNullable<Value>) => this[`_${Param}`]): boolean;
    _setParamAsync<Param extends ConnectConfigParams, Value extends any>(param: Param, value: Value, source: string, validator?: (value: NonNullable<Value>) => Promise<this[`_${Param}`]>): Promise<boolean>;
    setHost(host: string | null, source: string): boolean;
    setPort(port: string | number | null, source: string): boolean;
    setDatabase(database: string | null, source: string): boolean;
    setUser(user: string | null, source: string): boolean;
    setPassword(password: string | null, source: string): boolean;
    setTlsCAData(caData: string | null, source: string): boolean;
    setTlsCAFile(caFile: string | null, source: string): Promise<boolean>;
    setTlsSecurity(tlsSecurity: string | null, source: string): boolean;
    setWaitUntilAvailable(duration: string | number | Duration | null, source: string): boolean;
    addServerSettings(settings: {
        [key: string]: string;
    }): void;
    get address(): Address;
    get database(): string;
    get user(): string;
    get password(): string | undefined;
    get tlsSecurity(): Exclude<TlsSecurity, "default">;
    private _tlsOptions?;
    get tlsOptions(): tls.ConnectionOptions;
    get waitUntilAvailable(): number;
    explainConfig(): string;
}
export declare function parseDuration(duration: string | number | Duration): number;
export declare function stashPath(projectDir: string): Promise<string>;
export {};
