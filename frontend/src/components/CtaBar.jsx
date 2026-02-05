import React from 'react';

const CtaBar = ({ primary, secondary }) => (
  <div className="cta-bar">
    <div className="container">
      {secondary ? (
        <button className="button secondary" type="button">
          {secondary}
        </button>
      ) : null}
      <button className="button" type="button">
        {primary}
      </button>
    </div>
  </div>
);

export default CtaBar;
