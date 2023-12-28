/* eslint-disable no-unused-vars */
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useEffect, useState } from "react";
import { getRequest } from "../../api/api";
import { Link } from "react-router-dom";


const ODashboard = () => {
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



  return (
    <div className="h-full bg-gray-100 min-h-screen w-full">
      











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
       (new Date(card.start_date).toLocaleDateString() <= new Date().toLocaleDateString()) 

       ?
       <>
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
       </>
      :
      <>
      
      </>
       
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
       (new Date(card.start_date).toLocaleDateString() > new Date().toLocaleDateString()) 
       ?
       <>
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
       </>
       :
       <>
       </>
      ))}
    </div>
  </div>
  </section>
  





    </div>
  );
};

export default ODashboard;
