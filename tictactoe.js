
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



function startGamePlayer(){
    //todo
}

function startGameAi(){
    //todo
}



let selectButtonAi = document.querySelector(".select-button-ai");
let selectButtonPlayer = document.querySelector(".select-button-player");

selectButtonAi.addEventListener("click", aiPrompt);
selectButtonPlayer.addEventListener("click", playerPrompt);

function aiPrompt(){
    //todo
}

function playerPrompt(){
    //todo
}