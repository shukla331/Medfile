import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const AddFamilyMember = () => (
  <ScreenLayout title="Add Family Member" subtitle="Save a new profile to tag prescriptions.">
    <div className="card">
      <div className="input-group">
        <label htmlFor="name">Name</label>
        <input id="name" className="input" placeholder="Full name" />
      </div>
      <div className="input-group">
        <label htmlFor="dob">Age / DOB</label>
        <input id="dob" className="input" placeholder="DD/MM/YYYY" />
      </div>
      <div className="input-group">
        <label htmlFor="relationship">Relationship</label>
        <input id="relationship" className="input" placeholder="Select" />
      </div>
    </div>
    <CtaBar primary="Save" secondary="Cancel" />
  </ScreenLayout>
);

export default AddFamilyMember;
