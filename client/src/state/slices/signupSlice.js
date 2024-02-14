import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axCli } from "../../lib/axiosClient";

export const signupAsync = createAsyncThunk(
  "signup/submit",
  async (userData, { rejectWithValue }) => {
    try {
      const data = {
        ...userData,
        profileImage: "https://google.com",
      };

      const response = await axCli.post("/api/register", data);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

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
      .addCase(signupAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(signupAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const signupStatusSelector = (state) => state.signup.status;

export default signupSlice.reducer;
