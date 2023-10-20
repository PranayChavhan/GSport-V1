import React from 'react'
import { BrowserRouter as Router, Routes, Route,} from 'react-router-dom';
import OrganizerCalender from '../Organizer/OrganizerCalender';
import OrganizerDashboard from '../Organizer/OrganizerDashboard';
import OrganizerMessages from '../Organizer/OrganizerMessages';
import OrganizerSidebar from '../Organizer/OrganizerSidebar';
import OrganizerTeams from '../Organizer/OrganizerTeams';
import OrganizerTournamentTracking from '../Organizer/OrganizerTournamentTracking';


const OrganizerRoutes = () => {
  return (
    <Router>
    <Routes>
      <Route exact path="/organizer-dashboard" element={<OrganizerDashboard/>} />
      <Route path="/organizer-calendar" element={<OrganizerCalender/>} />
      <Route path="/organizer-tournament-tracking" element={<OrganizerTournamentTracking/>} />
      <Route path="/organizer-teams" element={<OrganizerTeams/>} />
      <Route path="/organizer-messages" element={<OrganizerMessages/>} />
    </Routes>
  </Router>
  )
}

export default OrganizerRoutes