import { Executor } from "../../ifaces";
import { StrictMap } from "../strictMap";
import { typeutil } from "../../reflection";
import type { Version } from "../generate";
export declare type Typemod = "SetOfType" | "OptionalType" | "SingletonType";
export declare type ParamKind = "VariadicParam" | "NamedOnlyParam" | "PositionalParam";
export interface Param {
    name: string;
    type: {
        id: string;
        name: string;
    };
    kind: ParamKind;
    typemod: Typemod;
    hasDefault?: boolean;
}
export interface FunctionDef {
    id: string;
    name: string;
    description?: string;
    return_type: {
        id: string;
        name: string;
    };
    return_typemod: Typemod;
    params: Param[];
    preserves_optionality: boolean;
}
export declare type FunctionTypes = typeutil.depromisify<ReturnType<typeof getFunctions>>;
export declare const getFunctions: (cxn: Executor, _params: {
    version: Version;
}) => Promise<StrictMap<string, FunctionDef[]>>;
export declare function replaceNumberTypes(def: {
    return_type: FunctionDef["return_type"];
    params: Param[];
}): void;
