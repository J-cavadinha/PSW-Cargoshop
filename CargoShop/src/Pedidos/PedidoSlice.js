import { createSlice } from '@reduxjs/toolkit';

const initialPedidos = [
  {
    id: 1,
    name: 'Camiseta Estilosa',
    NomeVendedor: 'Vendedor A',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
    status: 'Em andamento',
  },
  {
    id: 2,
    name: 'Camiseta Estilosa',
    NomeVendedor: 'Vendedor A',
    price: 49.99,
    image: 'https://via.placeholder.com/150',
    status: 'Em andamento',
  },
];

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState: initialPedidos,
  reducers: {
    addPedidos(state, action) {
      const id = state.map((p) => p.id).reduce((x, y) => Math.max(x, y), 0) + 1; 
      action.payload.id = id;
      state.push(action.payload);
    },
    updatePedidos(state, action) {
      const { id, updatedPedidos } = action.payload;
      const index = state.findIndex((pedido) => pedido.id === id);
      state[index] = updatedPedidos;
    },
    removePedidos(state, action) {
      return state.filter((pedido) => pedido.id !== action.payload);  
    },
  },
});

export const { addPedidos, updatePedidos, removePedidos } = pedidosSlice.actions;

export default pedidosSlice.reducer;
