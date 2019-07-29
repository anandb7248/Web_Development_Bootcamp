const mongoose = require('mongoose');

// URL: <server>/<Database, if it doesn't exist a new one will be created>
mongoose.connect("mongodb://localhost:27017/fruitsDB", { useNewUrlParser: true});

const fruitScheme = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "What's the name of the fruit?"]
  },
  rating: {
    type: Number,
    min: 1,
    max: 2
  },
  review: String
});

// First Parm: String, singular, name of collection,
// in MongoDB it will be saved all lower case
// Second Parm: Scheme
const Fruit = mongoose.model("Fruit", fruitScheme);

const fruit = new Fruit({
  name: "Apple",
  rating: 7,
  review: "Pretty solid as a fruit."
});

//fruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

const personJohn = new Person({
  name: "John",
  age: 37
});

//personJohn.save();

const banana = new Fruit({
  name: "Banana",
  rating: 6,
  review: "Weird texture."
});

const kiwi = new Fruit({
  name: "Kiwi",
  rating: 4,
  review: "Too sweet for me."
});

const orange = new Fruit({
  name: "Orange",
  rating: 8,
  review: "Tastes great."
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
