var bitcore = require('bitcore-lib')
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet

var key = 'bbf22a6119e37f9ec7dad5633d6dccaf0663c9697c9edc0588c1c5cee982ddf1'
var privateKey = new bitcore.PrivateKey(key)

var exported = privateKey.toWIF();
console.log(exported.toString())