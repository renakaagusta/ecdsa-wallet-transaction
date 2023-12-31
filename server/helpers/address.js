const { keccak256 } = require("ethereum-cryptography/keccak");

function getAddress(publicKey) {
    const slicedPublicKey = publicKey.slice(1)
    const hash = keccak256(slicedPublicKey)
    return hash.slice(-20)
}

module.exports = getAddress;