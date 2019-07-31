const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/todoListDB", {useNewUrlParser: true});

// Schema
const itemsSchema = new mongoose.Schema({
  name : String
});

// Model
const Item = mongoose.model("Item", itemsSchema);

// Documents
const todoItemOne = new Item({
  name: "Welcome to your todolist!"
});

const todoItemTwo = new Item({
  name: "Hit the + button to add a new item."
});

const todoItemThree = new Item({
  name: "<-- Hit this to delete an item."
});

const defaultItems = [todoItemOne, todoItemTwo, todoItemThree]

Item.insertMany(defaultItems, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Successfully saved the documents");
  }
});

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  res.render("list", {
    listTitle: "Today",
    listItems: listItems
  });
});

app.get("/work", function(req, res){
  res.render("list", {
    listTitle: "Work List",
    listItems: workItems});
});

app.post("/", function(req, res){

  if(req.body.listSubmit === "Work"){
    workItems.push(req.body.newTodo);
    res.redirect("/work");
  }else{
    listItems.push(req.body.newTodo);
    res.redirect("/");
  }
});

app.listen(3000, function() {
  console.log("Server running on port 3000.");
});
