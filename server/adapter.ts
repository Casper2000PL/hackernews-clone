import { drizzle } from "drizzle-orm/postgres-js";

import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import postgres from "postgres";

import { sessionTable, userTable } from "./db/schemas/auth";

if (!process.env.SUPABASE_URL) {
  throw new Error("SUPABASE_URL is not set in the environment variables.");
}

const queryClient = postgres(process.env.SUPABASE_URL, { prepare: true });

export const db = drizzle(queryClient, {
  schema: {
    user: userTable,
    session: sessionTable,
  },
});

export const adapter = new DrizzlePostgreSQLAdapter(
  db,
  sessionTable,
  userTable,
);
