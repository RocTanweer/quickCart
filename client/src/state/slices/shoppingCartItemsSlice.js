import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { axCli } from "../../lib/axiosClient";

export const shoppingCartItemsListAsync = createAsyncThunk(
  "shoppingCartItems/list",
  async ({ shoppingCartId }, { rejectWithValue }) => {
    try {
      const response = await axCli.get(
        `/api/shoppingCarts/${shoppingCartId}/items`
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const shoppingCartItemsCreateAsync = createAsyncThunk(
  "shoppingCartItems/create",
  async ({ shoppingCartId, productId }, { rejectWithValue }) => {
    try {
      const response = await axCli.post(`/api/shoppingCartItems/`, {
        shoppingCartId,
        productId,
      });

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const shoppingCartItemsDeleteAsync = createAsyncThunk(
  "shoppingCartItems/delete",
  async ({ shoppingCartItemId }, { rejectWithValue }) => {
    try {
      const response = await axCli.delete(
        `/api/shoppingCartItems/${shoppingCartItemId}`
      );

      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);

export const shoppingCartItemsSlice = createSlice({
  name: "shoppingCartItems",
  initialState: {
    itemsList: [],
    actions: {
      fetchItemsList: { status: "idle", error: null },
      createItem: { status: "idle", error: null },
      delteItem: { status: "idle", error: null },
    },
  },
  reducers: {
    updateProductQuantity: (state, action) => {
      const { cartItemId, newQuantity } = action.payload;
      state.itemsList = state.itemsList.map((item) => {
        if (item.product_id === cartItemId) {
          return { ...item, product_quantity: newQuantity };
        }
        return item;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(shoppingCartItemsListAsync.pending, (state) => {
        state.actions.fetchItemsList.status = "loading";
      })
      .addCase(shoppingCartItemsListAsync.fulfilled, (state, action) => {
        state.actions.fetchItemsList.status = "succeeded";
        state.itemsList.push(...action.payload.shoppingCartItems);
      })
      .addCase(shoppingCartItemsListAsync.rejected, (state, action) => {
        state.actions.fetchItemsList.status = "failed";
        state.actions.fetchItemsList.error = action.payload;
      })
      .addCase(shoppingCartItemsCreateAsync.pending, (state) => {
        state.actions.createItem.status = "loading";
      })
      .addCase(shoppingCartItemsCreateAsync.fulfilled, (state) => {
        state.actions.createItem.status = "succeeded";
      })
      .addCase(shoppingCartItemsCreateAsync.rejected, (state, action) => {
        state.actions.createItem.status = "failed";
        state.actions.createItem.error = action.payload;
      })
      .addCase(shoppingCartItemsDeleteAsync.pending, (state) => {
        state.actions.delteItem.status = "loading";
      })
      .addCase(shoppingCartItemsDeleteAsync.fulfilled, (state) => {
        state.actions.delteItem.status = "succeeded";
      })
      .addCase(shoppingCartItemsDeleteAsync.rejected, (state, action) => {
        state.actions.delteItem.status = "failed";
        state.actions.delteItem.error = action.payload;
      });
  },
});

export const shoppingCartItemsListSelector = (state) =>
  state.shoppingCartItems.itemsList;

export const shoppingCartItemsListStatusSelector = (state) =>
  state.shoppingCartItems.actions.fetchItemsList.status;

export const { updateProductQuantity } = shoppingCartItemsSlice.actions;
export default shoppingCartItemsSlice.reducer;
