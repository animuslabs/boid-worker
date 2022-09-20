import { Executor } from "../../ifaces";
import type { Version } from "../generate";
import { StrictMap } from "../strictMap";
import { typeutil } from "../util/typeutil";
export declare type ScalarTypes = typeutil.depromisify<ReturnType<typeof getScalars>>;
export declare const getScalars: (cxn: Executor, _params: {
    version: Version;
}) => Promise<StrictMap<string, {
    id: string;
    name: string;
    is_abstract: boolean;
    bases: {
        id: string;
        name: string;
    }[];
    ancestors: {
        id: string;
        name: string;
    }[];
    children: {
        id: string;
        name: string;
    }[];
    descendants: {
        id: string;
        name: string;
    }[];
}>>;
