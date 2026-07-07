import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchCart } from "./cartSlice";

// Retrive the user information and token from the local storage
const userFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// check for an existing guest ID in the localstorage or generate a new one
const initialGuestId =
  localStorage.getItem("guestId") || `guest_${new Date().getTime()}`;
localStorage.setItem("guestId", initialGuestId);

// Asych thunk for  user login
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/loginuser`,
        userData,
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.accessToken);
      dispatch(fetchCart({ userId: response.data.user._id }));
      return response.data.user; // return the user object from the response
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// Asych thunk for  user Registeration
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/createuser`,
        userData,
      );
      localStorage.setItem("userInfo", JSON.stringify(response.data.user));
      localStorage.setItem("accessToken", response.data.accessToken);

      return response.data.user; // return the user object from the response
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  },
);

// Initial state for the auth slice
const initialState = {
  user: userFromStorage,
  guestId: initialGuestId,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "authSlice",
  initialState: initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
    },
    logout: (state) => {
      state.user = null;
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.removeItem("userInfo");
      localStorage.removeItem("accessToken");
      localStorage.setItem("guestId", state.guestId);
    },
    generateNewGuestId: (state) => {
      state.guestId = `guest_${new Date().getTime()}`;
      localStorage.setItem("guestId", state.guestId);
    },
  },
  extraReducers: (builder) => {
    // these are for login user
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, actions) => {
      state.user = actions.payload;
      // state.guestId = null;
      // localStorage.removeItem("guestId");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(loginUser.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });

    // these are for register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, actions) => {
      state.user = actions.payload.user;
      // state.guestId = null;
      // localStorage.removeItem("guestId");
      state.loading = false;
      state.error = null;
    });
    builder.addCase(registerUser.rejected, (state, actions) => {
      state.error = actions.payload;
      state.loading = false;
    });
  },
});

export default authSlice.reducer;
export const { logout, resetAuthState, generateNewGuestId } = authSlice.actions;
