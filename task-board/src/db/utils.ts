import type { Table, View } from "drizzle-orm";
import { createSchemaFactory } from "drizzle-zod";
import z from "zod";
import type { baseTable } from "@/lib/api/feat/_shared/shared.schemas";

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: true,
    zodInstance: z,
  });

const omitInsertColumns: { [P in keyof typeof baseTable]: true } = {
  id: true,
  created_at: true,
  updated_at: true,
  deleted_at: true,
};

export const createInsertDomain = <TTable extends Table>(table: TTable) => {
  return createInsertSchema(table).omit(omitInsertColumns);
};

const isoDateColumns = {
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
};

export const createSelectDomain = <T extends Table>(table: T) =>
  createSelectSchema(table).extend(isoDateColumns);

export const createViewDomain = <T extends View>(table: T) =>
  createSelectSchema(table).extend(isoDateColumns);

export const createUpdateDomain = createUpdateSchema;
