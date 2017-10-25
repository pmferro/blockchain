var bitcore = require('bitcore-lib')
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet


var wif = 'cTgHUgnbAKNxsc2tVWGmTF4AfqKKUddiD11HozsQA6tbgj7NdJyh';
var privkey1 = new bitcore.PrivateKey(wif)
var address1 = new bitcore.PrivateKey(wif).toAddress();

wif = 'cSJZdW92HyX9oz14Y5gG2fBPJBzxA26RjQfXh1FbvMskVhLokjYu';
var privkey2 = new bitcore.PrivateKey(wif)
var address2 = new bitcore.PrivateKey(wif).toAddress();

wif = 'cQdM4RQUjR8J8hjFLpVqZ4fASVhiyTk96oaibEiESjx7r1o8UA65';
var privkey3 = new bitcore.PrivateKey(wif)
var address3 = new bitcore.PrivateKey(wif).toAddress();

console.log(privkey1.toString())
console.log(address1.toString())
console.log(privkey2.toString())
console.log(address2.toString())
console.log(privkey3.toString())
console.log(address3.toString())

//private1: b5e5892b63ea338c9bb662633b51aa687b4f59a9ce738cfe1261bc565a893c9e
//address1: mv2GkTS8QuAmsKmxykHjK3Yx399JjjNj65
//private2: 8ce285f713dfa20150df0ab5746b680fd557aa826e9b4547403dff7aa0b2da0a
//address2: mqTPfp6dXspc3haRhixALatVnu1xcYJmWh
//private3: 5adf75a0ee303c0d79099c2d6309ea29111dabde1f5edd49d2a1052f916791ea
//address3: mmHcXBQgP77mNEgSkhonKYov1HcK5XyytU

// nueva prueba con 3 keys y que dos sean requeridas
var privateKeys = [
  new bitcore.PrivateKey('b5e5892b63ea338c9bb662633b51aa687b4f59a9ce738cfe1261bc565a893c9e'),
  new bitcore.PrivateKey('8ce285f713dfa20150df0ab5746b680fd557aa826e9b4547403dff7aa0b2da0a'),
  new bitcore.PrivateKey('5adf75a0ee303c0d79099c2d6309ea29111dabde1f5edd49d2a1052f916791ea')
];
var publicKeys = privateKeys.map(bitcore.PublicKey);
//var address = new bitcore.Address(publicKeys, 2); // 2 of 2
var address = new bitcore.Address("2NBC3gwUgkYAfbmULeR4NKevPYJFccDb3m7")
// 2N3CNcF1sdYnwXQFrkdJQbgTmTaDtGZ1HVB // direccion de 2 priv key
// 2NBC3gwUgkYAfbmULeR4NKevPYJFccDb3m7 // direccion de 3 priv key para prueba donde dos firmas sean requeridas

console.log(address.toString())

var Insight = require("bitcore-explorers").Insight;
var insight = new Insight("testnet")

// esto se puede reemplazar por el codigo de simple-transaction que trae el utxo
// asi no necesito cambiar el txID ...
var utxo = {
  "txId" : "ef6a58862c36a34753d624b88d23bdbe09bcfab9eb7e6ba0b1ee201731973d41",
  "outputIndex" : 1,
  "address" : address.toString(),
  "script" : new bitcore.Script(address).toHex(),
  "satoshis" : 124960000
};

var transaction = new bitcore.Transaction()

    const unit = bitcore.Unit;
    const minerFee = unit.fromMilis(1.2).toSatoshis();
    const transactionAmount = unit.fromMilis(50).toSatoshis();
    const transactionAmountBTC = unit.fromSatoshis(transactionAmount).toBTC();

    transaction.from(utxo, publicKeys, 2)
    transaction.to('2N8hwP1WmJrFF5QWABn38y63uYLhnJYJYTF', transactionAmount) //mandando a la address de faucet para devolver algunos BTC :-)
    transaction.fee(minerFee)
    transaction.change(address)
    transaction.sign([privkey1, privkey2]) // si firma uno solo sale error 'Some inputs have not been fully signed'
    //transaction.sign(privateKeys)   
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