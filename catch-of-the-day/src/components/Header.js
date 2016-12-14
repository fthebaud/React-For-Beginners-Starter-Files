import React from 'react';

// we are juste rendering HTML, we don't need a full react Component
// we just need a Stateless Functionnal Component
const Header = (props)  => {
  return (
    <header className="top">
      <h1>
        Catch
        <span className="ofThe">
          <span className="of">of</span>
          <span className="the">the</span>
        </span>
        day
      </h1>
      <h3 className="tagline">
        <span>{props.tagline}</span>
      </h3>
    </header>
  );
};

export default Header;
