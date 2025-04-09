# Sudoku Solver

A web-based application for solving Sudoku puzzles using a backtracking algorithm. This interactive tool allows users to input their Sudoku puzzles and get solutions instantly.

## Features

- Interactive 9x9 Sudoku grid for puzzle input
- Single-click solution using an efficient backtracking algorithm
- Game-Boy inspired retro visual design
- Responsive layout that works on various screen sizes
- Input validation to ensure only valid numbers (1-9) are entered

## How to Use

1. **Input the Puzzle**: Enter the starting numbers for your Sudoku puzzle using the number keys 1-9. Use any other key to clear a cell.
2. **Solve Partially (Optional)**: If you want, you can try to solve parts of the puzzle yourself.
3. **Get the Solution**: Click the "Solve" button to find the complete solution to the puzzle.

## Technical Implementation

The Sudoku Solver uses:

- **HTML/CSS**: For layout and styling with a retro Game Boy aesthetic
- **Vanilla JavaScript**: For all functionality without any external libraries
- **Backtracking Algorithm**: To efficiently find solutions to the puzzles
- **DOM Manipulation**: To create the Sudoku grid dynamically and update it

### Algorithm Details

The solver implements a backtracking algorithm that:
1. Finds an empty cell in the puzzle
2. Attempts to place numbers 1-9 in that cell
3. Checks if the placed number is valid according to Sudoku rules
4. Recursively continues to the next empty cell if valid
5. Backtracks when an invalid state is reached

## Project Structure

- `index.html` - Main HTML document
- `styles.css` - CSS styling for the application
- `sudoku-solver.js` - JavaScript implementation of the Sudoku solver
- `README.md` - Project documentation

## Installation

No installation required! Simply clone the repository and open the `index.html` file in your browser:

```bash
git clone https://github.com/yourusername/sudoku-solver.git
cd sudoku-solver
# Open index.html in your browser
```

## Browser Compatibility

This application has been tested and works well on:
- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Safari

## Future Enhancements

- Puzzle generator functionality
- Difficulty level selection
- Timer to track solving speed
- Save/load puzzle functionality
- Mobile-optimized layout

## License

[MIT License](LICENSE)

## Acknowledgements

- Color palette inspired by Nintendo Game Boy
- Font: PixelOperator from FontLibrary.org