var bitcore = require('bitcore-lib')
bitcore.Networks.defaultNetwork = bitcore.Networks.testnet

//var privateKey = new bitcore.PrivateKey()
//console.log(privateKey.toString())

var key = 'bbf22a6119e37f9ec7dad5633d6dccaf0663c9697c9edc0588c1c5cee982ddf1'
var privateKey = new bitcore.PrivateKey(key)
var publicKey = privateKey.publicKey
var address = publicKey.toAddress() // mgNdmwJY7wKuhEeGMVYi9sdUXxeyHtd2fv
var toaddress = bitcore.Address.fromString('n2XmGDQmMbe4SCVDWafn7S44SGx42BgTRY')
//console.log(toaddress.toString())

var Insight = require("bitcore-explorers").Insight;
var insight = new Insight("testnet")

insight.getUnspentUtxos(address, function(err, utxos){
    if (err) {
        console.log('error')
    } else {
        //console.log(utxos)

        var tx = new bitcore.Transaction()
        const unit = bitcore.Unit;
        const minerFee = unit.fromMilis(0.4).toSatoshis();
        const transactionAmount = unit.fromMilis(5).toSatoshis();
        const transactionAmountBTC = unit.fromSatoshis(transactionAmount).toBTC();
        
        tx.from(utxos)
        tx.to(toaddress, transactionAmount)
        tx.fee(minerFee)
        tx.change(address)
        tx.sign(privateKey)
        tx.serialize();

        insight.broadcast(tx, function(error, transactionId) {
            if (error) {
              console.log(error);
            } else {
                console.log("Enviados: " + transactionAmount + " satoshis, equivalentes a " + transactionAmountBTC  + " BTC");
                console.log("Dirección de envío: " + toaddress);
                console.log("ID de Transacción: " + transactionId);
            }
        });
    }
})