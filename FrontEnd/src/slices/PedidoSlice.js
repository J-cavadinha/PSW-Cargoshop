import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { httpDelete, httpGet, httpPost, httpPut } from '../utils';

const pedidosAdapter = createEntityAdapter();

const initialState = pedidosAdapter.getInitialState({
  status: 'not_loaded',
  error: null,
});

const baseUrl = "http://localhost:3004/pedidos"; 

export const fetchPedidos = createAsyncThunk("pedidos/fetchPedidos", async (_, { getState }) => {
  return await httpGet(`${baseUrl}`, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
});

export const addPedidoServer = createAsyncThunk("pedidos/addPedidoServer", async (pedido, { getState }) => {
  const state = getState();
  const existeID = state.pedidos.ids;
  if (existeID.includes(pedido.id)) {
    throw new Error()
  }

  return await httpPost(`${baseUrl}`, pedido, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
});

export const updatePedidoServer = createAsyncThunk("pedidos/updatePedidoServer", async (pedido, { getState }) => {
  return await httpPut(`${baseUrl}/${pedido.id}`, pedido, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
});

export const removePedidoServer = createAsyncThunk("pedidos/removePedidoServer", async (pedidoId, { getState }) => {
  await httpDelete(`${baseUrl}/${pedidoId}`, {headers: { 'Authorization': `Bearer ${getState().logins.token}`}});
  return pedidoId;
});

const pedidosSlice = createSlice({
  name: 'pedidos',
  initialState,
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

export default pedidosSlice.reducer;

export const {
  selectAll: selectAllPedidos,
  selectById: selectPedidoById,
  selectIds: selectPedidosIds,
} = pedidosAdapter.getSelectors((state) => state.pedidos);