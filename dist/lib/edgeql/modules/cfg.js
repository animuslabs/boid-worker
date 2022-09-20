import { $ } from "edgedb";
import * as _ from "../imports.js";
const AllowBareDDL = $.makeType(_.spec, "9c6778f2-3558-11ed-8b62-4de428defc95", _.syntax.literal);
const ConnectionTransport = $.makeType(_.spec, "9c67d2ca-3558-11ed-9f56-e33d1c861e85", _.syntax.literal);
const memory = $.makeType(_.spec, "00000000-0000-0000-0000-000000000130", _.syntax.literal);
const $ConfigObject = $.makeType(_.spec, "9c682ff4-3558-11ed-ba4a-df77b4f3bd76", _.syntax.literal);
const ConfigObject = _.syntax.$PathNode($.$toSet($ConfigObject, $.Cardinality.Many), null, true);
const $AbstractConfig = $.makeType(_.spec, "9c95a0ce-3558-11ed-88a3-e746975459c9", _.syntax.literal);
const AbstractConfig = _.syntax.$PathNode($.$toSet($AbstractConfig, $.Cardinality.Many), null, true);
const $Auth = $.makeType(_.spec, "9c8936cc-3558-11ed-bd32-198f72d9eaa1", _.syntax.literal);
const Auth = _.syntax.$PathNode($.$toSet($Auth, $.Cardinality.Many), null, true);
const $AuthMethod = $.makeType(_.spec, "9c6e12de-3558-11ed-b0a3-f5ab99373e7d", _.syntax.literal);
const AuthMethod = _.syntax.$PathNode($.$toSet($AuthMethod, $.Cardinality.Many), null, true);
const $Config = $.makeType(_.spec, "9cad6bf0-3558-11ed-8ff6-05bc35c16799", _.syntax.literal);
const Config = _.syntax.$PathNode($.$toSet($Config, $.Cardinality.Many), null, true);
const $DatabaseConfig = $.makeType(_.spec, "9ce02a04-3558-11ed-b6ac-c1651ab976e2", _.syntax.literal);
const DatabaseConfig = _.syntax.$PathNode($.$toSet($DatabaseConfig, $.Cardinality.Many), null, true);
const $InstanceConfig = $.makeType(_.spec, "9cc6bc5e-3558-11ed-8bc8-b9813a9899ce", _.syntax.literal);
const InstanceConfig = _.syntax.$PathNode($.$toSet($InstanceConfig, $.Cardinality.Many), null, true);
const $JWT = $.makeType(_.spec, "9c81eb6a-3558-11ed-886f-0528c097e21c", _.syntax.literal);
const JWT = _.syntax.$PathNode($.$toSet($JWT, $.Cardinality.Many), null, true);
const $SCRAM = $.makeType(_.spec, "9c7acbaa-3558-11ed-950d-f18bbf6ef88b", _.syntax.literal);
const SCRAM = _.syntax.$PathNode($.$toSet($SCRAM, $.Cardinality.Many), null, true);
const $Trust = $.makeType(_.spec, "9c747016-3558-11ed-a408-ff4ed216ee04", _.syntax.literal);
const Trust = _.syntax.$PathNode($.$toSet($Trust, $.Cardinality.Many), null, true);
function get_config_json(...args) {
    const { returnType, cardinality, args: positionalArgs, namedArgs } = _.syntax.$resolveOverload('cfg::get_config_json', args, _.spec, [
        { args: [], namedArgs: { "sources": { typeId: "05f91774-15ea-9001-038e-092c1cad80af", optional: true, setoftype: false, variadic: false }, "max_source": { typeId: "00000000-0000-0000-0000-000000000101", optional: true, setoftype: false, variadic: false } }, returnTypeId: "00000000-0000-0000-0000-00000000010f" },
    ]);
    return _.syntax.$expressionify({
        __kind__: $.ExpressionKind.Function,
        __element__: returnType,
        __cardinality__: cardinality,
        __name__: "cfg::get_config_json",
        __args__: positionalArgs,
        __namedargs__: namedArgs,
    });
}
;
export { AllowBareDDL, ConnectionTransport, memory, $ConfigObject, ConfigObject, $AbstractConfig, AbstractConfig, $Auth, Auth, $AuthMethod, AuthMethod, $Config, Config, $DatabaseConfig, DatabaseConfig, $InstanceConfig, InstanceConfig, $JWT, JWT, $SCRAM, SCRAM, $Trust, Trust };
const __defaultExports = {
    "AllowBareDDL": AllowBareDDL,
    "ConnectionTransport": ConnectionTransport,
    "memory": memory,
    "ConfigObject": ConfigObject,
    "AbstractConfig": AbstractConfig,
    "Auth": Auth,
    "AuthMethod": AuthMethod,
    "Config": Config,
    "DatabaseConfig": DatabaseConfig,
    "InstanceConfig": InstanceConfig,
    "JWT": JWT,
    "SCRAM": SCRAM,
    "Trust": Trust,
    "get_config_json": get_config_json
};
export default __defaultExports;
//# sourceMappingURL=cfg.js.map