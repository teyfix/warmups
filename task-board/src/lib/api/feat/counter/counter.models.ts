import z from "zod";

export const CounterDomain = z.object({
  value: z.int(),
});

export type CounterModel = z.infer<typeof CounterDomain>;

export const UpdateCounterDomain = z.object({
  ...CounterDomain.shape,
});

export type UpdateCounterModel = z.infer<typeof UpdateCounterDomain>;
