import * as React from 'react';
import type { CompositeScreenProps } from '@react-navigation/native';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import { useTheme } from 'react-native-paper';
import { type DrawerScreenProps } from '@react-navigation/drawer';
import { type StackScreenProps } from '@react-navigation/stack';
import { type RootDrawerParamList, type RootStackParamList } from '@src/layout/Screens';
import { SafeAreaView } from 'react-native-safe-area-context';
import TickerSelect from './TickerSelect/TickerSelect';
import { useEffect } from 'react';
import { useAppDispatch } from '@src/app/store';
import { tickerSelectActions } from './TickerSelect/ticker-select.slice';
import TickerInfo from './TickerInfo/TickerInfo';
import TickerChart from './TickerChart/TickerChart';
import { TickerAnalysis } from './TickerInfo/TickerAnalysis';

export const Chart = ({
  navigation,
}: CompositeScreenProps<DrawerScreenProps<RootDrawerParamList, 'Chart'>, StackScreenProps<RootStackParamList>>) => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(tickerSelectActions.getTickers(''));
  }, []);

  return (
    <SafeAreaView edges={['right', 'bottom', 'left']} style={{ flex: 1 }}>
      <View style={styles.container}>
        <TickerSelect></TickerSelect>
        <ScrollView
          style={{
            backgroundColor: theme.colors.background,
            flex: 1,
            width: '100%',
          }}
        >
          <TickerInfo />
          <TickerChart />
          <TickerAnalysis />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    marginTop: 40,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    flex: 1,
    width: '100%',
  },
  button: {
    margin: 24,
  },
});
