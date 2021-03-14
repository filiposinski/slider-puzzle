const tiles = document.querySelectorAll('.tile');

const board = document.querySelector('.board');

const gameState = [
    [tiles[0], tiles[1], tiles[2]],
    [tiles[3], tiles[4], tiles[5]],
    [tiles[6], tiles[7], tiles[8]]
];



function render(board, gameState) {
    gameState.forEach((row, rowIndex) => {
        row.forEach((column, columnIndex) => {
            column.style.top = `${rowIndex * 100}px`;
            column.style.left = `${columnIndex * 100}px`;

            column.style['background-position-y'] = `-${rowIndex*100}px`;
            column.style['background-position-x'] = `-${columnIndex*100}px`;

            board.appendChild(column);
        });
    });
}

function moveTile(tile1, tile2) {
    const tempTop = tile1.style.top;
    const tempLeft = tile1.style.left;

        tile1.style.top = tile2.style.top;
        tile1.style.left = tile2.style.left;

        tile2.style.top = tempTop;
        tile2.style.left = tempLeft;
}

render(board, gameState);

board.addEventListener("click", (e) => {
const target = e.target;


let x, y;

gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
        if(column === target) {
            x = rowIndex;
            y = columnIndex;
        };
    });
});

let emptyX, emptyY;

gameState.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
        if(column.innerText === "") {
            emptyX = rowIndex;
            emptyY = columnIndex;
        };
    });
});



if(
    (y === emptyY && (x + 1 === emptyX || x - 1 === emptyX)) ||
    (x === emptyX && (y + 1 === emptyY || y - 1 === emptyY))
)  {

    moveTile(gameState[x][y], gameState[emptyX][emptyY]);
    const temp = gameState[x][y];
    gameState[x][y] = gameState[emptyX][emptyY];
    gameState[emptyX][emptyY] = temp;
    //render(board, gameState);
}

});


