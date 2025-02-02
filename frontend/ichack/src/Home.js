import React, { useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

function Home() {
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');
  const [budget, setBudget] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  
  const dummySuggestions = ['Oxford', 'Oslo', 'Ontario', 'Orlando', 'Oklahoma City', 'Omaha'];
  
  const handleLocationChange = (event) => {
    const value = event.target.value;
    setLocation(value);
    if (value) {
      const filteredSuggestions = dummySuggestions.filter(suggestion => suggestion.toLowerCase().startsWith(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleTimeChange = (event) => {
    let value = event.target.value.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (value.length > 4) return; // Limit input to 4 digits

    if (value.length > 2) {
      value = value.slice(0, value.length - 2) + ':' + value.slice(value.length - 2); // Insert colon at appropriate position
    }

    setTime(value);
  };

  const handleBudgetChange = (event) => {
    let value = event.target.value.replace(/[^0-9.]/g, ''); // Remove non-numeric characters except decimal point
    if (value.startsWith('£')) {
      value = value.substring(1);
    }
    let parts = value.split('.'); 

    // Keep only the first decimal point
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    // Limit to two decimal places
    const decimalIndex = value.indexOf('.');
    if (decimalIndex !== -1) {
      value = value.substring(0, decimalIndex + 1) + value.substring(decimalIndex + 1, decimalIndex + 3);
    }

    setBudget(value ? '£' + value : '');
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion);
    setSuggestions([]);
  };

  const handleButtonClick = () => {
    navigate('/plan');
  };

  return (
    <div className="container">
      <h1 className="title">Journey Planner</h1>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input 
          type="text" 
          placeholder="Enter location" 
          value={location} 
          onChange={handleLocationChange} 
          className="search-bar"
        />
        {suggestions.length > 0 && (
          <ul className="suggestions-list">
            {suggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
      <input 
        type="text" 
        placeholder="Time" 
        value={time} 
        onChange={handleTimeChange} 
        className="time-input"
      />
      <input 
        type="text" 
        placeholder="Budget" 
        value={budget} 
        onChange={handleBudgetChange} 
        className="budget-input"
      />
      <button onClick={handleButtonClick} className="plan-button">Plan journey!</button>
    </div>
  );
}

export default Home;
