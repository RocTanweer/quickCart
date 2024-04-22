import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

import { axCli } from "../../lib/axiosClient";

export const loginAsync = createAsyncThunk(
  "login/submit",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axCli.post("/api/login", userData);
      localStorage.setItem("QCSCId", response.data.shoppingCartId);
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

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
    removeUserLoginInfo(state) {
      state.userLoginInfo = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const userRoleSelector = (state) => state.login.userLoginInfo?.userRole;
export const loginStatusSelector = (state) => state.login.status;
export const userIdSelector = (state) => state.login.userLoginInfo?.userId;

export const { setUserLoginInfo, removeUserLoginInfo } = loginSlice.actions;

export default loginSlice.reducer;
