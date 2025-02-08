import { render, screen, fireEvent } from '@testing-library/react';
import AppFunctional from './AppFunctional';
import React from 'react';

// Write your tests here
test('sanity', () => {
  expect(true).toBe(false)
})

test('renders coordinates and steps', () => {
  render(<AppFunctional />);
  expect(screen.getByText(/Coordinates \(2, 2\)/i)).toBeInTheDocument();
  expect(screen.getByText(/You moved 0 times/i)).toBeInTheDocument();
});

test('typing in the email input updates its value', () => {
  render(<AppFunctional />);
  const emailInput = screen.getByPlaceholderText(/type email/i);
  fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
  expect(emailInput.value).toBe('test@example.com');
});
