import { useState, useEffect } from 'react';

// Helper function to generate days in a month
const generateCalendarDays = (year, month) => {
    const date = new Date(year, month, 1);
    const days = [];
  
    // Get the starting day of the month and the number of days in the month
    const firstDayOfMonth = date.getDay();  // Day of the week for 1st day of month
    const totalDaysInMonth = new Date(year, month + 1, 0).getDate();  // Total days in the month
  
    // Fill in empty spaces before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
  
    // Add actual days in the month as Date objects
    for (let i = 1; i <= totalDaysInMonth; i++) {
      days.push(new Date(year, month, i));  // Create Date object for each day
    }
  
    return days;
  };
  

// Custom hook for calendar logic
const useCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    // Load events from localStorage if available
    const storedEvents = localStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : {};
  });

  const [selectedDay, setSelectedDay] = useState(null);

  // Get the current month and year
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Generate calendar days for the current month
  const daysInMonth = generateCalendarDays(year, month);

  // Handle changing the month
  const changeMonth = (direction) => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + direction);
      return newDate;
    });
  };

  // Handle selecting a day
  const selectDay = (day) => {
    if (day) {
      setSelectedDay(day);
    }
  };

  // Handle adding or updating an event
  const addEvent = (day, event) => {
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
      if (!newEvents[day]) {
        newEvents[day] = [];
      }
      newEvents[day].push(event);
      // Store the updated events in localStorage
      localStorage.setItem('events', JSON.stringify(newEvents));
      return newEvents;
    });
  };

  // Handle removing an event
  const removeEvent = (day, eventIndex) => {
    setEvents((prevEvents) => {
      const newEvents = { ...prevEvents };
      if (newEvents[day]) {
        newEvents[day].splice(eventIndex, 1);
        if (newEvents[day].length === 0) {
          delete newEvents[day];
        }
        localStorage.setItem('events', JSON.stringify(newEvents));
      }
      return newEvents;
    });
  };

  // Return the calendar state and actions
  return {
    currentDate,
    daysInMonth,
    selectedDay,
    events,
    changeMonth,
    selectDay,
    addEvent,
    removeEvent,
  };
};

export default useCalendar;
