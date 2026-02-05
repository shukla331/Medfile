import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const PatientDashboard = () => (
  <ScreenLayout title="Hi, Asha" subtitle="Here is a quick view of your prescriptions.">
    <div className="grid">
      <div className="card">
        <div className="card-title">Upload Prescription</div>
        <p className="helper">Snap or upload an image/PDF.</p>
      </div>
      <div className="card">
        <div className="card-title">Family Members</div>
        <p className="helper">Manage family profiles.</p>
      </div>
    </div>

    <div className="card">
      <div className="card-title">Recent Prescriptions</div>
      <div className="list">
        <div className="timeline-item">
          <span>Rx #MED-1023</span>
          <span className="badge status-warn">Processing</span>
        </div>
        <div className="timeline-item">
          <span>Rx #MED-1019</span>
          <span className="badge status-good">Ready</span>
        </div>
      </div>
    </div>
    <CtaBar primary="Upload Prescription" secondary="Family Members" />
  </ScreenLayout>
);

export default PatientDashboard;
