import { TypeKind, $mergeObjectTypes } from "edgedb/dist/reflection/index";
// "../" path gets replaced during generation step
// @ts-ignore
import * as castMaps from "../castMaps.js";
export function getSharedParent(a, b) {
    if (a.__kind__ !== b.__kind__) {
        throw new Error(`Incompatible array types: ${a.__name__} and ${b.__name__}`);
    }
    if (a.__kind__ === TypeKind.scalar && b.__kind__ === TypeKind.scalar) {
        return castMaps.getSharedParentScalar(a, b);
    }
    else if (a.__kind__ === TypeKind.object &&
        b.__kind__ === TypeKind.object) {
        return $mergeObjectTypes(a, b);
    }
    else if (a.__kind__ === TypeKind.tuple && b.__kind__ === TypeKind.tuple) {
        if (a.__items__.length !== b.__items__.length) {
            throw new Error(`Incompatible tuple types: ${a.__name__} and ${b.__name__}`);
        }
        try {
            const items = a.__items__.map((_, i) => {
                if (!a.__items__[i] || !b.__items__[i]) {
                    throw new Error();
                }
                return getSharedParent(a.__items__[i], b.__items__[i]);
            });
            return {
                __kind__: TypeKind.tuple,
                __name__: `tuple<${items.map(item => item.__name__).join(", ")}>`,
                __items__: items,
            };
        }
        catch (err) {
            throw new Error(`Incompatible tuple types: ${a.__name__} and ${b.__name__}`);
        }
    }
    else if (a.__kind__ === TypeKind.namedtuple &&
        b.__kind__ === TypeKind.namedtuple) {
        const aKeys = Object.keys(a);
        const bKeys = new Set(Object.keys(b));
        const sameKeys = aKeys.length === bKeys.size && aKeys.every(k => bKeys.has(k));
        if (!sameKeys) {
            throw new Error(`Incompatible tuple types: ${a.__name__} and ${b.__name__}`);
        }
        try {
            const items = {};
            for (const [i] of Object.entries(a.__shape__)) {
                if (!a.__shape__[i] || !b.__shape__[i]) {
                    throw new Error();
                }
                items[i] = getSharedParent(a.__shape__[i], b.__shape__[i]);
            }
            return {
                __kind__: TypeKind.namedtuple,
                __name__: `tuple<${Object.entries(items)
                    .map(([key, val]) => `${key}: ${val.__name__}`)
                    .join(", ")}>`,
                __shape__: items,
            };
        }
        catch (err) {
            throw new Error(`Incompatible tuple types: ${a.__name__} and ${b.__name__}`);
        }
    }
    else if (a.__kind__ === TypeKind.array && b.__kind__ === TypeKind.array) {
        try {
            const mergedEl = getSharedParent(a.__element__, b.__element__);
            return {
                __kind__: TypeKind.array,
                __name__: a.__name__,
                __element__: mergedEl,
            };
        }
        catch (err) {
            throw new Error(`Incompatible array types: ${a.__name__} and ${b.__name__}`);
        }
    }
    else if (a.__kind__ === TypeKind.enum && b.__kind__ === TypeKind.enum) {
        if (a.__name__ === b.__name__)
            return a;
        throw new Error(`Incompatible array types: ${a.__name__} and ${b.__name__}`);
    }
    else {
        throw new Error(`Incompatible array types: ${a.__name__} and ${b.__name__}`);
    }
}
// @ts-ignore
export { set } from "./setImpl.js";
//# sourceMappingURL=set.js.map