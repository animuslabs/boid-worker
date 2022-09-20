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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DuplicateDatabaseDefinitionError = exports.DuplicateUserDefinitionError = exports.DuplicatePropertyDefinitionError = exports.DuplicateLinkDefinitionError = exports.DuplicateModuleDefinitionError = exports.DuplicateDefinitionError = exports.InvalidCastDefinitionError = exports.InvalidConstraintDefinitionError = exports.InvalidFunctionDefinitionError = exports.InvalidAliasDefinitionError = exports.InvalidOperatorDefinitionError = exports.InvalidDatabaseDefinitionError = exports.InvalidUserDefinitionError = exports.InvalidPropertyDefinitionError = exports.InvalidLinkDefinitionError = exports.InvalidModuleDefinitionError = exports.InvalidDefinitionError = exports.SchemaDefinitionError = exports.SchemaError = exports.UnknownParameterError = exports.UnknownDatabaseError = exports.UnknownUserError = exports.UnknownPropertyError = exports.UnknownLinkError = exports.UnknownModuleError = exports.InvalidReferenceError = exports.InvalidPropertyTargetError = exports.InvalidLinkTargetError = exports.InvalidTargetError = exports.InvalidTypeError = exports.GraphQLSyntaxError = exports.SchemaSyntaxError = exports.EdgeQLSyntaxError = exports.InvalidSyntaxError = exports.QueryError = exports.DisabledCapabilityError = exports.UnsupportedCapabilityError = exports.CapabilityError = exports.ResultCardinalityMismatchError = exports.StateMismatchError = exports.ParameterTypeMismatchError = exports.InputDataError = exports.UnexpectedMessageError = exports.TypeSpecNotFoundError = exports.UnsupportedProtocolVersionError = exports.BinaryProtocolError = exports.ProtocolError = exports.UnsupportedFeatureError = exports.InternalServerError = exports.EdgeDBError = void 0;
exports.InternalClientError = exports.NoDataError = exports.InvalidArgumentError = exports.UnknownArgumentError = exports.MissingArgumentError = exports.QueryArgumentError = exports.InterfaceError = exports.ClientConnectionClosedError = exports.ClientConnectionTimeoutError = exports.ClientConnectionFailedTemporarilyError = exports.ClientConnectionFailedError = exports.ClientConnectionError = exports.ClientError = exports.WarningMessage = exports.LogMessage = exports.UnsupportedBackendFeatureError = exports.BackendError = exports.BackendUnavailableError = exports.AvailabilityError = exports.AuthenticationError = exports.AccessError = exports.ConfigurationError = exports.TransactionDeadlockError = exports.TransactionSerializationError = exports.TransactionConflictError = exports.TransactionError = exports.MissingRequiredError = exports.CardinalityViolationError = exports.ConstraintViolationError = exports.IntegrityError = exports.AccessPolicyError = exports.NumericOutOfRangeError = exports.DivisionByZeroError = exports.InvalidValueError = exports.ExecutionError = exports.IdleTransactionTimeoutError = exports.TransactionTimeoutError = exports.QueryTimeoutError = exports.IdleSessionTimeoutError = exports.SessionTimeoutError = exports.DuplicateCastDefinitionError = exports.DuplicateConstraintDefinitionError = exports.DuplicateFunctionDefinitionError = exports.DuplicateViewDefinitionError = exports.DuplicateOperatorDefinitionError = void 0;
const base_1 = require("./base");
const tags = __importStar(require("./tags"));
var base_2 = require("./base");
Object.defineProperty(exports, "EdgeDBError", { enumerable: true, get: function () { return base_2.EdgeDBError; } });
__exportStar(require("./tags"), exports);
class InternalServerError extends base_1.EdgeDBError {
    get code() {
        return 16777216;
    }
}
exports.InternalServerError = InternalServerError;
class UnsupportedFeatureError extends base_1.EdgeDBError {
    get code() {
        return 33554432;
    }
}
exports.UnsupportedFeatureError = UnsupportedFeatureError;
class ProtocolError extends base_1.EdgeDBError {
    get code() {
        return 50331648;
    }
}
exports.ProtocolError = ProtocolError;
class BinaryProtocolError extends ProtocolError {
    get code() {
        return 50397184;
    }
}
exports.BinaryProtocolError = BinaryProtocolError;
class UnsupportedProtocolVersionError extends BinaryProtocolError {
    get code() {
        return 50397185;
    }
}
exports.UnsupportedProtocolVersionError = UnsupportedProtocolVersionError;
class TypeSpecNotFoundError extends BinaryProtocolError {
    get code() {
        return 50397186;
    }
}
exports.TypeSpecNotFoundError = TypeSpecNotFoundError;
class UnexpectedMessageError extends BinaryProtocolError {
    get code() {
        return 50397187;
    }
}
exports.UnexpectedMessageError = UnexpectedMessageError;
class InputDataError extends ProtocolError {
    get code() {
        return 50462720;
    }
}
exports.InputDataError = InputDataError;
class ParameterTypeMismatchError extends InputDataError {
    get code() {
        return 50462976;
    }
}
exports.ParameterTypeMismatchError = ParameterTypeMismatchError;
class StateMismatchError extends InputDataError {
    get code() {
        return 50463232;
    }
}
exports.StateMismatchError = StateMismatchError;
class ResultCardinalityMismatchError extends ProtocolError {
    get code() {
        return 50528256;
    }
}
exports.ResultCardinalityMismatchError = ResultCardinalityMismatchError;
class CapabilityError extends ProtocolError {
    get code() {
        return 50593792;
    }
}
exports.CapabilityError = CapabilityError;
class UnsupportedCapabilityError extends CapabilityError {
    get code() {
        return 50594048;
    }
}
exports.UnsupportedCapabilityError = UnsupportedCapabilityError;
class DisabledCapabilityError extends CapabilityError {
    get code() {
        return 50594304;
    }
}
exports.DisabledCapabilityError = DisabledCapabilityError;
class QueryError extends base_1.EdgeDBError {
    get code() {
        return 67108864;
    }
}
exports.QueryError = QueryError;
class InvalidSyntaxError extends QueryError {
    get code() {
        return 67174400;
    }
}
exports.InvalidSyntaxError = InvalidSyntaxError;
class EdgeQLSyntaxError extends InvalidSyntaxError {
    get code() {
        return 67174656;
    }
}
exports.EdgeQLSyntaxError = EdgeQLSyntaxError;
class SchemaSyntaxError extends InvalidSyntaxError {
    get code() {
        return 67174912;
    }
}
exports.SchemaSyntaxError = SchemaSyntaxError;
class GraphQLSyntaxError extends InvalidSyntaxError {
    get code() {
        return 67175168;
    }
}
exports.GraphQLSyntaxError = GraphQLSyntaxError;
class InvalidTypeError extends QueryError {
    get code() {
        return 67239936;
    }
}
exports.InvalidTypeError = InvalidTypeError;
class InvalidTargetError extends InvalidTypeError {
    get code() {
        return 67240192;
    }
}
exports.InvalidTargetError = InvalidTargetError;
class InvalidLinkTargetError extends InvalidTargetError {
    get code() {
        return 67240193;
    }
}
exports.InvalidLinkTargetError = InvalidLinkTargetError;
class InvalidPropertyTargetError extends InvalidTargetError {
    get code() {
        return 67240194;
    }
}
exports.InvalidPropertyTargetError = InvalidPropertyTargetError;
class InvalidReferenceError extends QueryError {
    get code() {
        return 67305472;
    }
}
exports.InvalidReferenceError = InvalidReferenceError;
class UnknownModuleError extends InvalidReferenceError {
    get code() {
        return 67305473;
    }
}
exports.UnknownModuleError = UnknownModuleError;
class UnknownLinkError extends InvalidReferenceError {
    get code() {
        return 67305474;
    }
}
exports.UnknownLinkError = UnknownLinkError;
class UnknownPropertyError extends InvalidReferenceError {
    get code() {
        return 67305475;
    }
}
exports.UnknownPropertyError = UnknownPropertyError;
class UnknownUserError extends InvalidReferenceError {
    get code() {
        return 67305476;
    }
}
exports.UnknownUserError = UnknownUserError;
class UnknownDatabaseError extends InvalidReferenceError {
    get code() {
        return 67305477;
    }
}
exports.UnknownDatabaseError = UnknownDatabaseError;
class UnknownParameterError extends InvalidReferenceError {
    get code() {
        return 67305478;
    }
}
exports.UnknownParameterError = UnknownParameterError;
class SchemaError extends QueryError {
    get code() {
        return 67371008;
    }
}
exports.SchemaError = SchemaError;
class SchemaDefinitionError extends QueryError {
    get code() {
        return 67436544;
    }
}
exports.SchemaDefinitionError = SchemaDefinitionError;
class InvalidDefinitionError extends SchemaDefinitionError {
    get code() {
        return 67436800;
    }
}
exports.InvalidDefinitionError = InvalidDefinitionError;
class InvalidModuleDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436801;
    }
}
exports.InvalidModuleDefinitionError = InvalidModuleDefinitionError;
class InvalidLinkDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436802;
    }
}
exports.InvalidLinkDefinitionError = InvalidLinkDefinitionError;
class InvalidPropertyDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436803;
    }
}
exports.InvalidPropertyDefinitionError = InvalidPropertyDefinitionError;
class InvalidUserDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436804;
    }
}
exports.InvalidUserDefinitionError = InvalidUserDefinitionError;
class InvalidDatabaseDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436805;
    }
}
exports.InvalidDatabaseDefinitionError = InvalidDatabaseDefinitionError;
class InvalidOperatorDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436806;
    }
}
exports.InvalidOperatorDefinitionError = InvalidOperatorDefinitionError;
class InvalidAliasDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436807;
    }
}
exports.InvalidAliasDefinitionError = InvalidAliasDefinitionError;
class InvalidFunctionDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436808;
    }
}
exports.InvalidFunctionDefinitionError = InvalidFunctionDefinitionError;
class InvalidConstraintDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436809;
    }
}
exports.InvalidConstraintDefinitionError = InvalidConstraintDefinitionError;
class InvalidCastDefinitionError extends InvalidDefinitionError {
    get code() {
        return 67436810;
    }
}
exports.InvalidCastDefinitionError = InvalidCastDefinitionError;
class DuplicateDefinitionError extends SchemaDefinitionError {
    get code() {
        return 67437056;
    }
}
exports.DuplicateDefinitionError = DuplicateDefinitionError;
class DuplicateModuleDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437057;
    }
}
exports.DuplicateModuleDefinitionError = DuplicateModuleDefinitionError;
class DuplicateLinkDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437058;
    }
}
exports.DuplicateLinkDefinitionError = DuplicateLinkDefinitionError;
class DuplicatePropertyDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437059;
    }
}
exports.DuplicatePropertyDefinitionError = DuplicatePropertyDefinitionError;
class DuplicateUserDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437060;
    }
}
exports.DuplicateUserDefinitionError = DuplicateUserDefinitionError;
class DuplicateDatabaseDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437061;
    }
}
exports.DuplicateDatabaseDefinitionError = DuplicateDatabaseDefinitionError;
class DuplicateOperatorDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437062;
    }
}
exports.DuplicateOperatorDefinitionError = DuplicateOperatorDefinitionError;
class DuplicateViewDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437063;
    }
}
exports.DuplicateViewDefinitionError = DuplicateViewDefinitionError;
class DuplicateFunctionDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437064;
    }
}
exports.DuplicateFunctionDefinitionError = DuplicateFunctionDefinitionError;
class DuplicateConstraintDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437065;
    }
}
exports.DuplicateConstraintDefinitionError = DuplicateConstraintDefinitionError;
class DuplicateCastDefinitionError extends DuplicateDefinitionError {
    get code() {
        return 67437066;
    }
}
exports.DuplicateCastDefinitionError = DuplicateCastDefinitionError;
class SessionTimeoutError extends QueryError {
    get code() {
        return 67502080;
    }
}
exports.SessionTimeoutError = SessionTimeoutError;
class IdleSessionTimeoutError extends SessionTimeoutError {
    get code() {
        return 67502336;
    }
}
exports.IdleSessionTimeoutError = IdleSessionTimeoutError;
class QueryTimeoutError extends SessionTimeoutError {
    get code() {
        return 67502592;
    }
}
exports.QueryTimeoutError = QueryTimeoutError;
class TransactionTimeoutError extends SessionTimeoutError {
    get code() {
        return 67504640;
    }
}
exports.TransactionTimeoutError = TransactionTimeoutError;
class IdleTransactionTimeoutError extends TransactionTimeoutError {
    get code() {
        return 67504641;
    }
}
exports.IdleTransactionTimeoutError = IdleTransactionTimeoutError;
class ExecutionError extends base_1.EdgeDBError {
    get code() {
        return 83886080;
    }
}
exports.ExecutionError = ExecutionError;
class InvalidValueError extends ExecutionError {
    get code() {
        return 83951616;
    }
}
exports.InvalidValueError = InvalidValueError;
class DivisionByZeroError extends InvalidValueError {
    get code() {
        return 83951617;
    }
}
exports.DivisionByZeroError = DivisionByZeroError;
class NumericOutOfRangeError extends InvalidValueError {
    get code() {
        return 83951618;
    }
}
exports.NumericOutOfRangeError = NumericOutOfRangeError;
class AccessPolicyError extends InvalidValueError {
    get code() {
        return 83951619;
    }
}
exports.AccessPolicyError = AccessPolicyError;
class IntegrityError extends ExecutionError {
    get code() {
        return 84017152;
    }
}
exports.IntegrityError = IntegrityError;
class ConstraintViolationError extends IntegrityError {
    get code() {
        return 84017153;
    }
}
exports.ConstraintViolationError = ConstraintViolationError;
class CardinalityViolationError extends IntegrityError {
    get code() {
        return 84017154;
    }
}
exports.CardinalityViolationError = CardinalityViolationError;
class MissingRequiredError extends IntegrityError {
    get code() {
        return 84017155;
    }
}
exports.MissingRequiredError = MissingRequiredError;
class TransactionError extends ExecutionError {
    get code() {
        return 84082688;
    }
}
exports.TransactionError = TransactionError;
class TransactionConflictError extends TransactionError {
    get code() {
        return 84082944;
    }
}
exports.TransactionConflictError = TransactionConflictError;
Object.defineProperty(TransactionConflictError, "tags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { [tags.SHOULD_RETRY]: true }
});
class TransactionSerializationError extends TransactionConflictError {
    get code() {
        return 84082945;
    }
}
exports.TransactionSerializationError = TransactionSerializationError;
Object.defineProperty(TransactionSerializationError, "tags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { [tags.SHOULD_RETRY]: true }
});
class TransactionDeadlockError extends TransactionConflictError {
    get code() {
        return 84082946;
    }
}
exports.TransactionDeadlockError = TransactionDeadlockError;
Object.defineProperty(TransactionDeadlockError, "tags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { [tags.SHOULD_RETRY]: true }
});
class ConfigurationError extends base_1.EdgeDBError {
    get code() {
        return 100663296;
    }
}
exports.ConfigurationError = ConfigurationError;
class AccessError extends base_1.EdgeDBError {
    get code() {
        return 117440512;
    }
}
exports.AccessError = AccessError;
class AuthenticationError extends AccessError {
    get code() {
        return 117506048;
    }
}
exports.AuthenticationError = AuthenticationError;
class AvailabilityError extends base_1.EdgeDBError {
    get code() {
        return 134217728;
    }
}
exports.AvailabilityError = AvailabilityError;
class BackendUnavailableError extends AvailabilityError {
    get code() {
        return 134217729;
    }
}
exports.BackendUnavailableError = BackendUnavailableError;
Object.defineProperty(BackendUnavailableError, "tags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: { [tags.SHOULD_RETRY]: true }
});
class BackendError extends base_1.EdgeDBError {
    get code() {
        return 150994944;
    }
}
exports.BackendError = BackendError;
class UnsupportedBackendFeatureError extends BackendError {
    get code() {
        return 150995200;
    }
}
exports.UnsupportedBackendFeatureError = UnsupportedBackendFeatureError;
class LogMessage extends base_1.EdgeDBError {
    get code() {
        return 4026531840;
    }
}
exports.LogMessage = LogMessage;
class WarningMessage extends LogMessage {
    get code() {
        return 4026597376;
    }
}
exports.WarningMessage = WarningMessage;
class ClientError extends base_1.EdgeDBError {
    get code() {
        return 4278190080;
    }
}
exports.ClientError = ClientError;
class ClientConnectionError extends ClientError {
    get code() {
        return 4278255616;
    }
}
exports.ClientConnectionError = ClientConnectionError;
class ClientConnectionFailedError extends ClientConnectionError {
    get code() {
        return 4278255872;
    }
}
exports.ClientConnectionFailedError = ClientConnectionFailedError;
class ClientConnectionFailedTemporarilyError extends ClientConnectionFailedError {
    get code() {
        return 4278255873;
    }
}
exports.ClientConnectionFailedTemporarilyError = ClientConnectionFailedTemporarilyError;
Object.defineProperty(ClientConnectionFailedTemporarilyError, "tags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        [tags.SHOULD_RECONNECT]: true,
        [tags.SHOULD_RETRY]: true,
    }
});
class ClientConnectionTimeoutError extends ClientConnectionError {
    get code() {
        return 4278256128;
    }
}
exports.ClientConnectionTimeoutError = ClientConnectionTimeoutError;
Object.defineProperty(ClientConnectionTimeoutError, "tags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        [tags.SHOULD_RECONNECT]: true,
        [tags.SHOULD_RETRY]: true,
    }
});
class ClientConnectionClosedError extends ClientConnectionError {
    get code() {
        return 4278256384;
    }
}
exports.ClientConnectionClosedError = ClientConnectionClosedError;
Object.defineProperty(ClientConnectionClosedError, "tags", {
    enumerable: true,
    configurable: true,
    writable: true,
    value: {
        [tags.SHOULD_RECONNECT]: true,
        [tags.SHOULD_RETRY]: true,
    }
});
class InterfaceError extends ClientError {
    get code() {
        return 4278321152;
    }
}
exports.InterfaceError = InterfaceError;
class QueryArgumentError extends InterfaceError {
    get code() {
        return 4278321408;
    }
}
exports.QueryArgumentError = QueryArgumentError;
class MissingArgumentError extends QueryArgumentError {
    get code() {
        return 4278321409;
    }
}
exports.MissingArgumentError = MissingArgumentError;
class UnknownArgumentError extends QueryArgumentError {
    get code() {
        return 4278321410;
    }
}
exports.UnknownArgumentError = UnknownArgumentError;
class InvalidArgumentError extends QueryArgumentError {
    get code() {
        return 4278321411;
    }
}
exports.InvalidArgumentError = InvalidArgumentError;
class NoDataError extends ClientError {
    get code() {
        return 4278386688;
    }
}
exports.NoDataError = NoDataError;
class InternalClientError extends ClientError {
    get code() {
        return 4278452224;
    }
}
exports.InternalClientError = InternalClientError;
