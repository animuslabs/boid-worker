import { ExpressionKind, Cardinality, } from "edgedb/dist/reflection/index";
import { $expressionify } from "./path.js";
import { literalToTypeSet } from "../castMaps.js";
export function cast(target, expr) {
    const cleanedExpr = expr === null ? null : literalToTypeSet(expr);
    return $expressionify({
        __element__: target,
        __cardinality__: cleanedExpr === null ? Cardinality.Empty : cleanedExpr.__cardinality__,
        __expr__: cleanedExpr,
        __kind__: ExpressionKind.Cast,
    });
}
//# sourceMappingURL=cast.js.map