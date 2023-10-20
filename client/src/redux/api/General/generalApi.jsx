import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";

const BASE_URL = "http://127.0.0.1:8000";

const cookie = new Cookies();
const token = cookie.get("jwt_auth_token");

export const generalApi = createApi({
  reducerPath: "generalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/general/`,
  }),
  endpoints: (builder) => ({

    getGames: builder.query({
      query() {
        return {
          url: "get_all_games",
        };
      },
    }),

    getUserByEmail: builder.query({
      query(email_id) {
        return {
          url: `validate_user?email_id=${email_id}&token=${token}`,
        };
      },
    }),


  }),
});

export const {
    useGetGamesQuery, 
    useGetUserByEmailQuery,
    useLazyGetUserByEmailQuery,
} = generalApi;
