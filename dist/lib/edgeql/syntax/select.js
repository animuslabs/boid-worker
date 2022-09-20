import { LocalDateTime, LocalDate, LocalTime, Duration, RelativeDuration, ConfigMemory, DateDuration, } from "edgedb";
import { Cardinality, cardinalityUtil, ExpressionKind, makeType, TypeKind, } from "edgedb/dist/reflection/index";
import { $expressionify, $getScopedExpr } from "./path.js";
import { $getTypeByName, literal } from "./literal.js";
import { spec } from "../__spec__.js";
import { literalToTypeSet, } from "../castMaps.js";
export const ASC = "ASC";
export const DESC = "DESC";
export const EMPTY_FIRST = "EMPTY FIRST";
export const EMPTY_LAST = "EMPTY LAST";
export function is(expr, shape) {
    const mappedShape = {};
    for (const [key, value] of Object.entries(shape)) {
        mappedShape[key] = {
            __kind__: ExpressionKind.PolyShapeElement,
            __polyType__: expr,
            __shapeElement__: value,
        };
    }
    return mappedShape;
}
function computeFilterCardinality(expr, cardinality, base) {
    let card = cardinality;
    const filter = expr;
    // Base is ObjectExpression
    const baseIsObjectExpr = base?.__element__?.__kind__ === TypeKind.object;
    const filterExprIsEq = filter.__kind__ === ExpressionKind.Operator && filter.__name__ === "=";
    const arg0 = filter?.__args__?.[0];
    const arg1 = filter?.__args__?.[1];
    const argsExist = !!arg0 && !!arg1 && !!arg1.__cardinality__;
    const arg0IsUnique = arg0?.__exclusive__ === true;
    if (baseIsObjectExpr && filterExprIsEq && argsExist && arg0IsUnique) {
        const newCard = arg1.__cardinality__ === Cardinality.One ||
            arg1.__cardinality__ === Cardinality.AtMostOne
            ? Cardinality.AtMostOne
            : arg1.__cardinality__ === Cardinality.Empty
                ? Cardinality.Empty
                : cardinality;
        if (arg0.__kind__ === ExpressionKind.PathLeaf) {
            const arg0ParentMatchesBase = arg0.__parent__.type.__element__.__name__ ===
                base.__element__.__name__;
            if (arg0ParentMatchesBase) {
                card = newCard;
            }
        }
        else if (arg0.__kind__ === ExpressionKind.PathNode) {
            // if Filter.args[0] is PathNode:
            //   Filter.args[0] is __exclusive__ &
            //   if Filter.args[0].parent === null
            //     Filter.args[0].__element__ === Base.__element__
            //     Filter.args[1].__cardinality__ is AtMostOne or One
            //   else
            //     Filter.args[0].type.__element__ === Base.__element__ &
            //     Filter.args[1].__cardinality__ is AtMostOne or One
            const parent = arg0.__parent__;
            if (parent === null) {
                const arg0MatchesBase = arg0.__element__.__name__ === base.__element__.__name__;
                if (arg0MatchesBase) {
                    card = newCard;
                }
            }
            else {
                const arg0ParentMatchesBase = parent?.type.__element__.__name__ === base.__element__.__name__;
                if (arg0ParentMatchesBase) {
                    card = newCard;
                }
            }
        }
    }
    return card;
}
export function $handleModifiers(modifiers, rootExpr) {
    const mods = { ...modifiers };
    let card = rootExpr.__cardinality__;
    if (mods.filter && rootExpr.__element__.__kind__ === TypeKind.object) {
        card = computeFilterCardinality(mods.filter, card, rootExpr);
    }
    if (mods.order_by) {
        const orderExprs = Array.isArray(mods.order_by)
            ? mods.order_by
            : [mods.order_by];
        mods.order_by = orderExprs.map(expr => typeof expr.__element__ === "undefined"
            ? expr
            : { expression: expr });
    }
    if (mods.offset) {
        mods.offset =
            typeof mods.offset === "number"
                ? $getTypeByName("std::number")(mods.offset)
                : mods.offset;
        card = cardinalityUtil.overrideLowerBound(card, "Zero");
    }
    if (mods.limit) {
        let expr = mods.limit;
        if (typeof expr === "number") {
            expr = $getTypeByName("std::number")(expr);
        }
        else if (expr.__kind__ === ExpressionKind.Set) {
            expr = expr.__exprs__[0];
        }
        mods.limit = expr;
        card = cardinalityUtil.overrideLowerBound(card, "Zero");
    }
    return { modifiers: mods, cardinality: card };
}
function deleteExpr(expr, modifiersGetter) {
    const selectExpr = select(expr, modifiersGetter);
    return $expressionify({
        __kind__: ExpressionKind.Delete,
        __element__: selectExpr.__element__,
        __cardinality__: selectExpr.__cardinality__,
        __expr__: selectExpr,
    });
}
export { deleteExpr as delete };
// Modifier methods removed for now, until we can fix typescript inference
// problems / excessively deep errors
// function resolveModifierGetter(parent: any, modGetter: any) {
//   if (typeof modGetter === "function" && !modGetter.__kind__) {
//     if (parent.__expr__.__element__.__kind__ === TypeKind.object) {
//       const shape = parent.__element__.__shape__;
//       const _scope =
//         parent.__scope__ ?? $getScopedExpr(parent.__expr__,
//           $existingScopes);
//       const scope = new Proxy(_scope, {
//         get(target: any, prop: string) {
//           if (shape[prop] && shape[prop] !== true) {
//             return shape[prop];
//           }
//           return target[prop];
//         },
//       });
//       return {
//         scope: _scope,
//         modExpr: modGetter(scope),
//       };
//     } else {
//       return {
//         scope: undefined,
//         modExpr: modGetter(parent.__expr__),
//       };
//     }
//   } else {
//     return {scope: parent.__scope__, modExpr: modGetter};
//   }
// }
// function updateModifier(
//   parent: any,
//   modName: "filter" | "order_by" | "offset" | "limit",
//   modGetter: any
// ) {
//   const modifiers = {
//     ...parent.__modifiers__,
//   };
//   const cardinality = parent.__cardinality__;
//   const {modExpr, scope} = resolveModifierGetter(parent, modGetter);
//   switch (modName) {
//     case "filter":
//       modifiers.filter = modifiers.filter
//         ? op(modifiers.filter, "and", modExpr)
//         : modExpr;
//       // methods no longer change cardinality
//       // cardinality = computeFilterCardinality(
//       //   modExpr,
//       //   cardinality,
//       //   parent.__expr__
//       // );
//       break;
//     case "order_by":
//       const ordering =
//         typeof (modExpr as any).__element__ === "undefined"
//           ? modExpr
//           : {expression: modExpr};
//       modifiers.order_by = modifiers.order_by
//         ? [...modifiers.order_by, ordering]
//         : [ordering];
//       break;
//     case "offset":
//       modifiers.offset =
//         typeof modExpr === "number" ? _std.number(modExpr) : modExpr;
//       // methods no longer change cardinality
//       // cardinality = cardinalityUtil
//            .overrideLowerBound(cardinality, "Zero");
//       break;
//     case "limit":
//       modifiers.limit =
//         typeof modExpr === "number"
//           ? _std.number(modExpr)
//           : (modExpr as any).__kind__ === ExpressionKind.Set
//           ? (modExpr as any).__exprs__[0]
//           : modExpr;
//       // methods no longer change cardinality
//       // cardinality = cardinalityUtil
//            .overrideLowerBound(cardinality, "Zero");
//       break;
//   }
//   return $expressionify(
//     $selectify({
//       __kind__: ExpressionKind.Select,
//       __element__: parent.__element__,
//       __cardinality__: cardinality,
//       __expr__: parent.__expr__,
//       __modifiers__: modifiers,
//       __scope__: scope,
//     })
//   );
// }
export function $selectify(expr) {
    // Object.assign(expr, {
    //   filter: (filter: any) => updateModifier(expr, "filter", filter),
    //   order_by: (order_by: any) => updateModifier(expr, "order_by", order_by),
    //   offset: (offset: any) => updateModifier(expr, "offset", offset),
    //   limit: (limit: any) => updateModifier(expr, "limit", limit),
    // });
    return expr;
}
const $FreeObject = makeType(spec, [...spec.values()].find(s => s.name === "std::FreeObject").id, literal);
const FreeObject = {
    __kind__: ExpressionKind.PathNode,
    __element__: $FreeObject,
    __cardinality__: Cardinality.One,
    __parent__: null,
    __exclusive__: true,
    __scopeRoot__: null,
};
export const $existingScopes = new Set();
function $shape(_a, b) {
    return b;
}
export { $shape as shape };
export function select(...args) {
    const firstArg = args[0];
    if (typeof firstArg !== "object" ||
        firstArg instanceof Buffer ||
        firstArg instanceof Date ||
        firstArg instanceof Duration ||
        firstArg instanceof LocalDateTime ||
        firstArg instanceof LocalDate ||
        firstArg instanceof LocalTime ||
        firstArg instanceof RelativeDuration ||
        firstArg instanceof DateDuration ||
        firstArg instanceof ConfigMemory) {
        const literalExpr = literalToTypeSet(firstArg);
        return $expressionify($selectify({
            __kind__: ExpressionKind.Select,
            __element__: literalExpr.__element__,
            __cardinality__: literalExpr.__cardinality__,
            __expr__: literalExpr,
            __modifiers__: {},
        }));
    }
    const exprPair = typeof args[0].__element__ !== "undefined"
        ? args
        : [FreeObject, () => args[0]];
    let expr = exprPair[0];
    const shapeGetter = exprPair[1];
    if (expr === FreeObject) {
        const freeObjectPtrs = {};
        for (const [k, v] of Object.entries(args[0])) {
            freeObjectPtrs[k] = {
                __kind__: v.__element__.__kind__ === TypeKind.object ? "link" : "property",
                target: v.__element__,
                cardinality: v.__cardinality__,
                exclusive: false,
                computed: true,
                readonly: true,
                hasDefault: false,
                properties: {},
            };
        }
        expr = {
            ...FreeObject,
            __element__: {
                ...FreeObject.__element__,
                __pointers__: {
                    ...FreeObject.__element__.__pointers__,
                    ...freeObjectPtrs,
                },
            },
        };
    }
    if (!shapeGetter) {
        if (expr.__element__.__kind__ === TypeKind.object) {
            const objectExpr = expr;
            return $expressionify($selectify({
                __kind__: ExpressionKind.Select,
                __element__: {
                    __kind__: TypeKind.object,
                    __name__: `${objectExpr.__element__.__name__}`,
                    __pointers__: objectExpr.__element__.__pointers__,
                    __shape__: objectExpr.__element__.__shape__,
                },
                __cardinality__: objectExpr.__cardinality__,
                __expr__: objectExpr,
                __modifiers__: {},
            }));
        }
        else {
            return $expressionify($selectify({
                __kind__: ExpressionKind.Select,
                __element__: expr.__element__,
                __cardinality__: expr.__cardinality__,
                __expr__: expr,
                __modifiers__: {},
            }));
        }
    }
    const cleanScopedExprs = $existingScopes.size === 0;
    const { modifiers: mods, shape, scope } = resolveShape(shapeGetter, expr);
    if (cleanScopedExprs) {
        $existingScopes.clear();
    }
    const { modifiers, cardinality } = $handleModifiers(mods, expr);
    return $expressionify($selectify({
        __kind__: ExpressionKind.Select,
        __element__: expr.__element__.__kind__ === TypeKind.object
            ? {
                __kind__: TypeKind.object,
                __name__: `${expr.__element__.__name__}`,
                __pointers__: expr.__element__.__pointers__,
                __shape__: shape,
            }
            : expr.__element__,
        __cardinality__: cardinality,
        __expr__: expr,
        __modifiers__: modifiers,
        __scope__: expr !== scope // && expr.__element__.__name__ !== "std::FreeObject"
            ? scope
            : undefined,
    }));
}
function resolveShape(shapeGetter, expr) {
    const modifiers = {};
    const shape = {};
    // get scoped object if expression is objecttypeset
    const scope = expr.__element__.__kind__ === TypeKind.object
        ? $getScopedExpr(expr, $existingScopes)
        : expr;
    // execute getter with scope
    const selectShape = typeof shapeGetter === "function" ? shapeGetter(scope) : shapeGetter;
    for (const [key, value] of Object.entries(selectShape)) {
        // handle modifier keys
        if (key === "filter" ||
            key === "order_by" ||
            key === "offset" ||
            key === "limit") {
            modifiers[key] = value;
        }
        else {
            // for scalar expressions, scope === expr
            // shape keys are not allowed
            if (expr.__element__.__kind__ !== TypeKind.object) {
                throw new Error(`Invalid select shape key '${key}' on scalar expression, ` +
                    `only modifiers are allowed (filter, order_by, offset and limit)`);
            }
            shape[key] = resolveShapeElement(key, value, scope);
        }
    }
    return { shape, modifiers, scope };
}
export function resolveShapeElement(key, value, scope) {
    // if value is a nested closure
    // or a nested shape object
    const isSubshape = typeof value === "object" &&
        typeof value.__kind__ === "undefined";
    const isClosure = typeof value === "function" &&
        scope.__element__.__pointers__[key]?.__kind__ === "link";
    // if (isSubshape) {
    //   // return value;
    //   const childExpr = (scope as any)[key];
    //   const {
    //     shape: childShape,
    //     // scope: childScope,
    //     // modifiers: mods,
    //   } = resolveShape(value as any, childExpr);
    //   return childShape;
    // }
    if (isSubshape || isClosure) {
        // get child node expression
        // this relies on Proxy-based getters
        const childExpr = scope[key];
        if (!childExpr) {
            throw new Error(`Invalid shape element "${key}" for type ${scope.__element__.__name__}`);
        }
        const { shape: childShape, scope: childScope, modifiers: mods, } = resolveShape(value, childExpr);
        // extracts normalized modifiers
        const { modifiers } = $handleModifiers(mods, childExpr);
        return {
            __kind__: ExpressionKind.Select,
            __element__: {
                __kind__: TypeKind.object,
                __name__: `${childExpr.__element__.__name__}`,
                __pointers__: childExpr.__element__.__pointers__,
                __shape__: childShape,
            },
            __cardinality__: scope.__element__.__pointers__?.[key]?.cardinality ||
                scope.__element__.__shape__?.[key]?.__cardinality__,
            __expr__: childExpr,
            __modifiers__: modifiers,
            __scope__: childExpr !== childScope ? childScope : undefined,
        };
    }
    else if (value?.__kind__ === ExpressionKind.PolyShapeElement) {
        const polyElement = value;
        const polyScope = scope.is(polyElement.__polyType__);
        return {
            __kind__: ExpressionKind.PolyShapeElement,
            __polyType__: polyScope,
            __shapeElement__: resolveShapeElement(key, polyElement.__shapeElement__, polyScope),
        };
    }
    else if (typeof value === "boolean" && key.startsWith("@")) {
        const linkProp = scope[key];
        if (!linkProp) {
            throw new Error(scope.__parent__
                ? `link property '${key}' does not exist on link ${scope.__parent__.linkName}`
                : `cannot select link property '${key}' on an object (${scope.__element__.__name__})`);
        }
        return value ? linkProp : false;
    }
    else {
        return value;
    }
}
//# sourceMappingURL=select.js.map