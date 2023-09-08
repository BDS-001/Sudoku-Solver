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
        for (i=1;i<=9;i++) {
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

}

function completeBoard(board) {
    for (i=0;i<board.length;i++) {
        if (board[i].includes('')) {
            return false
        }
    }
    return true
}

function checkRows(board) {
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

function checkBoardSegments(board) {
    const yRegions = {
        "top":[0,3], 
        "mid":[3,6],
        "bottom":[6,9]
    }
    const xRegions = {
        "left":[0,3], 
        "mid":[3,6],
        "right":[6,9]
    } 


    for (const xKey in xRegions) {
        for (const yKey in yRegions) {
            if (!validBoardSegment(board, xRegions[xKey], yRegions[yKey])) {
                return false
            }
        }
    }
    return true
}

function validBoardSegment(board, x, y) {
    segmentValues = []
    for (i=x[0];i<x[1];i++) {
        for (j=y[0];j<y[1];j++) {
            segmentValues.push(board[j][i])
        }
    }

    // check for duplicates of each number
    for (num=1;num<=9;num++) {
        if (segmentValues.filter((sudokuValue) => {
            return sudokuValue === `${num}`
        }).length > 1) {
            return false
        }
    }
    return true
}

function backtrack(board, x, y) {

}

// valid board consists of valid rows, columns, and board segments
function validBoard(board) {
    return checkRows(board) && checkColumns(board) && checkBoardSegments(board)
}