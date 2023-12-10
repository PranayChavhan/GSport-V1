/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
import { Outlet } from 'react-router-dom';
const NewTournament = () => { 
  return (
    <div className="w-full min-h-full flex flex-col-reverse md:flex-row md:space-x-5">
    <div className="mt-4 md:mt-0 bg-white rounded-lg px-2 min-h-full w-full md:w-full shadow-md  flex flex-col items-center ">
      <p className=" text-blue-gray-700 text-3xl font-bold my-4 lg:mt-0 w-full">
        {/* New Tournament */}
      </p>
      <Outlet/>
    </div>


    </div>
  )
}

export default NewTournament;