/* eslint-disable no-unused-vars */
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar  from "../components/Navbar";
import Sidebar  from "../components/Sidebar";

const Players = () => {
  return (
    <div className="w-full border-solid bg-gray-100 ">
      <div className="pl-[23rem]">
      <Navbar />
      </div>
      <div className="flex h-full w-full bg-gray-100">
     
        <div className="absolute md:hidden bg-gray-100">
          <Sidebar /> 
        </div>
        
        <div className=" block bg-gray-100">
          <Sidebar /> 
        </div>

          <div className=" w-full h-full p-5 bg-gray-100  font-poppins pl-[23rem] pt-[7rem] ">
            <Outlet />
          </div>
          
      </div>
      <div className="pl-[21.3rem]">
      <Footer/>
      </div>
    </div>
  );
};

export default Players;
