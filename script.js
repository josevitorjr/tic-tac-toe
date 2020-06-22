const statusDisplay = document.querySelector('.game-status');

//We will use gameActive to show if the games is ended or still going
let gameActive = true;

//We will use curretPlayer to know whos turn is
let currentPlayer = "X";

//We will use gameState to store the current game state
let gameState = ["", "", "", "", "", "", "", "", ""];

// This will be the messages of the game
const winningMessage = () => `<h3>Player ${currentPlayer} has won!</h3>`;
const drawMessage = () => `<h3>Game ended in a draw!</h3>`;
const currentPlayerTurn = () => `<h3>It's ${currentPlayer} turn</h3>`;

// We will initate the game showing whose turn it is.
statusDisplay.innerHTML = currentPlayerTurn();


const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellPlayed(clickedCell, clickedCellIndex) {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}


function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
    if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
    /* 
    We will check weather there are any values in our game state array 
    that are still not populated with a player sign
    */
    let roundDraw = !gameState.includes("");
    if (roundDraw) {
        statusDisplay.innerHTML = drawMessage();
        gameActive = false;
        return;
    }
    /*
    If we get to here we know that the no one won the game yet, 
    and that there are still moves to be played, so we continue by changing the current player.
    */
    handlePlayerChange();
}

function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;

    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell')
    );

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    if (currentPlayer == "X") {
        clickedCell.classList.add("x");
    } else {
        clickedCell.classList.add("o");
    }
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
        .forEach(cell => cell.innerHTML = "");
}
//Here we add the event listener to the clicked div/cell and in the restart button

document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game-restart').addEventListener('click', handleRestartGame);