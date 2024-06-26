import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { SERVER_PORT, CLIENT_URL } from "./config/envVar.js";

import combinedRoutes from "./routes/combinedRoutes.js";
import { connectDB } from "./config/database.js";

const app = express();

connectDB();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
  })
);

app.use("/api", combinedRoutes());

app.listen(SERVER_PORT, () =>
  console.log(`server is running on port ${SERVER_PORT}`)
);
