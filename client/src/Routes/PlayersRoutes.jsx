/* eslint-disable no-unused-vars */
import Players from "../Layouts/Players";
import ErrorPage from "../error-page";
import { Dashboard } from "../Pages/Player";
 import { Open } from "../Pages/Player";
 import { Upcoming } from  "../Pages/Player";
 import { Info } from "../Pages/Player";
 import { Application } from "../Pages/Player";

import UploadDocs from "../Pages/User/VerificationProcess/UploadDocs";
import { 
    PDashboard,
    TournamentTracking,
    Teams, 
    Messages
} from "../Pages/Player";
import OrganizationDetails from "../Pages/Player/tournament-tracking/OrganizationDetails";
import NewParticipation from "../Pages/Player/Participation/NewParticipation";
import GameDetails from "../Pages/Player/Participation/GameDetails";
import Participate from "../Pages/Player/Participation/Participate";
import TeamDetails from "../Pages/Player/Participation/TeamDetails";
import RosterDetails from "../Pages/Player/Participation/RosterDetails";
import MatchDetails from "../Pages/Player/Participation/MatchDetails";
import Step1 from "../Components/Player/Steps/Step1";
import Step2 from "../Components/Player/Steps/Step2";
import Participation from "../Pages/Player/tournament-tracking/Participation";
import Step3 from "../Components/Player/Steps/Step3";
import Step4 from "../Components/Player/Steps/Step4";
import Step5 from "../Components/Player/Steps/Step5";
import PCalendar from "../Pages/Player/calendar/Calendar";

export const PlayerRoutes =  {
    path: "p/",
    element:<Players />,
    errorElement: <ErrorPage/>,
    children:[
        {
            // element:<RequireAuth allowedRoles={['player']}/>,
            children:[
                {
                    path:'docs',
                    element:<UploadDocs/>
                },
                {
                    path: 'dashboard',
                    element: <PDashboard/>
                },
                {
                    path: 'calendar',
                    element: <PCalendar/>
                },
                {
                    path: 'tournaments',
                    element: <TournamentTracking/>
                },
                {
                    path: 'organization-details',
                    element: <OrganizationDetails/>
                },
                {
                    path: 'new-participation',
                    element: <NewParticipation/>,
                    children: [
                        {
                          path: "game-details",
                          element: <GameDetails/>
                        },
                    ]
                },
                {
                    path: "participation/",
                    element: <Participation/>,
                    children: [
                      {
                        path: "step1",
                        element: <Step1/>,
                      },
                      {
                        path: "step2",
                        element: <Step2/>
                      },
                      {
                        path: "step3",
                        element: <Step3/>
                      },
                      {
                        path: "step4",
                        element: <Step4/>
                      },
                      {
                        path: "step5",
                        element: <Step5/>
                      },
                    ],
                  },
                {
                    path: "game-details",
                          element: <GameDetails/>
                },
                {
                    path: 'participate',
                    element: <Participate/>
                },
                {
                    path: 'team-details',
                    element: <TeamDetails/>
                },
                {
                    path: 'roster-details',
                    element: <RosterDetails/>
                },
                {
                    path: 'match-details',
                    element: <MatchDetails/>
                },
                {
                    path: 'messages',
                    element: <Messages/>
                },
                {
                    path: 'teams',
                    element: <Teams/>
                },
                {
                    path:'games',
                    element:<Dashboard/>
                },
                {
                    path:'open',
                    element:<Open/>
                },
                {
                    path:'upcoming',
                    element:<Upcoming/>
                },
                {
                    path:'info',
                    element:<Info/>
                },
                {
                    path:'apply',
                    element:<Application/>
                },
            ]
        }
    ]
}