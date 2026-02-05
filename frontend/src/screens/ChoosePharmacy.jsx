import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ChoosePharmacy = () => (
  <ScreenLayout title="Choose Pharmacy" subtitle="Select where to send the prescription.">
    <div className="card">
      <div className="list">
        <div className="timeline-item">
          <span>HealthPlus Pharmacy</span>
          <span className="badge">Nearby</span>
        </div>
        <div className="timeline-item status-good">
          <span>Janaushadhi</span>
          <span className="badge">Highlighted</span>
        </div>
      </div>
    </div>
    <CtaBar primary="Select Pharmacy" secondary="Back" />
  </ScreenLayout>
);

export default ChoosePharmacy;
