import axios from "axios";

const REQUEST_TIMEOUT_MS = 10_000;

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
});

const appApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
  timeout: REQUEST_TIMEOUT_MS,
});

export { authApi, appApi };
