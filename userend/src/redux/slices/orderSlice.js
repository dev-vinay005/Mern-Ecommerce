import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOrders = createAsyncThunk('/orders/fetchOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
        return response.data
    } catch (err) {
        return rejectWithValue(err.response?.data?.message || err.message || "Something went wrong")
    }
})

export const fetchOrderById = createAsyncThunk(
    "/orders/fetchOrderById", async (orderId, { rejectWithValue }) => {
        console.log("fetching order with ID:", orderId);
        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })

            return response.data
        } catch (err) {
            return rejectWithValue(err.response?.data?.message || err.message || "Something went wrong")
        }
    }
)

const orderSlice = createSlice({
    name: "orderSlice",
    initialState: {
        loading: false,
        data: [],
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchOrderById.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(fetchOrderById.fulfilled, (state, action) => {
            state.data = action.payload || []
            state.loading = false
            state.error = null
        }).addCase(fetchOrderById.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        }).addCase(fetchOrders.pending, (state) => {
            state.loading = true
            state.error = null
        }).addCase(fetchOrders.fulfilled, (state, action) => {
            state.data = action.payload || []
            state.loading = false
            state.error = null
        }).addCase(fetchOrders.rejected, (state, action) => {
            state.error = action.payload
            state.loading = false
        })

    }
})

export default orderSlice.reducer;