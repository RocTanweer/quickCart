import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { axCli } from "../../lib/axiosClient";

export const login = createAsyncThunk("login/submit", async (userData) => {
  const response = await axCli.post("/api/login", userData);
  return response.data;
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    status: "idle",
    error: null,
    userLoginInfo: Cookies.get("qcticket")
      ? jwtDecode(JSON.parse(Cookies.get("qcticket")).token)
      : {},
  },
  reducers: {
    setUserLoginInfo(state, action) {
      state.userLoginInfo = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const userRoleSelector = (state) => state.login.userLoginInfo?.userRole;

export const { setUserLoginInfo } = loginSlice.actions;

export default loginSlice.reducer;
