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
test('deletes an event from the list', () => {
  render(<EventPlanner />);

  // Add an event first
  fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Meeting' } });
  fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2025-08-01' } });
  fireEvent.click(screen.getByRole('button', { name: /add event/i }));

  // Confirm event is added
  expect(screen.getByText(/meeting/i)).toBeInTheDocument();

  // Click the delete button next to the event
  fireEvent.click(screen.getByRole('button', { name: /delete meeting/i }));

  // Confirm event is removed
  expect(screen.queryByText(/meeting/i)).not.toBeInTheDocument();
});

test('does not add event if title is empty', () => {
  render(<EventPlanner />);

  fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2025-08-01' } });
  fireEvent.click(screen.getByRole('button', { name: /add event/i }));

  expect(screen.queryByText('2025-08-01')).not.toBeInTheDocument();
});

test('does not add event if date is empty', () => {
  render(<EventPlanner />);

  fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Meeting' } });
  fireEvent.click(screen.getByRole('button', { name: /add event/i }));

  expect(screen.queryByText('Meeting')).not.toBeInTheDocument();
});

test('does not add event if date is in the past', () => {
  render(<EventPlanner />);

  fireEvent.change(screen.getByLabelText(/event title/i), { target: { value: 'Past Event' } });
  fireEvent.change(screen.getByLabelText(/event date/i), { target: { value: '2000-01-01' } });
  fireEvent.click(screen.getByRole('button', { name: /add event/i }));

  expect(screen.queryByText('Past Event')).not.toBeInTheDocument();
});
