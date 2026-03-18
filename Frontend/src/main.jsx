import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './styles.css';

const BACKEND_BASE = 'https://isote-e-commerce-1.onrender.com';
const ping = () => fetch(`${BACKEND_BASE}/health`, { mode: 'no-cors' }).catch(() => {});
ping();
setInterval(ping, 14 * 60 * 1000);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);