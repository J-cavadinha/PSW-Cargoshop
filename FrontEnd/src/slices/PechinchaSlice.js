import { createAsyncThunk, createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { httpDelete, httpGet, httpPost, httpPut } from '../utils';

const pechinchasAdapter = createEntityAdapter();

const initialState =  pechinchasAdapter.getInitialState({
    status: "not_loaded",
    error: null
});

const baseUrl = "http://localhost:3004";


export const fetchPechinchas = createAsyncThunk("pechinchas/fetchPechinchas", async () => {
  return await httpGet(`${baseUrl}/pechinchas`);
});

export const addPechinchaServer = createAsyncThunk("pechinchas/addPechinchaServer", async (pechincha) => {
  return await httpPost(`${baseUrl}/pechinchas`, pechincha);
});

export const updatePechinchaServer = createAsyncThunk("pechinchas/updatePechinchaServer", async (pechincha) => {
  return await httpPut(`${baseUrl}/pechinchas/${pechincha.id}`, pechincha);
});

export const removePechinchaServer = createAsyncThunk("pechinchas/removePechinchaServer", async (pechinchaId) => {
  await httpDelete(`${baseUrl}/pechinchas/${pechinchaId}`);
  return pechinchaId;
});



export const pechinchaSlice = createSlice({
  name: 'pechinchas',
    initialState: initialState,
    extraReducers: builder => {
        builder.addCase(fetchPechinchas.fulfilled, (state, action) => {
            state.status = "loaded";
            pechinchasAdapter.setAll(state, action.payload);
        });
        builder.addCase(fetchPechinchas.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(fetchPechinchas.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        });
        builder.addCase(addPechinchaServer.fulfilled, (state, action) => {
            state.status = "saved";
            pechinchasAdapter.addOne(state, action.payload);
        });
        builder.addCase(addPechinchaServer.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(updatePechinchaServer.fulfilled, (state, action) => {
            state.status = "saved";
            pechinchasAdapter.upsertOne(state, action.payload);
        });
        builder.addCase(updatePechinchaServer.pending, (state, action) => {
            state.status = "loading";
        });
        builder.addCase(removePechinchaServer.fulfilled, (state, action) => {
            state.status = "deleted";
            pechinchasAdapter.removeOne(state, action.payload);
        });
        builder.addCase(removePechinchaServer.pending, (state, action) => {
            state.status = "loading";
        });
    }
});

export default pechinchaSlice.reducer;

export const {
    selectAll: selectAllPechinchas,
    selectById: selectPechinchasById,
    selectIds: selectPechinchasIds
} = pechinchasAdapter.getSelectors(state => state.pechinchas);