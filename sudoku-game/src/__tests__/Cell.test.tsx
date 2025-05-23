import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Cell from '../components/Cell';

describe('Cell', () => {
  const mockOnChange = jest.fn();

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('renders with correct value', () => {
    render(<Cell value={5} isInitial={false} onChange={mockOnChange} />);
    expect(screen.getByTestId('sudoku-cell')).toHaveValue(5);
  });

  it('renders empty for null value', () => {
    render(<Cell value={null} isInitial={false} onChange={mockOnChange} />);
    expect(screen.getByTestId('sudoku-cell')).toHaveValue(null);
  });

  it('is disabled when isInitial is true', () => {
    render(<Cell value={5} isInitial={true} onChange={mockOnChange} />);
    expect(screen.getByTestId('sudoku-cell')).toBeDisabled();
  });

  it('is enabled when isInitial is false', () => {
    render(<Cell value={5} isInitial={false} onChange={mockOnChange} />);
    expect(screen.getByTestId('sudoku-cell')).not.toBeDisabled();
  });

  it('calls onChange with correct value when input changes', () => {
    render(<Cell value={null} isInitial={false} onChange={mockOnChange} />);
    const input = screen.getByTestId('sudoku-cell');
    fireEvent.change(input, { target: { value: '5' } });
    expect(mockOnChange).toHaveBeenCalledWith(5);
  });

  it('calls onChange with null when input is cleared', () => {
    render(<Cell value={5} isInitial={false} onChange={mockOnChange} />);
    const input = screen.getByTestId('sudoku-cell');
    fireEvent.change(input, { target: { value: '' } });
    expect(mockOnChange).toHaveBeenCalledWith(null);
  });

  it('has correct CSS class when initial', () => {
    render(<Cell value={5} isInitial={true} onChange={mockOnChange} />);
    expect(screen.getByTestId('sudoku-cell')).toHaveClass('initial');
  });

  it('does not allow values outside 1-9 range', () => {
    render(<Cell value={null} isInitial={false} onChange={mockOnChange} />);
    const input = screen.getByTestId('sudoku-cell');

    fireEvent.change(input, { target: { value: '10' } });
    expect(mockOnChange).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '0' } });
    expect(mockOnChange).not.toHaveBeenCalled();

    fireEvent.change(input, { target: { value: '-1' } });
    expect(mockOnChange).not.toHaveBeenCalled();
  });
});
