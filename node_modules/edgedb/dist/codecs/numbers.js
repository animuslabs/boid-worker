"use strict";
/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2019-present MagicStack Inc. and the EdgeDB authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
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
exports.Float64Codec = exports.Float32Codec = exports.Int16Codec = exports.Int32Codec = exports.Int64BigintCodec = exports.Int64Codec = void 0;
const bi = __importStar(require("../primitives/bigint"));
const ifaces_1 = require("./ifaces");
const errors_1 = require("../errors");
class Int64Codec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (typeof object !== "number") {
            throw new errors_1.InvalidArgumentError(`a number was expected, got "${object}"`);
        }
        buf.writeInt32(8);
        buf.writeInt64(object);
    }
    decode(buf) {
        return buf.readInt64();
    }
}
exports.Int64Codec = Int64Codec;
class Int64BigintCodec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (!bi.isBigInt(object)) {
            throw new errors_1.InvalidArgumentError(`a bigint was expected, got "${object}"`);
        }
        buf.writeInt32(8);
        buf.writeBigInt64(object);
    }
    decode(buf) {
        return buf.readBigInt64();
    }
}
exports.Int64BigintCodec = Int64BigintCodec;
class Int32Codec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (typeof object !== "number") {
            throw new errors_1.InvalidArgumentError(`a number was expected, got "${object}"`);
        }
        buf.writeInt32(4);
        buf.writeInt32(object);
    }
    decode(buf) {
        return buf.readInt32();
    }
}
exports.Int32Codec = Int32Codec;
class Int16Codec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (typeof object !== "number") {
            throw new errors_1.InvalidArgumentError(`a number was expected, got "${object}"`);
        }
        buf.writeInt32(2);
        buf.writeInt16(object);
    }
    decode(buf) {
        return buf.readInt16();
    }
}
exports.Int16Codec = Int16Codec;
class Float32Codec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (typeof object !== "number") {
            throw new errors_1.InvalidArgumentError(`a number was expected, got "${object}"`);
        }
        buf.writeInt32(4);
        buf.writeFloat32(object);
    }
    decode(buf) {
        return buf.readFloat32();
    }
}
exports.Float32Codec = Float32Codec;
class Float64Codec extends ifaces_1.ScalarCodec {
    encode(buf, object) {
        if (typeof object !== "number") {
            throw new errors_1.InvalidArgumentError(`a number was expected, got "${object}"`);
        }
        buf.writeInt32(8);
        buf.writeFloat64(object);
    }
    decode(buf) {
        return buf.readFloat64();
    }
}
exports.Float64Codec = Float64Codec;
