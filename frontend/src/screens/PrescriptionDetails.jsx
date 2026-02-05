import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const PrescriptionDetails = () => (
  <ScreenLayout title="Prescription Details" subtitle="Medication guidance based on the prescription.">
    <div className="card">
      <div className="list">
        <div className="timeline-item">
          <span>Amoxicillin</span>
          <span className="badge">500mg</span>
        </div>
        <div className="timeline-item">
          <span>Cetirizine</span>
          <span className="badge">10mg</span>
        </div>
        <div className="timeline-item">
          <span>Ibuprofen</span>
          <span className="badge">5 days</span>
        </div>
      </div>
      <p className="footer-note">Follow doctor’s advice.</p>
    </div>
    <CtaBar primary="Return to Dashboard" secondary="Share" />
  </ScreenLayout>
);

export default PrescriptionDetails;
