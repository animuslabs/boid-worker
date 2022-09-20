import { ExpressionKind, } from "edgedb/dist/reflection/index";
import { $expressionify } from "./path.js";
export function makeGlobal(name, type, card) {
    return $expressionify({
        __name__: name,
        __element__: type,
        __cardinality__: card,
        __kind__: ExpressionKind.Global,
    });
}
//# sourceMappingURL=globals.js.map