import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axCli } from "../../lib/axiosClient";

export const addressCreateAsync = createAsyncThunk(
  "address/create",
  async (data, { rejectWithValue }) => {
    try {
      const { id } = await axCli.post("/api/address", data);
      return { address: { id, ...data } };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addressGetAsync = createAsyncThunk(
  "address/get",
  async ({ userId }, { rejectWithValue }) => {
    try {
      const response = await axCli.get(`/api/address/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addressUpdateAsync = createAsyncThunk(
  "address/update",
  async (data, { rejectWithValue }) => {
    try {
      const { addressId, updates } = data;
      await axCli.patch(`/api/address/${addressId}`, updates);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addressSlice = createSlice({
  name: "address",
  initialState: {
    addressDetails: null,
    actions: {
      createAddress: { status: "idle", error: null },
      getAddress: { status: "idle", error: null },
      updateAddress: { status: "idle", error: null },
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addressCreateAsync.pending, (state) => {
        state.actions.createAddress.status = "loading";
      })
      .addCase(addressCreateAsync.fulfilled, (state, action) => {
        state.actions.createAddress.status = "succeeded";
        state.addressDetails = action.payload.address;
      })
      .addCase(addressCreateAsync.rejected, (state, action) => {
        state.actions.createAddress.status = "failed";
        state.actions.createAddress.error = action.payload;
      })
      .addCase(addressGetAsync.pending, (state) => {
        state.actions.getAddress.status = "loading";
      })
      .addCase(addressGetAsync.fulfilled, (state, action) => {
        state.actions.getAddress.status = "succeeded";
        state.addressDetails = action.payload.address;
      })
      .addCase(addressGetAsync.rejected, (state, action) => {
        state.actions.getAddress.status = "failed";
        state.actions.getAddress.error = action.payload;
      })
      .addCase(addressUpdateAsync.pending, (state) => {
        state.actions.updateAddress.status = "loading";
      })
      .addCase(addressUpdateAsync.fulfilled, (state) => {
        state.actions.updateAddress.status = "succeeded";
      })
      .addCase(addressUpdateAsync.rejected, (state, action) => {
        state.actions.updateAddress.status = "failed";
        state.actions.updateAddress.error = action.payload;
      });
  },
});

export const addressDetailsSelector = (state) => state.address.addressDetails;

export default addressSlice.reducer;
