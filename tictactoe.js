let gameBoardGrid = [
    [0,0,0],
    [0,0,0],
    [0,0,0],
];

let gameBoard = {
    grid: gameBoardGrid,
    gameStart: false,
    gameEnd: false
};

function player(user){
    const playerName = user;
    return {playerName};
}

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

function displayMarker() {
    let marker;
    currentPlayer = p1Name.value;  
    for (let i = 0; i < squaresInGrid.length; i++) {
        squaresInGrid[i].addEventListener("click", () => {
            if (squaresInGrid[i].textContent != "X" && squaresInGrid[i].textContent != "O") {
                if (currentPlayer === p1Name.value || currentPlayer === p1NameAi.value) {
                    marker = "O";
                    squaresInGrid[i].textContent = marker;
                    currentPlayer = p2Name.value || aiName.value;
                } else if (currentPlayer === p2Name.value || currentPlayer === aiName.value) {
                    marker = "X";
                    squaresInGrid[i].textContent = marker;
                    currentPlayer = p1Name.value || p1NameAi.value;
                }
                currentPlayerTextHeading.textContent = `${currentPlayer}'s turn`;
                determineWinner();
            } else if (squaresInGrid[i].textContent == "X" || squaresInGrid[i].textContent == "O") {
                alert("Please pick an unselected box!");
            } else {
                alert("Game bug");
            }
        });
    }
}

function determineWinner(){
    let tile0 = document.querySelector("#tile-0");
    let tile1 = document.querySelector("#tile-1");
    let tile2 = document.querySelector("#tile-2");
    let tile3 = document.querySelector("#tile-3");
    let tile4 = document.querySelector("#tile-4");
    let tile5 = document.querySelector("#tile-5");
    let tile6 = document.querySelector("#tile-6");
    let tile7 = document.querySelector("#tile-7");
    let tile8 = document.querySelector("#tile-8");

    

    if (p1Name.value != "" && p2Name.value != "") {
        //handle wins for row across
        if(tile0.textContent == "O" && tile1.textContent == "O" && tile2.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value} WINS! Congrats!`;
        }
        else if(tile0.textContent == "X" && tile1.textContent == "X" && tile2.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
        }
        else if(tile3.textContent == "O" && tile4.textContent == "O" && tile5.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value} WINS! Congrats!`;
        }
        else if(tile3.textContent == "X" && tile4.textContent == "X" && tile5.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
        }
        else if(tile6.textContent == "O" && tile7.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value} WINS! Congrats!`;
        }
        else if(tile6.textContent == "X" && tile7.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
        }
        //handle wins for columns
        else if(tile0.textContent == "O" && tile3.textContent == "O" && tile6.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value} WINS! Congrats!`;
        }
        else if(tile0.textContent == "X" && tile3.textContent == "X" && tile6.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
        }
        else if(tile1.textContent == "O" && tile4.textContent == "O" && tile7.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value} WINS! Congrats!`;
        }
        else if(tile1.textContent == "X" && tile4.textContent == "X" && tile7.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
        }
        else if(tile2.textContent == "O" && tile5.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value} WINS! Congrats!`;
        }
        else if(tile2.textContent == "X" && tile5.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
        }
        //handle the 2 diagonals
        else if(tile0.textContent == "O" && tile4.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value} WINS! Congrats!`;
        }
        else if(tile0.textContent == "X" && tile4.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
        }
        else if(tile2.textContent == "O" && tile4.textContent == "O" && tile6.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1Name.value} WINS! Congrats!`;
        }
        else if(tile2.textContent == "X" && tile4.textContent == "X" && tile6.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${p2Name.value} WINS! Congrats!`;
        }
    } 


    else if (p1NameAi.value != "" && aiName.value != "") {
        //handle wins for row across
        if(tile0.textContent == "O" && tile1.textContent == "O" && tile2.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
        }
        else if(tile0.textContent == "X" && tile1.textContent == "X" && tile2.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
        }
        else if(tile3.textContent == "O" && tile4.textContent == "O" && tile5.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
        }
        else if(tile3.textContent == "X" && tile4.textContent == "X" && tile5.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
        }
        else if(tile6.textContent == "O" && tile7.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
        }
        else if(tile6.textContent == "X" && tile7.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
        }
        //handle wins for columns
        else if(tile0.textContent == "O" && tile3.textContent == "O" && tile6.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
        }
        else if(tile0.textContent == "X" && tile3.textContent == "X" && tile6.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
        }
        else if(tile1.textContent == "O" && tile4.textContent == "O" && tile7.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
        }
        else if(tile1.textContent == "X" && tile4.textContent == "X" && tile7.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
        }
        else if(tile2.textContent == "O" && tile5.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
        }
        else if(tile2.textContent == "X" && tile5.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
        }
        //handle the 2 diagonals
        else if(tile0.textContent == "O" && tile4.textContent == "O" && tile8.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
        }
        else if(tile0.textContent == "X" && tile4.textContent == "X" && tile8.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
        }
        else if(tile2.textContent == "O" && tile4.textContent == "O" && tile6.textContent == "O" ){
            currentPlayerTextHeading.textContent = `${p1NameAi.value} WINS! Congrats!`;
        }
        else if(tile2.textContent == "X" && tile4.textContent == "X" && tile6.textContent == "X" ){
            currentPlayerTextHeading.textContent = `${aiName.value} WINS! Congrats!`;
        }
    }
}
