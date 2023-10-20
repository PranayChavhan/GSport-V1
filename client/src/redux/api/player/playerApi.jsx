// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const BASE_URL = "http://127.0.0.1:8000";

const cookie = new Cookies();
const token = cookie.get("jwt_auth_token");
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI3Njg5OTQsInN1YiI6Imp1RDNSTm52RUEifQ.2ahL8jbd2HccsNxIdbUzEznllahT46kZesvfl8wbbcA";

export const playerApi = createApi({
  reducerPath: "playerApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/players/` }),
  tagTypes: ["Players"],
  endpoints: (build) => ({

    getTeamById: build.query({
      query: (team_id)=>({
        url: `team/${team_id}?token=${token}`
      })
    }),

  }),
});

export const { useGetTeamByIdQuery } = playerApi;
