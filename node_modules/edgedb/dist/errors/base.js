"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeDBError = void 0;
class EdgeDBError extends Error {
    constructor() {
        super(...arguments);
        Object.defineProperty(this, "source", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
    }
    get name() {
        return this.constructor.name;
    }
    hasTag(tag) {
        var _a;
        const error_type = this.constructor;
        return Boolean((_a = error_type.tags) === null || _a === void 0 ? void 0 : _a[tag]);
    }
}
exports.EdgeDBError = EdgeDBError;
Object.defineProperty(EdgeDBError, "tags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {}
});
