import z from "zod";

export const ServerConfigSchema = z.object({
  POSTGRES_URL: z.url({ protocol: /^postgresql/ }),
});

export type ServerConfigModel = z.infer<typeof ServerConfigSchema>;
