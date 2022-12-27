import { createSlice } from "@reduxjs/toolkit";


const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState: {
        data: [],
        error: null,
        loading: false,
    },
    reducers: {
        fetchProductDetails(state) {
            state.loading = true;
            state.error = false;
        },
        fetchProductDetailsSuccess(state, action) {
            const { data } = action.payload;
            state.data = data;
            state.loading = false;
        },
        fetchProductDetailsFail(state, action) {
            state.loading = false;
            state.error = action.payload;
        }
    }
})

export const { fetchProductDetails, fetchProductDetailsSuccess, fetchProductDetailsFail } = productDetailsSlice.actions;

export default productDetailsSlice.reducer