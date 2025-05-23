import React from 'react';
import Cell from './Cell';
import { Board as BoardType } from '../types';

interface BoardProps {
  board: BoardType;
  initialBoard: BoardType;
  onCellChange: (row: number, col: number, value: number | null) => void;
}

const Board: React.FC<BoardProps> = ({ board, initialBoard, onCellChange }) => {
  return (
    <div className="board" data-testid="sudoku-board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              value={cell}
              isInitial={initialBoard[rowIndex][colIndex] !== null}
              onChange={(value) => onCellChange(rowIndex, colIndex, value)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
