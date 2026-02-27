let board = ["","","","","","","","",""];
let currentPlayer = "X";
let gameActive = true;
let gameMode = "pvp";
let xWins = 0;
let oWins = 0;
let draws = 0;

const boardElement = document.getElementById("board");
const resultText = document.getElementById("result");
const turnText = document.getElementById("turnText");

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleClick);
        boardElement.appendChild(cell);
    });
}

function startGame(mode) {
    gameMode = mode;
    document.getElementById("homeScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    createBoard();
}

function goHome() {
    document.getElementById("gameScreen").style.display = "none";
    document.getElementById("homeScreen").style.display = "block";
    newGame();
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (board[index] !== "" || !gameActive) return;

    makeMove(index, currentPlayer);

    if (gameMode === "cpu" && gameActive && currentPlayer === "O") {
        setTimeout(computerMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    const cell = boardElement.children[index];
    cell.textContent = player;
    cell.classList.add(player.toLowerCase());

    checkWinner();

    if (gameActive) {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        turnText.textContent = "Player " + currentPlayer + "'s Turn";
    }
}

function computerMove() {
    let empty = board.map((v,i)=> v===""?i:null).filter(v=>v!==null);
    if (empty.length === 0) return;
    let randomIndex = empty[Math.floor(Math.random()*empty.length)];
    makeMove(randomIndex,"O");
}

function checkWinner() {
    const combos = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ];

    for (let c of combos) {
        const [a,b,d] = c;
        if (board[a] && board[a]===board[b] && board[a]===board[d]) {
            gameActive=false;
            showResult(board[a]);
            updateScore(board[a]);
            return;
        }
    }

    if (!board.includes("")) {
        gameActive=false;
        showResult("draw");
        draws++;
        document.getElementById("draws").textContent=draws;
    }
}

function showResult(winner){
    if(winner==="X"){
        resultText.textContent="🏆 Player X Wins!";
        resultText.className="result-text";
    } else if(winner==="O"){
        resultText.textContent="🏆 Player O Wins!";
        resultText.className="result-text result-o";
    } else {
        resultText.textContent="🤝 It's a Draw!";
        resultText.className="result-text result-draw";
    }
}

function updateScore(winner){
    if(winner==="X"){
        xWins++;
        document.getElementById("xWins").textContent=xWins;
    } else {
        oWins++;
        document.getElementById("oWins").textContent=oWins;
    }
}

function restartRound(){
    board=["","","","","","","","",""];
    currentPlayer="X";
    gameActive=true;
    resultText.textContent="";
    turnText.textContent="Player X's Turn";
    createBoard();
}

function newGame(){
    xWins=0;
    oWins=0;
    draws=0;
    document.getElementById("xWins").textContent=0;
    document.getElementById("oWins").textContent=0;
    document.getElementById("draws").textContent=0;
    restartRound();
}