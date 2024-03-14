import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axCli } from "../../lib/axiosClient";

export const productBrandsListAsync = createAsyncThunk(
  "productBrands/list",
  async (config, { rejectWithValue }) => {
    try {
      const { offset, rowsCount } = config;
      const response = await axCli.get(
        `/api/productBrands?offset=${offset}&rowsCount=${rowsCount}`
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productBrandsCountAsync = createAsyncThunk(
  "productBrands/count",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axCli.get(`/api/productBrands/count`);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productBrandsCreateAsync = createAsyncThunk(
  "productBrands/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axCli.post(`/api/productBrands`, data);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productBrandsUpdateAsync = createAsyncThunk(
  "productBrands/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axCli.patch(`/api/productBrands/${id}`, data);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productBrandsNamesAsync = createAsyncThunk(
  "productBrands/names",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axCli.get(`/api/productBrands/names`);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productBrandsSlice = createSlice({
  name: "productBrands",
  initialState: {
    productBrandsList: [],
    productBrandsCount: null,
    productBrandsNames: [],
    actions: {
      fetchProductBrandsList: { status: "idle", error: null },
      fetchProductBrandsCount: { status: "idle", error: null },
      fetchProductBrandsNames: { status: "idle", error: null },
      createProductBrand: { status: "idle", error: null },
      updateProductBrand: { status: "idle", error: null },
    },
  },
  reducers: {
    incrementproductBrandsCount: (state) => {
      state.productBrandsCount += 1;
    },
    updateProductBrand: (state, action) => {
      const { id, data } = action.payload;
      state.productBrandsList = state.productBrandsList.map((pBrand) => {
        if (pBrand.id === id) {
          return { ...pBrand, ...data };
        }
        return pBrand;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productBrandsListAsync.pending, (state) => {
        state.actions.fetchProductBrandsList.status = "loading";
      })
      .addCase(productBrandsListAsync.fulfilled, (state, action) => {
        state.actions.fetchProductBrandsList.status = "succeeded";
        state.productBrandsList.push(...action.payload.brandList);
      })
      .addCase(productBrandsListAsync.rejected, (state, action) => {
        state.actions.fetchProductBrandsList.status = "failed";
        state.actions.fetchProductBrandsList.error = action.payload;
      })
      .addCase(productBrandsCreateAsync.pending, (state) => {
        state.actions.createProductBrand.status = "loading";
      })
      .addCase(productBrandsCreateAsync.fulfilled, (state) => {
        state.actions.createProductBrand.status = "succeeded";
      })
      .addCase(productBrandsCreateAsync.rejected, (state, action) => {
        state.actions.createProductBrand.status = "failed";
        state.actions.createProductBrand.error = action.payload;
      })
      .addCase(productBrandsCountAsync.pending, (state) => {
        state.actions.fetchProductBrandsCount.status = "loading";
      })
      .addCase(productBrandsCountAsync.fulfilled, (state, action) => {
        state.actions.fetchProductBrandsCount.status = "succeeded";
        state.productBrandsCount = action.payload.count;
      })
      .addCase(productBrandsCountAsync.rejected, (state, action) => {
        state.actions.fetchProductBrandsCount.status = "failed";
        state.actions.fetchProductBrandsCount.error = action.payload;
      })
      .addCase(productBrandsUpdateAsync.pending, (state) => {
        state.actions.updateProductBrand.status = "loading";
      })
      .addCase(productBrandsUpdateAsync.fulfilled, (state) => {
        state.actions.updateProductBrand.status = "succeeded";
      })
      .addCase(productBrandsUpdateAsync.rejected, (state, action) => {
        state.actions.updateProductBrand.status = "failed";
        state.actions.updateProductBrand.error = action.payload;
      })
      .addCase(productBrandsNamesAsync.pending, (state) => {
        state.actions.fetchProductBrandsNames.status = "loading";
      })
      .addCase(productBrandsNamesAsync.fulfilled, (state, action) => {
        state.actions.fetchProductBrandsNames.status = "succeeded";
        state.productBrandsNames = action.payload.brandsName;
      })
      .addCase(productBrandsNamesAsync.rejected, (state, action) => {
        state.actions.fetchProductBrandsNames.status = "failed";
        state.actions.fetchProductBrandsNames.error = action.payload;
      });
  },
});

export const productBrandsListSelector = (state) =>
  state.productBrands.productBrandsList;
export const productBrandsCountSelector = (state) =>
  state.productBrands.productBrandsCount;
export const productBrandsListStatusSelector = (state) =>
  state.productBrands.actions.fetchProductBrandsList.status;
export const productBrandsCountStatusSelector = (state) =>
  state.productBrands.actions.fetchProductBrandsCount.status;
export const availableProductBrandsCountSelector = (state) =>
  state.productBrands.productBrandsList.length;
export const productBrandsUpdateStatusSelector = (state) =>
  state.productBrands.actions.updateProductBrand.status;
export const productBrandsNamesSelector = (state) =>
  state.productBrands.productBrandsNames;

export const { incrementproductBrandsCount, updateProductBrand } =
  productBrandsSlice.actions;
export default productBrandsSlice.reducer;
