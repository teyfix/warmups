import z from "zod";

export const PaginateQuery = z.object({
  page: z.coerce.number().int().min(1).max(100).default(1),
  pageSize: z.coerce.number().int().min(5).max(100).multipleOf(5).default(25),
});

export const pageOptions = PaginateQuery.parse({});

export type PaginateModel = z.infer<typeof PaginateQuery>;

export const paginate = <T extends PaginateModel>(
  query: Partial<T> | undefined
): {
  offset: number;
  limit: number;
} => {
  const { page, pageSize } = { ...pageOptions, ...query };

  return {
    offset: (page - 1) * pageSize,
    limit: pageSize,
  };
};

export const SearchQuery = z.object({
  search: z.string().trim().nonempty(),
});

export const ListQuery = z
  .object({
    ...PaginateQuery.shape,
    ...SearchQuery.shape,
  })
  .partial();

export const ListMetaDomain = z.object({
  total: z.int().min(0),
});

export const CreatedResponse = z.object({
  id: z.string(),
});
