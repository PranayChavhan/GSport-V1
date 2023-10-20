// OrganizerSidebar.js

import React from 'react';
import { Link } from 'react-router-dom';
import OrganizerRoutes from '../Routes/OrganizerRoutes';

const OrganizerSidebar = () => {
  return (
    <aside className='bg-red-200 flex flex-row gap-5'>
      <ul>
        <li><Link to="/organizer-dashboard">Dashboard</Link></li>
        <li><Link to="/organizer-calendar">Calendar</Link></li>
        <li><Link to="/organizer-tournament-tracking">Tournament Tracking</Link></li>
        <li><Link to="/organizer-teams">Teams</Link></li>
        <li><Link to="/organizer-messages">Messages</Link></li>
      </ul>
      <OrganizerRoutes/>
    </aside>
  );
};

export default OrganizerSidebar;
