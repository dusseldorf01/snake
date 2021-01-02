import axios, { AxiosRequestConfig } from 'axios';

export type ApiParams = AxiosRequestConfig;

const url = 'https://ya-praktikum.tech/api/v2/';

export const addPrefix = (prefix: string) => (endpoint:string) => `${prefix}/${endpoint}`;
debugger;
const api = axios.create({
  baseURL: url,
  timeout: 3 * 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
