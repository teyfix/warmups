import * as pg from "drizzle-orm/pg-core";

export { pg };

export const taskBoard = pg.pgSchema("task_board");
