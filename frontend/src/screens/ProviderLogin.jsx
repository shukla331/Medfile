import React from 'react';
import ScreenLayout from '../components/ScreenLayout.jsx';
import CtaBar from '../components/CtaBar.jsx';

const ProviderLogin = () => (
  <ScreenLayout title="Provider Login" subtitle="Secure access for clinics and hospitals.">
    <div className="card">
      <div className="input-group">
        <label htmlFor="email">Email</label>
        <input id="email" className="input" placeholder="provider@clinic.com" />
      </div>
      <div className="input-group">
        <label htmlFor="password">Password</label>
        <input id="password" className="input" type="password" placeholder="••••••••" />
      </div>
      <p className="helper">Forgot password</p>
    </div>
    <CtaBar primary="Login" secondary="Back" />
  </ScreenLayout>
);

export default ProviderLogin;
