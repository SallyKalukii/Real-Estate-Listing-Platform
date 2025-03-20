import React from 'react';
import ReactDOM from 'react-dom/client';  // ✅ React 18 import
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));  // ✅ React 18 way
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
