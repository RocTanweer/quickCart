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

export const usersRoleUpdateAsync = createAsyncThunk(
  "users/usersRoleUpdate",
  async ({ userId, role }, { rejectWithValue }) => {
    try {
      const response = await axCli.patch(`/api/admin/users/${userId}`, {
        role,
      });
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
      changeUsersRole: { status: "idle", error: null },
    },
  },
  reducers: {
    updateUserRole: (state, action) => {
      state.usersList = state.usersList.map((user) => {
        const { userId, role } = action.payload;
        if (user.user_id === userId) {
          return { ...user, role: role };
        }
        return user;
      });
    },
  },
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
      })
      .addCase(usersRoleUpdateAsync.pending, (state) => {
        state.actions.changeUsersRole.status = "loading";
      })
      .addCase(usersRoleUpdateAsync.fulfilled, (state) => {
        state.actions.changeUsersRole.status = "succeeded";
      })
      .addCase(usersRoleUpdateAsync.rejected, (state, action) => {
        state.actions.changeUsersRole.status = "failed";
        state.actions.changeUsersRole.error = action.payload;
      });
  },
});

export const usersListSelector = (state) => state.users?.usersList;
export const usersCountSelector = (state) => state.users?.usersCount;
export const usersListStatusSelector = (state) =>
  state.users.actions.fetchUsersList.status;
export const usersCountStatusSelector = (state) =>
  state.users.actions.fetchUsersCount.status;

export const { updateUserRole } = usersSlice.actions;

export default usersSlice.reducer;
