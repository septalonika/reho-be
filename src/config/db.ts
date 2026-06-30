import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { env } from "./env";
import * as schema from "../db/schema";

// Transaction pooler (port 6543) requires prepare: false
const client = postgres(env.DATABASE_URL, { prepare: false });

export const db = drizzle(client, { schema });
