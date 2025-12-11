import { configureStore } from "@reduxjs/toolkit";
import { noopReducer } from "./slices/noopSlice";

export const store = configureStore({
  reducer: {
    noop: noopReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
