import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axCli } from "../../lib/axiosClient";

export const login = createAsyncThunk("login/submit", async (userData) => {
  const response = await axCli.post("/api/login", userData);
  return response.data.userData;
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default loginSlice.reducer;
