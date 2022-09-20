import { CodeFragment } from "../builders";
import type { GeneratorParams } from "../generate";
import * as introspect from "../queries/getTypes";
export declare const getStringRepresentation: (type: introspect.Type, params: {
    types: introspect.Types;
    anytype?: string | CodeFragment[];
    casts?: {
        [key: string]: string[];
    };
    castSuffix?: string;
}) => {
    staticType: CodeFragment[];
    runtimeType: CodeFragment[];
};
export declare const generateObjectTypes: (params: GeneratorParams) => void;
