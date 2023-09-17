import * as React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import {
  Chart,
  HorizontalAxis,
  VerticalAxis,
  Line,
  Tooltip,
  ChartDataPoint,
  AxisDomain,
  ViewPort,
  Padding,
} from 'react-native-responsive-linechart';
import moment from 'moment';
import { NUM_RECENT_DAYS } from '@src/constant/common';

export interface IOHLCData {
  readonly close: number;
  readonly date: Date;
  readonly high: number;
  readonly low: number;
  readonly open: number;
  readonly volume: number;
}

interface TickerPriceChartProps {
  data: any;
  predictionDate: Date;
  predictionOffset: number;
}

interface BaseChartProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  data?: ChartDataPoint[];
  xDomain?: AxisDomain;
  yDomain?: AxisDomain;
  viewport?: ViewPort;
  disableTouch?: boolean;
  disableGestures?: boolean;
  padding?: Padding;
}

const BaseChart = ({ children, ...props }: BaseChartProps) => <Chart {...props}>{children}</Chart>;

export default function TickerPriceChart(props: TickerPriceChartProps) {
  const data: IOHLCData[] = props.data.length > NUM_RECENT_DAYS ? props.data.slice(-NUM_RECENT_DAYS) : props.data;
  const prices = Object.entries<IOHLCData>(data).map(([i, d]) => {
    return { ...d, x: new Date(d.date).getTime(), y: d.close };
  });

  const xValues = prices.map((p) => p.x);
  const yValues = prices.map((p) => p.y);
  const viewport = {
    size: {
      width: Math.max(...xValues) - Math.min(...xValues),
      height: Math.max(...yValues) - Math.min(...yValues),
    },
    initialOrigin: {
      x: Math.min(...xValues),
      y: Math.min(...yValues),
    },
  };

  const truePrices = prices.slice(0, props.predictionOffset + 60 - props.data.length);
  const predictionPrices = prices.slice(truePrices.length - 1, prices.length);
  const truePriceFormatter = (v: any) =>
    v.date < props.predictionDate ? `${moment(v.date).format('DD/MM/YYYY')} C:${v.close.toFixed(1)}` : '';
  const predictionPriceFormatter = (v: any) =>
    v.date >= props.predictionDate ? `${moment(v.date).format('DD/MM/YYYY')} PC:${v.close.toFixed(1)}` : '';

  const dateFormatter = (v: any) => new Intl.DateTimeFormat('vi-VN').format(new Date(v));

  return (
    <View style={styles.container}>
      <BaseChart
        style={styles.chart}
        data={prices}
        padding={{ left: 40, bottom: 40, right: 20, top: 40 }}
        disableGestures={true}
        disableTouch={false}
        viewport={viewport}
      >
        <VerticalAxis
          tickCount={6}
          theme={{
            axis: { stroke: { color: '#aaa', width: 2 } },
            ticks: { stroke: { color: '#aaa', width: 2 } },
            labels: { formatter: (v) => v.toFixed(0) },
          }}
        />
        <HorizontalAxis
          tickCount={6}
          theme={{
            axis: { stroke: { color: '#aaa', width: 2 } },
            ticks: { stroke: { color: '#aaa', width: 2 } },
            labels: {
              label: { rotation: 50 },
              formatter: dateFormatter,
            },
          }}
        />
        <Line
          smoothing='cubic-spline'
          tension={0.3}
          theme={{ stroke: { color: 'orange', width: 2 } }}
          tooltipComponent={
            <Tooltip
              theme={{
                label: { color: 'black', textAnchor: 'end', fontSize: 8 },
                shape: { color: 'transparent' },
                formatter: truePriceFormatter,
              }}
            />
          }
          hideTooltipAfter={2000}
          hideTooltipOnDragEnd={false}
          data={truePrices}
        />
        <Line
          smoothing='cubic-spline'
          tension={0.3}
          theme={{ stroke: { color: 'green', width: 2, dashArray: [5, 5] } }}
          tooltipComponent={
            <Tooltip
              theme={{
                label: { color: 'black', textAnchor: 'end', fontSize: 8 },
                shape: { color: 'transparent' },
                formatter: predictionPriceFormatter,
              }}
            />
          }
          hideTooltipAfter={2000}
          hideTooltipOnDragEnd={false}
          data={predictionPrices}
        />
      </BaseChart>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  chart: {
    height: 200,
    width: '100%',
  },
});
