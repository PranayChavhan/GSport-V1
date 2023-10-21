// api.js

import axiosClient from './axios'; // Import your Axios instance

export function getRequest(URL) {
  return axiosClient.get(URL)
    .then(response => response.data)
    .catch(error => {
      throw error; // Rethrow the error for better handling in components
    });
}

export function postRequest(URL, payload) {
  return axiosClient.post(URL, payload)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function patchRequest(URL, payload) {
  return axiosClient.patch(URL, payload)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}

export function deleteRequest(URL) {
  return axiosClient.delete(URL)
    .then(response => response.data)
    .catch(error => {
      throw error;
    });
}
