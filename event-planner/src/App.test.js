import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Event Planner heading', () => {
  render(<App />);
  const heading = screen.getByText(/event planner/i);
  expect(heading).toBeInTheDocument();
});
