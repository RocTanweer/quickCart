import knex from "knex";
import knexConfig from "../config/knexfile.js";

const env = process.env.NODE_ENV || "development";

export const db = knex(knexConfig[env]);

export const testDBConnection = async () => {
  try {
    await db.raw("SELECT 1");
    console.log(`Connected to ${env} database successfully!`);
  } catch (error) {
    console.error(`Error connecting to ${env} database:`, error);
  }
};
