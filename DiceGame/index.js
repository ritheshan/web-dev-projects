let player1Roll = 0;
let player2Roll = 0;

function rollDice(player) {
    // Generate a random number between 1 and 6
    const diceNumber = Math.floor(Math.random() * 6) + 1;

    // Select the appropriate dice image
    const imgElement = document.querySelector(`.img${player}`);
    imgElement.src = `./images/dice${diceNumber}.png`;
    imgElement.alt = `Dice showing ${diceNumber}`;

    // Store the dice roll
    if (player === 1) {
        player1Roll = diceNumber;
    } else if (player === 2) {
        player2Roll = diceNumber;
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
