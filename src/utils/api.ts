import axios, { AxiosRequestConfig } from 'axios';

export type ApiParams = AxiosRequestConfig;

const url = 'http://localhost:3000/api/v2/';

export const addPrefix = (prefix: string) => (endpoint:string) => `${prefix}/${endpoint}`;

const api = axios.create({
  baseURL: url,
  timeout: 3 * 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
