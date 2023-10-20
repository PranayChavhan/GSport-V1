import { Link } from "react-router-dom";
//import { useGetTournamentGamesQuery } from "../../../../redux/api/organizer/tournamentApi";
//import { useAppSelector } from "../../../../redux/store";
import { React, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import Select from "react-select";
import EditIcon from '@mui/icons-material/Edit';

// entire ui can be divided into

// game detail

// participants details (ex: min age, min boys ,etc)

// prize

// schedule

function UpdateDialog({ buttonText,leftText,middleText }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  

  const initialValues = {
    name: "game1",
    tournament_id: "hUvFddYbS3iTN2uL",
    game_id: 1, // hardcoded from database 1 -> cricket
    info: "very long long description",
    prize_pool: 60000,
    participation_fees: 200,
    team_size: 1,
    max_teams: 8,
    total_rounds: 3,
    min_boys: 1,
    min_girls: 0,
    open_to: 1,
    min_age: 18,
    max_age: 23,
    // field to be added
    type: 1, // select field
    num_groups: 0,
    teams_per_group: 0,
    avg_duration: 45,
    start_date: "2023-08-16T15:57:35.587Z",
    end_date: "2023-08-16T15:57:35.587Z",
  };

  const [values, setValues] = useState(initialValues);
  const [selectedGame, setSelectedGame] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const options = [
    {
      value: "Cricket",
      label: "Cricket",
    },
    {
      value: "Football",
      label: "Football",
    },
    {
      value: "Badminton",
      label: "Badminton",
    },
  ];

  const handleGameChangeSelect = (game)=>{
    setSelectedGame(game);
    console.log(`Option selected:`, game);
  }
//   const addGameToDB = async () => {
//     console.log(values);
//   };
  return (
    <>
      <div className="flex items-center justify-between">
      {buttonText === "Apply Now" ? (
          <Link
            to={"/p/Info"}
            color="amber"
            variant="outlined"
            className="px-4 py-2 rounded-lg font-bold text-white bg-orange-500 flex gap-2 items-center justify-center w-auto border-none"
          >
            <p>{buttonText} </p>
          </Link>
        ) : (
          <Link
            color="amber"
            variant="outlined"
            
            className="px-4 py-2 rounded-lg font-bold text-white bg-orange-500 flex gap-2 items-center justify-center w-auto border-none"
          >
            <p>{buttonText} </p>
          </Link>
        )}
      
      <span className="ml-0 sm:ml-4 font-bold text-gray-900 bg-gray-200 px-4 py-2 rounded-lg">{middleText}</span>
      <span className="ml-0 sm:ml-4 font-bold text-gray-900 bg-gray-200 px-4 py-2 rounded-lg">{leftText}</span>
      </div>
    </>
  );
}

export default function Games() {
//   const { id: tourId } = useAppSelector(
//     (state) => state.tournament.tour_details
//   );
//   const {
//     data: allGames,
//     isFetching,
//     isLoading,
//   } = useGetTournamentGamesQuery("hUvFddYbS3iTN2uL", {
//     refetchOnMountOrArgChange: true,
//     skip: false,
//   });

  //console.log(allGames?.data);
  const gamesData = [
    {
      name: "Game 1",
      
    },
    {
      name: "Game 2",
      
    },
    {
        name: "Game 3",
        // Other game data...
      },
      {
        name: "Game 4",
        // Other game data...
      },
      {
        name: "Game 5",
        // Other game data...
      },
      {
        name: "Game 6",
        // Other game data...
      },
      {
        name: "Game 7",
        // Other game data...
      },
      {
        name: "Game 8",
        // Other game data...
      },
      {
        name: "Game 9",
        // Other game data...
      },
  ];

  return (
    <div className="w-full p-4">


<div class="container mx-auto items-center flex px-5 py-24 md:flex-row flex-col bg-gray-100 rounded-lg mt-4 mb-8 border-2 rounded-lg hover:border-orange-500">
    <div class="lg:w-80 lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 lg:ml-8">
      <img class="object-cover object-center rounded" alt="hero" src="/football.png"/>
    </div>
    <div class="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
      <h1 class="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Trending
        
      </h1>
      <p class="mb-8 leading-relaxed">Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.</p>
      <div class="flex justify-center">
        <Link to={'/p/Info'} class="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg rounded-lg">Apply Now</Link>
        
      </div>
    </div>
  </div>






      <div className="w-full flex justify-between mb-4">
        <p className="text-3xl mt-8 font-bold font-poppins">
          Open
        </p>
        <hr className="border-gray-500 w-4/5 mt-12" />
        <Link
          to={"/p/open"}
          className="font-bold bg-orange-100 rounded-full px-6 py-2 text-orange-500 hover:text-orange-500 mt-8"
        >
         All Open Games
        </Link>
      </div>

      <div className="grid grid-auto-fit-[25rem] gap-6">
        {gamesData.slice(0,6).map((game) => (
          <>
            <Card className="w-full  border-2 hover:border-orange-500 cursor-pointer" >
              <CardBody>
                <Typography
                  variant="h5"
                  className="mb-2 capitalize"
                >
                  {game?.name}
                </Typography>
                {/* <img src="/footcric.jpg" alt="Game" className="w-full h-44 rounded-lg" /> */}
                <Typography className="mt-4">
                The place is close to Barceloneta Beach and bus stop just 2
                min by walk and near to "Naviglio" where you can enjoy the main
                night life in Barcelona.
              </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <UpdateDialog buttonText="Apply Now" middleText="OPEN" leftText="STARTS 14/11/24"/>
              </CardFooter>
            </Card>
          </>
        ))}


      </div>
      <div className="w-full flex justify-between items-center mb-2">
          <p className="text-3xl mt-20 mb-4 font-bold font-poppins">
            Upcoming
          </p>
          <hr className="border-gray-500 w-3/4 mt-16" />
          <Link
            to={"/p/upcoming"}
            className="font-bold bg-orange-100 rounded-full px-6 py-2 text-orange-500 hover:text-orange-500 mt-16 mb-2"
          >
            All Upcoming Games
          </Link>
        </div>
        <div className="grid grid-auto-fit-[25rem] gap-6">
        {gamesData.slice(0,6).map((game) => (
          <Card
            key={game.name}
            className="w-fit border-2 hover:border-orange-500 cursor-pointer"
          >
            <CardBody>
              <Typography
                variant="h5"
                className="mb-2 capitalize"
              >
                {game?.name}
              </Typography>
              {/* <img src="/footcric.jpg" alt="Game" className="w-full h-44 rounded-lg" /> */}
                <Typography className="mt-4">
                The place is close to Barceloneta Beach and bus stop just 2
                min by walk and near to "Naviglio" where you can enjoy the main
                night life in Barcelona.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <UpdateDialog buttonText="Remind Me" middleText="UPCOMING" leftText="STARTS 14/11/24"/>
            </CardFooter>
          </Card>
        ))}
        </div>
    </div>
    
  );
}
