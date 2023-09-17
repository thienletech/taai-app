import tickerChartSaga from '@src/screens/Chart/TickerChart/ticker-chart.saga';
import tickerInfoSaga from '@src/screens/Chart/TickerInfo/ticker-info.saga';
import tickerSelectSaga from '@src/screens/Chart/TickerSelect/ticker-select.saga';
import { all } from 'redux-saga/effects';

export default function* rootSaga() {
  yield all([tickerSelectSaga(), tickerInfoSaga(), tickerChartSaga()]);
}
