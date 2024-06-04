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
    currentPlayerTextHeading = document.getElementById("turn-indicator");
    currentPlayerTextHeading.classList.add("currentPlayerTextHeading");

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
            } else if (squaresInGrid[i].textContent == "X" || squaresInGrid[i].textContent == "O") {
                alert("Please pick an unselected box!");
            } else {
                alert("Game bug");
            }
        });
    }
}

function determineWinner(){
    //todo
}
