import React, { useState, useEffect } from 'react';

function EventPlanner() {
  // State to manage the list of events
  const [events, setEvents] = useState([]);
  // State to manage user input for event title and date
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  // State to display messages to the user
  const [message, setMessage] = useState('');

  // Load events from localStorage when the component mounts
  useEffect(() => {
    const stored = localStorage.getItem('events');
    if (stored) {
      setEvents(JSON.parse(stored));
    }
  }, []);

  // Save events to localStorage whenever the events array changes
  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  // Handle adding a new event
  const handleAdd = () => {
    setMessage(''); // Clear any previous messages

    // Validate title input
    if (!title.trim()) {
      setMessage('Event title cannot be empty.');
      return;
    }

    // Validate date input
    if (!date) {
      setMessage('Please select a date.');
      return;
    }

    // Normalize today's date (midnight)
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Normalize selected date
    const selectedDate = new Date(date);
    selectedDate.setHours(0, 0, 0, 0);

    // Prevent adding events in the past
    if (selectedDate < today) {
      setMessage('Date must not be in the past.');
      return;
    }

    // Prevent duplicate events
    if (events.some(event => event.title === title && event.date === date)) {
      setMessage('Event already exists.');
      return;
    }

    // Add the new event and sort by date
    const updatedEvents = [...events, { title, date }].sort(
      (a, b) => new Date(a.date) - new Date(b.date)
    );

    // Update state and clear input fields
    setEvents(updatedEvents);
    setTitle('');
    setDate('');
    setMessage('Event added successfully!');
  };

  // Handle deleting an event by index
  const handleDelete = (indexToDelete) => {
    setEvents(events.filter((_, index) => index !== indexToDelete));
    setMessage('Event deleted.');
  };

  // Validation to disable the Add button
  const isInvalid =
    !title.trim() ||
    !date ||
    new Date(date).setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0);

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Event Planner</h1>

      {/* Input field for event title */}
      <input
        aria-label="Event Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter event title"
        style={{ padding: '8px', width: '100%', marginBottom: '8px' }}
      />

      {/* Input field for event date */}
      <input
        aria-label="Event Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        style={{ padding: '8px', width: '100%', marginBottom: '8px' }}
      />

      {/* Add Event button */}
      <button
        onClick={handleAdd}
        disabled={isInvalid}
        style={{
          padding: '10px 20px',
          backgroundColor: isInvalid ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          cursor: isInvalid ? 'not-allowed' : 'pointer',
          marginBottom: '12px'
        }}
      >
        Add Event
      </button>

      {/* Display warning or success message */}
      {message && (
        <p style={{ color: message.includes('successfully') ? 'green' : 'red', marginBottom: '12px' }}>
          {message}
        </p>
      )}

      {/* Render the list of events */}
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {events.map((event, index) => (
          <li
            key={index}
            style={{
              borderBottom: '1px solid #ccc',
              padding: '8px 0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span>
              <strong>{event.title}</strong> - {event.date}
            </span>
            <button
              onClick={() => handleDelete(index)}
              aria-label={`delete ${event.title}`}
              style={{
                background: 'none',
                border: 'none',
                color: 'red',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventPlanner;
