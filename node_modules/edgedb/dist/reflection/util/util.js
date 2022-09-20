"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.util = exports.genutil = exports.cardinalityUtil = void 0;
var cardinalityUtil_1 = require("./cardinalityUtil");
Object.defineProperty(exports, "cardinalityUtil", { enumerable: true, get: function () { return cardinalityUtil_1.cardinalityUtil; } });
exports.genutil = __importStar(require("./genutil"));
var util;
(function (util) {
    function assertNever(arg, error) {
        throw error !== null && error !== void 0 ? error : new Error(`${arg} is supposed to be of "never" type`);
    }
    util.assertNever = assertNever;
    util.deduplicate = (args) => [...new Set(args)];
    util.getFromArrayMap = (map, id) => {
        return map[id] || [];
    };
    util.defineProperty = (obj, name, def) => {
        return Object.defineProperty(obj, name, def);
    };
    util.defineGetter = (obj, name, getter) => {
        return Object.defineProperty(obj, name, {
            get: getter,
            enumerable: true,
        });
    };
    util.defineMethod = (obj, name, method) => {
        obj[name] = method.bind(obj);
        return obj;
    };
    function flatMap(array, callbackfn) {
        return Array.prototype.concat(...array.map(callbackfn));
    }
    util.flatMap = flatMap;
    function omitDollarPrefixed(object) {
        const obj = {};
        for (const key of Object.keys(object)) {
            if (!key.startsWith("$")) {
                obj[key] = object[key];
            }
        }
        return obj;
    }
    util.omitDollarPrefixed = omitDollarPrefixed;
})(util = exports.util || (exports.util = {}));
