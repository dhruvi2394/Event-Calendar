import React, { useState, useEffect } from 'react';
import {Route, Routes } from 'react-router-dom';
import Calendar from './components/Calendar.js';
import EventPage from './components/EventPage.js'; // New page for event details (for example)
import './App.css';
import EventModal from './components/EventModal';
import EventList from './components/EventList';

function App() {
  return (
  
      <div className="App">
        <Routes>
          <Route path="/" element={<Calendar/>} />
          <Route path="/event-page" element={<EventPage/>} />
          <Route path="/event-modal" element={<EventModal />} />
          <Route path="/event-list" element={<EventList /> } />
        </Routes>

      
      </div>

  );
}

export default App;
