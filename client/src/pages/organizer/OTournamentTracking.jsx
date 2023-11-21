/* eslint-disable no-unused-vars */
import React, { useState } from 'react'

import { Button, Carousel, IconButton, Card,
  CardHeader,
  Typography,
  CardBody,
  Chip,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  CardFooter, } from "@material-tailwind/react";
  import { BiCalendarAlt } from "react-icons/bi";
import { BiCheckCircle, BiPlay, BiPlus } from "react-icons/bi";
import { HiDocumentText } from "react-icons/hi";
import { Link } from "react-router-dom";
import { FaBoxes } from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import { IoMdOptions } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import moment from "moment";


const TABS = [
  {
    label: "New",
    value: "New",
  },
  {
    label: "In Progress",
    value: "Progress",
  },
  {
    label: "Completed",
    value: "Completed",
  },
];
 
const TABLE_HEAD = ["Organization","Start Date", "Due Date", "Team"];
 
const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    org: "PICT Sports club",
    tournament: "Elevate 2.0",
    priority: "low",
    date: "23/04/2018",
    progress: 70,
    role: "Admin",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    org: "College : VIT",
    tournament: "Inter College Sports",
    priority: "high",
    date: "23/04/2018",
    progress: 60,
    role: "Admin",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    org: "IIT Bombay",
    tournament: "Inter college Athlethon",
    priority: "medium",
    date: "19/09/2017",
    progress: 80,
    role: "Organizer",
  }
];


function Team() {
  

  return (
      <div className="flex items-center -space-x-4">
        <Avatar
          variant="circular"
          alt="user 1"
          size="sm"
          className="border-2 border-white hover:z-10 focus:z-10"
          src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
        />
        <Avatar
          variant="circular"
          alt="user 2"
          size="sm"
          className="border-2 border-white hover:z-10 focus:z-10"
          src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
        />
        <Avatar
          variant="circular"
          alt="user 3"
          size="sm"
          className="border-2 border-white hover:z-10 focus:z-10"
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1288&q=80"
        />
        <Avatar
          variant="circular"
          alt="user 4"
          size="sm"
          className="border-2 border-white hover:z-10 focus:z-10"
          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1287&q=80"
        />
      </div>
    );
}


const OTournamentTracking = () => {
  const cards = [
    {
      label: "New",
      value: "1",
      desc: "+1 from yesterday",
      iconBg: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-500",
    },
    {
      label: "In Progress",
      value: "3",
      desc: "",
      iconBg: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-500",
    },
    {
      label: "Completed",
      value: "16/20",
      desc: "+2 from yesterday",
      iconBg: "bg-light-blue-500",
      bgColor: "bg-light-blue-50",
      textColor: "text-light-blue-500",
    },
  ];
  const navigate = useNavigate();
    
  const [dueDate, setDueDate] = useState(null);

  return (
    <div className="w-full flex flex-col gap-5 ">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-2xl md:text-2xl font-bold text-blue-gray-700">
          Tournaments Tracking
        </p>
        <Link
          to={"/organizer/new-tournament/step1"}
        >
          <Button
            color="orange"
            size="md"
            className="flex justify-between items-center w-full"
          >
            <BiPlus className="w-8 h-8" />
            <p className="text-md"> New Tournament</p>
          </Button>
        </Link>
        <div className="xl:hidden items-center justify-center">
          <Link
            to={"/o/new-tournament/step1"}
            className="w-full flex items-center justify-center"
          >
            <Button
              color="orange"
              size="sm"
              className="w-full flex justify-center items-center"
            >
              <BiPlus className="w-8 h-8" />
              <p className="text-md"> New Tournament</p>
            </Button>
          </Link>
        </div>
      </div>

      <div className="w-full h-full flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full h-full gap-4 flex flex-col xl:pr-4 border-r-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`p-5 ${card.bgColor} rounded-lg space-y-5 shadow-md`}
              >
                <div className="flex flex-row justify-between items-center">
                  <p className={`text-md font-bold text-blue-gray-700`}>
                    {card.label}
                  </p>
                  <div className={`w-12 h-12 p-2 rounded-lg ${card.iconBg}`}>
                    <div className="w-full h-full text-white flex justify-center items-center">
                      {card.label === "New" ? (
                        <HiDocumentText className="w-full h-full" />
                      ) : card.label === "In Progress" ? (
                        <BiPlay className="w-full h-full" />
                      ) : (
                        <BiCheckCircle className="w-full h-full" />
                      )}
                    </div>
                  </div>
                </div>
                <p className={`text-3xl font-bold ${card.textColor}`}>
                  {card.value}
                </p>
                <p className="text-sm text-gray-700">{card.desc}</p>
              </div>
            ))}
          </div>
          <div>
            <div className="w-full flex justify-between ">
              <p className="text-xl md:text-2xl font-bold text-blue-gray-700">
                Tournament details
              </p>
              <div className="flex space-x-4 text-blue-gray-700">
                <IconButton
                  className="cursor-pointer bg-gray-200 text-blue-gray-700 p-2"
                  size="sm"
                >
                  <IoMdOptions
                    className="w-7 h-7 p-1 rounded-md"
                    onClick={() => {}}
                  />
                </IconButton>
                <IconButton
                  className="cursor-pointer bg-gray-200 text-blue-gray-700 p-2"
                  size="sm"
                >
                  <FaBoxes
                    className="w-7 h-7 bg-gray-200 p-1 rounded-md"
                    onClick={() => {}}
                  />
                </IconButton>
                <IconButton
                  className="cursor-pointer bg-gray-200 text-blue-gray-700 p-2"
                  size="sm"
                >
                  <FiFilter
                    className="w-7 h-7 bg-gray-200 p-2 rounded-md"
                    onClick={() => {}}
                  />
                </IconButton>
              </div>
            </div>

            <div className="scroll-smooth">
              


            <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row z-50">
          <Tabs value="all" className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-2/5 z-0">
            <TabsHeader className="">
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value} className="text-xs md:text-md">
                  {label}
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
          <div className="text-sm z-50  rounded-lg flex justify-center items-center gap-2">
                <p className="text-xs ">Sort by: Due date</p>
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
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
          {TABLE_ROWS.map((row, index) => (
          <tr
            key={index}
            className="hover:bg-gray-100 transition-all cursor-pointer"
            onClick={() => navigate(`/organizer/new-tournament/step1`)}
          >
            <td className="py-4 px-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar src={row.img} alt={row.org} size="sm" className='mr-8' />
                <div className="flex flex-col">
                  <Typography variant="large" color="blue-gray" className="font-bold">
                    {row.tournament}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {row.org}
                  </Typography>
                </div>
              </div>
            </td>
            <td className='border-b'>
              <Typography variant="small" color="blue-gray" className="font-normal flex items-center space-x-3">
                <BiCalendarAlt />
                <p>{row.date}</p>
              </Typography>
            </td>
            <td className='border-b'>
              <Typography variant="small" color="blue-gray" className="font-normal flex items-center space-x-3">
                <BiCalendarAlt />
                <p>{row.date}</p>
              </Typography>
            </td>
            <td className='border-b'>
              <Typography variant="small" color="blue-gray" className="font-normal">
                <Team />
              </Typography>
            </td>
          </tr>
        ))}
            
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" color="blue-gray" size="sm">
            Previous
          </Button>
          <Button variant="outlined" color="blue-gray" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
 





            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTournamentTracking;
