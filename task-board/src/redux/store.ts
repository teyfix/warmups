import { configureStore } from "@reduxjs/toolkit";
import { boardsApi } from "./api/boardListApi";
import { counterApi } from "./api/counterApi";
import { counterReducer } from "./slices/counterSlice";
import { noopReducer } from "./slices/noopSlice";

export const store = configureStore({
  reducer: {
    noop: noopReducer,
    counter: counterReducer,
    [counterApi.reducerPath]: counterApi.reducer,
    [boardsApi.reducerPath]: boardsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(counterApi.middleware, boardsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
