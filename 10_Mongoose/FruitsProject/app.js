const mongoose = require('mongoose');

// URL: <server>/<Database, if it doesn't exist a new one will be created>
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "What's the name of the fruit?"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

// First Parm: String, singular, name of collection,
// in MongoDB it will be saved all lower case
// Second Parm: Scheme
const Fruit = mongoose.model("Fruit", fruitSchema);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

const Person = mongoose.model("Person", personSchema);

//personJohn.save();

const banana = new Fruit({
  name: "Banana",
  rating: 6,
  review: "Weird texture."
});

const person = new Person({
  name: "Kevin",
  age: 25,
  favoriteFruit: banana
});

const orange = new Fruit({
  name: "Orange",
  rating: 8,
  review: "Tastes great."
});

// person.save();
Person.updateOne({name:"John"}, {favoriteFruit: orange}, function(err){
  if(err){
    console.log(err);
  }else{
    console.log("Success");
  }
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 4,
  review: "Too sweet for me."
});



// Fruit.insertMany([banana, kiwi, orange], function(err){
//   if(err){
//     console.log(err);
//   }else{
//     console.log("Successfully saved all the fruits");
//   }
// });

Fruit.find(function(err, fruits){
  if(err){
    console.log(err);
  }else{
    mongoose.connection.close();

    fruits.forEach(function(fruit){
      console.log(fruit.name);
    });
  }
});
