import { render, screen, fireEvent } from '@testing-library/react';
import EventPlanner from '../components/EventPlanner';



test('adds event to the list when submitted', () => {
  render(<EventPlanner />);

  // Simulate typing in event title
  fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Meeting' } });

  // Simulate picking event date
  fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2025-08-01' } });

  // Click the Add Event button
  fireEvent.click(screen.getByRole('button', { name: /add event/i }));

  // Assert the event is displayed on the page
  expect(screen.getByText(/meeting/i)).toBeInTheDocument();
  expect(screen.getByText(/2025-08-01/i)).toBeInTheDocument();
});
