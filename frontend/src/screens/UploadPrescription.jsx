import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const UploadPrescription = () => (
  <ScreenLayout title="Upload Prescription" subtitle="Select patient and upload the file.">
    <div className="card">
      <div className="card-title">Select Patient</div>
      <div className="list">
        <label className="timeline-item">
          <span>Self</span>
          <input type="radio" name="patient" defaultChecked />
        </label>
        <label className="timeline-item">
          <span>Rahul Sharma</span>
          <input type="radio" name="patient" />
        </label>
      </div>
    </div>

    <div className="card">
      <div className="card-title">Upload Options</div>
      <div className="list">
        <div className="timeline-item">
          <span>Camera scan</span>
          <span className="badge">Preferred</span>
        </div>
        <div className="timeline-item">
          <span>Upload image/PDF</span>
          <span className="badge">Browse</span>
        </div>
      </div>
    </div>
    <CtaBar primary="Upload" secondary="Back" />
  </ScreenLayout>
);

export default UploadPrescription;
