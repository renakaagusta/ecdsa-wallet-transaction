const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils")
const getAddress = require("./address.js")

const privatekey = secp.utils.randomPrivateKey()

console.log("privateKey", toHex(privatekey))

const publicKey = secp.getPublicKey(privatekey)

console.log("publicKey", toHex(publicKey))

const address = getAddress(publicKey)

console.log("address", toHex(address))
