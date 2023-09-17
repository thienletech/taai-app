import { call, put, takeLatest } from 'redux-saga/effects';
import { tickerSelectActions } from './ticker-select.slice';
import stockApi, { type StockItemResponse } from '@src/api/stock-api';
import { showApiError } from '@src/utils.ts/common';
import { DEFAULT_SELECTED_OPTION } from '@src/constant/common';
import { tickerInfoActions } from '../TickerInfo/ticker-info.slice';
import { ResponseData } from '@src/api/client';

function* handleGetTickers(action: any) {
  try {
    const res: ResponseData = yield call(stockApi.searchTicker, '');
    yield put(
      tickerSelectActions.getTickersSuccess({
        tickers: res.data,
        query: action.payload,
      })
    );
  } catch (error) {
    showApiError();
    yield put(tickerSelectActions.getTickersFailed(error));
  }
}

function* handleGetTickersSuccess(action: any) {
  const options = Object.entries<StockItemResponse>(action.payload.tickers).map(([index, value]) => {
    const ticker = value.ticker;
    const market = value.market ? ` (${value.market})` : '';
    const name = value.name ? ` - ${value.name}` : '';
    return {
      value: ticker,
      label: `${ticker}${market}${name}`,
      market: value.market,
    };
  });
  yield put(tickerSelectActions.setOptions(options));
}

function* handleGetTickersFailed(action: {}) {}

function* handleSetOptions(action: any) {
  yield put(tickerSelectActions.setSelectedOption(DEFAULT_SELECTED_OPTION));
}

function* handleSetSelectedOption(action: any) {
  yield put(
    tickerInfoActions.getInfo({
      ticker: action.payload.value,
      market: action.payload.market,
    })
  );
}

export default function* tickerSelectSaga() {
  yield takeLatest(tickerSelectActions.getTickers.type, handleGetTickers);
  yield takeLatest(tickerSelectActions.getTickersSuccess.type, handleGetTickersSuccess);
  yield takeLatest(tickerSelectActions.getTickersFailed.type, handleGetTickersFailed);
  yield takeLatest(tickerSelectActions.setOptions.type, handleSetOptions);
  yield takeLatest(tickerSelectActions.setSelectedOption.type, handleSetSelectedOption);
}
