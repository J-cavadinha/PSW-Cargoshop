import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState =  {
    status: "not_loaded",
    products: [],
    error: null
}

function addProductReducer(state, product) {
    let id;

    try {
        id = 1 + state.products.map(p => p.id).reduce((x, y) => Math.max(x, y));
    } catch {
        id = 1;
    }

    return { ...state, products: state.products.concat({ ...product, id: id }) };
}

function updateProductReducer(state, product) {
    const products = state.products.slice();
    const index = products.map(p => p.id).indexOf(product.id);

    products.splice(index, 1, product);

    return { ...state, products: products };
}

function removeProductReducer(state, id) {
    return { ...state, products: state.products.filter((p) => p.id !== id) };
}

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
    return await (await fetch("http://localhost:3004/products")).json();
})

function fullfillProductsReducer(productsState, productsFetched) {
    productsState.status = "loaded";
    productsState.products = productsFetched;
}

export const productSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => addProductReducer(state, action.payload),
        updateProduct: (state, action) => updateProductReducer(state, action.payload),
        removeProduct: (state, action) => removeProductReducer(state, action.payload)
    },
    extraReducers: builder => {
        builder.addCase(fetchProducts.fulfilled, (state, action) => fullfillProductsReducer(state, action.payload));
        builder.addCase(fetchProducts.pending, (state, action) => {
            state.status = "loading"
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message
        })
    }
});

export const { addProduct, updateProduct, removeProduct } = productSlice.actions;

export default productSlice.reducer;