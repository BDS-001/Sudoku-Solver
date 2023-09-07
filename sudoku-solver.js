const body = document.querySelector('body')
const numberBoxes = document.querySelectorAll('.number-box')
const solveButton = document.querySelector('.solve')

numberBoxes.forEach(function(numberBox) {

    // Add an event listener to the input field for the "keydown" event
    numberBox.addEventListener('keypress', function (event) {
        // Get the key code of the pressed key and prevent the defualt behavior of automatically displaying the keyvalue
        event.preventDefault();
        const keyCode = event.charCode;

        // Check if the key is a number key (0-9)
        if ((keyCode >= 49 && keyCode <= 57)) {
            numberBox.value = event.key
        } else {
            numberBox.value = ''
        }
    });
});

function solve() {
    const board = getBoard()
    backtrack(board)

}

function completeBoard(board) {
    for (i=0;i<board.length;i++) {
        if (board[i].filter(blanks).length > 0) {
            return false
        }
    }
    return true
}

function blanks(value) {
    return value === ''
}

function getBoard() {
    const boardRows = document.querySelectorAll('.board-row')
    const columns = [0,1,2,9,10,11,18,19,20]
    let board = []
    boardRows.forEach((boardRow) => {
        const numbers = boardRow.getElementsByClassName('number-box')
        for (i=0;i<=6;i+=3) {
            let tmp = []
            columns.forEach((index) => {
                let squarePosition = index + i
                tmp.push(numbers[squarePosition].value)
            })
            board.push(tmp)
        }
    })
    return board
}

function backtrack(board, x=0, y=0) {
    let nextY = y + 1
    let nextX = x
    if (nextY > 8) {
        y = 0
        nextX = x + 1
    }
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

solveButton.addEventListener('click', test)

console.log(numberBoxes[0].value === '')

function test() {
    const test = getBoard()
    console.log(validBoard(test))
}