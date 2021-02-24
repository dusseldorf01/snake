import axios from 'axios';

export const INTERNAL_API_URL = '/api/';

const apiInternal = axios.create({
  baseURL: INTERNAL_API_URL,
  timeout: 3 * 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default apiInternal;
