const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const getAddress = require("./helpers/address.js");
const recoverKey = require("./helpers/recover.js");

app.use(cors());
app.use(express.json());

const wallets = [];
const balances = {};

// const balances = {
//   "0x69ea12ff759bf3251f8306d9d85aa66f916f2cec": 100,
//   "0x8b7ae8d8f82394f2889f445f0e0666a348440fc4": 50,
//   "0x5176e4cb751485593a52917386aa0fc083688c0e": 75,
// };

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", async (req, res) => {
  const { sender, recipient, amount, signature, recoveryBit } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  const recoveryPublicKey = await recoverKey(
    JSON.stringify({
      sender,
      amount,
      recipient,
    }),
    new Uint8Array(signature),
    recoveryBit
  );

  const recoveryAddress = getAddress(recoveryPublicKey);

  if (sender != toHex(recoveryAddress)) {
    res.status(400).send({ message: "Signature is not valid!" });
  }

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}

function generateWallet() {
  const privateKey = secp.utils.randomPrivateKey();
  const publicKey = secp.getPublicKey(privateKey);
  const address = getAddress(publicKey);
  return {
    privateKey,
    publicKey,
    address,
  };
}

function init() {
  for (let i = 0; i < 3; i++) {
    const wallet = generateWallet();
    wallets.push(wallet);
    balances[toHex(wallet.address)] = 100;
  }

  wallets.map((wallet, index) => {
    console.log(`WALLET ${index + 1}`);
    console.log(`private key : ${toHex(wallet.privateKey)}`);
    console.log(`public key : ${toHex(wallet.publicKey)}`);
    console.log(`address : ${toHex(wallet.address)}`);
  });

  console.log(balances);
}

init();
