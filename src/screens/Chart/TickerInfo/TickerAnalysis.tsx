import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Moment from 'moment';
import { Text, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

export const TickerAnalysis = () => {
  const { tickerInfo } = useSelector((state: any) => state.tickerInfoReducer);
  const updateDate = tickerInfo?.recommendDate ? Moment(tickerInfo?.recommendDate).format('DD/MM/YYYY') : null;
  const theme = useTheme();
  const styles = stylesCreator(theme);
  return (
    <View style={styles.container}>
      {tickerInfo?.recommendDate && (
        <View>
          <Text style={styles.content}>{tickerInfo.recommendContent}</Text>
          <Text style={styles.notice}>{`* Cập nhập bởi ChatGPT ngày ${updateDate}`}</Text>
        </View>
      )}
    </View>
  );
};

const stylesCreator = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: theme.colors.background,
      marginTop: 30,
    },
    title: {
      fontSize: 18,
      color: 'black',
    },
    content: {
      fontSize: 16,
      color: 'black',
    },
    notice: {
      marginTop: 10,
      fontSize: 10,
      color: 'grey',
    },
  });
