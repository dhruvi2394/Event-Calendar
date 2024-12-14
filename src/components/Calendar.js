import React, { useState, useEffect } from 'react';
import { format, isToday, isSameDay } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.css';
import EventModal from './EventModal';
import EventList from './EventList';
import Header from './Header';
import EventPage from './EventPage'; // Import EventPage component
import {
  getCurrentDate,
  generateCalendarDays,
  getPreviousMonth,
  getNextMonth,
  isSameDay as isSameDayHelper,
} from '../utils/dateUtils';

const Calendar = () => {
  const currentDate = getCurrentDate();
  const [selectedDay, setSelectedDay] = useState(currentDate);
  const [daysInMonth, setDaysInMonth] = useState(generateCalendarDays(currentDate.getFullYear(), currentDate.getMonth()));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState(null);
  const [events, setEvents] = useState([]);
  const [hoveredDay, setHoveredDay] = useState(null);
  const navigate = useNavigate();

  const handleAddEvent = (day) => {
    setSelectedDay(day);
    setIsModalOpen(true);
  };

  const saveEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
    setIsModalOpen(false);
  };

  const changeMonth = (direction) => {
    const newDate = direction === -1 ? getPreviousMonth(selectedDay) : getNextMonth(selectedDay);
    setSelectedDay(newDate);
    setDaysInMonth(generateCalendarDays(newDate.getFullYear(), newDate.getMonth()));
  };

  const selectDay = (day) => {
    setSelectedDay(day);
  };

  const isSameDayHelperSafe = (day1, day2) => {
    if (!day1 || !day2) return false;
    return isSameDayHelper(day1, day2);
  };

  return (
    <div className="calendar-container">
      <Header
        currentDate={selectedDay}
        onPreviousMonth={() => changeMonth(-1)}
        onNextMonth={() => changeMonth(1)}
      />

      <div className="calendar-body">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
          <div key={index} className="calendar-day header">
            {day}
          </div>
        ))}

        {daysInMonth.map((day, index) => {
          const isSelected = isSameDayHelperSafe(day, selectedDay);
          const isCurrentDay = isToday(day);
          const dayEvents = events.filter(event => {
            const eventDate = new Date(event.date);
            return isSameDayHelperSafe(eventDate, day);
          });

          return (
            <div
              key={index}
              className={`calendar-day ${isSelected ? 'selected-day' : ''} ${isCurrentDay ? 'current-day' : ''} ${dayEvents.length > 0 ? 'has-event' : ''}`}
              onClick={() => selectDay(day)}
              onMouseEnter={() => setHoveredDay(day)}
              onMouseLeave={() => setHoveredDay(null)}
            >
              {format(day, 'd')}
              {(isSameDayHelperSafe(day, hoveredDay) || isSelected) && (
                <button
                  className="add-event-btn"
                  onClick={() => handleAddEvent(day)}
                >
                  <img src="event-calendar/src/components/edit.png" alt="Add Event" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Render EventList */}
      <EventList events={events} onEditEvent={(event) => setEventToEdit(event)} />

      {/* Render EventPage */}
      <EventPage selectedDay={selectedDay} events={events} />

      {/* Render EventModal */}
      {isModalOpen && (
        <EventModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={saveEvent}
          event={eventToEdit}
        />
      )}
    </div>
  );
};

export default Calendar;
