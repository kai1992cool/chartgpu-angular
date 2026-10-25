import type { BandSeriesConfig, ChartGPUOptions } from 'chartgpu';
import type { StoryObj } from '@storybook/angular';
import { createOptionsMeta } from '../../shared';

const series: BandSeriesConfig = {
  type: 'band',
  name: 'Confidence interval',
  data: [
    [0, 3, 7],
    [1, 4, 9],
    [2, 5, 10],
    [3, 4, 8],
    [4, 6, 11]
  ],
  color: '#7c3aed',
  lineStyle: { width: 2 },
  areaStyle: { opacity: 0.25 },
  connectNulls: false
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  tooltip: { show: true, trigger: 'axis' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/BandSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/BandSeriesConfig',
    'BandSeriesConfig fills between two y curves for ranges and confidence intervals. Edit the x/y/y1 data and style settings.'
  )
};

type Story = StoryObj;

export const BandSeries: Story = { args: { options } };
