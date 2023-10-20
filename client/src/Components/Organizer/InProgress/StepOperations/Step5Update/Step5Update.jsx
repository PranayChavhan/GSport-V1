import { useState } from "react";

import { Rosters, Details, Participants, SetOperations, Certifications } from "..";

import { BiSolidUserDetail } from "react-icons/bi";
import { RiTeamFill } from "react-icons/ri";
import { FaTasks } from "react-icons/fa";
import { TbTournament } from "react-icons/tb";
import { AiFillStar } from "react-icons/ai";


import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import CurrentStepper from "../../../../Common/CurrentStepper";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";


export default function Step5Update() {
  const params = useParams()
  const data = [
    {
      label: "DETAILS",
      icon: <BiSolidUserDetail className="w-5 h-5"/>,
      value: "details",
      desc: <Details/>,
    },
    {
      label: "PARTICIPANTS",
      icon: <RiTeamFill className="w-5 h-5"/>,
      value: "participants",
      desc: <Participants/>,
    },
    {
      label: "OPERATIONS",
      icon: <FaTasks className="w-5 h-5"/>,
      value: "operations",
      desc: <SetOperations/>,
    },
    {
      label: "ROSTERS",
      icon: <TbTournament className="w-5 h-5"/>,
      value: "rosters",
      desc: <Rosters />,
    },
    {
      label: "CERTIFICATIONS",
      icon: <AiFillStar className="w-5 h-5"/>,
      value: "certifications",
      desc: <Certifications/>,
    },
  ];

  const navigate = useNavigate();
  
  return (
    <div className="w-full h-full mt-3">
      <div className="w-full">
      <CurrentStepper step={4}/>
    </div>
      <div className="my-5 min-w-100% min-h-full flex flex-row">
        <Tabs value="details" className="w-full">
          <TabsHeader
            className="font-poppins min-w-full text-sm flex flex-row items-center justify-center bg-orange-600 p-1 rounded-md lg:mb-4 space-x-1 sm:space-x-1 text-white hover:text-orange-600 focus:text-orange-400"
            indicatorProps={{
              className:
                "hover:shadow-lg rounded-md bg-orange-600 hover:text-orange-600 focus:bg-white focus:text-orange-400",
            }}
          >
            {data.map(({ label, icon, value }) => (
              <Tab onClick={() => navigate(`/o/current-tournament/${params.tourId}/tour_game/${params.tour_game_id}/step5/${value}`)}  key={value} value={value} className="text-white text-sm  px-0.5">
              <Link>
              <p className="block md:hidden">
                {icon}
              </p>

              <p className="hidden md:block">
                {label}
              </p>
              </Link>
              </Tab>
            ))}
          </TabsHeader>
          <TabsBody className="mt-4">
            <Outlet/>
          </TabsBody>
        </Tabs>
      </div>
    </div>
  );
}