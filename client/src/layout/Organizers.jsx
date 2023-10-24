import { Outlet } from "react-router-dom";
import Navbar  from "../components/Navbar";
import Sidebar  from "../components/Sidebar";

const Organizers = () => {
  return (
    <div className="h-screen w-full border-solid ">
      <Navbar />

      <div className="flex h-full w-full">
     
        <div className="absolute md:hidden">
          <Sidebar /> 
        </div>
        
        <div className=" block">
          <Sidebar /> 
        </div>

          <div className=" w-full h-full p-5 bg-white  font-poppins ">
            <Outlet />
          </div>
      </div>

    </div>
  );
};

export default Organizers;
