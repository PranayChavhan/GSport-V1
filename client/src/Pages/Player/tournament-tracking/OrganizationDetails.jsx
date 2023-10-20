/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Input,
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Textarea } from "@material-tailwind/react";
import GameDetails from "../Participation/GameDetails";
import { GameCard } from "../../../Components/Organizer";
import PGameCard from "../../../Components/Player/PGameCard";

const OrganizationDetails = () => {
  const [dueDate, setDueDate] = useState(null);

  return (
    <div className="flex flex-col justify-center">
      <div className="p-3 rounded-md border-gray-200 border-[2px] mb-5">
        <h1 className="text-2xl mb-5 md:text-2xl font-bold text-blue-gray-700 flex justify-center">
          Organization Details
        </h1>
        <div className="flex flex-row items-center justify-between px-[4rem]">
          <div>
            <p className="text-md text-blue-gray-900">
              Details Of Organization
            </p>
            <span className="text-sm text-blue-gray-700">
              Organization Name
            </span>
            <div className="w-72 mb-5">
              <Input label="Organization Name" />
            </div>

            <p className="text-md text-blue-gray-900">Tournament Details</p>
            <span className="text-sm text-blue-gray-700">Tournament Name</span>
            <div className="w-72">
              <Input label="Tounament Name" />
            </div>
          </div>

          <div>
            <span className="text-md text-blue-gray-900">
              About Organization (Will be filled if organization selected from
              list)
            </span>
            <div className="w-full mb-8">
              <Input label="St. Francis High School Jamanagar" />
            </div>

            <span className="text-md text-blue-gray-900">
              About Tournament (Will be filled if Tournament selected from list)
            </span>

            <div className="w-full">
              <Textarea
                value={
                  "Class 6 and class 7, Class 8 and Class 9 adminton Championship Boys Singles, Boys Doubles, Girls Singles, Girls Doubles and Mix Double."
                }
                label=""
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-row items-center justify-center gap-5">
          <div className=" text-sm z-50  rounded-lg flex justify-center items-center gap-2">
            <input
              type="date"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              id="birthday"
              name="birthday"
              className=" px-4 py-2 z-50 rounded-lg border focus:outline-none  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-xs md:text-normal"
            />
          </div>
          <p>To</p>

          <div className=" text-sm z-50  rounded-lg flex justify-center items-center gap-2">
            <input
              type="date"
              selected={dueDate}
              onChange={(date) => setDueDate(date)}
              id="birthday"
              name="birthday"
              className=" px-4 py-2 z-50 rounded-lg border focus:outline-none  focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-xs md:text-normal"
            />
          </div>
        </div>
      </div>

      <div className="p-5 px-[10rem] rounded-md border-gray-200 border-[2px]">
        <h1 className="text-2xl mb-5 md:text-2xl font-bold text-blue-gray-700">
          Game Details
        </h1>
       
         
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 ">
            <PGameCard/>
            <PGameCard/>
            <PGameCard/>
            <PGameCard/>
      </div>
        
      </div>
    </div>
  );
};

export default OrganizationDetails;
