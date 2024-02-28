import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axCli } from "../../lib/axiosClient";

export const productCategoriesListAsync = createAsyncThunk(
  "productCategories/list",
  async (config, { rejectWithValue }) => {
    try {
      const { offset, rowsCount } = config;
      const response = await axCli.get(
        `/api/productCategories?offset=${offset}&rowsCount=${rowsCount}`
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productCategoriesCountAsync = createAsyncThunk(
  "productCategories/count",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axCli.get(`/api/productCategories/count`);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productCategoriesCreateAsync = createAsyncThunk(
  "productCategories/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axCli.post(`/api/productCategories`, data);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
export const productCategoriesUpdateAsync = createAsyncThunk(
  "productCategories/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axCli.patch(`/api/productCategories/${id}`, data);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: {
    productCategoriesList: [],
    productCategoriesCount: null,
    actions: {
      fetchProductCategoriesList: { status: "idle", error: null },
      fetchProductCategoriesCount: { status: "idle", error: null },
      createProductCategory: { status: "idle", error: null },
    },
  },
  reducers: {
    incrementProductCategoriesCount: (state) => {
      state.productCategoriesCount += 1;
    },
    updateProductCategory: (state, action) => {
      const { id, data } = action.payload;
      state.productCategoriesList = state.productCategoriesList.map(
        (proCat) => {
          if (proCat.id === id) {
            return { ...proCat, ...data };
          }
          return proCat;
        }
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productCategoriesListAsync.pending, (state) => {
        state.actions.fetchProductCategoriesList.status = "loading";
      })
      .addCase(productCategoriesListAsync.fulfilled, (state, action) => {
        state.actions.fetchProductCategoriesList.status = "succeeded";
        state.productCategoriesList.push(
          ...action.payload.productCategoriesList
        );
      })
      .addCase(productCategoriesListAsync.rejected, (state, action) => {
        state.actions.fetchProductCategoriesList.status = "failed";
        state.actions.fetchProductCategoriesList.error = action.payload;
      })
      .addCase(productCategoriesCreateAsync.pending, (state) => {
        state.actions.createProductCategory.status = "loading";
      })
      .addCase(productCategoriesCreateAsync.fulfilled, (state) => {
        state.actions.createProductCategory.status = "succeeded";
      })
      .addCase(productCategoriesCreateAsync.rejected, (state, action) => {
        state.actions.createProductCategory.status = "failed";
        state.actions.createProductCategory.error = action.payload;
      })
      .addCase(productCategoriesCountAsync.pending, (state) => {
        state.actions.fetchProductCategoriesCount.status = "loading";
      })
      .addCase(productCategoriesCountAsync.fulfilled, (state, action) => {
        state.actions.fetchProductCategoriesCount.status = "succeeded";
        state.productCategoriesCount = action.payload.count;
      })
      .addCase(productCategoriesCountAsync.rejected, (state, action) => {
        state.actions.fetchProductCategoriesCount.status = "failed";
        state.actions.fetchProductCategoriesCount.error = action.payload;
      });
  },
});

export const productCategoriesListSelector = (state) =>
  state.productCategories.productCategoriesList;
export const productCategoriesCountSelector = (state) =>
  state.productCategories.productCategoriesCount;
export const productCategoriesListStatusSelector = (state) =>
  state.productCategories.actions.fetchProductCategoriesList.status;
export const productCategoriesCountStatusSelector = (state) =>
  state.productCategories.actions.fetchProductCategoriesCount.status;
export const availableProductCategoriesCountSelector = (state) =>
  state.productCategories.productCategoriesList.length;

export const { incrementProductCategoriesCount, updateProductCategory } =
  productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
