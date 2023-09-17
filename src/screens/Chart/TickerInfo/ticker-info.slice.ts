import { createSlice } from '@reduxjs/toolkit';
import { type StockInfoResponse } from '@src/api/stock-api';

const initialState: {
  ticker: string;
  market?: string;
  tickerInfo?: StockInfoResponse;
  loading: boolean;
  error: boolean;
} = {
  ticker: '',
  tickerInfo: undefined,
  loading: false,
  error: false,
};

const tickerInfoSlice = createSlice({
  name: 'tickerInfo',
  initialState,
  reducers: {
    getInfo: (state, action) => {
      state.loading = true;
      state.error = false;
      state.ticker = action.payload.ticker;
      state.market = action.payload.market;
    },

    getInfoSuccess: (state, action) => {
      state.loading = false;
      state.error = false;
    },

    getInfoFailed: (state, action) => {
      state.loading = false;
      state.error = true;
    },

    setTickerInfo: (state, action) => {
      state.tickerInfo = action.payload;
    },
  },
});

export const tickerInfoActions = tickerInfoSlice.actions;

const tickerInfoReducer = tickerInfoSlice.reducer;
export default tickerInfoReducer;
