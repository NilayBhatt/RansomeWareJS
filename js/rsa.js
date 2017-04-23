var ursa = require('ursa');
var key = ursa.generatePrivateKey(1024, 65537);
var privkeypem = key.toPrivatePem();
var pubkeypem = key.toPublicPem();


console.log(privkeypem.toString('ascii'));
console.log(pubkeypem.toString('ascii'));