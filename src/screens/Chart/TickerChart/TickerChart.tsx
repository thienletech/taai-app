import React from 'react';
import { useSelector } from 'react-redux';
import { timeParse } from 'd3-time-format';
import { type StockPriceItemResponse } from '@src/api/stock-api';
import { StyleSheet, View } from 'react-native';
import TickerPriceChart, { IOHLCData } from './TickerPriceChart';
import { Text } from 'react-native-paper';
import Moment from 'moment';

const parseDate = timeParse('%Y-%m-%d');

const parseData = (prices: any) => {
  const items: IOHLCData[] = Object.entries<StockPriceItemResponse>(prices).map(([index, value]) => {
    let d;
    const date = parseDate(value.date);
    if (date === null) {
      d = new Date(Number(value.date));
    } else {
      d = new Date(date);
    }
    return {
      close: value.close,
      date: d,
      high: value.high,
      low: value.low,
      open: value.open,
      volume: value.volume,
    } as IOHLCData;
  });
  return items;
};
export default function TickerChart() {
  const { predictionOffset, prices, ticker } = useSelector((state: any) => state.tickerChartReducer);
  const items = prices ? parseData(prices) : null;
  const offset = predictionOffset && predictionOffset > 1 ? predictionOffset - 1 : predictionOffset;
  const predictionDate = items ? items[offset]?.date ?? null : null;
  const { tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  const updateDate = tickerInfo?.predictDate ? Moment(tickerInfo?.predictDate).format('DD/MM/YYYY') : null;
  return (
    <View style={styles.container}>
      {predictionDate && items && (
        <View>
          <TickerPriceChart data={items} predictionDate={predictionDate} predictionOffset={predictionOffset} />
          <Text style={styles.notice}>{`* Cập nhập lần cuối ngày ${updateDate}`}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
  notice: {
    textAlign: 'center',
    fontSize: 10,
    color: 'grey',
  },
});
