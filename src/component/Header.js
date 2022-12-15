import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const Header = () => {
  return (
    <>
      <Link to="/">
        <div className="header">
          <h1>B O A R D</h1>
        </div>
      </Link>
    </>
  );
};

export default Header;
