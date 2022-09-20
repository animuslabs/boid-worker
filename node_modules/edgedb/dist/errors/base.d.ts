export declare class EdgeDBError extends Error {
    source?: Error;
    protected static tags: object;
    get name(): string;
    hasTag(tag: symbol): boolean;
}
export declare type ErrorType = new (msg: string) => EdgeDBError;
