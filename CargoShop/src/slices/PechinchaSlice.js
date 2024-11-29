import { createSlice } from '@reduxjs/toolkit';

const initialPechinchas = [
  { id: 19, name: 'Batom', price: 29, discount: 15, image: 'image_url' },
  { id: 20, name: 'Rímel', price: 27, discount: 10, image: 'image_url' },
  { id: 1, name: 'Mountain Bike Aro 29', price: 26, discount: 3, image: 'image_url' },
];

const pechinchaSlice = createSlice({
  name: 'pechinchas',
  initialState: initialPechinchas,
  reducers: {
    addPechincha(state, action) {
      const id = state.map((p) => p.id).reduce((x, y) => Math.max(x, y), 0) + 1; 
      action.payload.id = id;
      state.push(action.payload);
    },
    updatePechincha(state, action) {
      const { id, updatedPechincha } = action.payload;
      const index = state.findIndex((pechincha) => pechincha.id === id);
      state[index] = updatedPechincha;
    },
    removePechincha(state, action) {
      return state.filter((pechincha) => pechincha.id !== action.payload);  
    },
  },
});

export const { addPechincha, updatePechincha, removePechincha } = pechinchaSlice.actions;

export default pechinchaSlice.reducer;