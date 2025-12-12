import { and, desc, ilike, type SQL } from "drizzle-orm";
import Elysia, { InternalServerError } from "elysia";
import { db } from "@/db/drizzle";
import { CreatedResponse, paginate } from "../_shared/shared.domains";
import {
  BoardDomain,
  BoardListDomain,
  CreateBoardDomain,
  ListBoardsQuery,
} from "./board.domains";
import { boardsTable, boardsView } from "./board.schemas";

export default function BoardsController(app: Elysia) {
  return app.use(
    new Elysia({
      prefix: "/boards",
      tags: ["Boards"],
    })
      .model({
        CreateBoardDomain,
        BoardDomain,
        ListBoardsQuery,
        BoardListDomain,
        CreatedResponse,
      })
      .get(
        "/",
        async (ctx) => {
          const where: SQL[] = [];
          const page = paginate(ctx.query);

          if (ctx.query.search) {
            where.push(ilike(boardsView.name, `%${ctx.query.search}%`));
          }

          const query = db
            .select()
            .from(boardsView)
            .where(and(...where))
            .orderBy(desc(boardsView.created_at), boardsView.name)
            .offset(page.offset)
            .limit(page.limit);

          const [total, items] = await Promise.all([db.$count(query), query]);

          return {
            boards: {
              items,
              meta: {
                total,
              },
            },
          };
        },
        {
          query: ListBoardsQuery,
          response: BoardListDomain,
          detail: {
            summary: "List boards",
          },
        }
      )
      .post(
        "/",
        async (ctx) => {
          const [board] = await db
            .insert(boardsTable)
            .values([ctx.body])
            .returning();

          if (board == null) {
            throw new InternalServerError("Failed to create board");
          }

          return board;
        },
        {
          body: CreateBoardDomain,
          response: BoardDomain,
          detail: {
            summary: "Create a board",
          },
        }
      )
  );
}
