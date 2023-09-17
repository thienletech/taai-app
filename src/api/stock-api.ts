import { fetch } from './client';

const stockApi = {
  searchTicker: async (query: string) => {
    const url = `/app/stocks/autocomplete?query=${query ?? ''}`;
    return await fetch('get', url, {});
  },
  getStockInfo: async (ticker: string) => {
    const url = `/app/stock-prices/info?ticker=${ticker}`;
    return await fetch('get', url, {});
  },
  getStockPrices: async (ticker: string) => {
    const url = `/app/stock-prices/prediction?ticker=${ticker}`;
    return await fetch('get', url, {});
  },
};

export interface StockItemResponse {
  ticker: string;
  name: string;
  market: string;
}

export interface StockInfoResponse {
  ticker: string;
  date: Date;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  high52w: number;
  low52w: number;
  volume52w: number;
  totalVolume52w: number;
  totalCount52w: number;
  ceiling: number;
  floor: number;
  reference: number;
}

export interface StockPriceItemResponse {
  ticker: string;
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export default stockApi;
