import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import LandingPage from './pages/LandingPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import PropertyType from './pages/PropertyType';
import PropertyManagement from './pages/PropertyManagement';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">Home Hive</Link>
          <div className="navbar-nav">
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </div>
        </div>
      </nav>

      <nav style={{ padding: '20px', background: '#f0f0f0' }}>
        <Link to="/PropertyType" style={{ marginRight: '15px' }}>
          View Property Type Page
        </Link>
      </nav>

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/PropertyType" element={<PropertyType />} />
        <Route path="/property-management" element={<PropertyManagement />} />
      </Routes>
      
    </Router>
  );
}

export default App;

