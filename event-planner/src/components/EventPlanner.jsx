import React, { useState } from 'react';

function EventPlanner() {
  const [events, setEvents] = useState([]);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');

  const handleAdd = () => {
    if (!title || !date) return;

    setEvents([...events, { title, date }]);
    setTitle('');
    setDate('');
  };

  return (
    <div>
      <h1>Event Planner</h1>

      <input
        aria-label="Event Title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter event title"
      />

      <input
        aria-label="Event Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button onClick={handleAdd}>Add Event</button>

      <ul>
        {events.map((event, index) => (
          <li key={index}>
            <strong>{event.title}</strong> - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EventPlanner;
