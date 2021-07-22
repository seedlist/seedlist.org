(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[9321],{9321:function(e,t,i){"use strict";i.r(t),i.d(t,{generateAddresses:function(){return o},isValidPath:function(){return u}});var r=i(49840),n=i.n(r),a=i(21964),s=i(48764),p=a.publicToAddress,c=a.toChecksumAddress;function o(e,t){var i=e.publicKey,r=e.chainCode,a=e.path,o=new(n());o.publicKey=new s.Buffer(i,"hex"),o.chainCode=new s.Buffer(r,"hex");for(var u=[],d=t;d<5+t;d++){var h=o.deriveChild(d),f=p(h.publicKey,!0).toString("hex");u.push({dPath:"".concat(a,"/").concat(d),address:c("0x".concat(f))})}return u}function u(e){var t=e.split("/");if("m"!==t[0])return!1;if("44'"!==t[1])return!1;if("60'"!==t[2]&&"1'"!==t[2])return!1;if(void 0===t[3])return!0;var i=Number(t[3].slice(0,-1));if(isNaN(i)||i<0||"'"!==t[3].slice(-1))return!1;if(void 0===t[4])return!0;var r=Number(t[4]);if(isNaN(r)||r<0)return!1;if(void 0===t[5])return!0;var n=Number(t[5]);return!(isNaN(n)||n<0)}},49840:function(e,t,i){var r=i(69282),n=i(89509).Buffer,a=i(55835),s=i(58334),p=i(17221),c=n.from("Bitcoin seed","utf8"),o=2147483648,u={private:76066276,public:76067358};function d(e){this.versions=e||u,this.depth=0,this.index=0,this._privateKey=null,this._publicKey=null,this.chainCode=null,this._fingerprint=0,this.parentFingerprint=0}function h(e,t,i){var r=n.allocUnsafe(78);r.writeUInt32BE(t,0),r.writeUInt8(e.depth,4);var a=e.depth?e.parentFingerprint:0;return r.writeUInt32BE(a,5),r.writeUInt32BE(e.index,9),e.chainCode.copy(r,13),i.copy(r,45),r}function f(e){var t=a.createHash("sha256").update(e).digest();return a.createHash("ripemd160").update(t).digest()}Object.defineProperty(d.prototype,"fingerprint",{get:function(){return this._fingerprint}}),Object.defineProperty(d.prototype,"identifier",{get:function(){return this._identifier}}),Object.defineProperty(d.prototype,"pubKeyHash",{get:function(){return this.identifier}}),Object.defineProperty(d.prototype,"privateKey",{get:function(){return this._privateKey},set:function(e){r.equal(e.length,32,"Private key must be 32 bytes."),r(!0===p.privateKeyVerify(e),"Invalid private key"),this._privateKey=e,this._publicKey=n.from(p.publicKeyCreate(e,!0)),this._identifier=f(this.publicKey),this._fingerprint=this._identifier.slice(0,4).readUInt32BE(0)}}),Object.defineProperty(d.prototype,"publicKey",{get:function(){return this._publicKey},set:function(e){r(33===e.length||65===e.length,"Public key must be 33 or 65 bytes."),r(!0===p.publicKeyVerify(e),"Invalid public key"),this._publicKey=n.from(p.publicKeyConvert(e,!0)),this._identifier=f(this.publicKey),this._fingerprint=this._identifier.slice(0,4).readUInt32BE(0),this._privateKey=null}}),Object.defineProperty(d.prototype,"privateExtendedKey",{get:function(){return this._privateKey?s.encode(h(this,this.versions.private,n.concat([n.alloc(1,0),this.privateKey]))):null}}),Object.defineProperty(d.prototype,"publicExtendedKey",{get:function(){return s.encode(h(this,this.versions.public,this.publicKey))}}),d.prototype.derive=function(e){if("m"===e||"M"===e||"m'"===e||"M'"===e)return this;var t=e.split("/"),i=this;return t.forEach((function(e,t){if(0!==t){var n=e.length>1&&"'"===e[e.length-1],a=parseInt(e,10);r(a<o,"Invalid index"),n&&(a+=o),i=i.deriveChild(a)}else r(/^[mM]{1}/.test(e),'Path must start with "m" or "M"')})),i},d.prototype.deriveChild=function(e){var t,i=e>=o,s=n.allocUnsafe(4);if(s.writeUInt32BE(e,0),i){r(this.privateKey,"Could not derive hardened child key");var c=this.privateKey,u=n.alloc(1,0);c=n.concat([u,c]),t=n.concat([c,s])}else t=n.concat([this.publicKey,s]);var h=a.createHmac("sha512",this.chainCode).update(t).digest(),f=h.slice(0,32),y=h.slice(32),l=new d(this.versions);if(this.privateKey)try{l.privateKey=n.from(p.privateKeyTweakAdd(n.from(this.privateKey),f))}catch(v){return this.deriveChild(e+1)}else try{l.publicKey=n.from(p.publicKeyTweakAdd(n.from(this.publicKey),f,!0))}catch(v){return this.deriveChild(e+1)}return l.chainCode=y,l.depth=this.depth+1,l.parentFingerprint=this.fingerprint,l.index=e,l},d.prototype.sign=function(e){return n.from(p.ecdsaSign(e,this.privateKey).signature)},d.prototype.verify=function(e,t){return p.ecdsaVerify(Uint8Array.from(t),Uint8Array.from(e),Uint8Array.from(this.publicKey))},d.prototype.wipePrivateData=function(){return this._privateKey&&a.randomBytes(this._privateKey.length).copy(this._privateKey),this._privateKey=null,this},d.prototype.toJSON=function(){return{xpriv:this.privateExtendedKey,xpub:this.publicExtendedKey}},d.fromMasterSeed=function(e,t){var i=a.createHmac("sha512",c).update(e).digest(),r=i.slice(0,32),n=i.slice(32),s=new d(t);return s.chainCode=n,s.privateKey=r,s},d.fromExtendedKey=function(e,t){var i=new d(t=t||u),n=s.decode(e),a=n.readUInt32BE(0);r(a===t.private||a===t.public,"Version mismatch: does not match private or public"),i.depth=n.readUInt8(4),i.parentFingerprint=n.readUInt32BE(5),i.index=n.readUInt32BE(9),i.chainCode=n.slice(13,45);var p=n.slice(45);return 0===p.readUInt8(0)?(r(a===t.private,"Version mismatch: version does not match private"),i.privateKey=p.slice(1)):(r(a===t.public,"Version mismatch: version does not match public"),i.publicKey=p),i},d.fromJSON=function(e){return d.fromExtendedKey(e.xpriv)},d.HARDENED_OFFSET=o,e.exports=d}}]);