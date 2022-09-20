import { APIClient, FetchProvider, Action, Transaction, PermissionLevel, SignedTransaction } from "@greymass/eosio";
import fetch from "node-fetch";
import ms from "ms";
import { rand, shuffle, sleep } from "./utils.js";
import env from "./env.js";
import cacheManager from "cache-manager";
let client;
let provider;
let cache = cacheManager.caching({ store: "memory", max: 100, ttl: 10 /*seconds*/ });
export const rpcs = env.endpoints.map(el => {
    provider = new FetchProvider(el.toString(), { fetch });
    client = new APIClient({ provider });
    return { endpoint: el, rpc: client.v1.chain };
});
const abiCache = {};
async function errorCounter(endpoint, error) {
    console.log("error:", endpoint, error);
}
export async function safeDo(cb, params, retry) {
    if (!retry)
        retry = 0;
    const rpc = pickRpc();
    const url = rpc.endpoint.toString();
    console.log("Try rpc:", url);
    try {
        const doit = async () => {
            try {
                const result = (await rpc.rpc[cb](params));
                return result;
            }
            catch (error) {
                const errorMsg = error.toString();
                console.error("safeDo Error:", rpc.endpoint.toString(), errorMsg, error);
                if (cb === "get_account" && (errorMsg.search("unknown key") > -1)) {
                    retry = 5;
                    throw (error);
                }
                else {
                    errorCounter(url, errorMsg);
                    await sleep(ms("8s"));
                    throw (error);
                }
            }
        };
        const result = await Promise.race([
            doit(),
            // doit(),
            new Promise((res, reject) => setTimeout(() => reject(new Error("SafeDo Timeout:")), ms("3s")))
        ]);
        // console.log('Result:', result);
        return result;
    }
    catch (error) {
        console.error("DoRequest Error:", url);
        retry++;
        console.error("RETRY", retry);
        if (retry < 5)
            return safeDo(cb, params, retry);
    }
}
export async function getAllScopes(params) {
    let { code, table } = params;
    if (!code)
        code = env.contracts.power;
    let lower_bound = null;
    const rows = [];
    async function loop() {
        const result = await safeDo("get_table_by_scope", { code, table, limit: -1, lower_bound });
        result.rows.forEach((el) => rows.push(el));
        console.log("scopes:", rows.length);
        if (result.more)
            lower_bound = result.more;
        else
            return;
        return loop();
    }
    await loop();
    return rows.map(el => el.scope);
}
export async function getFullTable(params, type) {
    let code = params.contract;
    const table = params.tableName;
    let { scope } = params;
    if (!scope)
        scope = code;
    let lower_bound = null;
    const rows = [];
    async function loop() {
        const result = await safeDo("get_table_rows", { code, table, scope, limit: 100, lower_bound, type });
        result.rows.forEach(el => rows.push(el));
        if (result.more)
            lower_bound = result.next_key;
        else
            return;
        return loop();
    }
    await loop();
    return rows;
}
export function getInfo() {
    return cache.wrap("getinfo", () => safeDo("get_info"));
}
export async function getAccount(name) {
    const result = (await safeDo("get_account", name));
    return result;
}
export async function doAction(name, data, contract, authorization, keys, retry) {
    if (!data)
        data = {};
    if (!authorization)
        authorization = [PermissionLevel.from({ actor: env.worker.account, permission: env.worker.permission })];
    const info = await getInfo();
    const header = info.getTransactionHeader();
    let action;
    try {
        action = Action.from({
            authorization,
            account: contract,
            name,
            data
        });
    }
    catch (error) {
        // console.log(error.toString())
        let abi = abiCache[contract.toString()];
        if (!abi) {
            abi = (await pickRpc().rpc.get_abi(contract)).abi;
            if (abi)
                abiCache[contract.toString()] = abi;
        }
        if (!abi) {
            throw new Error(`No ABI for ${contract}`);
        }
        action = Action.from({
            authorization,
            account: contract,
            name,
            data
        }, abi);
    }
    const transaction = Transaction.from({
        ...header,
        actions: [action]
    });
    if (!keys)
        keys = [env.worker.key];
    const signatures = keys.map(key => key.signDigest(transaction.signingDigest(info.chain_id)));
    const signedTransaction = SignedTransaction.from({ ...transaction, signatures });
    const receipts = [];
    const errors = [];
    let apis = shuffle(rpcs);
    if (apis.length > 4)
        apis = apis.splice(0, 4);
    // console.log(apis)
    const timeoutTimer = ms("10s");
    await Promise.all(apis.map(({ endpoint, rpc }) => Promise.race([
        new Promise(res => {
            rpc.push_transaction(signedTransaction).then(result => {
                receipts.push({ url: endpoint.origin, receipt: result.processed });
            }).catch(error => {
                // console.log('Error Type:', typeof error);
                errors.push({ url: endpoint.origin, error: error?.error?.details[0]?.message || JSON.stringify(error?.error, null, 2) });
            }).finally(() => res(null));
        }),
        new Promise(res => setTimeout(() => {
            errors.push({ url: endpoint.origin, error: "Timeout Error after " + (timeoutTimer / 1000) + " seconds" });
            res(null);
        }, timeoutTimer))
    ])));
    const uniqueErrors = [];
    errors.forEach(el => {
        const exists = uniqueErrors.findIndex(el2 => el2.error = el.error);
        if (exists === -1) {
            el.endpoints = [el.url];
            delete el.url;
            uniqueErrors.push(el);
        }
        else {
            uniqueErrors[exists].endpoints.push(el.url);
        }
    });
    return { receipts, errors: uniqueErrors };
}
export function pickRpc() {
    const pick = rpcs[rand(0, rpcs.length - 1)];
    // console.log('pickRPC:', pick.endpoint.toString())
    return pick;
}
export function pickEndpoint() {
    const pick = rpcs[rand(0, rpcs.length - 1)];
    // console.log('pickRPC:', pick.endpoint.toString())
    return pick.endpoint.toString();
}
//# sourceMappingURL=eosio.js.map