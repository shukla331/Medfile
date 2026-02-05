import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ProviderUploadConfirmation = () => (
  <ScreenLayout title="Upload Successful" subtitle="Your prescription is processing.">
    <div className="card">
      <div className="list">
        <div className="timeline-item">
          <span>Upload mode</span>
          <strong>Anonymous Upload</strong>
        </div>
        <div className="timeline-item">
          <span>Status</span>
          <span className="badge status-warn">Processing</span>
        </div>
      </div>
    </div>
    <CtaBar primary="Back to Dashboard" secondary="View Status" />
  </ScreenLayout>
);

export default ProviderUploadConfirmation;
