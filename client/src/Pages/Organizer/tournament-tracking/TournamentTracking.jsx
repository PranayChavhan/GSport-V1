/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import {useState, useEffect} from 'react';


import { 
    Stepper, 
    Step, 
    Button, 
    Typography 
} from "@material-tailwind/react";
import { Outlet, useNavigate } from 'react-router-dom';

// import { useNavigate } from "react-router-dom";

const TournamentTracking = () => {


    // useEffect(() => {
    //     const savedActiveStep = sessionStorage.getItem("activeStep");
    //     const lastCompletedStep = parseInt(savedActiveStep, 10);
    //     if (
    //       savedActiveStep !== null &&
    //       lastCompletedStep >= 1 &&
    //       lastCompletedStep <= 5
    //     ) {
    //       setActiveStep(lastCompletedStep);
    //     } else {
    //       setActiveStep(0); // Set initial step to 0 if no saved value or invalid value found
    //     }
    //   }, []);

      // useEffect(() => {
      //   sessionStorage.setItem("activeStep", activeStep.toString());
      // }, [activeStep]);
    
  return (
    <div className="w-full min-h-full flex flex-col-reverse md:flex-row md:space-x-5">

    <div className="mt-4 md:mt-0  md:border-none border-t-2 bg-white px-2 min-h-full w-full md:w-full  flex flex-col items-center ">
      <p className=" text-blue-gray-700 text-3xl font-bold my-4 lg:mt-0 w-full">
        New Tournament
      </p>

      <Outlet/>
    </div>


    </div>
  )
}

export default TournamentTracking;