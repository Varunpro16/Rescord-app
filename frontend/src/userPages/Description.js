import React from 'react';
import '../css/Description.css';

const Description = () => {
  return (
    <div className="mission-details">
      <div className="mission-header">
        <h1>Mission Details</h1>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: '0%' }}>
          <span className="animation-typing">PROGRESS: 0%</span>
        </div>
      </div>
      <div className="mission-location">
        Location: <span className="animation-typing">Chennai</span>
      </div>
      <div className="disaster-info">
        Disaster: <span className="animation-typing">Landslide</span><br />
        Request on: <span className="animation-typing">4:30pm</span><br />
        Note: <span className="animation-typing">Water logged in many areas and many people are trapped under sand.</span>
      </div>
      <div className="mission-teams">
        Currently on this mission:
        <ul>
          <li><span className="animation-typing">Medical team</span></li>
          <li><span className="animation-typing">Human rescue team</span></li>
        </ul>
      </div>
      <div className="destination">
        Destination: <span className="animation-typing">13.023648, 80.223558 (Saidapet)</span>
      </div>
      <div className="agency-locations">
        Agency-1 current location: <span className="animation-typing">13.0280638181837, 80.2634100837376</span><br />
        Agency-2 current location: <span className="animation-typing">13.003387, 80.255043</span>
      </div>
    </div>
  );
};

export default Description;
