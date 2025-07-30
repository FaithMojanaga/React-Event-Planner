import React from 'react';

// EventPlanner component displays a simple form to add events
function EventPlanner() {
  return (
    <div>
      <h1>Event Planner</h1>

      <input aria-label="Event Title" type="text" />

      <input aria-label="Event Date" type="date" />

      {/* Button to add the event (functionality to be added later) */}
      <button>Add Event</button>
    </div>
  );
}

export default EventPlanner;
