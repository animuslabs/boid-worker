"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remainder = exports.lt = exports.gte = exports.bitand = exports.rshift = exports.mul = exports.div = exports.sub = exports.add = exports.make = exports.isBigInt = exports.plugJSBI = exports.hasNativeBigInt = void 0;
let JSBI = null;
exports.hasNativeBigInt = typeof BigInt !== "undefined";
function plugJSBI(jsbi) {
    JSBI = jsbi;
}
exports.plugJSBI = plugJSBI;
let _isBigInt;
let _make;
let _add;
let _div;
let _sub;
let _mul;
let _rshift;
let _bitand;
let _gte;
let _lt;
let _remainder;
if (exports.hasNativeBigInt) {
    _isBigInt = (val) => typeof val === "bigint";
    _make = (val) => BigInt(val);
    _add = (op1, op2) => (op1 + op2);
    _sub = (op1, op2) => (op1 - op2);
    _div = (op1, op2) => (op1 / op2);
    _mul = (op1, op2) => (op1 * op2);
    _rshift = (op1, op2) => (op1 >> op2);
    _bitand = (op1, op2) => (op1 & op2);
    _gte = (op1, op2) => op1 >= op2;
    _lt = (op1, op2) => op1 < op2;
    _remainder = (op1, op2) => (op1 % op2);
}
else {
    _isBigInt = (val) => {
        const j = ensureJSBI();
        return val instanceof j;
    };
    _make = (val) => {
        const j = ensureJSBI();
        return j.BigInt(val);
    };
    _add = (op1, op2) => {
        const j = ensureJSBI();
        return j.add(op1, op2);
    };
    _sub = (op1, op2) => {
        const j = ensureJSBI();
        return j.subtract(op1, op2);
    };
    _div = (op1, op2) => {
        const j = ensureJSBI();
        return j.divide(op1, op2);
    };
    _mul = (op1, op2) => {
        const j = ensureJSBI();
        return j.multiply(op1, op2);
    };
    _rshift = (op1, op2) => {
        const j = ensureJSBI();
        return j.signedRightShift(op1, op2);
    };
    _bitand = (op1, op2) => {
        const j = ensureJSBI();
        return j.bitwiseAnd(op1, op2);
    };
    _gte = (op1, op2) => {
        const j = ensureJSBI();
        return j.greaterThanOrEqual(op1, op2);
    };
    _lt = (op1, op2) => {
        const j = ensureJSBI();
        return j.lessThan(op1, op2);
    };
    _remainder = (op1, op2) => {
        const j = ensureJSBI();
        return j.remainder(op1, op2);
    };
}
function ensureJSBI() {
    if (JSBI == null) {
        throw new Error("JSBI library is required to polyfill BigInt");
    }
    return JSBI;
}
exports.isBigInt = _isBigInt;
exports.make = _make;
exports.add = _add;
exports.sub = _sub;
exports.div = _div;
exports.mul = _mul;
exports.rshift = _rshift;
exports.bitand = _bitand;
exports.gte = _gte;
exports.lt = _lt;
exports.remainder = _remainder;
