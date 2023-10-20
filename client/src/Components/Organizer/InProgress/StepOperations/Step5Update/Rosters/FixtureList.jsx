import React from "react";
import { Button } from "@material-tailwind/react";
import { useGetFixturesQuery } from "../../../../../../redux/api/organizer/orgApi";
import { Fragment } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { toast } from "react-toastify";
import { Link, Outlet, useParams } from "react-router-dom";

function AllFixturesList({ params, fixtures }) {
  console.log("fixtures", fixtures);

  return (
    <div className="p-6 border w-full rounded-lg shadow-xl ">
      {/* Display the round number */}
      <p className="font-poppins text-2xl font-bold">
        Round {fixtures[0].round_no}
      </p>

      {/* Map over fixtures for this round */}
      {fixtures.map((fixture) => (
        <Fragment key={fixture.id}>
          <div className="group my-8 p-6 flex gap-x-16 w-full items-start justify-between hover:bg-gray-100 transition-all duration-200">
            <div className="flex flex-row items-center justify-between gap-4 border-b-2 border-orange-500">
              <div className="w-60 pl-6">
                <p className="text-xl capitalize italic rounded-md flex items-center justify-start">
                  🎖️{fixture?.team_1?.name}
                </p>
              </div>

              <div className="bg-orange-500 text-xl text-white px-4 py-2 font-bold italic">
                vs
              </div>

              <div className="w-60 pl-6">
                <p className="text-xl capitalize italic rounded-md flex items-center justify-end">
                  {fixture?.team_2?.name}
                </p>
              </div>
            </div>
            {/* Match details starts */}
            <div className="w-full h-auto p-2 pt-0 font-poppins flex justify-between">
              <div>
                <p className=" font-semibold text-xl">
                  Match Number {fixture?.match_number}
                </p>
                <p className="font-semibold text-lg text-orange-500">
                  Winner:{" "}
                  <span className="font-normal italic pl-3">
                    {fixture?.winner?.name}
                  </span>
                </p>
                <p className="font-medium text-lg">
                  Umpire:{" "}
                  <span className="font-normal italic pl-3">
                    {fixture?.umpire?.first_name}
                  </span>
                </p>
                <p className="font-medium text-lg">
                  Location:{" "}
                  <span className="font-normal italic pl-3">
                    {fixture?.ground?.location}
                  </span>
                </p>
                <p className="font-medium text-lg">
                  Ground name:{" "}
                  <span className="font-normal italic pl-3">
                    {fixture?.ground?.name}
                  </span>
                </p>
              </div>

              {/* Edit game starts */}
              <div className="hidden group-hover:block">
                <Link to={`/o/current-tournament/${params.tourId}/tour_game/${params.tour_game_id}/step5/rosters/fixture/${fixture?.id}`}>
                <Button variant="outlined" color="amber" className="flex items-center gap-2 bg-white font-poppins tracking-wider">
                <EditIcon/> Update score
                </Button>
                </Link>
                
              </div>
              {/* Edit game ends */}
            </div>
            {/* Match details ends */}
          </div>
        </Fragment>
      ))}
    </div>
  );
}

export default function fixtureList() {
  const params = useParams()
  const toSend = {
    tournament_id: "HRTirSchGzYehTGx",
    tournament_game_id: "HSohQ8E22JU5oeXQ",
    game_id: 1,
  };
  const {
    data: allFixtures,
    isLoading,
    isFetching,
    isSuccess,
    isError,
    error
  } = useGetFixturesQuery(toSend);
  if(isFetching){
    return <p className="text-2xl font-poppins flex items-center justify-center">...Fetching fixtures</p>
  }
  if(isLoading){
    return <p className="text-2xl font-poppins flex items-center justify-center">...Loading fixtures</p>
  }
  if(isError){
    toast.error(error?.data?.detail)
  }

  const fixturesByRound = {};

  if (isSuccess) {
    // Step 1: Group fixtures by 'round_no'
    allFixtures?.data?.forEach((fixture) => {
      const roundNo = fixture.round_no;
      if (!fixturesByRound[roundNo]) {
        fixturesByRound[roundNo] = [];
      }
      fixturesByRound[roundNo].push(fixture);
    });
  }

  return (
    <div className="flex flex-col gap-2 min-h-screen">
      <div>
        <div className="flex flex-col w-full items-start justify-center gap-6">
          {/* Render fixtures grouped by rounds */}
          {Object.keys(fixturesByRound).map((roundNo) => (
            <Fragment key={roundNo}>
              <AllFixturesList params={params} fixtures={fixturesByRound[roundNo]} />
            </Fragment>
          ))}

          <div className="flex flex-row w-full px-20 justify-between items-center">
            <Button color="orange">Customize Roster</Button>
            <Button color="orange">Declare Roster</Button>
          </div>
        </div>

        <div className="my-10 border-t-2"></div>
      </div>
    </div>
  );
}