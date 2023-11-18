const secp = require("ethereum-cryptography/secp256k1")
const hashMessage = require("./hash")

async function recoverKey(message, signature, recoveryBit) {
    const bytes = secp.recoverPublicKey(hashMessage(message), signature, recoveryBit)
    return bytes
}

module.exports = recoverKey;