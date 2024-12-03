import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: "not_loaded",
  pechinchas: [],
  error: null,
};


function addPechinchaReducer(state, action) {
  let id;

  try {
    id = 1 + state.pechinchas.map(p => p.id).reduce((x, y) => Math.max(x, y));
  } catch {
    id = 1;
  }

  return { ...state, pechinchas: state.pechinchas.concat({ ...action.payload, id: id }) };
}

function updatePechinchaReducer(state, action) {
  const pechinchas = state.pechinchas.slice();
  const index = pechinchas.map(p => p.id).indexOf(action.payload.id);

  pechinchas.splice(index, 1, action.payload.updatedPechincha);

  return { ...state, pechinchas: pechinchas };
}

function removePechinchaReducer(state, action) {
  return { ...state, pechinchas: state.pechinchas.filter((p) => p.id !== action.payload) };
}

export const fetchPechinchas = createAsyncThunk("pechinchas/fetchPechinchas", async () => {
  return await (await fetch("http://localhost:3004/pechinchas")).json();
});

function fullfillPechinchasReducer(pechinchasState, pechinchasFetched) {
  pechinchasState.status = "loaded";
  pechinchasState.pechinchas = pechinchasFetched;
}

export const pechinchaSlice = createSlice({
  name: 'pechinchas',
  initialState,
  reducers: {
    addPechincha: (state, action) => addPechinchaReducer(state, action),
    updatePechincha: (state, action) => updatePechinchaReducer(state, action),
    removePechincha: (state, action) => removePechinchaReducer(state, action),
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPechinchas.fulfilled, (state, action) => fullfillPechinchasReducer(state, action.payload))
      .addCase(fetchPechinchas.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPechinchas.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { addPechincha, updatePechincha, removePechincha } = pechinchaSlice.actions;

export default pechinchaSlice.reducer;