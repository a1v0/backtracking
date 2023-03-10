// PROBLEM
// This code is essentially a brute-force solver and doesn't scale well
// An 8x8 board is too big
// To help improve the algo, look at this: https://en.wikipedia.org/wiki/Knight%27s_tour#Warnsdorff's_rule
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// create multidimensional array for board
const sizeOfBoard = 7;
const chessboard = [];
for (let i = 0; i < sizeOfBoard; ++i) {
    const boardRow = [];
    for (let j = 0; j < sizeOfBoard; ++j) {
        boardRow.push("");
    }
    chessboard.push(boardRow);
}

// set starting coords
const startingCoordinates = { x: 0, y: 0 };
chessboard[startingCoordinates.y][startingCoordinates.x] = 0;

calculateMoves(startingCoordinates, 1);
drawBoard(chessboard);

// create recursive function
function calculateMoves({ x, y }, moveIndex) {
    // loop through possible coords (if none, return)
    const moves = findPossibleMoves({ x, y });
    for (let { x, y } of moves) {
        // set a value to that coordinate
        chessboard[y][x] = moveIndex;
        // invoke function again
        const movesCalculation = calculateMoves({ x, y }, moveIndex + 1);

        if (!movesCalculation) {
            // unset value immediately after
            chessboard[y][x] = "";
        } else {
            return "Complete";
        }
    }

    for (let i = 0; i < sizeOfBoard; ++i) {
        if (chessboard[i].includes("")) return;
    }
    return "Complete";
}

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

// create function to generate coordinates for checking
function findPossibleMoves({ x, y }) {
    const movesToCheck = [
        { x: x - 1, y: y - 2 }, // up left
        { x: x + 1, y: y - 2 }, // up right
        { x: x - 1, y: y + 2 }, // down left
        { x: x + 1, y: y + 2 }, // down right
        { x: x - 2, y: y - 1 }, // left up
        { x: x - 2, y: y + 1 }, // left down
        { x: x + 2, y: y - 1 }, // right up
        { x: x + 2, y: y + 1 } // right down
    ];

    return movesToCheck.filter(({ x, y }) => {
        if (x < 0 || y < 0 || x >= sizeOfBoard || y >= sizeOfBoard) {
            return false;
        }
        if (chessboard[y][x] !== "") return false;

        return true;
    });
}
