import { defineConfig } from "drizzle-kit";
import { ServerConfig } from "@/config/server.config";

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./migrations",
  dialect: "postgresql",
  casing: "snake_case",
  dbCredentials: {
    url: ServerConfig.POSTGRES_URL,
  },
});
