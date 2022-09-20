import dotenv from "dotenv";
import fs from "fs-extra";
import { Name, PrivateKey } from "@greymass/eosio";
dotenv.config();
const readEnv = fs.readJSONSync("../.env.json");
// console.log("readENV", readEnv)
let useChain = process.env.CHAIN;
if (!useChain)
    useChain = readEnv.default;
// console.log(useChain)
const untyped = readEnv.chain[useChain];
const typed = {
    chain: useChain,
    endpoints: untyped.endpoints.map(el => new URL(el)),
    worker: {
        account: Name.from(untyped.worker.account),
        permission: Name.from(untyped.worker.permission),
        key: PrivateKey.from(untyped.worker.key)
    },
    contracts: {
        power: Name.from(untyped.contracts.power),
        system: Name.from(untyped.contracts.system),
        token: Name.from(untyped.contracts.token)
    }
};
const config = typed;
export default config;
//# sourceMappingURL=env.js.map