import { configureStore } from "@reduxjs/toolkit";
import productsReducer from './slices/ProductsSlice';
import pechinchaReducer from './slices/PechinchaSlice';
import pedidosReducer from './Pedidos/PedidoSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    pechinchas: pechinchaReducer,
    pedidos: pedidosReducer,
  }
});