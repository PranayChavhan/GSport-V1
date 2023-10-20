import { Button, ButtonGroup } from "@material-tailwind/react";
import React, { Fragment, useState } from "react";
import {
  useGetFixtureByIdQuery,
  useAddScoreVtbMutation,
  fixturesApi,
} from "../../../../../../redux/api/organizer/fixturesApi";
import { useParams } from "react-router-dom";
import { ScoreBoard } from "../..";



export default function SetScoreForTennis() {
  const { fixtureId } = useParams();

  const {
    data: fixtureData,
    isFetching,
    isLoading,
  } = useGetFixtureByIdQuery(fixtureId);
  console.log("SetscoreForTennis" , fixtureData?.data);

  // const { game_id } = fixtureData?.data 
  

  return (
    <Fragment>
      {/* Team dettails div starts */}
      <div className="group my-8 p-6 flex gap-x-16 w-full items-start justify-between">
        <div className="flex flex-row items-center justify-between gap-4 border-b-2 border-orange-500">
          <div className="w-60 pl-6">
            <p className="text-xl capitalize italic rounded-md flex items-center justify-start">
              🎖️{fixtureData?.data?.team_1?.name}
            </p>
          </div>

          <div className="bg-orange-500 text-xl text-white px-4 py-2 font-bold italic">
            vs
          </div>

          <div className="w-60 pl-6">
            <p className="text-xl capitalize italic rounded-md flex items-center justify-end">
              {fixtureData?.data?.team_2?.name}
            </p>
          </div>
        </div>
        {/* Match details starts */}
        <div className="w-full h-auto p-2 pt-0 font-poppins flex justify-between">
          <div>
            <p className=" font-semibold text-xl">
              Match Number {fixtureData?.data?.match_number}
            </p>
            <p className="font-medium text-lg">
              Umpire:{" "}
              <span className="font-normal italic pl-3">
                {fixtureData?.data?.umpire?.first_name}
              </span>
            </p>
            <p className="font-medium text-lg">
              Location:{" "}
              <span className="font-normal italic pl-3">
                {fixtureData?.data?.ground?.location}
              </span>
            </p>
            <p className="font-medium text-lg">
              Ground name:{" "}
              <span className="font-normal italic pl-3">
                {fixtureData?.data?.ground?.name}
              </span>
            </p>
          </div>
        </div>
        {/* Match details ends */}
      </div>
      <p className="border-b border-gray-400 w-full "></p>
      {/* Team dettails div ends */}

      {/* Scoring div starts */}
      <Fragment>
        <ScoreBoard game_id={fixtureData?.data?.game_id} fixtureData={fixtureData?.data}/>
      </Fragment>
        
      {/* Scoring div ends */}
    </Fragment>
  );
}
