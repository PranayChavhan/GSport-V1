/* eslint-disable no-unused-vars */
import React from 'react'
import { Button, Input, } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const GameDetails = () => {
  const navigate = useNavigate();
  return (
    <div>
        <h1 className="text-2xl md:text-2xl font-bold text-blue-gray-700">
        Game Details
        </h1>

        <div className="w-full mt-10 flex flex-row  items-center justify-between lg:justify-between gap-4 ">
        <Button disabled={true} color='orange' onClick={()=> navigate("p/organization-details")} >
          Prev
        </Button>
        <Button color='orange' onClick={()=> navigate("/p/participation/step2")} >
          Next
        </Button>
      </div>
    </div>
  )
}

export default GameDetails