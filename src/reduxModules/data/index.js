import { createSlice } from '@reduxjs/toolkit';
import dataReducer from './data.reducer';

const initialState = {
  sugar: [
    {
      timestamp: '2024-12-01 09:30:00',
      temperature: 20,
      ph: 7
    },
    {
      timestamp: '2024-12-01 09:30:05',
      temperature: 21,
      ph: 7.4
    },
    {
      timestamp: '2024-12-01 09:30:10',
      temperature: 22,
      ph: 7.1
    },
    {
      timestamp: '2024-12-01 09:30:15',
      temperature: 24,
      ph: 7
    },
    {
      timestamp: '2024-12-01 09:30:20',
      temperature: 20,
      ph: 7
    },
    {
      timestamp: '2024-12-01 09:30:25',
      temperature: 21,
      ph: 7
    },
    {
      timestamp: '2024-12-01 09:30:30',
      temperature: 22,
      ph: 6.9
    },
    {
      timestamp: '2024-12-01 09:30:35',
      temperature: 23,
      ph: 7
    },
    {
      timestamp: '2024-12-01 09:30:40',
      temperature: 27,
      ph: 6
    },
    {
      timestamp: '2024-12-01 09:30:45',
      temperature: 20,
      ph: 7
    },
    
  ],
  vinegar: [],
  wine: []
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: dataReducer,
});

export const { addSugarData, resetSugarData } = dataSlice.actions;
export const sugar = (state) => state.data.sugar;
export const vinegar = (state) => state.data.vinegar;
export const wine = (state) => state.data.wine;

export default dataSlice.reducer;
