import z from "zod";
import { createInsertDomain, createViewDomain } from "@/db/utils";
import { ListMetaDomain, ListQuery } from "../_shared/shared.domains";
import { boardsTable, boardsView } from "./board.schemas";

export const CreateBoardDomain = createInsertDomain(boardsTable).extend({
  name: z.string().trim().nonempty(),
});

export type CreateBoardModel = z.infer<typeof CreateBoardDomain>;

export const BoardDomain = createViewDomain(boardsView);

export type BoardModel = z.infer<typeof BoardDomain>;

export const ListBoardsQuery = z
  .object({
    ...ListQuery.shape,
  })
  .optional();

export type ListBoardsModel = z.infer<typeof ListBoardsQuery>;

export const BoardListDomain = z.object({
  boards: z.object({
    items: z.array(BoardDomain),
    meta: ListMetaDomain,
  }),
});

export type BoardListModel = z.infer<typeof BoardListDomain>;
