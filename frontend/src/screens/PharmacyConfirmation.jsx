import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const PharmacyConfirmation = () => (
  <ScreenLayout title="Pharmacy Confirmation" subtitle="Prescription ready for pharmacy.">
    <div className="card">
      <div className="list">
        <div className="timeline-item">
          <span>Pharmacy</span>
          <strong>Janaushadhi - City Center</strong>
        </div>
        <div className="timeline-item">
          <span>Status</span>
          <span className="badge status-good">Ready</span>
        </div>
      </div>
    </div>
    <CtaBar primary="Done" secondary="View Details" />
  </ScreenLayout>
);

export default PharmacyConfirmation;
