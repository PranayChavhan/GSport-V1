/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react'

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
import {
  getRequest
} from "../../api/api";




 
const TABLE_HEAD = ["Tournaments","Start Date", "Due Date", "Team", "Edit"];

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

  const [tournament, setTournament] = useState([]);


  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = 'tournaments/getalltournament';
        const data = await getRequest(url);

        setTournament(data)
        
      } catch (error) {
        console.error('Error fetching tournament data:', error);
      }
    };
    fetchTournamentData();
  }, []);


  console.log('====================================');
  console.log(tournament);
  console.log('====================================');
  
  const cards = [
    {
      label: "Upcomming Tournaments",
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
    <div className="w-full min-h-screen flex flex-col gap-5 ">
     
     <section className="text-gray-600 body-font my-10 mr-6">
  <div className="">
    <div className=" flex flex-col sm:flex-row sm:items-center items-start mx-auto">
      <h1 className="flex-grow sm:pr-16 text-2xl font-medium title-font text-gray-900">Slow-carb next level shoindxgoitch ethical authentic, scenester sriracha forage.</h1>
      <button className="flex-shrink-0 shadow-sm text-white bg-orange-500 border-0 py-2 px-8 focus:outline-none hover:bg-yellow-600 rounded-md text-lg mt-10 sm:mt-0">New Tournament</button>
    </div>
  </div>
</section>

      <div className="w-full h-full flex flex-col-reverse md:flex-row gap-5">
        <div className="w-full h-full gap-4 flex flex-col xl:pr-4 ">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 flex-grow">
            {cards.map((card, index) => (
              <div
                key={index}
                className={`p-5 bg-white rounded-lg h-[17rem] space-y-5 shadow-sm`}
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
        

            <div className="scroll-smooth">
              

{/* 
            <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row z-50">
         <p className='font-normal text-gray-900'>Ongoing Tournaments</p>
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
          {tournament.map((row, index) => (
          <tr
            key={index}
            className="hover:bg-gray-100 transition-all cursor-pointer"
            onClick={() => navigate(`/organizer/new-tournament/step1/${row.id}`)}
          >
            <td className="py-4 px-4 border-b">
              <div className="flex items-center gap-3">
                <Avatar src={`http://127.0.0.1:8000/organizer/images/${row.image}`} alt={row.name} size="sm" className='mr-8' />
                <div className="flex flex-col">
                  <Typography variant="large" color="blue-gray" className="font-bold">
                    {row.name}
                  </Typography>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal opacity-70"
                  >
                    {row.organizer_name}
                  </Typography>
                </div>
              </div>
            </td>
            <td className='border-b'>
              <Typography variant="small" color="blue-gray" className="font-normal flex items-center space-x-3">
                <BiCalendarAlt />
                <p>{row.start_date}</p>
              </Typography>
            </td>
            <td className='border-b'>
              <Typography variant="small" color="blue-gray" className="font-normal flex items-center space-x-3">
                <BiCalendarAlt />
                <p>{row.end_date}</p>
              </Typography>
            </td>
            

            <td className='border-b'>
              <Typography variant="small" color="blue-gray" className="font-normal">
                <Team />
              </Typography>
            </td>

            <td className='border-b'>
              <Typography variant="small" color="blue-gray" className="font-normal flex items-center ml-4">
                <p>{row.organizer_name}</p>
              </Typography>
            </td>


          </tr>
        ))}
            
          </tbody>
        </table>
      </CardBody>
     
    </Card> */}
 



 <div className=''>
      

      <section className="text-gray-600 body-font mt-12 h-screen">
  <div className="">
    <div className="flex flex-wrap w-full mb-14">
      <div className="lg:w-1/2 w-full ">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Ongoing Tournament</h1>
        <div className="h-1 w-20 bg-yellow-500 rounded"></div>
      </div>
    
    </div>
    <div className="flex flex-wrap -m-4">
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/720x400" alt="content"/>
          <h3 className="tracking-widest text-yellow-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chichen Itza</h2>
          <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/721x401" alt="content"/>
          <h3 className="tracking-widest text-yellow-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Colosseum Roma</h2>
          <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/722x402" alt="content"/>
          <h3 className="tracking-widest text-yellow-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Great Pyramid of Giza</h2>
          <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
      <div className="xl:w-1/4 md:w-1/2 p-4">
        <div className="bg-white p-6 shadow-md rounded-lg">
          <img className="h-40 rounded w-full object-cover object-center mb-6" src="https://dummyimage.com/723x403" alt="content"/>
          <h3 className="tracking-widest text-yellow-500 text-xs font-medium title-font">SUBTITLE</h3>
          <h2 className="text-lg text-gray-900 font-medium title-font mb-4">San Francisco</h2>
          <p className="leading-relaxed text-base">Fingerstache flexitarian street art 8-bit waistcoat. Distillery hexagon disrupt edison bulbche.</p>
        </div>
      </div>
    </div>
  </div>
  </section>
  
  
  
    </div>


            </div>
          </div>
        </div>
      </div>





    
    </div>
  );
};

export default OTournamentTracking;
