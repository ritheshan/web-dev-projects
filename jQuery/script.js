$(document).ready(function () {
    // Change the button style when clicked
    $("button").on("click", function () {
        $(this).addClass("clicked"); // Add 'clicked' class
        setTimeout(() => $(this).removeClass("clicked"), 2000); // Remove 'clicked' class after 2 seconds
    });

    // Change the button style on hover
    $("button").hover(
        function () {
            $(this).addClass("hovered"); // Add 'hovered' class on mouse over
        },
        function () {
            $(this).removeClass("hovered"); // Remove 'hovered' class on mouse out
        }
    );

    // Attach a 'reset' behavior to a dynamically added button
    $("button").last().after("<button id='reset-btn'>Reset</button>"); // Add a reset button dynamically
    $("#reset-btn").on("click", function () {
        $("button").not(this).addClass("reset"); // Add 'reset' class to all other buttons
        setTimeout(() => $("button").removeClass("reset"), 2000); // Reset styles after 2 seconds
    });

    // Add custom behavior for double click
    $("button").on("dblclick", function () {
        alert("You double-clicked a button!");
    });

    // Change the text of the button when clicked
    $("button").on("click", function () {
        $(this).text("Clicked!");
        setTimeout(() => $(this).text("clickme"), 2000); // Reset text after 2 seconds
    });

    // Add a hover effect for all buttons using a custom CSS property
    $("button").hover(
        function () {
            $(this).css("box-shadow", "0 0 10px rgba(0, 0, 0, 0.5)");
        },
        function () {
            $(this).css("box-shadow", "none");
        }
    );

    // Dynamically add a new button with behavior
    $("#reset-btn").after("<button id='add-btn'>Add Button</button>");
    $("#add-btn").on("click", function () {
        $(".set").append("<button class='new-btn'>New Button</button>");
        $(".new-btn").last().on("click", function () {
            $(this).addClass("clicked");
            setTimeout(() => $(this).removeClass("clicked"), 2000);
        });
    });
});
