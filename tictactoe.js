
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
const closeModal = document.querySelector(".close-prompt");

selectButtonAi.addEventListener("click", aiPrompt);
selectButtonPlayer.addEventListener("click", playerPrompt);
closeModal.addEventListener("click", closePrompt);

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

let p1Name;
let p2Name;
let p1NameAi;
let aiName;
const startBtn = document.querySelector(".start-button");
startBtn.addEventListener("click", startGame);
// startBtn.addEventListener("click", closePrompt);

function startGame(){
    p1Name = document.querySelector("#p1Name").value;
    p2Name = document.querySelector("#p2Name").value;
    p1NameAi = document.querySelector("#p1NameAi").value;
    aiName = document.querySelector("#aiName").value;
    console.log(p1Name);
    console.log(p2Name);
    console.log(p1NameAi);
    console.log(aiName);

}



