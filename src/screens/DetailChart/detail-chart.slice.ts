import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  refreshCount: 0,
};

const detailChartSlice = createSlice({
  name: 'detailChart',
  initialState,
  reducers: {
    startRefresh: (state, action) => {
      state.refreshCount += 1;
    },
  },
});

export const detailChartActions = detailChartSlice.actions;

const detailChartReducer = detailChartSlice.reducer;
export default detailChartReducer;
