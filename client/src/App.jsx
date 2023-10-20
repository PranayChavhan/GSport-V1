import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PlayerRoutes } from "./Routes/PlayersRoutes";
import { OrganizerRoutes } from "./Routes/OrganizersRoutes";
import { UserRoutes } from "./Routes/UserRoutes";


// import { RequireAuth } from "./Pages/auth";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { PlayerProfile, Register } from "./Pages/Player";

// import { store } from './redux/store';

import Discover from "./Layouts/Homepage";
import ErrorPage from "./error-page";

import { 
  AboutUsPage, 
  BlogsPage, 
  FeaturesPage 
} from "./Pages/Explore";
import Arena from "./Pages/Explore/Arena";

const router = createBrowserRouter([
  // global routes
  {
    path: "/",
    element: <Discover/>,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "features",
        element: <FeaturesPage/>
      },
      {
        path: "/",
        element: <Arena/>
      },
      {
        path: "about",
        element: <AboutUsPage/>
      },
      {
        path: "blogs",
        element: <BlogsPage/>
      }
    ]
  },

  // protected routes
  UserRoutes,
  OrganizerRoutes,
  PlayerRoutes,
]);


function App() {
  
  return (
    <>
  
    <RouterProvider router={router}/>
    <ToastContainer />
    </>
  );
}

export default App;
