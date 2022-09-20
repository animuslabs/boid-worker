"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperators = void 0;
const strictMap_1 = require("../strictMap");
const getFunctions_1 = require("./getFunctions");
const util_1 = require("../util/util");
const getOperators = async (cxn, _params) => {
    var _a, _b;
    const operatorsJson = await cxn.queryJSON(`
    with module schema
    select Operator {
      id,
      name,
      annotations: {
        name,
        @value
      } filter .name in {'std::identifier', 'std::description'},
      operator_kind,
      return_type: {id, name},
      return_typemod,
      params: {
        name,
        type: {id, name},
        kind,
        typemod,
      } order by @index,
    } filter not .internal and not .abstract
  `);
    const operators = new strictMap_1.StrictMap();
    const seenOpDefHashes = new Set();
    for (const op of JSON.parse(operatorsJson)) {
        const identifier = (_a = op.annotations.find((anno) => anno.name === "std::identifier")) === null || _a === void 0 ? void 0 : _a["@value"];
        if (!identifier) {
            continue;
        }
        const { mod } = util_1.genutil.splitName(op.name);
        const name = `${mod}::${identifier}`;
        if (!operators.has(name)) {
            operators.set(name, []);
        }
        const opDef = {
            ...op,
            name,
            kind: op.operator_kind,
            originalName: op.name,
            description: (_b = op.annotations.find((anno) => anno.name === "std::description")) === null || _b === void 0 ? void 0 : _b["@value"],
            annotations: undefined,
        };
        (0, getFunctions_1.replaceNumberTypes)(opDef);
        const hash = hashOpDef(opDef);
        if (!seenOpDefHashes.has(hash)) {
            operators.get(name).push(opDef);
            seenOpDefHashes.add(hash);
        }
    }
    return operators;
};
exports.getOperators = getOperators;
function hashOpDef(def) {
    return JSON.stringify({
        name: def.name,
        return_type: def.return_type.id,
        return_typemod: def.return_typemod,
        params: def.params
            .map(param => JSON.stringify({
            kind: param.kind,
            type: param.type.id,
            typemod: param.typemod,
            hasDefault: !!param.hasDefault,
        }))
            .sort(),
        operator_kind: def.operator_kind,
    });
}
