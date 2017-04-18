var fileFinder = require('fs-finder');
var secureRandom = require('secure-random-string');

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq';

var files = fileFinder.from('/home').findFiles('*.foo');	


function encrypt(text){
  var cipher = crypto.createCipher(algorithm,password)
  var crypted = cipher.update(text,'utf8','hex')
  crypted += cipher.final('hex');
  return crypted;
}
 
function decrypt(text){
  var decipher = crypto.createDecipher(algorithm,password)
  var dec = decipher.update(text,'hex','utf8')
  dec += decipher.final('utf8');
  return dec;
}

var hw = "Hello World";

//console.log(currentPath);

console.log(files);

console.log(decrypt(encrypt(hw)));

console.log(secureRandom(64));
