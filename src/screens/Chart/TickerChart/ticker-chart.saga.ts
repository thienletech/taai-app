import { call, put, takeLatest } from 'redux-saga/effects';
import { tickerChartActions } from './ticker-chart.slice';
import stockApi from '@src/api/stock-api';
import { showApiError } from '@src/utils.ts/common';
import { ResponseData } from '@src/api/client';

function* handleGetPrices({ payload }: any) {
  try {
    const res: ResponseData = yield call(stockApi.getStockPrices, payload.ticker);
    yield put(tickerChartActions.getPricesSuccess(res.data));
  } catch (error) {
    showApiError();
    yield put(tickerChartActions.getPricesFailed(error));
  }
}

function* handleGetPricesSuccess({ payload }: any) {
  yield put(tickerChartActions.setPricesData(payload));
}

function* handleGetPricesFailed(action: {}) {}

export default function* tickerChartSaga() {
  yield takeLatest(tickerChartActions.getPrices.type, handleGetPrices);
  yield takeLatest(tickerChartActions.getPricesSuccess.type, handleGetPricesSuccess);
  yield takeLatest(tickerChartActions.getPricesFailed.type, handleGetPricesFailed);
}
