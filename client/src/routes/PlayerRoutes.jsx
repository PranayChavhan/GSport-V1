import ErrorPage from "../error-page"
import Players from "../layout/Players"
import ODashboard from "../pages/organizer/ODashboard"





export const PlayerRoutes = {
    
    path: "/player",
    element: <Players/>,
    errorElement: <ErrorPage/>,
    children: [     
        { 
            path: "dashboard",
            element: <ODashboard/>,
        },
        
    ]
    
}