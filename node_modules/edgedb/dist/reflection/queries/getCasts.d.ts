import { Executor } from "../../ifaces";
import type { Version } from "../generate";
import { typeutil } from "../util/typeutil";
declare type Cast = {
    id: string;
    source: {
        id: string;
        name: string;
    };
    target: {
        id: string;
        name: string;
    };
    allow_assignment: boolean;
    allow_implicit: boolean;
};
export declare type Casts = typeutil.depromisify<ReturnType<typeof getCasts>>;
export declare const getCasts: (cxn: Executor, params: {
    version: Version;
    debug?: boolean;
}) => Promise<{
    castsById: Record<string, Cast>;
    typesById: Record<string, {
        name: string;
        id: string;
    }>;
    castMap: {
        [k: string]: string[];
    };
    implicitCastMap: {
        [k: string]: string[];
    };
    implicitCastFromMap: {
        [k: string]: string[];
    };
    assignmentCastMap: {
        [k: string]: string[];
    };
    assignableByMap: {
        [k: string]: string[];
    };
}>;
export {};
