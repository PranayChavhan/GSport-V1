import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import ErrorPage from "./error-page";
import LoginPage from "./pages/user/LoginPage";
import SignUp from "./pages/user/SignUp";

const router = createBrowserRouter([
  // global routes
  {
    path: "/",
    element: <SignUp/>,
  },
  {
    path: "/login",
    element: <LoginPage/>
  }

  // protected routes
  // UserRoutes,
  // OrganizerRoutes,
  // PlayerRoutes,
]);



const App = () => {
  return (
    <div>
       <RouterProvider router={router}/>
    </div>
  )
}

export default App