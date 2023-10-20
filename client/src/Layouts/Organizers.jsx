import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Common";
import { Sidebar } from "../Components/Organizer";

const Organizers = () => {
  return (
    <div className="h-screen w-full border-solid ">
      <Navbar />

      <div className="flex h-full w-full">
        {/* Mobile view */}
        <div className="absolute md:hidden">
          <Sidebar /> 
        </div>
        {/* Screen larger than medium */}
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
