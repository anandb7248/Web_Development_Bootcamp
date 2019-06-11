//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

// Display Home Page for a Get Request
app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  var height = Number(req.body.height);
  var weight = Number(req.body.weight);

  res.send("Your BMI is " + (bmiCalculator(weight, height)));
});

app.listen(3000, function() {
  console.log("Listening to port 3000");
});

var bmiCalculator = function(weight, height) {
  return Math.round((weight * 703) / (height * height) * 100) / 100;
}
