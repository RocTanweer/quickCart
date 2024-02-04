import express from "express";

import { SERVER_PORT } from "./config/envVar.js";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "./database/userQueries.js";

const app = express();

app.use(express.json());

app.post("/api/users", async (req, res) => {
  const userData = req.body;
  console.log(userData);
  const result = await createUser(userData);
  res.status(201).json(result);
});

app.get("/api/users", async (req, res) => {
  const result = await getUsers();
  res.status(200).json(result);
});

app.get("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const result = await getUserById(+userId);
  res.status(200).json(result);
});

app.patch("/api/users/:userId", async (req, res) => {
  const userUpdates = {
    userId: +req.params.userId,
    name: null,
    email: null,
    password: null,
    ...req.body,
  };

  const result = await updateUser(userUpdates);

  res.status(200).json(result);
});

app.delete("/api/users/:userId", async (req, res) => {
  const { userId } = req.params;
  const result = await deleteUser(+userId);
  res.status(200).json(result);
});

app.listen(SERVER_PORT, () =>
  console.log(`server is running on port ${SERVER_PORT}`)
);
