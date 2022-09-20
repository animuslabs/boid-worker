import { Range } from "edgedb";
import { TypeKind, ExpressionKind, } from "edgedb/dist/reflection/index";
import { literalToTypeSet } from "../castMaps.js";
import { spec } from "../__spec__.js";
import { literal, $nameMapping } from "./literal.js";
import { $resolveOverload } from "./funcops.js";
import { $expressionify } from "./path.js";
function range(...args) {
    if (args.length === 1) {
        const arg = args[0];
        if (arg instanceof Range) {
            if (arg.lower === null && arg.upper === null) {
                throw new Error(`Can't create literal expression from unbounded range. Try this instead:\n\n  e.range(e.cast(e.int64, e.set()), e.cast(e.int64, e.set()))`);
            }
            if (arg.isEmpty) {
                throw new Error(`Can't create literal expression from empty range.`);
            }
            return literal(range(literalToTypeSet(arg.lower ?? arg.upper).__element__), arg);
        }
        if (arg.__kind__ && !arg.__element__) {
            return {
                __kind__: TypeKind.range,
                __name__: `range<${arg.__name__}>`,
                __element__: arg,
            };
        }
    }
    const { returnType, cardinality, args: positionalArgs, namedArgs, } = $resolveOverload("std::range", args, spec, [
        {
            args: [
                {
                    typeId: $nameMapping.get("std::anypoint"),
                    optional: true,
                    setoftype: false,
                    variadic: false,
                },
                {
                    typeId: $nameMapping.get("std::anypoint"),
                    optional: true,
                    setoftype: false,
                    variadic: false,
                },
            ],
            namedArgs: {
                inc_lower: {
                    typeId: $nameMapping.get("std::bool"),
                    optional: true,
                    setoftype: false,
                    variadic: false,
                },
                inc_upper: {
                    typeId: $nameMapping.get("std::bool"),
                    optional: true,
                    setoftype: false,
                    variadic: false,
                },
                empty: {
                    typeId: $nameMapping.get("std::bool"),
                    optional: true,
                    setoftype: false,
                    variadic: false,
                },
            },
            returnTypeId: $nameMapping.get("range<std::anypoint>"),
        },
    ]);
    return $expressionify({
        __kind__: ExpressionKind.Function,
        __element__: returnType,
        __cardinality__: cardinality,
        __name__: "std::range",
        __args__: positionalArgs,
        __namedargs__: namedArgs,
    });
}
export { range as $range };
//# sourceMappingURL=range.js.map