var buttonColors = ["red", "blue", "green", "yellow"];
var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var started = false;

// Detect Button Click
$("[type=button]").click(function() {
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);

  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

// Detect Keyboard Click
$(document).keypress(function(keyPress){

  if(keyPress.originalEvent.key === 'a' && !started) {
    $("h1").text("Level 0");
    nextSequence();
    started = true;
  }else {
    startOver();
  }
});

function nextSequence() {
  userClickedPattern = [];
  // Update Level Header
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.round(Math.random() * 3);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  console.log(gamePattern);
  console.log(userClickedPattern);
  console.log(currentLevel);

  if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Correct");

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("Wrong");

    playSound('wrong');
    $('body').addClass("game-over");
    setTimeout(function(){
      $('body').removeClass("game-over");
    },200);
    $("h1").text("Game Over, Press Any Key to Restart");
  }
}

function playSound(name) {
  var buttonSound = new Audio("sounds/" + name + ".mp3");
  buttonSound.play();
}

function animatePress(currentColor) {
  //
  $("#" + currentColor).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver() {
  console.log("Starting Over");
  level = 0;
  gamePattern = [];
  started = false;

  $("h1").text("Level 0");
  nextSequence();
}
