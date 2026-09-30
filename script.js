const cells = document.querySelectorAll(".cell");
const winningLine = document.getElementById("winningLine");

const turnText = document.getElementById("turnText");
const moveCount = document.getElementById("moveCount");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

const playerX = document.getElementById("playerX");
const playerO = document.getElementById("playerO");

const message = document.getElementById("message");

const difficulty = document.getElementById("difficulty");
const difficultyBox = document.getElementById("difficultyBox");

const timer = document.getElementById("timer");

const resultOverlay = document.getElementById("resultOverlay");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");

const newRound = document.getElementById("newRound");
const resetScore = document.getElementById("resetScore");
const playAgain = document.getElementById("playAgain");
const soundButton = document.getElementById("soundButton");

const modeButtons = document.querySelectorAll(".mode-btn");

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let gameOver = false;
let gameMode = "pvp";
let aiLevel = "easy";

let timeLeft = 10;
let timerInterval = null;

let soundOn = true;

let scores = {
    X: 0,
    O: 0,
    D: 0
};

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const savedScores = localStorage.getItem("woodTicTacToeScores");

if (savedScores) {
    scores = JSON.parse(savedScores);
}

scoreX.textContent = scores.X;
scoreO.textContent = scores.O;

function playSound(type) {

    if (!soundOn) {
        return;
    }

    const audio = new AudioContext();
    const oscillator = audio.createOscillator();
    const gain = audio.createGain();

    oscillator.connect(gain);
    gain.connect(audio.destination);

    if (type === "move") {
        oscillator.frequency.value = 300;
    }

    if (type === "win") {
        oscillator.frequency.value = 600;
    }

    if (type === "draw") {
        oscillator.frequency.value = 180;
    }

    oscillator.start();

    gain.gain.setValueAtTime(0.15, audio.currentTime);
    gain.gain.exponentialRampToValueAtTime(
        0.001,
        audio.currentTime + 0.2
    );

    oscillator.stop(audio.currentTime + 0.2);
}

cells.forEach(cell => {

    cell.addEventListener("click", () => {

        if (gameOver) {
            return;
        }

        const index = Number(cell.dataset.index);

        if (index < 0 || index > 8) {
            return;
        }

        if (board[index] !== "") {
            return;
        }

        if (gameMode === "computer" && currentPlayer === "O") {
            return;
        }

        makeMove(index, currentPlayer);

    });

});

function makeMove(index, player) {

    if (gameOver) {
        return;
    }

    if (index < 0 || index > 8) {
        return;
    }

    if (board[index] !== "") {
        return;
    }

    board[index] = player;

    drawBoard();

    playSound("move");

    updateMoveCount();

    const winner = getWinner(board);

    if (winner) {
        finishGame(winner);
        return;
    }

    if (board.every(cell => cell !== "")) {
        finishDraw();
        return;
    }

    currentPlayer = player === "X" ? "O" : "X";

    updateTurn();

    resetTimer();

    if (
        gameMode === "computer" &&
        currentPlayer === "O" &&
        !gameOver
    ) {
        clearInterval(timerInterval);

        setTimeout(() => {
            computerMove();
        }, 500);
    }
}

function drawBoard() {

    cells.forEach((cell, index) => {

        cell.classList.remove("x", "o", "filled");

        cell.textContent = "";

        if (board[index] === "X") {
            cell.textContent = "X";
            cell.classList.add("x", "filled");
        }

        if (board[index] === "O") {
            cell.textContent = "O";
            cell.classList.add("o", "filled");
        }

    });

}

function getWinner(currentBoard) {

    for (let i = 0; i < winningPositions.length; i++) {

        const position = winningPositions[i];

        const a = position[0];
        const b = position[1];
        const c = position[2];

        if (
            currentBoard[a] !== "" &&
            currentBoard[a] === currentBoard[b] &&
            currentBoard[a] === currentBoard[c]
        ) {

            return {
                player: currentBoard[a],
                position: position
            };

        }

    }

    return null;
}

function finishGame(winner) {

    gameOver = true;

    clearInterval(timerInterval);

    scores[winner.player]++;

    saveScores();

    winner.position.forEach(index => {
        cells[index].classList.add("winner");
    });

    drawWinningLine(winner.position);

    const winnerName =
        winner.player === "X"
            ? playerX.value || "Player X"
            : playerO.value || "Player O";

    message.textContent = winnerName + " wins!";

    resultTitle.textContent = "Winner!";

    resultMessage.textContent =
        winnerName + " (" + winner.player + ") wins the game!";

    playSound("win");

    setTimeout(() => {
        resultOverlay.classList.add("show");
    }, 500);

}

function finishDraw() {

    gameOver = true;

    clearInterval(timerInterval);

    scores.D++;

    saveScores();

    message.textContent = "It's a draw!";

    resultTitle.textContent = "Draw!";

    resultMessage.textContent =
        "All 9 boxes are filled. Nobody wins this round.";

    playSound("draw");

    setTimeout(() => {
        resultOverlay.classList.add("show");
    }, 400);

}

function computerMove() {

    if (gameOver) {
        return;
    }

    if (currentPlayer !== "O") {
        return;
    }

    let move;

    if (aiLevel === "easy") {
        move = easyMove();
    }

    else if (aiLevel === "medium") {
        move = mediumMove();
    }

    else {
        move = hardMove();
    }

    if (move !== -1) {
        makeMove(move, "O");
    }

}

function easyMove() {

    const emptyCells = getEmptyCells();

    if (emptyCells.length === 0) {
        return -1;
    }

    const randomIndex =
        Math.floor(Math.random() * emptyCells.length);

    return emptyCells[randomIndex];
}

function mediumMove() {

    let move = findWinningMove("O");

    if (move !== -1) {
        return move;
    }

    move = findWinningMove("X");

    if (move !== -1) {
        return move;
    }

    if (board[4] === "") {
        return 4;
    }

    const corners = [0, 2, 6, 8];

    const emptyCorners =
        corners.filter(index => board[index] === "");

    if (emptyCorners.length > 0) {

        return emptyCorners[
            Math.floor(Math.random() * emptyCorners.length)
        ];

    }

    return easyMove();
}

function hardMove() {

    let move = findWinningMove("O");

    if (move !== -1) {
        return move;
    }

    move = findWinningMove("X");

    if (move !== -1) {
        return move;
    }

    return getBestMove();
}

function findWinningMove(player) {

    const emptyCells = getEmptyCells();

    for (let i = 0; i < emptyCells.length; i++) {

        const index = emptyCells[i];

        board[index] = player;

        const winner = getWinner(board);

        board[index] = "";

        if (winner && winner.player === player) {
            return index;
        }

    }

    return -1;
}

function getBestMove() {

    let bestScore = -Infinity;
    let bestMove = -1;

    const emptyCells = getEmptyCells();

    for (let i = 0; i < emptyCells.length; i++) {

        const index = emptyCells[i];

        board[index] = "O";

        const score = minimax(board, 0, false);

        board[index] = "";

        if (score > bestScore) {
            bestScore = score;
            bestMove = index;
        }

    }

    return bestMove;
}

function minimax(currentBoard, depth, isMaximizing) {

    const winner = getWinner(currentBoard);

    if (winner) {

        if (winner.player === "O") {
            return 10 - depth;
        }

        return depth - 10;
    }

    if (currentBoard.every(cell => cell !== "")) {
        return 0;
    }

    if (isMaximizing) {

        let bestScore = -Infinity;

        const emptyCells = getEmptyCellsFromBoard(currentBoard);

        for (let i = 0; i < emptyCells.length; i++) {

            const index = emptyCells[i];

            currentBoard[index] = "O";

            const score =
                minimax(currentBoard, depth + 1, false);

            currentBoard[index] = "";

            bestScore = Math.max(bestScore, score);

        }

        return bestScore;

    }

    else {

        let bestScore = Infinity;

        const emptyCells = getEmptyCellsFromBoard(currentBoard);

        for (let i = 0; i < emptyCells.length; i++) {

            const index = emptyCells[i];

            currentBoard[index] = "X";

            const score =
                minimax(currentBoard, depth + 1, true);

            currentBoard[index] = "";

            bestScore = Math.min(bestScore, score);

        }

        return bestScore;

    }

}

function getEmptyCells() {

    return getEmptyCellsFromBoard(board);

}

function getEmptyCellsFromBoard(currentBoard) {

    const emptyCells = [];

    for (let i = 0; i < 9; i++) {

        if (currentBoard[i] === "") {
            emptyCells.push(i);
        }

    }

    return emptyCells;

}

function updateTurn() {

    let name;

    if (currentPlayer === "X") {
        name = playerX.value || "Player X";
    }

    else {
        name = playerO.value || "Player O";
    }

    if (
        gameMode === "computer" &&
        currentPlayer === "O"
    ) {
        turnText.textContent = "COMPUTER THINKING";
    }

    else {
        turnText.textContent = name.toUpperCase() + "'S TURN";
    }

    message.textContent =
        name + ", make your move.";

}

function updateMoveCount() {

    const count =
        board.filter(cell => cell !== "").length;

    moveCount.textContent =
        "Move " + count + " / 9";

}

function resetTimer() {

    clearInterval(timerInterval);

    if (gameOver) {
        return;
    }

    if (
        gameMode === "computer" &&
        currentPlayer === "O"
    ) {
        timer.textContent = "—";
        return;
    }

    timeLeft = 10;

    timer.textContent = timeLeft;

    timerInterval = setInterval(() => {

        timeLeft--;

        timer.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timerInterval);

            const emptyCells = getEmptyCells();

            if (emptyCells.length === 0) {
                return;
            }

            const randomIndex =
                emptyCells[
                    Math.floor(
                        Math.random() * emptyCells.length
                    )
                ];

            makeMove(randomIndex, currentPlayer);

        }

    }, 1000);

}

function drawWinningLine(position) {

    const firstCell =
        cells[position[0]].getBoundingClientRect();

    const lastCell =
        cells[position[2]].getBoundingClientRect();

    const boardRect =
        document
            .getElementById("board")
            .getBoundingClientRect();

    const x1 =
        firstCell.left +
        firstCell.width / 2 -
        boardRect.left;

    const y1 =
        firstCell.top +
        firstCell.height / 2 -
        boardRect.top;

    const x2 =
        lastCell.left +
        lastCell.width / 2 -
        boardRect.left;

    const y2 =
        lastCell.top +
        lastCell.height / 2 -
        boardRect.top;

    const length =
        Math.sqrt(
            Math.pow(x2 - x1, 2) +
            Math.pow(y2 - y1, 2)
        );

    const angle =
        Math.atan2(y2 - y1, x2 - x1) *
        180 /
        Math.PI;

    winningLine.style.width = length + "px";

    winningLine.style.left = x1 + "px";

    winningLine.style.top = y1 + "px";

    winningLine.style.transform =
        "rotate(" + angle + "deg)";

}

function startNewRound() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];

    currentPlayer = "X";

    gameOver = false;

    resultOverlay.classList.remove("show");

    winningLine.style.width = "0px";

    cells.forEach(cell => {

        cell.classList.remove(
            "x",
            "o",
            "filled",
            "winner"
        );

        cell.textContent = "";

    });

    updateMoveCount();

    updateTurn();

    resetTimer();

}

function saveScores() {

    localStorage.setItem(
        "woodTicTacToeScores",
        JSON.stringify(scores)
    );

    scoreX.textContent = scores.X;

    scoreO.textContent = scores.O;

}

newRound.addEventListener("click", () => {
    startNewRound();
});

playAgain.addEventListener("click", () => {
    startNewRound();
});

resetScore.addEventListener("click", () => {

    scores = {
        X: 0,
        O: 0,
        D: 0
    };

    saveScores();

    startNewRound();

});

soundButton.addEventListener("click", () => {

    soundOn = !soundOn;

    soundButton.textContent =
        soundOn ? "🔊 Sound" : "🔇 Sound";

});

modeButtons.forEach(button => {

    button.addEventListener("click", () => {

        modeButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        gameMode = button.dataset.mode;

        if (gameMode === "computer") {
            difficultyBox.style.display = "block";
        }

        else {
            difficultyBox.style.display = "none";
        }

        startNewRound();

    });

});

difficulty.addEventListener("change", () => {

    aiLevel = difficulty.value;

    startNewRound();

});

playerX.addEventListener("input", updateTurn);

playerO.addEventListener("input", updateTurn);

difficultyBox.style.display = "none";

updateMoveCount();

updateTurn();

resetTimer();