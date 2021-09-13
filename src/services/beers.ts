import axios, { AxiosInstance } from "axios";
import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";

const headers = { "Content-Type": "application/json" };
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.punkapi.com/v2",
  headers,
});

interface punkApiParams {
  url?: string;
  id?: string | number;
  filters?: string;
}
type beersATPC = AsyncThunkPayloadCreator<Array<any>, punkApiParams, {}>;

const BEERS_ENDPOINT = process.env.REACT_APP_BEERS_ENDPOINT;

const get: beersATPC = async (
  { id, url = `${BEERS_ENDPOINT}/${id}` },
  thunkAPI
) => (await axiosInstance.get(url)).data;
const random: beersATPC = async (
  { url = `${BEERS_ENDPOINT}/random` },
  thunkAPI
) => (await axiosInstance.get(url)).data;
const filter: beersATPC = async (
  { filters, url = `/beers${filters}` },
  thunkAPI
) => (await axiosInstance.get(url)).data;

export const beersService = { random, get, filter };
