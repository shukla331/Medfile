import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const UploadConfirmation = () => (
  <ScreenLayout title="Upload Confirmation" subtitle="Prescription uploaded successfully.">
    <div className="card">
      <div className="card-title">Details</div>
      <div className="list">
        <div className="timeline-item">
          <span>Patient</span>
          <strong>Asha Sharma</strong>
        </div>
        <div className="timeline-item">
          <span>Status</span>
          <span className="badge status-warn">Processing</span>
        </div>
      </div>
    </div>
    <CtaBar primary="Go to Dashboard" secondary="View Status" />
  </ScreenLayout>
);

export default UploadConfirmation;
