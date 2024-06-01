
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


console.log(player("Alan Zhang"));

// console.log(gameBoard.grid);
// gameBoard.grid[0][1] = 10;
// console.log(gameBoard.grid);