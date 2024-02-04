import express from "express";

import { SERVER_PORT } from "./config/envVar.js";

import combinedRoutes from "./routes/combinedRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", combinedRoutes());

app.listen(SERVER_PORT, () =>
  console.log(`server is running on port ${SERVER_PORT}`)
);
