/* eslint-disable no-unused-vars */
import React from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const RosterDetails = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl md:text-2xl font-bold text-blue-gray-700">
        Roster Details
      </h1>

      <div className="p-5 border-gray-200 border-2 rounded-md flex flex-col gap-5">
        <h1 className="text-md md:text-md font-bold text-blue-gray-800">
          Roster 1
        </h1>

        <div onClick={()=> navigate("/p/participation/step5")} className="flex hover:bg-blue-gray-50 border-2 p-1 rounded-md flex-row justify-center items-center gap-5 cursor-pointer">
          <div className="w-72 cursor-pointer">
            <Input className="cursor-pointer" value={"Karan Chitroda"} />
          </div>
          <Button color="orange">vs</Button>
          <div className="w-72">
            <Input className="cursor-pointer" value={"Parth Dudhaiya"} />
          </div>

          <div className="w-72">
            <Input className="cursor-pointer" value={"Time Place and other details"} />
          </div>
        </div>


        <div onClick={()=> navigate("/p/participation/step5")} className="flex hover:bg-blue-gray-50 border-2 p-1 rounded-md flex-row justify-center items-center gap-5 cursor-pointer">
          <div className="w-72">
            <Input className="cursor-pointer" value={"Player 2"} />
          </div>
          <Button color="orange">vs</Button>
          <div className="w-72">
            <Input className="cursor-pointer" value={"Player 7"} />
          </div>

          <div className="w-72">
            <Input className="cursor-pointer" value={"Time Place and other details"} />
          </div>
        </div>



        <div onClick={()=> navigate("/p/participation/step5")} className="flex hover:bg-blue-gray-50 border-2 p-1 rounded-md flex-row justify-center items-center gap-5 cursor-pointer">
          <div className="w-72">
            <Input className="cursor-pointer" value={"Player 3"} />
          </div>
          <Button color="orange">vs</Button>
          <div className="w-72">
            <Input className="cursor-pointer" value={"Player 6"} />
          </div>

          <div className="w-72">
            <Input className="cursor-pointer" value={"Time Place and other details"} />
          </div>
        </div>




        <div onClick={()=> navigate("/p/participation/step5")} className="flex hover:bg-blue-gray-50 border-2 p-1 rounded-md flex-row justify-center items-center gap-5 cursor-pointer">
          <div className="w-72">
            <Input className="cursor-pointer" value={"Player 4"} />
          </div>
          <Button color="orange">vs</Button>
          <div className="w-72">
            <Input className="cursor-pointer" value={"Player 5"} />
          </div>

          <div className="w-72">
            <Input className="cursor-pointer" value={"Time Place and other details"} />
          </div>
        </div>





      </div>

      <div className="p-5 flex flex-col gap-5 border-gray-200 border-2 rounded-md mt-5">
        <h1 className="text-md md:text-md font-bold text-blue-gray-800">
          Roster 2
        </h1>


        <div onClick={()=> navigate("/p/participation/step5")} className="flex hover:bg-blue-gray-50 border-2 p-1 rounded-md flex-row justify-center items-center gap-5 cursor-pointer">
          <div className="w-72">
            <Input className="cursor-pointer" value={"Karan Chitroda"} />
          </div>
          <Button color="orange">vs</Button>
          <div className="w-72">
            <Input className="cursor-pointer" value={"Parth Dudhaiya"} />
          </div>

          <div className="w-72">
            <Input className="cursor-pointer" value={"Time Place and other details"} />
          </div>
        </div>


        <div onClick={()=> navigate("/p/participation/step5")} className="flex hover:bg-blue-gray-50 border-2 p-1 rounded-md flex-row justify-center items-center gap-5 cursor-pointer">
          <div className="w-72">
            <Input className="cursor-pointer" value={"Player 2"} />
          </div>
          <Button color="orange">vs</Button>
          <div className="w-72">
            <Input className="cursor-pointer" value={"Player 7"} />
          </div>

          <div className="w-72">
            <Input className="cursor-pointer" value={"Time Place and other details"} />
          </div>
        </div>



      </div>


      <div className="w-full mt-10 flex flex-row  items-center justify-between lg:justify-between gap-4 ">
        <Button color='orange' onClick={()=> navigate("/p/participation/step3")} >
          Prev
        </Button>
        <Button color='orange' onClick={()=> navigate("/p/participation/step5")} >
          Next
        </Button>
      </div>
    </div>
  );
};

export default RosterDetails;
