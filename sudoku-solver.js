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
    const numbers = document.querySelectorAll('.number-box')
    console.log(numbers[0].value === '1')
}

solveButton.addEventListener('click', solve)