import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EventPage = () => {
  const { eventId } = useParams(); // Get the eventId from the URL
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the event based on the eventId (this can be from state, localStorage, or an API)
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const foundEvent = events.find(e => e.id === eventId);
    setEvent(foundEvent);
  }, [eventId]);

  const handleBack = () => {
    navigate('/'); // Navigate back to the calendar page
  };

  return (
    <div className="event-page">
      {event ? (
        <div>
          <h2>{event.name}</h2>
          <p>{`Start Time: ${event.startTime}`}</p>
          <p>{`End Time: ${event.endTime}`}</p>
          <p>{`Description: ${event.description || 'No description available'}`}</p>
          <button onClick={handleBack}>Back to Calendar</button>
        </div>
      ) : (
        <p>Event not found</p>
      )}
    </div>
  );
};

export default EventPage;
