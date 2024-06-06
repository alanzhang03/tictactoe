const selectButtonAi = document.querySelector(".select-button-ai");
const selectButtonPlayer = document.querySelector(".select-button-player");
const playerModal = document.querySelector(".player-prompt-modal");
const aiModal = document.querySelector(".ai-prompt-modal");

let p1Name = document.querySelector("#p1Name");
let p2Name = document.querySelector("#p2Name");
let p1NameAi = document.querySelector("#p1NameAi");
let aiName = document.querySelector("#aiName");
let currentPlayer;
let currentPlayerTextHeading = document.querySelector("#turn-indicator");
let squaresInGrid = document.querySelectorAll(".square");

const startBtn = document.querySelectorAll(".start-button");
const closeModal = document.querySelectorAll(".close-prompt");

selectButtonAi.addEventListener("click", aiPrompt);
selectButtonPlayer.addEventListener("click", playerPrompt);

for(let i = 0; i < startBtn.length; i++){
    startBtn[i].addEventListener("click", startGame);
}

for(let i = 0; i < closeModal.length; i++){
    closeModal[i].addEventListener("click", closePrompt);
}

function aiPrompt(){
    aiModal.showModal();
}

function playerPrompt(){
    playerModal.showModal();
}

function closePrompt(){
    aiModal.close();
    playerModal.close();
}

function newScreen() {
    document.querySelector(".player-vs-container").style.display = "none";
    document.querySelector("#select-button-prompt").style.display = "none";
    newDisplayScreen();
    displayMarker();
}




function newDisplayScreen() {
    document.getElementById("game-board").style.display = "block";
    
    if (p1Name.value != "" && p2Name.value != "") {
        let currentPlayer = p1Name.value;
        currentPlayerTextHeading.textContent = `${currentPlayer}'s turn!`;
    } else if (p1NameAi.value != "" && aiName.value != "") {
        let currentPlayer = p1NameAi.value;
        currentPlayerTextHeading.textContent = `${currentPlayer}'s turn!`;
    }
}

function startGame() {
    closePrompt();
    newScreen();

}

function evaluateBoard(board) {

    for (let row = 0; row < 3; row++) {
        if (board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
            if (board[row][0] === 'X') return +10;
            else if (board[row][0] === 'O') return -10;
        }
    }


    for (let col = 0; col < 3; col++) {
        if (board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
            if (board[0][col] === 'X') return +10;
            else if (board[0][col] === 'O') return -10;
        }
    }


    if (board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
        if (board[0][0] === 'X') return +10;
        else if (board[0][0] === 'O') return -10;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
        if (board[0][2] === 'X') return +10;
        else if (board[0][2] === 'O') return -10;
    }


    return 0;
}

function minimax(board, depth, isMaximizing) {
    let score = evaluateBoard(board);


    if (score === 10) return score - depth;

    if (score === -10) return score + depth;

    if (isMovesLeft(board) === false) return 0;

    if (isMaximizing) {
        let best = -1000;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'X';
                    best = Math.max(best, minimax(board, depth + 1, !isMaximizing));
                    board[i][j] = '';
                }
            }
        }
        return best;
    }

    else {
        let best = 1000;

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] === '') {
                    board[i][j] = 'O';
                    best = Math.min(best, minimax(board, depth + 1, !isMaximizing));
                    board[i][j] = '';
                }
            }
        }
        return best;
    }
}

function isMovesLeft(board) {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') return true;
        }
    }
    return false;
}

function findBestMove(board) {
    let bestVal = -1000;
    let bestMove = { row: -1, col: -1 };

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                board[i][j] = 'X';
                let moveVal = minimax(board, 0, false);
                board[i][j] = '';
                if (moveVal > bestVal) {
                    bestMove.row = i;
                    bestMove.col = j;
                    bestVal = moveVal;
                }
            }
        }
    }
    return bestMove;
}
function aiMove() {
    let board = [
        [squaresInGrid[0].textContent, squaresInGrid[1].textContent, squaresInGrid[2].textContent],
        [squaresInGrid[3].textContent, squaresInGrid[4].textContent, squaresInGrid[5].textContent],
        [squaresInGrid[6].textContent, squaresInGrid[7].textContent, squaresInGrid[8].textContent]
    ];

    let bestMove = findBestMove(board);
    if (bestMove.row !== -1 && bestMove.col !== -1) {
        let index = bestMove.row * 3 + bestMove.col;
        squaresInGrid[index].textContent = "X";
        currentPlayer = p1NameAi.value;
        currentPlayerTextHeading.textContent = `${currentPlayer}'s turn`;
        determineWinner();
    }
}


function displayMarker() {
    let marker;
    currentPlayer = p1Name.value || p1NameAi.value;
    for (let i = 0; i < squaresInGrid.length; i++) {
        squaresInGrid[i].addEventListener("click", () => {
            if (squaresInGrid[i].textContent != "X" && squaresInGrid[i].textContent != "O") {
                if (currentPlayer === p1Name.value || currentPlayer === p1NameAi.value) {
                    marker = "O";
                    squaresInGrid[i].textContent = marker;
                    currentPlayer = p2Name.value || aiName.value;
                    currentPlayerTextHeading.textContent = `${currentPlayer}'s turn`;
                    determineWinner();
                    if (currentPlayer === aiName.value) {
                        setTimeout(aiMove, 400); 
                    }
                } else if (currentPlayer === p2Name.value) {
                    marker = "X";
                    squaresInGrid[i].textContent = marker;
                    currentPlayer = p1Name.value;
                    currentPlayerTextHeading.textContent = `${currentPlayer}'s turn`;
                    determineWinner();
                }
            } else {
                alert("Please pick an unselected box!");
            }
        });
    }
}


let p1Score = 0;
let p2Score = 0;
let p1ScoreAi = 0;
let aiScore = 0;

function determineWinner(){
    let resetButton = document.querySelector("#reset-game-button");
    resetButton.addEventListener("click", resetGame);

    let tile0 = document.querySelector("#tile-0");
    let tile1 = document.querySelector("#tile-1");
    let tile2 = document.querySelector("#tile-2");
    let tile3 = document.querySelector("#tile-3");
    let tile4 = document.querySelector("#tile-4");
    let tile5 = document.querySelector("#tile-5");
    let tile6 = document.querySelector("#tile-6");
    let tile7 = document.querySelector("#tile-7");
    let tile8 = document.querySelector("#tile-8");




    const playerScoreDisplay = document.querySelector("#player-vs-player-score");
    const aiScoreDisplay = document.querySelector("#player-vs-ai-score");

    
    if (p1Name.value != "" && p2Name.value != "") {
        //handle wins for row across
        if(tile0.textContent == "O" && tile1.textContent == "O" && tile2.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value}'s WINS! Congrats!`;
            resetButton.style.display = "flex";
            p1Score++;      
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;  
        }
        else if(tile0.textContent == "X" && tile1.textContent == "X" && tile2.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p2Score++;
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
            
        }
        else if(tile3.textContent == "O" && tile4.textContent == "O" && tile5.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value}'s WINS! Congrats!`;
            resetButton.style.display = "block";
            p1Score++;  
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`; 
            
        }
        else if(tile3.textContent == "X" && tile4.textContent == "X" && tile5.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p2Score++;
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile6.textContent == "O" && tile7.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value}'s WINS! Congrats!`;
            resetButton.style.display = "block";
            p1Score++;  
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile6.textContent == "X" && tile7.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p2Score++;
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        //handle wins for columns
        else if(tile0.textContent == "O" && tile3.textContent == "O" && tile6.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value}'s WINS! Congrats!`;
            resetButton.style.display = "block";
            p1Score++;    
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile0.textContent == "X" && tile3.textContent == "X" && tile6.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p2Score++;
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile1.textContent == "O" && tile4.textContent == "O" && tile7.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value}'s WINS! Congrats!`;
            resetButton.style.display = "block";
            p1Score++;    
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile1.textContent == "X" && tile4.textContent == "X" && tile7.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p2Score++;
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile2.textContent == "O" && tile5.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value}'s WINS! Congrats!`;
            resetButton.style.display = "block";
            p1Score++;   
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile2.textContent == "X" && tile5.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p2Score++;
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        //handle the 2 diagonals
        else if(tile0.textContent == "O" && tile4.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value}'s WINS! Congrats!`;
            resetButton.style.display = "block";
            p1Score++;  
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile0.textContent == "X" && tile4.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p2Score++;
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile2.textContent == "O" && tile4.textContent == "O" && tile6.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value}'s WINS! Congrats!`;
            resetButton.style.display = "block";
            p1Score++;   
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else if(tile2.textContent == "X" && tile4.textContent == "X" && tile6.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p2Score++;
            playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
        }
        else{
            if(tile0.textContent != "" && tile1.textContent != "" && tile2.textContent != "" && tile3.textContent != "" && tile4.textContent != "" &&tile5.textContent != "" && tile6.textContent != "" && tile7.textContent != "" && tile8.textContent != ""){
                currentPlayerTextHeading.textContent = `The game is a tie! Press the Reset game Button to Play Again!`;
                resetButton.style.display = "block";
                playerScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1Score} <br> ${p2Name.value}'s Score: ${p2Score}`;
            }
        }
    }
        
    else if (p1NameAi.value != "" && aiName.value != "") {
        //handle wins for row across
        if(tile0.textContent == "O" && tile1.textContent == "O" && tile2.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p1ScoreAi++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile0.textContent == "X" && tile1.textContent == "X" && tile2.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            aiScore++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile3.textContent == "O" && tile4.textContent == "O" && tile5.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p1ScoreAi++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile3.textContent == "X" && tile4.textContent == "X" && tile5.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            aiScore++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile6.textContent == "O" && tile7.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p1ScoreAi++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile6.textContent == "X" && tile7.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            aiScore++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        //handle wins for columns
        else if(tile0.textContent == "O" && tile3.textContent == "O" && tile6.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p1ScoreAi++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile0.textContent == "X" && tile3.textContent == "X" && tile6.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            aiScore++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile1.textContent == "O" && tile4.textContent == "O" && tile7.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p1ScoreAi++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile1.textContent == "X" && tile4.textContent == "X" && tile7.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            aiScore++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile2.textContent == "O" && tile5.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p1ScoreAi++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile2.textContent == "X" && tile5.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            aiScore++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        //handle the 2 diagonals
        else if(tile0.textContent == "O" && tile4.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p1ScoreAi++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile0.textContent == "X" && tile4.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            aiScore++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile2.textContent == "O" && tile4.textContent == "O" && tile6.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            p1ScoreAi++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else if(tile2.textContent == "X" && tile4.textContent == "X" && tile6.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
            resetButton.style.display = "block";
            aiScore++;
            aiScoreDisplay.innerHTML = `${p1Name.value}'s Score: ${p1ScoreAi} <br> Ai Score: ${aiScore}`;  
        }
        else{
            if(tile0.textContent != "" && tile1.textContent != "" && tile2.textContent != "" && tile3.textContent != "" && tile4.textContent != "" &&tile5.textContent != "" && tile6.textContent != "" && tile7.textContent != "" && tile8.textContent != ""){
                currentPlayerTextHeading.textContent = `The game is a tie! Press the Reset game Button to Play Again!`;
                resetButton.style.display = "block";    
            }
        }
    }
}


function resetGame(){
    for(let i = 0; i < squaresInGrid.length; i++){
        squaresInGrid[i].textContent = "";
    }
    currentPlayer = p1Name.value || p1NameAi.value;
    currentPlayerTextHeading.textContent = `${currentPlayer}'s turn!`;
    document.querySelector("#reset-game-button").style.display = "none";
}







