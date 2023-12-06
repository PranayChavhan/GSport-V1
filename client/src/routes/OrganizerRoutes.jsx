import Step1 from "../components/NewTournament/Step1"
import Step2 from "../components/NewTournament/Step2"
import Step3 from "../components/NewTournament/Step3"
import Step4 from "../components/NewTournament/Step4"
import Step5 from "../components/NewTournament/Step5"
import Step1Update from "../components/NewTournament/Updatable/Step1Update"
import ErrorPage from "../error-page"
import Organizers from "../layout/Organizers"
import NewTournament from "../pages/organizer/NewTournament"
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
        {
            path: "new-tournament/",
            element: <NewTournament/>,
            children: [
              {
                path: "step1",
                element: <Step1/>
              },
              {
                path: "step1/:id",
                element: <Step1Update/>
              },
              {
                path: "step2/:id",
                element: <Step2/>,
              },
              {
                path: "step3/:id",
                element: <Step3/>,
              },
              {
                path: "step4/:id",
                element: <Step4/>,
              },
              {
                path: "step5/:id",
                element: <Step5/>,
              },
            ],
          },
        
    ]
    
}