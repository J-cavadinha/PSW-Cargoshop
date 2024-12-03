import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { httpDelete, httpGet, httpPost, httpPut } from '../utils';

const pedidosAdapter = createEntityAdapter();

const initialState = pedidosAdapter.getInitialState({
  status: 'not_loaded',
  error: null,
});


const baseUrl = "http://localhost:3004/pedidos"; 


export const fetchPedidos = createAsyncThunk("pedidos/fetchPedidos", async () => {
  return await httpGet(`${baseUrl}`);
});

export const addPedidoServer = createAsyncThunk("pedidos/addPedidoServer", async (pedido) => {
  return await httpPost(`${baseUrl}`, pedido);
});

export const updatePedidoServer = createAsyncThunk("pedidos/updatePedidoServer", async (pedido) => {
  return await httpPut(`${baseUrl}/${pedido.id}`, pedido);
});

export const removePedidoServer = createAsyncThunk("pedidos/removePedidoServer", async (pedidoId) => {
  await httpDelete(`${baseUrl}/${pedidoId}`);
  return pedidoId;
});

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
  reducers: {
    addPedido: pedidosAdapter.addOne,
    removePedido: pedidosAdapter.removeOne,
    updatePedido: pedidosAdapter.updateOne,
    setPedidos: pedidosAdapter.setAll,
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPedidos.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchPedidos.fulfilled, (state, action) => {
      state.status = 'succeeded';
      pedidosAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchPedidos.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
    builder.addCase(addPedidoServer.fulfilled, (state, action) => {
      state.status = 'saved';
      pedidosAdapter.addOne(state, action.payload);
    });
    builder.addCase(addPedidoServer.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(updatePedidoServer.fulfilled, (state, action) => {
      state.status = 'saved';
      pedidosAdapter.upsertOne(state, action.payload);
    });
    builder.addCase(updatePedidoServer.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(removePedidoServer.fulfilled, (state, action) => {
      state.status = 'deleted';
      pedidosAdapter.removeOne(state, action.payload);
    });
    builder.addCase(removePedidoServer.pending, (state) => {
      state.status = 'loading';
    });
  },
});

export const { addPedido, removePedido, updatePedido, setPedidos, setStatus, setError } = pedidosSlice.actions;

export default pedidosSlice.reducer;

export const {
  selectAll: selectAllPedidos,
  selectById: selectPedidoById,
  selectIds: selectPedidosIds,
} = pedidosAdapter.getSelectors((state) => state.pedidos);
