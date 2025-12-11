import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type Counter = {
  value: number;
};

export const counterApi = createApi({
  reducerPath: "counterApi",
  tagTypes: ["Counter"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  endpoints: (builder) => ({
    getCounter: builder.query<Counter, void>({
      query: () => `counter`,
      providesTags: ["Counter"],
    }),
    setCounter: builder.mutation<Counter, number>({
      query: (value: number) => ({
        url: "counter",
        method: "PUT",
        body: {
          value,
        },
      }),
      invalidatesTags: ["Counter"],
    }),
    incrementCounter: builder.mutation<Counter, void>({
      query: () => ({
        url: "counter",
        method: "POST",
      }),
      invalidatesTags: ["Counter"],
    }),
    decrementCounter: builder.mutation<Counter, void>({
      query: () => ({
        url: "counter",
        method: "DELETE",
      }),
      invalidatesTags: ["Counter"],
    }),
  }),
});

export const {
  useGetCounterQuery,
  useSetCounterMutation,
  useIncrementCounterMutation,
  useDecrementCounterMutation,
} = counterApi;
