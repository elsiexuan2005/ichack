import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home'
import Plan from './Plan'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<Plan />} />
      </Routes>
    </Router>
  );
}

export default App;
