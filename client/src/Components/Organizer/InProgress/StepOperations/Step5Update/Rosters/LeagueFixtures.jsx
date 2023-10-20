import React from 'react'
import { Button, Card, CardBody } from '@material-tailwind/react'

import EditIcon from "@mui/icons-material/Edit";
import { Link } from 'react-router-dom';

const LeagueFixtures = () => {


    const groupMatches = [
        {
            number: 1,
            team1: "Mahesh Dalle",
            team2: "Balle Balle",
            umpire: "Vijay Shankar",
            ground: "Wankhede Stadium",
            mapLink : "https://goo.gl/maps/Xvh7ptXP7P2q8BvRA",
        },
        {
            number: 2,
            team1: "Mahesh Dalle",
            team2: "Balle Balle",
            umpire: "Vijay Shankar",
            ground: "Wankhede Stadium",
            mapLink : "https://goo.gl/maps/Xvh7ptXP7P2q8BvRA",
        },
        {
            number: 2,
            team1: "Mahesh Dalle",
            team2: "Balle Balle",
            umpire: "Vijay Shankar",
            ground: "Wankhede Stadium",
            mapLink : "https://goo.gl/maps/Xvh7ptXP7P2q8BvRA",
        },
        {
            number: 3,
            team1: "Mahesh Dalle",
            team2: "Balle Balle",
            umpire: "Vijay Shankar",
            ground: "Wankhede Stadium",
            mapLink : "https://goo.gl/maps/Xvh7ptXP7P2q8BvRA",
        },
        {
            number: 4,
            team1: "Mahesh Dalle",
            team2: "Balle Balle",
            umpire: "Vijay Shankar",
            ground: "Wankhede Stadium",
            mapLink : "https://goo.gl/maps/Xvh7ptXP7P2q8BvRA",
        },
    ];

    const openInNewTab = (url) => {
        window.open(url, '_blank', 'noreferrer');
    };

  return (
    <div className='w-full h-full border-2 flex flex-col gap-4'>
        <div className='text-xl text-center'>
            Group Matches
        </div>

        <div className='w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-5 p-2'>
            <div className='border-2  rounded-lg gap-4'>
                <p className='w-full p-4 shadow-sm font-bold text-lg '>Group A</p>
                <div className='p-2 flex flex-col gap-4 overflow-y-scroll   h-72'>

                {groupMatches.map(({number, team1, team2, umpire, ground, mapLink })=> (
                    <div key={number} className="flex flex-col gap-4  w-full items-start justify-between border rounded-lg hover:bg-gray-100 transition-all duration-200 p-2 ">
                    <p className=" font-semibold text-md p-2">
                        Match Number {number}
                    </p>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
                    
                    <div className='w-full xl:w-2/3 flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <div className="w-full">
                            <p className="text-md capitalize italic rounded-md flex items-center justify-start">
                                🎖️{team1}
                            </p>
                        </div>
  
                        <div className=" bg-orange-500 text-xl text-white  p-2 px-3 font-bold italic">
                        vs
                        </div>
  
                        <div className="w-full  ">
                        <p className="text-md capitalize italic rounded-md flex items-center justify-end">
                            {team2}
                        </p>
                        </div>
                
                    </div>
                    <div className="hidden   xl:flex justify-end items-center">
                        <Link  to={`/o/current/step5/rosters/fixture/452/`} >
                        <Button variant="outlined" color="amber" className="flex items-center gap-2 bg-white font-poppins tracking-wider">
                        <EditIcon/> Update score
                        </Button>
                        </Link>
                    </div>

                </div>
                {/* Match details starts */}
                <div className="w-full   pt-0 font-poppins flex justify-between">
                  <div className='w-full'>
                    <div className=' w-full  gap-2 '>
                        <p className="font-medium text-md text-left w-full border-b">
                        Umpire:{" "}
                        <span className="font-normal italic pl-3">
                        {umpire}
                        </span>
                        </p>
                            <p  onClick={() => openInNewTab(mapLink)}
                                className="font-medium text-md text-left w-full cursor-pointer"
                            >
                            Ground :{" "}
                            <span className="font-normal italic pl-3 text-blue-500">
                            {ground}
                            </span>
                            </p>
                        
                    </div>
                    <div className="mt-2 w-full xl:hidden  flex justify-center items-center">
                        <Link to={`/o/current/step5/rosters/fixture/452/`} className='w-full'>
                        <Button variant="outlined" color="amber" className="w-full flex items-center justify-center gap-2 bg-white font-poppins tracking-wider">
                        <EditIcon/><p>Update score</p>
                        </Button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
                ))}


               
                </div>
            </div>
            <div className='border-2  rounded-lg gap-4'>
                <p className='w-full p-4 shadow-sm font-bold text-lg '>Group B</p>
                <div className='p-2 flex flex-col gap-4 overflow-y-scroll   h-72'>

                {groupMatches.map(({number, team1, team2, umpire, ground, mapLink })=> (
                    <div key={number} className="flex flex-col gap-4  w-full items-start justify-between border rounded-lg hover:bg-gray-100 transition-all duration-200 p-2 ">
                    <p className=" font-semibold text-md p-2">
                        Match Number {number}
                    </p>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
                    
                    <div className='w-full xl:w-2/3 border-b-2 border-orange-500 flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <div className="w-full">
                            <p className="text-md capitalize italic rounded-md flex items-center justify-start">
                                🎖️{team1}
                            </p>
                        </div>
  
                        <div className=" bg-orange-500 text-xl text-white  p-2 px-3 font-bold italic">
                        vs
                        </div>
  
                        <div className="w-full  ">
                        <p className="text-md capitalize italic rounded-md flex items-center justify-end">
                            {team2}
                        </p>
                        </div>
                
                    </div>
                    <div className="hidden   xl:flex justify-end items-center">
                        <Link  to={`/o/current/step5/rosters/fixture/452/`} >
                        <Button variant="outlined" color="amber" className="flex items-center gap-2 bg-white font-poppins tracking-wider">
                        <EditIcon/> Update score
                        </Button>
                        </Link>
                    </div>

                </div>
                {/* Match details starts */}
                <div className="w-full   pt-0 font-poppins flex justify-between">
                  <div className='w-full'>
                    <div className=' w-full  gap-2 '>
                        <p className="font-medium text-md text-left w-full border-b">
                        Umpire:{" "}
                        <span className="font-normal italic pl-3">
                        {umpire}
                        </span>
                        </p>
                            <p  onClick={() => openInNewTab(mapLink)}
                                className="font-medium text-md text-left w-full cursor-pointer"
                            >
                            Ground :{" "}
                            <span className="font-normal italic pl-3 text-blue-500">
                            {ground}
                            </span>
                            </p>
                        
                    </div>
                    <div className="mt-2 w-full xl:hidden  flex justify-center items-center">
                        <Link to={`/o/current/step5/rosters/fixture/452/`} className='w-full'>
                        <Button variant="outlined" color="amber" className="w-full flex items-center justify-center gap-2 bg-white font-poppins tracking-wider">
                        <EditIcon/><p>Update score</p>
                        </Button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
                ))}


               
                </div>
            </div>
            <div className='border-2  rounded-lg gap-4'>
                <p className='w-full p-4 shadow-sm font-bold text-lg '>Group C</p>
                <div className='p-2 flex flex-col gap-4 overflow-y-scroll   h-72'>

                {groupMatches.map(({number, team1, team2, umpire, ground, mapLink })=> (
                    <div key={number} className="flex flex-col gap-4  w-full items-start justify-between border rounded-lg hover:bg-gray-100 transition-all duration-200 p-2 ">
                    <p className=" font-semibold text-md p-2">
                        Match Number {number}
                    </p>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
                    
                    <div className='w-full xl:w-2/3 border-b-2 border-orange-500 flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <div className="w-full">
                            <p className="text-md capitalize italic rounded-md flex items-center justify-start">
                                🎖️{team1}
                            </p>
                        </div>
  
                        <div className=" bg-orange-500 text-xl text-white  p-2 px-3 font-bold italic">
                        vs
                        </div>
  
                        <div className="w-full  ">
                        <p className="text-md capitalize italic rounded-md flex items-center justify-end">
                            {team2}
                        </p>
                        </div>
                
                    </div>
                    <div className="hidden   xl:flex justify-end items-center">
                        <Link  to={`/o/current/step5/rosters/fixture/452/`} >
                        <Button variant="outlined" color="amber" className="flex items-center gap-2 bg-white font-poppins tracking-wider">
                        <EditIcon/> Update score
                        </Button>
                        </Link>
                    </div>

                </div>
                {/* Match details starts */}
                <div className="w-full   pt-0 font-poppins flex justify-between">
                  <div className='w-full'>
                    <div className=' w-full  gap-2 '>
                        <p className="font-medium text-md text-left w-full border-b">
                        Umpire:{" "}
                        <span className="font-normal italic pl-3">
                        {umpire}
                        </span>
                        </p>
                            <p  onClick={() => openInNewTab(mapLink)}
                                className="font-medium text-md text-left w-full cursor-pointer"
                            >
                            Ground :{" "}
                            <span className="font-normal italic pl-3 text-blue-500">
                            {ground}
                            </span>
                            </p>
                        
                    </div>
                    <div className="mt-2 w-full xl:hidden  flex justify-center items-center">
                        <Link to={`/o/current/step5/rosters/fixture/452/`} className='w-full'>
                        <Button variant="outlined" color="amber" className="w-full flex items-center justify-center gap-2 bg-white font-poppins tracking-wider">
                        <EditIcon/><p>Update score</p>
                        </Button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
                ))}


               
                </div>
            </div>
            <div className='border-2  rounded-lg gap-4'>
                <p className='w-full p-4 shadow-sm font-bold text-lg '>Group D</p>
                <div className='p-2 flex flex-col gap-4 overflow-y-scroll   h-72'>

                {groupMatches.map(({number, team1, team2, umpire, ground, mapLink })=> (
                    <div key={number} className="flex flex-col gap-4  w-full items-start justify-between border rounded-lg hover:bg-gray-100 transition-all duration-200 p-2 ">
                    <p className=" font-semibold text-md p-2">
                        Match Number {number}
                    </p>
                    <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
                    
                    <div className='w-full xl:w-2/3 border-b-2 border-orange-500 flex flex-col sm:flex-row items-center justify-between gap-4'>
                        <div className="w-full">
                            <p className="text-md capitalize italic rounded-md flex items-center justify-start">
                                🎖️{team1}
                            </p>
                        </div>
  
                        <div className=" bg-orange-500 text-xl text-white  p-2 px-3 font-bold italic">
                        vs
                        </div>
  
                        <div className="w-full  ">
                        <p className="text-md capitalize italic rounded-md flex items-center justify-end">
                            {team2}
                        </p>
                        </div>
                
                    </div>
                    <div className="hidden   xl:flex justify-end items-center">
                        <Link  to={`/o/current/step5/rosters/fixture/452/`} >
                        <Button variant="outlined" color="amber" className="flex items-center gap-2 bg-white font-poppins tracking-wider">
                        <EditIcon/> Update score
                        </Button>
                        </Link>
                    </div>

                </div>
                {/* Match details starts */}
                <div className="w-full   pt-0 font-poppins flex justify-between">
                  <div className='w-full'>
                    <div className=' w-full  gap-2 '>
                        <p className="font-medium text-md text-left w-full border-b">
                        Umpire:{" "}
                        <span className="font-normal italic pl-3">
                        {umpire}
                        </span>
                        </p>
                            <p  onClick={() => openInNewTab(mapLink)}
                                className="font-medium text-md text-left w-full cursor-pointer"
                            >
                            Ground :{" "}
                            <span className="font-normal italic pl-3 text-blue-500">
                            {ground}
                            </span>
                            </p>
                        
                    </div>
                    <div className="mt-2 w-full xl:hidden  flex justify-center items-center">
                        <Link to={`/o/current/step5/rosters/fixture/452/`} className='w-full'>
                        <Button variant="outlined" color="amber" className="w-full flex items-center justify-center gap-2 bg-white font-poppins tracking-wider">
                        <EditIcon/><p>Update score</p>
                        </Button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
                ))}


               
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default LeagueFixtures