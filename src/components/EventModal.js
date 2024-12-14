import React, { useState, useEffect } from 'react';

const EventModal = ({ isOpen, onClose, onSave, event = null }) => {
  const [eventName, setEventName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (event) {
      setEventName(event.name);
      setStartTime(event.startTime);
      setEndTime(event.endTime);
      setDescription(event.description || '');
    }
  }, [event]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      name: eventName,
      startTime,
      endTime,
      description,
    };
    onSave(newEvent);
    clearForm();
  };

  const handleDelete = () => {
    if (event) {
      onSave(null, event.id); // Delete event by ID
    }
    clearForm();
  };

  const clearForm = () => {
    setEventName('');
    setStartTime('');
    setEndTime('');
    setDescription('');
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{event ? 'Edit Event' : 'Add Event'}</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="event-name">Event Name</label>
            <input
              type="text"
              id="event-name"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-time">Start Time</label>
            <input
              type="datetime-local"
              id="start-time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
            <input
              type="datetime-local"
              id="end-time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description (optional)</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="modal-footer">
            <button type="submit">{event ? 'Save Changes' : 'Add Event'}</button>
            {event && (
              <button type="button" onClick={handleDelete}>
                Delete Event
              </button>
            )}
            <button type="button" onClick={onClose}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventModal;
