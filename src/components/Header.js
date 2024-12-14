import React from 'react';
import { format } from 'date-fns'; // Import format from date-fns

const Header = ({ currentDate, onPreviousMonth, onNextMonth }) => {
  if (!currentDate) {
    return <div>Error: Current date is not available.</div>;
  }

  const handlePreviousMonth = () => {
    onPreviousMonth(); // Trigger previous month action
  };

  const handleNextMonth = () => {
    onNextMonth(); // Trigger next month action
  };

  return (
    <div className="calendar-header">
      <button onClick={handlePreviousMonth}>Previous</button>
      <h2>{format(currentDate, 'MMMM yyyy')}</h2> {/* Display month and year */}
      <button onClick={handleNextMonth}>Next</button>
    </div>
  );
};

export default Header;
