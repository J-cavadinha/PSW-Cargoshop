import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { httpDelete, httpGet, httpPost, httpPut } from '../utils';

const productsAdapter = createEntityAdapter();

const initialState =  productsAdapter.getInitialState({
    status: "not_loaded",
    error: null
});

const baseUrl = "http://localhost:3004";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    return await httpGet(`${baseUrl}/products`);
});

export const addProductServer = createAsyncThunk("products/addProductServer", async (product, { getState }) => {
    return await httpPost(`${baseUrl}/products`, product, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
});

export const updateProductServer = createAsyncThunk("products/updateProductServer", async (product, { getState }) => {
    return await httpPut(`${baseUrl}/products/${product.id}`, product, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
});

export const removeProductServer = createAsyncThunk("products/removeProductServer", async (productId, { getState }) => {
    await httpDelete(`${baseUrl}/products/${productId}`, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
    return productId;
});

export const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = "loaded";
            productsAdapter.setAll(state, action.payload);
        });
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
        builder.addCase(addProductServer.fulfilled, (state, action) => {
            state.status = "saved";
            productsAdapter.addOne(state, action.payload);
        });
        builder.addCase(addProductServer.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(updateProductServer.fulfilled, (state, action) => {
            state.status = "saved";
            productsAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(updateProductServer.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(removeProductServer.fulfilled, (state, action) => {
            state.status = "deleted";
            productsAdapter.removeOne(state, action.payload);
        });
        builder.addCase(removeProductServer.pending, (state, action) => {
            state.status = "loading";
        });
    }
});

export default productSlice.reducer;

export const {
    selectAll: selectAllProducts,
    selectById: selectProductsById,
    selectIds: selectProductsIds
} = productsAdapter.getSelectors(state => state.products);