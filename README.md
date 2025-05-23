# React Sudoku Game

A modern Sudoku game built with React and TypeScript.

## Project Overview

This is a fully functional Sudoku game with the following features:

- Dynamic board generation
- Input validation
- Game completion detection
- Clean and responsive UI

## Project Structure

```
sudoku-game/
├── public/               # Static files
├── src/
│   ├── components/      # React components
│   │   ├── Board.tsx
│   │   ├── Cell.tsx
│   │   └── Game.tsx
│   ├── types/          # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/          # Game logic utilities
│   │   └── gameLogic.ts
│   ├── __tests__/      # Test files
│   ├── App.tsx         # Root component
│   └── index.tsx       # Entry point
└── package.json
```

## How to Play

1. Start a new game by clicking the "New Game" button
2. Click on any empty cell to input a number (1-9)
3. The game validates your moves in real-time:
   - Numbers can't repeat in the same row
   - Numbers can't repeat in the same column
   - Numbers can't repeat in the same 3x3 box
4. Complete the puzzle by filling all cells with valid numbers
5. The game will notify you when you've successfully completed the puzzle

## Available Commands

In the project directory, you can run:

### `npm start`

- Runs the app in development mode
- Open [http://localhost:3000](http://localhost:3000) to view it in the browser
- The page will reload when you make changes

### `npm test`

- Launches the test runner in interactive watch mode
- Runs all test suites including game logic and component tests

### `npm run build`

- Builds the app for production to the `build` folder
- The build is minified and optimized for best performance

## Technologies Used

- React 19
- TypeScript 4
- Jest & React Testing Library
- CSS3

## License

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
