//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const ba = require('bitcoinaverage');

const app = express();

var publicKey = 'YOURKEYHERE';
var secretKey = 'YOURKEYHERE';
var restClient = ba.restfulClient(publicKey, secretKey);

app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  console.log(req.body.cryptoSelection);
  console.log(req.body.currencySelection);

  var cryptoFiat = req.body.cryptoSelection + req.body.currencySelection

  restClient.getTickerDataPerSymbol('global', req.body.cryptoSelection + req.body.currencySelection, function(response) {
    console.log(response);

    var data = JSON.parse(response);
    var currentData = data.display_timestamp;
    var price = data.last;

    console.log(price);

    res.write("<p>The current data is " + currentData + "</p>");
    res.write("<h1>The price of " + req.body.cryptoSelection + " is " + price + " " + req.body.currencySelection + "</h1>");

    res.send();

  }, function(error) {
    console.log(error);
  });
});

app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});

// Utility Methods
var getBitcoinURLFromSelection = function(crypto, currency) {
  return "https://apiv2.bitcoinaverage.com/indices/global/ticker/all?crypto=" + crypto + "&fiat=" + currency;
}
