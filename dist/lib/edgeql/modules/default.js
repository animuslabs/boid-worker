import { $ } from "edgedb";
import * as _ from "../imports.js";
const $boidAccount = $.makeType(_.spec, "b7540dd2-3572-11ed-9ab0-e5e7cb8528c4", _.syntax.literal);
const boidAccount = _.syntax.$PathNode($.$toSet($boidAccount, $.Cardinality.Many), null, true);
const $fahRecord = $.makeType(_.spec, "b7576298-3572-11ed-bcce-af08965d23b4", _.syntax.literal);
const fahRecord = _.syntax.$PathNode($.$toSet($fahRecord, $.Cardinality.Many), null, true);
export { $boidAccount, boidAccount, $fahRecord, fahRecord };
const __defaultExports = {
    "boidAccount": boidAccount,
    "fahRecord": fahRecord
};
export default __defaultExports;
//# sourceMappingURL=default.js.map