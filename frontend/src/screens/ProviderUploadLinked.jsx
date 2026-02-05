import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ProviderUploadLinked = () => (
  <ScreenLayout title="Upload for Patient" subtitle="Link the upload to an existing patient.">
    <div className="card">
      <div className="input-group">
        <label htmlFor="patient">Phone number / Patient ID</label>
        <input id="patient" className="input" placeholder="Search" />
      </div>
    </div>
    <div className="card">
      <div className="card-title">Upload Area</div>
      <p className="helper">Drop the prescription file or use camera.</p>
    </div>
    <div className="card">
      <label className="timeline-item">
        <span>Patient has consented</span>
        <input type="checkbox" defaultChecked />
      </label>
    </div>
    <CtaBar primary="Upload" secondary="Back" />
  </ScreenLayout>
);

export default ProviderUploadLinked;
