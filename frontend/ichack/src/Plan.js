import React from 'react';
import './Plan.css';

function Plan() {
  const dummyActivities = ['Visit Museum', 'Lunch at Cafe', 'Walk in Park', 'Shopping', 'Visit Gallery'];

  return (
    <div className="plan-container">
      <div className="upper-container">
        <div className="map-container">
          <p>Interactive Map (Dummy)</p>
        </div>
        <div className="activities-container">
          <div className="selected-activities">
            <h2>Planned Activities</h2>
            <ul className="activity-list">
              {/* Initially empty list of planned activities */}
            </ul>
          </div>
          <div className="nearby-activities">
            <h2>Nearby Activities</h2>
            <ul className="activity-list">
              {dummyActivities.map((activity, index) => (
                <li key={index} draggable="true">
                  {activity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <textarea className="user-notes" placeholder="Add your notes here..."></textarea>
    </div>
  );
}

export default Plan;
