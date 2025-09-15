import dotenv from "dotenv";

dotenv.config();

export const DB_HOST = process.env.DB_HOST;

export const DB_USER = process.env.DB_USER;

export const DB_PASSWORD = process.env.DB_PASSWORD;

export const DB_NAME = process.env.DB_NAME;

export const DB_SERVER_PORT = process.env.DB_SERVER_PORT;

export const SERVER_PORT = process.env.PORT || 4000;

// export const CA_CERT = process.env.CA_CERT.replace(/\\n/g, "\n");

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
