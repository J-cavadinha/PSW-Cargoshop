import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/ProductsSlice';
import pechinchaReducer from './slices/PechinchaSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,  // Reducer para gerenciar o estado de produtos
    pechinchas: pechinchaReducer,  // Reducer para gerenciar o estado de pechinchas
  },
});
