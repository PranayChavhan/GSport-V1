/* eslint-disable no-unused-vars */
import React from 'react'

const AboutUsPage = () => {
  return (
    <div className='px-[2rem]'>

      <div className='flex flex-col justify-center items-center gap-3'>
        <h1 className="text-4xl md:text-4xl font-bold text-blue-gray-900">About us</h1>
        <p className="text-sm px-0 lg:px-[38rem]  md:text-sm text-blue-gray-700">At G-Sport, we are a dedicated team of professionals united by a shared love for sports and a commitment to excellence. With a diverse skill set encompassing business acumen, marketing prowess, strategic planning, and operational expertise, we are well-equipped to navigate the complex landscape of the sports industry.</p>
      </div>

      <div className='flex my-5 flex-row justify-center items-center'>
        <img className='rounded-md w-[50%]' src="/team.jpg" alt="" />
      </div>

    </div>
  )
}

export default AboutUsPage