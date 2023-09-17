import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ticker: '',
  prices: [],
  predictionOffset: 0,
  loading: false,
  error: false,
};

const tickerChartSlice = createSlice({
  name: 'tickerChart',
  initialState,
  reducers: {
    getPrices: (state, action) => {
      state.loading = true;
      state.error = false;
      state.ticker = action.payload.ticker;
    },

    getPricesSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
    },

    getPricesFailed: (state, action) => {
      state.loading = false;
      state.error = true;
    },

    setPricesData: (state, action) => {
      state.prices = action.payload.prices;
      state.predictionOffset = action.payload.predictionOffset;
    },
  },
});

export const tickerChartActions = tickerChartSlice.actions;

const tickerChartReducer = tickerChartSlice.reducer;
export default tickerChartReducer;
