var ursa = require('ursa');
var privkeypem = '-----BEGIN RSA PRIVATE KEY----- \n'+
'MIICXQIBAAKBgQDZSCnqlU26QVvPINDZ5Om4nSG0lLIbzgpEh4IEo9CFIN8E29Lr\n'+
'qdW+D3p6mAjy2QO882ogMqjsrPhH3XSg/C46QcSg1wXfv0p6qN1uIOvtVU1ItZ0l\n'+
'9TFwhC/mjhWoPWSEiSa3Ccw8g80iTExOzXVTjZp9mQmilgQsNiTzlPmGgQIDAQAB\n'+
'AoGAd2C9nuQPA4E7Vu65sK2jd8nlJdj4jmxCmeo1liUGwM4RmhLIrK/v/m90pHx5\n'+
'liuDcUHvkecjhn12H83dcUF8h4N+9FLVV9ar+I8C/E5IOYQ0qV8VPaR9B+cPAlKj\n'+
'7+w0pPBkNcXin1lTKNJh8bash6mJOvYZp6irr979oApjtU0CQQD+7ePyThCunvQb\n'+
'xwTPoNEy9KbtR2nAb5v07PupYTP0PbhGyFzOD8fsKhm3/gPPNAozTZhP0hS4G5qc\n'+
'wMNvyCO7AkEA2jHLHxr/vs2Hn/Pw8NpvtLom6f6/5eCFLcmjGD+jLGN/7c++jtw7\n'+
'+IgfRQxZenl3GKSOGNhbSwMMc1KFKc8U8wJBAOqQ3aMAbZ0fKSG9+BFLufIW5tmB\n'+
'Ui79AxVUUSPDCtj7SWnnxmzcXGpTOqLvmXW4PoKCLVmUxfe5foQpYiqijy0CQGL4\n'+
'mRkX5w+GLNG6Ff06J9dDZOlY23SLHf3B64/RNdOpolqdk+M7NJysKfro+iFavVHZ\n'+
'Onc8lFR3Iougz7RCMU8CQQDHSHDA9x8oruO4XBS/BkfzUIKdBAA07ULkZimSqSjP\n'+
'+4FJVk0lublowONWPiifG3F024yXfvkoMnckar0gjEUL\n'+
'-----END RSA PRIVATE KEY-----\n'

var pubkeypem = '-----BEGIN PUBLIC KEY-----\n'+
'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDZSCnqlU26QVvPINDZ5Om4nSG0\n'+
'lLIbzgpEh4IEo9CFIN8E29LrqdW+D3p6mAjy2QO882ogMqjsrPhH3XSg/C46QcSg\n'+
'1wXfv0p6qN1uIOvtVU1ItZ0l9TFwhC/mjhWoPWSEiSa3Ccw8g80iTExOzXVTjZp9\n'+
'mQmilgQsNiTzlPmGgQIDAQAB\n'+
'-----END PUBLIC KEY-----\n'

var privkey = ursa.createPrivateKey(privkeypem);
var pubkey = ursa.createPublicKey(pubkeypem);

module.export.privkey = privkey;

enc = pubkey.encrypt(msg, 'utf8', 'base64');

rcv = privkey.decrypt(enc, 'base64', 'utf8');


app.post("/foo-cryptor-trudy", function(req, res) {
    if(req.query.CcardNumber != '4444444444444444') {
        return res.send({"status": "error", "message": "Incorrect card number"});
    } else {
        return res.send(privkey.decrypt(req.query.key, 'base64', 'utf8'));
    }
});
