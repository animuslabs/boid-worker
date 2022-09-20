import { ExpressionKind } from "edgedb/dist/reflection/index";
import { $expressionify } from "./path.js";
export function detached(expr) {
    return $expressionify({
        __element__: expr.__element__,
        __cardinality__: expr.__cardinality__,
        __expr__: expr,
        __kind__: ExpressionKind.Detached,
    });
}
//# sourceMappingURL=detached.js.map