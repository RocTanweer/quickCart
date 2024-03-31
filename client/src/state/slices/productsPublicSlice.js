import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axCli } from "../../lib/axiosClient";

export const PRODUCT_ITEMS_PER_PAGE = 9;

export const productsPublicAsync = createAsyncThunk(
  "productsPublic/list",
  async (config, { rejectWithValue }) => {
    try {
      const { offset, rowsCount, filters } = config;
      const response = await axCli.get(
        `/api/products/?offset=${offset}&rowsCount=${rowsCount}`
      );
      console.log(response.data);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productsPublicSlice = createSlice({
  name: "productsPublic",
  initialState: {
    products: [],
    productDetails: {},
    productsCount: null,
    actions: {
      fetchProductsList: { status: "idle", error: null },
    },
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(productsPublicAsync.pending, (state) => {
        state.actions.fetchProductsList.status = "loading";
      })
      .addCase(productsPublicAsync.fulfilled, (state, action) => {
        state.actions.fetchProductsList.status = "succeeded";
        state.products.push(...action.payload.products);
      })
      .addCase(productsPublicAsync.rejected, (state, action) => {
        state.actions.fetchProductsList.status = "failed";
        state.actions.fetchProductsList.error = action.payload;
      });
  },
});

export const productsPublicSelector = (state) => state.productsPublic.products;

export const productsPublicStatusSelector = (state) =>
  state.productsPublic.actions.fetchProductsList.status;

export default productsPublicSlice.reducer;
