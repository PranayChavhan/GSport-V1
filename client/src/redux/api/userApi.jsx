import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "universal-cookie";
import { setUser } from "../features/userSlice";

const cookie = new Cookies();
const token = cookie.get("jwt_auth_token");

const BASE_URL = "http://127.0.0.1:8000";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${BASE_URL}/`,
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({

    uploadDoc: builder.mutation({
      query(data) {
        return {
          url: `users/document?token=${token}`,
          body: data,
          method: "post",
        };
      },
    }),

    updateUserDetails: builder.mutation({
      query(data) {
        return {
          url: `users/details?token=${token}`,
          method: "PATCH",
          body: data,
        }
      },
      transformResponse: (result) => result, // This property allows us to manipulate the data returned by a query or mutation before it hits the cache.
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setUser({ user: data.data}));
          // Save user data to localStorage
          localStorage.setItem('userData', JSON.stringify(data.data));
        } catch (error) {
          console.log(`Error while onQueryStarted ${error}`);
        }
      },
    }),


  }),
});

export const { useUploadDocMutation, useUpdateUserDetailsMutation } = userApi;
