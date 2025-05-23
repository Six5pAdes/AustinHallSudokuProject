import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Board from '../components/Board';

describe('Board', () => {
  const mockBoard = Array(9).fill(Array(9).fill(null));
  const mockInitialBoard = Array(9).fill(Array(9).fill(null));
  const mockOnCellChange = jest.fn();

  it('renders the correct number of cells', () => {
    const { getAllByTestId } = render(
      <Board
        board={mockBoard}
        initialBoard={mockInitialBoard}
        onCellChange={mockOnCellChange}
      />
    );

    expect(getAllByTestId('sudoku-cell')).toHaveLength(81);
  });

  it('calls onCellChange when a cell value changes', () => {
    const { getAllByTestId } = render(
      <Board
        board={mockBoard}
        initialBoard={mockInitialBoard}
        onCellChange={mockOnCellChange}
      />
    );

    const firstCell = getAllByTestId('sudoku-cell')[0];
    fireEvent.change(firstCell, { target: { value: '5' } });

    expect(mockOnCellChange).toHaveBeenCalledWith(0, 0, 5);
  });
});
