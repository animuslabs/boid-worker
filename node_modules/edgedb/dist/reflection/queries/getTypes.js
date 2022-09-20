"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.topoSort = exports.getTypes = exports.typeMapping = void 0;
const strictMap_1 = require("../strictMap");
const numberType = {
    id: "00000000-0000-0000-0000-0000000001ff",
    name: "std::number",
    is_abstract: false,
    is_seq: false,
    kind: "scalar",
    enum_values: null,
    material_id: null,
    bases: [],
};
exports.typeMapping = new Map([
    [
        "00000000-0000-0000-0000-000000000103",
        numberType,
    ],
    [
        "00000000-0000-0000-0000-000000000104",
        numberType,
    ],
    [
        "00000000-0000-0000-0000-000000000105",
        numberType,
    ],
    [
        "00000000-0000-0000-0000-000000000106",
        numberType,
    ],
    [
        "00000000-0000-0000-0000-000000000107",
        numberType,
    ],
]);
async function getTypes(cxn, params) {
    var _a, _b;
    const v2Plus = params.version.major >= 2;
    const QUERY = `
    WITH
      MODULE schema,

      material_scalars := (
        SELECT ScalarType
        FILTER
          (.name LIKE 'std::%' OR .name LIKE 'cal::%')
          AND NOT .is_abstract
      )

    SELECT Type {
      id,
      name,
      is_abstract := .abstract,

      kind := 'object' IF Type IS ObjectType ELSE
              'scalar' IF Type IS ScalarType ELSE
              'array' IF Type IS Array ELSE
              'tuple' IF Type IS Tuple ELSE
              ${v2Plus ? `'range' IF Type IS Range ELSE` : ``}
              'unknown',

      [IS ScalarType].enum_values,
      is_seq := 'std::sequence' in [IS ScalarType].ancestors.name,
      # for sequence (abstract type that has non-abstract ancestor)
      single material_id := (
        SELECT x := Type[IS ScalarType].ancestors
        FILTER x IN material_scalars
        LIMIT 1
      ).id,

      [IS InheritingObject].bases: {
        id
      } ORDER BY @index ASC,

      [IS ObjectType].union_of,
      [IS ObjectType].intersection_of,
      [IS ObjectType].pointers: {
        real_cardinality := ("One" IF .required ELSE "AtMostOne") IF <str>.cardinality = "One" ELSE ("AtLeastOne" IF .required ELSE "Many"),
        name,
        target_id := .target.id,
        kind := 'link' IF .__type__.name = 'schema::Link' ELSE 'property',
        is_exclusive := exists (select .constraints filter .name = 'std::exclusive'),
        is_computed := len(.computed_fields) != 0,
        is_readonly := .readonly,
        has_default := EXISTS .default or ("std::sequence" in .target[IS ScalarType].ancestors.name),
        [IS Link].pointers: {
          real_cardinality := ("One" IF .required ELSE "AtMostOne") IF <str>.cardinality = "One" ELSE ("AtLeastOne" IF .required ELSE "Many"),
          name := '@' ++ .name,
          target_id := .target.id,
          kind := 'link' IF .__type__.name = 'schema::Link' ELSE 'property',
          is_computed := len(.computed_fields) != 0,
          is_readonly := .readonly
        } filter .name != '@source' and .name != '@target',
      } FILTER @is_owned,
      backlinks := (SELECT DETACHED Link FILTER .target = Type) {
        real_cardinality := "AtMostOne"
          IF
          EXISTS (select .constraints filter .name = 'std::exclusive')
          ELSE
          "Many",
        name := '<' ++ .name ++ '[is ' ++ std::assert_exists(
          .source.name if .source.name[:9] != 'default::' else .source.name[9:]
        ) ++ ']',
        stub := .name,
        target_id := .source.id,
        kind := 'link',
        is_exclusive := (EXISTS (select .constraints filter .name = 'std::exclusive')) AND <str>.cardinality = "One",
      },
      backlink_stubs := array_agg((
        WITH
          stubs := DISTINCT (SELECT DETACHED Link FILTER .target = Type).name,
          baseObjectId := (SELECT DETACHED ObjectType FILTER .name = 'std::BaseObject' LIMIT 1).id
        FOR stub in { stubs }
        UNION (
          SELECT {
            real_cardinality := "Many",
            name := '<' ++ stub,
            target_id := baseObjectId,
            kind := 'link',
            is_exclusive := false,
          }
        )
      )),
      array_element_id := [IS Array].element_type.id,

      tuple_elements := (SELECT [IS Tuple].element_types {
        target_id := .type.id,
        name
      } ORDER BY @index ASC),
      ${v2Plus ? `range_element_id := [IS Range].element_type.id,` : ``}
    }
    ORDER BY .name;
  `;
    const types = JSON.parse(await cxn.queryJSON(QUERY));
    if (params === null || params === void 0 ? void 0 : params.debug)
        console.log(JSON.stringify(types, null, 2));
    for (const type of types) {
        switch (type.kind) {
            case "scalar":
                if (exports.typeMapping.has(type.id)) {
                    type.castType = exports.typeMapping.get(type.id).id;
                }
                if (type.is_seq) {
                    type.castType = numberType.id;
                }
                break;
            case "range":
                type.range_element_id =
                    (_b = (_a = exports.typeMapping.get(type.range_element_id)) === null || _a === void 0 ? void 0 : _a.id) !== null && _b !== void 0 ? _b : type.range_element_id;
                break;
            case "array":
                break;
            case "tuple":
                break;
            case "object":
                break;
        }
    }
    types.push(numberType);
    return topoSort(types);
}
exports.getTypes = getTypes;
function topoSort(types) {
    const graph = new strictMap_1.StrictMap();
    const adj = new strictMap_1.StrictMap();
    for (const type of types) {
        graph.set(type.id, type);
    }
    for (const type of types) {
        if (type.kind !== "object" && type.kind !== "scalar") {
            continue;
        }
        for (const { id: base } of type.bases) {
            if (!graph.has(base)) {
                throw new Error(`reference to an unknown object type: ${base}`);
            }
            if (!adj.has(type.id)) {
                adj.set(type.id, new Set());
            }
            adj.get(type.id).add(base);
        }
    }
    const visiting = new Set();
    const visited = new Set();
    const sorted = new strictMap_1.StrictMap();
    const visit = (type) => {
        if (visiting.has(type.name)) {
            const last = Array.from(visiting).slice(1, 2);
            throw new Error(`dependency cycle between ${type.name} and ${last}`);
        }
        if (!visited.has(type.id)) {
            visiting.add(type.name);
            if (adj.has(type.id)) {
                for (const adjId of adj.get(type.id).values()) {
                    visit(graph.get(adjId));
                }
            }
            sorted.set(type.id, type);
            visited.add(type.id);
            visiting.delete(type.name);
        }
    };
    for (const type of types) {
        visit(type);
    }
    return sorted;
}
exports.topoSort = topoSort;
