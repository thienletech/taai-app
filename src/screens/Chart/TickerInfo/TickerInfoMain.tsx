import { formatNumber, getPriceProps } from '@src/utils.ts/common';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function TickerInfoMain() {
  const { market, tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  const change = tickerInfo?.close - tickerInfo?.reference;
  const changePercent = (change / tickerInfo?.reference) * 100;
  const { color } = getPriceProps(tickerInfo?.close, tickerInfo?.reference, market);

  return (
    <View style={styles.container}>
      <Text style={[styles.textLarge, { color }]}>{formatNumber(tickerInfo?.close, 1)}</Text>
      <Text style={[styles.text, { color }]}>{`${formatNumber(change, 1)} (${formatNumber(changePercent, 1)}%)`}</Text>
      <Text style={[styles.text]}>{tickerInfo?.date}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  textLarge: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
