import { createSlice } from '@reduxjs/toolkit';
import { DEFAULT_SELECTED_OPTION } from '@src/constant/common';

const initialState = {
  options: [],
  selectedOption: DEFAULT_SELECTED_OPTION,
  loading: false,
  error: false,
};

const tickerSelectSlice = createSlice({
  name: 'tickerSelect',
  initialState,
  reducers: {
    getTickers: (state, action) => {
      state.loading = true;
      state.error = false;
    },

    getTickersSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
    },

    getTickersFailed: (state, action) => {
      state.loading = false;
      state.error = true;
    },

    setOptions: (state, action) => {
      state.options = action.payload;
    },

    setSelectedOption: (state, action) => {
      state.selectedOption = action.payload;
    },
  },
});

export const tickerSelectActions = tickerSelectSlice.actions;

const tickerSelectReducer = tickerSelectSlice.reducer;
export default tickerSelectReducer;
