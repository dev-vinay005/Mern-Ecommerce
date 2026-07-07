import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// helper function to get cart items from the local starage
const getCartItemsFromLocalStorage = () => {
  const cartItems = localStorage.getItem("cartItems");
  return cartItems ? JSON.parse(cartItems) : { products: [], totalPrice: 0 };
};

// Helper function to save cart to localStorage
const setCartItemsToLocalStorage = (cartItems) => {
  localStorage.setItem(
    "cartItems", JSON.stringify(cartItems),
  );
};

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    const Id = userId ? userId : guestId;
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          params: { userId: Id },
        },
      );
      return {
        products: response.data.cart.products,
        totalPrice: response.data.cart.totalPrice,
      };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// Add an item to the cart

export const addtoCart = createAsyncThunk(
  "cart/addToCart",
  async (
    { productId, quantity, sizes, color, guestId, userId },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          sizes,
          color,
          guestId,
          userId,
        },
      );
      return {
        products: response.data.cart.products,
        totalPrice: response.data.cart.totalPrice,
      };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

//update the quantity of an item in the cart

export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async (
    { productId, quantity, sizes, color, guestId, userId },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        {
          productId,
          quantity,
          sizes,
          color,
          guestId,
          userId,
        },
      );
      return {
        products: response.data.cart.products,
        totalPrice: response.data.cart.totalPrice,
      };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// remove item from the cart

export const removeItemFromCart = createAsyncThunk(
  "cart/RemoveItemFromCart",
  async ({ productId, sizes, userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
        data: {
          productId,
          sizes,
          guestId,
          userId,
        },
      });
      return {
        products: response.data.cart.products,
        totalPrice: response.data.cart.totalPrice,
      };
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// Merge guest cart into user cart

export const mergeCart = createAsyncThunk(
  "cart/mergCart",
  async ({ userId, guestId }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`,
        {
          guestId,
          userId,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        },
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: {
    cart: getCartItemsFromLocalStorage(),
    loading: false,
    error: null,
    loadingProductId: null,
  },
  reducers: {
    clearCart: (state) => {
      state.cart = { products: [], totalPrice: 0 };
      localStorage.removeItem("cartItems");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, actions) => {
        state.cart = actions.payload;
        setCartItemsToLocalStorage(actions.payload);
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to fetch cart";
        state.loading = false;
      });

    // this is for add to cart
    builder
      .addCase(addtoCart.pending, (state, actions) => {
        state.loading = true;
        state.error = null;
        state.loadingProductId = actions.meta.arg.productId
      })
      .addCase(addtoCart.fulfilled, (state, actions) => {
        state.cart = actions.payload;
        setCartItemsToLocalStorage(actions.payload);
        state.loading = false;
        state.loadingProductId = null
      })
      .addCase(addtoCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to add item to cart";
        state.loading = false;
        state.loadingProductId = null
      });

    // this is for update cart item quantity
    builder
      .addCase(updateCartItemQuantity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCartItemQuantity.fulfilled, (state, actions) => {
        state.cart.products = actions.payload.products;
        state.cart.totalPrice = actions.payload.totalPrice;
        setCartItemsToLocalStorage(actions.payload);
        state.loading = false;
      })
      .addCase(updateCartItemQuantity.rejected, (state, action) => {
        state.error = action.payload || "Failed to update cart";
        state.loading = false;
      });

    // this is for remove item from cart
    builder
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, actions) => {
        state.cart = actions.payload;
        setCartItemsToLocalStorage(actions.payload);
        state.loading = false;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.error = action.payload || "Failed to remove item from cart";
        state.loading = false;
      });

    // // this is for merge cart
    // builder
    //   .addCase(mergeCart.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(mergeCart.fulfilled, (state, actions) => {
    //     state.cart = actions.payload;
    //     setCartItemsToLocalStorage(actions.payload);
    //     state.loading = false;
    //   })
    //   .addCase(mergeCart.rejected, (state, action) => {
    //     state.error = action.payload || "Failed to merge cart";
    //     state.loading = false;
    //   });
  },
});

export const { clearCart } = cartSlice.actions;

export default cartSlice.reducer;
