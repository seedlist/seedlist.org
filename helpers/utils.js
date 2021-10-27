import {ethers} from 'ethers';
import Web3 from "web3";
import CryptoJS from 'crypto-js';
import  {syncScrypt} from 'scrypt-js';
//import argon2i from 'argon2';
let web3 = new Web3();

const CHARS="1qaz!QAZ2w?sx@WSX.(=]3ec#EDC/)P:4rfv$RF+V5t*IK<9og}b%TGB6OL>yhn^YHN-[d'_7ujm&UJ0p;{M8ik,l|";
const LABEL_SALT_LEN = 32;
const CONTENT_PASSWORD_SALT_LEN = 32;

export function shortenAddress(netName, address) {
  if (!address) return "N/A";
  return netName + ' | ' + `${address.substring(0, 6)}...${address.substring(36)}`;
}

export function calculateOnceHash(str){
    return calculateMultiHash(str,1);
}

export function calculateMultiHash(str, n){
  var sha256Value = "";
  var tmpStr = str;
  for (var i=0;i<n;i++){
    sha256Value = ethers.utils.sha256(ethers.utils.toUtf8Bytes(tmpStr));
    tmpStr = sha256Value;
  }
  return sha256Value
}

function getHashStep0_8(keyspace, password, label) {
  const onceHash = calculateOnceHash(keyspace+password+label);
  let deep = onceHash.substring(0,6)+onceHash.substring(onceHash.length-4);
  let step = parseInt(deep, 16)%8;
  return step==0?8 : step;
}

export function getHashStep8_16(keyspace) {
  const onceHash = calculateOnceHash(keyspace);
  let deep = onceHash.substring(0,6)+onceHash.substring(onceHash.length-4);
  let step = parseInt(deep, 16)%8;
  return step+8;
}

export function getLabelHashStep32_64(str){
  const onceHash = calculateOnceHash(str);
  let deep = onceHash.substring(0,6)+onceHash.substring(onceHash.length-4);
  let step = parseInt(deep, 16)%32;
  return step+32;
}

function getHashStep32_64(str1, str2) {
  const onceHash = calculateOnceHash(str1+str2);
  let deep = onceHash.substring(0,6)+onceHash.substring(onceHash.length-4);
  let step = parseInt(deep, 16)%32;
  return step+32;
}

export function calculateValidSeed(str1, str2){
  const DEEPING = getHashStep32_64(str1, str2);
  let h1 = calculateMultiHash(str1, 2);
  let h2 = calculateMultiHash(str2, 2);
  for(var i=0; i<DEEPING; i++){
    let pair1 = calculatePairsBaseOnSeed(h1+h2);
    let pair2 = calculatePairsBaseOnSeed(h2+h1);

    h1 = web3.eth.accounts.sign(h2+h1, pair1.privKey).messageHash;
    h2 = web3.eth.accounts.sign(h1+h2, pair2.privKey).messageHash;
  }

  let saltStr = "";
  for(let i=0;i<LABEL_SALT_LEN; i++){
    let saltChar = getSaltChar(ethers.utils.sha256(ethers.utils.toUtf8Bytes(h1+h2+saltStr)));
    saltStr += saltChar;
  }

  let scryptRes = syncScrypt(ethers.utils.toUtf8Bytes(h1+h2), ethers.utils.toUtf8Bytes(saltStr), 32,64,16,64);

  return ethers.utils.sha256(scryptRes);
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

function getLabelPassword(keyspace) {
  let deep = getHashStep8_16(keyspace);
  let password = calculateMultiHash(keyspace, deep);
/*
    argon2i.hash(password).then(res=>{
      console.log("argon2 hash:",res);
    }); //default is argon2i, 防止侧信道攻击
*/
  let saltStr = "";
  for(let i=0;i<LABEL_SALT_LEN; i++){
    let saltChar = getSaltChar(ethers.utils.sha256(ethers.utils.toUtf8Bytes(password+saltStr)));
    saltStr += saltChar;
  }

  let s1 = syncScrypt(ethers.utils.toUtf8Bytes(password), ethers.utils.toUtf8Bytes(saltStr), 32,64,16,64);
  return s1.toString();
}

export function getEncryptLabel(keyspace, label) {
  let password = getLabelPassword(keyspace);
  return encryptMessage(label, password);
}

export function getDecryptLabel(keyspace, cryptoLabel) {
  let password = getLabelPassword(keyspace);
  return decryptMessage(cryptoLabel, password);
}

function getSaltChar(onceHash) {
  let deep = onceHash.substring(0,6)+onceHash.substring(onceHash.length-4);
  return CHARS[parseInt(deep, 16)%CHARS.length];
}

function getContentPassword(keyspace, password, label) {
  let DEEPING = getHashStep0_8(keyspace, password, label);

  let h1 = calculateMultiHash(keyspace, 2);
  let h2 = calculateMultiHash(password, 2);
  let h3 = calculateMultiHash(label, 2);
  for(let i=0; i<DEEPING; i++){
    let pair1 = calculatePairsBaseOnSeed(h1+h2);
    let pair2 = calculatePairsBaseOnSeed(h2+h3);
    let pair3 = calculatePairsBaseOnSeed(h3+h1);

    h1 = web3.eth.accounts.sign(h3+h2, pair1.privKey).messageHash;
    h2 = web3.eth.accounts.sign(h1+h3, pair2.privKey).messageHash;
    h3 = web3.eth.accounts.sign(h2+h1, pair3.privKey).messageHash;
  }

  let originHash = ethers.utils.sha256(ethers.utils.toUtf8Bytes(h1+h2+h3))

  
  let saltStr = "";
  for(let i=0;i<LABEL_SALT_LEN; i++){
    let saltChar = getSaltChar(ethers.utils.sha256(ethers.utils.toUtf8Bytes(originHash+saltStr)));
    saltStr += saltChar;
  }

  originHash = syncScrypt(ethers.utils.toUtf8Bytes(originHash), ethers.utils.toUtf8Bytes(saltStr), 32,64,16,64).toString();

  for(let i=0;i<CONTENT_PASSWORD_SALT_LEN; i++){
    let saltChar = getSaltChar(ethers.utils.sha256(ethers.utils.toUtf8Bytes(originHash)));
    let onceHash = calculateOnceHash(originHash);
    let random = onceHash.substring(0,6)+onceHash.substring(onceHash.length-4);
    let position = parseInt(random, 16)%originHash.length;
    originHash = originHash.substr(0, position)+ saltChar + originHash.substr(position, originHash.length-position);
  }

  return originHash;
}

export function getEncryptContent(keyspace, password, label, content) {
  let pwd = getContentPassword(keyspace, password, label);
  return encryptMessage(content, pwd);  //VDF utilimate
}

export function getDecryptContent(keyspace, password, label, encryptContent){
  let pwd = getContentPassword(keyspace, password, label);
  return decryptMessage(encryptContent, pwd);
}

export function getAddrAndEtherSignForStorage(keyspace, password) {
  let seed = calculateValidSeed(keyspace, password);
  let addr = calculateWalletAddressBaseOnSeed(seed);
  let addr0 = calculateWalletAddressBaseOnSeed(calculateOnceHash(addr+calculateOnceHash(keyspace+password)));
  let pairs = calculatePairsBaseOnSeed(calculateOnceHash(addr+calculateOnceHash(keyspace+password)));
  let message = "\x19Ethereum Signed Message:\n"+addr0.length+addr0;
  let signature = signMessage(message, pairs.privKey);
  let random256Num = ethers.utils.sha256(ethers.utils.toUtf8Bytes(addr0));

  return{
    Addr:  addr,
    Addr0: addr0,
    Sign:  signature,
    RandomNum:random256Num
  };
}

export function getAddrAndEtherSignForAddingKey(keyspace, password, label) {
  let seed = calculateValidSeed(keyspace, password);
  let addr = calculateWalletAddressBaseOnSeed(seed);
  let addr0 = calculateWalletAddressBaseOnSeed(calculateOnceHash(addr+calculateOnceHash(keyspace+password+label)));
  let pairs = calculatePairsBaseOnSeed(calculateOnceHash(addr+calculateOnceHash(keyspace+password+label)));
  let message = "\x19Ethereum Signed Message:\n"+addr0.length+addr0;
  let signature = signMessage(message, pairs.privKey);

  return{
    Addr:  addr,
    Addr0: addr0,
    Sign:  signature
  };
}

export function getAddrAndEtherSign(keyspace, password) {
  let seed = calculateValidSeed(keyspace, password);
  let addr = calculateWalletAddressBaseOnSeed(seed);
  let pairs = calculatePairsBaseOnSeed(seed);
  let message = "\x19Ethereum Signed Message:\n"+addr.length+addr;
  let signature = signMessage(message, pairs.privKey);

  return{
    Addr: addr,
    Sign: signature
  };
}

export function getAddressSign(seed) {
  let addr = calculateWalletAddressBaseOnSeed(seed);
  let pairs = calculatePairsBaseOnSeed(seed);
  let message = "\x19Ethereum Signed Message:\n"+addr.length+addr;
  let signature = signMessage(message, pairs.privKey);
  return signature
}
