import ErrorPage from "../error-page"
import Organizers from "../layout/Organizers"
import OCalendar from "../pages/organizer/OCalendar"
import ODashboard from "../pages/organizer/ODashboard"
import OMessages from "../pages/organizer/OMessages"
import OTeams from "../pages/organizer/OTeams"
import OTournamentTracking from "../pages/organizer/OTournamentTracking"


export const OrganizerRoutes = {
    
    path: "/organizer",
    element: <Organizers/>,
    errorElement: <ErrorPage/>,
    children: [     
        { 
            path: "dashboard",
            element: <ODashboard/>,
        },
        { 
            path: "calendar",
            element: <OCalendar/>,
        },
        { 
            path: "messages",
            element: <OMessages/>,
        },
        { 
            path: "teams",
            element: <OTeams/>,
        },
        { 
            path: "tournament-tracking",
            element: <OTournamentTracking/>,
        },
        
    ]
    
}