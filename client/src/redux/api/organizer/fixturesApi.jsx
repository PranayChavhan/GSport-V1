// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const BASE_URL = "http://127.0.0.1:8000";

const cookie = new Cookies();
const token = cookie.get("jwt_auth_token");
// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTI3Njg5OTQsInN1YiI6Imp1RDNSTm52RUEifQ.2ahL8jbd2HccsNxIdbUzEznllahT46kZesvfl8wbbcA";

export const fixturesApi = createApi({
  reducerPath: "fixturesApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/fixtures/` }),
  tagTypes: ["Fixtures"],
  endpoints: (build) => ({

    getFixtureById: build.query({
      query: (fixtureId)=>({
        url: `id/${fixtureId}?token=${token}`
      })
    }),

    addScoreVtb: build.mutation({
      query(data) {
        return {
          url: `VTB/id/${data[0].fixture_id}/score?token=${token}`,
          method: 'post',
          body: data,
        };
      },
    }),

  }),
});

export const { useGetFixtureByIdQuery, useAddScoreVtbMutation } = fixturesApi;
