
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
            inputBox.className = 'cell'
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
    const inputBoxes = document.querySelectorAll('.cell')
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
    solveButton.addEventListener('click', initiateSolve)
}

pageSetup()









// solve functions

// get the board from the HTML document
function getBoard() {
    const boardRows = document.querySelectorAll('.board-row')
    let board = []

    boardRows.forEach((row) => {
        const sudokuValues = row.querySelectorAll('.cell')
        let tmpRow = []
        sudokuValues.forEach((inputBox) => {
            tmpRow.push(inputBox.value)
        })
        board.push(tmpRow)
    })
    return board
}

// solve the sudoku puzzle
function testSolve() {
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

    const solvedTesting = [
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

    console.log('WIP')
    console.log(getEmptyCell(testing))
    console.log('row SHOULD = FALSE', checkRow(testing, 0, 6))
    console.log('col SHOULD = TRUE', checkColumn(testing, 7, 8))
    console.log('box1 SHOULD = TRUE', checkBox(testing, 0, 0, 6))
    console.log('box2 SHOULD = TRUE', checkBox(testing, 0, 0, 1))
    console.log('box3 SHOULD = FALSE', checkBox(testing, 0, 6, 2))
    console.log('move SHOULD = FALSE', validMove(testing, 0, 7, 3))
    console.log('move SHOULD = True', validMove(testing, 0, 7, 6))
    console.log('should match', solve(testing), solvedTesting)

}

// find an empty cell in the board
function getEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (board[row][column] === '') {
                return [row, column]
            }
        }
    }
    return null
}

function initiateSolve() {
    const startingBoard = getBoard()
    if (solve(startingBoard)) {
        console.log(startingBoard);
      } else {
        console.log("No solution");
      }

}

// check if the number already exists in the row
function checkRow(board, row, num) {
    return (board[row].includes(`${num}`))
}

// check if the number is already in the column
function checkColumn(board, column, num) {
    // loop through each column in the board
   for (let row=0;row<board.length;row++) {
        if (board[row][column] === `${num}`) return true
   }
   return false
}

// checks if the number is already in the box 
function checkBox(board, startRow, startCol, num) {
    for (let row = startRow; row < startRow + 3;row++) {
        for (let column = startCol; column < startCol + 3; column++) {
            if (board[row][column] === `${num}`) return true
        }
    }
    return false
}

// check if the number is valid in the selected cell
function validMove(board, row, column, num) {
    return !checkRow(board, row, num) && !checkColumn(board, column, num) && !checkBox(board, row - (row % 3), column - (column % 3), num)
}

function solve(board) {
    // Find an empty cell in the board
    const emptyCell = getEmptyCell(board);
  
    // If there are no empty cells, the puzzle is solved
    if (!emptyCell) {
      return true;
    }
  
    const row = emptyCell[0] 
    const column = emptyCell[1];
  
    // Try filling the empty cell with numbers from 1 to 9
    for (let num = 1; num <= 9; num++) {
      if (validMove(board, row, column, num)) {
        // If the current number is a valid move, try it
        board[row][column] = `${num}`;
  
        // Recursively attempt to solve the puzzle with the current move
        if (solve(board)) {
          return true; // If a solution is found, return true
        }
  
        board[row][column] = '';
      }
    }
  
    return false;
  }

//update the sudoku board with the solution
function updateBoard(row, column, val) {
    const boardRow = document.querySelectorAll('.board-row')
    const cells = boardRow[row].querySelectorAll('.cell')
    cells[column].value = val
}


