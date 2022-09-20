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
exports.errorMapping = void 0;
const errors = __importStar(require("./index"));
exports.errorMapping = new Map();
exports.errorMapping.set(16777216, errors.InternalServerError);
exports.errorMapping.set(33554432, errors.UnsupportedFeatureError);
exports.errorMapping.set(50331648, errors.ProtocolError);
exports.errorMapping.set(50397184, errors.BinaryProtocolError);
exports.errorMapping.set(50397185, errors.UnsupportedProtocolVersionError);
exports.errorMapping.set(50397186, errors.TypeSpecNotFoundError);
exports.errorMapping.set(50397187, errors.UnexpectedMessageError);
exports.errorMapping.set(50462720, errors.InputDataError);
exports.errorMapping.set(50462976, errors.ParameterTypeMismatchError);
exports.errorMapping.set(50463232, errors.StateMismatchError);
exports.errorMapping.set(50528256, errors.ResultCardinalityMismatchError);
exports.errorMapping.set(50593792, errors.CapabilityError);
exports.errorMapping.set(50594048, errors.UnsupportedCapabilityError);
exports.errorMapping.set(50594304, errors.DisabledCapabilityError);
exports.errorMapping.set(67108864, errors.QueryError);
exports.errorMapping.set(67174400, errors.InvalidSyntaxError);
exports.errorMapping.set(67174656, errors.EdgeQLSyntaxError);
exports.errorMapping.set(67174912, errors.SchemaSyntaxError);
exports.errorMapping.set(67175168, errors.GraphQLSyntaxError);
exports.errorMapping.set(67239936, errors.InvalidTypeError);
exports.errorMapping.set(67240192, errors.InvalidTargetError);
exports.errorMapping.set(67240193, errors.InvalidLinkTargetError);
exports.errorMapping.set(67240194, errors.InvalidPropertyTargetError);
exports.errorMapping.set(67305472, errors.InvalidReferenceError);
exports.errorMapping.set(67305473, errors.UnknownModuleError);
exports.errorMapping.set(67305474, errors.UnknownLinkError);
exports.errorMapping.set(67305475, errors.UnknownPropertyError);
exports.errorMapping.set(67305476, errors.UnknownUserError);
exports.errorMapping.set(67305477, errors.UnknownDatabaseError);
exports.errorMapping.set(67305478, errors.UnknownParameterError);
exports.errorMapping.set(67371008, errors.SchemaError);
exports.errorMapping.set(67436544, errors.SchemaDefinitionError);
exports.errorMapping.set(67436800, errors.InvalidDefinitionError);
exports.errorMapping.set(67436801, errors.InvalidModuleDefinitionError);
exports.errorMapping.set(67436802, errors.InvalidLinkDefinitionError);
exports.errorMapping.set(67436803, errors.InvalidPropertyDefinitionError);
exports.errorMapping.set(67436804, errors.InvalidUserDefinitionError);
exports.errorMapping.set(67436805, errors.InvalidDatabaseDefinitionError);
exports.errorMapping.set(67436806, errors.InvalidOperatorDefinitionError);
exports.errorMapping.set(67436807, errors.InvalidAliasDefinitionError);
exports.errorMapping.set(67436808, errors.InvalidFunctionDefinitionError);
exports.errorMapping.set(67436809, errors.InvalidConstraintDefinitionError);
exports.errorMapping.set(67436810, errors.InvalidCastDefinitionError);
exports.errorMapping.set(67437056, errors.DuplicateDefinitionError);
exports.errorMapping.set(67437057, errors.DuplicateModuleDefinitionError);
exports.errorMapping.set(67437058, errors.DuplicateLinkDefinitionError);
exports.errorMapping.set(67437059, errors.DuplicatePropertyDefinitionError);
exports.errorMapping.set(67437060, errors.DuplicateUserDefinitionError);
exports.errorMapping.set(67437061, errors.DuplicateDatabaseDefinitionError);
exports.errorMapping.set(67437062, errors.DuplicateOperatorDefinitionError);
exports.errorMapping.set(67437063, errors.DuplicateViewDefinitionError);
exports.errorMapping.set(67437064, errors.DuplicateFunctionDefinitionError);
exports.errorMapping.set(67437065, errors.DuplicateConstraintDefinitionError);
exports.errorMapping.set(67437066, errors.DuplicateCastDefinitionError);
exports.errorMapping.set(67502080, errors.SessionTimeoutError);
exports.errorMapping.set(67502336, errors.IdleSessionTimeoutError);
exports.errorMapping.set(67502592, errors.QueryTimeoutError);
exports.errorMapping.set(67504640, errors.TransactionTimeoutError);
exports.errorMapping.set(67504641, errors.IdleTransactionTimeoutError);
exports.errorMapping.set(83886080, errors.ExecutionError);
exports.errorMapping.set(83951616, errors.InvalidValueError);
exports.errorMapping.set(83951617, errors.DivisionByZeroError);
exports.errorMapping.set(83951618, errors.NumericOutOfRangeError);
exports.errorMapping.set(83951619, errors.AccessPolicyError);
exports.errorMapping.set(84017152, errors.IntegrityError);
exports.errorMapping.set(84017153, errors.ConstraintViolationError);
exports.errorMapping.set(84017154, errors.CardinalityViolationError);
exports.errorMapping.set(84017155, errors.MissingRequiredError);
exports.errorMapping.set(84082688, errors.TransactionError);
exports.errorMapping.set(84082944, errors.TransactionConflictError);
exports.errorMapping.set(84082945, errors.TransactionSerializationError);
exports.errorMapping.set(84082946, errors.TransactionDeadlockError);
exports.errorMapping.set(100663296, errors.ConfigurationError);
exports.errorMapping.set(117440512, errors.AccessError);
exports.errorMapping.set(117506048, errors.AuthenticationError);
exports.errorMapping.set(134217728, errors.AvailabilityError);
exports.errorMapping.set(134217729, errors.BackendUnavailableError);
exports.errorMapping.set(150994944, errors.BackendError);
exports.errorMapping.set(150995200, errors.UnsupportedBackendFeatureError);
exports.errorMapping.set(4026531840, errors.LogMessage);
exports.errorMapping.set(4026597376, errors.WarningMessage);
exports.errorMapping.set(4278190080, errors.ClientError);
exports.errorMapping.set(4278255616, errors.ClientConnectionError);
exports.errorMapping.set(4278255872, errors.ClientConnectionFailedError);
exports.errorMapping.set(4278255873, errors.ClientConnectionFailedTemporarilyError);
exports.errorMapping.set(4278256128, errors.ClientConnectionTimeoutError);
exports.errorMapping.set(4278256384, errors.ClientConnectionClosedError);
exports.errorMapping.set(4278321152, errors.InterfaceError);
exports.errorMapping.set(4278321408, errors.QueryArgumentError);
exports.errorMapping.set(4278321409, errors.MissingArgumentError);
exports.errorMapping.set(4278321410, errors.UnknownArgumentError);
exports.errorMapping.set(4278321411, errors.InvalidArgumentError);
exports.errorMapping.set(4278386688, errors.NoDataError);
exports.errorMapping.set(4278452224, errors.InternalClientError);
