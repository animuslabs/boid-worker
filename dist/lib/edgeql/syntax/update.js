import { ExpressionKind, } from "edgedb/dist/reflection/index";
import { $expressionify, $getScopedExpr } from "./path.js";
import { $existingScopes, $handleModifiers, } from "./select.js";
import { $normaliseInsertShape } from "./insert.js";
export function update(expr, shape) {
    const cleanScopedExprs = $existingScopes.size === 0;
    const scope = $getScopedExpr(expr, $existingScopes);
    const resolvedShape = shape(scope);
    if (cleanScopedExprs) {
        $existingScopes.clear();
    }
    const mods = {};
    let updateShape;
    for (const [key, val] of Object.entries(resolvedShape)) {
        if (key === "filter") {
            mods[key] = val;
        }
        else if (key === "set") {
            updateShape = val;
        }
        else {
            throw new Error(`Invalid update shape key '${key}', only 'filter', ` +
                `and 'set' are allowed`);
        }
    }
    if (!updateShape) {
        throw new Error(`Update shape must contain 'set' shape`);
    }
    const { modifiers, cardinality } = $handleModifiers(mods, expr);
    return $expressionify({
        __kind__: ExpressionKind.Update,
        __element__: expr.__element__,
        __cardinality__: cardinality,
        __expr__: expr,
        __shape__: $normaliseInsertShape(expr, updateShape, true),
        __modifiers__: modifiers,
        __scope__: scope,
    });
}
//# sourceMappingURL=update.js.map