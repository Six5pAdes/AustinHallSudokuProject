// filepath: src/utils/gameLogic.ts
import { Board } from "../types";

const shuffleArray = (array: number[]): number[] => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const isValid = (board: Board, row: number, col: number, num: number): boolean => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num) return false;
  }

  // Check column
  for (let x = 0; x < 9; x++) {
    if (board[x][col] === num) return false;
  }

  // Check 3x3 box
  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i + startRow][j + startCol] === num) return false;
    }
  }

  return true;
};

const solveSudoku = (board: Board): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === null) {
        const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        for (const num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = null;
          }
        }
        return false;
      }
    }
  }
  return true;
};

export const generateSudoku = (): Board => {
  // Initialize empty 9x9 board
  const board: Board = Array(9)
    .fill(null)
    .map(() => Array(9).fill(null));

  // Fill diagonal 3x3 boxes first (they are independent)
  for (let box = 0; box < 3; box++) {
    const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    let index = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const row = i + box * 3;
        const col = j + box * 3;
        board[row][col] = numbers[index++];
      }
    }
  }

  // Solve the rest of the puzzle
  solveSudoku(board);

  // Remove numbers to create the puzzle
  const cellsToRemove = 40; // Adjust difficulty by changing this number
  let removed = 0;
  while (removed < cellsToRemove) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== null) {
      board[row][col] = null;
      removed++;
    }
  }

  return board;
};

export const isValidMove = (
  board: Board,
  row: number,
  col: number,
  value: number
): boolean => {
  // Check row
  for (let i = 0; i < 9; i++) {
    if (i !== col && board[row][i] === value) return false;
  }

  // Check column
  for (let i = 0; i < 9; i++) {
    if (i !== row && board[i][col] === value) return false;
  }

  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  for (let i = boxRow; i < boxRow + 3; i++) {
    for (let j = boxCol; j < boxCol + 3; j++) {
      if (i !== row && j !== col && board[i][j] === value) return false;
    }
  }

  return true;
};

export const isBoardComplete = (board: Board): boolean => {
  return board.every((row) => row.every((cell) => cell !== null));
};
