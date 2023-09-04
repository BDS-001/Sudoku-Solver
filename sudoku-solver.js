const body = document.querySelector('body')
const numberBoxes = document.querySelectorAll('.number-box')
const solveButton = document.querySelector('.solve')

numberBoxes.forEach(function(numberBox) {

    // Add an event listener to the input field for the "keydown" event
    numberBox.addEventListener('keypress', function (event) {
        // Get the key code of the pressed key
        event.preventDefault();
        const keyCode = event.charCode;

        // Check if the key is a number key (0-9)
        if ((keyCode >= 49 && keyCode <= 57 && event.key !== '0')) {
            numberBox.value = event.key
        } else {
            numberBox.value = ''
        }
    });
});

function solve() {
    const board = getBoard()
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
}

solveButton.addEventListener('click', solve)