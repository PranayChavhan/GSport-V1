/* eslint-disable no-unused-vars */
import React from 'react'
import { Button,
    Input, } from "@material-tailwind/react";
    import { useNavigate } from "react-router-dom";

const NewParticipation = () => {
  const navigate = useNavigate();


  return (
    <div className='flex items-center justify-center flex-col gap-10'>
        
        <h1 className="text-2xl md:text-2xl flex flex-row justify-center font-bold text-blue-gray-700">New Participation</h1>
    <div className='flex flex-row items-center justify-center'>
    <img
      className="h-96  "
      src="/qr.jpg"
      alt="QR CODE LOGO"
    />

    {/* <div>
    <img
      className="h-96  "
      src="/qr.jpg"
      alt="QR CODE LOGO"
    />
    </div> */}
    </div>
    <Button onClick={()=>{navigate("/p/organization-details")}} color="orange">Scan QR from the Gallery</Button>

    <div className='flex flex-row items-center gap-5'>
    <div className="w-full">
      <Input label="Past like here" />
    </div>


    <Button onClick={()=>{navigate("/p/organization-details")}} color='orange'>Submit</Button>
    </div>


    <div className='flex flex-row items-center gap-5'>
    <div className="w-full">
      <Input label="Enter Unique code shared" />
    </div>

    <Button onClick={()=>{navigate("/p/organization-details")}} color='orange'>Submit</Button>
    </div>

    <Button onClick={()=>{navigate("/p/organization-details")}} color='orange'>Back</Button>

    </div>
  )
}

export default NewParticipation