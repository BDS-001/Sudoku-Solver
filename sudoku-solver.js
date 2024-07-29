// Initial page setup
function pageSetup() {
    const board = document.querySelector('#board');
    const fragment = document.createDocumentFragment();

    fragment.appendChild(createDivider('horizontal-divider'));
    
    for (let row = 1; row <= 9; row++) {
        const boardRow = document.createElement('div');
        boardRow.className = 'board-row';
        
        boardRow.appendChild(createDivider('vertical-divider'));
        
        for (let i = 1; i <= 9; i++) {
            const inputBox = document.createElement('input');
            inputBox.className = 'cell';
            inputBox.type = 'text';
            inputBox.maxLength = 1;
            boardRow.appendChild(inputBox);
            
            if (i % 3 === 0) {
                boardRow.appendChild(createDivider('vertical-divider'));
            }
        }
        
        fragment.appendChild(boardRow);
        if (row % 3 === 0) {
            fragment.appendChild(createDivider('horizontal-divider'));
        }
    }

    board.appendChild(fragment);
    enableSudokuInput();
    enableSolve();
}

function createDivider(className) {
    const divider = document.createElement('div');
    divider.className = className;
    return divider;
}

function enableSudokuInput() {
    document.querySelectorAll('.cell').forEach(inputBox => {
        inputBox.addEventListener('input', function() {
            this.value = this.value.replace(/[^1-9]/g, '');
        });
    });
}

function enableSolve() {
    document.querySelector('.solve').addEventListener('click', initiateSolve);
}

// Solve functions
function getBoard() {
    return Array.from(document.querySelectorAll('.board-row')).map(row =>
        Array.from(row.querySelectorAll('.cell')).map(cell => 
            parseInt(cell.value) || 0
        )
    );
}

function initiateSolve() {
    const board = getBoard();
    if (solve(board)) {
        updateBoard(board);
    } else {
        alert('No solution exists');
    }
}

function solve(board) {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) return true;

    const [row, col] = emptyCell;
    for (let num = 1; num <= 9; num++) {
        if (isValidMove(board, row, col, num)) {
            board[row][col] = num;
            if (solve(board)) return true;
            board[row][col] = 0;
        }
    }
    return false;
}

function findEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) return [row, col];
        }
    }
    return null;
}

function isValidMove(board, row, col, num) {
    return !checkRow(board, row, num) && 
           !checkColumn(board, col, num) && 
           !checkBox(board, row - row % 3, col - col % 3, num);
}

function checkRow(board, row, num) {
    return board[row].includes(num);
}

function checkColumn(board, col, num) {
    return board.some(row => row[col] === num);
}

function checkBox(board, startRow, startCol, num) {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            if (board[row + startRow][col + startCol] === num) return true;
        }
    }
    return false;
}

function updateBoard(solvedBoard) {
    document.querySelectorAll('.board-row').forEach((row, rowIndex) => {
        row.querySelectorAll('.cell').forEach((cell, colIndex) => {
            cell.value = solvedBoard[rowIndex][colIndex];
        });
    });
}

pageSetup();