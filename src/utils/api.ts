import axios, { AxiosRequestConfig } from 'axios';

export type ApiParams = AxiosRequestConfig;

export const DEFAULT_API_DOMAIN = 'https://ya-praktikum.tech';
export const DEFAULT_API_URL = WEBPACK_DEV_SERVER ? `${DEFAULT_API_DOMAIN}/api/v2/` : '/api/v2/';

export const addPrefix = (prefix: string) => (endpoint:string) => `${prefix}/${endpoint}`;

const api = axios.create({
  baseURL: DEFAULT_API_URL,
  timeout: 3 * 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default api;
