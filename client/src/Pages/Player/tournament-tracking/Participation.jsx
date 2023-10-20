/* eslint-disable no-unused-vars */
import React from 'react'
import { Outlet } from 'react-router-dom';

const Participation = () => {
  return (
    <div className="w-full min-h-full flex flex-col-reverse md:flex-row md:space-x-5">

    <div className="mt-4 md:mt-0  md:border-none border-t-2 bg-white px-2 min-h-full w-full md:w-full  flex flex-col items-center ">
      <p className=" text-blue-gray-700 text-3xl font-bold my-4 lg:mt-0 w-full">
        New Participation
      </p>

      <Outlet/>
    </div>


    </div>
  )
}

export default Participation