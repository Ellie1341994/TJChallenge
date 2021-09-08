import axios, { AxiosInstance } from "axios";
const headers = { "Content-Type": "application/json" };
export const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.punkapi.com/v2/",
  headers,
});
