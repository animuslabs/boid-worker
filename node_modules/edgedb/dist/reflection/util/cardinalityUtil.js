"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cardinalityUtil = void 0;
const enums_1 = require("../enums");
var cardinalityUtil;
(function (cardinalityUtil) {
    function multiplyCardinalities(c1, c2) {
        if (c1 === enums_1.Cardinality.Empty)
            return enums_1.Cardinality.Empty;
        if (c1 === enums_1.Cardinality.One)
            return c2;
        if (c1 === enums_1.Cardinality.AtMostOne) {
            if (c2 === enums_1.Cardinality.One)
                return enums_1.Cardinality.AtMostOne;
            if (c2 === enums_1.Cardinality.AtLeastOne)
                return enums_1.Cardinality.Many;
            return c2;
        }
        if (c1 === enums_1.Cardinality.Many) {
            if (c2 === enums_1.Cardinality.Empty)
                return enums_1.Cardinality.Empty;
            return enums_1.Cardinality.Many;
        }
        if (c1 === enums_1.Cardinality.AtLeastOne) {
            if (c2 === enums_1.Cardinality.AtMostOne)
                return enums_1.Cardinality.Many;
            if (c2 === enums_1.Cardinality.One)
                return enums_1.Cardinality.AtLeastOne;
            return c2;
        }
        throw new Error(`Invalid Cardinality ${c1}`);
    }
    cardinalityUtil.multiplyCardinalities = multiplyCardinalities;
    function multiplyCardinalitiesVariadic(cards) {
        if (cards.length === 0)
            throw new Error("Empty tuple not allowed");
        if (cards.length === 1)
            return cards[0];
        return cards.reduce((product, card) => multiplyCardinalities(product, card), enums_1.Cardinality.One);
    }
    cardinalityUtil.multiplyCardinalitiesVariadic = multiplyCardinalitiesVariadic;
    function mergeCardinalities(a, b) {
        if (a === enums_1.Cardinality.Empty)
            return b;
        if (b === enums_1.Cardinality.Empty)
            return a;
        if (a === enums_1.Cardinality.AtLeastOne)
            return enums_1.Cardinality.AtLeastOne;
        if (b === enums_1.Cardinality.AtLeastOne)
            return enums_1.Cardinality.AtLeastOne;
        if (a === enums_1.Cardinality.One)
            return enums_1.Cardinality.AtLeastOne;
        if (b === enums_1.Cardinality.One)
            return enums_1.Cardinality.AtLeastOne;
        return enums_1.Cardinality.Many;
    }
    cardinalityUtil.mergeCardinalities = mergeCardinalities;
    function mergeCardinalitiesVariadic(cards) {
        if (cards.length === 0)
            throw new Error("Empty tuple not allowed");
        if (cards.length === 1)
            return cards[0];
        const [first, second, ...rest] = cards;
        if (cards.length === 2)
            return mergeCardinalities(first, second);
        return mergeCardinalitiesVariadic([
            mergeCardinalities(first, second),
            ...rest,
        ]);
    }
    cardinalityUtil.mergeCardinalitiesVariadic = mergeCardinalitiesVariadic;
    function orCardinalities(c1, c2) {
        if (c1 === c2 || c1 === enums_1.Cardinality.Many)
            return c1;
        if (c1 === enums_1.Cardinality.AtLeastOne) {
            if (c2 === enums_1.Cardinality.One)
                return enums_1.Cardinality.AtLeastOne;
            return enums_1.Cardinality.Many;
        }
        if (c1 === enums_1.Cardinality.AtMostOne) {
            if (c2 === enums_1.Cardinality.Many || c2 === enums_1.Cardinality.AtLeastOne) {
                return enums_1.Cardinality.Many;
            }
            return c1;
        }
        if (c1 === enums_1.Cardinality.Empty) {
            if (c2 === enums_1.Cardinality.AtMostOne || c2 === enums_1.Cardinality.One) {
                return enums_1.Cardinality.AtMostOne;
            }
            return enums_1.Cardinality.Many;
        }
        if (c2 === enums_1.Cardinality.Empty)
            return enums_1.Cardinality.AtMostOne;
        return c2;
    }
    cardinalityUtil.orCardinalities = orCardinalities;
    function overrideLowerBound(card, override) {
        if (override === "One") {
            if (card === enums_1.Cardinality.Many || card === enums_1.Cardinality.AtLeastOne) {
                return enums_1.Cardinality.AtLeastOne;
            }
            else {
                return enums_1.Cardinality.One;
            }
        }
        else {
            if (card === enums_1.Cardinality.Many || card === enums_1.Cardinality.AtLeastOne) {
                return enums_1.Cardinality.Many;
            }
            else if (card === enums_1.Cardinality.Empty) {
                return enums_1.Cardinality.Empty;
            }
            else {
                return enums_1.Cardinality.AtMostOne;
            }
        }
    }
    cardinalityUtil.overrideLowerBound = overrideLowerBound;
    function overrideUpperBound(card, override) {
        if (override === "One") {
            if (card === enums_1.Cardinality.One || card === enums_1.Cardinality.AtLeastOne) {
                return enums_1.Cardinality.One;
            }
            else {
                return enums_1.Cardinality.AtMostOne;
            }
        }
        else {
            if (card === enums_1.Cardinality.One || card === enums_1.Cardinality.AtLeastOne) {
                return enums_1.Cardinality.AtLeastOne;
            }
            else {
                return enums_1.Cardinality.Many;
            }
        }
    }
    cardinalityUtil.overrideUpperBound = overrideUpperBound;
})(cardinalityUtil = exports.cardinalityUtil || (exports.cardinalityUtil = {}));
