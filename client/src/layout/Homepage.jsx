import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar"

export default function Discover ()  {
  return (
    <div className="min-h-full  font-poppins ">
        <Navbar/>
      <div className="w-full h-full  font-poppins ">
          <Outlet/>
      </div>
  </div>
  )
}