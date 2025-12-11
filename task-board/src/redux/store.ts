import { configureStore } from "@reduxjs/toolkit";
import { counterApi } from "./api/counterApi";
import { counterReducer } from "./slices/counterSlice";
import { noopReducer } from "./slices/noopSlice";

export const store = configureStore({
  reducer: {
    noop: noopReducer,
    counter: counterReducer,
    [counterApi.reducerPath]: counterApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(counterApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
