"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservedIdents = exports.joinFrags = exports.frag = exports.getRef = exports.makeValidIdent = exports.getInternalName = exports.displayName = exports.capitalize = exports.toTSObjectType = exports.toTSScalarType = exports.literalToScalarMapping = exports.scalarToLiteralMapping = exports.quote = exports.makePlainIdent = exports.toIdent = exports.splitName = void 0;
const util_1 = require("./util");
function splitName(name) {
    if (!name.includes("::"))
        throw new Error(`Invalid FQN ${name}`);
    return {
        mod: name.split("::")[0],
        name: name.split("::")[1],
    };
}
exports.splitName = splitName;
function toIdent(name) {
    if (name.includes("::")) {
        throw new Error(`toIdent: invalid name ${name}`);
    }
    return name.replace(/([^a-zA-Z0-9_]+)/g, "_");
}
exports.toIdent = toIdent;
const makePlainIdent = (name) => {
    if (exports.reservedIdents.has(name)) {
        return `$${name}`;
    }
    const replaced = name.replace(/[^A-Za-z0-9_]/g, match => "0x" + match.codePointAt(0).toString(16));
    return replaced !== name ? `$${replaced}` : name;
};
exports.makePlainIdent = makePlainIdent;
function quote(val) {
    return JSON.stringify(val.toString());
}
exports.quote = quote;
exports.scalarToLiteralMapping = {
    "std::int16": { type: "number" },
    "std::int32": { type: "number" },
    "std::int64": { type: "number", extraTypes: ["string"] },
    "std::float32": { type: "number" },
    "std::float64": { type: "number" },
    "std::number": {
        type: "number",
        literalKind: "typeof",
        extraTypes: ["string"],
    },
    "std::str": { type: "string", literalKind: "typeof" },
    "std::uuid": { type: "string" },
    "std::json": { type: "unknown" },
    "std::bool": { type: "boolean", literalKind: "typeof" },
    "std::bigint": { type: "bigint", literalKind: "typeof" },
    "std::bytes": { type: "Buffer", literalKind: "instanceof" },
    "std::datetime": {
        type: "Date",
        literalKind: "instanceof",
        extraTypes: ["string"],
    },
    "std::duration": {
        type: "edgedb.Duration",
        literalKind: "instanceof",
        extraTypes: ["string"],
    },
    "cal::local_datetime": {
        type: "edgedb.LocalDateTime",
        literalKind: "instanceof",
        extraTypes: ["string"],
    },
    "cal::local_date": {
        type: "edgedb.LocalDate",
        literalKind: "instanceof",
        extraTypes: ["string"],
    },
    "cal::local_time": {
        type: "edgedb.LocalTime",
        literalKind: "instanceof",
        extraTypes: ["string"],
    },
    "cal::relative_duration": {
        type: "edgedb.RelativeDuration",
        literalKind: "instanceof",
        extraTypes: ["string"],
    },
    "cal::date_duration": {
        type: "edgedb.DateDuration",
        literalKind: "instanceof",
        extraTypes: ["string"],
    },
    "cfg::memory": {
        type: "edgedb.ConfigMemory",
        literalKind: "instanceof",
        extraTypes: ["string"],
    },
};
exports.literalToScalarMapping = {};
for (const [scalarType, { type, literalKind }] of Object.entries(exports.scalarToLiteralMapping)) {
    if (literalKind) {
        if (exports.literalToScalarMapping[type]) {
            throw new Error(`literal type '${type}' cannot be mapped to multiple scalar types`);
        }
        exports.literalToScalarMapping[type] = { type: scalarType, literalKind };
    }
}
function toTSScalarType(type, types, opts = {
    edgedbDatatypePrefix: "_.",
}) {
    var _a, _b;
    switch (type.kind) {
        case "scalar": {
            if (type.enum_values && type.enum_values.length) {
                if (opts.getEnumRef) {
                    return [opts.getEnumRef(type)];
                }
                return [getRef(type.name, { prefix: "" })];
            }
            if (type.material_id) {
                return toTSScalarType(types.get(type.material_id), types, opts);
            }
            const literalType = (_b = (_a = exports.scalarToLiteralMapping[type.name]) === null || _a === void 0 ? void 0 : _a.type) !== null && _b !== void 0 ? _b : "unknown";
            return [
                (literalType.startsWith("edgedb.") ? opts.edgedbDatatypePrefix : "") +
                    literalType,
            ];
        }
        case "array": {
            const tn = toTSScalarType(types.get(type.array_element_id), types, opts);
            return frag `${tn}[]`;
        }
        case "tuple": {
            if (!type.tuple_elements.length) {
                return ["[]"];
            }
            if (type.tuple_elements[0].name &&
                Number.isNaN(parseInt(type.tuple_elements[0].name, 10))) {
                const res = [];
                for (const { name, target_id } of type.tuple_elements) {
                    const tn = toTSScalarType(types.get(target_id), types, opts);
                    res.push(frag `${name}: ${tn}`);
                }
                return frag `{${joinFrags(res, ", ")}}`;
            }
            else {
                const res = [];
                for (const { target_id } of type.tuple_elements) {
                    const tn = toTSScalarType(types.get(target_id), types, opts);
                    res.push(tn);
                }
                return frag `[${joinFrags(res, ", ")}]`;
            }
        }
        case "range": {
            const tn = toTSScalarType(types.get(type.range_element_id), types, opts);
            return frag `${opts.edgedbDatatypePrefix}edgedb.Range<${tn}>`;
        }
        default:
            util_1.util.assertNever(type);
    }
}
exports.toTSScalarType = toTSScalarType;
function toTSObjectType(type, types, currentMod, code, level = 0) {
    if (type.intersection_of && type.intersection_of.length) {
        const res = [];
        for (const { id: subId } of type.intersection_of) {
            const sub = types.get(subId);
            res.push(toTSObjectType(sub, types, currentMod, code, level + 1));
        }
        const ret = joinFrags(res, " & ");
        return level > 0 ? frag `(${ret})` : ret;
    }
    if (type.union_of && type.union_of.length) {
        const res = [];
        for (const { id: subId } of type.union_of) {
            const sub = types.get(subId);
            res.push(toTSObjectType(sub, types, currentMod, code, level + 1));
        }
        const ret = joinFrags(res, " | ");
        return level > 0 ? frag `(${ret})` : ret;
    }
    return [getRef(type.name, { prefix: "" })];
}
exports.toTSObjectType = toTSObjectType;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
exports.capitalize = capitalize;
function displayName(str) {
    const { name } = splitName(str);
    const stripped = "$" +
        name
            .replace(/[^$0-9a-zA-Z]/g, " ")
            .split(" ")
            .filter(x => !!x)
            .map(capitalize)
            .join("");
    return stripped;
}
exports.displayName = displayName;
function getInternalName({ fqn, id }) {
    const { name } = splitName(fqn);
    return makeValidIdent({ id, name });
}
exports.getInternalName = getInternalName;
function makeValidIdent({ id, name, skipKeywordCheck, }) {
    let strippedName = name.replace(/^_|[^A-Za-z0-9_]/g, "");
    if (strippedName !== name ||
        (!skipKeywordCheck && exports.reservedIdents.has(strippedName))) {
        strippedName += `_${id.toLowerCase().replace(/[^0-9a-f]/g, "")}`;
    }
    return strippedName;
}
exports.makeValidIdent = makeValidIdent;
function getRef(name, opts) {
    var _a;
    return {
        type: "identRef",
        name,
        opts: {
            prefix: (_a = opts === null || opts === void 0 ? void 0 : opts.prefix) !== null && _a !== void 0 ? _a : "$",
        },
    };
}
exports.getRef = getRef;
function frag(strings, ...exprs) {
    const frags = [];
    for (let i = 0; i < strings.length; i++) {
        frags.push(strings[i]);
        if (exprs[i]) {
            if (Array.isArray(exprs[i])) {
                frags.push(...exprs[i]);
            }
            else {
                frags.push(exprs[i]);
            }
        }
    }
    return frags;
}
exports.frag = frag;
function joinFrags(frags, sep) {
    const joined = [];
    for (const fragment of frags) {
        joined.push(...(Array.isArray(fragment) ? fragment : [fragment]), sep);
    }
    return joined.slice(0, -1);
}
exports.joinFrags = joinFrags;
exports.reservedIdents = new Set([
    "do",
    "if",
    "in",
    "for",
    "let",
    "new",
    "try",
    "var",
    "case",
    "else",
    "enum",
    "eval",
    "null",
    "this",
    "true",
    "void",
    "with",
    "await",
    "break",
    "catch",
    "class",
    "const",
    "false",
    "super",
    "throw",
    "while",
    "yield",
    "delete",
    "export",
    "import",
    "public",
    "return",
    "static",
    "switch",
    "typeof",
    "default",
    "extends",
    "finally",
    "package",
    "private",
    "continue",
    "debugger",
    "function",
    "arguments",
    "interface",
    "protected",
    "implements",
    "instanceof",
    "Object",
]);
