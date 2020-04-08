
let player1 = "X";   //playerTurn = false
let player2 = "O";   //playerTurn = true

let playerTurn = false;
let gameStatus = '';

let board = ['', '', '',
    '', '', '',
    '', '', ''];


function clearGame() {  //resets game
    board = ['', '', '',
        '', '', '',
        '', '', ''];
    playerTurn = false;
    gameStatus = '';
    document.getElementById('game-status').innerHTML = gameStatus;
    document
        .querySelectorAll(".square")
        .forEach(square => {
            square.innerHTML = '';
        });
}

function saveGameStatus() {
    localStorage.setItem("playerTurn", playerTurn);
    localStorage.setItem("gameStatus", gameStatus);
    localStorage.setItem("board", board);
}

function loadGameStatus() {
    if (localStorage.getItem("playerTurn") === null) {
        return;
    }
        playerTurn = localStorage.getItem("playerTurn");
        gameStatus = localStorage.getItem("gameStatus");
        board = localStorage.getItem("board");


    for (let i = 0; i < 9; i++) {
        if (board[i] !== '') {
            if (board[i] === "X") {
                let image = document.createElement('img');
                image.setAttribute("src", "images/player-x.svg");
                document
                    .getElementById(`square-${i}`)
                    .appendChild(image);
            }
            if (board[i] === "O") {
                let image = document.createElement('img');
                image.setAttribute("src", "images/player-o.svg");
                document
                    .getElementById(`square-${i}`)
                    .appendChild(image);
            }
        }
    }
}


const checkGameStatus = (array) => {       //checks for winner

    for (let i = 0; i < 9; i += 3) {   //checks rows for winner
        if (array[i] === array[i + 1] && array[i + 1] === array[i + 2]) {
            if (array[i] === "X") {
                gameStatus = 'Winner: X';
            } else if (array[i] === "O") {
                gameStatus = 'Winner: O';
            }
        }
    }
    for (let i = 0; i < 3; i++) {  //checks columns for winner
        if (array[i] === array[i + 3] && array[i + 3] === array[i + 6]) {
            if (array[i] === 'X') {
                gameStatus = 'Winner: X'
            } else if (array[i] === 'O') {
                gameStatus = 'Winner: O'
            }
        }
    }
    if (array[0] === array[4] && array[4] === array[8] ||  //checks diagonals
        array[2] === array[4] && array[4] === array[6]) {
        if (array[4] === 'X') {
            gameStatus = 'Winner: X'
        } else if (array[4] === 'O') {
            gameStatus = 'Winner: O'
        }
    }
    if (gameStatus === '') {    //handles tie game
        if (array.every(element => element !== '')) {
            gameStatus = "No Winner Tie Game";
        }
    }
    saveGameStatus();
};


window.addEventListener("DOMContentLoaded", (event) => {
    loadGameStatus();
    const boardId = document.getElementById("tic-tac-toe-board");
    boardId.addEventListener("click", event => {
        console.log(boardId);

        if (gameStatus !== '') {
            return;
        }
        let clickTarget = event.target.id.slice(7);
        let announcement = document.getElementById('game-status');
        let image = document.createElement("img");
        let boardPiece = '';
        if (playerTurn === false && board[clickTarget] === '') {
            image.setAttribute("src", "images/player-x.svg")
            boardPiece = "X";
        } else if (playerTurn === true && board[clickTarget] === '') {
            image.setAttribute("src", "images/player-o.svg")
            boardPiece = "O";
        }
        event.target.appendChild(image);
        playerTurn = !playerTurn;
        board[clickTarget] = boardPiece;
        checkGameStatus(board);
        announcement.innerHTML = gameStatus;
        if (gameStatus !== '') {
            document.getElementById("new-game").disabled = false;
            document.getElementById('give-up').disabled = true;
        }
    });

    document
        .getElementById("new-game")
        .addEventListener("click", event => {
            clearGame();
            document.getElementById("new-game").disabled = true;
            document.getElementById("give-up").disabled = false;
        });

    document
        .getElementById("give-up")
        .addEventListener("click", event => {
            if (playerTurn === false) {
                gameStatus = 'Winner: O'
            } else {
                gameStatus = 'Winner: X'
            }
            document.getElementById('game-status').innerHTML = gameStatus;
            document.getElementById("new-game").disabled = false;
            document.getElementById("give-up").disabled = true;

        })


});
