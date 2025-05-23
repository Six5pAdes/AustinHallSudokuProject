import React, { useState, useCallback, useEffect } from 'react';
import Board from './Board';
import { Board as BoardType } from '../types';
import { generateSudoku, isValidMove, isBoardComplete } from '../utils/gameLogic';

const Game: React.FC = () => {
  const [board, setBoard] = useState<BoardType>([]);
  const [initialBoard, setInitialBoard] = useState<BoardType>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    const newBoard = generateSudoku();
    setBoard(newBoard);
    setInitialBoard(newBoard.map(row => [...row]));
    setIsComplete(false);
    setError(null);
  };

  const handleCellChange = useCallback((row: number, col: number, value: number | null) => {
    setError(null);

    if (value !== null && !isValidMove(board, row, col, value)) {
      setError('Invalid move!');
      return;
    }

    const newBoard = board.map((boardRow, rowIndex) =>
      rowIndex === row
        ? boardRow.map((cell, colIndex) =>
            colIndex === col ? value : cell
          )
        : [...boardRow]
    );

    setBoard(newBoard);

    if (isBoardComplete(newBoard)) {
      setIsComplete(true);
    }
  }, [board]);

  return (
    <div className="game" data-testid="sudoku-game">
      <h1>Sudoku</h1>
      <Board
        board={board}
        initialBoard={initialBoard}
        onCellChange={handleCellChange}
      />
      <div className="game-controls">
        <button onClick={startNewGame}>New Game</button>
        {error && <div className="error">{error}</div>}
        {isComplete && <div className="success">Congratulations! You solved it!</div>}
      </div>
      <style>{`
        .game {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          padding: 20px;
        }

        .game-controls {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .error {
          color: red;
          font-weight: bold;
        }

        .success {
          color: green;
          font-weight: bold;
        }

        button {
          padding: 10px 20px;
          font-size: 16px;
          background-color: #4CAF50;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }

        button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default Game;
