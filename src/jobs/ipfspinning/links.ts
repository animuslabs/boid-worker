export const endpoints:string[][] = [
  ["EOS Endpoint", "https://eos.api.animus.is"],
  ["Telos Endpoint", "https://telos.api.animus.is"],
  ["Telos Testnet Endpoint", "https://telos.testnet.boid.animus.is"],
  ["IPFS Endpoint", "https://ipfs.animus.is/ipfs/"], // 3
  ["EOS AtomicAssets", "https://eos.api.atomicassets.io"], // 4
  ["WAX Endpoint", "https://wax.eu.eosamsterdam.net"] // 5
]

export const IPFSnodes = [
  { url: "http://192.168.0.13:5001", name: "Node 1" },
  { url: "http://192.168.0.14:5001", name: "Node 2" },
  { url: "http://192.168.0.109:5001", name: "Node 3" },
  { url: "http://192.168.0.7:5001", name: "Node 4" },
  { url: "http://192.168.0.8:5001", name: "Node 5" }
]

export const teamNames = [
  { name: "Boid", id: 0 }
]

// used by atomicassets functions to get the collection names
export const collectionsEOS = [
  "avatar.boid", "boid4science", "kisscollecti", "umineboidnow", "powerup.nfts"
]
export const collectionsWAX = [
  "boid4science", "alienavatars"
]
export const collectionsTelos = [
  "nft.boid", "artsworkshop"
]
