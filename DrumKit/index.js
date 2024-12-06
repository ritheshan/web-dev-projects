// Define the makesound function to play sound based on button inner HTML
function makesound(buttonInnerHTML) {
    switch (buttonInnerHTML) {
        case "w":
            var audio = new Audio("sounds/crash.mp3");
            audio.play();
            break;
        case "a":
            var audio = new Audio("sounds/kick-bass.mp3");
            audio.play();
            break;
        case "s":
            var audio = new Audio("sounds/snare.mp3");
            audio.play();
            break;
        case "d":
            var audio = new Audio("sounds/tom-1.mp3");
            audio.play();
            break;
        case "j":
            var audio = new Audio("sounds/tom-2.mp3");
            audio.play();
            break;
        case "k":
            var audio = new Audio("sounds/tom-3.mp3");
            audio.play();
            break;
        case "l":
            var audio = new Audio("sounds/tom-4.mp3");
            audio.play();
            break;
        default:
            console.log("Invalid key pressed.");
    }
}

// Event listener for keyboard press
document.addEventListener("keydown", function(event) {
    makesound(event.key);
    buttonAnimation(event.key) ;// Passing the key pressed to makesound function
});

// Attach event listener to all the drum buttons
for (var i = 0; i < document.querySelectorAll(".drum").length; i++) {
    document.querySelectorAll(".drum")[i].addEventListener("click", function() {
        var buttonInnerHTML = this.innerHTML; // Get the innerHTML of the clicked button
        makesound(buttonInnerHTML);
        buttonAnimation(buttonInnerHTML); // Pass it to makesound function
    });
    
}
function buttonAnimation(buttonInnerHTML) {
    var activeButton = document.querySelector("." + buttonInnerHTML); // Select the button by its inner HTML class
    activeButton.classList.add("pressed"); // Add the 'pressed' class to the button to trigger animation
    
    // Remove the 'pressed' class after 100ms to reset the animation
    setTimeout(function() {
        activeButton.classList.remove("pressed");
    }, 100);
}