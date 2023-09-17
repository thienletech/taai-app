import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

interface TickerInfoItemProps {
  title: string;
  value: string;
  valueColor?: string;
}

export default function TickerInfoItem({ title, value, valueColor }: TickerInfoItemProps) {
  const color = valueColor;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Text style={[styles.text, { color }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 4,
  },
  text: {
    fontSize: 18,
    color: 'black',
  },
});
