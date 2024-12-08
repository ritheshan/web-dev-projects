// Variables
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

// Start the game on a keypress
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// Generate the next sequence
function nextSequence() {
  userClickedPattern = []; // Reset the user pattern for the current level
  level++;
  $("#level-title").text("Level " + level);

  // Generate a random color
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour); // Add to the game sequence

  // Play the full sequence for the user to follow
  playSequence();
}

// Play the current game sequence
function playSequence() {
  let i = 0;
  const interval = setInterval(() => {
    if (i < gamePattern.length) {
      var color = gamePattern[i];
      $("#" + color).fadeIn(100).fadeOut(100).fadeIn(100);
      playSound(color);
      i++;
    } else {
      clearInterval(interval); // Stop once all colors are shown
    }
  }, 600); // Delay between showing each color
}

// Handle user button clicks
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id"); // Get the ID of the clicked button
  userClickedPattern.push(userChosenColour); // Add it to the user's pattern

  playSound(userChosenColour); // Play sound
  animatePress(userChosenColour); // Animate the button

  // Check the user's input after every click
  checkAnswer(userClickedPattern.length - 1);
});

// Check the user's answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // If the user completes the sequence correctly
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(() => {
        nextSequence(); // Generate the next sequence
      }, 1000);
    }
  } else {
    // User clicked the wrong button
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);

    startOver(); // Reset the game
  }
}

// Play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Animate button press
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(() => {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// Reset the game
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
