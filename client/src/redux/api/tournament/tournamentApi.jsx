// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const BASE_URL = "http://127.0.0.1:8000";

const cookie = new Cookies();
const token = cookie.get("jwt_auth_token");
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIyNzI5MDUsInN1YiI6Ild2Y3hlaEM0VTQifQ.DPoYgdlSKjkZb5ZqUZXa4imGSDEcrubCIegu8udclLY";

export const tournamentApi = createApi({
  reducerPath: "tournamentApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/tournaments/` }),
  tagTypes: ["Posts"],
  endpoints: (build) => ({

    getAllTrnmts: build.query({
      query: ()=>({
        url: `?page=0&limit=5&token=${token}`
      })
    }),

    getTournamentGames: build.query({
      query(tournament_id) {
        return {
          url: `${tournament_id}/games?token=${token}`,
        };
      },
    }),

    getTournmanetGameDetails: build.query({
      query(data){
        return {
          url: `${data.tournament_id}/games/${data.tour_game_id}/details?token=${token}`
        }
      }
    })

  }),
});

export const { useGetTournamentGamesQuery, useGetAllTrnmtsQuery, useGetTournmanetGameDetailsQuery } = tournamentApi;
