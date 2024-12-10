// Game board dimensions
const BOARD_SIZE = 5;

// Create game board
const board = document.getElementById("game-board");
let grid = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(false));

// Initialize game board
function initializeBoard() {
    // Create grid squares
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            const square = document.createElement("div");
            square.classList.add("square");
            square.dataset.row = row;
            square.dataset.col = col;
            square.addEventListener("click", () => toggleLights(row, col));
            board.appendChild(square);
        }
    }
    createSolvableBoard();
}

// Toggle light state for a given square and its neighbors
function toggleLights(row, col) {
    const toggle = (r, c) => {
        if (r >= 0 && r < BOARD_SIZE && c >= 0 && c < BOARD_SIZE) {
            grid[r][c] = !grid[r][c];
            const square = document.querySelector(
                `[data-row='${r}'][data-col='${c}']`
            );
            square.classList.toggle("is-off", !grid[r][c]);
        }
    };

    // Toggle the clicked square and its neighbors
    toggle(row, col); // Center
    toggle(row - 1, col); // Above
    toggle(row + 1, col); // Below
    toggle(row, col - 1); // Left
    toggle(row, col + 1); // Right

    checkWinCondition();
}

// Create a solvable initial board configuration
function createSolvableBoard() {
    // Start with all lights off
    for (let row = 0; row < BOARD_SIZE; row++) {
        for (let col = 0; col < BOARD_SIZE; col++) {
            grid[row][col] = false;
            const square = document.querySelector(
                `[data-row='${row}'][data-col='${col}']`
            );
            square.classList.remove("is-off");
        }
    }

    // Apply a series of random moves to generate a solvable configuration
    for (let i = 0; i < BOARD_SIZE * 2; i++) {
        const row = Math.floor(Math.random() * BOARD_SIZE);
        const col = Math.floor(Math.random() * BOARD_SIZE);
        toggleLights(row, col); // Simulate a click
    }
}

// Check if the player has won the game
function checkWinCondition() {
    const allOff = grid.every((row) => row.every((cell) => !cell));
    if (allOff) {
        setTimeout(() => {
            alert("You win!");
            resetBoard();
        }, 100);
    }
}

// Reset the board for a new game
function resetBoard() {
    grid = Array(BOARD_SIZE)
        .fill(null)
        .map(() => Array(BOARD_SIZE).fill(false));
    document.querySelectorAll(".square").forEach((square) => {
        square.classList.remove("is-off");
    });
    createSolvableBoard();
}

// Start the game
initializeBoard();
