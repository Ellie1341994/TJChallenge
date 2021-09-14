import axios, { AxiosInstance, AxiosResponse } from "axios";
import { AsyncThunkPayloadCreator } from "@reduxjs/toolkit";
import { Beer } from "../types/beer";
import { PunkApiParams, PunkApiErrorResponse } from "../types/PunkAPI";

const headers = { "Content-Type": "application/json" };
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.punkapi.com/v2",
  headers,
});

type beersATPC = AsyncThunkPayloadCreator<Array<any>, PunkApiParams, {}>;

const BEERS_ENDPOINT = process.env.REACT_APP_BEERS_ENDPOINT;
const request = async (url: string, rejectWithValue: any) => {
  try {
    const response: AxiosResponse<Beer[]> = await axiosInstance.get(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const response: AxiosResponse<PunkApiErrorResponse> | undefined =
        error.response;
      return rejectWithValue(response?.data);
    }
  }
};
const get: beersATPC = async (
  { id, url = `${BEERS_ENDPOINT}/${id}` },
  thunkAPI
) => request(url, thunkAPI.rejectWithValue);
const random: beersATPC = async (
  { url = `${BEERS_ENDPOINT}/random` },
  thunkAPI
) => request(url, thunkAPI.rejectWithValue);
const filter: beersATPC = async (
  { filters, url = `${BEERS_ENDPOINT}${filters}` },
  thunkAPI
) => request(url, thunkAPI.rejectWithValue);

export const beersService = { random, get, filter };
