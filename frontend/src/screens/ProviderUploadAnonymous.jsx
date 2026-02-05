import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ProviderUploadAnonymous = () => (
  <ScreenLayout title="Anonymous Upload" subtitle="No patient identifiers stored.">
    <div className="card">
      <div className="card-title">Upload Area</div>
      <p className="helper">Drag and drop or use the camera to capture.</p>
    </div>
    <div className="card">
      <label className="timeline-item">
        <span>No patient identifiers stored</span>
        <input type="checkbox" defaultChecked />
      </label>
    </div>
    <CtaBar primary="Upload" secondary="Back" />
  </ScreenLayout>
);

export default ProviderUploadAnonymous;
