import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ProviderDashboard = () => (
  <ScreenLayout title="Provider Dashboard" subtitle="Quick actions for clinic staff.">
    <div className="grid">
      <div className="card">
        <div className="card-title">Upload Prescription</div>
        <p className="helper">For an existing or new patient.</p>
      </div>
      <div className="card">
        <div className="card-title">Upload Anonymously</div>
        <p className="helper">No identifiers stored.</p>
      </div>
    </div>
    <div className="card">
      <div className="card-title">Upload History</div>
      <div className="list">
        <div className="timeline-item">
          <span>Upload #PR-45</span>
          <span className="badge status-warn">Processing</span>
        </div>
      </div>
    </div>
    <CtaBar primary="Upload Prescription" secondary="Upload Anonymously" />
  </ScreenLayout>
);

export default ProviderDashboard;
