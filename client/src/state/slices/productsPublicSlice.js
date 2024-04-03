import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axCli } from "../../lib/axiosClient";

export const PRODUCT_ITEMS_PER_PAGE = 9;

export const productsPublicAsync = createAsyncThunk(
  "productsPublic/list",
  async (config, { rejectWithValue }) => {
    try {
      const { offset, rowsCount, filters } = config;
      const response = await axCli.get(
        `/api/products/?offset=${offset}&rowsCount=${rowsCount}${filters}`
      );
      return response.data;
    } catch (error) {
      console.log(error);
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
const initialState = {
  products: [],
  productDetails: {},
  productsCount: null,
  actions: {
    fetchProductsList: { status: "idle", error: null },
  },
  filters: {
    productCategories: [],
    productBrands: [],
    minPrice: 0,
    maxPrice: 500000,
    availability: null,
  },
  sortType: "mr",
};
export const productsPublicSlice = createSlice({
  name: "productsPublic",
  initialState,
  reducers: {
    addFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (Array.isArray(state.filters[filterType])) {
        state.filters[filterType].push(value);
      } else {
        state.filters[filterType] = value;
      }
    },
    removeFilter: (state, action) => {
      const { filterType, value } = action.payload;
      if (Array.isArray(state.filters[filterType])) {
        state.filters[filterType] = state.filters[filterType].filter(
          (val) => val !== value
        );
      } else {
        state.filters[filterType] = null;
      }
    },
    resetState: (state) => {
      state.products = initialState.products;
      state.productDetails = initialState.productDetails;
      state.productsCount = initialState.productsCount;
      state.actions = initialState.actions;
    },
    sortProducts: (state, action) => {
      const { sortType } = action.payload;

      if (sortType === "plh") {
        state.products = state.products.sort(
          (a, b) => a.unit_price - b.unit_price
        );
      } else if (sortType === "phl") {
        state.products = state.products.sort(
          (a, b) => b.unit_price - a.unit_price
        );
      } else if (sortType === "mr") {
        state.products = state.products.sort((a, b) => a.id - b.id);
      }
    },
    updateSortType: (state, action) => {
      state.sortType = action.payload.sortType;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsPublicAsync.pending, (state) => {
        state.actions.fetchProductsList.status = "loading";
      })
      .addCase(productsPublicAsync.fulfilled, (state, action) => {
        state.actions.fetchProductsList.status = "succeeded";
        state.products.push(...action.payload.products);
        state.productsCount = action.payload.count;
      })
      .addCase(productsPublicAsync.rejected, (state, action) => {
        state.actions.fetchProductsList.status = "failed";
        state.actions.fetchProductsList.error = action.payload;
      });
  },
});

export const productsPublicSelector = (state) => state.productsPublic.products;
export const productsCountSelector = (state) =>
  state.productsPublic.productsCount;
export const productsFilter = (state) => state.productsPublic.filters;
export const sortTypeSelector = (state) => state.productsPublic.sortType;

export const productsPublicStatusSelector = (state) =>
  state.productsPublic.actions.fetchProductsList.status;

export const {
  addFilter,
  removeFilter,
  resetState,
  sortProducts,
  updateSortType,
} = productsPublicSlice.actions;
export default productsPublicSlice.reducer;
