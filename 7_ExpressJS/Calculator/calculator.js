//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var num1 = Number(req.body.num1);
  var num2 = Number(req.body.num2);

  res.send("The result is " + (num1 + num2));
});

app.listen(3000, function() {
  console.log("Listening to port 3000");
});
