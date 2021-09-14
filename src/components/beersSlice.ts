import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { beersService } from "../services/beers";
import { Beer as IBeer } from "../types/beer";
import { PunkApiErrorResponse } from "../types/PunkAPI";

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
  cart: string[];
  message: string;
}
const initialState: IBeersState = {
  data: [],
  history: [],
  cart: [],
  status: undefined,
  message: "Preloaded data",
};
export const beersSlice = createSlice({
  name: "beersStorage",
  initialState,
  reducers: {
    seeBeer: (state, action: PayloadAction<string>) => {
      state.history = [...state.history, action.payload];
    },
    buyBeer: (state, action: PayloadAction<string>) => {
      if (!state.cart.includes(action.payload)) {
        state.cart = [...state.cart, action.payload];
      }
    },
  },
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
        .addCase(beerRequest.rejected, (state, action) => {
          state.status = "failed";
          state.message =
            (action.payload as PunkApiErrorResponse).message ??
            "Loading data failed";
        });
    }
  },
});
export const { seeBeer, buyBeer } = beersSlice.actions;
export const beersReducer = beersSlice.reducer;
