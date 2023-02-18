// create multidimensional array for board
const chessboard = [];
for (let i = 0; i < 8; ++i) {
    const boardRow = [];
    for (let j = 0; j < 8; ++j) {
        boardRow.push("");
    }
    chessboard.push(boardRow);
}

drawBoard(chessboard);

// create function to generate coordinates for checking
// set starting coords
// create recursive function
// loop through possible coords (if none, return)
// if possible to go, set a value to that coordinate
// invoke function again
// unset value immediately after
// draw board

// create function to draw and fill in board
function drawBoard(chessboard) {
    const htmlBoard = document.getElementById("chessboard");
    let isBlack = false;
    chessboard.forEach((boardRow, y) => {
        isBlack = isBlack ? false : true;
        const newRow = document.createElement("tr");
        boardRow.forEach((cell, x) => {
            const newCell = document.createElement("td");
            newCell.innerText = chessboard[y][x];
            newCell.className = isBlack ? "black" : null;
            newRow.appendChild(newCell);
            isBlack = isBlack ? false : true;
        });
        htmlBoard.appendChild(newRow);
    });
}
