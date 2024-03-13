import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axCli } from "../../lib/axiosClient";

export const productsListAsync = createAsyncThunk(
  "products/list",
  async (config, { rejectWithValue }) => {
    try {
      const { offset, rowsCount } = config;
      const response = await axCli.get(
        `/api/products/admin?offset=${offset}&rowsCount=${rowsCount}`
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productsCountAsync = createAsyncThunk(
  "products/count",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axCli.get(`/api/products/count`);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productsCreateAsync = createAsyncThunk(
  "products/create",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axCli.post(`/api/products`, data);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productsUpdateAsync = createAsyncThunk(
  "products/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axCli.patch(`/api/products/${id}`, data);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productsDeleteAsync = createAsyncThunk(
  "products/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axCli.delete(`/api/products/${id}`);

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState: {
    productsList: [],
    productsCount: null,
    actions: {
      fetchProductsList: { status: "idle", error: null },
      fetchProductsCount: { status: "idle", error: null },
      createProduct: { status: "idle", error: null },
      updateProduct: { status: "idle", error: null },
      deleteProduct: { status: "idle", error: null },
    },
  },
  reducers: {
    incrementProductsCount: (state) => {
      state.productsCount += 1;
    },
    updateProduct: (state, action) => {
      const { id, data } = action.payload;
      state.productsList = state.productsList.map((product) => {
        if (product.id === id) {
          return { ...product, ...data };
        }
        return product;
      });
    },
    deleteProduct: (state, action) => {
      const { id } = action;
      state.productsList = state.productsCount.filter(
        (product) => product.id !== id
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productsListAsync.pending, (state) => {
        state.actions.fetchProductsList.status = "loading";
      })
      .addCase(productsListAsync.fulfilled, (state, action) => {
        state.actions.fetchProductsList.status = "succeeded";
        state.productsList.push(...action.payload.products);
      })
      .addCase(productsListAsync.rejected, (state, action) => {
        state.actions.fetchProductsList.status = "failed";
        state.actions.fetchProductsList.error = action.payload;
      })
      .addCase(productsCountAsync.pending, (state) => {
        state.actions.fetchProductsCount.status = "loading";
      })
      .addCase(productsCountAsync.fulfilled, (state, action) => {
        state.actions.fetchProductsCount.status = "succeeded";
        state.productsCount = action.payload.count;
      })
      .addCase(productsCountAsync.rejected, (state, action) => {
        state.actions.fetchProductsCount.status = "failed";
        state.actions.fetchProductsCount.error = action.payload;
      })
      .addCase(productsCreateAsync.pending, (state) => {
        state.actions.createProduct.status = "loading";
      })
      .addCase(productsCreateAsync.fulfilled, (state) => {
        state.actions.createProduct.status = "succeeded";
      })
      .addCase(productsCreateAsync.rejected, (state, action) => {
        state.actions.createProduct.status = "failed";
        state.actions.createProduct.error = action.payload;
      })
      .addCase(productsUpdateAsync.pending, (state) => {
        state.actions.updateProduct.status = "loading";
      })
      .addCase(productsUpdateAsync.fulfilled, (state) => {
        state.actions.updateProduct.status = "succeeded";
      })
      .addCase(productsUpdateAsync.rejected, (state, action) => {
        state.actions.updateProduct.status = "failed";
        state.actions.updateProduct.error = action.payload;
      })
      .addCase(productsDeleteAsync.pending, (state) => {
        state.actions.deleteProduct.status = "loading";
      })
      .addCase(productsDeleteAsync.fulfilled, (state) => {
        state.actions.deleteProduct.status = "succeeded";
      })
      .addCase(productsDeleteAsync.rejected, (state, action) => {
        state.actions.deleteProduct.status = "failed";
        state.actions.deleteProduct.error = action.payload;
      });
  },
});

export const productsListSelector = (state) => state.products.productsList;
export const productsCountSelector = (state) => state.products.productsCount;
export const availableProductsCountSelector = (state) =>
  state.products.productsList.length;

export const productsListStatusSelector = (state) =>
  state.products.actions.fetchProductsList.status;
export const productsCountStatusSelector = (state) =>
  state.products.actions.fetchProductsCount.status;

export const { incrementProductsCount, updateProduct, deleteProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
