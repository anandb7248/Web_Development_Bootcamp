const express = require('express');
const bodyParser = require('body-parser');

const app = express();

var listItems = ["Web Dev for 1 Hour"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
  var today = new Date();

  var options = {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  };

  var day = today.toLocaleDateString("en-US", options);

  res.render("list", {
    kindOfDay: day,
    listItems: listItems
  });
});

app.post("/", function(req, res){
  listItems.push(req.body.newTodo);

  res.redirect("/");
});

app.listen(3000, function() {
  console.log("Server running on port 3000.");
});
