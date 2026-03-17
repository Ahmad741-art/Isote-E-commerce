import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const BACKEND_URL = import.meta.env.VITE_API_URL || 'https://isote-backend.onrender.com';
const ping = () => fetch(`${BACKEND_URL}/health`, { mode: 'no-cors' }).catch(() => {});
ping();
setInterval(ping, 14 * 60 * 1000);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);