import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

// Ensuring knex always loads .env from project root(default to where knexfile.js is), no matter where knex runs
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, "../.env") });

export const DB_HOST = process.env.DB_HOST;

export const DB_USER = process.env.DB_USER;

export const DB_PASSWORD = process.env.DB_PASSWORD;

export const DB_NAME = process.env.DB_NAME;

export const DB_SERVER_PORT = process.env.DB_SERVER_PORT;

export const SERVER_PORT = process.env.PORT || 4000;

// export const CA_CERT = process.env.CA_CERT.replace(/\\n/g, "\n");

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
