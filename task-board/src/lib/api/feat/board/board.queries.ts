import { desc, ilike, sql } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { boardsView } from "./board.schemas";

const selectBoards = db
  .select()
  .from(boardsView)
  .orderBy(desc(boardsView.created_at), boardsView.name)
  .offset(sql.placeholder("offset"))
  .limit(sql.placeholder("limit"));

export const listBoards = selectBoards.prepare("list_boards");

export const searchBoards = selectBoards
  .where(ilike(boardsView.name, sql.placeholder("query")))
  .prepare("search_boards");
