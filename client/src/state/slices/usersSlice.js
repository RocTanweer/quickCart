import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { axCli } from "../../lib/axiosClient";

export const usersListAsync = createAsyncThunk(
  "users/usersList",
  async (config, { rejectWithValue }) => {
    try {
      const { page, pageSize } = config;
      const response = await axCli.get(
        `/api/admin/users?page=${page}&pageSize=${pageSize}`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const usersCountAsync = createAsyncThunk(
  "users/usersCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axCli.get("/api/admin/users/count");
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    usersList: [],
    usersCount: null,
    actions: {
      fetchUsersList: { status: "idle", error: null },
      fetchUsersCount: { status: "idle", error: null },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(usersListAsync.pending, (state) => {
        state.actions.fetchUsersList.status = "loading";
      })
      .addCase(usersListAsync.fulfilled, (state, action) => {
        state.actions.fetchUsersList.status = "succeeded";
        state.usersList.push(...action.payload.users);
      })
      .addCase(usersListAsync.rejected, (state, action) => {
        state.actions.fetchUsersList.status = "failed";
        state.actions.fetchUsersList.error = action.payload;
      })
      .addCase(usersCountAsync.pending, (state) => {
        state.actions.fetchUsersCount.status = "loading";
      })
      .addCase(usersCountAsync.fulfilled, (state, action) => {
        state.actions.fetchUsersCount.status = "succeeded";
        state.usersCount = action.payload.count;
      })
      .addCase(usersCountAsync.rejected, (state, action) => {
        state.actions.fetchUsersCount.status = "failed";
        state.actions.fetchUsersCount.error = action.payload;
      });
  },
});

export const usersListSelector = (state) => state.users?.usersList;
export const usersCountSelector = (state) => state.users?.usersCount;
export const usersListStatusSelector = (state) =>
  state.users.actions.fetchUsersList.status;
export const usersCountStatusSelector = (state) =>
  state.users.actions.fetchUsersCount.status;

export default usersSlice.reducer;
