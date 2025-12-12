import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BoardListModel,
  BoardModel,
  CreateBoardModel,
} from "@/lib/api/feat/board/board.domains";

export const boardsApi = createApi({
  reducerPath: "boardsApi",
  tagTypes: ["Boards"],
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v1/" }),
  endpoints: (builder) => ({
    getBoards: builder.query<BoardListModel, void>({
      query: () => `boards`,
      providesTags: ["Boards"],
    }),
    createBoard: builder.mutation<BoardModel, CreateBoardModel>({
      query: (body) => ({
        url: "boards",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Boards"],
    }),
  }),
});

export const { useGetBoardsQuery, useCreateBoardMutation } = boardsApi;
