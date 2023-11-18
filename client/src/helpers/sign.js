import {sign} from "ethereum-cryptography/secp256k1"
import hashMessage from './hash'

export default async function signMessage(msg, privateKey) {
    const hash = hashMessage(msg)
    const signature = await sign(hash, privateKey, { recovered: true });
    return signature
}