"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceNumberTypes = exports.getFunctions = void 0;
const strictMap_1 = require("../strictMap");
const getTypes_1 = require("./getTypes");
const getFunctions = async (cxn, _params) => {
    var _a;
    const functionsJson = await cxn.queryJSON(`
    with module schema
    select Function {
      id,
      name,
      annotations: {
        name,
        @value
      } filter .name = 'std::description',
      return_type: {id, name},
      return_typemod,
      params: {
        name,
        type: {id, name},
        kind,
        typemod,
        hasDefault := exists .default,
      } order by @index,
      preserves_optionality,
    } filter .internal = false
  `);
    const functions = new strictMap_1.StrictMap();
    const seenFuncDefHashes = new Set();
    for (const func of JSON.parse(functionsJson)) {
        const { name } = func;
        if (!functions.has(name)) {
            functions.set(name, []);
        }
        const funcDef = {
            ...func,
            description: (_a = func.annotations[0]) === null || _a === void 0 ? void 0 : _a["@value"],
        };
        replaceNumberTypes(funcDef);
        const hash = hashFuncDef(funcDef);
        if (!seenFuncDefHashes.has(hash)) {
            functions.get(name).push(funcDef);
            seenFuncDefHashes.add(hash);
        }
    }
    return functions;
};
exports.getFunctions = getFunctions;
function replaceNumberTypes(def) {
    if (getTypes_1.typeMapping.has(def.return_type.id)) {
        const type = getTypes_1.typeMapping.get(def.return_type.id);
        def.return_type = {
            id: type.id,
            name: type.name,
        };
    }
    for (const param of def.params) {
        if (getTypes_1.typeMapping.has(param.type.id)) {
            const type = getTypes_1.typeMapping.get(param.type.id);
            param.type = {
                id: type.id,
                name: type.name,
            };
        }
    }
}
exports.replaceNumberTypes = replaceNumberTypes;
function hashFuncDef(def) {
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
        preserves_optionality: def.preserves_optionality,
    });
}
