import React from 'react';
import ReactDOM from 'react-dom/client';  // React 18 import
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import '@fortawesome/fontawesome-free/css/all.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));  // React 18 way
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
