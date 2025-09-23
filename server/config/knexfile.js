import {
  DB_HOST,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SERVER_PORT,
  // CA_CERT,
} from "./envVar.js";

/**
 * @type { import("knex").Knex.Config }
 */
const knexConfig = {
  development: {
    client: "mysql2",
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_SERVER_PORT,
    },
    pool: { min: 0, max: 10 },
    migrations: {
      directory: "../database/migrations",
    },
    seeds: {
      directory: "../database/seeds",
    },
  },

  production: {
    client: "mysql2",
    connection: {
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_SERVER_PORT,
      // ssl: { ca: CA_CERT },
    },
    pool: { min: 0, max: 10 },
    migrations: {
      directory: "../database/migrations",
    },
    seeds: {
      directory: "../database/seeds",
    },
  },
};

export default knexConfig;
