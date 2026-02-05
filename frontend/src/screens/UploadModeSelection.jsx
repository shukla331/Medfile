import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const UploadModeSelection = () => (
  <ScreenLayout title="Choose Upload Mode" subtitle="Select how you want to upload.">
    <div className="grid">
      <div className="card">
        <div className="card-title">Anonymous Upload</div>
        <p className="helper">No patient identifiers stored.</p>
      </div>
      <div className="card">
        <div className="card-title">Upload for Existing Patient</div>
        <p className="helper">Search and link to patient profile.</p>
      </div>
      <div className="card">
        <div className="card-title">Create New Patient & Upload</div>
        <p className="helper">Add new patient details first.</p>
      </div>
    </div>
    <CtaBar primary="Continue" secondary="Back" />
  </ScreenLayout>
);

export default UploadModeSelection;
