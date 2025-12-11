import { createSlice } from "@reduxjs/toolkit";

const noopSlice = createSlice({
  name: "noop",
  initialState: {},
  reducers: {},
});

// export const {} = noopSlice.actions;
export const noopReducer = noopSlice.reducer;
