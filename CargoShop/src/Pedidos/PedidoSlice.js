import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: "not_loaded",
  pedidos: [],
  error: null,
};

function addPedidosReducer(state, action) {
  let id;

  try {
    id = 1 + state.pedidos.map(p => p.id).reduce((x, y) => Math.max(x, y));
  } catch {
    id = 1;
  }

  return {
     ...state, pedidos: state.pedidos.concat({ ...action.payload, id: id }) };
}

function updatePedidosReducer(state, action) {
  const pedidos = state.pedidos.slice();
  const index = pedidos.map(p => p.id).indexOf(action.payload.id);

  pedidos.splice(index, 1, action.payload.updatedPedido);

  return { ...state, pedidos: pedidos };
}


function removePedidosReducer(state, action) {
  return { ...state, pedidos: state.pedidos.filter((p) => p.id !== action.payload) };
}


export const fetchPedidos = createAsyncThunk("pedidos/fetchPedidos", async () => {
  return await (await fetch("http://localhost:3004/pedidos")).json();
});


function fulfillPedidosReducer(state, pedidosFetched) {
  return {
    ...state,
    status: "loaded",
    pedidos: pedidosFetched,
  };
}


export const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {
    addPedidos: (state, action) => addPedidosReducer(state, action),
    updatePedidos: (state, action) => updatePedidosReducer(state, action),
    removePedidos: (state, action) => removePedidosReducer(state, action),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPedidos.fulfilled, (state, action) => fulfillPedidosReducer(state, action.payload))
      .addCase(fetchPedidos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPedidos.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addPedidos, updatePedidos, removePedidos } = pedidosSlice.actions;

export default pedidosSlice.reducer;

