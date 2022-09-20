import { ClientConnectionHolder } from "./client";
import { Executor, QueryArgs } from "./ifaces";
export declare enum TransactionState {
    ACTIVE = 0,
    COMMITTED = 1,
    ROLLEDBACK = 2,
    FAILED = 3
}
export declare class Transaction implements Executor {
    protected _holder: ClientConnectionHolder;
    private _rawConn;
    private _state;
    private _opInProgress;
    private constructor();
    private _runOp;
    execute(query: string, args?: QueryArgs): Promise<void>;
    query<T = unknown>(query: string, args?: QueryArgs): Promise<T[]>;
    queryJSON(query: string, args?: QueryArgs): Promise<string>;
    querySingle<T = unknown>(query: string, args?: QueryArgs): Promise<T | null>;
    querySingleJSON(query: string, args?: QueryArgs): Promise<string>;
    queryRequiredSingle<T = unknown>(query: string, args?: QueryArgs): Promise<T>;
    queryRequiredSingleJSON(query: string, args?: QueryArgs): Promise<string>;
}
