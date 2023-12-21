/* eslint-disable no-unused-vars */
import { HiOutlineDownload } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
// import { AiOutlineControl } from "react-icons/ai";
import { IoMdOptions } from "react-icons/io";
import { MdNewLabel } from "react-icons/md";
import { BsPlayFill, BsCheck2Circle } from "react-icons/bs";
import { IoIosArrowUp } from "react-icons/io";
// import { useGetAllTrnmtsQuery } from "../../redux/api/tournament/tournamentApi";
// import FaMoneyBillTrendUp from 'react-icons/fa'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/api";
import { Link } from "react-router-dom";


const ODashboard = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 2,
    autoplay: true,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
    ],
  };



  const [org, setOrg] = useState([]);
  useEffect(() => {
    const fetchTournamentData = async () => {
      try {
        const url = `tournaments/getalltournament`;
        const data = await getRequest(url);
        setOrg(data.data);
      } catch (error) {
        console.error("Error fetching tournament data:", error);
      }
    };
    fetchTournamentData();
  }, []);


  // console.log('====================================');
  // console.log(org[0].tournament_games[0].id);
  // console.log('====================================');

  return (
    <div className="h-full bg-gray-100 min-h-screen w-full">
      


      <section className="text-gray-600 body-font  mb-20">
  <div className="container px-5 mx-auto">
    <div className="flex flex-col text-center w-full mb-20">
      
      <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Elevate Your Experience with Seamless Sports Event Participation.</h1>
      <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
      Experience the next level of sports event participation with GSort. Whether its badminton or cricket, and soon football and tennis, we are here to enhance your tournament experience. From engaging in matches to registering effortlessly, we have got it all covered.
      </p>
    </div>
    <div className="flex flex-wrap">
      <div className="xl:w-1/4 lg:w-1/2 md:w-full bg-white   px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Badminton Blitz</h2>
        <p className="leading-relaxed text-base mb-4">Serve up a smashing badminton tournament with GSort. Effortlessly manage scores, registrations, and more. Elevate your badminton events to new heights.</p>
        <Link className="text-orange-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full bg-white  px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Cricket Carnival</h2>
        <p className="leading-relaxed text-base mb-4">Hit a six with GSorts cricket event management. Keep track of scores, registrations, and more. Elevate your cricket tournaments with ease.</p>
        <Link className="text-orange-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full bg-white   px-8 py-4 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Football Frenzy (Coming Soon)</h2>
        <p className="leading-relaxed text-base mb-4">Get ready for the excitement! GSort is gearing up for football tournaments. Stay tuned for seamless event management like never before.</p>
        <Link className="text-orange-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
      <div className="xl:w-1/4 lg:w-1/2 md:w-full bg-white px-8 py-3 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">Tennis Thrive (Coming Soon)</h2>
        <p className="leading-relaxed text-base mb-4">Ace your tennis tournaments with GSort. Stay tuned for seamless event management, from scores to registrations.</p>
        <Link className="text-orange-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
      </div>
    </div>
  </div>
</section>










<section className="text-gray-600 body-font mt-12 ">
  <div className="">
    <div className="flex flex-row justify-between items-center w-full mb-10 border-b pb-4 border-gray-300">
      <div className="lg:w-1/2 w-full ">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">Ongoing Tournament</h1>
        <div className="h-1 w-20 bg-yellow-500 rounded"></div>
      </div>
    
    <div>
    <Link className="text-orange-500 inline-flex items-center">Load More
          <svg fill="none" stroke="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
    </div>
    </div>
    <div className="flex flex-wrap -m-4">
      {org.map((card, index) => (
        <Link
        to = {`/organizer/tournament-details/${card.id}`}
         key={index} className="xl:w-1/4 md:w-1/2 p-4">
          <div className="bg-white rounded-lg shadow-lg">
            <img
              className="h-40 rounded w-full object-cover object-center mb-6"
              src={`http://127.0.0.1:8000/organizer/images/${card.image}`}
              alt="content"
            />
            
            <div className="flex flex-row justify-between items-center pr-3">

            
            <h3 className="tracking-widest text-xs font-medium title-font pl-3">
              {card.is_active ? <><p className="text-green-500">Active</p></> : <><p className="text-red-500">Closed</p></>}
            </h3>
<p>Ends on : 24 March 2023</p>

            </div>

            <div className="flex flex-row justify-between items-center pr-3">

            
            <h2 className="text-lg text-gray-900 font-medium title-font  pl-3">
              {card.name}
            </h2>

            <p>
              Prize : 20000
            </p>

            </div>

            <div className="flex flex-row justify-between items-center pr-3 pb-6">

            
            <p className="leading-relaxed text-base pl-3">{card.about}</p>
<p className="bg-blue-300 text-white px-2  rounded-full">Badminton</p>
            </div>
          </div>
        </Link>
      ))}
    </div>

  </div>
  </section>
  




  <section className="text-gray-600 body-font mt-20">
  <div className="">
    <div className="flex flex-row items-center justify-between w-full mb-10 border-b pb-4 border-gray-300">
      

      
      <div className="lg:w-1/2 w-full ">
        <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">UpcommingTournament</h1>
        <div className="h-1 w-20 bg-yellow-500 rounded"></div>
      </div>
      <div>
    <Link className="text-orange-500 inline-flex items-center">Load More
          <svg fill="none" stroke="currentColor" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
            <path d="M5 12h14M12 5l7 7-7 7"></path>
          </svg>
        </Link>
    </div>
    </div>
    <div className="flex flex-wrap -m-4">
      {org.map((card, index) => (
        <Link
        to = {`/organizer/tournament-details/${card.id}`}
         key={index} className="xl:w-1/4 md:w-1/2 p-4">
          <div className="bg-white rounded-lg shadow-lg">
            <img
              className="h-40 rounded w-full object-cover object-center mb-6"
              src={`http://127.0.0.1:8000/organizer/images/${card.image}`}
              alt="content"
            />
            
            <div className="flex flex-row justify-between items-center pr-3">

            
            <h3 className="tracking-widest text-xs font-medium title-font pl-3">
              {card.is_active ? <><p className="text-green-500">Active</p></> : <><p className="text-red-500">Closed</p></>}
            </h3>
<p>Ends on : 24 March 2023</p>

            </div>

            <div className="flex flex-row justify-between items-center pr-3">

            
            <h2 className="text-lg text-gray-900 font-medium title-font  pl-3">
              {card.name}
            </h2>

            <p>
              Prize : 20000
            </p>

            </div>

            <div className="flex flex-row justify-between items-center pr-3 pb-6">

            
            <p className="leading-relaxed text-base pl-3">{card.about}</p>
<p className="bg-blue-300 text-white px-2  rounded-full">Badminton</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  </div>
  </section>
  





    </div>
  );
};

export default ODashboard;
