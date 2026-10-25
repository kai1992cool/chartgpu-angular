import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions, OhlcSeriesConfig } from 'chartgpu';
import { createOptionsMeta } from '../../shared';

const series: OhlcSeriesConfig = {
  type: 'ohlc',
  name: 'OHLC bars',
  data: [
    [1, 10, 12, 9, 14],
    [2, 12, 11, 10, 15],
    [3, 11, 15, 10, 17],
    [4, 15, 13, 12, 18]
  ],
  barWidth: '65%',
  stemWidth: 2,
  tickLength: '45%',
  itemStyle: { upColor: '#16a34a', downColor: '#dc2626' }
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'value', name: 'Session' },
  yAxis: { type: 'value', name: 'Price' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/OhlcSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/OhlcSeriesConfig',
    'OhlcSeriesConfig demonstrates OHLC data, stem width, tick length, bar width, and item colors.'
  )
};

type Story = StoryObj;

export const OhlcSeries: Story = { args: { options } };
