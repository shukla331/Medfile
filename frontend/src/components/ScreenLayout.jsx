import React from 'react';

const ScreenLayout = ({ title, subtitle, children }) => (
  <div className="app-shell">
    <div className="header">
      <div>
        <h1>{title}</h1>
        {subtitle ? <p className="helper">{subtitle}</p> : null}
      </div>
      <span className="badge">Medfile</span>
    </div>
    {children}
  </div>
);

export default ScreenLayout;
