import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialProducts = [];

function addProductReducer(produtos, produto) {
    let id;
    try {
        id = 1 + produtos.map(p => p.id).reduce((x, y) => Math.max(x, y));
    } catch {id = 1}
    return produtos.concat([{...produto, id: id}]);
}

function updateProductReducer(produtos, produto) {
    let index = produtos.map(p => p.id).indexOf(produto.id);
    produtos.splice(index, 1, produto);
    return produtos;
}

function removeProductReducer(produtos, id) {
    return produtos.filter((p) => p.id !== id);
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    return await (await fetch("http://localhost:3004/products")).json();
})

function fullfillProductsReducer(productState, productsFetched) {
    return productsFetched;
}

export const productSlice = createSlice({
    name: 'products',
    initialState: initialProducts,
    reducers: {
        addProduct: (state, action) => addProductReducer(state, action.payload),
        updateProduct: (state, action) => updateProductReducer(state, action.payload),
        removeProduct: (state, action) => removeProductReducer(state, action.payload)
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => fullfillProductsReducer(state, action.payload));
    }
});

export const { addProduct, updateProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;