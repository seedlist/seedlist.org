import {ethers} from 'ethers';
import Web3 from "web3";
import CryptoJS from 'crypto-js';
let web3 = new Web3();

export function shortenAddress(address) {
  if (!address) return "N/A";
  return `${address.substring(0, 6)}...${address.substring(36)}`;
}

export function calculateMultiHash(str, n){
  var sha256Value = "";
  for (var i=0;i<n;i++){
    sha256Value = ethers.utils.sha256(ethers.utils.toUtf8Bytes(str))
    str = sha256Value
  }
  return sha256Value
}

export function calculateValidSeed(str1, str2){
  const DEEPING = 64;
  let h1 = calculateMultiHash(str1, 2);
  let h2 = calculateMultiHash(str2, 2);
  for(var i=0; i<DEEPING; i++){
    let pair1 = calculatePairsBaseOnSeed(h1);
    let pair2 = calculatePairsBaseOnSeed(h2);

    h1 = web3.eth.accounts.sign(h2,pair1.privKey).messageHash;
    h2 = web3.eth.accounts.sign(h1, pair2.privKey).messageHash;
  }
  return ethers.utils.sha256(ethers.utils.toUtf8Bytes(h1+h2))
}

export function calculateWalletAddressBaseOnSeed(seed){
  return ethers.utils.computeAddress(seed);
}

export function calculatePairsBaseOnSeed(seed){
  var secp256k1=require('secp256k1');
  var createKeccakHash=require('keccak');

  var privKey = Buffer.from(seed.slice(2),'hex');
  var pubKey=secp256k1.publicKeyCreate(privKey,false).slice(1);

  return {privKey:privKey.toString('hex'), pubKey: pubKey.toString('hex')};

}

export function calculateStringKeccak256(str){
  return ethers.utils.solidityKeccak256(['string'],[str]);
}

export function encryptMessage(message, password){
  return CryptoJS.AES.encrypt(message, password).toString();
}

export function decryptMessage(message, password){
  return CryptoJS.AES.decrypt(message,password).toString(CryptoJS.enc.Utf8)
}

export function signMessage(message, privKey){
  return web3.eth.accounts.sign(message, privKey);

}
