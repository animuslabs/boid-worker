import { ExpressionKind } from "edgedb/dist/reflection/index";
import { $expressionify } from "./path.js";
export function alias(expr) {
    return $expressionify({
        __kind__: ExpressionKind.Alias,
        __element__: expr.__element__,
        __cardinality__: expr.__cardinality__,
        __expr__: expr,
    });
}
function _with(refs, expr) {
    return $expressionify({
        __kind__: ExpressionKind.With,
        __element__: expr.__element__,
        __cardinality__: expr.__cardinality__,
        __refs__: refs,
        __expr__: expr,
    });
}
export { _with as with };
//# sourceMappingURL=with.js.map