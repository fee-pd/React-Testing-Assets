import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import BasicPageComponent from 'src/components/1.Basic-test/BasicPage';
import ExpectedProperties from 'src/components/2.Presentational-components/expected-properties/ExpectedProperties.component';

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
