import type { ZodObject, default as z } from "zod";
import { fromZodError } from "zod-validation-error";

export type ConfigPayload<T> = T extends Array<infer R>
  ? ConfigPayload<R>[]
  : T extends object
  ? { [P in keyof T]: ConfigPayload<T[P]> }
  : string | undefined;

export const processConfig = <S extends ZodObject>(
  schema: S,
  payload: ConfigPayload<z.infer<S>>
): z.infer<S> => {
  const { data, error } = schema.safeParse(payload);

  if (error) {
    console.info(fromZodError(error).toString());
    throw error;
  }

  return data;
};
