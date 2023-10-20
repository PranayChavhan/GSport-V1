// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const BASE_URL = "http://127.0.0.1:8000";

const cookie = new Cookies();
const token = cookie.get("jwt_auth_token");
// console.log(token)
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI3Njg5OTQsInN1YiI6Imp1RDNSTm52RUEifQ.2ahL8jbd2HccsNxIdbUzEznllahT46kZesvfl8wbbcA"

export const orgApi = createApi({
  reducerPath: "orgApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  tagTypes: ["org"],
  endpoints: (build) => ({

    getStats: build.query({
      query(){
       return {
          url: `organizer/stats?token=${token}`
        }
      }
    }),
    
    getOrgTrnmt: build.query({
      query(){
        return {
          url: ``,
        }
      }
    }),
    createTournament: build.mutation({
      query(body) {
        return {
          url: `organizer/tournament?token=${token}`,
          method: "post",
          body,
        };
      },
    }),

    updateTournament: build.mutation({
      query(data) {
        return {
          url: `organizer/tournament?token=${data.token}`,
          method: "patch",
          body: data,
        };
      },
    }),

    addGameToTnmt: build.mutation({
      query(data) {
        return {
          url: `organizer/tournament/${data.tournament_id}/games?token=${token}`,
          method: "post",
          body: data,
        };
      },
    }),

    updateTnmtGame: build.mutation({
      query(data) {
        return {
          url: `organizer/tournament/${data.tournament_id}/games?game_id=${data.game_id}&token=${data.token}`,
          method: "patch",
          body: data.req_body,
        };
      },
    }),

    addGrndUmpire: build.mutation({
      query(data) {
        return {
          url: `organizer/tournament/${data.tournament_id}/games/${data.tournament_game_id}?token=${token}`,
          method: "post",
          body: data,
        };
      },
    }),

    deleteUmpire: build.mutation({
      query(data) {
        return {
          url: `organizer/tournament/${data.tournament_id}/games/${data.tournament_game_id}/umpire/?umpire_id=${data.umpire_id}&token=${token}`,
          method: "delete",
        };
      },
    }),

    deleteGround: build.mutation({
      query(data) {
        return {
          url: `organizer/tournament/${data.tournament_id}/games/${data.tournament_game_id}/ground/?ground_id=${data.ground_id }&token=${token}`,
          method: "delete",
        };
      },
    }),

    getRgstrdTeams: build.query({
      query(data) {
        return {
          url: `organizer/tournament/${data.tournament_id}/games/${data.tournament_game_id}/teams?token=${token}`,
        };
      },
    }),

    teamsApproval: build.mutation({
      query(data) {
        return {
          url: `organizer/tournament/${data.tournament_id}/games/${data.tournament_game_id}/teams/verification?team_id=${data.team_id}&approve=${data.approve}&token=${token}`,
          method: "post",
        };
      },
    }),


    // Fixtures api's starts
    getFixtures: build.query({
      query(data){
        return{
          url:`organizer/tournament/${data.tournament_id}/games/${data.tournament_game_id}/fixtures/?game_id=${data.game_id}&token=${token}`
        }
      }
    }),

    createFixture: build.mutation({
      query(data){
        return{
          url:`organizer/tournament/${data.tournament_id}/games/${data.tournament_game_id}/fixtures/?game_id=${data.game_id}&tournament_type=${data.tournament_type}&token=${token}`,
          method:'post',
        }
      }
    }),
    
    // Fixtures api's ends

    

  }),
});

export const { useCreateTournamentMutation, 
  useAddGameToTnmtMutation,
  useGetRgstrdTeamsQuery,
  useGetFixturesQuery, 
  useTeamsApprovalMutation,
  useAddGrndUmpireMutation,
  useDeleteUmpireMutation,
  useDeleteGroundMutation,
} = orgApi;
