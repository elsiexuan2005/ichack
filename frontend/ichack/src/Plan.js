import React, { useState } from 'react';
import './Plan.css';
import Map from './Map'

function Plan() {
  const dummyActivities = ['Visit Museum', 'Lunch at Cafe', 'Walk in Park', 'Shopping', 'Visit Gallery', 'Go to beach', 'Visit zoo'];
  const [plannedActivities, setPlannedActivities] = useState([]);
  const [nearbyActivities, setNearbyActivities] = useState(dummyActivities);
  const [locations, setLocations] = useState([{ lat: 51.9, lng: -2.1 }, { lat: 51.8, lng: -2.2 }]);

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

  const handleAddLocation = (newLocation) => {
    setLocations([...locations, newLocation])
  }

  return (
    <div className="plan-container">
      <div className="upper-container">
        <div className="map-container">
          <Map locations={locations} />
        </div>
        <div className="activities-container">
          <div
            className="selected-activities"
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, 'planned')}
          >
            <h2 className="activities-header">Planned Activities</h2>
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
            <h2 className="activities-header">Nearby Activities</h2>
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
      <textarea className="user-notes" placeholder="State any preferences here"></textarea>
    </div>
  );
}

export default Plan;