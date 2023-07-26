import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ExpectedProperties from './components/2.Presentational-components/expected-properties/ExpectedProperties.component';
import BasicPageComponent from './components/1.Basic-test/BasicPage';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/basic-component">Basic Component</Link></li>
          <li><Link to="/expected-properties">Expected Properties</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="basic-component" element={<BasicPageComponent />} />
        <Route path="expected-properties" element={<ExpectedProperties />} />
      </Routes>
    </Router>
  );
}

export default App;
