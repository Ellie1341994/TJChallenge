import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../app/store";
import { beersService } from "../services/beers";
import { Beer as IBeer } from "../types/beer";

export const getBeers = createAsyncThunk("beers/get", async () => {
  return (await beersService.random()).data;
});
interface BeersState {
  data: undefined | IBeer[] | IBeer;
  status: undefined | "loading" | "success" | "failed";
  history: number[] | string[] | undefined;
  message: string;
}
const initialState: BeersState = {
  data: undefined,
  history: undefined,
  status: undefined,
  message: "",
};
export const beersSlice = createSlice({
  name: "beersStorage",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBeers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getBeers.fulfilled, (state) => {
        state.status = "success";
      })
      .addCase(getBeers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const beersReducer = beersSlice.reducer;
