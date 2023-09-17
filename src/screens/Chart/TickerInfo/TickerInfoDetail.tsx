import { formatNumber, getPriceProps } from '@src/utils.ts/common';
import TickerInfoItem from './TickerInfoItem';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/vi-VN';

export default function TickerInfoDetail() {
  const { market, tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  const { color } = getPriceProps(tickerInfo?.close, tickerInfo?.reference, market);

  return (
    <View style={styles.container}>
      <TickerInfoItem title='Mở cửa' value={formatNumber(tickerInfo?.open, 1)} valueColor={color} />
      <TickerInfoItem title='Cao nhất' value={formatNumber(tickerInfo?.high, 1)} valueColor={color} />
      <TickerInfoItem title='Thấp nhất' value={formatNumber(tickerInfo?.low, 1)} valueColor={color} />
      <TickerInfoItem title='Đóng của' value={formatNumber(tickerInfo?.close, 1)} valueColor={color} />
      <TickerInfoItem title='KLGD' value={formatNumber(tickerInfo?.volume)} />
      <TickerInfoItem title='Cao nhất 52 tuần' value={formatNumber(tickerInfo?.high52w, 1)} />
      <TickerInfoItem title='Thấp nhất 52 tuần' value={formatNumber(tickerInfo?.low52w, 1)} />
      <TickerInfoItem title='KLGD bình quân 52 tuần' value={formatNumber(tickerInfo?.volume52w)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
  },
});
