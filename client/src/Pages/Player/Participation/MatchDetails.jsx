/* eslint-disable no-unused-vars */
import React from "react";
import { Input, Button, Textarea } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { ScoreBoard } from "../../../Components/Organizer/InProgress/StepOperations";
const MatchDetails = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl md:text-2xl font-bold text-blue-gray-700 flex flex-col gap-5">
        Match Details
      </h1>

      <div className="flex flex-col justify-center gap-5">
        <div className="flex flex-row mt-5  items-center gap-5">
          <div className="w-72">
            <Input value={"Karan Chitroda"} />
          </div>
          <Button color="orange">vs</Button>
          <div className="w-72">
            <Input value={"Parth Dudhaiya"} />
          </div>
        </div>
        <div className="w-full">
          <Textarea value={"Time Place and other details"} />
        </div>
      </div>

{/* 
      <div className="w-72 my-5">
            <Input value={"Karan Chitroda"} />
          </div> */}

<ScoreBoard/>


          <div className="w-full mt-10 flex flex-row  items-center justify-between lg:justify-between gap-4 ">
        <Button color='orange' onClick={()=> navigate("/p/participation/step4")} >
          Prev
        </Button>
        <Button disabled={true} color='orange' onClick={()=> navigate("/p/participation/step5")} >
          Next
        </Button>
      </div>
    </div>
  );
};

export default MatchDetails;
