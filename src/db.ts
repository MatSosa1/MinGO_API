import { Pool } from "pg";

export const db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "root",
  database: "mingo",
  port: 5432
});
