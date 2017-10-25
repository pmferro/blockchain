var bitcore = require('bitcore-lib')
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet


var wif = 'cTgHUgnbAKNxsc2tVWGmTF4AfqKKUddiD11HozsQA6tbgj7NdJyh';
var privkey1 = new bitcore.PrivateKey(wif)
var address1 = new bitcore.PrivateKey(wif).toAddress();

wif = 'cSJZdW92HyX9oz14Y5gG2fBPJBzxA26RjQfXh1FbvMskVhLokjYu';
var privkey2 = new bitcore.PrivateKey(wif)
var address2 = new bitcore.PrivateKey(wif).toAddress();

/*console.log(privkey1.toString())
console.log(address1.toString())
console.log(privkey2.toString())
console.log(address2.toString())*/

//private1: b5e5892b63ea338c9bb662633b51aa687b4f59a9ce738cfe1261bc565a893c9e
//address1: mv2GkTS8QuAmsKmxykHjK3Yx399JjjNj65
//private2: 8ce285f713dfa20150df0ab5746b680fd557aa826e9b4547403dff7aa0b2da0a
//address2: mqTPfp6dXspc3haRhixALatVnu1xcYJmWh

var privateKeys = [
  new bitcore.PrivateKey('b5e5892b63ea338c9bb662633b51aa687b4f59a9ce738cfe1261bc565a893c9e'),
  new bitcore.PrivateKey('8ce285f713dfa20150df0ab5746b680fd557aa826e9b4547403dff7aa0b2da0a')
];
var publicKeys = privateKeys.map(bitcore.PublicKey);
//var address = new bitcore.Address(publicKeys, 2); // 2 of 2
var address = new bitcore.Address("2N3CNcF1sdYnwXQFrkdJQbgTmTaDtGZ1HVB")
// 2N3CNcF1sdYnwXQFrkdJQbgTmTaDtGZ1HVB

console.log(address.toString())

var Insight = require("bitcore-explorers").Insight;
var insight = new Insight("testnet")

// esto se puede reemplazar por el codigo de simple-transaction que trae el utxo
// asi no necesito cambiar el txID ...
var utxo = {
  "txId" : "5775431cb1d08774c04b918220321d53a8485be21e30aac4052ef0ed53844f29",
  "outputIndex" : 1,
  "address" : address.toString(),
  "script" : new bitcore.Script(address).toHex(),
  "satoshis" : 62640000
};

var transaction = new bitcore.Transaction()

    const unit = bitcore.Unit;
    const minerFee = unit.fromMilis(1.2).toSatoshis();
    const transactionAmount = unit.fromMilis(20).toSatoshis();
    const transactionAmountBTC = unit.fromSatoshis(transactionAmount).toBTC();

    transaction.from(utxo, publicKeys, 2)
    transaction.to('mgNdmwJY7wKuhEeGMVYi9sdUXxeyHtd2fv', transactionAmount)
    transaction.fee(minerFee)
    transaction.change(address)
    // transaction.sign(privkey1) // si firma uno solo sale error 'Some inputs have not been fully signed'
    transaction.sign(privateKeys)   
    transaction.serialize()
    
  insight.broadcast(transaction, function(error, transactionId) {
    if (error) {
      console.log(error);
    } else {
        console.log("Enviados: " + transactionAmount + " satoshis, equivalentes a " + transactionAmountBTC  + " BTC");
        console.log("From: " + "2N3CNcF1sdYnwXQFrkdJQbgTmTaDtGZ1HVB");
        console.log("To: " + "mgNdmwJY7wKuhEeGMVYi9sdUXxeyHtd2fv");
        console.log("ID de Transacción: " + transactionId);
    }
  });
