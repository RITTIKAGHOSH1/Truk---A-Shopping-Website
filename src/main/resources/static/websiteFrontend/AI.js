document.addEventListener('DOMContentLoaded', () => {
    let board = Array(9).fill(0);
    let currentPlayer = -1; // Default: Player X starts
    let gameOver = false;

    window.startGame = function (player) {
        currentPlayer = player;
        gameOver = false;
        board.fill(0);
        renderBoard();
        if (currentPlayer === 1) {
            setTimeout(() => compTurn(), 100); // AI starts if player chooses O
        }
    }

    function renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';
        board.forEach((cell, index) => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell === -1 ? 'X' : cell === 1 ? 'O' : '';
            cellElement.onclick = () => handleClick(index);
            boardElement.appendChild(cellElement);
        });
        if (gameOver) {
            const message = getResultMessage();
            document.getElementById('message').textContent = message;
        }
    }

    function handleClick(index) {
        if (board[index] === 0 && !gameOver && currentPlayer === -1) {
            board[index] = currentPlayer;
            renderBoard();
            checkGameOver();
            if (!gameOver) {
                setTimeout(() => compTurn(), 100); // Add a slight delay for the AI's turn
            }
        }
    }

    function analyseBoard() {
        const lines = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        for (const [a, b, c] of lines) {
            if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes(0) ? 0 : 2;
    }

    function getResultMessage() {
        const result = analyseBoard();
        if (result === 0) {
            return 'Draw!';
        } else if (result === -1) {
            return 'Player X wins!';
        } else if (result === 1) {
            return 'AI (O) wins!';
        }
    }

    function checkGameOver() {
        const result = analyseBoard();
        if (result !== 0) {
            gameOver = true;
            renderBoard();
        }
    }

    function compTurn() {
        let bestScore = -Infinity;
        let move = -1;
        let moves = []; // Store possible moves with their scores

        for (let i = 0; i < 9; i++) {
            if (board[i] === 0) {
                board[i] = 1; // AI's move
                let score = minimax(board, -1); // Evaluate the move
                board[i] = 0; // Undo the move
                if (score > bestScore) {
                    bestScore = score;
                    moves = [{ index: i, score: score }];
                } else if (score === bestScore) {
                    moves.push({ index: i, score: score });
                }
            }
        }

        // Randomly choose among the best moves
        if (moves.length > 0) {
            const randomMove = moves[Math.floor(Math.random() * moves.length)];
            board[randomMove.index] = 1; // Make the best move
            currentPlayer = -1; // Switch back to player
            renderBoard();
            checkGameOver();
        }
    }

    function minimax(board, player) {
        const result = analyseBoard();
        if (result !== 0) {
            return result * player; // Return score based on the outcome
        }
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (board[i] === 0) {
                board[i] = player;
                let score = -minimax(board, -player);
                board[i] = 0;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    }
});
