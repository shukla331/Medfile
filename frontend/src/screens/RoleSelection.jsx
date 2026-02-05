import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const RoleSelection = () => (
  <ScreenLayout title="Choose your role" subtitle="Decide your journey early.">
    <div className="grid">
      <div className="card">
        <div className="card-title">I’m a Patient / Caregiver</div>
        <p className="helper">Upload and manage prescriptions for yourself or family.</p>
      </div>
      <div className="card">
        <div className="card-title">I’m a Clinic / Hospital / Doctor</div>
        <p className="helper">Upload prescriptions and track processing status.</p>
      </div>
    </div>
    <CtaBar primary="Continue" secondary="Need help?" />
  </ScreenLayout>
);

export default RoleSelection;
