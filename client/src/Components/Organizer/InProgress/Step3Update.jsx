import React, { useState } from "react";
import CurrentStepper from "../../Common/CurrentStepper";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Dialog,
  Input,
  Checkbox,
  Button,
  Textarea,
  Spinner,
  Select as MSelect,
  Option,
  List,
  ListItem,
  ListItemPrefix,
  Radio,
  DialogHeader,
  DialogBody,
} from "@material-tailwind/react";

import { ImCross } from "react-icons/im";

import { useDispatch } from "react-redux";
import Select from "react-select";
import { useAddGameToTnmtMutation } from "../../../redux/api/organizer/orgApi";

import { useAppSelector } from "../../../redux/store";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DatePicker from "react-datepicker";

import { useGetGamesQuery } from "../../../redux/api/General/generalApi";
import { toast } from "react-toastify";

import { useNavigate, useParams } from "react-router-dom";
import { useGetTournamentGamesQuery } from "../../../redux/api/tournament/tournamentApi";
import moment from 'moment'

const Step3Update = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  // add game constants

  const { id: tourId } = useAppSelector(
    (state) => state.tournament.tour_details
  );
  const dispatch = useDispatch();
  const [
    addGameToTnmt,
    { isSuccess, isLoading: isAddingGame, isError: errorWhileAddingGame },
  ] = useAddGameToTnmtMutation();

  
  const initialValues = {
    name: "game1",
    tournament_id: tourId,
    game_id: 1, // hardcoded from database 1 -> cricket
    info: "very long long description",
    prize_pool: 60000,
    participation_fees: 200,
    team_size: 1,
    max_teams: 8,
    total_rounds: 3,
    min_boys: null,
    min_girls: null,
    open_to: 2,
    min_age: 18,
    max_age: 23,

    // field to be added

    type: 1, // select field
    num_groups: 0,
    teams_per_group: 0,
    avg_duration: 45,

    start_date: "2023-08-16T15:57:35.587Z",
    end_date: "2023-08-16T15:57:35.587Z",
    // start_date: null,
    // end_date: null
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [values, setValues] = useState(initialValues);
  const [qualification, setQualification] = useState("Single Elimination");
  const [game, setGame] = useState(null);
  const [whoCanParticipate, setWhoCanParticipate] = useState(2);

  const {
    data: fetchedGames,
    isLoading,
    isFetching,
    isSuccess: successGames,
    isError: errorWhileGamesFetch,
  } = useGetGamesQuery({ skip: true });
  if (errorWhileGamesFetch) {
    toast.error("Error while fetching games from our side");
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const qualificationOptions = [
    {
      value: 1,
      label: "Single Elimination",
    },
    {
      value: 2,
      label: "League",
    },
  ];

  const handleQualification = (selectedOption) => {
    console.log(selectedOption);
    setQualification(selectedOption.label);
    setValues({
      ...values,
      type: selectedOption,
    });
  };

  const handleGameChange = (selectedId) => {
    setValues({
      ...values,
      game_id: selectedId,
    });
  };

  const handleParticipantRadio = (value) => {
    setWhoCanParticipate(value);
    console.log(value);
    setValues({
      ...values,
      open_to: value,
    });

    if (value === 0) {
      setValues({
        ...values,
        min_girls: value,
        min_boys: null,
        open_to: value,
      });
    } else if (value === 1) {
      setValues({
        ...values,
        min_boys: value,
        min_girls: null,
        open_to: value,
      });
    } else if (value === 2) {
      setValues({
        ...values,
        min_boys: 1,
        min_girls: 0,
        open_to: value,
      });
    }
  };

  const addGameToDB = async () => {
    try {
      const addedGame = await addGameToTnmt(values);
      handleOpen();
      console.log(addedGame);
    } catch (e) {
      const err = e?.data.detail || "Unknown error";
      handleOpen();
      toast.success(`Error while adding game to tournament${err}`);
    }
  };

  console.log(values);

  const navigate = useNavigate();
  const { data: tourGames } = useGetTournamentGamesQuery(params.tourId)
  console.log("Tournament games all", tourGames)
  if(tourGames && tourGames?.data.length === 0){
    return (
      <div className="w-full h-full gap-4">
      <div className="w-full">
        <CurrentStepper step={2} />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <p className="text-4xl font-bold font-poppins text-blue-gray-600">No games yet</p>
      </div>
      </div>
    )
  }
  return (
    <div className="w-full h-full gap-4">
      <div className="w-full">
        <CurrentStepper step={2} />
      </div>
      <div className="gap-4  mt-4 flex flex-col">
        <p className="text-2xl lg:text-2xl font-bold text-blue-gray-700">
          All games
        </p>
        <div className="w-full h-full grid grid-auto-fit-lg gap-5">
          {tourGames && tourGames?.data.map((game, index) => (
            <Card onClick={() => navigate(`/o/current-tournament/${params.tourId}/tour_game/${game?.id}/step5`)}  className="hover:border-orange-400 border-2 hover:cursor-pointer" key={index}>
              <CardBody className="text-left">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {game?.name}
                </Typography>
                <Typography>{game?.info}</Typography>
              </CardBody>
              <CardFooter className="flex gap-4 rounded-lg text-sm">
                <p className="p-2 rounded-lg bg-blue-50 text-blue-600 ">
                  {moment(game?.start_date).format('DD-MM-YYYY')}
                </p>
                <p className="p-2 rounded-lg bg-red-50 text-red-600 ">
                {moment(game?.end_date).format('DD-MM-YYYY')}
                </p>
              </CardFooter>
            </Card>
          ))}
          <div className="flex items-center justify-start">
            <Button color="orange" className="w-fit h-fit" onClick={handleOpen}>
              Add Game
            </Button>
          </div>
        </div>
      </div>

      <Dialog
        size="xl"
        open={open}
        handler={handleOpen}
        className="lg:scroll-smooth shadow-none"
      >
        <DialogHeader className="flex justify-between">
          <p className=" text-xl text-center font-poppins font-bold">
            Add new Game
          </p>
          <p
            onClick={handleOpen}
            className="w-8 h-8 rounded-lg bg-red-400 p-2 text-white hover:bg-red-600 cursor-pointer"
          >
            <ImCross className="w-4 h-4" />
          </p>
        </DialogHeader>
        <DialogBody divider className="h-[40rem] overflow-scroll">
          <div className="w-full gap-8 py-5 border-t-2 ">
            {isSuccess ? (
              <div className="flex items-center justify-start mx-auto text-xl font-poppins gap-3">
                <CheckCircleIcon className="text-green-500" />{" "}
                <p>Game added Successfully</p>
              </div>
            ) : (
              <div className="space-y-4 shadow-sm md:p-4 w-full ">
                {/* GAme details div starts */}
                <div className="w-full lg:p-4 border border-black-100 rounded-lg flex flex-col gap-6">
                  <p className="font-semibold font-poppins text-blue-gray-700">
                    Enter game details{" "}
                  </p>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-1/2 gap-x-2">
                      <Input
                        value={values.name}
                        onChange={handleInputChange}
                        label="Enter the name of Game"
                        className="min-w-1/3"
                        color="orange"
                        name="name"
                      />
                    </div>
                    <div className="w-full lg:w-1/2 text-sm">
                      <MSelect
                        onChange={handleGameChange}
                        color="orange"
                        label="select game to be played"
                      >
                        {successGames ? (
                          fetchedGames.map((o, index) => (
                            <Option
                              key={index}
                              className="capitalize"
                              value={o.id}
                            >
                              {o.value}
                            </Option>
                          ))
                        ) : (
                          <Option>game 1</Option>
                        )}
                      </MSelect>
                    </div>
                  </div>
                  <div className="flex flex-col lg:flex-row gap-4">
                    <Input
                      value={values.avg_duration}
                      type="number"
                      onChange={handleInputChange}
                      label="Average duration (in minutes)"
                      color="orange"
                      name="avg_duration"
                    />
                    <MSelect
                      onChange={handleQualification}
                      color="orange"
                      label="Type of Game"
                    >
                      {qualificationOptions.map((op, index) => (
                        <Option
                          key={index}
                          className="capitalize"
                          value={op.value}
                        >
                          {op.label}
                        </Option>
                      ))}
                    </MSelect>
                  </div>

                  {values.type === 2 && (
                    <div className={`w-full flex flex-col lg:flex-row gap-5`}>
                      <Input
                        value={values.num_groups}
                        type="number"
                        onChange={handleInputChange}
                        label="Number of Groups"
                        color="orange"
                        name="num_groups"
                      />
                      <Input
                        value={values.teams_per_group}
                        type="number"
                        onChange={handleInputChange}
                        label="Teams per group"
                        color="orange"
                        name="teams_per_group"
                      />
                    </div>
                  )}

                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <Input
                      value={values.team_size}
                      onChange={handleInputChange}
                      label="Team Size"
                      color="orange"
                      name="team_size"
                    />
                    <Input
                      value={values.max_teams}
                      onChange={(e) => {
                        const newMaxTeams = e.target.value;
                        handleInputChange;
                      }}
                      label="Maximum Team"
                      color="orange"
                      name="max_teams"
                    />
                    <Input
                      value={values.total_rounds}
                      onChange={handleInputChange}
                      label="Total Matches to be played"
                      color="orange"
                      name="total_rounds"
                    />
                  </div>

                  <Textarea
                    value={values.info}
                    onChange={handleInputChange}
                    className="w-full "
                    label="Tournament Description"
                    color="orange"
                    name="info"
                  />
                </div>
                {/* GAme details div ends */}

                {/* Participants div starts */}
                <div className="lg:p-4 border border-black-100 rounded-lg space-y-4">
                  <div className="flex gap-4">
                    <p className="font-semibold font-poppins text-blue-gray-700">
                      Who can participate?
                    </p>
                  </div>
                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <List className=" w-full flex-row ">
                      <ListItem className="p-0">
                        <label
                          htmlFor="horizontal-list-react"
                          className="flex w-full cursor-pointer items-center  py-2"
                        >
                          <ListItemPrefix className="">
                            <Radio
                              color="amber"
                              name="horizontal-list"
                              id="horizontal-list-react"
                              ripple={false}
                              checked={whoCanParticipate === 0}
                              onChange={() => handleParticipantRadio(0)}
                              className="hover:before:opacity-0 "
                              containerProps={{
                                className: "p-0",
                              }}
                            />
                          </ListItemPrefix>
                          <Typography
                            color="blue-gray"
                            className="font-medium text-sm"
                          >
                            Only Girls
                          </Typography>
                        </label>
                      </ListItem>

                      <ListItem className="p-0">
                        <label
                          htmlFor="horizontal-list-vue"
                          className="flex w-full cursor-pointer items-center  py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Radio
                              color="amber"
                              name="horizontal-list"
                              id="horizontal-list-vue"
                              ripple={false}
                              className="hover:before:opacity-0"
                              containerProps={{
                                className: "p-0",
                              }}
                              checked={whoCanParticipate === 1}
                              onChange={() => handleParticipantRadio(1)}
                            />
                          </ListItemPrefix>
                          <Typography
                            color="blue-gray"
                            className="font-medium text-sm"
                          >
                            Only Boys
                          </Typography>
                        </label>
                      </ListItem>
                      <ListItem className="p-0">
                        <label
                          htmlFor="horizontal-list-svelte"
                          className="flex w-full cursor-pointer items-center  py-2"
                        >
                          <ListItemPrefix className="mr-3">
                            <Radio
                              color="amber"
                              name="horizontal-list"
                              id="horizontal-list-svelte"
                              ripple={false}
                              className="hover:before:opacity-0"
                              containerProps={{
                                className: "p-0",
                              }}
                              checked={whoCanParticipate === 2}
                              onChange={() => handleParticipantRadio(2)}
                            />
                          </ListItemPrefix>
                          <Typography
                            color="blue-gray"
                            className="font-medium text-sm"
                          >
                            Both
                          </Typography>
                        </label>
                      </ListItem>
                    </List>
                  </div>

                  <div className="w-full flex flex-col lg:flex-row gap-5">
                    <Input
                      value={values.min_age}
                      type="number"
                      onChange={handleInputChange}
                      label="Minimum age"
                      color="orange"
                      name="min_age"
                    />
                    <Input
                      value={values.max_age}
                      onChange={handleInputChange}
                      label="Maximum age"
                      color="orange"
                      name="max_age"
                    />
                  </div>
                </div>
                {/* Participants div ends */}

                {/* Prize and schedule div starts */}
                <div className="w-full lg:p-4  border border-black-100 flex md:justify-between flex-col lg:flex-row gap-4">
                  <div className="w-full flex flex-col gap-4 ">
                    <p className="font-semibold font-poppins text-blue-gray-700">
                      Fess and Prizes{" "}
                    </p>
                    <div className="flex flex-col lg:flex-row gap-5">
                      <Input
                        value={values.prize_pool}
                        onChange={handleInputChange}
                        label="Prize pool Rs"
                        color="orange"
                        name="prize_pool"
                      />
                      <Input
                        value={values.participation_fees}
                        onChange={handleInputChange}
                        label="Participation fees"
                        color="orange"
                        name="participation_fees"
                      />
                    </div>
                  </div>

                  {/* Schedule div starts */}
                  <div className="w-full flex flex-col gap-4">
                    <p className="font-semibold font-poppins text-blue-gray-700">
                      Schedule{" "}
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
                      <DatePicker
                        selected={startDate}
                        showTimeSelect
                        onChange={(date) => setStartDate(date)}
                        className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200 text-sm md:text-normal"
                        placeholderText="Select start Date"
                        selectsStart
                        name="start_date"
                        dateFormat="yyyy-MM-dd hh:mm:aa"
                        startDate={startDate}
                        endDate={endDate}
                      />
                      <p className="font-poppins p-2 bg-gray-100 rounded-lg">
                        To
                      </p>
                      <DatePicker
                        selected={endDate}
                        showTimeSelect
                        onChange={(date) => setEndDate(date)}
                        className="w-64 sm:w-56 md:w-60 lg:w-48 xl:w-60 border border-gray-500 p-4 py-2 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-sm md:text-normal"
                        placeholderText="Select End Date"
                        selectsStart
                        name="end_date"
                        dateFormat="yyyy-MM-dd hh:mm:aa"
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                      />
                    </div>
                  </div>
                  {/* Schedule div ends */}
                </div>
                {/* Prize and schedule div ends */}

                {/* <div className="w-full flex flex-col lg:flex-row justify-between  gap-4">
            <div className="text-sm w-full  flex items-center justify-center">
              <DatePicker
                selected={startDate}
                showTimeSelect
                onChange={(date) => setStartDate(date)}
                className="border border-gray-500 px-4 py-2  rounded-lg focus:outline-none w-64 focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-xs md:text-normal"
                placeholderText="Select End Date"
                name="start_date"
              />
            </div>
            <p className=" my-auto mx-4 text-normal font-poppins text-gray-700 text-center">to</p>
            <div className="text-sm w-full  flex items-center justify-center">
              <DatePicker
                selected={endDate}
                showTimeSelect
                onChange={(date) => setEndDate(date)}
                className="border border-gray-500 px-4 py-2 rounded-lg focus:outline-none w-64 focus:border-orange-500 focus:ring-2 focus:ring-orange-200  text-xs md:text-normal"
                placeholderText="Select End Date"
                name="end_date"
              />
            </div>
          </div> */}

                <div className="w-full flex justify-center items-center">
                  <Button
                    onClick={addGameToDB}
                    className="flex justify-center items-center"
                    color="orange"
                  >
                    {isAddingGame ? <Spinner color="amber" /> : "Add game"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogBody>
      </Dialog>
      <div className="mt-4 w-full flex flex-row  items-center justify-between lg:justify-between gap-4 ">
        <Button color="orange" onClick={() => navigate(`/o/current-tournament/${params.tourId}/step2`)}>
          Prev
        </Button>
        <Button color="orange" onClick={() => navigate(`/o/current-tournament/${params.tourId}/step4`)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default Step3Update;
