const ethUtils = require("ethereumjs-util");
const { BadRequestException } = require("../helpers/errorResponse");
const { CONSTANTS, MESSAGES } = require("../configs");

const checkSignature = (nonce, signature) => {
  nonce = "\x19Ethereum Signed Message:\n" + nonce.length + nonce;
  nonce = ethUtils.keccak(Buffer.from(nonce));
  const sig = signature;
  const { v, r, s } = ethUtils.fromRpcSig(sig);
  const pubKey = ethUtils.ecrecover(ethUtils.toBuffer(nonce), v, r, s);
  const addrBuf = ethUtils.pubToAddress(pubKey);
  const addr = ethUtils.bufferToHex(addrBuf);
  return addr.toUpperCase();
};

module.exports = (req, res, next) => {
  const { walletAddress, signature } = req.body;

  const publicAddress = checkSignature(CONSTANTS.WALLET.signMessage, signature);

  if (publicAddress && publicAddress !== walletAddress.toUpperCase())
    throw new BadRequestException(
      MESSAGES.MIDDLEWARE.verifySignature.invalidSignature
    );

  next();
};
