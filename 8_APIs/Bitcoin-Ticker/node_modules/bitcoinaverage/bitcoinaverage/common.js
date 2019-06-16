'use strict';

const crypto = require('crypto-js');
const request = require('request');

module.exports = {
    getSignature: getSignature,
    getResourceForFullUrl: getResourceForFullUrl
};

function getSignature(publicKey, secretKey) {
    var timestamp = Math.floor(Date.now() / 1000);
    var payload = timestamp + '.' + publicKey;
    var hash = crypto.HmacSHA256(payload, secretKey);
    var hex_hash = crypto.enc.Hex.stringify(hash);
    return payload + "." + hex_hash;
}

function defaultErrorHandler(error, response, body){
    if (error){
        console.log("Error in BA request");
        console.log(error);
    }
    if (response){
        console.log("Error in BA response. Status Code: " + response.statusCode + " body: " + body);
    }
}

function getResourceForFullUrl(url, publicKey, secretKey, handleResponseFunction, errorCallback) {
    var signature = getSignature(publicKey, secretKey);
    var options = {
        url: url,
        headers: {
            'X-Signature': signature
        }
    };
    if (!errorCallback){
        errorCallback = defaultErrorHandler;
    }
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            handleResponseFunction(body);
        }else {
            errorCallback(error, response, body);
        }
    });
}
