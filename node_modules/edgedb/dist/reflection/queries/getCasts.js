"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCasts = void 0;
const getTypes_1 = require("./getTypes");
const reachableFrom = (source, adj, seen = new Set()) => {
    const reachable = new Set();
    if (seen.has(source))
        return [];
    seen.add(source);
    (adj[source] || []).map(cast => {
        reachable.add(cast);
        for (const item of reachableFrom(cast, adj, seen)) {
            reachable.add(item);
        }
    });
    return [...reachable];
};
const getCasts = async (cxn, params) => {
    var _a, _b, _c, _d;
    var _e, _f, _g, _h;
    const allCastsRaw = await cxn.queryJSON(`WITH MODULE schema
        SELECT Cast {
            id,
            source := .from_type { id, name },
            target := .to_type { id, name },
            allow_assignment,
            allow_implicit,
        }
        FILTER .from_type IS ScalarType
        AND .to_type IS ScalarType
        # AND .from_type.is_abstract = false
        # AND .to_type.is_abstract = false
        `);
    const allCasts = JSON.parse(allCastsRaw);
    const types = new Set();
    const typesById = {};
    const castsById = {};
    const castsBySource = {};
    const implicitCastsBySource = {};
    const implicitCastsByTarget = {};
    const assignmentCastsBySource = {};
    const assignmentCastsByTarget = {};
    for (const cast of allCasts) {
        if (getTypes_1.typeMapping.has(cast.source.id) || getTypes_1.typeMapping.has(cast.target.id)) {
            cast.allow_implicit = false;
            cast.allow_assignment = false;
        }
        typesById[cast.source.id] = cast.source;
        typesById[cast.target.id] = cast.target;
        types.add(cast.source.id);
        types.add(cast.target.id);
        castsById[cast.id] = cast;
        castsBySource[cast.source.id] = castsBySource[cast.source.id] || [];
        castsBySource[cast.source.id].push(cast.target.id);
        if (cast.allow_assignment || cast.allow_implicit) {
            (_a = assignmentCastsBySource[_e = cast.source.id]) !== null && _a !== void 0 ? _a : (assignmentCastsBySource[_e] = []);
            assignmentCastsBySource[cast.source.id].push(cast.target.id);
            (_b = assignmentCastsByTarget[_f = cast.target.id]) !== null && _b !== void 0 ? _b : (assignmentCastsByTarget[_f] = []);
            assignmentCastsByTarget[cast.target.id].push(cast.source.id);
        }
        if (cast.allow_implicit) {
            (_c = implicitCastsBySource[_g = cast.source.id]) !== null && _c !== void 0 ? _c : (implicitCastsBySource[_g] = []);
            implicitCastsBySource[cast.source.id].push(cast.target.id);
            (_d = implicitCastsByTarget[_h = cast.target.id]) !== null && _d !== void 0 ? _d : (implicitCastsByTarget[_h] = []);
            implicitCastsByTarget[cast.target.id].push(cast.source.id);
        }
    }
    const castMap = {};
    const implicitCastMap = {};
    const implicitCastFromMap = {};
    const assignmentCastMap = {};
    const assignableByMap = {};
    for (const type of [...types]) {
        castMap[type] = castsBySource[type] || [];
        implicitCastMap[type] = reachableFrom(type, implicitCastsBySource);
        implicitCastFromMap[type] = reachableFrom(type, implicitCastsByTarget);
        assignmentCastMap[type] = reachableFrom(type, assignmentCastsBySource);
        assignableByMap[type] = reachableFrom(type, assignmentCastsByTarget);
    }
    if ((params === null || params === void 0 ? void 0 : params.debug) === true) {
        console.log(`\nIMPLICIT`);
        for (const [fromId, castArr] of Object.entries(implicitCastMap)) {
            console.log(`${typesById[fromId].name} implicitly castable to: [${castArr
                .map(id => typesById[id].name)
                .join(", ")}]`);
        }
        console.log("");
        for (const [fromId, castArr] of Object.entries(implicitCastFromMap)) {
            console.log(`${typesById[fromId].name} implicitly castable from: [${castArr
                .map(id => typesById[id].name)
                .join(", ")}]`);
        }
        console.log(`\nASSIGNABLE TO`);
        for (const [fromId, castArr] of Object.entries(assignmentCastMap)) {
            console.log(`${typesById[fromId].name} assignable to: [${castArr
                .map(id => typesById[id].name)
                .join(", ")}]`);
        }
        console.log(`\nASSIGNABLE BY`);
        for (const [fromId, castArr] of Object.entries(assignableByMap)) {
            console.log(`${typesById[fromId].name} assignable by: [${castArr
                .map(id => typesById[id].name)
                .join(", ")}]`);
        }
        console.log(`\nEXPLICIT`);
        for (const [fromId, castArr] of Object.entries(castMap)) {
            console.log(`${typesById[fromId].name} castable to: [${castArr
                .map(id => {
                return typesById[id].name;
            })
                .join(", ")}]`);
        }
    }
    return {
        castsById,
        typesById,
        castMap,
        implicitCastMap,
        implicitCastFromMap,
        assignmentCastMap,
        assignableByMap,
    };
};
exports.getCasts = getCasts;
