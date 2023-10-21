/* eslint-disable no-useless-catch */
// api.js

import axiosClient from "./axios"; // Import your Axios instance

export async function getRequest(URL) {
  try {
    const response = await axiosClient.get(URL);
    return response.data;
  } catch (error) {
    throw error; // Rethrow the error for better handling in components
  }
}

export async function postRequest(URL, payload) {
  try {
    const response = await axiosClient.post(URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function patchRequest(URL, payload) {
  try {
    const response = await axiosClient.patch(URL, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteRequest(URL) {
  try {
    const response = await axiosClient.delete(URL);
    return response.data;
  } catch (error) {
    throw error;
  }
}
