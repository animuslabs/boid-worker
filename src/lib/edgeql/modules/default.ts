import { $ } from "edgedb";
import * as _ from "../imports";
import type * as _std from "./std";
export type $boidAccountλShape = $.typeutil.flatten<_std.$Object_988c9d98355811ed91ab93b70794e9cfλShape & {
  "boid_id": $.PropertyDesc<_std.$str, $.Cardinality.One, true, false, false, false>;
}>;
type $boidAccount = $.ObjectType<"default::boidAccount", $boidAccountλShape, null>;
const $boidAccount = $.makeType<$boidAccount>(_.spec, "b7540dd2-3572-11ed-9ab0-e5e7cb8528c4", _.syntax.literal);

const boidAccount: $.$expr_PathNode<$.TypeSet<$boidAccount, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($boidAccount, $.Cardinality.Many), null, true);

export type $fahRecordλShape = $.typeutil.flatten<_std.$Object_988c9d98355811ed91ab93b70794e9cfλShape & {
  "name": $.PropertyDesc<_std.$str, $.Cardinality.One, false, false, false, false>;
  "time": $.PropertyDesc<_std.$datetime, $.Cardinality.One, false, false, false, false>;
  "fahid": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "score": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
  "wus": $.PropertyDesc<_std.$int64, $.Cardinality.One, false, false, false, false>;
}>;
type $fahRecord = $.ObjectType<"default::fahRecord", $fahRecordλShape, null>;
const $fahRecord = $.makeType<$fahRecord>(_.spec, "b7576298-3572-11ed-bcce-af08965d23b4", _.syntax.literal);

const fahRecord: $.$expr_PathNode<$.TypeSet<$fahRecord, $.Cardinality.Many>, null, true> = _.syntax.$PathNode($.$toSet($fahRecord, $.Cardinality.Many), null, true);



export { $boidAccount, boidAccount, $fahRecord, fahRecord };

type __defaultExports = {
  "boidAccount": typeof boidAccount;
  "fahRecord": typeof fahRecord
};
const __defaultExports: __defaultExports = {
  "boidAccount": boidAccount,
  "fahRecord": fahRecord
};
export default __defaultExports;
