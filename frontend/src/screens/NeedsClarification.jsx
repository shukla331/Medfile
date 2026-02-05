import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const NeedsClarification = () => (
  <ScreenLayout title="Needs Clarification" subtitle="We need clarification on this prescription.">
    <div className="card">
      <p className="helper">Contact support or re-upload a clearer image.</p>
    </div>
    <CtaBar primary="Contact Support" secondary="Re-upload" />
  </ScreenLayout>
);

export default NeedsClarification;
