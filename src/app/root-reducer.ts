import { combineReducers } from 'redux';
import tickerSelectReducer from '@src/screens/Chart/TickerSelect/ticker-select.slice';
import tickerInfoReducer from '@src/screens/Chart/TickerInfo/ticker-info.slice';
import tickerChartReducer from '@src/screens/Chart/TickerChart/ticker-chart.slice';
import detailChartReducer from '@src/screens/DetailChart/detail-chart.slice';

const rootReducer = combineReducers({
  tickerSelectReducer,
  tickerInfoReducer,
  tickerChartReducer,
  detailChartReducer,
});

export default rootReducer;
