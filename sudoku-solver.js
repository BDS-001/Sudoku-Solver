
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
            const num = parseInt(inputBox.value)
            if (num) {
                tmpRow.push(num)
            } else {
                tmpRow.push(0)
            }
        })
        board.push(tmpRow)
    })
    return board
}

// find an empty cell in the board
function getEmptyCell(board) {
    for (let row = 0; row < 9; row++) {
        for (let column = 0; column < 9; column++) {
            if (board[row][column] === 0) {
                return [row, column]
            }
        }
    }
    return null
}

function initiateSolve() {
    const startingBoard = getBoard()
      console.log(startingBoard, trt)
    if (solve(startingBoard)) {
        console.log(startingBoard);
      } else {
        console.log("No solution");
        alert('No solution')
      }

}

// check if the number already exists in the row
function checkRow(board, row, num) {
    return (board[row].includes(num))
}

// check if the number is already in the column
function checkColumn(board, column, num) {
    // loop through each column in the board
   for (let row=0;row<board.length;row++) {
        if (board[row][column] === num) return true
   }
   return false
}

// checks if the number is already in the box 
function checkBox(board, startRow, startCol, num) {
    for (let row = startRow; row < startRow + 3;row++) {
        for (let column = startCol; column < startCol + 3; column++) {
            if (board[row][column] === num) return true
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
        board[row][column] = num;
  
        // Recursively attempt to solve the puzzle with the current move
        if (solve(board)) {
          return true; // If a solution is found, return true
        }
  
        board[row][column] = 0;
      }
    }
  
    return false;
  }

//update the sudoku board with the solution
