import type { StoryObj } from '@storybook/angular';
import type { CandlestickSeriesConfig, ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../../shared';

const series: CandlestickSeriesConfig = {
  type: 'candlestick',
  name: 'Daily price',
  data: [
    [1, 10, 12, 9, 14],
    [2, 12, 11, 10, 15],
    [3, 11, 15, 10, 17],
    [4, 15, 13, 12, 18]
  ],
  style: 'classic',
  barWidth: '60%',
  itemStyle: { upColor: '#16a34a', downColor: '#dc2626' },
  priceLabel: true
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'value', name: 'Session' },
  yAxis: { type: 'value', name: 'Price' },
  dataZoom: [{ type: 'inside', start: 0, end: 100 }]
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/CandlestickSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/CandlestickSeriesConfig',
    'CandlestickSeriesConfig with OHLC tuple data, candle style, width, up/down colors, sampling, and price label options.'
  )
};

type Story = StoryObj;

export const CandlestickSeries: Story = { args: { options } };
