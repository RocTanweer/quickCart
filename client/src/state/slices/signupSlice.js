import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axCli } from "../../lib/axiosClient";

export const signup = createAsyncThunk("signup/submit", async (userData) => {
  const data = {
    ...userData,
    profileImage: "https://google.com",
  };

  const response = await axCli.post("/api/register", data);

  return response.data;
});

export const signupSlice = createSlice({
  name: "signup",
  initialState: {
    data: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default signupSlice.reducer;
