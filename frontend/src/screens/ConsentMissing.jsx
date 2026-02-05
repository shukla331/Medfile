import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ConsentMissing = () => (
  <ScreenLayout title="Consent Required" subtitle="Patient consent is required before upload.">
    <div className="card">
      <p className="helper">Capture consent to proceed with the upload.</p>
    </div>
    <CtaBar primary="Capture Consent" secondary="Back" />
  </ScreenLayout>
);

export default ConsentMissing;
