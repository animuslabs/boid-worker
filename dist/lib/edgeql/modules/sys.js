import { $ } from "edgedb";
import * as _ from "../imports.js";
const TransactionIsolation = $.makeType(_.spec, "9c024996-3558-11ed-90a9-8d54c171f4c9", _.syntax.literal);
const VersionStage = $.makeType(_.spec, "9c02a5d0-3558-11ed-b57f-29ecfccbd7a3", _.syntax.literal);
const $SystemObject = $.makeType(_.spec, "9c030214-3558-11ed-bd28-b1cedefa17f3", _.syntax.literal);
const SystemObject = _.syntax.$PathNode($.$toSet($SystemObject, $.Cardinality.Many), null, true);
const $Database = $.makeType(_.spec, "9c1313ac-3558-11ed-a168-1fe5c61f28a2", _.syntax.literal);
const Database = _.syntax.$PathNode($.$toSet($Database, $.Cardinality.Many), null, true);
const $ExtensionPackage = $.makeType(_.spec, "9c25545e-3558-11ed-87b2-1717ad22009c", _.syntax.literal);
const ExtensionPackage = _.syntax.$PathNode($.$toSet($ExtensionPackage, $.Cardinality.Many), null, true);
const $Role = $.makeType(_.spec, "9c3a413e-3558-11ed-9a0d-754349b845b6", _.syntax.literal);
const Role = _.syntax.$PathNode($.$toSet($Role, $.Cardinality.Many), null, true);
function get_version(...args) {
    const { returnType, cardinality, args: positionalArgs, namedArgs } = _.syntax.$resolveOverload('sys::get_version', args, _.spec, [
        { args: [], returnTypeId: "1b491ad4-2f08-c6d5-063b-1a807df77c65" },
    ]);
    return _.syntax.$expressionify({
        __kind__: $.ExpressionKind.Function,
        __element__: returnType,
        __cardinality__: cardinality,
        __name__: "sys::get_version",
        __args__: positionalArgs,
        __namedargs__: namedArgs,
    });
}
;
function get_version_as_str(...args) {
    const { returnType, cardinality, args: positionalArgs, namedArgs } = _.syntax.$resolveOverload('sys::get_version_as_str', args, _.spec, [
        { args: [], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    ]);
    return _.syntax.$expressionify({
        __kind__: $.ExpressionKind.Function,
        __element__: returnType,
        __cardinality__: cardinality,
        __name__: "sys::get_version_as_str",
        __args__: positionalArgs,
        __namedargs__: namedArgs,
    });
}
;
function get_instance_name(...args) {
    const { returnType, cardinality, args: positionalArgs, namedArgs } = _.syntax.$resolveOverload('sys::get_instance_name', args, _.spec, [
        { args: [], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    ]);
    return _.syntax.$expressionify({
        __kind__: $.ExpressionKind.Function,
        __element__: returnType,
        __cardinality__: cardinality,
        __name__: "sys::get_instance_name",
        __args__: positionalArgs,
        __namedargs__: namedArgs,
    });
}
;
function get_transaction_isolation(...args) {
    const { returnType, cardinality, args: positionalArgs, namedArgs } = _.syntax.$resolveOverload('sys::get_transaction_isolation', args, _.spec, [
        { args: [], returnTypeId: "9c024996-3558-11ed-90a9-8d54c171f4c9" },
    ]);
    return _.syntax.$expressionify({
        __kind__: $.ExpressionKind.Function,
        __element__: returnType,
        __cardinality__: cardinality,
        __name__: "sys::get_transaction_isolation",
        __args__: positionalArgs,
        __namedargs__: namedArgs,
    });
}
;
function get_current_database(...args) {
    const { returnType, cardinality, args: positionalArgs, namedArgs } = _.syntax.$resolveOverload('sys::get_current_database', args, _.spec, [
        { args: [], returnTypeId: "00000000-0000-0000-0000-000000000101" },
    ]);
    return _.syntax.$expressionify({
        __kind__: $.ExpressionKind.Function,
        __element__: returnType,
        __cardinality__: cardinality,
        __name__: "sys::get_current_database",
        __args__: positionalArgs,
        __namedargs__: namedArgs,
    });
}
;
export { TransactionIsolation, VersionStage, $SystemObject, SystemObject, $Database, Database, $ExtensionPackage, ExtensionPackage, $Role, Role };
const __defaultExports = {
    "TransactionIsolation": TransactionIsolation,
    "VersionStage": VersionStage,
    "SystemObject": SystemObject,
    "Database": Database,
    "ExtensionPackage": ExtensionPackage,
    "Role": Role,
    "get_version": get_version,
    "get_version_as_str": get_version_as_str,
    "get_instance_name": get_instance_name,
    "get_transaction_isolation": get_transaction_isolation,
    "get_current_database": get_current_database
};
export default __defaultExports;
//# sourceMappingURL=sys.js.map