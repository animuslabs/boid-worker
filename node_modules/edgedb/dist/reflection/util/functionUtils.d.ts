import { introspect } from "../../reflection";
import { CodeFragment } from "../builders";
import { FuncopDef } from "../generators/generateFunctionTypes";
import { Casts } from "../queries/getCasts";
import { Param } from "../queries/getFunctions";
import { StrictMap } from "../strictMap";
export declare type AnytypeDef = {
    kind: "castable";
    type: CodeFragment[];
    returnAnytypeWrapper: string;
} | {
    kind: "noncastable";
    type: CodeFragment[];
    typeObj: introspect.Type;
    refName: string;
    refPath: string;
};
export declare type FuncopDefOverload<F extends FuncopDef> = F & {
    overloadIndex: number;
    params: GroupedParams;
    anytypes: AnytypeDef | null;
};
export declare function expandFuncopAnytypeOverloads<F extends FuncopDef>(overloads: F[], types: introspect.Types, casts: Casts, implicitCastableRootTypes: string[]): FuncopDefOverload<F>[];
declare function groupParams(params: Param[], types: introspect.Types): {
    positional: {
        type: introspect.Type;
        internalName: string;
        typeName: string;
        name: string;
        kind: import("../queries/getFunctions").ParamKind;
        typemod: import("../queries/getFunctions").Typemod;
        hasDefault?: boolean | undefined;
    }[];
    named: {
        type: introspect.Type;
        typeName: string;
        name: string;
        kind: import("../queries/getFunctions").ParamKind;
        typemod: import("../queries/getFunctions").Typemod;
        hasDefault?: boolean | undefined;
    }[];
};
export declare type GroupedParams = ReturnType<typeof groupParams>;
export declare function findPathOfAnytype(typeId: string, types: introspect.Types): string;
export declare function sortFuncopOverloads<F extends FuncopDef>(overloads: F[], typeSpecificities: TypeSpecificities): F[];
declare type TypeSpecificities = StrictMap<string, number>;
export declare function getTypesSpecificity(types: introspect.Types, casts: Casts): StrictMap<string, number>;
export declare function getImplicitCastableRootTypes(casts: Casts): string[];
export {};
