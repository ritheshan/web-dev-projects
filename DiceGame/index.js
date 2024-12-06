let player1Roll = 0;
let player2Roll = 0;
let player1Rolled = false;  // Track if Player 1 has rolled
let player2Rolled = false;  // Track if Player 2 has rolled

function rollDice(player) {
    // Ensure Player 1 can roll only once
    if (player === 1 && player1Rolled) return;  // Prevent Player 1 from rolling again

    // Ensure Player 2 can only roll after Player 1 has rolled
    if (player === 2 && !player1Rolled) return;  // Player 2 can't roll until Player 1 rolls

    // Generate a random number between 1 and 6
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    // Select the appropriate dice image for the player
    const imgElement = document.querySelector(`.img${player}`);
    if (imgElement) {
        imgElement.src = `./images/dice${diceNumber}.png`;  // Update the dice image source
        imgElement.alt = `Dice showing ${diceNumber}`;  // Update the alt text for accessibility
    } else {
        console.error(`Image element for Player ${player} not found!`);
    }

    // Store the dice roll for each player
    if (player === 1) {
        player1Roll = diceNumber;
        player1Rolled = true;  // Lock Player 1's dice after they roll
    } else if (player === 2) {
        player2Roll = diceNumber;
        player2Rolled = true;  // Lock Player 2's dice after they roll
    }

    // Update the winner only when both players have rolled
    updateWinner();
}

function updateWinner() {
    // Check if both players have rolled
    if (player1Roll && player2Roll) {
        const h1Element = document.querySelector("h1");

        if (player1Roll > player2Roll) {
            h1Element.textContent = "Player 1 Wins! 🎉";
        } else if (player2Roll > player1Roll) {
            h1Element.textContent = "Player 2 Wins! 🎉";
        } else {
            h1Element.textContent = "It's a Draw! 🤝";
        }
    }
}

// Reset the game if you want to allow the players to play again
function resetGame() {
    player1Roll = 0;
    player2Roll = 0;
    player1Rolled = false;
    player2Rolled = false;

    const h1Element = document.querySelector("h1");
    h1Element.textContent = "Roll the dice!";

    // Reset dice images
    const img1 = document.querySelector(".img1");
    const img2 = document.querySelector(".img2");
    img1.src = './images/dice1.png';  // Default dice image
    img2.src = './images/dice1.png';  // Default dice image
}
