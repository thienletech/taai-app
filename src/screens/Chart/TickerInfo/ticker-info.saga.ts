import { call, put, takeLatest } from 'redux-saga/effects';
import { tickerInfoActions } from './ticker-info.slice';
import stockApi from '@src/api/stock-api';
import { showApiError } from '@src/utils.ts/common';
import { tickerChartActions } from '../TickerChart/ticker-chart.slice';
import { ResponseData } from '@src/api/client';

function* handleGetInfo({ payload }: any) {
  try {
    const res: ResponseData = yield call(stockApi.getStockInfo, payload.ticker);
    yield put(tickerInfoActions.getInfoSuccess(res.data));
  } catch (error) {
    showApiError();
    yield put(tickerInfoActions.getInfoFailed(error));
  }
}

function* handleGetInfoSuccess({ payload }: any) {
  yield put(tickerInfoActions.setTickerInfo(payload));
}

function* handleGetInfoFailed(action: {}) {}

function* handleSetTickerInfo({ payload }: any) {
  yield put(tickerChartActions.getPrices({ ticker: payload.ticker }));
}

export default function* tickerInfoSaga() {
  yield takeLatest(tickerInfoActions.getInfo.type, handleGetInfo);
  yield takeLatest(tickerInfoActions.getInfoSuccess.type, handleGetInfoSuccess);
  yield takeLatest(tickerInfoActions.getInfoFailed.type, handleGetInfoFailed);
  yield takeLatest(tickerInfoActions.setTickerInfo.type, handleSetTickerInfo);
}
