import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { ServerConfig } from "@/config/server.config";

export const sql = neon(ServerConfig.POSTGRES_URL);

export const db = drizzle({
  client: sql,
  logger: true,
});
