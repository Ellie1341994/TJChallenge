import axios, { AxiosInstance, AxiosResponse } from "axios";

type BeerRequestOne = (id: string | number) => Promise<AxiosResponse>;
type BeerRequestAny = () => Promise<AxiosResponse>;
type BeerRequestFiltered = (filters: string) => Promise<AxiosResponse>;

const headers = { "Content-Type": "application/json" };
const axiosInstance: AxiosInstance = axios.create({
  baseURL: "https://api.punkapi.com/v2",
  headers,
});

const BEERS_ENDPOINT = process.env.REACT_APP_BEERS_ENDPOINT;
const get: BeerRequestOne = (id) =>
  axiosInstance.get(`${BEERS_ENDPOINT}/${id}`);
const random: BeerRequestAny = () =>
  axiosInstance.get(`${BEERS_ENDPOINT}/random`);
const filter: BeerRequestFiltered = (filters) =>
  axiosInstance.get(`/beers/${filters}`);

export const beersService = { random, get, filter };
