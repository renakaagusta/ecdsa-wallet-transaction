import { keccak256 } from "ethereum-cryptography/keccak";

export default function getAddress(publicKey) {
    const slicedPublicKey = publicKey.slice(1)
    const hash = keccak256(slicedPublicKey)
    return hash.slice(-20)
}