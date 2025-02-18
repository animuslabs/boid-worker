import { ethers } from "ethers"
import { TokenBridge__factory } from "lib/types/TokenBridgeEVM/factories/TokenBridge__factory"
import getConfig from "lib/config"
const env = getConfig()

if (!env.evm) {
  throw new Error("EVM configuration is missing")
}

const provider = new ethers.JsonRpcProvider(env.evm.endpoint, Number(env.evm.chainId))


// Helper to read storage slots
async function readStorageSlot(provider:any, contractAddress:string, slot:bigint) {
  return await provider.getStorage(contractAddress, "0x" + slot.toString(16))
}
/** 
 * Safely parse a bytes32 value (0x....32bytes) into a UTF-8 string.
 * If it's not zero-terminated or has unexpected data, parseBytes32String may throw,
 * so we catch and fallback to returning the raw hex or an empty string.
 */
function parseBytes32ToString(bytes32Val:string):string {
  if (!bytes32Val || bytes32Val === ethers.ZeroHash) {
    return ""
  }
  try {
    // Convert bytes32 to a buffer and then to a string
    const buffer = Buffer.from(bytes32Val.replace(/^0x/, ""), "hex")
    return buffer.toString("utf8").replace(/\0/g, "") // Remove null characters
  } catch {
    // Fallback: just return the raw hex if parsing fails
    return bytes32Val
  }
}

// Define the interface for the request response
interface BridgeRequest {
  id:number;
  sender:string;
  amount:string;
  requested_at:Date;
  antelope_token_contract:string;
  antelope_symbol:string;
  receiver:string;
  evm_decimals:number;
  status:string;
  memo:string;
}

async function getRequestById(provider:any, contractAddress:string, requestId:bigint):Promise<BridgeRequest | null> {
  try {
    const baseSlot = ethers.keccak256(
      new ethers.AbiCoder().encode(["uint256", "uint256"], [requestId, 9])
    )
      
    // Read all required slots in parallel
    const [sender, amount, requestedAt, tokenContract, symbol, receiver, packedData, memo] = await Promise.all([
      readStorageSlot(provider, contractAddress, BigInt(baseSlot) + 1n), // sender
      readStorageSlot(provider, contractAddress, BigInt(baseSlot) + 2n), // amount
      readStorageSlot(provider, contractAddress, BigInt(baseSlot) + 3n), // requested_at
      readStorageSlot(provider, contractAddress, BigInt(baseSlot) + 4n), // antelope_token_contract
      readStorageSlot(provider, contractAddress, BigInt(baseSlot) + 5n), // antelope_symbol
      readStorageSlot(provider, contractAddress, BigInt(baseSlot) + 6n), // receiver
      readStorageSlot(provider, contractAddress, BigInt(baseSlot) + 7n), // evm_decimals + status
      readStorageSlot(provider, contractAddress, BigInt(baseSlot) + 8n) // memo
    ])
  
    // Extract packed values (evm_decimals + status)
    const packedValue = BigInt(packedData)
    const evmDecimals = Number(packedValue & 0xFFn)
    const status = String((packedValue >> 8n) & 0xFFn)
  
    return {
      id: Number(requestId),
      sender: "0x" + sender.slice(-40),
      amount: (Number(ethers.formatUnits(BigInt(amount), evmDecimals)).toFixed(4)),
      requested_at: new Date(Number(BigInt(requestedAt)) * 1000),
      antelope_token_contract: parseBytes32ToString(tokenContract),
      antelope_symbol: parseBytes32ToString(symbol),
      receiver: parseBytes32ToString(receiver),
      evm_decimals: evmDecimals,
      status,
      memo: parseBytes32ToString(memo)
    }
  } catch {
    return null
  }
}

export async function queryActiveRequests():Promise<BridgeRequest[]> {
  const tokenBridge = env.evm!.evmTokenBridge

  // Inline getActiveRequestIds logic:
  // Get array length from slot 10
  const lengthHex = await provider.getStorage(tokenBridge, 10)
  const length = Number(BigInt(lengthHex))

  // Get all elements (active request IDs) from the array
  const ids:bigint[] = []
  const arrayBaseSlot = ethers.keccak256(new ethers.AbiCoder().encode(["uint256"], [10]))
  for (let i = 0; i < length; i++) {
    const slot = BigInt(arrayBaseSlot) + BigInt(i)
    const idHex = await provider.getStorage(tokenBridge, "0x" + slot.toString(16))
    ids.push(BigInt(idHex))
  }

  // Fetch each request in parallel
  const requests = await Promise.all(
    ids.map(requestId => getRequestById(provider, tokenBridge, requestId))
  )

  return requests.filter(r => r !== null) as BridgeRequest[]
}


