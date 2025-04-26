import React from 'react';
import ReactDOM from 'react-dom/client'; // Update this import for React 18+
import App from './App';
import './styles/App.css'

// Create a root element
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render your app using the new React 18 method
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
