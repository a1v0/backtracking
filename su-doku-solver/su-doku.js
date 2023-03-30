const prompt = require("prompt-sync")({ sigint: true });

const board = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, null, null, 1, null, null, null, null, 2],
    [6, null, null, null, null, null, 1, null, 5],
    [7, 1, null, 3, 4, 5, null, null, 6],
    [5, null, null, 9, 1, 2, null, null, 8],
    [2, null, null, null, null, null, null, 1, 3],
    [9, null, 1, 8, 2, 4, null, null, 7],
    [3, null, null, null, null, 1, null, null, 4],
    [8, 4, 5, null, null, null, 9, 2, 1]
];

solveSudoku(board);

function solveSudoku(board) {
    for (let y = 0; y < board.length; ++y) {
        for (let x = 0; x < board[y].length; ++x) {
            if (!board[y][x]) {
                const possibilities = checkPossibilities(board, x, y);
                for (let possibility in possibilities) {
                    board[y][x] = possibilities[possibility];
                    solveSudoku(board);
                    board[y][x] = null;
                }
                return;
            }
        }
    }
    drawBoard(board);
    prompt("Show further solutions (if available)?");
}

function checkPossibilities(board, xCoordinate, yCoordinate) {
    const possibilities = {};
    for (let i = 1; i <= 9; ++i) {
        possibilities[i] = i;
    }

    // check horizontally
    board[yCoordinate].forEach((cell) => {
        delete possibilities[cell];
    });

    // check vertically
    for (let i = 0; i < board.length; ++i) {
        delete possibilities[board[i][xCoordinate]];
    }

    // check within 3x3 square
    let squareLowerX, squareUpperX, squareLowerY, squareUpperY;

    if (xCoordinate < 3) {
        squareLowerX = 0;
        squareUpperX = 3;
    } else if (xCoordinate < 6) {
        squareLowerX = 3;
        squareUpperX = 6;
    } else if (xCoordinate < 9) {
        squareLowerX = 6;
        squareUpperX = 9;
    }

    if (yCoordinate < 3) {
        squareLowerY = 0;
        squareUpperY = 3;
    } else if (yCoordinate < 6) {
        squareLowerY = 3;
        squareUpperY = 6;
    } else if (yCoordinate < 9) {
        squareLowerY = 6;
        squareUpperY = 9;
    }

    for (let squareY = squareLowerY; squareY < squareUpperY; ++squareY) {
        for (let squareX = squareLowerX; squareX < squareUpperX; ++squareX) {
            delete possibilities[board[squareY][squareX]];
        }
    }

    return possibilities;
}

function drawBoard(board) {
    let drawnBoard = "\n";
    board.forEach((row, rowIndex) => {
        const rowDivider = "-------+-------+-------\n";
        drawnBoard += ` ${row[0]} ${row[1]} ${row[2]} | ${row[3]} ${row[4]} ${row[5]} | ${row[6]} ${row[7]} ${row[8]}\n`;
        if (rowIndex === 2 || rowIndex === 5) {
            drawnBoard += rowDivider;
        }
    });

    console.log(drawnBoard);
}
