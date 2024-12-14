import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const EventList = () => {
  const location = useLocation();
  const { selectedDate } = location.state || {}; // Safely access state
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (selectedDate) {
      const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
      const filteredEvents = storedEvents.filter(
        (event) => event.date === selectedDate
      );
      setEvents(filteredEvents);
    }
  }, [selectedDate]);

  const handleDelete = (eventId) => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    const updatedEvents = storedEvents.filter((event) => event.id !== eventId);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    setEvents(updatedEvents.filter((event) => event.date === selectedDate));
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Events for {selectedDate || "this day"}</h2>
          <button onClick={() => window.history.back()} style={{ backgroundColor: "#e74c3c" }}>
            Close
          </button>
        </div>
        <div className="modal-body">
          {events.length > 0 ? (
            <ul className="event-list">
              {events.map((event) => (
                <li key={event.id} className="event-item">
                  <div>
                    <strong>{event.name}</strong>
                    <span>
                      {event.startTime} - {event.endTime}
                    </span>
                    {event.description && <p>{event.description}</p>}
                  </div>
                  <button
                    onClick={() => handleDelete(event.id)}
                    style={{ backgroundColor: "#e74c3c", color: "white" }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No events for this day</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventList;
