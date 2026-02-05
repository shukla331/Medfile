import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const PrescriptionStatus = () => (
  <ScreenLayout title="Prescription Status" subtitle="Track progress in real time.">
    <div className="card">
      <div className="list">
        <div className="timeline-item">
          <span>Prescription ID</span>
          <strong>MED-1023</strong>
        </div>
        <div className="timeline-item">
          <span>Patient</span>
          <strong>Asha Sharma</strong>
        </div>
      </div>
    </div>
    <div className="card">
      <div className="card-title">Status Timeline</div>
      <div className="timeline">
        <div className="timeline-item">
          <span>Uploaded</span>
          <span className="badge">Done</span>
        </div>
        <div className="timeline-item">
          <span>Processing</span>
          <span className="badge status-warn">In progress</span>
        </div>
        <div className="timeline-item">
          <span>Ready</span>
          <span className="badge">Pending</span>
        </div>
      </div>
    </div>
    <CtaBar primary="View Details" secondary="Back" />
  </ScreenLayout>
);

export default PrescriptionStatus;
