import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ProcessingStatus = () => (
  <ScreenLayout title="Processing Status" subtitle="Current system status overview.">
    <div className="card">
      <div className="list">
        <div className="timeline-item">
          <span>Status</span>
          <span className="badge status-warn">Processing</span>
        </div>
        <div className="timeline-item">
          <span>Last updated</span>
          <strong>5 minutes ago</strong>
        </div>
      </div>
    </div>
    <CtaBar primary="Refresh" secondary="Back" />
  </ScreenLayout>
);

export default ProcessingStatus;
