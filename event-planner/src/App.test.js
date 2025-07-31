import { render, screen } from '@testing-library/react';
import App from './App';

// This test checks if the main heading "Event Planner" is rendered in the App component.
// It uses React Testing Library to render the component and queries the DOM for the heading text.
// The test passes if the heading is found in the document.
test('renders Event Planner heading', () => {
  render(<App />);
  const heading = screen.getByText(/event planner/i);
  expect(heading).toBeInTheDocument();
});
