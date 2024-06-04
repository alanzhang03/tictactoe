
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


let p1Name;
let p2Name;
let p1NameAi;
let aiName;
let currentPlayer;


const startBtn = document.querySelectorAll(".start-button");
const closeModal = document.querySelectorAll(".close-prompt");

selectButtonAi.addEventListener("click", aiPrompt);
selectButtonPlayer.addEventListener("click", playerPrompt);


for(let i = 0; i < startBtn.length; i++){
    startBtn[i].addEventListener("click", startGame);
};



for(let i = 0; i < closeModal.length; i++){
    closeModal[i].addEventListener("click", closePrompt);
};


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
    currentPlayer = document.getElementById("turn-indicator");
    
    if(p1Name.textContent != )
        currentPlayer.textContent = `${p1Name}'s turn`;

}

function startGame(){
    p1Name = document.querySelector("#p1Name").value;
    p2Name = document.querySelector("#p2Name").value;
    p1NameAi = document.querySelector("#p1NameAi").value;
    aiName = document.querySelector("#aiName").value;
    // console.log(p1Name);
    // console.log(p2Name);
    // console.log(p1NameAi);
    // console.log(aiName);

    closePrompt();
    newScreen();
}

function alternateTurn(){

}


function displayMarker(){
    let marker;
    currentPlayer = p1Name;

    let squaresInGrid = document.querySelectorAll(".square");
    for(let i = 0; i < squaresInGrid.length; i++){
        squaresInGrid[i].addEventListener("click", ()=>{
            if(squaresInGrid[i].textContent != "X" && squaresInGrid[i].textContent != "O"){
                if(currentPlayer == p1Name || p1NameAi){
                    marker = "O";
                    squaresInGrid[i].textContent = marker;
                    currentPlayer = p2Name;
                }
                else if(currentPlayer == p2Name || aiName){
                    marker = "X";
                    squaresInGrid[i].textContent = marker;
                    currentPlayer = p1Name;
                }   
            }
            else if(squaresInGrid[i].textContent == "X" || squaresInGrid[i].textContent == "O"){
                alert("Please pick unselected box!");
            }
            else{
                alert("Game bug")
            }
        })
    }
}


