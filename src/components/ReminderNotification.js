import React, { useState } from 'react';
import ReminderNotification from './ReminderNotification';

const ReminderNotification = () => {
  const [showNotification, setShowNotification] = useState(true);

  return (
    <div>
      {showNotification && (
        <ReminderNotification
          title="Reminder"
          description="This is a reminder notification."
          onClose={() => setShowNotification(false)}
        />
      )}
    </div>
  );
};