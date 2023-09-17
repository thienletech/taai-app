import TickerInfoMain from './TickerInfoMain';
import TickerInfoDetail from './TickerInfoDetail';
import { StyleSheet, View } from 'react-native';

export default function TickerInfo() {
  return (
    <View style={styles.container}>
      <TickerInfoMain />
      <TickerInfoDetail />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 48,
    width: '100%',
  },
});
