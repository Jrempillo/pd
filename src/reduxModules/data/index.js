import { createSlice } from '@reduxjs/toolkit';
import dataReducer from './data.reducer';

const initialState = {
  sugar: [],
  vinegar: [],
  wine: []
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: dataReducer,
});

export const { addSugarData, resetSugarData, addVinegarData, resetVinegarData, addWineData, resetWineData } = dataSlice.actions;
export const sugar = (state) => state.data.sugar;
export const vinegar = (state) => state.data.vinegar;
export const wine = (state) => state.data.wine;

export default dataSlice.reducer;
