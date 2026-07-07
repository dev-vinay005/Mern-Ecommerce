import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProduct = createAsyncThunk(
  "products/getProducts",
  async ({ category, limit, page }, { rejectWithValue }) => {
    console.log(category, limit, page);

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getAllProducts?category=${category}&limit=${limit}&page=${page}`,
      );

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

export const fetchSingleProduct = createAsyncThunk(
  "product/singleProduct",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/getSingleProduct/${productId}`,
      );
      return response.data.product;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

const initialState = {
  products: [],
  totalPages: 0,
  singleProduct: null,
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: "productSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //these are for getting all products
    builder.addCase(fetchAllProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchAllProduct.fulfilled, (state, action) => {
      state.products = Array.isArray(action.payload.products) ? action.payload.products : [];
      state.totalPages = action.payload.totalPages || 0;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //these are for getting single product
    builder.addCase(fetchSingleProduct.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchSingleProduct.fulfilled, (state, action) => {
      state.singleProduct = action.payload;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(fetchSingleProduct.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

export default productSlice.reducer;
