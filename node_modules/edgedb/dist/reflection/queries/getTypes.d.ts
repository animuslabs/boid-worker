import { Executor } from "../../ifaces";
import { Cardinality } from "../enums";
import type { Version } from "../generate";
import { StrictMap } from "../strictMap";
export declare type UUID = string;
export declare type Pointer = {
    real_cardinality: Cardinality;
    kind: "link" | "property";
    name: string;
    target_id: UUID;
    is_exclusive: boolean;
    is_computed: boolean;
    is_readonly: boolean;
    has_default: boolean;
    pointers: ReadonlyArray<Pointer> | null;
};
export declare type Backlink = Pointer & {
    real_cardinality: Cardinality;
    kind: "link";
    name: string;
    target_id: UUID;
    is_exclusive: boolean;
    pointers: null;
    stub: string;
};
export declare type TypeKind = "object" | "scalar" | "array" | "tuple" | "range" | "unknown";
export declare type TypeProperties<T extends TypeKind> = {
    kind: T;
    id: UUID;
    name: string;
};
export declare type ScalarType = TypeProperties<"scalar"> & {
    is_abstract: boolean;
    is_seq: boolean;
    bases: ReadonlyArray<{
        id: UUID;
    }>;
    enum_values: ReadonlyArray<string> | null;
    material_id: UUID | null;
    castType?: UUID;
};
export declare type ObjectType = TypeProperties<"object"> & {
    is_abstract: boolean;
    bases: ReadonlyArray<{
        id: UUID;
    }>;
    union_of: ReadonlyArray<{
        id: UUID;
    }>;
    intersection_of: ReadonlyArray<{
        id: UUID;
    }>;
    pointers: ReadonlyArray<Pointer>;
    backlinks: ReadonlyArray<Backlink>;
    backlink_stubs: ReadonlyArray<Backlink>;
};
export declare type ArrayType = TypeProperties<"array"> & {
    array_element_id: UUID;
    is_abstract: boolean;
};
export declare type TupleType = TypeProperties<"tuple"> & {
    tuple_elements: ReadonlyArray<{
        name: string;
        target_id: UUID;
    }>;
    is_abstract: boolean;
};
export declare type RangeType = TypeProperties<"range"> & {
    range_element_id: UUID;
    is_abstract: boolean;
};
export declare type PrimitiveType = ScalarType | ArrayType | TupleType | RangeType;
export declare type Type = PrimitiveType | ObjectType;
export declare type Types = StrictMap<UUID, Type>;
export declare const typeMapping: Map<string, ScalarType>;
export declare function getTypes(cxn: Executor, params: {
    debug?: boolean;
    version: Version;
}): Promise<Types>;
export declare function topoSort(types: Type[]): StrictMap<string, Type>;
