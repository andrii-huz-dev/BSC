import axios from 'axios';
import { QueryClient } from 'react-query';

const APP = {
  baseURL: 'https://jsonplaceholder.typicode.com/',
};

export const AxiosInstance = axios.create({
  baseURL: APP.baseURL,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
});

export const queryClient = new QueryClient();

AxiosInstance.interceptors.response.use(
  (response) => {
    // if (!response || !response.data) {
    //   return Promise.reject(new Error('empty data'));
    // }
    if (response.data.error) {
      return Promise.reject(response.data.error);
    }
    return response;
  },
  (error) => Promise.reject(error),
);
