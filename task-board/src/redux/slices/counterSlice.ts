import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../store";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export const {
  increment,
  decrement,
  reset: resetCounter,
} = counterSlice.actions;
export const counterReducer = counterSlice.reducer;

export const selectCount = (state: RootState) => state.counter.value;
