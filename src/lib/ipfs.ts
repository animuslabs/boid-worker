import { CID } from "multiformats/cid"
import * as json from "multiformats/codecs/json"
import { sha256 } from "multiformats/hashes/sha2"
import env from "lib/env"
import { create } from "ipfs-http-client"
console.log("ipfs:", env.ipfs)

export const ipfsClient = create(env.ipfs)

export async function jsonToCID(data:Record<string, any>):Promise<CID> {
  const bytes = json.encode(data)
  const hash = await sha256.digest(bytes)
  const cid = CID.create(1, json.code, hash)
  return cid
}

export async function jsonToBytes(data:Record<string, any>) {
  const bytes = json.encode(data)
  return bytes
}