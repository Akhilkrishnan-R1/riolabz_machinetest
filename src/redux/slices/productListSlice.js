import { createSlice } from "@reduxjs/toolkit";


const productListSlice = createSlice({
    name: 'productList',
    initialState: {
        data: [],
        loading: false,
        error: null,
    },
    reducers: {
        fetchProductList(state){
            state.loading = true;
            state.error = null;
        },
        fetchProductListSuccess(state, action) {
            const { data } = action.payload;
            state.data = data;
            state.loading = false;
        },
        fetchProductListFail(state, action) {
            state.error = action.payload;
            state.loading = false
        }
    }
})

export const { fetchProductList, fetchProductListSuccess, fetchProductListFail } = productListSlice.actions

export default productListSlice.reducer