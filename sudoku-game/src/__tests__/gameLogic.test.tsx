import { generateSudoku, isValidMove, isBoardComplete } from '../utils/gameLogic';

describe('Sudoku Game Logic', () => {
  describe('generateSudoku', () => {
    it('should generate a 9x9 board', () => {
      const board = generateSudoku();
      expect(board.length).toBe(9);
      board.forEach(row => {
        expect(row.length).toBe(9);
      });
    });

    it('should generate a valid Sudoku board', () => {
      const board = generateSudoku();
      board.forEach((row, rowIndex) => {
        row.forEach((value, colIndex) => {
          if (value !== null) {
            // Temporarily remove the current value to test if it's valid
            const originalValue = board[rowIndex][colIndex];
            board[rowIndex][colIndex] = null;
            expect(isValidMove(board, rowIndex, colIndex, originalValue as number)).toBe(true);
            board[rowIndex][colIndex] = originalValue;
          }
        });
      });
    });
  });

  describe('isValidMove', () => {
    let emptyBoard: (number | null)[][];

    beforeEach(() => {
      emptyBoard = Array(9).fill(null).map(() => Array(9).fill(null));
    });

    it('should return true for valid moves', () => {
      expect(isValidMove(emptyBoard, 0, 0, 1)).toBe(true);
    });

    it('should return false for duplicate numbers in row', () => {
      emptyBoard[0][1] = 5;
      expect(isValidMove(emptyBoard, 0, 0, 5)).toBe(false);
    });

    it('should return false for duplicate numbers in column', () => {
      emptyBoard[1][0] = 5;
      expect(isValidMove(emptyBoard, 0, 0, 5)).toBe(false);
    });

    it('should return false for duplicate numbers in 3x3 box', () => {
      emptyBoard[1][1] = 5;
      expect(isValidMove(emptyBoard, 0, 0, 5)).toBe(false);
    });

    it('should return true when placing same number in different boxes', () => {
      emptyBoard[0][0] = 5;
      expect(isValidMove(emptyBoard, 3, 3, 5)).toBe(true);
    });
  });

  describe('isBoardComplete', () => {
    it('should return false for empty board', () => {
      const emptyBoard = Array(9).fill(null).map(() => Array(9).fill(null));
      expect(isBoardComplete(emptyBoard)).toBe(false);
    });

    it('should return false for partially filled board', () => {
      const partialBoard = Array(9).fill(null).map(() => Array(9).fill(1));
      partialBoard[0][0] = null;
      expect(isBoardComplete(partialBoard)).toBe(false);
    });

    it('should return true for completely filled board', () => {
      const fullBoard = Array(9).fill(null).map(() => Array(9).fill(1));
      expect(isBoardComplete(fullBoard)).toBe(true);
    });
  });
});
