/* eslint-disable no-unused-vars */
import { useState } from "react";
// import AddGame from './AddGame';
import { Button } from "@material-tailwind/react";
// import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import CustomizedSteppers from "../../components/Stepper";
import AddGame from "./AddGame";
const Step3 = () => {
  
  // const dispatch = useDispatch();

  const [gameCount, setGameCount] = useState(1); // State to track the number of games

  const handleAddGame = () => {
    setGameCount(prevCount => prevCount + 1);
  };

  const handleRemoveGame = () => {
    if (gameCount > 1) {
      setGameCount(prevCount => prevCount - 1);
    }
  };

  const navigate = useNavigate();

  return (

    <div className='w-full flex flex-col gap-4'>
     <div className="w-full">
        <CustomizedSteppers step={2}/>
     </div>
     <div className="w-full flex justify-center sm:justify-end">
          <Link to={'/o/new-tournament/added-games'} className="font-poppins text-gray-600 hover:text-orange-500">
            <Button color="orange">
            See previous added games
            </Button>
          </Link>
      </div>

      <div className="flex justify-center ">
      {/* <Button color="red" onClick={handleRemoveGame} className=" bg-gray-400 shadow-none hover:bg-red-400 text-white px-4 py-2 mr-2">
        Remove Game
      </Button>
        <Button color="amber" onClick={handleAddGame} className="bg-orange-500 text-white px-4 py-2 ">
          Add Game
        </Button> */}

        <AddGame/>
      </div>

      <div className="w-full flex flex-row  items-center justify-between lg:justify-between gap-4 ">
        <Button color='orange' onClick={()=> navigate("/organizer/new-tournament/step2")} >
          Prev
        </Button>
        <Button color='orange' onClick={()=> navigate("/organizer/new-tournament/step4")} >
          Next
        </Button>
      </div>
      
    </div>
  )
}

export default Step3