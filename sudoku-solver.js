// initial page setup
function pageSetup() {
    const board = document.querySelector('#board')

    let horizontalDiv = document.createElement('div')
    horizontalDiv.className = 'horizontal-divider'
    board.append(horizontalDiv)
    
    for (row=1;row<=9;row++) {
        const boardRow = document.createElement('div')
        boardRow.className = 'board-row'
    
        const verticalDiv = document.createElement('div')
        verticalDiv.className = 'vertical-divider'
        boardRow.append(verticalDiv)
    
        for (i=1;i<=9;i++) {
            const inputBox = document.createElement('input')
            inputBox.className = 'number-box'
            inputBox.type = 'text'
            boardRow.append(inputBox)
    
            if (i % 3 === 0) {
                const verticalDiv = document.createElement('div')
                verticalDiv.className = 'vertical-divider'
                boardRow.append(verticalDiv)
            }
        }
        board.append(boardRow)
        if (row % 3 === 0) {
            let horizontalDiv = document.createElement('div')
            horizontalDiv.className = 'horizontal-divider'
            board.append(horizontalDiv)
        }
    }
    enableSudokuInput()
    enableSolve()
}

function enableSudokuInput() {
    const inputBoxes = document.querySelectorAll('.number-box')
    inputBoxes.forEach(function(inputBox) {

        // Add an event listener to the input field for the "keydown" event
        inputBox.addEventListener('keypress', function (event) {
            // Get the key code of the pressed key and prevent the defualt behavior of automatically displaying the keyvalue
            event.preventDefault();
            const keyCode = event.charCode;
    
            // Check if the key is a number key (0-9)
            if ((keyCode >= 49 && keyCode <= 57)) {
                inputBox.value = event.key
            } else {
                inputBox.value = ''
            }
        });
    });
}

function enableSolve() {
    const solveButton = document.querySelector('.solve')
    solveButton.addEventListener('click', test)

    function test() {
        const test = getBoard()
        console.log(test)
    }
}

pageSetup()









// solve functions
function getBoard() {
    const boardRows = document.querySelectorAll('.board-row')
    let board = []

    boardRows.forEach((row) => {
        const sudokuValues = row.querySelectorAll('.number-box')
        let tmpRow = []
        sudokuValues.forEach((inputBox) => {
            tmpRow.push(inputBox.value)
        })
        board.push(tmpRow)
    })
    return board
}

function solve() {
    const board = getBoard()
    backtrack(board)

}

function completeBoard(board) {
    for (i=0;i<board.length;i++) {
        if (board[i].filter((value) => {
            return value === ''
        }).length > 0) {
            return false
        }
    }
    return true
}

function checkRow(board) {
    // go through each row of the board
    for (row=0;row < board.length;row++) {
        // in each row check all of the numbers for duplicatees in the row
        for (num=1;num <= 9; num++) {
            // filter the board to only have the values that match the current number being checked, if there amre more than 1 instance than the row is not valid
            if (board[row].filter((sudokuValue) => {
                return sudokuValue === `${num}`
            }).length > 1) {
                return false
            }
        }
    };
    return true
}

function checkColumns(board) {
    // loop through each column in the board
    for (col=0;col<9;col++) {

        // put all the numbers in a column into an array check for duplicates
        let colNums = []
        for (row=0;row<board.length;row++) {
           colNums.push(board[row][col])
        }

        // check for duplicates of each number
        for (num=1;num<=9;num++) {
            if (colNums.filter((sudokuValue) => {
                return sudokuValue === `${num}`
            }).length > 1) {
                return false
            }
        }
    }
    return true
}

function validBoard(board) {
    return checkRow(board) && checkColumns(board)
}