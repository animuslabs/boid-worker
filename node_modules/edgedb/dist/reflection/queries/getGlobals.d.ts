import { Executor } from "../../ifaces";
import { Cardinality } from "../enums";
import type { Version } from "../generate";
import { StrictMap } from "../strictMap";
export declare type UUID = string;
export declare type GlobalType = {
    id: UUID;
    name: string;
    has_default: boolean;
    target_id: UUID;
    real_cardinality: Cardinality;
};
export declare type Globals = StrictMap<UUID, GlobalType>;
export declare function getGlobals(cxn: Executor, params: {
    version: Version;
}): Promise<Globals>;
