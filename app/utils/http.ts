import axios from "axios";

const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_URL,
});

const appApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export { authApi, appApi };
