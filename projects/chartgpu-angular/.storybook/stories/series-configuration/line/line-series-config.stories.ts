import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions, LineSeriesConfig } from 'chartgpu';
import { createOptionsMeta } from '../../shared';

const series: LineSeriesConfig = {
  type: 'line',
  name: 'Step line',
  data: { x: [0, 1, 2, 3, 4], y: [4, 8, 6, 11, 9] },
  color: '#4f46e5',
  lineStyle: { width: 3, opacity: 0.9 },
  step: 'middle',
  connectNulls: false
};

const options: ChartGPUOptions = {
  series: [series],
  xAxis: { type: 'value', name: 'Sample' },
  yAxis: { type: 'value', name: 'Value' }
};

export default {
  title: 'ChartGPU/API Options/Series Configuration/LineSeriesConfig',
  ...createOptionsMeta(
    'Series Configuration/LineSeriesConfig',
    'LineSeriesConfig with inherited series settings, line styling, optional step geometry, and gap handling.'
  )
};

type Story = StoryObj;

export const LineSeries: Story = { args: { options } };
