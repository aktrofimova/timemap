import React  from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo-coloured.svg';

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/"><img className="logo_img" src={logo} alt="TimeMap"/></Link>
    </div>
  );
};

export default Logo;
