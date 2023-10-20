/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useGetTournamentGamesQuery } from "../../../../redux/api/tournament/tournamentApi";
import { useAppSelector } from "../../../../redux/store";
import { useState } from "react";
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
import EditIcon from "@mui/icons-material/Edit";

import GameCard  from "../../GameCard";

// entire ui can be divided into

// game detail

// participants details (ex: min age, min boys ,etc)

// prize

// schedule

function UpdateDialog() {
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

  const handleGameChangeSelect = (game) => {
    setSelectedGame(game);
    console.log(`Option selected:`, game);
  };
  const addGameToDB = async () => {
    console.log(values);
  };
  return (
    <div>
      <Button
        color="amber"
        variant="outlined"
        onClick={handleOpen}
        className="hover:text-white hover:bg-orange-500 flex gap-2 items-center justify-center w-auto border-none"
      >
        <EditIcon />
        <p>Edit</p>
      </Button>
      <Dialog open={open} handler={handleOpen} size="xxl">
        <DialogHeader className="font-poppins">Edit game details</DialogHeader>
        <DialogBody divider className="font-poppins  overflow-y-scroll">
          <div className="w-full flex flex-col p-4 gap-2">
            <div className="w-full h-52 space-y-2 border-2 border-red-500">
              <p className="font-bold text-black">Game Details</p>
              <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full lg:w-2/3 gap-x-2">
                  <Input
                    value={values.name}
                    onChange={handleInputChange}
                    label="Enter the name of Tournament"
                    className="min-w-1/3"
                    color="orange"
                    name="name"
                  />
                </div>
                <div className="w-full lg:w-1/3 text-sm">
                  <Select
                    placeholder="Select game"
                    options={options}
                    onChange={handleGameChangeSelect}
                    autoFocus={true}
                    value={selectedGame}
                  />
                </div>
              </div>
            </div>
            <div className="w-full h-52 border-2 border-green-500"></div>
            <div className="w-full h-52 border-2 border-purple-500"></div>
            <div className="w-full h-52 border-2 border-orange-500"></div>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={handleOpen}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button variant="gradient" color="green" onClick={handleOpen}>
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
}

export default function AllAddedGames() {
  const { id: tourId } = useAppSelector(
    (state) => state.tournament.tour_details
  );
  const {
    data: allGames,
    isFetching,
    isLoading,
  } = useGetTournamentGamesQuery("hUvFddYbS3iTN2uL", {
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  console.log(allGames?.data);

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="w-full flex flex-col sm:flex-row gap-2 justify-between">
        <p className="text-xl font-bold font-poppins">
          Total Added Games: {allGames?.data.length}
        </p>
        <Link
          to={"/o/new-tournament/step3"}
          className="font-poppins text-gray-600 hover:text-orange-500"
        >
          Add more games
        </Link>
      </div>

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 ">
            <GameCard/>
            <GameCard/>
            <GameCard/>
            <GameCard/>
      </div>
    </div>
  );
}
