var bitcore = require('bitcore-lib')
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet

var bip39 = require('bip39') // npm i -S bip39
var crypto = require('crypto')

// what you describe as 'seed'
var  randomBytes = crypto.randomBytes(16) // 128 bits is enough

// your 12 word phrase
var mnemonic = bip39.entropyToMnemonic(randomBytes.toString('hex')) 

// piso la var para poder seguir creando keypairs que derivan del mismo seed
mnemonic = "relax zebra age cute swallow pumpkin hand spice abuse glory heart sadness"

// what is accurately described as the wallet seed
var seed = bip39.mnemonicToSeed(mnemonic) // you'll use this in #3 below
console.log(mnemonic)
// use esta seed generada: relax zebra age cute swallow pumpkin hand spice abuse glory heart sadness

var bitcoin = require('bitcoinjs-lib') // npm i -S bitcoinjs-lib

var bitcoinNetwork = bitcoin.networks.testnet
var hdMaster = bitcoin.HDNode.fromSeedBuffer(seed, bitcoinNetwork) // seed from above

// genera nuevas keys
var key1 = hdMaster.derivePath('m/0')
var key2 = hdMaster.derivePath('m/1')
var key3 = hdMaster.derivePath('m/2')

console.log(key1.keyPair.toWIF())
console.log(key2.keyPair.toWIF())
console.log(key3.keyPair.toWIF())
