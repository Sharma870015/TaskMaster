import React, { useState } from 'react';
import './ReminderModal.css'

const ReminderModal = ({ isOpen, onClose, onSave }) => {
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    if (reminderDate && reminderTime) {
      onSave(reminderDate, reminderTime);
    } else {
      alert('Please set both date and time');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Set Reminder</h2>
        <div className="form-group">
          <label htmlFor="reminder-date">Date:</label>
          <input
            type="date"
            id="reminder-date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminder-time">Time:</label>
          <input
            type="time"
            id="reminder-time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
        </div>
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default ReminderModal;
