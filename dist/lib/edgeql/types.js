export var std;
(function (std) {
    let JsonEmpty;
    (function (JsonEmpty) {
        JsonEmpty["ReturnEmpty"] = "ReturnEmpty";
        JsonEmpty["ReturnTarget"] = "ReturnTarget";
        JsonEmpty["Error"] = "Error";
        JsonEmpty["UseNull"] = "UseNull";
        JsonEmpty["DeleteKey"] = "DeleteKey";
    })(JsonEmpty = std.JsonEmpty || (std.JsonEmpty = {}));
})(std || (std = {}));
export var schema;
(function (schema) {
    let AccessKind;
    (function (AccessKind) {
        AccessKind["Select"] = "Select";
        AccessKind["UpdateRead"] = "UpdateRead";
        AccessKind["UpdateWrite"] = "UpdateWrite";
        AccessKind["Delete"] = "Delete";
        AccessKind["Insert"] = "Insert";
    })(AccessKind = schema.AccessKind || (schema.AccessKind = {}));
    let AccessPolicyAction;
    (function (AccessPolicyAction) {
        AccessPolicyAction["Allow"] = "Allow";
        AccessPolicyAction["Deny"] = "Deny";
    })(AccessPolicyAction = schema.AccessPolicyAction || (schema.AccessPolicyAction = {}));
    let Cardinality;
    (function (Cardinality) {
        Cardinality["One"] = "One";
        Cardinality["Many"] = "Many";
    })(Cardinality = schema.Cardinality || (schema.Cardinality = {}));
    let OperatorKind;
    (function (OperatorKind) {
        OperatorKind["Infix"] = "Infix";
        OperatorKind["Postfix"] = "Postfix";
        OperatorKind["Prefix"] = "Prefix";
        OperatorKind["Ternary"] = "Ternary";
    })(OperatorKind = schema.OperatorKind || (schema.OperatorKind = {}));
    let ParameterKind;
    (function (ParameterKind) {
        ParameterKind["VariadicParam"] = "VariadicParam";
        ParameterKind["NamedOnlyParam"] = "NamedOnlyParam";
        ParameterKind["PositionalParam"] = "PositionalParam";
    })(ParameterKind = schema.ParameterKind || (schema.ParameterKind = {}));
    let SourceDeleteAction;
    (function (SourceDeleteAction) {
        SourceDeleteAction["DeleteTarget"] = "DeleteTarget";
        SourceDeleteAction["Allow"] = "Allow";
        SourceDeleteAction["DeleteTargetIfOrphan"] = "DeleteTargetIfOrphan";
    })(SourceDeleteAction = schema.SourceDeleteAction || (schema.SourceDeleteAction = {}));
    let TargetDeleteAction;
    (function (TargetDeleteAction) {
        TargetDeleteAction["Restrict"] = "Restrict";
        TargetDeleteAction["DeleteSource"] = "DeleteSource";
        TargetDeleteAction["Allow"] = "Allow";
        TargetDeleteAction["DeferredRestrict"] = "DeferredRestrict";
    })(TargetDeleteAction = schema.TargetDeleteAction || (schema.TargetDeleteAction = {}));
    let TypeModifier;
    (function (TypeModifier) {
        TypeModifier["SetOfType"] = "SetOfType";
        TypeModifier["OptionalType"] = "OptionalType";
        TypeModifier["SingletonType"] = "SingletonType";
    })(TypeModifier = schema.TypeModifier || (schema.TypeModifier = {}));
    let Volatility;
    (function (Volatility) {
        Volatility["Immutable"] = "Immutable";
        Volatility["Stable"] = "Stable";
        Volatility["Volatile"] = "Volatile";
    })(Volatility = schema.Volatility || (schema.Volatility = {}));
})(schema || (schema = {}));
export var cfg;
(function (cfg) {
    let AllowBareDDL;
    (function (AllowBareDDL) {
        AllowBareDDL["AlwaysAllow"] = "AlwaysAllow";
        AllowBareDDL["NeverAllow"] = "NeverAllow";
    })(AllowBareDDL = cfg.AllowBareDDL || (cfg.AllowBareDDL = {}));
    let ConnectionTransport;
    (function (ConnectionTransport) {
        ConnectionTransport["TCP"] = "TCP";
        ConnectionTransport["HTTP"] = "HTTP";
    })(ConnectionTransport = cfg.ConnectionTransport || (cfg.ConnectionTransport = {}));
})(cfg || (cfg = {}));
export var sys;
(function (sys) {
    let TransactionIsolation;
    (function (TransactionIsolation) {
        TransactionIsolation["RepeatableRead"] = "RepeatableRead";
        TransactionIsolation["Serializable"] = "Serializable";
    })(TransactionIsolation = sys.TransactionIsolation || (sys.TransactionIsolation = {}));
    let VersionStage;
    (function (VersionStage) {
        VersionStage["dev"] = "dev";
        VersionStage["alpha"] = "alpha";
        VersionStage["beta"] = "beta";
        VersionStage["rc"] = "rc";
        VersionStage["final"] = "final";
    })(VersionStage = sys.VersionStage || (sys.VersionStage = {}));
})(sys || (sys = {}));
//# sourceMappingURL=types.js.map