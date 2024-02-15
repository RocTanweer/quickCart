import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axCli } from "../../lib/axiosClient";
import { removeUserLoginInfo } from "./loginSlice";

export const logoutAsync = createAsyncThunk(
  "logout/submit",
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await axCli.post("/api/logout");
      dispatch(removeUserLoginInfo());
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const logoutSlice = createSlice({
  name: "logout",
  initialState: {
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(logoutAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default logoutSlice.reducer;
