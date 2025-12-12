import openapi from "@elysiajs/openapi";
import Elysia from "elysia";
import z from "zod";

export const v1 = new Elysia({ prefix: "/api/v1" })
  .use(
    openapi({
      mapJsonSchema: {
        zod: z.toJSONSchema,
      },
    })
  )
  .use(import("./feat/counter/counter.controller"));
