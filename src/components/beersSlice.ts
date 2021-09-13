import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { beersService } from "../services/beers";
import { Beer as IBeer } from "../types/beer";

export const getRandomBeer = createAsyncThunk(
  "beers/random",
  beersService.random
);
export const getBeer = createAsyncThunk("beers/get", beersService.get);
export const getBeersFilteredBy = createAsyncThunk(
  "beers/filter",
  beersService.filter
);
interface IBeersState {
  data: IBeer[];
  status: undefined | "loading" | "success" | "failed";
  history: string[];
  message: string;
}
const initialState: IBeersState = {
  data: [],
  history: [],
  status: undefined,
  message: "Preloaded data",
};
export const beersSlice = createSlice({
  name: "beersStorage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    for (let beerRequest of [getBeer, getRandomBeer, getBeersFilteredBy]) {
      builder
        .addCase(beerRequest.pending, (state) => {
          state.status = "loading";
          state.message = "Loading data";
        })
        .addCase(beerRequest.fulfilled, (state, action) => {
          state.status = "success";
          state.data = action.payload;
          state.message = "Data loaded";
        })
        .addCase(beerRequest.rejected, (state) => {
          state.status = "failed";
          state.message = "Loading data failed";
        });
    }
  },
});

export const beersReducer = beersSlice.reducer;
