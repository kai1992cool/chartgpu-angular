import type { StoryObj } from '@storybook/angular';
import type { ChartGPUOptions } from 'chartgpu';
import { createOptionsMeta } from '../shared';

const options: ChartGPUOptions = {
  series: [
    { type: 'line', name: 'North', data: { x: [0, 1, 2, 3], y: [4, 7, 5, 9] }, color: '#2563eb' },
    { type: 'line', name: 'South', data: { x: [0, 1, 2, 3], y: [3, 5, 8, 7] }, color: '#16a34a' }
  ],
  xAxis: { type: 'value' },
  yAxis: { type: 'value' },
  legend: { show: true, position: 'top' }
};

export default {
  title: 'ChartGPU/API Options/Legend/LegendConfig',
  ...createOptionsMeta(
    'Legend/LegendConfig',
    'LegendConfig controls series legend visibility and placement. Edit show or position in the options object.'
  )
};

type Story = StoryObj;

export const LegendPositions: Story = {
  args: { options }
};
