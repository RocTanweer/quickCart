import dotenv from "dotenv";

dotenv.config();

export const DB_HOST = process.env.DB_HOST;

export const DB_USER = process.env.DB_USER;

export const DB_PASSWORD = process.env.DB_PASSWORD;

export const DB_NAME = process.env.DB_NAME;

export const SERVER_PORT = process.env.SERVER_PORT;

export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
