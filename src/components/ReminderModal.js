import React, { useState, useEffect } from 'react';
import './ReminderModal.css'

const ReminderModal = ({ isOpen, onClose, onSave }) => {
  const [reminderDate, setReminderDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');

  useEffect(() => {
    if (isOpen) {
      const now = new Date();
      const currentDate = now.toISOString().split('T')[0];
      const currentTime = now.toTimeString().split(' ')[0].slice(0, 5);
      setReminderDate(currentDate);
      setReminderTime(currentTime);
    }
  }, [isOpen]);

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
        <h2 className='set-align'>Set Reminder</h2>
        <div className="form-group">
          <label className='for-label' htmlFor="reminder-date">Date:</label>
          <input
            type="date"
            id="reminder-date"
            value={reminderDate}
            onChange={(e) => setReminderDate(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className='for-label' htmlFor="reminder-time">Time:</label>
          <input
            type="time"
            id="reminder-time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
          />
        </div>
        <div className="button-group">
          <button className='for-Save' onClick={handleSave}>Save</button>
          <button className='for-cancel' onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ReminderModal;
