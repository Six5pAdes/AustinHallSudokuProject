import React from 'react';
import { CellValue } from '../types';

interface CellProps {
  value: CellValue;
  isInitial: boolean;
  onChange: (value: CellValue) => void;
}

const Cell: React.FC<CellProps> = ({ value, isInitial, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? null : Number(e.target.value);
    if (newValue === null || (newValue >= 1 && newValue <= 9)) {
      onChange(newValue);
    }
  };

  return (
    <input
      type="number"
      value={value || ''}
      onChange={handleChange}
      className={`cell ${isInitial ? 'initial' : ''}`}
      min="1"
      max="9"
      disabled={isInitial}
      data-testid="sudoku-cell"
    />
  );
};

export default Cell;
