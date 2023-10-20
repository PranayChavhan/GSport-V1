/* eslint-disable no-unused-vars */
import React from 'react'
import { Select, Option, Textarea, Button } from "@material-tailwind/react";
 
const Help = () => {
  return (
    <div className='w-full h-full px-[5rem] py-[3rem]'>
      <div>

      
        <h1 className="text-4xl md:text-4xl font-bold text-blue-gray-900">How shall We help you Mr/Miss.....?</h1>
        <p className="text-md md:text-md text-blue-gray-700"> Fill in the form to get in touch.</p>
        </div>

        <div className="flex flex-row justify-start items-center gap-10">
          <div className='bg-red-100'>
            <img className='w-[40rem]' src="/help.jpg" alt="help-vector" />
          </div>

          <div className='flex flex-col gap-3'>

            <h2>Which topic best fit your needs</h2>
            <div className="w-full">
      <Select label="Please select">
        <Option>Material Tailwind HTML</Option>
        <Option>Material Tailwind React</Option>
        <Option>Material Tailwind Vue</Option>
        <Option>Material Tailwind Angular</Option>
        <Option>Material Tailwind Svelte</Option>
      </Select>
    </div>

    <h2>How can we help you?</h2>
    <div className="w-96">
      <Textarea label="Message" />
    </div>

    <div className='w-full'><Button className='w-full' color="orange">Submit</Button></div>
          </div>
          
        </div>
    </div>
  )
}

export default Help