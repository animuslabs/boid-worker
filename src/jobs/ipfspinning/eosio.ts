import { endpoints } from "./links"
import fetch from "node-fetch"
import { JsonRpc, RpcError } from "eosjs"
// import { TextEncoder, TextDecoder } from 'util';
// import { JsSignatureProvider } from 'eosjs/dist/eosjs-jssig.js'; 

const EOSrpc = new JsonRpc(endpoints[0][1], { fetch })
const Telosrpc = new JsonRpc(endpoints[1][1], { fetch })
export const TelosTestrpc = new JsonRpc(endpoints[2][1], { fetch })
const WAXrpc = new JsonRpc(endpoints[5][1], { fetch })

export const RPCendpoints = [EOSrpc, Telosrpc, TelosTestrpc, WAXrpc]
