import { render, screen } from '@testing-library/react';
import EventPlanner from '../components/EventPlanner';

// Test that the EventPlanner component renders the necessary form elements
test('renders input fields and Add button', () => {
  // Render the EventPlanner component in a virtual DOM for testing
  render(<EventPlanner />);

  // Check if the input for event title is rendered and accessible by label
  expect(screen.getByLabelText(/event title/i)).toBeInTheDocument();

  // Check if the input for event date is rendered and accessible by label
  expect(screen.getByLabelText(/event date/i)).toBeInTheDocument();

  // Check if the button labeled "Add Event" is rendered and accessible
  expect(screen.getByRole('button', { name: /add event/i })).toBeInTheDocument();
});
