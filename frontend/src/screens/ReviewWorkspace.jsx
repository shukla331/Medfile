import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ReviewWorkspace = () => (
  <ScreenLayout title="Review Workspace" subtitle="Pharmacist/Admin Review">
    <div className="grid two">
      <div className="card">
        <div className="card-title">Prescription Image</div>
        <div className="helper">Image viewer placeholder.</div>
      </div>
      <div className="card">
        <div className="card-title">Editable Fields</div>
        <div className="input-group">
          <label htmlFor="drug">Drug</label>
          <input id="drug" className="input" placeholder="Drug name" />
        </div>
        <div className="input-group">
          <label htmlFor="strength">Strength</label>
          <input id="strength" className="input" placeholder="500mg" />
        </div>
        <div className="input-group">
          <label htmlFor="qty">Quantity</label>
          <input id="qty" className="input" placeholder="10" />
        </div>
      </div>
    </div>
    <CtaBar primary="Mark Complete" secondary="Save" />
  </ScreenLayout>
);

export default ReviewWorkspace;
