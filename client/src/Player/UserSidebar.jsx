// UserSidebar.js

import React from 'react';
import { Link } from 'react-router-dom';

const UserSidebar = () => {
  return (
    <aside>
      <ul>
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/calendar">Calendar</Link></li>
        <li><Link to="/tournament-tracking">Tournament Tracking</Link></li>
        <li><Link to="/messages">Messages</Link></li>
        <li><Link to="/ranking">Ranking</Link></li>
      </ul>
    </aside>
  );
};

export default UserSidebar;
