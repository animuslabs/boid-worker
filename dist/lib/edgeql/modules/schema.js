import { $ } from "edgedb";
import * as _ from "../imports.js";
const AccessKind = $.makeType(_.spec, "98ca6a4c-3558-11ed-955c-b310e792ffd7", _.syntax.literal);
const AccessPolicyAction = $.makeType(_.spec, "98ca0f5c-3558-11ed-994c-23f274d3efbf", _.syntax.literal);
const Cardinality = $.makeType(_.spec, "98c79c22-3558-11ed-a097-f12ad8545f74", _.syntax.literal);
const OperatorKind = $.makeType(_.spec, "98c8a96e-3558-11ed-a37c-8b983229c678", _.syntax.literal);
const ParameterKind = $.makeType(_.spec, "98c95e9a-3558-11ed-8d2d-afc2caf24e9c", _.syntax.literal);
const SourceDeleteAction = $.makeType(_.spec, "98c850e0-3558-11ed-bf34-49ed5dd4640a", _.syntax.literal);
const TargetDeleteAction = $.makeType(_.spec, "98c7f73a-3558-11ed-8772-a33a41281188", _.syntax.literal);
const TypeModifier = $.makeType(_.spec, "98c9b6ec-3558-11ed-b054-3d301400d3c1", _.syntax.literal);
const Volatility = $.makeType(_.spec, "98c905d0-3558-11ed-a524-eb8b40eb6016", _.syntax.literal);
const $Object_98cad86a355811ed98af75c05296aa5a = $.makeType(_.spec, "98cad86a-3558-11ed-98af-75c05296aa5a", _.syntax.literal);
const Object_98cad86a355811ed98af75c05296aa5a = _.syntax.$PathNode($.$toSet($Object_98cad86a355811ed98af75c05296aa5a, $.Cardinality.Many), null, true);
const $SubclassableObject = $.makeType(_.spec, "98d081de-3558-11ed-ac8a-41c9bedafed5", _.syntax.literal);
const SubclassableObject = _.syntax.$PathNode($.$toSet($SubclassableObject, $.Cardinality.Many), null, true);
const $InheritingObject = $.makeType(_.spec, "99794b7a-3558-11ed-8c6c-e906a950d8f8", _.syntax.literal);
const InheritingObject = _.syntax.$PathNode($.$toSet($InheritingObject, $.Cardinality.Many), null, true);
const $AnnotationSubject = $.makeType(_.spec, "9964c7d6-3558-11ed-94fb-2b8459f73e9f", _.syntax.literal);
const AnnotationSubject = _.syntax.$PathNode($.$toSet($AnnotationSubject, $.Cardinality.Many), null, true);
const $AccessPolicy = $.makeType(_.spec, "9a0c9664-3558-11ed-a616-e90d7adf9945", _.syntax.literal);
const AccessPolicy = _.syntax.$PathNode($.$toSet($AccessPolicy, $.Cardinality.Many), null, true);
const $Alias = $.makeType(_.spec, "9a262052-3558-11ed-905f-e151f687a81b", _.syntax.literal);
const Alias = _.syntax.$PathNode($.$toSet($Alias, $.Cardinality.Many), null, true);
const $Annotation = $.makeType(_.spec, "996b1d66-3558-11ed-973b-67673e05247d", _.syntax.literal);
const Annotation = _.syntax.$PathNode($.$toSet($Annotation, $.Cardinality.Many), null, true);
const $Type = $.makeType(_.spec, "98d901b0-3558-11ed-bebc-690ca0e3da05", _.syntax.literal);
const Type = _.syntax.$PathNode($.$toSet($Type, $.Cardinality.Many), null, true);
const $PrimitiveType = $.makeType(_.spec, "98f750a2-3558-11ed-b36a-a9e6feb21def", _.syntax.literal);
const PrimitiveType = _.syntax.$PathNode($.$toSet($PrimitiveType, $.Cardinality.Many), null, true);
const $CollectionType = $.makeType(_.spec, "99213f2a-3558-11ed-989f-6f463475fd63", _.syntax.literal);
const CollectionType = _.syntax.$PathNode($.$toSet($CollectionType, $.Cardinality.Many), null, true);
const $Array = $.makeType(_.spec, "992c81be-3558-11ed-9914-6de3d02fe756", _.syntax.literal);
const Array = _.syntax.$PathNode($.$toSet($Array, $.Cardinality.Many), null, true);
const $CallableObject = $.makeType(_.spec, "9991f8dc-3558-11ed-a70b-cfbf21db1e24", _.syntax.literal);
const CallableObject = _.syntax.$PathNode($.$toSet($CallableObject, $.Cardinality.Many), null, true);
const $VolatilitySubject = $.makeType(_.spec, "99a0dbd6-3558-11ed-a462-b1cf4029b8b8", _.syntax.literal);
const VolatilitySubject = _.syntax.$PathNode($.$toSet($VolatilitySubject, $.Cardinality.Many), null, true);
const $Cast = $.makeType(_.spec, "9ba3bb56-3558-11ed-8147-f760af6029e5", _.syntax.literal);
const Cast = _.syntax.$PathNode($.$toSet($Cast, $.Cardinality.Many), null, true);
const $ConsistencySubject = $.makeType(_.spec, "99c3a666-3558-11ed-b6ad-f903079cf98f", _.syntax.literal);
const ConsistencySubject = _.syntax.$PathNode($.$toSet($ConsistencySubject, $.Cardinality.Many), null, true);
const $Constraint = $.makeType(_.spec, "99a85e88-3558-11ed-ac1d-1dda7a758d15", _.syntax.literal);
const Constraint = _.syntax.$PathNode($.$toSet($Constraint, $.Cardinality.Many), null, true);
const $Delta = $.makeType(_.spec, "995cce0a-3558-11ed-b7cc-4deed1cc9236", _.syntax.literal);
const Delta = _.syntax.$PathNode($.$toSet($Delta, $.Cardinality.Many), null, true);
const $Extension = $.makeType(_.spec, "9bcba03a-3558-11ed-ab2c-4915a29e3dfa", _.syntax.literal);
const Extension = _.syntax.$PathNode($.$toSet($Extension, $.Cardinality.Many), null, true);
const $Function = $.makeType(_.spec, "9b735e34-3558-11ed-8eee-6555715a3d31", _.syntax.literal);
const Function = _.syntax.$PathNode($.$toSet($Function, $.Cardinality.Many), null, true);
const $Global = $.makeType(_.spec, "9b5fea70-3558-11ed-9e5c-8bb33745c04b", _.syntax.literal);
const Global = _.syntax.$PathNode($.$toSet($Global, $.Cardinality.Many), null, true);
const $Index = $.makeType(_.spec, "99d0b2ac-3558-11ed-9a1c-37af04f54532", _.syntax.literal);
const Index = _.syntax.$PathNode($.$toSet($Index, $.Cardinality.Many), null, true);
const $Pointer = $.makeType(_.spec, "99f0b174-3558-11ed-a5d8-198f2b4ff1c1", _.syntax.literal);
const Pointer = _.syntax.$PathNode($.$toSet($Pointer, $.Cardinality.Many), null, true);
const $Source = $.makeType(_.spec, "99e52e26-3558-11ed-9dc4-b1a1c401b90a", _.syntax.literal);
const Source = _.syntax.$PathNode($.$toSet($Source, $.Cardinality.Many), null, true);
const $Link = $.makeType(_.spec, "9ad21e48-3558-11ed-9d0c-5be0661b1f8f", _.syntax.literal);
const Link = _.syntax.$PathNode($.$toSet($Link, $.Cardinality.Many), null, true);
const $Migration = $.makeType(_.spec, "9bb975c2-3558-11ed-987c-6fa9cbb14929", _.syntax.literal);
const Migration = _.syntax.$PathNode($.$toSet($Migration, $.Cardinality.Many), null, true);
const $Module = $.makeType(_.spec, "98f18974-3558-11ed-99a8-01f169c6abf9", _.syntax.literal);
const Module = _.syntax.$PathNode($.$toSet($Module, $.Cardinality.Many), null, true);
const $ObjectType = $.makeType(_.spec, "9a54d564-3558-11ed-86de-a153a39f6995", _.syntax.literal);
const ObjectType = _.syntax.$PathNode($.$toSet($ObjectType, $.Cardinality.Many), null, true);
const $Operator = $.makeType(_.spec, "9b8c5650-3558-11ed-a16a-4575a1e1ae0d", _.syntax.literal);
const Operator = _.syntax.$PathNode($.$toSet($Operator, $.Cardinality.Many), null, true);
const $Parameter = $.makeType(_.spec, "9987bb10-3558-11ed-8667-a3986cb91020", _.syntax.literal);
const Parameter = _.syntax.$PathNode($.$toSet($Parameter, $.Cardinality.Many), null, true);
const $Property = $.makeType(_.spec, "9afd540a-3558-11ed-b3d1-a57e2178d6df", _.syntax.literal);
const Property = _.syntax.$PathNode($.$toSet($Property, $.Cardinality.Many), null, true);
const $PseudoType = $.makeType(_.spec, "98e1a798-3558-11ed-912b-63053b181a9c", _.syntax.literal);
const PseudoType = _.syntax.$PathNode($.$toSet($PseudoType, $.Cardinality.Many), null, true);
const $Range = $.makeType(_.spec, "994f2dcc-3558-11ed-a93b-a3c1ec1eea7b", _.syntax.literal);
const Range = _.syntax.$PathNode($.$toSet($Range, $.Cardinality.Many), null, true);
const $ScalarType = $.makeType(_.spec, "9a341fc2-3558-11ed-8a65-9d626b789158", _.syntax.literal);
const ScalarType = _.syntax.$PathNode($.$toSet($ScalarType, $.Cardinality.Many), null, true);
const $Tuple = $.makeType(_.spec, "993f97e0-3558-11ed-96f2-0bac8f9912d5", _.syntax.literal);
const Tuple = _.syntax.$PathNode($.$toSet($Tuple, $.Cardinality.Many), null, true);
const $TupleElement = $.makeType(_.spec, "993a6d6a-3558-11ed-a3c3-83788a2d8bef", _.syntax.literal);
const TupleElement = _.syntax.$PathNode($.$toSet($TupleElement, $.Cardinality.Many), null, true);
export { AccessKind, AccessPolicyAction, Cardinality, OperatorKind, ParameterKind, SourceDeleteAction, TargetDeleteAction, TypeModifier, Volatility, $Object_98cad86a355811ed98af75c05296aa5a, Object_98cad86a355811ed98af75c05296aa5a, $SubclassableObject, SubclassableObject, $InheritingObject, InheritingObject, $AnnotationSubject, AnnotationSubject, $AccessPolicy, AccessPolicy, $Alias, Alias, $Annotation, Annotation, $Type, Type, $PrimitiveType, PrimitiveType, $CollectionType, CollectionType, $Array, Array, $CallableObject, CallableObject, $VolatilitySubject, VolatilitySubject, $Cast, Cast, $ConsistencySubject, ConsistencySubject, $Constraint, Constraint, $Delta, Delta, $Extension, Extension, $Function, Function, $Global, Global, $Index, Index, $Pointer, Pointer, $Source, Source, $Link, Link, $Migration, Migration, $Module, Module, $ObjectType, ObjectType, $Operator, Operator, $Parameter, Parameter, $Property, Property, $PseudoType, PseudoType, $Range, Range, $ScalarType, ScalarType, $Tuple, Tuple, $TupleElement, TupleElement };
const __defaultExports = {
    "AccessKind": AccessKind,
    "AccessPolicyAction": AccessPolicyAction,
    "Cardinality": Cardinality,
    "OperatorKind": OperatorKind,
    "ParameterKind": ParameterKind,
    "SourceDeleteAction": SourceDeleteAction,
    "TargetDeleteAction": TargetDeleteAction,
    "TypeModifier": TypeModifier,
    "Volatility": Volatility,
    "Object": Object_98cad86a355811ed98af75c05296aa5a,
    "SubclassableObject": SubclassableObject,
    "InheritingObject": InheritingObject,
    "AnnotationSubject": AnnotationSubject,
    "AccessPolicy": AccessPolicy,
    "Alias": Alias,
    "Annotation": Annotation,
    "Type": Type,
    "PrimitiveType": PrimitiveType,
    "CollectionType": CollectionType,
    "Array": Array,
    "CallableObject": CallableObject,
    "VolatilitySubject": VolatilitySubject,
    "Cast": Cast,
    "ConsistencySubject": ConsistencySubject,
    "Constraint": Constraint,
    "Delta": Delta,
    "Extension": Extension,
    "Function": Function,
    "Global": Global,
    "Index": Index,
    "Pointer": Pointer,
    "Source": Source,
    "Link": Link,
    "Migration": Migration,
    "Module": Module,
    "ObjectType": ObjectType,
    "Operator": Operator,
    "Parameter": Parameter,
    "Property": Property,
    "PseudoType": PseudoType,
    "Range": Range,
    "ScalarType": ScalarType,
    "Tuple": Tuple,
    "TupleElement": TupleElement
};
export default __defaultExports;
//# sourceMappingURL=schema.js.map