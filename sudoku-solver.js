let solved = false

let test2 = [
    [ "1", "2", "9", "4", "3", "8", "7", "6", "5" ],
    [ "5", "6", "8", "1", "7", "9", "3", "4", "2" ],
    [ "4", "3", "7", "2", "5", "6", "9", "8", "1" ],
    [ "7", "9", "4", "3", "6", "2", "5", "1", "8" ],
    [ "2", "5", "1", "9", "8", "4", "6", "7", "3" ],
    [ "3", "8", "6", "5", "1", "7", "2", "9", "4" ],
    [ "8", "1", "3", "7", "9", "5", "4", "2", "6" ],
    [ "6", "7", "2", "8", "4", "3", "1", "5", "9" ],
    [ "9", "4", "5", "6", "2", "1", "8", "3", "7" ],
]







// initial page setup
function pageSetup() {
    const board = document.querySelector('#board')

    // start by adding an initial horizontal divider
    let horizontalDiv = document.createElement('div')
    horizontalDiv.className = 'horizontal-divider'
    board.append(horizontalDiv)
    
    // create 9 rows for the board, start each row with a vertical divider
    for (row=1;row<=9;row++) {
        const boardRow = document.createElement('div')
        boardRow.className = 'board-row'
    
        const verticalDiv = document.createElement('div')
        verticalDiv.className = 'vertical-divider'
        boardRow.append(verticalDiv)
        
        // in each row, add 9 input boxes
        for (let i=1;i<=9;i++) {
            const inputBox = document.createElement('input')
            inputBox.className = 'number-box'
            inputBox.type = 'text'
            boardRow.append(inputBox)
            
            // every third inputbox add a vertical divider to seprate boxes into 3 sections
            if (i % 3 === 0) {
                const verticalDiv = document.createElement('div')
                verticalDiv.className = 'vertical-divider'
                boardRow.append(verticalDiv)
            }
        }
        
        // add the finished row to the board, every third row add a horizontal divider
        board.append(boardRow)
        if (row % 3 === 0) {
            let horizontalDiv = document.createElement('div')
            horizontalDiv.className = 'horizontal-divider'
            board.append(horizontalDiv)
        }
    }

    // add event listeners to input boxes and solve button
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
    solveButton.addEventListener('click', solve)
}

pageSetup()









// solve functions

// get the board from the HTML document
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

// solve the sudoku puzzle
function solve() {
    const board = getBoard()
    const testing = [
        [ "1", "2", "9", "4", "3", "8", "", "", "" ],
        [ "5", "6", "8", "1", "7", "9", "", "", "" ],
        [ "4", "3", "7", "2", "5", "6", "", "8", "1" ],
        [ "7", "9", "4", "3", "6", "2", "5", "1", "8" ],
        [ "2", "5", "1", "9", "8", "4", "6", "7", "3" ],
        [ "3", "8", "6", "5", "1", "7", "2", "9", "4" ],
        [ "8", "1", "3", "7", "9", "5", "4", "2", "6" ],
        [ "6", "7", "2", "8", "4", "3", "1", "5", "9" ],
        [ "9", "4", "5", "6", "2", "1", "8", "3", "7" ],
    ]
    console.log('WIP')
    console.log(emptyCell(testing))
    console.log('SHOULD = FALSE', checkRow(testing, 0, 6))
    console.log('SHOULD = TRUE', checkColumn(testing, 7, 8))
    console.log('SHOULD = TRUE', checkBox(testing, 0, 0, 6))
    console.log('SHOULD = TRUE', checkBox(testing, 0, 0, 1))
    console.log('SHOULD = FALSE', checkBox(testing, 0, 6, 2))

}

// find an empty cell in the board
function getEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === '')
            return [col, row]
        }
    }
    return false
}

// check if the number already exists in the row
function checkRow(board, row, num) {
    return (board[row].includes(`${num}`))
}

// check if the number is already in the column
function checkColumn(board, col, num) {
    // loop through each column in the board
   for (let row=0;row<board.length;row++) {
        if (board[row][col] === `${num}`) return true
   }
   return false
}

// checks if the number is already in the box 
function checkBox(board, startRow, startCol, num) {
    for (let row = startRow; row < startRow + 3;row++) {
        for (let col = startCol; col < startCol + 3; col++) {
            console.log(`${num} - ${board[row][col]}, ${row} ${col}`)
            if (board[row][col] === `${num}`) return true
        }
    }
    return false
}

function validMove(board, row, column, num) {
    return checkRow(board, row, num) && checkColumn(board, column, num) && checkBox(board, row, col, num)
}

function solve(board) {
    const emptyCell = getEmptyCell(board)
    if (!emptyCell) return true
    const row = emptyCell[0]
    const column = emptyCell[1]

    for (let num = 1; num <= 9; num++) {
        // valid function
    }
}