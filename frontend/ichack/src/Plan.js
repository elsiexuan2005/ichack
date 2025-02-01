import React, { useState } from 'react';
import './Plan.css';

function Plan() {
  const dummyActivities = ['Visit Museum', 'Lunch at Cafe', 'Walk in Park', 'Shopping', 'Visit Gallery', 'Go to beach', 'Visit zoo'];
  const [plannedActivities, setPlannedActivities] = useState([]);
  const [nearbyActivities, setNearbyActivities] = useState(dummyActivities);

  const handleDragStart = (event, activity, listType) => {
    event.dataTransfer.setData('text/plain', JSON.stringify({ activity, listType }));
  };

  const handleDrop = (event, targetListType) => {
    event.preventDefault();
    const { activity, listType } = JSON.parse(event.dataTransfer.getData('text/plain'));

    if (listType === 'nearby' && targetListType === 'planned') {
      setNearbyActivities(nearbyActivities.filter(item => item !== activity));
      setPlannedActivities([...plannedActivities, activity]);
    } else if (listType === 'planned' && targetListType === 'nearby') {
      setPlannedActivities(plannedActivities.filter(item => item !== activity));
      setNearbyActivities([...nearbyActivities, activity]);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="plan-container">
      <div className="upper-container">
        <div className="map-container">
          <p>Interactive Map (Dummy)</p>
        </div>
        <div className="activities-container">
          <div
            className="selected-activities"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, 'planned')}
          >
            <h2>Planned Activities</h2>
            <ul className="activity-list">
              {plannedActivities.map((activity, index) => (
                <li
                  key={index}
                  draggable="true"
                  onDragStart={(event) => handleDragStart(event, activity, 'planned')}
                >
                  {activity}
                </li>
              ))}
            </ul>
          </div>
          <div
            className="nearby-activities"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, 'nearby')}
          >
            <h2>Nearby Activities</h2>
            <ul className="activity-list">
              {nearbyActivities.map((activity, index) => (
                <li
                  key={index}
                  draggable="true"
                  onDragStart={(event) => handleDragStart(event, activity, 'nearby')}
                >
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
