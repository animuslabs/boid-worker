import { cardinalityUtil, ExpressionKind, TypeKind, Cardinality, } from "edgedb/dist/reflection/index";
import { literalToTypeSet } from "../castMaps.js";
import { $arrayLikeIndexify, $tuplePathify } from "./collections.js";
import { $toEdgeQL } from "./toEdgeQL.js";
import { $queryFunc, $queryFuncJSON } from "./query.js";
function PathLeaf(root, parent, exclusive, scopeRoot = null) {
    return $expressionify({
        __kind__: ExpressionKind.PathLeaf,
        __element__: root.__element__,
        __cardinality__: root.__cardinality__,
        __parent__: parent,
        __exclusive__: exclusive,
        __scopeRoot__: scopeRoot,
    });
}
function PathNode(root, parent, exclusive, scopeRoot = null) {
    const obj = {
        __kind__: ExpressionKind.PathNode,
        __element__: root.__element__,
        __cardinality__: root.__cardinality__,
        __parent__: parent,
        __exclusive__: exclusive,
        __scopeRoot__: scopeRoot,
    };
    const shape = {};
    Object.entries(obj.__element__.__pointers__).map(([key, ptr]) => {
        if (ptr.__kind__ === "property") {
            shape[key] = true;
        }
    });
    Object.defineProperty(obj, "*", {
        writable: false,
        value: shape,
    });
    return $expressionify(obj);
}
const _pathCache = Symbol();
const _pointers = Symbol();
const pathifyProxyHandlers = {
    get(target, prop, proxy) {
        const ptr = target[_pointers][prop];
        if (ptr) {
            return (target[_pathCache][prop] ??
                (target[_pathCache][prop] = (ptr.__kind__ === "property" ? PathLeaf : PathNode)({
                    __element__: ptr.target,
                    __cardinality__: cardinalityUtil.multiplyCardinalities(target.__cardinality__, ptr.cardinality),
                }, {
                    linkName: prop,
                    type: proxy,
                }, ptr.exclusive ?? false, target.__scopeRoot__ ?? (scopeRoots.has(proxy) ? proxy : null))));
        }
        return target[prop];
    },
};
function _$pathify(_root) {
    if (_root.__element__.__kind__ !== TypeKind.object) {
        return _root;
    }
    const root = _root;
    let pointers = {
        ...root.__element__.__pointers__,
    };
    if (root.__parent__) {
        const { type, linkName } = root.__parent__;
        const parentPointer = type.__element__.__pointers__[linkName];
        if (parentPointer?.__kind__ === "link") {
            pointers = { ...pointers, ...parentPointer.properties };
        }
    }
    for (const [key, val] of Object.entries(root.__element__.__shape__ || { id: true })) {
        if (pointers[key])
            continue;
        const valType = val?.__element__;
        if (!valType)
            continue;
        pointers[key] = {
            __kind__: valType.__kind__ === TypeKind.object ? "link" : "property",
            properties: {},
            target: val.__element__,
            cardinality: val.__cardinality__,
            exclusive: false,
            computed: true,
            readonly: true,
            hasDefault: false,
        };
    }
    root[_pointers] = pointers;
    root[_pathCache] = {};
    return new Proxy(root, pathifyProxyHandlers);
}
function isFunc(expr) {
    return $expressionify({
        __kind__: ExpressionKind.TypeIntersection,
        __cardinality__: this.__cardinality__,
        __element__: {
            ...expr.__element__,
            __shape__: { id: true },
        },
        __expr__: this,
    });
}
function assert_single(expr) {
    return $expressionify({
        __kind__: ExpressionKind.Function,
        __element__: expr.__element__,
        __cardinality__: cardinalityUtil.overrideUpperBound(expr.__cardinality__, "One"),
        __name__: "std::assert_single",
        __args__: [expr],
        __namedargs__: {},
    });
}
const jsonDestructureProxyHandlers = {
    get(target, prop, proxy) {
        if (typeof prop === "string" && !(prop in target)) {
            const parsedProp = Number.isInteger(Number(prop)) ? Number(prop) : prop;
            return jsonDestructure.call(proxy, parsedProp);
        }
        return target[prop];
    },
};
function jsonDestructure(path) {
    const pathTypeSet = literalToTypeSet(path);
    return $expressionify({
        __kind__: ExpressionKind.Operator,
        __element__: this.__element__,
        __cardinality__: cardinalityUtil.multiplyCardinalities(this.__cardinality__, pathTypeSet.__cardinality__),
        __name__: "[]",
        __opkind__: "Infix",
        __args__: [this, pathTypeSet],
    });
}
export function $jsonDestructure(_expr) {
    if (_expr.__element__.__kind__ === TypeKind.scalar &&
        _expr.__element__.__name__ === "std::json") {
        const expr = new Proxy(_expr, jsonDestructureProxyHandlers);
        expr.destructure = jsonDestructure.bind(expr);
        return expr;
    }
    return _expr;
}
export function $expressionify(_expr) {
    const expr = _$pathify($jsonDestructure($arrayLikeIndexify($tuplePathify(_expr))));
    expr.run = $queryFunc.bind(expr);
    expr.runJSON = $queryFuncJSON.bind(expr);
    expr.is = isFunc.bind(expr);
    expr.toEdgeQL = $toEdgeQL.bind(expr);
    expr.assert_single = () => assert_single(expr);
    return Object.freeze(expr);
}
const scopedExprCache = new WeakMap();
const scopeRoots = new WeakSet();
export function $getScopedExpr(expr, existingScopes) {
    let scopedExpr = scopedExprCache.get(expr);
    if (!scopedExpr || existingScopes?.has(scopedExpr)) {
        // free objects should not be scopified
        const isFreeObject = expr.__cardinality__ === Cardinality.One &&
            expr.__element__.__name__ === "std::FreeObject";
        const isInsert = expr.__kind__ === ExpressionKind.Insert;
        scopedExpr =
            isFreeObject || isInsert
                ? expr
                : $expressionify({
                    ...expr,
                    __cardinality__: Cardinality.One,
                    __scopedFrom__: expr,
                    "*": expr["*"],
                });
        scopeRoots.add(scopedExpr);
        const uncached = !scopedExpr;
        if (uncached) {
            scopedExprCache.set(expr, scopedExpr);
        }
    }
    existingScopes?.add(scopedExpr);
    return scopedExpr;
}
export { _$pathify as $pathify, PathLeaf as $PathLeaf, PathNode as $PathNode };
//# sourceMappingURL=path.js.map