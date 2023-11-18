const secp = require("ethereum-cryptography/secp256k1")
const hashMessage = require('./hash')

async function signMessage(msg, privateKey) {
    const hash = hashMessage(msg)
    const sign = await secp.sign(hash, privateKey, { recovered: true });
    return sign
}

module.exports = signMessage;