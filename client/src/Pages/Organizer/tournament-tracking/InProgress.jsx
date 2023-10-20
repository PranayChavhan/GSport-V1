/* eslint-disable no-unused-vars */
import {useState, useEffect} from 'react';


import { 
    Stepper, 
    Step, 
    Button, 
    Typography 
} from "@material-tailwind/react";

import {
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
} from "@heroicons/react/24/outline";

import { 
    Step1Update, 
    Step2Update, 
    Step3Update, 
    Step4Update, 
    Step5Update 
} from '../../../Components/Organizer/InProgress';
import { Outlet, useNavigate } from 'react-router-dom';
import { BiEdit, BiPlus } from 'react-icons/bi';

// import { useNavigate } from "react-router-dom";

const InProgress = () => {

  const navigate = useNavigate();

    const [activeStep, setActiveStep] = useState(1);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);

    // useEffect(() => {
    //     const savedActiveStep = sessionStorage.getItem("activeStep");
    //     const lastCompletedStep = parseInt(savedActiveStep, 10);
    //     if (
    //       savedActiveStep !== null &&
    //       lastCompletedStep >= 0 &&
    //       lastCompletedStep <= 4
    //     ) {
    //       setActiveStep(lastCompletedStep);
    //     } else {
    //       setActiveStep(0); // Set initial step to 0 if no saved value or invalid value found
    //     }
    //   }, []);

      const handleNext = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        !isLastStep && setActiveStep(activeStep + 1);
        console.log(activeStep);
        navigate(`/o/current/step${activeStep+1}`);
        
      };
      const handlePrev = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        !isFirstStep && setActiveStep(activeStep - 1);
        console.log(activeStep);
        navigate(`/o/current/step${activeStep-1}`);
      };

      
  const handleAutoSave = () => {
    console.log('Auto-Save triggered!');
    // console.log('Organization Name:', organizationName);
    // console.log('Organization Description:', organizationDescription);
    // console.log('Tournament Name:', tournamentName);
    // console.log('Tournament Description:', tournamentDescription);
    // console.log('Start Date:', startDate);
    // console.log('End Date:', endDate);
  };


  return (
    <div className="mt-4 md:mt-0  md:border-none border-t-2 bg-white px-2 h-full w-full md:w-full  flex flex-col items-center gap-4">
    <div className='flex justify-between w-full items-center'>
    <p className=" text-blue-gray-700 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold ">
      Current Tournament
    </p>

    <Button 
      color='orange'
      className='hidden md:block'
      onClick={() => navigate("/o/current/step1")}
    >
      Update Tournament
    </Button>
    <Button
      color='orange'
      className='md:hidden'
      onClick={() => navigate("/o/current/step1")}
    >
      <BiPlus className='w-6 h-6'/>
    </Button>
 
    </div>

      <Outlet/>

    </div>
  )
}

export default InProgress;