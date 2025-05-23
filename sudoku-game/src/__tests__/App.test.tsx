import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App';

describe('App', () => {
  it('renders the Sudoku game', () => {
    render(<App />);

    // Check for Sudoku title
    expect(screen.getByText('Sudoku')).toBeInTheDocument();

    // Check for game board
    expect(screen.getByTestId('sudoku-game')).toBeInTheDocument();

    // Check for New Game button
    expect(screen.getByText('New Game')).toBeInTheDocument();
  });
});
