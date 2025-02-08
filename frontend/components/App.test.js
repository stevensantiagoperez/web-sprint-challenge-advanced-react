import React from 'react'; // Import React
import '@testing-library/jest-dom'; // Add this line
import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';

test('sanity', () => {
  expect(true).toBe(true)
})

// Test 1: Check if coordinates and steps are rendered correctly
test('renders coordinates and steps', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/Coordinates \(2, 2\)/i)).toBeInTheDocument();
  expect(screen.getByText(/You moved 0 times/i)).toBeInTheDocument();
});

// Test 2: Check if typing in the email input updates its value
test('typing in the email input updates its value', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText(/type email/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(emailInput.value).toBe('test@example.com');
});

// Test 3: Check if the "B" is in the correct position
test('B is in the correct position', () => {
  render(<AppFunctional />);
  const activeSquare = screen.getByText('B');
  expect(activeSquare).toBeInTheDocument();
  expect(activeSquare).toHaveClass('active'); // Check the element itself, not its parent
});

// Test 4: Check if the reset button works
test('reset button resets the state', () => {
  render(<AppFunctional />);
  const resetButton = screen.getByText(/reset/i);
  fireEvent.click(resetButton);
  expect(screen.getByText(/Coordinates \(2, 2\)/i)).toBeInTheDocument();
  expect(screen.getByText(/You moved 0 times/i)).toBeInTheDocument();
});

// Test 5: Check if moving left updates the position
test('moving left updates the position', () => {
  render(<AppFunctional />);
  const leftButton = screen.getByText(/left/i);
  fireEvent.click(leftButton);
  expect(screen.getByText(/Coordinates \(1, 2\)/i)).toBeInTheDocument();
  expect(screen.getByText(/You moved 1 time/i)).toBeInTheDocument();
});