/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Button, Chip, Typography } from "@material-tailwind/react";
import { useGetRgstrdTeamsQuery } from "../../../../../redux/api/organizer/orgApi";
import { toast } from "react-toastify";
import AllTeamsTable from "./AllTeamsTable";
import { useParams } from "react-router-dom";

export default function Participants() {
  const params = useParams()
  const toSend = {
    tournament_id: params.tourId,
    tournament_game_id: params.tour_game_id,
  };
  const {
    currentData : allTeams,
    isLoading,
    isFetching,
    isError,
    error,
    refetch : refetchAllTeamsData 
  } = useGetRgstrdTeamsQuery(toSend);
  console.log(allTeams?.data);
  return (
    <>
      <div className="w-full min-h-screen">
        {
          allTeams && allTeams?.data === null ? <h1>No teams registered yet</h1> :<AllTeamsTable allTeams={allTeams?.data} refetchAllTeamsData={refetchAllTeamsData}/>
        }
        
      </div>
    </>
  );
}
