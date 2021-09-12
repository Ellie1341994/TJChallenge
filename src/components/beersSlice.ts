import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { beersService } from "../services/beers";
import { Beer as IBeer } from "../types/beer";

export const getRandomBeer = createAsyncThunk("beers/get", beersService.random);
export const getBeer = createAsyncThunk("beers/get", beersService.get);
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
    builder
      .addCase(getRandomBeer.pending, (state) => {
        state.status = "loading";
        state.message = "Loading data";
      })
      .addCase(getRandomBeer.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        state.message = "Data loaded";
      })
      .addCase(getRandomBeer.rejected, (state) => {
        state.status = "failed";
        state.message = "Loading data failed";
      });
  },
});

export const beersReducer = beersSlice.reducer;
