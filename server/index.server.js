import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { SERVER_PORT } from "./config/envVar.js";

import combinedRoutes from "./routes/combinedRoutes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", combinedRoutes());

app.listen(SERVER_PORT, () =>
  console.log(`server is running on port ${SERVER_PORT}`)
);
