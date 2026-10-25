import type { ChartGPUOptions, ErrorBarSeriesConfig } from 'chartgpu';
import type { StoryObj } from '@storybook/angular';
import { createOptionsMeta } from '../../shared';

const series: ErrorBarSeriesConfig = {
  type: 'errorBar',
  name: 'Measurements',
  data: [
    [0, 6, 8, 4],
    [1, 8, 11, 6],
    [2, 7, 10, 5],
    [3, 10, 13, 8]
  ],
  color: '#dc2626',
  errorMode: 'both',
  direction: 'vertical',
  capWidth: '45%',
  drawWhiskers: true,
  drawConnector: true,
  showCenter: true
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/ErrorBarSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/ErrorBarSeriesConfig',
    'ErrorBarSeriesConfig visualizes high/low uncertainty around center values, including direction, whiskers, connector, and center marker settings.'
  )
};

type Story = StoryObj;

export const ErrorBarSeries: Story = { args: { options } };
