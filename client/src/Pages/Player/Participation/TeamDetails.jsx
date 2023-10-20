/* eslint-disable no-unused-vars */
import React from "react";
import { Input, Select, Option, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const TeamDetails = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1 className="text-2xl md:text-2xl font-bold text-blue-gray-700">
        TeamDetails
      </h1>

      <div>
        <div className="flex flex-row  items-center gap-5 my-4">
          <div className="w-34">
            <Input value={"Coach"} />
          </div>

          <div className="w-96">
            <Input label="Coach Name" />
          </div>
        </div>

        <div className="flex flex-row  items-center gap-5 my-4">
          <div className="w-34">
            <Input value={"Captain"} />
          </div>

          <div className="w-96">
            <Input label="Captain Name" />
          </div>
        </div>

        <div className="flex flex-row  items-center gap-5 my-4">
          <div className="w-34">
            <Input value={"Team Member 1"} />
          </div>

          <div className="w-96">
            <Input label="Member Name" />
          </div>

          <div className="w-72">
            <Select label="Select Roles">
              <Option>Wicket Keeper</Option>
              <Option>Captain</Option>
              <Option>Bowler</Option>
              <Option>Team Player</Option>
            </Select>
          </div>
        </div>

        <div className="flex flex-row  items-center gap-5 my-4">
          <div className="w-34">
            <Input value={"Team Member 2"} />
          </div>

          <div className="w-96">
            <Input label="Member Name" />
          </div>

          <div className="w-72">
            <Select label="Select Roles">
              <Option>Wicket Keeper</Option>
              <Option>Captain</Option>
              <Option>Bowler</Option>
              <Option>Team Player</Option>
            </Select>
          </div>
        </div>

        <div className="flex flex-row  items-center gap-5 my-4">
          <div className="w-34">
            <Input value={"Team Member 3"} />
          </div>

          <div className="w-96">
            <Input label="Member Name" />
          </div>

          <div className="w-72">
            <Select label="Select Roles">
              <Option>Wicket Keeper</Option>
              <Option>Captain</Option>
              <Option>Bowler</Option>
              <Option>Team Player</Option>
            </Select>
          </div>
        </div>

        <div className="flex flex-row  items-center gap-5 my-4">
          <div className="w-34">
            <Input value={"Team Member 4"} />
          </div>

          <div className="w-96">
            <Input label="Member Name" />
          </div>

          <div className="w-72">
            <Select label="Select Roles">
              <Option>Wicket Keeper</Option>
              <Option>Captain</Option>
              <Option>Bowler</Option>
              <Option>Team Player</Option>
            </Select>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center mt-[10rem]">
          <Button color="orange">Summarize and Submit</Button>
        </div>
        <div className="w-full mt-10 flex flex-row  items-center justify-between lg:justify-between gap-4 ">
        <Button color='orange' onClick={()=> navigate("/p/participation/step2")} >
          Prev
        </Button>
        <Button color='orange' onClick={()=> navigate("/p/participation/step4")} >
          Next
        </Button>
      </div>
      </div>
    </div>
  );
};

export default TeamDetails;
