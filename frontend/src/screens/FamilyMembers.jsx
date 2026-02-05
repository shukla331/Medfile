import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const FamilyMembers = () => (
  <ScreenLayout title="Family Members" subtitle="Manage profiles for your household.">
    <div className="card">
      <div className="list">
        <div className="timeline-item">
          <span>Rahul Sharma</span>
          <span className="badge">Father</span>
        </div>
        <div className="timeline-item">
          <span>Meera Sharma</span>
          <span className="badge">Mother</span>
        </div>
      </div>
    </div>
    <CtaBar primary="Add Family Member" secondary="Back" />
  </ScreenLayout>
);

export default FamilyMembers;
