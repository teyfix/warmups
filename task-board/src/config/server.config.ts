import { processConfig } from "./helpers/processConfig";
import { ServerConfigSchema } from "./server/server-config.schema";

export const ServerConfig = processConfig(ServerConfigSchema, {
  POSTGRES_URL: process.env.POSTGRES_URL,
});
