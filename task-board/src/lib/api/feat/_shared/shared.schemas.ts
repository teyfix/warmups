import { sql } from "drizzle-orm";
import { isoTimestamp } from "@/db/custom/iso-timestamp";
import { pg } from "@/db/schema";

export const NULL = sql<null>`null`;

export const timestamp = () => isoTimestamp({ mode: "string" });

export const currentTimestamp = () => sql<Date>`CURRENT_TIMESTAMP`;

export const baseTable = {
  id: pg.uuid().notNull().defaultRandom(),
  created_at: timestamp().notNull().defaultNow(),
  updated_at: timestamp().notNull().defaultNow().$onUpdate(currentTimestamp),
  deleted_at: timestamp().default(NULL),
};
