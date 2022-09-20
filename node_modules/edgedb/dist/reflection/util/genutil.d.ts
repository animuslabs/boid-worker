import { CodeBuilder, CodeFragment, IdentRef } from "../builders";
import * as introspect from "../queries/getTypes";
export declare function splitName(name: string): {
    mod: string;
    name: string;
};
export declare function toIdent(name: string): string;
export declare const makePlainIdent: (name: string) => string;
export declare function quote(val: string): string;
export declare const scalarToLiteralMapping: {
    [key: string]: {
        type: string;
        literalKind?: "typeof" | "instanceof";
        extraTypes?: string[];
    };
};
export declare const literalToScalarMapping: {
    [key: string]: {
        type: string;
        literalKind: "typeof" | "instanceof";
    };
};
export declare function toTSScalarType(type: introspect.PrimitiveType, types: introspect.Types, opts?: {
    getEnumRef?: (type: introspect.Type) => string;
    edgedbDatatypePrefix: string;
}): CodeFragment[];
export declare function toTSObjectType(type: introspect.ObjectType, types: introspect.Types, currentMod: string, code: CodeBuilder, level?: number): CodeFragment[];
export declare function capitalize(str: string): string;
export declare function displayName(str: string): string;
export declare function getInternalName({ fqn, id }: {
    fqn: string;
    id: string;
}): string;
export declare function makeValidIdent({ id, name, skipKeywordCheck, }: {
    id: string;
    name: string;
    skipKeywordCheck?: boolean;
}): string;
export declare function getRef(name: string, opts?: {
    prefix?: string;
}): IdentRef;
export declare function frag(strings: TemplateStringsArray, ...exprs: (CodeFragment | CodeFragment[])[]): CodeFragment[];
export declare function joinFrags(frags: (CodeFragment | CodeFragment[])[], sep: string): CodeFragment[];
export declare const reservedIdents: Set<string>;
