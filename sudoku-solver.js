const body = document.querySelector('body')
const numberBoxes = document.querySelectorAll('.number-box')

numberBoxes.forEach(function(numberBox) {

    // Add an event listener to the input field for the "keydown" event
    numberBox.addEventListener('keypress', function (event) {
        // Get the key code of the pressed key
        const keyCode = event.charCode;

        // Check if the key is a number key (0-9)
        if ((keyCode >= 49 && keyCode <= 57 && event.key !== '0')) {
            event.preventDefault()
            numberBox.value = event.key
        } else {
            event.preventDefault();
            numberBox.value = ''
        }
    });
});