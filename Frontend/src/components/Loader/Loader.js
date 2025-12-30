import React from 'react';
import './Loader.css';

const Loader = ({ size = 'medium', fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="loader-fullscreen">
        <div className={`loader loader-${size}`}>
          <div className="loader-spinner"></div>
          <p className="loader-text">ISOTÉ</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`loader loader-${size}`}>
      <div className="loader-spinner"></div>
    </div>
  );
};

export default Loader;