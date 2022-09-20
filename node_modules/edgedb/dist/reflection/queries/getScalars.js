"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getScalars = void 0;
const strictMap_1 = require("../strictMap");
const getScalars = async (cxn, _params) => {
    const scalarArray = await cxn.queryJSON(`with module schema
select InheritingObject {
  id,
  name,
  is_abstract,
  bases: { id, name },
  ancestors: { id, name },
  children := .<bases[IS Type] { id, name },
  descendants := .<ancestors[IS Type] { id, name }
}
FILTER
  InheritingObject IS ScalarType OR
  InheritingObject IS ObjectType;
`);
    const scalars = new strictMap_1.StrictMap();
    for (const type of JSON.parse(scalarArray)) {
        scalars.set(type.id, type);
    }
    return scalars;
};
exports.getScalars = getScalars;
