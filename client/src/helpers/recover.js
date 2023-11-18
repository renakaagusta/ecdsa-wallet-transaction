import secp from "ethereum-cryptography/secp256k1";
import hashMessage from "./hash";

export default async function recoverKey(message, signature, recoveryBit) {
  const bytes = secp.recoverPublicKey(
    hashMessage(message),
    signature,
    recoveryBit
  );
  return bytes;
}
