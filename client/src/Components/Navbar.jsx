import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <nav>
      <ul className='flex flex-row gap-5'>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/features">Features</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/blog">Blog</Link></li>
      </ul>
    </nav>
  );
};

export default Topbar;
