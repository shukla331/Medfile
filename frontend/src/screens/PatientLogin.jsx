import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const PatientLogin = () => (
  <ScreenLayout title="Patient Login" subtitle="Enter your mobile number to receive an OTP.">
    <div className="card">
      <div className="input-group">
        <label htmlFor="mobile">Mobile number</label>
        <input id="mobile" className="input" placeholder="+91 98765 43210" />
      </div>
      <p className="helper">Continue with Email</p>
    </div>
    <CtaBar primary="Send OTP" secondary="Back" />
  </ScreenLayout>
);

export default PatientLogin;
