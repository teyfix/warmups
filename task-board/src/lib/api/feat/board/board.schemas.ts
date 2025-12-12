import { getTableColumns, isNull } from "drizzle-orm";
import { baseTable, pg, taskBoard } from "../_shared/shared.schemas";

export const boardsTable = taskBoard.table("boards", {
  ...baseTable,
  name: pg.text().notNull(),
});

export const boardsView = taskBoard.view("boards_view").as((qb) => {
  const { deleted_at: _, ...viewColumns } = getTableColumns(boardsTable);

  return qb
    .select(viewColumns)
    .from(boardsTable)
    .where(isNull(boardsTable.deleted_at));
});
